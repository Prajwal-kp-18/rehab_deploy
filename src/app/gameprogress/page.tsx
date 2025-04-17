import Dashboard from "./Dashboard";
interface GameProgress {
    id: string;
    userId: string;
    gameId: string;
    datePlayed: string;
    score: number;
    completion: boolean;
    timeSpent?: number | null;
    accuracy?: number | null;
    difficulty: string;
    streak?: number | null;
    dropOffRate: number;
    frustrationScore?: number | null;
    badgesEarned: string[];
    challengesDone?: number | null;
    gameData?: any;
  }

async function fetchInitialGameData(): Promise<GameProgress[]> {
  try {
    const res = await fetch("/api/games/progress", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching game data:", error);
    return [];
  }
}

export default async function DashboardPage() {
  const initialData = await fetchInitialGameData();

  return <Dashboard initialData={initialData} />;
}
