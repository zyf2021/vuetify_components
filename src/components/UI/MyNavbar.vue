<template>
  <v-app-bar 
    :elevation="0"
    color="secondary"
    image="https://picsum.photos/1920/1080?random"
    >
    <v-app-bar-nav-icon variant="flat" color="accent" @click.stop="drawer = !drawer">
    </v-app-bar-nav-icon>
    <v-app-bar-title>
      <span class="text-accent font-weight-bold">CRM</span>
      <span class="text-accent font-weight-regular">Компьютерная помощь</span>
    </v-app-bar-title>
    <v-spacer></v-spacer>
        <my-nav-btn
          @click="$router.push('/search')"
        ><span dark class="text-h6">&#128269;</span></my-nav-btn>
        <my-nav-btn
          @click="$router.push('/profile')"
        >Профиль</my-nav-btn>
        <my-nav-btn>
          Уведомления
          <v-badge v-if="badge" dot color="success">
            <v-icon>mdi-home-outline</v-icon>
          </v-badge>
          <v-menu activator="parent">
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <my-allerts
                    v-model="allert"
                    :text="text"
                  ></my-allerts>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </my-nav-btn>
        
  </v-app-bar>
        
  <v-navigation-drawer 
        permanent
        image="https://picsum.photos/1920/1080?random"
        v-model="drawer"
        location="left"
        color="secondary"
        flat
      >
        <v-list nav>
          <v-list-item
            v-for="item in items"
            :key="item.title"
          >
            <my-btn 
              @click="$router.push(item.route)"
            >
                {{ item.title }}
            </my-btn>
          </v-list-item>
        </v-list>
  </v-navigation-drawer>
</template>

<script>
import MyAllerts from './MyAllerts.vue'
export default {
  components: { MyAllerts },
    name: "my-navbar",
    props: {
      items: {
            type: Array
        },
    },
    data() {
      return {
        drawer: false,
        allert:true,
        badge:true,
        text:'Новый текст'
      }
    }
}
</script>

<style>
  .btn-menu {

    width: 100%;
    margin-bottom: 5px;
  }
</style>