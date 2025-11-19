import { assignScores } from "@/app/actions/db"; 

export async function POST(req) {
  const { gameCode } = await req.json();

  try {
    const updatedPlayers = await assignScores(gameCode);
    return Response.json({ success: true, players: updatedPlayers });
  } catch (err) {
    console.error(err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
