import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      garageId: string;
    };
  }
) {
  try {
    if (!params.garageId) {
      return new NextResponse("Garage id is required", { status: 400 });
    }

    const garage = await prismadb.garage.findUnique({
      where: {
        id: params.garageId,
      },
    });

    return NextResponse.json(garage);
  } catch (error) {
    console.log(["GARAGE_GET"], error);
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      garageId: string;
    };
  }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { quantity } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!quantity) {
      return new NextResponse("Quantity is required", { status: 400 });
    }

    if (!params.garageId) {
      return new NextResponse("Garage Id id is required", { status: 400 });
    }

    const garage = await prismadb.garage.updateMany({
      where: {
        id: params.garageId,
      },
      data: {
        quantity,
      },
    });

    return NextResponse.json(garage);
  } catch (error) {
    console.log(["GARAGE_PATCH"], error);
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      garageId: string;
    };
  }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.garageId) {
      return new NextResponse("Garage id is required", { status: 400 });
    }

    const garage = await prismadb.garage.deleteMany({
      where: {
        id: params.garageId,
      },
    });

    return NextResponse.json(garage);
  } catch (error) {
    console.log(["GARAGE_DELETE"], error);
  }
}
