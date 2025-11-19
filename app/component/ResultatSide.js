"use client"
import Link from "next/link"
import { useSearchParams } from "next/navigation";

export default function ResultatSide(){
    
    const searchParams = useSearchParams();
    const name = searchParams.get("name")
    const gameCode = searchParams.get("code");

     return (
        <div className="flex flex-col h-full items-center justify-start gap-20">
            <div className="flex flex-col items-center gap-8 mt-10">
                <h2>Beregnet IQ</h2>
                <div className="flex flex-col items-center">
                    <h3 className=" text-secondary font-black! text-8xl!">110</h3>
                </div>
            </div>
            <div className="flex flex-col gap-6 text-center h-10/10 justify-between w-full">
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
                            {/* row 1 */}
                            <tr>
                                <th>1</th>
                                <td>Deltager 2</td>
                                <td>128</td>
                            </tr>
                            {/* row 2 */}
                            <tr>
                                <th>2</th>
                                <td>Deltager 3</td>
                                <td>122</td>
                            </tr>
                            {/* row 3 */}
                            <tr>
                                <th>3</th>
                                <td>Deltager 1</td>
                                <td>110</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Link href="/">
                    <button className="btn btn-active btn-secondary w-full">Spill igjen</button>
                </Link>
            </div>
        </div>
    )
}