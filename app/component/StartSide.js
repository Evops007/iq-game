"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createGame } from "../actions/db";
import { addPlayerToGame } from "../actions/db";


export default function StartSide(){

    const [gameCode, setGameCode] = useState("");
    const [name, setName] = useState("")
    const [showError, setShowError] = useState(false)
    const pattern = /^[A-Z]{3}-[A-Z]{3}-\d{3}$/;

    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = pattern.test(gameCode);
        if(!isValid) {
            setShowError(true) 
        } else {
            setShowError(false)
        }
    }


    const handleStartSpill = async () => {
        // Funksjon for å generere spillkode
        const generateGameCode = () => {
            const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

            const randomLetters = (len) =>
                Array.from({ length: len }, () => letters[Math.floor(Math.random() * letters.length)]).join("");

            const randomNumbers = (len) =>
                Array.from({ length: len }, () => Math.floor(Math.random() * 10)).join("");

            return `${randomLetters(3)}-${randomLetters(3)}-${randomNumbers(3)}`;
        };

        const code = generateGameCode();

        try {
            // Opprett nytt spill i databasen
            await createGame(code);

            // Naviger til SpillMester-siden med koden i URL
            router.push(`/spillmester?code=${code}`);
        } catch (error) {
            console.error("Kunne ikke opprette spill:", error);
        }
    };

    const handleJoinGame = async () => {
        try {
            await addPlayerToGame(gameCode, name); // gameCode og name fra state
            router.push(`/deltagerside?code=${gameCode}&name=${name}`);      // gå videre til spillet
        } catch (error) {
            console.error(error);
            setShowError(true);                     // vis feilmelding
        }
    };


    return(
        <div className="flex flex-col h-full justify-between items-center">
            <div className="flex flex-col gap-6 text-center">
                <h1>IQ-spillet</h1>
                <div>
                    <p>Testen består av tallrekker der du skal finne mønster og logiske sammenhenger for å finne ut hva det neste tallet er</p>
                </div>
            </div>

            <form >
                <fieldset className="flex flex-col fieldset bg-secondary-content border-base-300 rounded-box border my-auto p-4 items-stretch">
                    <h5>Bli med i eksisterende spill</h5>
                    
                    <div role="alert" className={!showError ? "hidden" : "alert alert-error alert-dash w-97/100 m-auto"}>
                        <span>Feil kode, prøv igjen</span>
                    </div>
                    
                    <label htmlFor="gamecode" className="label tooltip-error" data-tip="error"></label>
                    <input 
                        value={gameCode}
                        name="gameCode"
                        id="gamecode" 
                        onChange={(e) => {
                            const val = e.target.value.toUpperCase();
                            if (val.length <= 11) setGameCode(val);
                        }}
                        type="text" 
                        className="input" 
                        placeholder="Legg inn kode"
                    />
                    
                    <label htmlFor="name" className="label"></label>
                    <input onChange={(e) => setName(e.target.value)} type="text" className="input" placeholder="Navn" />

                    <button type="button" onClick={handleJoinGame} className={name && gameCode ? 'btn btn-primary mt-8' : "btn btn-disabled mt-8" }>Bli med</button>
                </fieldset>
            </form>
            
            <div className="mb-6 w-fit">        
                <button onClick={handleStartSpill} className="btn btn-soft btn-secondary w-85">Start nytt spill</button>
            </div>
            

        </div>
    );
};