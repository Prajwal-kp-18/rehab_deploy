
// 'use client';
// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// interface Activity {
//   id: number;
//   title: string;
//   description: string;
//   status: "pending" | "completed" | "skipped" | string;
//   hasTaken: boolean;
//   videoQuery: string;
//   day: number;
// }

// const defaultActivities: Activity[] = Array.from({ length: 7 }, (_, dayIndex) => ({
//   id: dayIndex + 1,
//   title: `Activity for Day ${dayIndex + 1}`,
//   description: `Description for activity on Day ${dayIndex + 1}.`,
//   status: "pending",
//   hasTaken: false,
//   videoQuery: "sample video query",
//   day: dayIndex + 1,
// }));

// const GROUP_SIZE = 2;

// const TaskManager = () => {
//   const [activities, setActivities] = useState<Activity[]>(defaultActivities);
//   const [videoActs, setVideos] = useState<Activity[]>(defaultActivities);
//   const [loading, setLoading] = useState(true);
//   const [currentGroup, setCurrentGroup] = useState(1);

//   useEffect(() => {
//     // async function fetchTasks() {
//     //   const res = await fetch("/api/tasks");
//     //   const data = await res.json();
//     //   console.log(data);
//     //   const newActivities = data.map((act:any, index) => ({
//     //     description: act.task[index],
//     //     status: "pending",


//     //   }))
//     // }
  
  
    
//    fetch("/api/tasks")
//       .then((res) => res.json())
//       .then((data) => {
//         // If additional activities come from the API, ensure they follow the same schema.
//         console.log(data);
//         const acts = data;
//         console.log(acts);
//         const newActivities = acts.map((act: any, index: number) => ({
//           id: index,
//           title: `Activity ${index + 1}`,
//           description: act.task,
//           status: "pending",
//           hasTaken: false,
//           day: act.day || 1,
          
//         }));
//         setActivities([ ...newActivities]);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));

//       fetch("/api/tasks")
//       .then((res) => res.json())
//       .then((data) => {
//         // If additional activities come from the API, ensure they follow the same schema.
//         console.log(data);
//         const acts = data;
//         console.log(acts);
//         const newActivities = acts.map((act: any, index: number) => ({
//           id: index,
//           title: `Video Activity ${index + 1}`,
//           description: act.task,
//           status: "pending",
//           hasTaken: false,
//           day: act.day || 1,
//           videoQuery: act.videoQuery || "default video",
//         }));
//         setActivities([ ...newActivities]);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));


//   }, []);

//   const checkAndUnlockNextGroup = (updatedActivities: Activity[]) => {
//     const startIndex = (currentGroup - 1) * GROUP_SIZE;
//     const groupTasks = updatedActivities.slice(startIndex, startIndex + GROUP_SIZE);
//     if (
//       groupTasks.length > 0 &&
//       groupTasks.every((task) => task.status !== "pending") &&
//       currentGroup * GROUP_SIZE < updatedActivities.length
//     ) {
//       setCurrentGroup((prev) => prev + 1);
//     }
//   };

//   const handleCompletion = (id: number) => {
//     setActivities((prev) => {
//       const updated = prev.map((activity) =>
//         activity.id === id ? { ...activity, status: "completed" } : activity
//       );
//       checkAndUnlockNextGroup(updated);
//       return updated;
//     });
//   };

//   const handleMissed = (id: number) => {
//     setActivities((prev) => {
//       const updated = prev.map((activity) =>
//         activity.id === id ? { ...activity, status: "skipped" } : activity
//       );
//       checkAndUnlockNextGroup(updated);
//       return updated;
//     });
//   };

//   if (loading) {
//     return <p className="text-center text-gray-500">Loading activities...</p>;
//   }

//   return (
//     <div className="p-8 max-w-5xl mx-auto">
//       <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
//         Task Manager - 7 Day Challenge
//       </h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {activities.map((activity, index) => {
//           const isUnlocked = index < currentGroup * GROUP_SIZE;
//           const cardClasses = isUnlocked
//             ? activity.status === "completed"
//               ? "bg-green-200 border-green-400"
//               : activity.status === "skipped"
//               ? "bg-red-200 border-red-400"
//               : "bg-blue-100 border-blue-300"
//             : "bg-gray-200 border-gray-300";

//           return (
//             <div key={activity.id} className="relative">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 className={`p-8 border rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 min-h-[250px] ${cardClasses} ${!isUnlocked ? "filter blur-sm" : ""}`}
//               >
//                 <h2 className="text-2xl font-semibold text-gray-900">
//                   {activity.title}
//                 </h2>
//                 <p className="text-gray-700 mb-4">{activity.description}</p>
//                 <span
//                   className={`text-xl font-bold ${
//                     activity.status === "completed"
//                       ? "text-green-700"
//                       : activity.status === "skipped"
//                       ? "text-red-700"
//                       : "text-blue-700"
//                   }`}
//                 >
//                   {activity.status === "completed"
//                     ? "Completed"
//                     : activity.status === "skipped"
//                     ? "Skipped"
//                     : "Pending"}
//                 </span>
//                 <div className="flex items-center mt-4 justify-start gap-2">
//                   {isUnlocked && (
//                     <>
//                       <Button
//                         onClick={() => handleCompletion(activity.id)}
//                         disabled={activity.status !== "pending"}
//                         className="bg-green-400 text-white semibold px-4 py-2 rounded-lg transition-transform transform hover:scale-105 disabled:opacity-80"
//                       >
//                         Done
//                       </Button>
//                       <Button
//                         onClick={() => handleMissed(activity.id)}
//                         disabled={activity.status !== "pending"}
//                         className="bg-red-400 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105 disabled:opacity-80"
//                       >
//                         Skip
//                       </Button>
//                       <Link href={`/pages/video?query=${encodeURIComponent(activity.videoQuery)}`}>
//                         <Button
//                           className="bg-purple-400 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
//                         >
//                           Take Activity
//                         </Button>
//                       </Link>
//                     </>
//                   )}
//                 </div>
//               </motion.div>
//               {!isUnlocked && (
//                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                   <span className="text-4xl text-gray-600">🔒</span>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//         {videoActs.map((activity, index) => {
//           const isUnlocked = index < currentGroup * GROUP_SIZE;
//           const cardClasses = isUnlocked
//             ? activity.status === "completed"
//               ? "bg-green-200 border-green-400"
//               : activity.status === "skipped"
//               ? "bg-red-200 border-red-400"
//               : "bg-blue-100 border-blue-300"
//             : "bg-gray-200 border-gray-300";

//           return (
//             <div key={activity.id} className="relative">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 className={`p-8 border rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 min-h-[250px] ${cardClasses} ${!isUnlocked ? "filter blur-sm" : ""}`}
//               >
//                 <h2 className="text-2xl font-semibold text-gray-900">
//                   {activity.title}
//                 </h2>
//                 <p className="text-gray-700 mb-4">{activity.description}</p>
//                 <span
//                   className={`text-xl font-bold ${
//                     activity.status === "completed"
//                       ? "text-green-700"
//                       : activity.status === "skipped"
//                       ? "text-red-700"
//                       : "text-blue-700"
//                   }`}
//                 >
//                   {activity.status === "completed"
//                     ? "Completed"
//                     : activity.status === "skipped"
//                     ? "Skipped"
//                     : "Pending"}
//                 </span>
//                 <div className="flex items-center mt-4 justify-start gap-2">
//                   {isUnlocked && (
//                     <>
//                       <Button
//                         onClick={() => handleCompletion(activity.id)}
//                         disabled={activity.status !== "pending"}
//                         className="bg-green-400 text-white semibold px-4 py-2 rounded-lg transition-transform transform hover:scale-105 disabled:opacity-80"
//                       >
//                         Done
//                       </Button>
//                       <Button
//                         onClick={() => handleMissed(activity.id)}
//                         disabled={activity.status !== "pending"}
//                         className="bg-red-400 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105 disabled:opacity-80"
//                       >
//                         Skip
//                       </Button>
//                       <Link href={`/pages/video?query=${encodeURIComponent(activity.videoQuery)}`}>
//                         <Button
//                           className="bg-purple-400 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
//                         >
//                           Watch Video
//                         </Button>
//                       </Link>
//                     </>
//                   )}
//                 </div>
//               </motion.div>
//               {!isUnlocked && (
//                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                   <span className="text-4xl text-gray-600">🔒</span>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default TaskManager;
// 'use client';
// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// interface Activity {
//   id: number;
//   title: string;
//   description: string;
//   status: "pending" | "completed" | "skipped" | string;
//   hasTaken: boolean;
//   videoQuery: string;
//   day: number;
// }

// const TaskManager = () => {
//   const [activities, setActivities] = useState<Record<number, Record<number, Activity[]>>>({});
//   const [loading, setLoading] = useState(true);
//   const [selectedWeek, setSelectedWeek] = useState<number>(1);
//   const [selectedDay, setSelectedDay] = useState<number>(1);

//   useEffect(() => {
//     fetch("/api/tasks")
//       .then((res) => res.json())
//       .then((data) => {
//         setActivities(data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return <p className="text-center text-gray-500">Loading activities...</p>;
//   }

//   const weekActivities = activities[selectedWeek] || {};
//   const dayActivities = weekActivities[selectedDay] || [];

//   return (
//     <div className="p-8 max-w-5xl mx-auto">
//       <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
//         Task Manager - Weekly Challenge
//       </h1>
      
//       <div className="flex justify-center gap-4 mb-4">
//         {[1, 2, 3, 4, 5].map((week) => (
//           <Button
//             key={week}
//             onClick={() => setSelectedWeek(week)}
//             className={`px-4 py-2 ${selectedWeek === week ? "bg-blue-500 text-white" : "bg-gray-300"}`}
//           >
//             Week {week}
//           </Button>
//         ))}
//       </div>
      
//       <div className="flex justify-center gap-2 mb-6">
//         {[1, 2, 3, 4, 5, 6, 7].map((day) => (
//           <Button
//             key={day}
//             onClick={() => setSelectedDay(day)}
//             className={`px-4 py-2 ${selectedDay === day ? "bg-green-500 text-white" : "bg-gray-300"}`}
//           >
//             Day {day}
//           </Button>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {dayActivities.length > 0 ? (
//           dayActivities.map((activity) => (
//             <motion.div
//               key={activity.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="p-8 border rounded-xl shadow-lg bg-blue-100 border-blue-300 min-h-[250px]"
//             >
//               <h2 className="text-2xl font-semibold text-gray-900">{activity.title}</h2>
//               <p className="text-gray-700 mb-4">{activity.description}</p>
//               <Link href={`/pages/video?query=${encodeURIComponent(activity.videoQuery)}`}>
//                 <Button className="bg-purple-400 text-white px-4 py-2 rounded-lg">Watch Video</Button>
//               </Link>
//             </motion.div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500">No activities for this day.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TaskManager;

// 'use client';
// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// interface DailyTask {
//   id: string;
//   userId: string;
//   disorder: string;
//   severity: string;
//   week: number;
//   day: number;
//   task: string;
//   status: "pending" | "completed" | "skipped" | string;
//   reflection?: string;
//   createdAt: string;
// }

// const TaskManager = () => {
//   const [tasks, setTasks] = useState<Record<number, Record<number, DailyTask[]>>>({});
//   const [loading, setLoading] = useState(true);
//   const [selectedWeek, setSelectedWeek] = useState<number>(1);
//   const [selectedDay, setSelectedDay] = useState<number>(1);

//   useEffect(() => {
//     fetch("/api/tasks")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Fetched Tasks:", data); // Debugging
//         setTasks(data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return <p className="text-center text-gray-500">Loading tasks...</p>;
//   }

//   const weekTasks = tasks[selectedWeek] || {};
//   const dayTasks = weekTasks[selectedDay] || [];

//   const handleCompletion = async (taskId: string) => {
//     await fetch(`/api/tasks/${taskId}/complete`, { method: "POST" });
//     setTasks((prev) => ({
//       ...prev,
//       [selectedWeek]: {
//         ...prev[selectedWeek],
//         [selectedDay]: prev[selectedWeek][selectedDay].map((task) =>
//           task.id === taskId ? { ...task, status: "completed" } : task
//         ),
//       },
//     }));
//   };

//   const handleSkip = async (taskId: string) => {
//     await fetch(`/api/tasks/${taskId}/skip`, { method: "POST" });
//     setTasks((prev) => ({
//       ...prev,
//       [selectedWeek]: {
//         ...prev[selectedWeek],
//         [selectedDay]: prev[selectedWeek][selectedDay].map((task) =>
//           task.id === taskId ? { ...task, status: "skipped" } : task
//         ),
//       },
//     }));
//   };

//   return (
//     <div className="p-8 max-w-5xl mx-auto">
//       <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
//         Task Manager - Weekly Challenge
//       </h1>
      
//       {/* Week Selection */}
//       <div className="flex justify-center gap-4 mb-4">
//         {[1, 2, 3, 4, 5].map((week) => (
//           <Button
//             key={week}
//             onClick={() => setSelectedWeek(week)}
//             className={`px-4 py-2 ${selectedWeek === week ? "bg-blue-500 text-white" : "bg-gray-300"}`}
//           >
//             Week {week}
//           </Button>
//         ))}
//       </div>
      
//       {/* Day Selection */}
//       <div className="flex justify-center gap-2 mb-6">
//         {[1, 2, 3, 4, 5, 6, 7].map((day) => (
//           <Button
//             key={day}
//             onClick={() => setSelectedDay(day)}
//             className={`px-4 py-2 ${selectedDay === day ? "bg-green-500 text-white" : "bg-gray-300"}`}
//           >
//             Day {day}
//           </Button>
//         ))}
//       </div>

//       {/* Task Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {dayTasks.length > 0 ? (
//           dayTasks.map((task) => (
//             <motion.div
//               key={task.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="p-8 border rounded-xl shadow-lg bg-blue-100 border-blue-300 min-h-[250px]"
//             >
//               <h2 className="text-2xl font-semibold text-gray-900">{task.task}</h2>
//               <p className="text-gray-700 mb-4">Disorder: {task.disorder} ({task.severity})</p>
//               <p className="text-gray-700 mb-4">{task.reflection ? `Reflection: ${task.reflection}` : "No reflections yet"}</p>
              
//               <span className={`text-xl font-bold ${
//                 task.status === "completed"
//                   ? "text-green-700"
//                   : task.status === "skipped"
//                   ? "text-red-700"
//                   : "text-blue-700"
//               }`}>
//                 {task.status === "completed"
//                   ? "Completed"
//                   : task.status === "skipped"
//                   ? "Skipped"
//                   : "Pending"}
//               </span>

//               <div className="flex items-center mt-4 justify-start gap-2">
//                 <Button
//                   onClick={() => handleCompletion(task.id)}
//                   disabled={task.status !== "pending"}
//                   className="bg-green-400 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105 disabled:opacity-80"
//                 >
//                   Done
//                 </Button>
//                 <Button
//                   onClick={() => handleSkip(task.id)}
//                   disabled={task.status !== "pending"}
//                   className="bg-red-400 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105 disabled:opacity-80"
//                 >
//                   Skip
//                 </Button>
//                 <Link href={`/pages/video?query=${encodeURIComponent(task.task)}`}>
//                   <Button className="bg-purple-400 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105">
//                     Watch Video
//                   </Button>
//                 </Link>
//               </div>
//             </motion.div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500">No tasks for this day.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TaskManager;
'use client';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface DailyTask {
  id: string;
  userId: string;
  disorder: string;
  severity: string;
  week: number;
  day: number;
  task: string;
  status: "pending" | "completed" | "skipped" | string;
  reflection?: string;
  createdAt: string;
}

const TaskManager = () => {
  const [tasks, setTasks] = useState<Record<number, Record<number, DailyTask[]>>>({});
  const [loading, setLoading] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [selectedDay, setSelectedDay] = useState<number>(1);

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Tasks:", data);
        setTasks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading tasks...</p>;
  }

  const weekTasks = tasks[selectedWeek] || {};
  const dayTasks = weekTasks[selectedDay] || [];

  const handleTakeActivity = async (taskId: string) => {
    await fetch(`/api/tasks/assign`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId, status: "completed" }),
    });

    setTasks((prev) => ({
      ...prev,
      [selectedWeek]: {
        ...prev[selectedWeek],
        [selectedDay]: prev[selectedWeek][selectedDay].map((task) =>
          task.id === taskId ? { ...task, status: "completed" } : task
        ),
      },
    }));
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
        Task Manager - Weekly Challenge
      </h1>
      
      {/* Week Selection */}
      <div className="flex justify-center gap-4 mb-4">
        {[1, 2, 3, 4, 5].map((week) => (
          <Button
            key={week}
            onClick={() => setSelectedWeek(week)}
            className={`px-4 py-2 ${selectedWeek === week ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          >
            Week {week}
          </Button>
        ))}
      </div>
      
      {/* Day Selection */}
      <div className="flex justify-center gap-2 mb-6">
        {[1, 2, 3, 4, 5, 6, 7].map((day) => (
          <Button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 ${selectedDay === day ? "bg-green-500 text-white" : "bg-gray-300"}`}
          >
            Day {day}
          </Button>
        ))}
      </div>

      {/* Task Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {dayTasks.length > 0 ? (
          dayTasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 border rounded-xl shadow-lg bg-blue-100 border-blue-300 min-h-[250px]"
            >
              <h2 className="text-2xl font-semibold text-gray-900">{task.task}</h2>
              <p className="text-gray-700 mb-4">Disorder: {task.disorder} ({task.severity})</p>
              <p className="text-gray-700 mb-4">{task.reflection ? `Reflection: ${task.reflection}` : "No reflections yet"}</p>
              
              <span className={`text-xl font-bold ${
                task.status === "completed"
                  ? "text-green-700"
                  : task.status === "skipped"
                  ? "text-red-700"
                  : "text-blue-700"
              }`}>
                {task.status === "completed"
                  ? "Completed"
                  : task.status === "skipped"
                  ? "Skipped"
                  : "Pending"}
              </span>

              <div className="flex items-center mt-4 justify-start gap-2">
                <Button
                  onClick={() => handleTakeActivity(task.id)}
                  disabled={task.status !== "pending"}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105 disabled:opacity-80"
                >
                  Take Activity
                </Button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500">No tasks for this day.</p>
        )}
      </div>
    </div>
  );
};

export default TaskManager;
