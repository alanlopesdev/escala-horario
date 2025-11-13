"use client"

import Image from "next/image";
import Logoraia from '@/public/imgs/logo-rd.png'
import { useState, useEffect, use } from "react";
import db from '@/db.json'
import {EscreverVotos, ListarFuncionarios, SugerirIntervalo, FooterNSS, FuncionariosRender} from '@/app/horarios/scripts'

export default function Horarios(){
    const [dataAtual, setData] = useState(Date())
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
  <FuncionariosRender/>
  <FooterNSS matriculaGerente="12345"/>
  </div>)
}