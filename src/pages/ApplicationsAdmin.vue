<template>
  <v-container>
    <v-card>
        <v-card-title>
            Заявки на ремонт оборудования
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Поиск по полям"
                single-line
                hide-details
            ></v-text-field>
        </v-card-title>
            <v-data-table
                :group-by="groupBy"
                :headers="headers"
                :items="applications"
                :search="search"
                item-value="id"
            >
                <template v-slot:[`item.id`]="{ item }">
                <v-chip color="accent">
                    {{ item.raw.id }}
                </v-chip>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn flat class="mr-2" size="small" color="accent" @click="editApplication(item.raw.id)">
                        <span dark class="text-h6">&#9998;</span>
                    </v-btn>
                    <v-btn flat color="error" size="small" @click="deleteApplication(item.raw.id)">
                        <span dark class="text-h6">&#128465;</span>
                    </v-btn>
                </template>
            </v-data-table>
        <v-card-actions v-if="applications.length > 0">
          <v-btn @click="removeAllApplications">
            Удалить все
          </v-btn>
        </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import ApplicationsService from '@/services/ApplicationsService'
export default {
    data(){
        return {
            search: '',
            sortBy: [{ key: 'date_open' }],
            groupBy: [{ key: 'status' }],
            applications: [{}],
            title: "",
            headers: [
                {title: "ID", align: "start", sortable: true, value:"id", key:"id"},
                {title: "Дата открытия", sortable: true, key:"date_open"},
                {title: "Дата закрытия", sortable: true, key:"date_close"},
                {title: "Клиент", sortable: true, key:"client"},
                {title: "Мастер", sortable: true, key:"master"},
                {title: "Проблема", sortable: true, key:"class"},
                {title: "Статус", sortable: true, key:"status"},
                
                {title: "Плановое время", sortable: true, key:"normative_time"},
                {title: "Сложность", sortable: true, key:"difficult"},   
                {title: "Стоимость", sortable: true, key:"base_price"}, 
                {title: "Стоимость деталей", sortable: true, key:"detail_price"}, 
                {title: "Полная стоимость", sortable: true, key:"total_price"}, 
                {text: "Actions", sortable: false, value: "actions", key: 'actions' },
            ]
        }
    },
    methods: {
        getAllApplications(){
            ApplicationsService.getAll()
            .then((response) => {
                console.log(response.data)
                this.applications = response.data//.map(this.getDisplayApplications)
                console.log(response.data)
            })
            .catch((e) => {
                console.log(e);
            })
        },
        refreshList() {
            this.getAllApplications();
        },
        getDisplayApplications(application) {
            return {
                id: application.id,
                date_open: application.date_open//.length > 30 ? application.name.substr(0, 30) + "..." : application.name,
            };
        },
        removeAllApplications(){
            ApplicationsService.deleteAll()
            .then((response) => {
                console.log(response.data)
            })
            .catch((e) => {
                console.log(e);
            })
        },
        editApplication(id){
            console.log(id)
            this.$router.push({ path: `/update_theme/${id}` });
        },
        deleteApplication(id){
            ApplicationsService.delete(id)
            .then(() => {
                this.refreshList();
            })
            .catch((e) => {
                console.log(e)
            })
        }
    },
    mounted() {
        this.getAllApplications();
    },
}
</script>

<style>

</style>