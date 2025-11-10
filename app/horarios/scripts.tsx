import db from '@/db.json'

const data = db

type Gerente = {
  matriculaGerente : string
}
type Matriculas = {
  matriculaGerente:string 
  matriculaFuncionario : string
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

export function ListarFuncionarios({matriculaGerente} : Gerente){
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
