"use client"
import Link from "next/link"
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ResultatTabell from "./ResultatTabell";



export default function ResultatSide(){
    
    const searchParams = useSearchParams();
    const name = searchParams.get("name")
    const gameCode = searchParams.get("code");
    const [score, setScore] = useState("");
    const [gameStatus, setGameStatus] = useState("live");


    useEffect(() => {
        async function loadScore() {
        const res = await fetch("/api/getPlayerScore", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gameCode, name })
        });
        
        const data = await res.json();
        setScore(data.score);
        }

        loadScore();
    }, [gameCode, name]);

    useEffect(() => {
    const interval = setInterval(async () => {
        const res = await fetch(`/api/getGameStatus?code=${gameCode}`);
        const data = await res.json();
        setGameStatus(data.status);
    }, 1500);

    return () => clearInterval(interval);
    }, [gameCode]);


    return (
        <div className="flex flex-col h-full items-center justify-start gap-20">
            <div className="flex flex-col items-center gap-8 mt-10">
                <h2>Beregnet IQ</h2>
                <div className={gameStatus === "live" ? "flex flex-col items-center blur-lg" : "flex flex-col items-center"}>
                    <h3 className="text-secondary font-black! text-8xl!" >{score}</h3>
                </div>
            </div>
            <div className="flex flex-col gap-6 text-center h-10/10 justify-between w-full">
                <div className={gameStatus === "live" ? "blur-sm" : "" } >
                    <ResultatTabell gameCode={gameCode}/>
                </div>
                <Link href="/">
                    <button className="btn btn-active btn-secondary w-full">Spill igjen</button>
                </Link>
            </div>
        </div>
    )
}