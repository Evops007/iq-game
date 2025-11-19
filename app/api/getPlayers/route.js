import { NextResponse } from "next/server";
import clientPromise from "@/libs/mongo";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  const client = await clientPromise;
  const db = client.db("production");

  const game = await db.collection("games").findOne({ gameCode: code });
  if (!game) return NextResponse.json({ players: [] });

  return NextResponse.json({ players: game.players || [] });
}