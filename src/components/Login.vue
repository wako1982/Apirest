<template>
    <div>
        <v-app-bar
      app
      color="blue"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title class="display-1">Crud Api</v-toolbar-title>
  
    <v-spacer></v-spacer>
     <v-btn color="pink"  @click="dialog4=true" >Ingresar</v-btn>
     <v-btn color="success" class="ma-2"   @click="dialog3=true" >Registro</v-btn>
    
    </v-app-bar>
    <v-navigation-drawer app  v-model="drawer" temporary dark>
       <v-layout mt-5 column align-center>
         <v-flex>
           <v-avatar
             size="avatarSize"
             color="blank"
           >
             <img src="@/assets/logo.png" alt="no se visualiza fotografia">
           </v-avatar>
         </v-flex>
         <v-flex class="mt-4 white--text headline">
          <p>Crud Api</p>
         </v-flex>
         <v-flex>
           <v-btn large  dark class="blue" :to="{name:'Crud'}" >Crud</v-btn>
         </v-flex>
         <v-flex>
           <v-btn large  dark class="pink mt-2"  :to="{name:'Saludo'}"  >Home</v-btn>
         </v-flex>
       </v-layout>
     </v-navigation-drawer>

     

      <v-dialog v-model="dialog3" width="700px">
                  <v-card class="ma-3 pa-3">
                      <v-card-title>
                          <h1>Registro de Usuarios</h1>
                      </v-card-title>
                      <v-card-text>
                          <v-form @submit.prevent="registro()">
                              <v-text-field 
                              label="ingresar nombre"
                              v-model="nombre"
                              
                              >
                              </v-text-field>
                              <v-text-field 
                              label="ingresar email"
                              v-model="email"
                              
                              >
                              </v-text-field>
                              <v-text-field 
                              label="ingresar password"
                              v-model="password"
                              required
                              >
                              </v-text-field>
                              <v-card-actions>
                                  <v-btn  type="submit" color="success" >Agregar</v-btn>
                                  <v-btn color="error" @click="dialog3 =!dialog3">Cerrar</v-btn>
                              </v-card-actions>
                              
                          </v-form>
                      </v-card-text>
                  </v-card>
                </v-dialog>


                <v-dialog v-model="dialog4" width="700px">
                  <v-card class="ma-3 pa-3">
                      <v-card-title>
                          <h1>Ingreso de Usuarios</h1>
                      </v-card-title>
                      <v-card-text>
                          <v-form @submit.prevent="ingresar()">
                              <v-text-field 
                              label="ingresar nombre"
                              v-model="nombre"
                              
                              >
                              </v-text-field>
                              <v-text-field 
                              label="ingresar email"
                              v-model="email"
                              
                              >
                              </v-text-field>
                              <v-text-field 
                              label="ingresar password"
                              v-model="password"
                              required
                              >
                              </v-text-field>
                              <v-card-actions>
                                  <v-btn  type="submit" color="success" >Ingreso</v-btn>
                                  <v-btn color="error" @click="dialog4 =!dialog4">Cerrar</v-btn>
                                  <v-btn color="info"  @click="dialog5=true" >Restablecer</v-btn>
                              </v-card-actions>
                              
                          </v-form>
                      </v-card-text>
                  </v-card>
                </v-dialog>

                 <v-dialog v-model="dialog5" width="700px">
                  <v-card class="ma-3 pa-3">
                      <v-card-title>
                          <h1>Restablecimiento de Contraseña</h1>
                      </v-card-title>
                      <v-card-text>
                          <v-form @submit.prevent="restablecer()">
                              <v-text-field 
                              label="ingresar email"
                              v-model="email"
                              
                              >
                              </v-text-field>
                              
                              
                              <v-card-actions>
                                 
                                  <v-btn color="error" @click="dialog5 =!dialog5">Cerrar</v-btn>
                                  <v-btn color="info"  type="submit" >Restablecer</v-btn>
                              </v-card-actions>
                              
                          </v-form>
                      </v-card-text>
                  </v-card>
                </v-dialog>






                 <v-snackbar
                   v-model="snackbar2"
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

    </div>
</template>

<script>

import firebase from 'firebase';
import db from '@/firebase/init';

export default {
    data(){
        return{
            dialog5:false,
            dialog4:false,
            snackbar2:false,
            mensaje:'',
            drawer:false,
            dialog3:false,
            nombre:'',
            email:'',
            password:'',
            auth:firebase.auth,
        }
    },
    methods:{
        registro(email){
            if(this.email =='' || this.password ==''){
                this.snackbar2=true,
                this.mensaje="llenar los campos !!"
            }else{
                firebase.auth().createUserWithEmailAndPassword(this.email,this.password)
            .then(user =>{
                this.email='',
                this.password='',
                this.name='',
                this.snackbar2=true,
                this.mensaje="Usuario creado exitosamente!!"
                
            }).catch(error=>{
                this.error=error.message;
            })
            }
        },
        ingresar(){
            if(this.email ==''|| this.password==''){
                this.snackbar2=true,
                this.mensaje="llenar los campos por favor !!!"
            }else{
                firebase.auth().signInWithEmailAndPassword(this.email,this.password)
                .then(user=>{
                    this.snackbar2=true,
                    this.mensaje="Ingreso exitoso !!!"
                    this.$route.push({name:'Home'})

                }).catch(error=>{
                    this.error=error.message;
                })
            }
        },
        restablecer(){
            if(this.email==''){
                this.snackbar2=true,
                this.mensaje="llenar los campos por favor...."
            }else{
                firebase.auth().sendPasswordResetEmail(this.email)
                .then(function(){
                    alert("se restablecio con exito..")
                }).catch(function(error){
                    alert("no se pudo enviar...")
                })
            }
        }
        
    }
}
</script>

