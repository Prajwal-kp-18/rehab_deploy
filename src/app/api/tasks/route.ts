import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";

export async function GET(req: Request) {
    try {
      const session = await auth();
      const userId = await session?.user.id;
      const week = parseInt( "1");
      const day = parseInt( "1");
  
      if (!userId) {
        return NextResponse.json({ error: "User ID is required" }, { status: 400 });
      }
  
      const task = await db.dailyTask.findMany({
        where: { userId, week },
      });
  
      if (!task) {
        return NextResponse.json({ error: "No task found for the given day" }, { status: 404 });
      }
  
      return NextResponse.json(task);
    } catch (error) {
      console.error("Error fetching task:", error);
      return NextResponse.json({ error: "Failed to retrieve task" }, { status: 500 });
    }
  }
  