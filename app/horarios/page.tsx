"use client"

import Image from "next/image";
import Logoraia from '@/public/imgs/logo-rd.png'
import { useState, useEffect, use } from "react";
import db from '@/db.json'
import escreverVotosH from '@/app/horarios/scripts'

export default function Horarios(){

  const funcionarios = db[12345].func
    const [asideTexto, setAsideTexto] = useState(false)

    const onClickSugestoes = () => {
      setAsideTexto(false)
    }
    const onClickNSS = () => {
      setAsideTexto(true)
    }
    const lista = [0, 1, 2, 3]
    const intervalosPossiveis = [9, 10, 11, 12, 13, 14 , 15, 16, 17, 18, 19]
    const SugerirIntervalo = () =>{
      //verificar H chegada
      //teste
      //verficar cargo
      // se +2 da chegaga e !2 cargos iguais almoçando, ok almoçar
      for(let index = 0; index += 1; index > funcionarios.length){
        const FuncCargo = funcionarios[index].cargo
        const FuncIntervalo = funcionarios[index].intervalo
        for(let intervalo = 0; intervalo += 1; intervalo > lista.length){
        if ((FuncIntervalo - lista[intervalo]) >= 2){
          intervalosPossiveis.push(lista[intervalo])
        }
      }
    }
    }

    
    return(
<div className="flex items-center justify-center gap-2 flex-col bg-white h-screen">
  <header className="flex flex-row w-300 gap-20">
  <h1 className="text-black font-bold">DOM, 02/11 </h1>
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
  <main className="overflow-y-auto border-black border-2 max-h-115 rounded-md">
  {funcionarios.map((funcionarios, index) =>(
  <div key={funcionarios.matricula} className="justify-items-center grid p-1 grid-cols-5">
      <p className="text-black w-50">{funcionarios.nome}</p>
      <p className="text-black">{funcionarios.cargo}</p>
      <p className="text-black">{funcionarios.presença}</p>
      <p className="text-black">{funcionarios.horario}</p>
      <p className="text-black">{funcionarios.intervalo}</p>
  </div>
    ))}
  </main>
  <aside className="text-black border-2 border-black w-90 p-2 gap-10 rounded-md flex flex-col justify-items-center">
    <header className="justify-center w-90 flex flex-row gap-10">
    <div onClick={onClickSugestoes} className="cursor-pointer flex bg-blue-200 min-w-25 justify-center rounded-md p-2">
    <h1>Sugestões</h1>
    </div>
    <div onClick={onClickNSS} className="cursor-pointer flex bg-blue-200  min-w-25 justify-center rounded-md p-2">
    <h1>Votos NSS</h1>
    </div>
    </header>
    <footer className="justify-items-center overflow-y-auto">
      {
        asideTexto === true &&(
          escreverVotosH("12345")
        ) ||
        asideTexto === false && (
          <div>sugestões</div>
        )
      }
      </footer>
    </aside>
  </div>
  <div className="items-center border-2 rounded-md text-black grid grid-cols-18 w-350 h-10 bg-blue-200">
    <h1>Hora:</h1>
    <h1>7</h1>
    <h1>8</h1>
    <h1>9</h1>
    <h1>10</h1>
    <h1>11</h1>
    <h1>12</h1>
    <h1>13</h1>
    <h1>14</h1>
    <h1>15</h1> 
    <h1>16</h1>
    <h1>17</h1>
    <h1>18</h1>
    <h1>19</h1>
    <h1>20</h1>
    <h1>21</h1>
    <h1>22</h1>
    <h1>23</h1>
  </div>
  <div className="items-center border-2  rounded-md text-black grid grid-cols-18 w-350 h-10 bg-blue-200">
    <h1>NSS</h1>
  </div>
  <div className="text-black">
    Developed by https://github.com/alanlopesdev
  </div>
  </div>)
}

const styles = {
    textos : "capitalize text-black"
}