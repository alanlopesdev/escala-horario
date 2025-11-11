import db from '@/db.json'
const data = db

type Gerente = {
  matriculaGerente : string
}
type Matriculas = {
  matriculaGerente:string 
  matriculaFuncionario : string
}
type ListarFuncionariosProps = {
  matriculaGerente: string
  onIntervaloChange: (matricula: string, intervalo: string) => void
  intervalos: Record<string, string>
}
type SugerirIntervaloProps = {
  matriculaGerente: string
  intervalos: Record<string, string>
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

export function ListarFuncionarios({matriculaGerente, onIntervaloChange, intervalos} : ListarFuncionariosProps){

    const gerente = data.gerentes.find(gerente => gerente.matricula === matriculaGerente)
    if(!gerente){
      return(
        <p>gerente não encontrado</p>
      )
    }
    return (
      gerente.funcionarios.map(funcionario => {
        const intervaloAtual = intervalos[funcionario.matricula] || funcionario.intervalo
        const horaEntrada = parseInt(funcionario.entrada.split(':')[0])
        
        return (
          <div key={funcionario.matricula} className="justify-items-center grid p-1 grid-cols-5">
            <p className="text-black w-50">{funcionario.nome}</p>
            <p className="text-black">{funcionario.cargo}</p>
            <p className="text-black">{funcionario.presenca}</p>
            <p className="text-black">{funcionario.entrada}</p>
            <form action="">
              <select 
                className="cursor-pointer text-black border-2 rounded-md border-blue-200 dark:md:hover:border-blue-600" 
                name="selectIntervalo" 
                id=""
                value={intervaloAtual}
                onChange={(e) => {
                  onIntervaloChange(funcionario.matricula, e.target.value)
                }}
              >
                <option value={funcionario.intervalo}>{funcionario.intervalo}</option>
                {
                  [2, 3, 4, 5, 6].map((name, index) => {
                    const horaInicio = horaEntrada + name
                    const horaFim = horaInicio + 1
                    const intervaloOption = `${horaInicio}:00-${horaFim}:00`
                    return (
                      <option key={index} value={intervaloOption}>{intervaloOption}</option>
                    )
                  })
                }
              </select>
            </form>
          </div>
        )
      })
    )
}


export function SugerirIntervalo({matriculaGerente, intervalos} : SugerirIntervaloProps) {
  const gerente = data.gerentes.find(gerente => gerente.matricula === matriculaGerente)
  if (!gerente){
    return(
      <div>Nada encontrada</div>
    )
  }
  
  const funcionarios = gerente.funcionarios.filter(funcionario => funcionario.cargo === "at2")
  const presentes = funcionarios.filter(funcionario => funcionario.presenca === "presente")
  const quantidadeFunc = presentes.length
  
  return(
    <div className="flex flex-col gap-2">
      <p className="font-bold">Horários de Intervalo:</p>
      {presentes.length === 0 ? (
        <p>Nenhum funcionário presente</p>
      ) : (
        presentes.map(funcionario => {
          const intervaloSelecionado = intervalos[funcionario.matricula] || funcionario.intervalo
          return (
            <div key={funcionario.matricula} className="flex flex-row gap-2">
              <p className="font-semibold">{funcionario.nome}:</p>
              <p>{intervaloSelecionado}</p>
            </div>
          )
        })
      )}
      <div className="mt-4">
        <p className="text-sm">Não é recomendado ter mais de dois funcionários do mesmo cargo tirando intervalo juntos</p>
        <p className="text-sm">Não é recomendado um funcionário do intermédio tirar almoço depois do funcionário do fechamento</p>
      </div>
    </div>
  )
}
