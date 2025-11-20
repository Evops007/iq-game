"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { assignScores } from "../actions/db";

export default function SpillSide() {
    const [secondsLeft, setSecondsLeft] = useState(7 * 60); // 7 minutter
    const router = useRouter();
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [name, setName] = useState("");
    const [gameCode, setGameCode] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setName(params.get("name") || "");
        setGameCode(params.get("code") || "");
    }, []);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          const modal = document.getElementById("my_modal_1");
          if (modal) modal.showModal();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval)
    
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

    const oppgaver = {
        "1": {sekvens: "1, 3, 6, 10, 15, 21, ?"}, 
        "2": {sekvens: "15, 30, 32, 64, 66, 132, 134, ?"}, 
        "3": {sekvens: "0, 5, 5, 10, 15, 25, 40, ?"},
        "4": {sekvens: "3829, 7658, 15316, 30632, ?"},
        "5": {sekvens: "97, 96, 93, 88, 81, ?"},
        "6": {sekvens: "3, 3, 6, 5, 12, 7, 24, 9, 48, ?"},
        "7": {sekvens: "100, 100, 99, 97, 96, 92, 91, 85, ?"},
        "8": {sekvens: "1.5, 4.75, 8, 11.25, 14.5, ?"},
        "9": {sekvens: "1, 2, 6, 21, 88, ?"},
        "10": {sekvens: "17, -24, 41, -65, 106, ?"},
        "11": {sekvens: "95, 89, 77, 59, ?"},
        "12": {sekvens: "5, 26, 131, 656, ?"},
        "13": {sekvens: "1, 1, 3, 15, 105, ?"},
        "14": {sekvens: "1, 3, 6, 10, 15, ?"},
        "15": {sekvens: "9, 16, 25, 36, 49, ?"},
        "16": {sekvens: "0, 100, 6, 94, 12, 88, 18, 82, ?"},
        "17": {sekvens: "100, 50, 200, 25, 400, ?"},
        "18": {sekvens: "1, 4, 10, 20, 35, ?"},
        "19": {sekvens: "0, 1, 4, 9, 16, 25, 36, 49, ?"},
        "20": {sekvens: "11, 23, 38, 11, 23, ?"},
        "21": {sekvens: "1, 4, 9, 16, 25, ?"},
        "22": {sekvens: "25, 5, 36, 6, 81, 9, 121, ?"},
        "23": {sekvens: "1, 2, 6, 24, 120, ?"},
        "24": {sekvens: "15, 25, 30, 50, 60, 100, ?"},
        "25": {sekvens: "1 , 3 , 8 , 19, ?"},
        "26": {sekvens: "6, 28, 12, 14, 24, 7, ?"},
        "27": {sekvens: "7, 19, 43, 91, ?"},
        "28": {sekvens: "17, 32, 61, 118, ?"},
        "29": {sekvens: "23, 25, 28, 32, 34, 37, ?"},
        "30": {sekvens: "32, 112, 392, 1372, 4802, ?"},
    };

     useEffect(() => {
        const keys = Object.keys(oppgaver);
        const shuffled = keys.sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, 10).map(key => oppgaver[key]);
        setQuestions(selected);
    }, []);

    const handleNext = async () => {
        setAnswer(""); // nullstill input

        if (currentIndex + 1 >= questions.length) {
            try {
            // Kall API-route som kjører assignScores på server
            await fetch(`/api/assignScores`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ gameCode, playerName: name })
            });

            // Send deltageren til resultatsiden
            router.push(`/resultatside?code=${gameCode}&name=${name}`);
            } catch (err) {
            console.error("Kunne ikke tildele score:", err);
            }
        } else {
            setCurrentIndex(prev => prev + 1);
        }
    };

    if (questions.length === 0) return <p>Laster spørsmål...</p>;

    const handleTidUte = () => {
        router.push(`/resultatside?code=${gameCode}&name=${name}`);
        assignScores()
    }

    return (
        <div className="flex flex-col h-full items-center justify-between mb-5">
            <div className="flex flex-row justify-between items-center bg-secondary rounded-2xl w-10/10 pt-2 pb-2">
                <div className="ml-5 mr-5 flex flex-row justify-between items-center w-10/10 text-secondary-content">
                    <h6 className="font-light! text-2xl!">{currentIndex + 1}/10</h6>
                    <span className="countdown font-mono text-2xl">
                        <span
                            style={{ "--value": minutes } }
                            aria-live="polite"
                            aria-label={minutes.toString().padStart(2, "0")}
                        >
                            {minutes.toString().padStart(2, "0")}
                        </span>
                        :
                        <span
                            style={{ "--value": seconds, "--digits": 2 } }
                            aria-live="polite"
                            aria-label={seconds.toString().padStart(2, "0")}
                        >
                            {seconds.toString().padStart(2, "0")}
                        </span>
                    </span>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center w-10/10">
                <h5 className="mb-5 text-secondary">Hva er neste tall i rekken..?</h5>
                <div className="flex flex-col items-center justify-center gap-10 bg-secondary-content rounded-2xl pb-5 pt-5 w-full pl-2 pr-2 text-center ">
                    <h6>{questions[currentIndex].sekvens.split("?")[0]} <span className= "text-secondary underline underline-offset-5 font-bold">?</span> </h6>
                    <input 
                    type="tel" 
                    placeholder="?"
                    value={answer}
                    onChange={e => setAnswer(e.target.value)} 
                    className="input input-secondary w-50 text-center text-secondary font-black text-7xl p-0 mb-5 h-25" />
                </div>
            </div>

            <div className="flex flex-row-reverse justify-between w-10/10 mb-5">
                <button disabled={!answer} onClick={handleNext} className="btn btn-success w-10/10">Fortsett</button>
            </div>

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box flex flex-col items-center">
                <h3 className="font-bold text-lg">Tiden er ute!</h3>
                <p className="py-4">Trykk knappen under for å fortsette.</p>
                <div className="modal-action">
                    <form method="dialog">
                    <button onClick={handleTidUte} className="btn btn-secondary">Fortsett</button>
                    </form>
                </div>
                </div>
            </dialog>
        </div>

        
    )
}