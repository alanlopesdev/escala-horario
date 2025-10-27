"use client"

import Image from "next/image";
import Logoraia from '@/public/imgs/logo-rd.png'
import db from "@/db.json"
import { useState } from "react";


export default function Home() {

  const [matricula, setMatricula] = useState(0)
  const [dados, setDados] = useState({})
  const [islogged, setLogged] = useState(false)

  const EscreverNome = async () =>{
    if (matricula in db){
      setLogged(true)
      setDados(db)

    }
  }

if (islogged == false){
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
        type="number"
        name="matricula"
        placeholder="matricula"
        value={matricula} 
        onChange={(e) => setMatricula(e.target.value)}/>

        <button className="cursor-pointer text-black border-1 p-1" onClick={EscreverNome}>Entrar</button>
        
      </div>

  </div>
  )}
  if (islogged === true){
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
              <h1>Olá, {dados[matricula].gerente}! Seja bem-vinda ao Planeja RD</h1>
          </div>
          <div className="flex flex-row gap-5">
          <div className="cursor-pointer flex border-2 border-black justify-center bg-gray-200 p-2 rounded-md min-w-70"><h1>Crie uma escala mensal ou semanal</h1></div>
          <div className="cursor-pointer flex bg-gray-200 p-2 border-2 border-black rounded-md min-w-70 justify-center"><h1>Distribuia os horários e intervalos</h1></div>
          </div>
      </div>
  </div>
  )}
}

