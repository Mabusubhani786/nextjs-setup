// app/api/[...slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { controllers } from "@/lib/controllers";

// Connect to database
connectDB().catch(console.error);

async function handleRequest(
  req: NextRequest,
  params: { slug: string[] },
  method: string
) {
  try {
    const { slug = [] } = params;
    let collection = slug[0];
    const id = slug[1];
    const subResource = slug[2];

    if (!collection) {
      return NextResponse.json(
        { error: "Collection name is required" },
        { status: 400 }
      );
    }

    if (collection.endsWith("s") && !controllers[collection]) {
      const singular = collection.slice(0, -1);
      if (controllers[singular]) {
        collection = singular;
      }
    }

    const controller = controllers[collection];

    if (!controller) {
      return NextResponse.json(
        { error: `Collection '${slug[0]}' not found` },
        { status: 404 }
      );
    }

    switch (method.toUpperCase()) {
      case "GET":
        if (id && subResource) {
          return handleSubResource(req, controller, id, subResource, "GET");
        }
        return id ? controller.getById(req, id) : controller.getAll(req);

      case "POST":
        if (id && subResource) {
          return handleSubResource(req, controller, id, subResource, "POST");
        }
        if (id) {
          return NextResponse.json(
            { error: "POST to resource with ID is not allowed" },
            { status: 405 }
          );
        }
        return controller.create(req);

      case "PUT":
        if (id && subResource) {
          return handleSubResource(req, controller, id, subResource, "PUT");
        }
        if (!id) {
          return NextResponse.json(
            { error: "ID is required for PUT" },
            { status: 400 }
          );
        }
        return controller.updateById(req, id);

      case "PATCH":
        if (id && subResource) {
          return handleSubResource(req, controller, id, subResource, "PATCH");
        }
        if (!id) {
          return NextResponse.json(
            { error: "ID is required for PATCH" },
            { status: 400 }
          );
        }
        return controller.updateById(req, id);

      case "DELETE":
        if (id && subResource) {
          return handleSubResource(req, controller, id, subResource, "DELETE");
        }
        if (!id) {
          return NextResponse.json(
            { error: "ID is required for DELETE" },
            { status: 400 }
          );
        }
        return controller.deleteById(req, id);

      default:
        return NextResponse.json(
          { error: `Method ${method} not allowed` },
          { status: 405 }
        );
    }
  } catch (error) {
    console.error(`Error handling ${method} request:`, error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function handleSubResource(
  req: NextRequest,
  controller: any,
  id: string,
  subResource: string,
  method: string
) {
  const handlerName = `handle${
    subResource.charAt(0).toUpperCase() + subResource.slice(1)
  }`;

  if (typeof controller[handlerName] === "function") {
    return controller[handlerName](req, id, method);
  }

  return NextResponse.json(
    { error: `Sub-resource '${subResource}' not supported` },
    { status: 404 }
  );
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string[] }> }
) {
  return handleRequest(req, await context.params, "GET");
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ slug: string[] }> }
) {
  return handleRequest(req, await context.params, "POST");
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ slug: string[] }> }
) {
  return handleRequest(req, await context.params, "PUT");
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ slug: string[] }> }
) {
  return handleRequest(req, await context.params, "PATCH");
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ slug: string[] }> }
) {
  return handleRequest(req, await context.params, "DELETE");
}

export async function OPTIONS(
  req: NextRequest,
  context: { params: Promise<{ slug: string[] }> }
) {
  return new NextResponse(null, {
    headers: {
      Allow: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    },
  });
}
