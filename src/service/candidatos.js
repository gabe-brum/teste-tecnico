import { http } from './config'

export default {

    listar:() => {
        return http.get('candidatos')
    },

    salvar:(candidato) =>{
        return http.post('candidato', candidato)
    }
}