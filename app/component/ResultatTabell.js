"use client";

import { useState, useEffect } from "react";

export default function ResultatTabell({ gameCode }) {

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        if (!gameCode) return;

        const fetchScores = async () => {
            const res = await fetch("/api/getScores", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ gameCode })
            });

            const data = await res.json();

            // sorter fra høyest til lavest
            const sorted = data.players.sort((a, b) => b.score - a.score);

            setPlayers(sorted);
        };

        fetchScores();
    }, [gameCode]);


    return (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Plassering</th>
                        <th>Navn</th>
                        <th>IQ</th>
                    </tr>
                </thead>

                <tbody>
                    {players.map((player, index) => (
                        <tr key={player.name}>
                            <th>{index + 1}</th>
                            <td>{player.name}</td>
                            <td>{player.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="text-xs text-center text-gray-600 pb-1 pt-2">Utregnet av intelligencetest.com</p>
        </div>
    )
}