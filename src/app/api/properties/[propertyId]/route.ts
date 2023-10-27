import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      propertyId: string;
    };
  }
) {
  try {
    if (!params.propertyId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const property = await prismadb.property.findUnique({
      where: {
        id: params.propertyId,
      },
      include: {
        images: true,
        category: true,
        bathroom: true,
        bedroom: true,
        garage: true,
        kind: true,
      },
    });

    return NextResponse.json(property);
  } catch (error) {
    console.log(["PROPERTY_GET"], error);
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      propertyId: string;
    };
  }
) {
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

    if (!params.propertyId) {
      return new NextResponse("Property id is required", { status: 400 });
    }

    await prismadb.property.update({
      where: {
        id: params.propertyId,
      },
      data: {
        categoryId,
        images: {
          deleteMany: {},
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

    const property = await prismadb.property.update({
      where: {
        id: params.propertyId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(property);
  } catch (error) {
    console.log(["PROPERTY_PATCH"], error);
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      propertyId: string;
    };
  }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.propertyId) {
      return new NextResponse("Property id is required", { status: 400 });
    }

    const property = await prismadb.property.deleteMany({
      where: {
        id: params.propertyId,
      },
    });

    return NextResponse.json(property);
  } catch (error) {
    console.log(["PROPERTY_DELETE"], error);
  }
}
