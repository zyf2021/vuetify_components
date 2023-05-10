<template>
    <v-carousel
        cycle
        height="400"
        hide-delimiter-background
        show-arrows="hover"
    >
        <v-carousel-item
        v-for="(item,i) in images"
        :key="i"
        :src="item.url"
        cover
        >
        </v-carousel-item>
    </v-carousel>
</template>

<script>
export default {
    name:'my-carousel',
    props: {
      images:{
        type:Array
      }
    },
    data () {
      return {

      }
    },
  }
</script>

<style>
    v-carousel {
        margin: 0;
    }
</style>