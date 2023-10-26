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

    const bathroom = await prismadb.bathroom.create({
      data: {
        quantity,
      },
    });

    return NextResponse.json(bathroom);
  } catch (error) {
    console.log("[BATHROOMPOST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const bathroom = await prismadb.bathroom.findMany({
      orderBy: {
        quantity: "asc",
      },
    });

    return NextResponse.json(bathroom);
  } catch (error) {
    console.log("[BATHROOM_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
