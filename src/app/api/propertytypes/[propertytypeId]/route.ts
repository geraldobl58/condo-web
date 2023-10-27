import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      propertyTypeId: string;
    };
  }
) {
  try {
    if (!params.propertyTypeId) {
      return new NextResponse("Property Type id is required", { status: 400 });
    }

    const propertyType = await prismadb.propertyType.findUnique({
      where: {
        id: params.propertyTypeId,
      },
    });

    return NextResponse.json(propertyType);
  } catch (error) {
    console.log(["PROPERTY_TYPE_GET"], error);
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      propertyTypeId: string;
    };
  }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.propertyTypeId) {
      return new NextResponse("Property Type id is required", { status: 400 });
    }

    const propertyType = await prismadb.propertyType.updateMany({
      where: {
        id: params.propertyTypeId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(propertyType);
  } catch (error) {
    console.log(["PROPERTY_TYPE_PATCH"], error);
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      propertyTypeId: string;
    };
  }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.propertyTypeId) {
      return new NextResponse("Property Type id is required", { status: 400 });
    }

    const propertyType = await prismadb.propertyType.deleteMany({
      where: {
        id: params.propertyTypeId,
      },
    });

    return NextResponse.json(propertyType);
  } catch (error) {
    console.log(["PROPERTY_TYPE_DELETE"], error);
  }
}
