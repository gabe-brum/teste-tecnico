import { http } from './config'

export default {

    listar:() => {
        return http.get('candidatos')
    },

    salvar:(candidato) =>{
        return http.post('candidato', candidato)
    },

    atualizar:(candidato) =>{
        return http.put('candidato', candidato)
    },

    apagar: (candidato) =>{
        return http.delete('candidato', { data: candidato }) 
    }
}