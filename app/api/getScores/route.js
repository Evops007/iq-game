import clientPromise from "@/libs/mongo";

export async function POST(req) {
  const { gameCode } = await req.json();

  const client = await clientPromise;
  const db = client.db("production");

  const game = await db.collection("games").findOne({ gameCode });

  if (!game) {
    return Response.json({ error: "Spill ikke funnet" }, { status: 404 });
  }

  // bare spillere som faktisk har fått score
  const players = game.players.filter(p => p.score !== null);

  return Response.json({ players });
}
