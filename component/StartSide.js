"use client"
import { useState } from "react";


export default function StartSide(){

    const [gameCode, setGameCode] = useState("");
    const [name, setName] = useState("")
    const [showError, setShowError] = useState(false)
    const pattern = /^[A-Z]{3}-[A-Z]{3}-\d{3}$/;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = pattern.test(gameCode);
        if(!isValid) {
            setShowError(true) 
        } else {
            setShowError(false)
        }
    }

    return(
        <div className="flex flex-col h-full justify-between items-center">
            <div className="flex flex-col gap-6 text-center">
                <h1>IQ-spillet</h1>
                <div>
                    <p>Testen består av tallrekker der du skal finne mønster og logiske sammenhenger for å finne ut hva det neste tallet er</p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <fieldset className="flex flex-col fieldset bg-secondary-content border-base-300 rounded-box border my-auto p-4 items-stretch">
                    <h5>Bli med i eksisterende spill</h5>
                    
                    <div role="alert" className={!showError ? "hidden" : "alert alert-error alert-dash w-97/100 m-auto"}>
                        <span>Feil kode, prøv igjen</span>
                    </div>
                    
                    <label htmlFor="gamecode" className="label tooltip-error" data-tip="error"></label>
                    <input 
                        value={gameCode} 
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

                    <button type="submit" className={name && gameCode ? 'btn btn-primary mt-8' : "btn btn-disabled mt-8" }>Bli med</button>
                </fieldset>
            </form>

            <div className="mb-6 w-fit">
                <button className="btn btn-soft btn-secondary w-85">Start nytt spill</button>
            </div>

        </div>
    );
};