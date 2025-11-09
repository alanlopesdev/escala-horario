import db from '@/db.json'

const data = db

export function EscreverVotos(matriculaGerente : any) {
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

export function ListarFuncionarios(matriculaGerente : any){
    const gerente = data.gerentes.find(gerente => gerente.matricula === matriculaGerente)
    if(!gerente){
      return(
        <p>gerente não encontrado</p>
      )
    }
    return (
      gerente.funcionarios.map(funcionario => 
            <div key={funcionario.matricula} className="justify-items-center grid p-1 grid-cols-5">
            <p className="text-black w-50">{funcionario.nome}</p>
            <p className="text-black">{funcionario.cargo}</p>
            <p className="text-black">{funcionario.presenca}</p>
            <p className="text-black">{funcionario.entrada}</p>
            <form  action="">
              <select className="cursor-pointer text-black border-2 rounded-md border-blue-200 dark:md:hover:border-blue-600" name="selectIntervalo" id="">
                <option value="">{funcionario.intervalo}</option>
                {
                  [2, 3, 4, 5, 6].map((name, index)=>(
                    <option key={index}value="">{funcionario.entrada+name}:00-{funcionario.entrada+1+name}:00</option>
                  )
                )}
              </select>
            </form>
        </div>)
    )
}


export function SugerirIntervalo(matriculaGerente : any) {
  const gerente = data.gerentes.find(gerente => gerente.matricula === matriculaGerente)
  if (!gerente){
    return(
      <div>Nada encontrada</div>
    )
  }
  const funcionarios = gerente.funcionarios.filter(funcionario => funcionario.cargo === "at2")
  const presentes = funcionarios.filter(funcionarios => funcionarios.presenca === "presente")
  const quantidadeFunc = presentes.length

  return(
    <div>
    <p>{quantidadeFunc}</p>
    </div>
  )
}
