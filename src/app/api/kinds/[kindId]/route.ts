import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      kindId: string;
    };
  }
) {
  try {
    if (!params.kindId) {
      return new NextResponse("Kind id is required", { status: 400 });
    }

    const kind = await prismadb.kind.findUnique({
      where: {
        id: params.kindId,
      },
    });

    return NextResponse.json(kind);
  } catch (error) {
    console.log(["KIND_GET"], error);
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      kindId: string;
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

    if (!params.kindId) {
      return new NextResponse("Kind id is required", { status: 400 });
    }

    const kind = await prismadb.kind.updateMany({
      where: {
        id: params.kindId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(kind);
  } catch (error) {
    console.log(["KINDS_PATCH"], error);
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      kindId: string;
    };
  }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.kindId) {
      return new NextResponse("Kind id is required", { status: 400 });
    }

    const kind = await prismadb.kind.deleteMany({
      where: {
        id: params.kindId,
      },
    });

    return NextResponse.json(kind);
  } catch (error) {
    console.log(["KINDS_DELETE"], error);
  }
}
