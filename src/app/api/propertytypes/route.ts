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

    const propertyType = await prismadb.propertyType.create({
      data: {
        name,
      },
    });

    return NextResponse.json(propertyType);
  } catch (error) {
    console.log("[PROPERTY_TYPE_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const propertyTypes = await prismadb.propertyType.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(propertyTypes);
  } catch (error) {
    console.log("[PROPERTY_TYPE_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
