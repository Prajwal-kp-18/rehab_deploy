import React, { useEffect, useState } from "react";
import { Trophy, Flame, Medal, Target } from "lucide-react";

function App() {
  const streakData = {
    currentStreak: 12,
    weeklyProgress: 85,
    monthlyGoal: 92,
  };
  const[progressData, setProgressData] = useState<any | null>(null);
  useEffect(() => {
    fetch("/api/tasks/progress")
      .then((response) => response.json())
      .then((data) => {
        progressData(data);
        console.log(data);
      });
  }, []);

  const badges = [
    {
      id: 1,
      name: "Goal Crusher",
      description: "Exceeded monthly targets",
      icon: <Target className="w-8 h-8 text-gray-600" />,
      achieved: true,
      date: "2024-03-15",
    },
    {
      id: 2,
      name: "Consistency King",
      description: "30-day perfect streak",
      icon: <Trophy className="w-8 h-8 text-gray-600" />,
      achieved: false,
      date: null,
    },
    {
      id: 3,
      name: "Early Bird",
      description: "Morning routine master",
      icon: <Flame className="w-8 h-8 text-gray-600" />,
      achieved: true,
      date: "2024-03-10",
    },
  ];

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gray-100 rounded-2xl p-8 shadow-xl border border-gray-300">
          <h1 className="text-4xl font-bold text-black mb-2">My Progress</h1>
          <p className="text-gray-600">Track your streaks and achievements</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-100 rounded-xl p-6 shadow-xl border border-gray-300">
            <div className="flex items-center space-x-4">
              <Flame className="w-12 h-12 text-gray-600" />
              <div>
                <p className="text-gray-600">Current Streak</p>
                <p className="text-3xl font-bold text-black">
                  {streakData.currentStreak} days
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-6 shadow-xl border border-gray-300">
            <div className="flex items-center space-x-4">
              <Trophy className="w-12 h-12 text-gray-600" />
              <div>
                <p className="text-gray-600">Weekly Progress</p>
                <p className="text-3xl font-bold text-black">
                  {streakData.weeklyProgress}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-xl p-6 shadow-xl border border-gray-300">
            <div className="flex items-center space-x-4">
              <Target className="w-12 h-12 text-gray-600" />
              <div>
                <p className="text-gray-600">Monthly Goal</p>
                <p className="text-3xl font-bold text-black">
                  {streakData.monthlyGoal}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <div className="bg-gray-100 rounded-2xl p-8 shadow-xl border border-gray-300">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-black">Badges</h2>
            <p className="text-gray-600">Your earned achievements</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`relative p-6 rounded-xl border transition-all duration-300 hover:transform hover:scale-105
                  ${
                    badge.achieved
                      ? "border-gray-400 bg-gray-200"
                      : "border-gray-400 bg-gray-100"
                  }`}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 rounded-lg ${
                      badge.achieved ? "bg-gray-300" : "bg-gray-200"
                    }`}
                  >
                    {badge.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-black flex items-center gap-2">
                      {badge.name}
                      {badge.achieved && (
                        <Medal className="w-4 h-4 text-gray-600" />
                      )}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {badge.description}
                    </p>
                    {badge.achieved && (
                      <p className="text-xs text-gray-600 mt-2">
                        Earned{" "}
                        {badge.date
                          ? new Date(badge.date).toLocaleDateString()
                          : "N/A"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
