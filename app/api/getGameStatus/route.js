// app/api/getGameStatus/route.js
import clientPromise from "@/libs/mongo";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const gameCode = searchParams.get("code");

    const client = await clientPromise;
    const db = client.db("production");

    const game = await db.collection("games").findOne({ gameCode }, { projection: { status: 1 } });

    if (!game) {
      return new Response(JSON.stringify({ error: "Spill ikke funnet" }), { status: 404 });
    }

    return new Response(JSON.stringify({ status: game.status }));
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Database error" }), { status: 500 });
  }
}
