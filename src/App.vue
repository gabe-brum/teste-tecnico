<template>
  <div id="app">
    <div class="container">
      <header>
        <img src="" alt="Imperador Palpatine">
        <h2>Precisamos derrotar o imperador palpatine!</h2>
        <h3>Cadastre-se para ser um aliado</h3>
      </header>

      <form @submit.prevent="salvar">
        <input type="text" id="nome" placeholder="Nome" required v-model="candidato.name">
        <input type="text" id="planeta" placeholder="Planeta" required v-model="candidato.planet">
        <input type="date" id="nome" placeholder="Data de nascimento DD/MM/AAAA" required v-model="candidato.birthDate">
        <textarea id="descricao" placeholder="Descrição da motivação" required v-model="candidato.description"></textarea>
        <button class="btn waves-effect waves-light" type="submit" name="action">cadastrar
          <i class="material-icons right">send</i>
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>nome</th>
            <th>planeta</th>
            <th>data de nascimento</th>
            <th>descrição</th>
            <th>opções</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="candidato of candidatos" :key="candidato.id">
            <td>{{ candidato.name }}</td>
            <td>{{ candidato.planet }}</td>
            <td>{{ candidato.birthDate }}</td>
            <td>{{ candidato.description }}</td>
            <td>
              <button class="waves-effect btn-small blue darken1"><i class="material-icons">create</i></button>
              <button class="waves-effect btn-small red darken1"><i class="material-icons">delete_sweep</i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import Candidatos from './service/candidatos'

  export default {

    data(){
      return {
        candidato:{
          name: '',
          planet: '',
          birthDate: '',
          description: ''
        },

        candidatos: [

        ]
      }
    },

    mounted(){
      Candidatos.listar().then(resposta => {
        console.log(resposta.data)
        this.candidatos = resposta.data
      })
    },

    methods:{

      salvar(){

        // Candidatos.salvar(this.candidato).then(resposta => {
        //   alert("Salvo com sucesso!")
        // })

      }

    }

  }
</script>

<style>

</style>
