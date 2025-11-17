"use client"

export default function DeltagerSide() {
    return (
        <div className="flex flex-col h-full justify-between items-center justify-between">
            <h2>Deltager 1</h2>
            <div className="flex flex-col gap-6 text-center h-3/10 justify-between">
                <div className="flex flex-col items-center gap-5" >
                    <span className="loading loading-spinner text-secondary" ></span>
                    <p>Venter på at spillet skal starte <span className="loading loading-dots loading-xs"></span></p>
                </div>
                <div className="bg-secondary-content rounded-2xl pt-5 pb-5 pr-5 pl-5">
                    <h5 className="text-primary">Eksempel: 1, 3, 5, 7, 9, <span className=" border pl-2 pr-2 text-accent ml-2">?</span> </h5>
                    <h6 className="text-primary font-light!">Riktig svar er 11</h6>

                </div>
            </div>
            <div className="chat chat-start">
                <div className="chat-bubble chat-bubble-primary textarea-sm">Du har 7 minutter på å fullføre de 10 oppgavene. IQ-scoren påvirkes ikke av hvor lang tid du bruker, så bruk tiden fornuftig</div>
            </div>
        </div>
    )
}