import clientPromise from "@/libs/mongo";

export async function POST(req) {
    try {
        const { gameCode, playerName, isTargeted } = await req.json();

        const client = await clientPromise;
        const db = client.db("production");

        await db.collection("games").updateOne(
            { gameCode, "players.name": playerName },
            { $set: { "players.$.isTargeted": isTargeted } }
        );

        return Response.json({ success: true });
    } catch (err) {
        console.error(err);
        return Response.json({ error: "Database error" }, { status: 500 });
    }
}
