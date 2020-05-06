<template>
<v-container>
    
 <v-layout  row justify-center mt-5>
         <img   class=" mt-4" src="@/assets/simpson.png" width="250">
 </v-layout>
 <v-layout justify-center mt-4>
     <h1 class="display-2">Crud Vuetify Consumiendo una Api</h1>  
     </v-layout>
     <v-btn color="pink" dark  :to="{name:'Crud'}">
          <v-icon class="ma-2">mdi-star</v-icon>
         Acceder</v-btn>
     
 
</v-container>
</template>

<script>
export default {
    
}
</script>




