import db from '@/db.json'
import React, { use, useState, useEffect } from 'react'
import Image from 'next/image'
import BolaVerda from '@/public/imgs/icons8-emoji-de-círculo-verde-50.png'
import BolaAmarela from '@/public/imgs/icons8-emoji-de-círculo-amarelo-50.png'
import BolaLaranja from '@/public/imgs/icons8-emoji-de-círculo-laranja-50.png'
import BolaRoxa from '@/public/imgs/icons8-emoji-de-círculo-roxo-50.png'
const data = db

type TiposGerais = {
  matriculaGerente : string
  intervalosSelecionados: Record<string, string>
  onIntervaloChange: (matricula: string, intervalo: string) => void
}

type Gerente = {
  matriculaGerente : string
}
type Matriculas = {
  matriculaGerente:string 
  matriculaFuncionario : string
}
type Valor = {
  valor:any
}

type onValorChange = {
  onValorChange : any
}

// Função auxiliar para converter horário string para número de horas
function parseHorario(horario: string): number {
  const [hora] = horario.split(':')
  return parseInt(hora, 10)
}

// Função para calcular horários de intervalo possíveis (2 horas após entrada)
function calcularHorariosIntervalo(entrada: string): string[] {
  const horaEntrada = parseHorario(entrada)
  const horaInicioIntervalo = horaEntrada + 2
  const horarios: string[] = []
  
  // Gera opções de intervalo a partir de 2 horas após entrada até o final do dia
  for (let hora = horaInicioIntervalo; hora <= 22; hora++) {
    const horaFim = hora + 1
    if (horaFim <= 23) {
      horarios.push(`${hora.toString().padStart(2, '0')}:00-${horaFim.toString().padStart(2, '0')}:00`)
    }
  }
  
  return horarios
}

// Função para extrair a hora de início do intervalo
function extrairHoraInicioIntervalo(intervalo: string): number {
  if (!intervalo) return -1
  const match = intervalo.match(/^(\d{2}):00/)
  return match ? parseInt(match[1], 10) : -1
}


export function FuncionariosRender(){
  const gerente = data.gerentes.find(gerente => gerente.matricula === '12345')
  
  // Estado para armazenar os intervalos selecionados por funcionário (matricula -> intervalo)
  const [intervalosSelecionados, setIntervalosSelecionados] = useState<Record<string, string>>({})
  
  // Inicializa os intervalos com os valores padrão do banco de dados
  useEffect(() => {
    if (gerente) {
      const intervalosIniciais: Record<string, string> = {}
      gerente.funcionarios.forEach(funcionario => {
        intervalosIniciais[funcionario.matricula] = funcionario.intervalo || ''
      })
      setIntervalosSelecionados(intervalosIniciais)
    }
  }, [gerente])
  
  const handleIntervaloChange = (matricula: string, intervalo: string) => {
    setIntervalosSelecionados(prev => ({
      ...prev,
      [matricula]: intervalo
    }))
  }
  
  const [asideTexto, setAsideTexto] = useState(false)

  const onClickSugestoes = () => {
    setAsideTexto(false)
  }
  const onClickNSS = () => {
    setAsideTexto(true)
  }
    return(
      <div className="flex flex-row gap-5">
      <main className="overflow-y-auto border-black border-2 max-h-115 min-h-115 rounded-md">
      <ListarFuncionarios 
            matriculaGerente='12345'
            intervalosSelecionados={intervalosSelecionados}
            onIntervaloChange={handleIntervaloChange}/>
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
              <div>
              <SugerirIntervalo matriculaGerente='12345' intervalosSelecionados={intervalosSelecionados}/>
              </div>
              </div>
              </div>
            )
          }
          </footer>
        </aside>
      </div>
    )

}

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

export function ListarFuncionarios({matriculaGerente, intervalosSelecionados, onIntervaloChange} : TiposGerais){
  const gerente = data.gerentes.find(gerente => gerente.matricula === matriculaGerente)
  
  if(!gerente){
    return(
      <p>gerente não encontrado</p>
    )
  }
  
  return (
    <div className="p-2">
      <div className="border-b-2 border-black grid grid-cols-5 p-2 font-bold mb-2">
        <p className="text-black">Nome</p>
        <p className="text-black">Cargo</p>
        <p className="text-black">Presença</p>
        <p className="text-black">Entrada</p>
        <p className="text-black">Intervalo</p>
      </div>
      {gerente.funcionarios.map(funcionario => {
        const horariosPossiveis = calcularHorariosIntervalo(funcionario.entrada)
        const intervaloAtual = intervalosSelecionados[funcionario.matricula] || funcionario.intervalo || ''
        
        const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
          onIntervaloChange(funcionario.matricula, e.target.value)
        }
        
        return (
          <div key={funcionario.matricula} className="border-b border-gray-300 justify-items-center grid p-2 grid-cols-5 hover:bg-gray-50">
            <p className="text-black w-50">{funcionario.nome}</p>
            <p className="text-black">{funcionario.cargo}</p>
            <p className="text-black">{funcionario.presenca}</p>
            <p className="text-black">{funcionario.entrada}</p>
            <form action="">
              <select
                value={intervaloAtual}
                onChange={handleChange}
                className="cursor-pointer text-black border-2 rounded-md border-blue-200 dark:md:hover:border-blue-600 p-1"
                name="selectIntervalo"
                id={`intervalo-${funcionario.matricula}`}>
                <option value={funcionario.intervalo || ''}>
                  {funcionario.intervalo || 'Selecione um intervalo'}
                </option>
                {horariosPossiveis.map((horario, index) => (
                  <option key={index} value={horario}>
                    {horario}
                  </option>
                ))}
              </select>
            </form>
          </div>
        )
      })}
    </div>
  )
}


export function SugerirIntervalo({matriculaGerente, intervalosSelecionados} : {matriculaGerente: string, intervalosSelecionados: Record<string, string>}) {
  const gerente = data.gerentes.find(gerente => gerente.matricula === matriculaGerente)
  
  if (!gerente){
    return(
      <div>Nada encontrada</div>
    )
  }
  
  // Função para verificar conflitos de horário
  const verificarConflitos = () => {
    const conflitos: Array<{horario: string, funcionarios: string[], quantidade: number}> = []
    const horariosMap: Record<number, string[]> = {} // hora -> array de matrículas
    
    // Agrupa funcionários por horário de intervalo
    gerente.funcionarios.forEach(funcionario => {
      if (funcionario.presenca === "presente") {
        const intervalo = intervalosSelecionados[funcionario.matricula] || funcionario.intervalo || ''
        if (intervalo) {
          const horaInicio = extrairHoraInicioIntervalo(intervalo)
          if (horaInicio >= 0) {
            if (!horariosMap[horaInicio]) {
              horariosMap[horaInicio] = []
            }
            horariosMap[horaInicio].push(funcionario.nome)
          }
        }
      }
    })
    
    // Verifica se há mais de 4 pessoas no mesmo horário
    Object.keys(horariosMap).forEach(horaStr => {
      const hora = parseInt(horaStr, 10)
      const funcionarios = horariosMap[hora]
      if (funcionarios.length > 4) {
        conflitos.push({
          horario: `${hora.toString().padStart(2, '0')}:00`,
          funcionarios: funcionarios,
          quantidade: funcionarios.length
        })
      }
    })
    
    return conflitos
  }
  
  const conflitos = verificarConflitos()
  
  return(
    <div className="flex flex-col gap-3 p-2">
      <h2 className="text-lg font-bold text-black">Sugestões de Intervalo</h2>
      
      {conflitos.length > 0 ? (
        <div className="flex flex-col gap-2">
          <div className="bg-red-100 border-2 border-red-500 rounded-md p-3">
            <p className="font-bold text-red-700 mb-2">⚠️ Atenção: Conflitos de Horário Detectados!</p>
            {conflitos.map((conflito, index) => (
              <div key={index} className="mb-2 p-2 bg-red-50 rounded border border-red-300">
                <p className="font-semibold text-red-800">
                  Horário {conflito.horario}: {conflito.quantidade} funcionários em intervalo
                </p>
                <p className="text-sm text-red-700 mt-1">
                  Funcionários: {conflito.funcionarios.join(', ')}
                </p>
                <p className="text-xs text-red-600 mt-1 italic">
                  Máximo permitido: 4 funcionários por horário
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-green-100 border-2 border-green-500 rounded-md p-3">
          <p className="text-green-700 font-semibold">✓ Nenhum conflito detectado!</p>
          <p className="text-sm text-green-600 mt-1">
            Todos os intervalos estão dentro do limite de 4 funcionários por horário.
          </p>
        </div>
      )}
      
      <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-sm text-blue-800">
          <strong>Regras aplicadas:</strong>
        </p>
        <ul className="text-xs text-blue-700 mt-1 list-disc list-inside">
          <li>Intervalo deve ser 2 horas após a entrada</li>
          <li>Máximo de 4 funcionários em intervalo simultâneo</li>
        </ul>
      </div>
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
      { ((votos.o*100 + votos.b*75 + votos.r*25 + votos.p*0)/(100*votos.total)) >= 0.94 && <Image src={BolaVerda} width={20} height={20}alt=""/>
       || (((votos.o*100 + votos.b*75 + votos.r*25 + votos.p*0)/(100*votos.total)) < 0.94 && ((votos.o*100 + votos.b*75 + votos.r*25 + votos.p*0)/(100*votos.total)) >= 0.90) && <Image src={BolaAmarela} width={20} height={20}alt=""/>
       || (((votos.o*100 + votos.b*75 + votos.r*25 + votos.p*0)/(100*votos.total)) < 0.90 && ((votos.o*100 + votos.b*75 + votos.r*25 + votos.p*0)/(100*votos.total)) > 0.75) && <Image src={BolaLaranja} width={20} height={20}alt=""/>
       || ((votos.o*100 + votos.b*75 + votos.r*25 + votos.p*0)/(100*votos.total)) < 0.75 && <Image src={BolaRoxa} width={20} height={20}alt=""/>}
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

