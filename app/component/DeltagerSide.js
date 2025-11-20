"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeltagerSide() {

    const [gameCode, setGameCode] = useState(null);
    const [name, setName] = useState(null);
    const router = useRouter();

     useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setGameCode(params.get("code"));
        setName(params.get("name"));
    }, []);

    useEffect(() => {
    if (!gameCode || !name) return;

    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/getGameStatus?code=${gameCode}`);
        const data = await res.json();

        if (data.status === "live") {
          router.push(`/spillside?code=${gameCode}&name=${name}`);
        }
      } catch (err) {
        console.error("Feil ved henting av status:", err);
      }
    };

        // Sjekk umiddelbart og deretter hvert 2. sekund
    checkStatus();
        const interval = setInterval(checkStatus, 2000);
        return () => clearInterval(interval);
    }, [gameCode, name, router]);


    return (
        <div className="flex flex-col h-full items-center justify-between">
            <div className="flex flex-col items-center">
                <h2 className="text-secondary">{name}</h2>
                <h3>{gameCode}</h3>
            </div>
            <div className="flex flex-col gap-6 text-center h-3/10 justify-between">
                <div className="flex flex-col items-center gap-5" >
                    <span className="loading loading-spinner text-secondary" ></span>
                    <p>Venter på at spillet skal starte <span className="loading loading-dots loading-xs"></span></p>
                </div>
                <div className="bg-secondary-content rounded-2xl pt-5 pb-5 pr-5 pl-5">
                    <h5 className="text-secondary">Eksempel: 1, 3, 5, 7, 9, <span className=" border pl-2 pr-2 text-secondary ml-2">?</span> </h5>
                    <h6 className="text-secondary font-light!">Riktig svar er 11</h6>

                </div>
            </div>
            <div className="chat chat-start">
                <div className="chat-bubble chat-bubble-primary textarea-sm">Du har 7 minutter på å fullføre de 10 oppgavene. IQ-scoren påvirkes ikke av hvor lang tid du bruker, så bruk tiden fornuftig</div>
            </div>
        </div>
    )
}