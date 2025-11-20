import clientPromise from "@/libs/mongo";

export async function POST(req) {
  console.log("getPlayerScore route called");

  const { gameCode, name } = await req.json();

  const client = await clientPromise;
  const db = client.db("production");

  const game = await db.collection("games").findOne({ gameCode });

  if (!game) return Response.json({ error: "Game not found" }, { status: 404 });

  const player = game.players.find(p => p.name === name);

  if (!player) return Response.json({ error: "Player not found" }, { status: 404 });

  return Response.json({ score: player.score });
}
