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

    const bedroom = await prismadb.bedroom.create({
      data: {
        quantity,
      },
    });

    return NextResponse.json(bedroom);
  } catch (error) {
    console.log("[BEDROOM_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const bedroom = await prismadb.bedroom.findMany({
      orderBy: {
        quantity: "asc",
      },
    });

    return NextResponse.json(bedroom);
  } catch (error) {
    console.log("[BEDROOM_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
