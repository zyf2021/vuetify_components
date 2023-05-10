<template>
      
  <v-app>
    <v-container>
      <my-navbar :items = "items"/>
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-container>
    <MyFooterVue/>
  </v-app>
</template>
 
<script>
import MyFooterVue from './components/UI/MyFooter.vue' 
export default {
  name: 'App',
  components: {MyFooterVue},
  data() {
      return {
          items: [
            {title: 'ГЛАВНАЯ', route:'/'},
            {title: 'НОВОСТИ', route:'/news'},
            {title: 'Заказы Клиента', route:'/order/client'},
            {title: 'Заказы Менеджера', route:'/order/manager'},
            {title: 'Заказы Мастера', route:'/order/master'},
            {title: 'Админпанель', route:'/admin'},
            {title: 'Запчасти', route:'/spare'},
            {title: 'О НАС', route:'/about'}
        ]
      }
    }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 0px;
  }
  v-container {
    margin: 0;
  }
</style>
