<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span class="text-h5">Новости сайта</span>
      </v-card-title>
      <v-data-table
        :group-by="groupBy"
        :search="search"
        :headers="headers"
        :items="news"
        :sort-by="[{ key: 'category', order: 'asc' }]"
        class="elevation-0"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Управление таблицами</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              class="mt-6 mx-10 align-self-center"
              v-model="search"
              append-icon="mdi-magnify"
              label="Поиск по полям"
              single-line
              hide-news
            ></v-text-field>
            
            <v-dialog
              v-model="dialog"
              max-width="500px"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2 align-self-center"
                  v-bind="props"
                >
                  ДОБАВИТЬ НОВОСТЬ
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>
    
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-text-field
                          v-model="editedItem.name"
                          label="Название детали"
                      ></v-text-field>
                    </v-row>
                    <v-row>
                      <v-textarea
                        v-model="editedItem.text"
                        label="Текст новости"
                      ></v-textarea>
                    </v-row>
                    <v-row>
                      <v-select
                        v-model="editedItem.theme"
                        label="Тема новости"
                        :items="themes"
                        item-title="name"
                        item-value="id"
                      ></v-select>
                    </v-row>
                  </v-container>
                </v-card-text>
    
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="close"
                  >
                    Отмена
                  </v-btn>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="save"
                  >
                    Сохранить
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
        <template v-slot:[`item.createdAt`] = "{item}">
              {{ item.raw.createdAt ? item.raw.createdAt.substring(0,10) : 'n/a'}}
          </template>
          <template v-slot:[`item.updatedAt`] = "{item}">
              {{ item.raw.updatedAt ? item.raw.updatedAt.substring(0,10) : 'n/a'}}
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
      <v-card-actions v-if="news.length > 0">
          <v-btn @click="deleteAll">
            Удалить все
          </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
  import NewsService from '@/services/NewsService'
  import ManufactorsService from '@/services/ManufactorsService'
  import ThemesNewsService from '@/services/ThemesNewsService'
  export default {
    data: () => ({
      search: '',
      groupBy: [{ key: 'category' }],
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
      headers: [
        { title: 'ID', align: 'start', sortable: false, key: 'id'},
        { title: 'Имя', key: 'name' },
        { title: 'Тема новости', key: 'theme' },
        { title: 'Дата создания', key: 'createdAt' },
        { title: 'Дата обновления', key: 'updatedAt' },
        { title: 'Действия', key: 'actions', sortable: false },
      ],
      news: [],
      manufactors: [], 
      themes: [],
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Создать деталь' : 'Изменить информацию о детали'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
      /*editedItem (newData) {
          let now = new Date()
          newData["date_arrive"] = now
          console.log("2", newData)
      }*/
    },

    created () {
      this.getAllDetails()
    },

    methods: {
      getAllCatDet(){
        ThemesNewsService.getAll()
        .then( res => {
          this.themes = res.data
          console.log(res.data)
        })
        .catch(e => {
          console.log(e)
        })
      },
      getAllManufactor(){
        ManufactorsService.getAll()
        .then( res => {
          this.manufactors = res.data
          console.log(res.data)
        })
        .catch(e => {
          console.log(e)
        })
      },
      getAllDetails(){
        NewsService.getAll()
        .then( res => {
          
          this.news = res.data
          console.log(res.data)
        })
        .catch(e => {
          console.log(e)
        })
      },
      editItem (item) {
        this.editedIndex = this.news.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.news.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.news.splice(this.editedIndex, 1)
        this.closeDelete()
      },
      deleteAll(){
            NewsService.deleteAll()
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

      save () {
        if (this.editedIndex > -1) {
          // let now = new Date();
          console.log("1", this.news[this.editedIndex])
          ///this.news[this.editedIndex]["date_arrive"] = now
          Object.assign(this.news[this.editedIndex], this.editedItem)

        } else {
          
          let now = new Date();
          this.editedItem["date_arrive"] = now.toISOString()
          console.log("2", this.editedItem)
          this.news.push(this.editedItem)
        }
        this.close()
      },
    },
    mounted () {
      this.getAllDetails()
      this.getAllManufactor()
      this.getAllCatDet()
    }
  }
</script>

<style>

</style>