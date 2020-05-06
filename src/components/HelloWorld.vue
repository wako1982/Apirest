<template>
  <v-container>
    <v-layout row wrap>
      <v-flex md12>
        <h1 id="title" class="text-center mt-4 mb-3 display-2" >Api con Vuetify Crud</h1>
        <v-btn class="pink" dark @click="dialog=true">Nuevo</v-btn>

<!---primerdialog---->
        <v-dialog v-model="dialog" width="700px">
          <v-card>
            <v-card-title>
              Agregar Nuevo
            </v-card-title>
            <v-card-text>
              <v-form  @submit.prevent="apipost()">
                <v-text-field 
                label="ingrese nombre"
                v-model="jake.name"
                required
                :max="20"
                >
                </v-text-field>
                 <v-text-field 
                label="ingrese email"
                v-model="jake.email"
                required
                :max="40"
                >
                </v-text-field>
                 <v-text-field 
                label="ingrese postid"
                v-model="jake.postId"
                required
                :max="20"
                >
                </v-text-field>
                <v-card-actions>
                  <v-btn color="success" type="submit">Enviar</v-btn>
                  <v-btn  color="error"   @click="dialog =false" >Cancelar</v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>

        </v-dialog>

 <!---fin primerdialog-->       



        <v-dialog v-model="dialog2" width="700px">
          <v-card>
            <v-card-title>
              Agregar Nuevo
            </v-card-title>
            <v-card-text>
              <v-form  @submit.prevent="apiedit()">
                <v-text-field 
                label="ingrese nombre"
                v-model="jake.name"
                required
                :max="20"
                >
                </v-text-field>
                 <v-text-field 
                label="ingrese email"
                v-model="jake.email"
                required
                :max="40"
                >
                </v-text-field>
                 <v-text-field 
                label="ingrese postid"
                v-model="jake.postId"
                required
                :max="20"
                >
                </v-text-field>
                <v-card-actions>
                  <v-btn color="warning" type="submit">Editar</v-btn>
                  <v-btn  color="error"   @click="dialog2 =false" >Cancelar</v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>

        </v-dialog>

 <!--fin segundo dialog-->       






      </v-flex>
      <v-flex class="mt-5">
        <v-simple-table dark>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
               <th>PostId</th>
              <th>Operaciones</th>
            </tr>
          </thead>
          <tbody v-for="(item,index) in resultado" :key="index">
            <tr>
             <v-chip
             class="ma-2"
             color="purple"
              label
             text-color="white"
             >
             <v-icon left>mdi-account</v-icon>
             {{item.name}}
            </v-chip>
              <td>{{item.email}}</td>
              <td>{{item.postId}}</td>
              <td>
                <v-btn class="warning ma-2"   @click="cambio(index),dialog2=true"  >Editar</v-btn>
                <v-btn class="error ma-2"  @click="apidelete(item.id)">Eliminar</v-btn>
                <v-icon color="green">mdi-checkbox-marked-circle</v-icon>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-flex>
    </v-layout>


<!--alertas-->
    <v-snackbar
      v-model="snackbar"
    >
      {{ mensaje }}
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
      >
        Cerrar
      </v-btn>
    </v-snackbar>
  </v-container>
</template>


<script>
import axios from 'axios';
export default {
  data(){
    return{
      indextarea:'',
      dialog2:false,
      snackbar:false,
      mensaje:'',
      dialog:false,
      resultado:[],
      jake:{
        name:'',
        email:'',
        postId:''
      }
    }
  },
  methods:{
    apiget(){
      const path ="https://jsonplaceholder.typicode.com/comments?_limit=10"
      axios.get(path).then((response)=>{
        this.resultado = response.data;
        
        
      })
      .catch((e)=>{
        console.log(e)
      })
    },
    apipost(){
      const path ="https://jsonplaceholder.typicode.com/comments?_limit=10"
      axios.post(path,this.jake).then((response)=>{
        this.jake.name = response.data.name
        this.jake.email = response.data.email
        this.jake.postId = response.data.postId
        this.snackbar= true,
        this.mensaje="Enviado con Exito!!!"
        
      })
      .catch((e)=>{
        console.log(e)
      })
    },
    apidelete(id){
      const path =`https://jsonplaceholder.typicode.com/comments/${id}`
      axios.delete(path).then((response)=>{
        this.snackbar=true,
        this.mensaje="eliminado"
      })
      .catch((e)=>{
        console.log(e)
      })
    },
    cambio(index){
      const path =`https://jsonplaceholder.typicode.com/comments/${index}`
      axios.get(path).then((response)=>{
        this.jake.name =response.data.name
         this.jake.email =response.data.email
          this.jake.postId =response.data.postId
          this.indextarea =index
        
      })
      .catch((e)=>{
        console.log(e)
      })

    },
    apiedit(){
      const path = `https://jsonplaceholder.typicode.com/comments/${this.indextarea}`
      axios.put(path,this.jake).then((response)=>{
        this.jake.name = response.data.name
        this.jake.email = response.data.email
        this.jake.postId = response.data.postId
        this.snackbar = true
        this.mensaje ="Editado con exito !! "
      })
      .catch((e)=>{
        console.log(e)
      })

    }
  },
  created(){
    this.apiget()
  }
}
</script>


