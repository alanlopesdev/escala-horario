import db from '@/db.json'
import { use, useState } from 'react'
import Image from 'next/image'
import BolaVerda from '@/public/imgs/icons8-emoji-de-círculo-verde-50.png'
import BolaAmarela from '@/public/imgs/icons8-emoji-de-círculo-amarelo-50.png'
import BolaLaranja from '@/public/imgs/icons8-emoji-de-círculo-laranja-50.png'
import BolaRoxa from '@/public/imgs/icons8-emoji-de-círculo-roxo-50.png'
const data = db

type Gerente = {
  matriculaGerente : string
}
type Matriculas = {
  matriculaGerente:string 
  matriculaFuncionario : string}

export function EscreverVotos({matriculaGerente} : Gerente) {
  const gerente = data.gerentes.find(gerente => gerente.matricula === matriculaGerente)
  const loja_votos = gerente?.loja?.NSS?.total
  if(!gerente){
    return(
      <p>nenhum voto encontrado</p>
    )}

    return(
        <div>
        <h1>Votos totais:{loja_votos}</h1>
        </div>
    )
    }

export function ListarFuncionarios({matriculaGerente} : Gerente){

    const gerente = data.gerentes.find(gerente => gerente.matricula === matriculaGerente)
    if(!gerente){
      return(
        <p>gerente não encontrado</p>
      )
    }
    return (
      gerente.funcionarios.map(funcionario => 
            <div key={funcionario.matricula} className="border-1 justify-items-center grid p-1 grid-cols-5">
            <p className="text-black w-50">{funcionario.nome}</p>
            <p className="text-black">{funcionario.cargo}</p>
            <p className="text-black">{funcionario.presenca}</p>
            <p className="text-black">{funcionario.entrada}</p>
            <form  action="">
              <select className="cursor-pointer text-black border-2 rounded-md border-blue-200 dark:md:hover:border-blue-600" name="selectIntervalo" id="">
                <option value="">{funcionario.intervalo}</option>
                {
                  [2, 3, 4, 5, 6].map((name, index)=>(
                    <option key={index}value="">{funcionario.entrada[0]+name}:00-{funcionario.entrada[0]+1+name}:00</option>
                  )
                )}
              </select>
            </form>
        </div>)
    )
}


export function SugerirIntervalo({matriculaGerente, matriculaFuncionario} : Matriculas) {
  const gerente = data.gerentes.find(gerente => gerente.matricula === matriculaGerente)
  const teste = matriculaFuncionario
  if (!gerente){
    return(
      <div>Nada encontrada</div>
    )
  }
  const funcionarios = gerente.funcionarios.filter(funcionario => funcionario.cargo === "at2")
  const presentes = funcionarios.filter(funcionarios => funcionarios.presenca === "presente")
  const quantidadeFunc = presentes.length
  let tirarintervalo = [{}]
  presentes.forEach(element => { 
    const intervalo = element.intervalo

    
  });

  return(
    <div>
    <p>Não é recomendado ter mais de dois funcionários do mesmo cargo tirando intervalo juntos
      Não é recomendado um funcionário do intermédio tirar almoço depois do funcionário do fechamento
    </p>
    </div>
  )
}


export function FooterNSS({matriculaGerente}:Gerente){
  const gerente = data.gerentes.find(gerente => gerente.matricula === matriculaGerente)
  if(!gerente){
    return(
      <div>nada</div>
    )
  }

  const votosHorario = gerente.loja?.NSS.votosHorario.map(votos =>
    <div key={votos.horario}>
      { ((votos.o*100 + votos.b*75 + votos.r*25 + votos.p*0)/(100*votos.total)) >= 0.90 && <Image src={BolaVerda} width={20} height={20}alt=""/>
       || (((votos.o*100 + votos.b*75 + votos.r*25 + votos.p*0)/(100*votos.total)) < 0.94 && ((votos.o*100 + votos.b*75 + votos.r*25 + votos.p*0)/(100*votos.total)) > 0.75) && <Image src={BolaAmarela} width={20} height={20}alt=""/>
       || (((votos.o*100 + votos.b*75 + votos.r*25 + votos.p*0)/(100*votos.total)) < 0.75 && ((votos.o*100 + votos.b*75 + votos.r*25 + votos.p*0)/(100*votos.total)) > 0.50) && <Image src={BolaLaranja} width={20} height={20}alt=""/>
       || ((votos.o*100 + votos.b*75 + votos.r*25 + votos.p*0)/(100*votos.total)) < 0.50 && <Image src={BolaRoxa} width={20} height={20}alt=""/>}
    </div>)
  
  const horarioFuncionamento = [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,21,22].map( hora =>
    <div key={hora}>
      <p>{hora}</p>
    </div>
  )

  return(
  <div className='flex flex-col items-center'>
  <div className='gap-2 flex flex-col'>
  <div className="items-center border-2 rounded-md text-black grid grid-cols-18 w-350 h-10 bg-blue-200">
    <div>HORA:</div>
    {horarioFuncionamento}
    </div>
  <div className="items-center border-2 rounded-md text-black grid grid-cols-18 w-350 h-10 bg-blue-200">
  <div>
    <p>NSS:</p>
  </div>
    {votosHorario}
    </div>
  </div>
  <p className='text-black'>Developed by https://github.com/alanlopesdev</p>
  </div>
  )
}

