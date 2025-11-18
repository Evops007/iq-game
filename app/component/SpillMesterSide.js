"use client"
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { addPlayerToGame } from "../actions/db";

export default function SpillMesterSide({ gameCode }) {
    const [hostName, setHostName] = useState("")
    const [players, setPlayers] = useState([])
    const searchParams = useSearchParams();
    const gameCodeFromUrl = searchParams.get("code");

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

    return (
         <div className="flex flex-col h-full items-center justify-start gap-20 overflow-y-auto">
            <div className="flex flex-col items-center gap-8 mt-10">
                <h2 className="text-secondary">Kode: {gameCodeFromUrl}</h2>
            </div>
            <div className="flex flex-col text-center h-10/10 justify-between w-8/10">
                 <ul>
                    {players.map((player, idx) => (
                        <li key={idx}>
                            <div className="flex flex-row gap-5 justify-between w-full items-center mb-5">
                                <label htmlFor={`player-${idx}`}>
                                <h6>{player.name}</h6>
                                </label>
                                <input
                                id={`player-${idx}`}
                                name={`player-${idx}`}
                                type="checkbox"
                                className="checkbox checkbox-secondary"
                            />
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="flex flex-col gap-15 items-center">
                    <fieldset className="fieldset bg-secondary-content border-base-300 rounded-box w-xs border p-4">
                        <div className="join flex flex-row gap-5">
                            <input type="text" className="input join-item" placeholder="Ditt navn" value={hostName} onChange={(e) => setHostName(e.target.value)} />
                            <button type="button" onClick={handleJoinGame} className="btn join-item">Lagre</button>
                        </div>
                    </fieldset>
                    <button className="btn btn-active btn-secondary w-full">Start spill</button>
                 </div>
            </div>
        </div>
    )
}