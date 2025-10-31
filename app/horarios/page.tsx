"use client"

import Image from "next/image";
import Logoraia from '@/public/imgs/logo-rd.png'
import { useState } from "react";
import db from '@/db.json'

export default function Horarios(){
  const funcionarios = db[12345].func
    const lista = [0, 1, 2, 3]
    const intervalosPossiveis = []
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
<div className="flex items-center justify-center gap-2 flex-col bg-white h-full">
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
    <header className="justify-items-center"><h1>Sugestões</h1></header>
    <footer className="justify-items-center overflow-y-auto"><h1>oi</h1></footer>
    </aside>
  </div>
  <div className="text-black grid grid-cols-18 w-350 h-10 bg-blue-200">
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
  <div className="text-black grid grid-cols-18 w-350 h-10 bg-blue-200">
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