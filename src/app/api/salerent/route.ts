import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
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

    const salerent = await prismadb.saleRent.create({
      data: {
        name,
      },
    });

    return NextResponse.json(salerent);
  } catch (error) {
    console.log("[SALE_RENT_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const salerent = await prismadb.saleRent.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(salerent);
  } catch (error) {
    console.log("[SALE_RENT_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
