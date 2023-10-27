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
      kindId,
      bathroomId,
      bedroomId,
      garageId,
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

    if (!kindId) {
      return new NextResponse("KindId is required", { status: 400 });
    }

    if (!bathroomId) {
      return new NextResponse("BathroomId is required", { status: 400 });
    }

    if (!bedroomId) {
      return new NextResponse("BedroomId is required", { status: 400 });
    }

    if (!garageId) {
      return new NextResponse("GarageId is required", { status: 400 });
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
        kindId,
        bathroomId,
        bedroomId,
        garageId,
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
    const bathroomId = searchParams.get("bathroomId") || undefined;
    const bedroomId = searchParams.get("bedroomId") || undefined;
    const garageId = searchParams.get("garageId") || undefined;
    const kindId = searchParams.get("kindId") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    const properties = await prismadb.property.findMany({
      where: {
        categoryId,
        bathroomId,
        bedroomId,
        garageId,
        kindId,
        isFeatured: isFeatured ? true : undefined,
      },
      include: {
        images: true,
        category: true,
        bathroom: true,
        bedroom: true,
        garage: true,
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
