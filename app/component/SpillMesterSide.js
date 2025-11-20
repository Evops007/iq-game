"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { addPlayerToGame, updateGameStatus } from "../actions/db";
import { useRouter } from "next/navigation";

export default function SpillMesterSide({ gameCode }) {
    const [hostName, setHostName] = useState("")
    const [players, setPlayers] = useState([])
    const [gameCodeFromUrl, setGameCodeFromUrl] = useState("");
    const name = hostName
    const router = useRouter();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setGameCodeFromUrl(params.get("code") || "");
    }, []);

    const fetchPlayers = async () => {
        try {
        const res = await fetch(`/api/getPlayers?code=${gameCodeFromUrl}`);
        const data = await res.json();
        setPlayers(data.players);
        } catch (err) {
        console.error("Kunne ikke hente spillere:", err);
        }
    };

    useEffect(() => {
        fetchPlayers(); // hent når komponenten mountes

        const interval = setInterval(fetchPlayers, 2000); // hent hvert 2. sekund
        return () => clearInterval(interval);
    }, [gameCode]);

     const handleJoinGame = async (e) => {
        try {
            await addPlayerToGame(gameCodeFromUrl, hostName); // gameCode og name fra state
        } catch (error) {
            console.error(error);

        }
    };

    const handleToggleTarget = async (playerName, isChecked) => {
        try {
            await fetch("/api/updatePlayers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                gameCode: gameCodeFromUrl,
                playerName,
                isTargeted: isChecked
            })
            });
        } catch (err) {
            console.error("Kunne ikke oppdatere spiller:", err);
        }
    };

    const handleStartGame = async () => {
        try {
            await updateGameStatus(gameCodeFromUrl, "live"); // gameCode fra URL eller state
            console.log("Spillet er nå live!");
            router.push(`/spillside?code=${gameCodeFromUrl}&name=${name}`)
            // eventuelt naviger videre til spillsiden
        } catch (error) {
            console.error("Kunne ikke starte spillet:", error);
        }
    };



    return (
         <div className="flex flex-col h-full items-center justify-start gap-20 overflow-y-auto">
            <div className="flex flex-col items-center gap-8 mt-10">
                <h2 className="text-secondary">Kode: {gameCodeFromUrl}</h2>
            </div>
            <div className="flex flex-col text-center h-8/10 justify-between w-10/10">
                <div className="h-6/10 pb-5 pt-5 bg-secondary-content rounded-2xl">
                    <ul className="h-10/10 overflow-y-auto gap-5 flex flex-col pl-8 pr-8">
                        {players.map((player, idx) => (
                            <li key={idx} className="w-10/10 flex-row flex justify-between">
                                <label htmlFor={`player-${idx}`}>
                                    <h6>{player.name}</h6>
                                </label>
                                <input
                                    id={`player-${idx}`}
                                    name={`player-${idx}`}
                                    type="checkbox"
                                    className="checkbox checkbox-secondary text-secondary-content"
                                    checked={player.isTargeted}
                                    onChange={(e) => handleToggleTarget(player.name, e.target.checked)}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col gap-15 items-center">
                    <fieldset className="fieldset bg-secondary-content border-base-300 rounded-box w-full border p-4">
                        <div className="join flex flex-row gap-5">
                            <input type="text" className="input join-item w-full" placeholder="Ditt navn" value={hostName} onChange={(e) => setHostName(e.target.value)} />
                            <button type="button" onClick={handleJoinGame} className="btn join-item">Lagre</button>
                        </div>
                    </fieldset>
                    <button onClick={handleStartGame} className="btn btn-active btn-secondary w-full">Start spill</button>
                 </div>
            </div>
        </div>
    )
}