import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      bedroomId: string;
    };
  }
) {
  try {
    if (!params.bedroomId) {
      return new NextResponse("Bedroom id is required", { status: 400 });
    }

    const bedroom = await prismadb.bedroom.findUnique({
      where: {
        id: params.bedroomId,
      },
    });

    return NextResponse.json(bedroom);
  } catch (error) {
    console.log(["BEDROOM_GET"], error);
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      bedroomId: string;
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

    if (!params.bedroomId) {
      return new NextResponse("Bedroom Id id is required", { status: 400 });
    }

    const bedroom = await prismadb.bedroom.updateMany({
      where: {
        id: params.bedroomId,
      },
      data: {
        quantity,
      },
    });

    return NextResponse.json(bedroom);
  } catch (error) {
    console.log(["BEDROOM_PATCH"], error);
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      bedroomId: string;
    };
  }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.bedroomId) {
      return new NextResponse("Bedroom id is required", { status: 400 });
    }

    const bedroom = await prismadb.bedroom.deleteMany({
      where: {
        id: params.bedroomId,
      },
    });

    return NextResponse.json(bedroom);
  } catch (error) {
    console.log(["BEDROOM_DELETE"], error);
  }
}
