"use client"

import Image from "next/image";
import Logoraia from '@/public/imgs/logo-rd.png'
import { useState, useEffect, use } from "react";
import db from '@/db.json'
import {EscreverVotos, ListarFuncionarios, SugerirIntervalo, FooterNSS, FuncionariosRender} from '@/app/horarios/scripts'

export default function Horarios(){
    const [dataAtual, setData] = useState(Date())
    const [asideTexto, setAsideTexto] = useState(false)

    const onClickSugestoes = () => {
      setAsideTexto(false)
    }
    const onClickNSS = () => {
      setAsideTexto(true)
    }
    const horariosIntervalo = []
    const lista = [0, 1, 2, 3]
    const intervalosPossiveis = [9, 10, 11, 12, 13, 14 , 15, 16, 17, 18, 19]
      //verificar H chegada
      //teste
      //verficar cargo
      // se +2 da chegaga e !2 cargos iguais almoçando, ok almoçar

  
    return(
<div className="flex items-center justify-center gap-2 flex-col bg-white h-screen">
  <header className="flex flex-row w-300 gap-20">
  <h1 className="text-black font-bold">{dataAtual}</h1>
  </header>
  <header className="flex justify-center items-center flex-col">
    <div className="flex items-center flex-row gap-10">
      <div className="flex items-center flex-row">
        <Image
        src={Logoraia}
        width={75}
        height={75}
        alt="logo"
      />
      <p className="text-9x1 text-black">Planeja RD</p>
      </div>
    </div>
  </header>

  <div className="flex flex-row gap-5">
  <main className="overflow-y-auto border-black border-2 max-h-115 min-h-115 rounded-md">
   <ListarFuncionarios matriculaGerente={"12345"}/>
  </main>
  <aside className="text-black border-2 border-black w-90 p-2 gap-10 rounded-md flex flex-col justify-items-center">
    <header className="justify-center w-90 flex flex-row gap-10">
    <div onClick={onClickSugestoes} className="cursor-pointer flex bg-blue-200 min-w-25 justify-center rounded-md p-2 dark:md:hover:bg-blue-400">
    <h1>Sugestões</h1>
    </div>
    <div onClick={onClickNSS} className="cursor-pointer flex bg-blue-200  min-w-25 justify-center rounded-md p-2 dark:md:hover:bg-blue-400">
    <h1>Votos NSS</h1>
    </div>
    </header>
    <footer className="justify-items-center overflow-y-auto">
      {
        asideTexto === true &&(
          <EscreverVotos matriculaGerente={"12345"}/>
        ) ||
        asideTexto === false && (<div>
          <div className="flex flex-row gap-2">
          <p>Você possui</p>
          <SugerirIntervalo matriculaGerente={"12345"} matriculaFuncionario={"3213211"} />
          <p> at2</p>
          </div>
          </div>
        )
      }
      </footer>
    </aside>
  </div>
  <FooterNSS matriculaGerente="12345"/>
  </div>)
}