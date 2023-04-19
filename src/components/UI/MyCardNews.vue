<template>
<v-card
    class="mx-2"
    max-width="100%"
    flat
  >
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
      cover
    ></v-img>

    <v-card-title>
      {{ this.item.title }}
    </v-card-title>

    <v-card-subtitle>
      {{ this.item.body }}
    </v-card-subtitle>

    <v-card-text
      class="d-block text-truncate"
    >
      {{ this.item.body }}

    </v-card-text>

    <v-card-actions>
      <my-btn
        color="#504136"
        variant="flat"
        @click="this.$router.push(`/${path}/${item.id}`)"
      >
        <slot name='btn'></slot>
        
      </my-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  //`/news/${news_item.id}`
    name:'my-card-news',
    props: {
      item:{
        type: Object
      },
      path: {
        type: String
      }
    }
}
</script>

<style>

</style>