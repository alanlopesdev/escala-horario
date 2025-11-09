"use client"

import Image from "next/image";
import Link from 'next/link'
import Logoraia from '@/public/imgs/logo-rd.png'
import db from "@/db.json"
import { useState } from "react";


export default function Home() {
  type Gerente = {
    matricula: string
    "nome": string}
  
  const [matricula, setMatricula] = useState("")
  const [dados, setDados] = useState<Gerente | null>(null)
  const [islogged, setLogged] = useState(false)

  const Logar = async () =>{
    const gerente = db.gerentes.find(gerente => gerente.matricula === matricula)
    if (gerente){
      setLogged(true)
      setDados(gerente)

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

    <main className="grid grid-rol-3 gap-y-2 border-2 border-black bg-white max-w-65 max-h-50 rounded-md p-5">
        <h1 className="text-black p-2">DIGITE SUA MATRICULA</h1>

        <input className="rounded-md bg-gray-200 p-2 text-black border-1"
        type="number"
        name="matricula"
        placeholder="matricula"
        value={matricula} 
        onChange={(e) => setMatricula(e.target.value)}/>

        <button className="cursor-pointer text-black border-1 p-1" onClick={Logar}>Entrar</button>
        
      </main>
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
      <main className="flex text-black w-250 h-100 justify-center items-center gap-30 flex-col">
          <div>
              <h1>Olá, {dados?.nome}!</h1>
          </div>
          <nav className="flex flex-row gap-5">
          <Link href="semanal-mensal" className="cursor-pointer flex bg-gray-200 p-2 border-2 border-black rounded-md min-w-70 justify-center">Crie uma escala mensal ou semanal</Link>
          <Link href="horarios" className="cursor-pointer flex bg-gray-200 p-2 border-2 border-black rounded-md min-w-70 justify-center">Distribuia os horários e intervalos</Link>
          </nav>
      </main>
  </div>
  )}
}

