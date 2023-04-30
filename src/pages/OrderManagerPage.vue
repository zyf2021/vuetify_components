<template>
  <v-container class="bg-secondary">
    <v-row>
      <v-col cols="12" sm="4">
        <v-card class="pa-4" flat>
          <v-card-title class="text-h5">
            Оформить заявку
          </v-card-title>
          <v-combobox
            label="Клиент"
            v-model="select_user"
            :items="users"
            item-title="last_name"
            item-value="id"
            :hint="`${select_user.last_name}, ${select_user.first_name}, ${select_user.middle_name}`"
            return-object
          ></v-combobox>
          <v-select
            label="Тип проблемы"
            v-model="select_problem"
            :items="problems"
            item-title="name"
            item-value="id"
            return-object
            @update:model-value ="enableSelectMasters"
          ></v-select>
          <v-select
            label="Мастер"
            v-model="select_master"
            :items="masters_to_select"
            item-title="master_title"
            item-value="master_id"
            return-object
            :disabled = "disabled_select_master"
          >
          </v-select>
          <v-card-actions>
            <my-btn
            >Оформить</my-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <MyUserTable
          :header="header_table"
          :headers="headers"
          :items="applications"
        ></MyUserTable>
      </v-col>
    </v-row>
    
  </v-container>
</template>

<script>
import ApplicationsService from '@/services/ApplicationsService'
import ClassesProblemService from '@/services/ClassesProblemService'
import UsersService from '@/services/UsersServices'
import MyUserTable from '@/components/MyUsersTable.vue'
export default {
  components: {MyUserTable},
  data() {
    return {
      header_table:'Список заявок',
      headers: [
        {title: 'ID', key:'id', value: 'id', align: "start", sortable: true},
        {title: 'Дата открытия', key:'date_open', value: 'date_open', sortable: true},
        {title: 'Дата закрытия', key:'date_close', value: 'date_close', sortable: true},
        {title: 'Статус заявки', key:'id_status_applic', value: 'id_status_applic', sortable: true}
      ],
      applications:[null],
      select_user: {last_name:'', first_name:'', middle_name:''},
      users: [null],
      select_problem: {id:'', name:'', difficult:'', base_price: '', normative_time:''},
      problems: [
                {id:'', name:'', difficult:'', base_price: '', normative_time:''},
                {id:'', name:'', difficult:'', base_price: '', normative_time:''}
      ],
      disabled_select_master: true,
      select_master : {master_id: '', master_title: ''},
      masters: [
        {master_id: 'master_id', last_name: 'last_name', free_hours:'free_hours', num: 'num'},
        {master_id: 'master_id', last_name: 'last_name', free_hours:'free_hours', num: 'num'},
        {master_id: 'master_id', last_name: 'last_name', free_hours:'free_hours', num: 'num'}
      ],
      masters_to_select: [],
    }
  },
  methods: {
    getApplications(){
      ApplicationsService.getAll()
      .then((responce) => {
        this.applications = responce.data.map(this.getDisplayApplic)
        console.log(this.applications)
      })
      .catch((e) => {
        console.log(e)
      })
    },
    refreshList() {
      this.getApplications();
    },
    getDisplayApplic(applic) {
      return {
        id: applic.id,
        date_open: applic.date_open,
        date_close: applic.date_close,
        id_status_applic: applic.id_status_applic
      };
    },

    getClients() {
      UsersService.getAllClients()
      .then((responce) => {
        this.users = responce.data
        console.log(this.users)
      })
    },
    getClassesProblem(){
      ClassesProblemService.getAll()
      .then((responce) => {
        this.problems = responce.data
        console.log(this.problems)
      })
      .catch((e) => {
        console.log(e)
      })
    },
    enableSelectMasters(){
        console.log(this.select_problem)
        this.getMastersForManager(this.select_problem.id)
        this.disabled_select_master = false
    },
    getMastersForManager(id) {
      ApplicationsService.getMastersForManager(id)
      .then((responce) => {
        this.masters = responce.data
        console.log(responce.data)
        this.TransformMasters()
      })
      .catch((e) => {
        console.log(e)
      })
    },
    TransformMasters(){
      const masters = this.masters
      for (let i = 0; i < masters.length; i++){
        this.masters_to_select.push({
          master_id: masters[i].master_id, 
          master_title: masters[i].last_name + '. Осталось ' + masters[i].free_hours + ' часов, Заказов выполнено: ' + masters[i].num
        })
      }
    }
  },
  mounted() {
    this.getApplications()
    this.getClients()
    this.getClassesProblem()
  }
}
</script>

<style>

</style>