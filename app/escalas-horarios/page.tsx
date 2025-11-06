export default function EscalaHorarios(){
    return(
        <div className="bg-white flex h-screen justify-center items-center flex-col gap-5">
            <header>
            <div className="flex grid-row-4 gap-4">
                <div className="justify-items-center  min-w-25 text-black border-2 border-black p-2"><h1>NSS 100%</h1></div>
                <div className="justify-items-center  min-w-25 border-2 border-black p-2 text-black"><h1>VENDA 95%</h1></div>
                <div className="justify-items-center  min-w-25 border-2 border-black p-2 text-black"><h1>APOIOS 200</h1></div>
                <div className="justify-items-center  min-w-25 border-2 border-black p-2 text-black"><h1>TO - OK</h1></div>
            </div>
            </header>
            <div className="flex text-black w-250 h-100 justify-center items-center gap-30 flex-col">
                <div>
                    <h1>Olá, Deborah!</h1>
                </div>
                <div className="flex flex-row gap-5">
                <div className="cursor-pointer flex border-2 border-black justify-center bg-gray-200 p-2 rounded-md min-w-70"><h1>Crie uma escala mensal ou semanal</h1></div>
                <div className="cursor-pointer flex bg-gray-200 p-2 border-2 border-black rounded-md min-w-70 justify-center"><h1>Distribuia os horários e intervalos</h1></div>
                </div>
            </div>
        </div>
    )
}