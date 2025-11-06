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

export function ListarHorarioIntervalo(gerente:string, matricula:string, entrada:number){
    const horario = data[gerente].func[matricula].horario
    

}