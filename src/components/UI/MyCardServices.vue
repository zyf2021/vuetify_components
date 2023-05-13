<template>
<v-card
    class="mx-2"
    flat
  >
    <v-img
      height="200px"
      cover
    ></v-img>

    <v-card-title>
      {{ item }}
    </v-card-title>

    <v-card-subtitle>
    
    </v-card-subtitle>
    <v-card-subtitle>

    </v-card-subtitle>

    <v-card-text
      class="d-block text-truncate"
    >


    </v-card-text>

    <v-card-actions>
      <my-btn
        color="#504136"
        variant="flat"
      >
        <slot name='btn'></slot>
        
      </my-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
//import MediaService from '@/services/MediaService'
export default {

    name:'my-card-services',
    props: {
      item:{
        type: Object
      },
      path: {
        type: String
      }
    },
    data() {
      return {
        url_img: ''
      }
    },
    methods: {
    },
    watch: {
    },
    mounted() {
    }

}
</script>

<style>

</style>