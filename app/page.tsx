"use client"

import Image from "next/image";
import Logoraia from '@/public/imgs/logo-rd.png'
import { useState } from "react";


export default function Home() {
  
  const [matricula, setMatricula] = useState("")
  const EscreverNome = async () =>{
    console.log(matricula)
  }

  return (
<div className="flex items-center justify-center flex-col bg-white h-screen">
  <header className="flex justify-center items-center flex-col">
    <div className="flex items-center flex-row">
        <Image
        src={Logoraia}
        width={75}
        height={75}
        alt="logo"
      />
      <p className="text-9x1 text-black">Planeja RD</p>
    </div>
  </header>

    <div className="grid grid-rol-3 gap-y-2 border-2 border-black bg-white max-w-65 max-h-50 rounded-md p-5">
        <h1 className="text-black p-2">DIGITE SUA MATRICULA</h1>

        <input className="rounded-md bg-gray-200 p-2 text-black border-1"
         type="text"
        name="matricula"
        placeholder="matricula"
        value={matricula} 
        onChange={(e) => setMatricula(e.target.value)}/>

        <button className="cursor-pointer text-black border-1 p-1" onClick={EscreverNome}>Entrar</button>
        
      </div>

  </div>
  );
}
