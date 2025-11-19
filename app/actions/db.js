"use server";

import clientPromise from "@/libs/mongo";


export async function getUsers() {
  const client = await clientPromise;
  const db = client.db("dev");

  return db.collection("users").find().toArray();
}

/**
 * Legger til en spiller i et eksisterende spill
 * @param {string} gameCode - koden til spillet (f.eks. ABC-DEF-123)
 * @param {string} playerName - navnet til spilleren
 * @param {string} newStatus - ny status, f.eks. "live"
 */

export async function addPlayerToGame(gameCode, playerName) {
  const client = await clientPromise;
  const db = client.db("production");

  const result = await db.collection("games").updateOne(
    { gameCode },
    { 
      $push: { 
        players: { name: playerName, joinedAt: new Date(), isTargeted: false, score: null } 
      } 
    }
  );

  if (result.matchedCount === 0) {
    throw new Error("Spill med den koden finnes ikke");
  }

  return { success: true };
}

export async function createGame(gameCode) {
  const client = await clientPromise;
  const db = client.db("production"); // <-- databasen heter production

  const newGame = {
    gameCode,          // f.eks. ABC-DEF-123
    players: [],       // tom array til å legge til spillere senere
    status: "waiting", // "waiting" | "playing" | "finished"
    createdAt: new Date()
  };
  
  const result = await db.collection("games").insertOne(newGame);
  console.log("Nytt spill opprettet:", newGame);
}

export async function updateGameStatus(gameCode, newStatus) {
  const client = await clientPromise;
  const db = client.db("production");

  const result = await db.collection("games").updateOne(
    { gameCode },
    { $set: { status: newStatus } }
  );

  if (result.matchedCount === 0) {
    throw new Error("Spill med denne koden finnes ikke");
  }

  return { success: true };
}

export async function assignScores(gameCode) {
  const client = await clientPromise;
  const db = client.db("production");

  const game = await db.collection("games").findOne({ gameCode });

  if (!game) throw new Error("Spillet finnes ikke");

  const updatedPlayers = game.players.map(player => {
    if (player.score != null) return player; // ikke overskriv score hvis allerede satt

    const min = player.isTargeted ? 98 : 121;
    const max = player.isTargeted ? 112 : 133;
    return {
      ...player,
      score: Math.floor(Math.random() * (max - min + 1)) + min
    };
  });

  await db.collection("games").updateOne(
    { gameCode },
    { $set: { players: updatedPlayers } }
  );

  return updatedPlayers;
}
