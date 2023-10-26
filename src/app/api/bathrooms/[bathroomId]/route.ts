import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      bathroomId: string;
    };
  }
) {
  try {
    if (!params.bathroomId) {
      return new NextResponse("Bathroom id is required", { status: 400 });
    }

    const bathroom = await prismadb.bathroom.findUnique({
      where: {
        id: params.bathroomId,
      },
    });

    return NextResponse.json(bathroom);
  } catch (error) {
    console.log(["BATHROOM_GET"], error);
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      bathroomId: string;
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

    if (!params.bathroomId) {
      return new NextResponse("Bathroom Id id is required", { status: 400 });
    }

    const bathroom = await prismadb.bathroom.updateMany({
      where: {
        id: params.bathroomId,
      },
      data: {
        quantity,
      },
    });

    return NextResponse.json(bathroom);
  } catch (error) {
    console.log(["CATEGORIES_PATCH"], error);
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      bathroomId: string;
    };
  }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.bathroomId) {
      return new NextResponse("Bathroom id is required", { status: 400 });
    }

    const bathroom = await prismadb.bathroom.deleteMany({
      where: {
        id: params.bathroomId,
      },
    });

    return NextResponse.json(bathroom);
  } catch (error) {
    console.log(["BATHTOOM_DELETE"], error);
  }
}
