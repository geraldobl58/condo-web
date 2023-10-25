import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const {
      categoryId,
      images,
      name,
      address,
      neighborhood,
      price,
      description,
      type,
      bedrooms,
      bathrooms,
      garage,
      land,
      isFeatured,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!categoryId) {
      return new NextResponse("CategoryId is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!address) {
      return new NextResponse("Address is required", { status: 400 });
    }

    if (!neighborhood) {
      return new NextResponse("Neighborhood is required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (!type) {
      return new NextResponse("Type is required", { status: 400 });
    }

    if (!bedrooms) {
      return new NextResponse("Bedrooms is required", { status: 400 });
    }

    if (!bathrooms) {
      return new NextResponse("Bathrooms is required", { status: 400 });
    }

    if (!garage) {
      return new NextResponse("Garage is required", { status: 400 });
    }

    if (!land) {
      return new NextResponse("Land is required", { status: 400 });
    }

    const property = await prismadb.property.create({
      data: {
        categoryId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
        name,
        address,
        neighborhood,
        price,
        description,
        type,
        bedrooms,
        bathrooms,
        garage,
        land,
        isFeatured,
      },
    });

    return NextResponse.json(property);
  } catch (error) {
    console.log("[PROPERTY_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const categoryId = searchParams.get("categoryId") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    const properties = await prismadb.property.findMany({
      where: {
        categoryId,
        isFeatured: isFeatured ? true : undefined,
      },
      include: {
        images: true,
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(properties);
  } catch (error) {
    console.log("[PROPERTIES_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
