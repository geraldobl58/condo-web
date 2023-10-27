import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      salerentId: string;
    };
  }
) {
  try {
    if (!params.salerentId) {
      return new NextResponse("Sale Rent id is required", { status: 400 });
    }

    const salerent = await prismadb.saleRent.findUnique({
      where: {
        id: params.salerentId,
      },
    });

    return NextResponse.json(salerent);
  } catch (error) {
    console.log(["SALE_RENT_GET"], error);
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      salerentId: string;
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

    if (!params.salerentId) {
      return new NextResponse("Sale Rent id is required", { status: 400 });
    }

    const salerent = await prismadb.saleRent.updateMany({
      where: {
        id: params.salerentId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(salerent);
  } catch (error) {
    console.log(["SALE_RENT_PATCH"], error);
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      salerentId: string;
    };
  }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.salerentId) {
      return new NextResponse("Sale Rent id is required", { status: 400 });
    }

    const salerent = await prismadb.saleRent.deleteMany({
      where: {
        id: params.salerentId,
      },
    });

    return NextResponse.json(salerent);
  } catch (error) {
    console.log(["SALE_RENT_DELETE"], error);
  }
}
