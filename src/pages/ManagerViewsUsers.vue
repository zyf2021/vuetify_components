<template>
  <v-container>
    <v-row>
        <v-col cols="12" sm="12">
            <MyUsersTableVue
                :header="'Клиенты'"
                :headers="headers"
                :items="clients"
            ></MyUsersTableVue>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" sm="12">
            <MyUsersTableVue
                :header="'Мастера'"
                :headers="headers"
                :items="masters"
            ></MyUsersTableVue>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" sm="12">
            <MyUsersTableVue
                :header="'Мастера'"
                :headers="headers"
                :items="managers"
            ></MyUsersTableVue>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MyUsersTableVue from '@/components/MyUsersTable.vue'
import UsersServices from '@/services/UsersServices'
export default {
    components: {MyUsersTableVue},
    data() {
        return {
            clients: [],
            masters: [],
            managers: [],
            headers: [
                {title: "ID", align: "start", sortable: true, value:"id", key:"id"},
                {title: "Имя", sortable: true, value:"first_name", key:"first_name"},
                {title: "Фамилия", sortable: false, value: "last_name", key: 'last_name' },
                {title: "Отчество", sortable: false, value: "middle_name", key: 'middle_name' },
                {title: "Дата рождения", sortable: false, value: "date_birth", key: 'date_birth' },
                {title: "Пол", sortable: false, value: "gender", key: 'gender' },
                {title: "Email", sortable: false, value: "email", key: 'email' },
                {title: "Роль", sortable: false, value: "name", key: 'name' },
                {title: "Actions", sortable: false, value: "actions", key: 'actions' },
            ]
        }
    },
    methods: {
        getClients(){
            UsersServices.getAllClients()
            .then((response) => {
                this.clients = response.data
                console.log(this.clients)
            })
            .catch((e) => {
                console.log(e)
            })
        }
    },
    mounted() {
        this.getClients()
    }
}
</script>

<style>

</style>