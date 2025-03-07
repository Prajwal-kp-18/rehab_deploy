
'use client';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Activity {
  id: number;
  title: string;
  description: string;
  status: "pending" | "completed" | "skipped" | string;
  hasTaken: boolean;
  videoQuery: string;
  day: number;
}

const defaultActivities: Activity[] = Array.from({ length: 7 }, (_, dayIndex) => ({
  id: dayIndex + 1,
  title: `Activity for Day ${dayIndex + 1}`,
  description: `Description for activity on Day ${dayIndex + 1}.`,
  status: "pending",
  hasTaken: false,
  videoQuery: "sample video query",
  day: dayIndex + 1,
}));

const GROUP_SIZE = 2;

const TaskManager = () => {
  const [activities, setActivities] = useState<Activity[]>(defaultActivities);
  const [loading, setLoading] = useState(true);
  const [currentGroup, setCurrentGroup] = useState(1);

  useEffect(() => {
   fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        // If additional activities come from the API, ensure they follow the same schema.
        console.log(data);
        const newActivities = data.map((act: any) => ({
          ...act,
          status: "pending",
          hasTaken: false,
          day: act.day || 1,
          videoQuery: act.videoQuery || "default video",
        }));
        setActivities([...defaultActivities, ...newActivities]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const checkAndUnlockNextGroup = (updatedActivities: Activity[]) => {
    const startIndex = (currentGroup - 1) * GROUP_SIZE;
    const groupTasks = updatedActivities.slice(startIndex, startIndex + GROUP_SIZE);
    if (
      groupTasks.length > 0 &&
      groupTasks.every((task) => task.status !== "pending") &&
      currentGroup * GROUP_SIZE < updatedActivities.length
    ) {
      setCurrentGroup((prev) => prev + 1);
    }
  };

  const handleCompletion = (id: number) => {
    setActivities((prev) => {
      const updated = prev.map((activity) =>
        activity.id === id ? { ...activity, status: "completed" } : activity
      );
      checkAndUnlockNextGroup(updated);
      return updated;
    });
  };

  const handleMissed = (id: number) => {
    setActivities((prev) => {
      const updated = prev.map((activity) =>
        activity.id === id ? { ...activity, status: "skipped" } : activity
      );
      checkAndUnlockNextGroup(updated);
      return updated;
    });
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading activities...</p>;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
        Task Manager - 7 Day Challenge
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {activities.map((activity, index) => {
          const isUnlocked = index < currentGroup * GROUP_SIZE;
          const cardClasses = isUnlocked
            ? activity.status === "completed"
              ? "bg-green-200 border-green-400"
              : activity.status === "skipped"
              ? "bg-red-200 border-red-400"
              : "bg-blue-100 border-blue-300"
            : "bg-gray-200 border-gray-300";

          return (
            <div key={activity.id} className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`p-8 border rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 min-h-[250px] ${cardClasses} ${!isUnlocked ? "filter blur-sm" : ""}`}
              >
                <h2 className="text-2xl font-semibold text-gray-900">
                  {activity.title}
                </h2>
                <p className="text-gray-700 mb-4">{activity.description}</p>
                <span
                  className={`text-xl font-bold ${
                    activity.status === "completed"
                      ? "text-green-700"
                      : activity.status === "skipped"
                      ? "text-red-700"
                      : "text-blue-700"
                  }`}
                >
                  {activity.status === "completed"
                    ? "Completed"
                    : activity.status === "skipped"
                    ? "Skipped"
                    : "Pending"}
                </span>
                <div className="flex items-center mt-4 justify-start gap-2">
                  {isUnlocked && (
                    <>
                      <Button
                        onClick={() => handleCompletion(activity.id)}
                        disabled={activity.status !== "pending"}
                        className="bg-green-400 text-white semibold px-4 py-2 rounded-lg transition-transform transform hover:scale-105 disabled:opacity-80"
                      >
                        Done
                      </Button>
                      <Button
                        onClick={() => handleMissed(activity.id)}
                        disabled={activity.status !== "pending"}
                        className="bg-red-400 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105 disabled:opacity-80"
                      >
                        Skip
                      </Button>
                      <Link href={`/pages/video?query=${encodeURIComponent(activity.videoQuery)}`}>
                        <Button
                          className="bg-purple-400 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
                        >
                          Watch Video
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </motion.div>
              {!isUnlocked && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-4xl text-gray-600">🔒</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskManager;