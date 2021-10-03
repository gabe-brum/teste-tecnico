<template>
  <div id="app">
    <div class="container">
      <header>
        <img src="assets/imperador.png" alt="imperador palpatine">
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
              <button @click="editar(candidato)" class="waves-effect btn-small blue darken1"><i class="material-icons">create</i></button>
              <button @click="remover(candidato)" class="waves-effect btn-small red darken1"><i class="material-icons">delete_sweep</i></button>
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
          id: '',
          name: '',
          planet: '',
          birthDate: '',
          description: ''
        },

        candidatos: [],
        errors: []
      }
    },

    mounted(){
      this.listar()
    },

    methods:{

      listar(){
        Candidatos.listar().then(resposta => {
          this.candidatos = resposta.data
        })
      },

      salvar(){

        if(!this.candidato.id){
          Candidatos.salvar(this.candidato).then(resposta => {
          this.candidato = {}
          resposta.alert("Salvo com sucesso!")
          this.listar()
          this.errors = []
          }).catch(e =>{
            this.errors = e.response.data.errors
          })

        }else{
          Candidatos.atualizar(this.candidato).then(resposta => {
          this.candidato = {}
          resposta.alert("Atualizado com sucesso!")
          this.listar()
          this.errors = []
          }).catch(e =>{
          this.errors = e.response.data.errors
          })
        }
      },

      editar(candidato){
        this.candidato = candidato 
      },

      remover(candidato){

        if(confirm("Realmente deseja excluir o candidato?")){
          Candidatos.apagar(candidato).then(resposta =>{
          resposta.this.listar()
          this.errors = []
          }).catch(e =>{
            this.errors = e.response.data.errors
          })
        }
      }

    }

  }
</script>

<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body{
    background-image: url('assets/fundo_galaxia.png');
    background-size: cover;
}

.container{
    width: 60%;
    margin: auto;
}

@font-face {
    font-family: Star Jedi;
    src: url(fonts/starjedi/Starjedi.ttf);
}

header{
    text-align: center;
    font-family: Star Jedi;
    color: white;
    letter-spacing: 2px;
}

header img{
    width: 60%;
}

header h2{
    margin-top: 20px;
    font-size: 24px;
}

header h3{
    font-size: 18px;
}

form{
    margin: 50px 0;
    text-align: center
}

form input::placeholder{
    color: white;
}

form textarea::placeholder{
    color: white;
}

form input{
    width: 100%;
    height: 45px;
    border-radius: 5px;
    color: white;
    padding-left: 15px !important;
    border: 2px solid white;
    outline: none;
    letter-spacing: 2px;
    font-family: Star Jedi;
    margin-bottom: 10px;
}

form textarea{
    width: 102%;
    height: 150px;
    border-radius: 5px;
    color: white;
    padding: 10px 0px 0px 15px;
    border-bottom: 2px solid white;
    outline: none;
    letter-spacing: 2px;
    font-family: Star Jedi;
    resize: none;
    margin-bottom: 30px;
}

form .btn{
    width: 30%;
    height: 45px;
    border-radius: 5px;
    outline: none;
    background-color: white !important;
    color: black;
    line-height: 45px;
    text-align: center;
    font-family: Star Jedi;
    letter-spacing: 2px;
}

.btn i{
    color: black;
}

table{
    color: white;
    text-align: center;
}

table thead{
    font-size: 14px;
    font-family: Star Jedi;
    letter-spacing: 2px;
    padding: 0 10px;
}

@media screen and (max-width: 768px){
    .container{
        width: 90%;
    }

    table thead{
        font-size: 12px;
    }
}

@media screen and (max-width: 568px){
    .container{
        width: 95%;
    }
}

</style>
