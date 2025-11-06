import db from '@/db.json'

type votosPorHora = {
    pessimos: string
    ruins: string
    bons: string
    otimos: string
}

const data = db

export function escreverVotosH(matricula:string) : any {
    const horarios = data[matricula].NSS.votosPorHora
    const chaves = Object.keys(horarios)
    return(<div>
        <h1>Votos ótimos: {horarios[chaves].otimos}</h1>
        <h1>Votos bons: {horarios[chaves].bons}</h1>
        <h1>Votos ruins: {horarios[chaves].ruins}</h1>
        <h1>Votos péssimos: {horarios[chaves].pessimos}</h1>
        </div>
    )
    }

export function ListarHorarioIntervalo({gerente, matricula}){
    let funcionario = data[gerente].func
    let horario = data[gerente].func[matricula].horario
    horario = horario.split(" - ")
    const entrada = Number(horario[0].split(":")[0])
    return (
            <div key={matricula} className="justify-items-center grid p-1 grid-cols-5">
            <p className="text-black w-50">{funcionario[matricula].nome}</p>
            <p className="text-black">{funcionario[matricula].cargo}</p>
            <p className="text-black">{funcionario[matricula].presença}</p>
            <p className="text-black">{funcionario[matricula].horario}</p>
            <form  action="">
              <select className="cursor-pointer text-black border-2 rounded-md border-blue-200 dark:md:hover:border-blue-600" name="" id="">
                <option value="">{funcionario[matricula].intervalo}</option>
                {
                  [2, 3, 4, 5, 6].map((name, index)=>(
                    <option key={index}value="">{entrada+name}:00-{entrada+1+name}:00</option>
                  )
                )}
              </select>
            </form>
        </div>
    )
}