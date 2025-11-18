"use client"

export default function SpillSide() {
    const counter = 30
    return (
        <div className="flex flex-col h-full items-center justify-between">
            <div className="flex flex-row justify-between items-center bg-secondary rounded-2xl w-10/10 pt-2 pb-2">
                <div className="ml-5 mr-5 flex flex-row justify-between items-center w-10/10 text-secondary-content">
                    <h6 className="font-light!">1/10</h6>
                    <h4>Deltager 1</h4>
                    <span className="countdown ">
                        <span style={{"--value":30} } aria-live="polite" aria-label={counter}>36</span>
                    </span>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center w-10/10">
                <h5 className="mb-5 text-secondary">Hva er neste tall i rekken..?</h5>
                <div className="flex flex-col items-center justify-center gap-10 bg-secondary-content w-10/10 rounded-2xl pb-5 pt-5 ">
                    <h3>1, 3, 10, 15, 21, <span className= "text-secondary underline underline-offset-5">?</span> </h3>
                    <input type="text" placeholder="?" className="input input-secondary w-50 text-center text-secondary font-black text-7xl p-0 mb-5 h-25" />
                </div>
            </div>

            <div className="flex flex-row-reverse justify-between w-10/10">
                <button className="btn btn-success">Fortsett</button>
                <button className="btn btn-soft btn-secondary">Tilbake</button>
            </div>
        </div>
    )
}