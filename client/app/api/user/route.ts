import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        {
          message: "unauthenticated",
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json({ user: session.user }, { status: 200 });
  } catch (error) {
    console.log("error in get authenticated user ", error);
    NextResponse.json(
      {
        message: "internal sever error",
      },
      {
        status: 500,
      }
    );
  }
};
