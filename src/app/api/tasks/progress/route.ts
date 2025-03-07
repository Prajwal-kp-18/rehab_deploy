import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "../../../../../auth";

// Type for progress response
interface ProgressData {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  skippedTasks: number;
  completionRate: number; // Percentage
  weeklyProgress: { week: number; completed: number; total: number }[];
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    const userId = await session?.user.id;
    console.log(userId);
    // Check if user exists
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Fetch all tasks for the user
    const tasks = await db.dailyTask.findMany({
      where: { userId },
      orderBy: [{ week: "asc" }, { day: "asc" }],
    });

    if (tasks.length === 0) {
      return NextResponse.json(
        { message: "No tasks found for this user" },
        { status: 404 }
      );
    }

    // Calculate overall progress
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(
      (task) => task.status === "completed"
    ).length;
    const pendingTasks = tasks.filter(
      (task) => task.status === "pending"
    ).length;
    const skippedTasks = tasks.filter(
      (task) => task.status === "skipped"
    ).length;
    const completionRate =
      totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    // Calculate weekly progress
    const weeklyProgress: { week: number; completed: number; total: number }[] =
      [];
    for (let week = 1; week <= 5; week++) {
      const weekTasks = tasks.filter((task) => task.week === week);
      const total = weekTasks.length;
      const completed = weekTasks.filter(
        (task) => task.status === "completed"
      ).length;
      if (total > 0) {
        // Only include weeks with tasks
        weeklyProgress.push({
          week,
          completed,
          total,
        });
      }
    }

    const progress: ProgressData = {
      totalTasks,
      completedTasks,
      pendingTasks,
      skippedTasks,
      completionRate: Number(completionRate.toFixed(2)),
      weeklyProgress,
    };

    return NextResponse.json(progress);
  } catch (error) {
    console.error("Error retrieving progress:", error);
    return NextResponse.json(
      { error: "Failed to retrieve progress" },
      { status: 500 }
    );
  }
}
