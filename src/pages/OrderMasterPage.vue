<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <v-card>
          <v-card-title>
            <span class="text-h5">Заказы в работе</span>
          </v-card-title>
          <v-data-table
            :group-by="groupBy"
            :search="search"
            :headers="headers"
            :items="applications"
            :sort-by="[{ key: 'category', order: 'asc' }]"
            class="elevation-0"
          >
            <template v-slot:top>
              <v-toolbar
                flat
              >
                <v-toolbar-title>My CRUD</v-toolbar-title>
                <v-divider
                  class="mx-4"
                  inset
                  vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Поиск по полям"
                  single-line
                  hide-applications
                ></v-text-field>
                
                <v-dialog
                  v-model="dialog"
                  width="700px"
                >
  
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>
        
                    <v-card-text>
                      <v-container>
                        <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field
                            label="Дата открытия"
                            v-model="editedItem.date_open"
                            type="date"
                            mask="YYYY-MM-DD"
                            disabled
                        ></v-text-field>
                        <v-text-field
                            label="Дата закрытия"
                            v-model="editedItem.date_close"
                            type="date"
                            mask="YYYY-MM-DD"
                            disabled
                        ></v-text-field>
                        <v-card-subtitle>ГАРАНТИЯ</v-card-subtitle>
                        <v-divider class="mb-4"></v-divider>
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    label = "Дата начала действия гарантии" 
                                    type="date"
                                    mask="YYYY-MM-DD"
                                    disabled
                                   
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    label = "Дата окончания действия гарантии" 
                                    type="date"
                                    mask="YYYY-MM-DD"
                                    disabled
                                    
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    label="Длительность"
                                    disabled
                                    
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    label="Категория"
                                    disabled
                                    
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                        label="Тип проблемы"
                        v-model="select_problem"
                        :items="problems"
                        item-title="name"
                        item-value="id"
                        return-object
                      ></v-select>
                      <v-row class="mx-0">
                   
                        <v-text-field class="mr-2"
                          label="Сложность"
                          v-model="select_problem.difficult"
                          disabled
                        ></v-text-field>
                        <v-text-field
                              label="Стоимость работы"
                              v-model="select_problem.base_price"
                              disabled
                        ></v-text-field>
                        <v-text-field
                              label="Стоимость работы"
                              v-model="select_problem.normative_time"
                              disabled
                        ></v-text-field>
                      </v-row>
                      
                      <v-select 
                          label="Статус заявки"
                          v-model="select_status"
                          :items="statuses"
                          item-title="name"
                          item-value="id"
                      ></v-select>
                      <v-text-field
                          label="Клиент"
                          v-model="editedItem.client"
                      ></v-text-field>
                      
                      
                      <v-text-field
                          label="Стоимость деталей"
                          v-model="editedItem.detail_price"
                      ></v-text-field>
                      <v-text-field
                          label="Общая сумма"
                          v-model="editedItem.total_price"
                      ></v-text-field>
                      <v-textarea  
                          label="Комментарий к заказу"
                          v-model="editedItem.comment"
                          counter 
                          :rules="rules" 
                      >
                      </v-textarea>
                      </v-col>
                    </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                      <v-btn
                        color="blue-darken-1"
                        variant="text"
                        @click="update"
                      >
                        Обновить
                      </v-btn>
                      <v-btn
                        color="blue-darken-1"
                        variant="text"
                        @click="close"
                      >
                        Выход
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5">Вы уверены?</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                      <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:[`item.date_close`] = "{item}">
                  {{ item.raw.date_close ? item.raw.date_close.substring(0,10) : 'n/a'}}
              </template>
              <template v-slot:[`item.date_open`] = "{item}">
                  {{ item.raw.date_open ? item.raw.date_open.substring(0,10) : 'n/a'}}
              </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn flat class="mr-2" size="small" color="accent" @click="editItem(item.raw)">
                  <span dark class="text-h6">&#9998;</span>
              </v-btn>
              <v-btn flat color="error" size="small" @click="deleteItem(item.raw)">
                  <span dark class="text-h6">&#128465;</span>
              </v-btn>
            </template>
          </v-data-table>
          <v-card-actions v-if="applications.length > 0">
              <v-btn @click="deleteAll">
                Удалить все
              </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script>
import ApplicationsService from '@/services/ApplicationsService'
import ClassesProblemService from '@/services/ClassesProblemService'
import StatusesApplicService from '@/services/StatusesApplicService'
  export default {
    components: {},
    data: () => ({
      search: '',
      groupBy: [{ key: 'status' }],
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
      headers: [
        { title: 'ID', align: 'start', sortable: false, key: 'id'},
        { title: 'Дата поставки', key: 'date_open' },
        { title: 'Дата закрытия', key: 'date_close' },
        { title: 'Имя', key: 'master_last_name' },
        { title: 'Имя', key: 'status' },
        { title: 'Имя', key: 'class' },
        { title: 'Имя', key: 'difficult' },
        { title: 'Цена', key: 'base_price' },
        { title: 'Номер заявки', key: 'normative_time' },
        { title: 'Номер заявки', key: 'detail_price' },
        { title: 'Категория детали', key: 'total_price' },
        { title: 'Действия', key: 'actions', sortable: false },
      ],
      applications: [],
      problems: [],
      select_problem: {name: ''},
      statuses: [],
      select_status: {name: ''}
    }),
    computed: {
      formTitle () {
        return 'Edit Item'
      },
      idMaster () {
        return 7
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
      editedItem(newData) {
        console.log('newData ' + newData.id)
        newData.date_open = newData.date_open.substring(0,10)
        if (newData.date_close) {
          newData.date_close = newData.date_close.substring(0,10)
        }
      }
    },

    created () {
      this.getAll(this.idMaster)
      this.getClassesProblem()
      this.getStatuses()
    },

    methods: {
      getStatuses(){
        StatusesApplicService.getAll()
        .then((response) => {
          this.statuses = response.data
          console.log(this.statuses)
        })
        .catch((e) => {
          console.log(e)
        })
      },
      getClassesProblem(){
        ClassesProblemService.getAll()
        .then((response) => {
          this.problems = response.data
          console.log(this.problems)
        })
        .catch((e) => {
          console.log(e)
        })
      },
      getAll(id){
        ApplicationsService.getAllForMasterById(id)
        .then( res => {
          this.applications = res.data
          console.log(res.data)
        })
        .catch(e => {
          console.log(e)
        })
      },
      editItem (item) {
        this.editedIndex = this.applications.indexOf(item)
        this.editedItem = Object.assign({}, item)

        this.select_problem.id = this.editedItem.class_id
        this.select_problem.name = this.editedItem.class
        this.select_problem.difficult = this.editedItem.difficult
        this.select_problem.normative_time = this.editedItem.normative_time
        this.select_problem.base_price = this.editedItem.base_price

        this.select_status.id = this.editedIndex.status_id
        this.select_status.name = this.editedIndex.status

        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.applications.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.applications.splice(this.editedIndex, 1)
        this.closeDelete()
      },
      deleteAll(){
        ApplicationsService.deleteAll()
            .then((response) => {
                console.log(response.data)
            })
            .catch((e) => {
                console.log(e);
            })
        },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
    },
    mounted() {
      //this.getAll(this.idClient)
    },
  }
</script>

<style>

</style>