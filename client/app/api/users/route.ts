import prisma from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const users = await prisma.user.findFirst();
    console.log("Fetched users:", users); // Log to verify data fetching
    return NextResponse.json({ users });
  } catch (error: any) {
    console.error("Error fetching users:", error); // Log any error
    return NextResponse.json(
      { errors: "Failed to fetch users", error },
      { status: 500 }
    );
  }
};
