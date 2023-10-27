import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
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

    const garage = await prismadb.garage.create({
      data: {
        quantity,
      },
    });

    return NextResponse.json(garage);
  } catch (error) {
    console.log("[GARAGE_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const garage = await prismadb.garage.findMany({
      orderBy: {
        quantity: "asc",
      },
    });

    return NextResponse.json(garage);
  } catch (error) {
    console.log("[GARAGE_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
