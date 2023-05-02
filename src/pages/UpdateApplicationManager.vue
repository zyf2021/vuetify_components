<template>
  <v-container>
    <v-row>
        <v-col cols="12" sm="2"></v-col>
        <v-col cols="12" sm="8">
            <v-card flat class="pa-4 bg-secondary">
                <form @submit.prevent="updateApplication">
                <v-card-title class="text-h5">
                        Изменить заявку №{{ applicationId }}
                </v-card-title>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field
                            label="Клиент"
                            v-model="user.last_name"
                            disabled
                        ></v-text-field>
                        <v-text-field
                            label="Дата открытия"
                            v-model="application.date_open"
                            type="date"
                            mask="YYYY-MM-DD"
                            disabled
                        ></v-text-field>
                        <v-text-field
                            label="Дата закрытия"
                            v-model="application.date_close"
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
                                    v-model="warranty.date_set"
                                    :value="warranty.date_set"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    label = "Дата окончания действия гарантии" 
                                    type="date"
                                    mask="YYYY-MM-DD"
                                    disabled
                                    v-model="warranty.date_close"
                                    :value="warranty.date_close"
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    label="Длительность"
                                    disabled
                                    v-model="warranty.duration"
                                    :value = "warranty.duration"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field
                                    label="Категория"
                                    disabled
                                    v-model="warranty.name"
                                    :value = "warranty.name"
                                ></v-text-field>
                            </v-col>
                        </v-row>
 
                        <v-btn
                            width="100%"
                            variant="outlined "
                            class="mb-6"
                            @click="showDialog"
                        >
                            Добавить гарантию
                        </v-btn>
                        <div>
                            <MyDialogWarranty 
                                v-if="dialogVisible" 
                                :title="dialogTitle" 
                                @updateWarranty="submitDialog" 
                                @close="closeDialog"
                                :durations = "durations"
                                :categories ="categories_warranty"
                            >
                            </MyDialogWarranty>
                        </div>
                        </v-col>
                    <v-col cols="12" sm="6">
                        
                            <v-select
                                label="Тип проблемы"
                                v-model="select_problem"
                                :items="classes_problem"
                                item-title="name"
                                item-value="id"
                                return-object
                            ></v-select>
                            <v-select
                                label="Статус заявки"
                                v-model="select_status"
                                :items="statuses_applic"
                                item-title="name"
                                item-value="id"
                                return-object
                            ></v-select>
                            <v-select
                                label="Мастер"
                                v-model="select_master"
                                :items="masters"
                                item-title="last_name"
                                item-value="id"
                                return-object
                            >
                            </v-select>
                            <v-textarea  
                                label="Комментарий к заказу"
                                v-model="comment"
                                counter 
                                :rules="rules" 
                            >
                            </v-textarea>
                        
                    </v-col>
                </v-row>
                <v-card-actions>
                    <my-btn type="submit"
                    >Изменить</my-btn>
                </v-card-actions>  
            </form>
            </v-card>
            
        </v-col>
        <v-col cols="12" sm="2"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import ApplicationsService from '@/services/ApplicationsService'
import StatusesApplicService from '@/services/StatusesApplicService'
import CategoriesWarrantyService from '@/services/CategoriesWarrantyService'
import ClassesProblemService from '@/services/ClassesProblemService'
import DurationWarrantyService from '@/services/DurationWarrantyService'
import WarrantysService from '@/services/WarrantysService'
import UsersServices from '@/services/UsersServices'

//import MyButton from '@/components/UI/MyButton.vue'
import MyDialogWarranty from '@/components/MyDialogWarranty'
export default {
  components: { MyDialogWarranty },
    name: 'UpdateApplocationManager',
    computed: {
      applicationId() {
        return this.$route.params.id;
      },
    },
    data() {
        return {
            rules: [v => v.length <= 300 || 'Максимальная длина 300 символов'],
            application: {},
            user:{},
            dialogVisible: false,
            dialogTitle: '',
            statuses_applic: [],
            select_status: {},
            classes_problem: [],
            select_problem: {},
            categories_warranty: [],
            warranty: {},
            masters:[],
            masters_to_select: [],
            select_master: {},
            comment:'',
            durations: [],
        }
    },
    methods: {
        getUser(id){
            UsersServices.get(id)
            .then((response) => {
                this.user = response.data
                console.log(this.user)
            })
            .catch((e) => {
                console.log('ошибка в user' + e)
            })
        },
        getClassesProblem(){
            ClassesProblemService.getAll()
            .then((response) => {
                this.classes_problem = response.data
                console.log(this.classes_problem)
            })
            .catch((e) => {
                console.log(e)
            })
        },
        getProblem(id){
            ClassesProblemService.get(id)
            .then((response) => {
                this.select_problem = response.data
                console.log(this.select_problem)
            })
            .catch((e) => {
                console.log(e)
            })
        },
        getStatusesApplic(){
            StatusesApplicService.getAll()
            .then((response) => {
                this.statuses_applic = response.data
                console.log(this.statuses_applic)
            })
            .catch((e) => {
                console.log(e)
            })
        },
        getStatus(id){
            StatusesApplicService.get(id)
            .then((response) => {
                this.select_status = response.data
                console.log(this.select_status)
            })
            .catch((e) => {
                console.log(e)
            })
        },
        getWarrantyForApplic(id){
            WarrantysService.getForApplic(id)
            .then((response) => {
                this.warranty = response.data
                console.log(this.warranty)
            })
            .catch((e) => {
                console.log('ошибка в приложении' + e)
            })
        },
        getCategoriesWarranty(){
            CategoriesWarrantyService.getAll()
            .then((response) => {
                this.categories_warranty = response.data
                console.log(this.categories_warranty)
            })
            .catch((e) => {
                console.log(e)
            })
        },

        //Получить длительности гарантий
        getDurations(){
            DurationWarrantyService.getAll()
            .then((response) => {
                this.durations = response.data
                console.log(this.durations)
            })
            .catch((e) => {
                console.log(e)
            })
        },
        getMastersForManager(id) {
            //id - это номер проблемы, по которой отбирается подходящий мастер
            UsersServices.getAllMasters(id)
            .then((response) => {
                this.masters = response.data
                console.log(response.data)
            })
            .catch((e) => {
                console.log(e)
            })
        },
        getMaster(id) {
            UsersServices.get(id)
            .then((response) => {
                this.select_master = response.data
                console.log(this.select_master)
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
        },
        getApplication(id){
            ApplicationsService.get(id)
            .then((response) => {
                this.application = response.data
                console.log(response.data)
                this.getWarrantyForApplic(this.applicationId)
            })
            .catch((e) => {
                console.log(e)
            })
        },
        updateApplication(){
            const data = {
                id: this.applicationId, 
                comment: this.comment,
                id_status_applic: this.select_status.id,  
                id_class_problem: this.select_problem.id, 
                id_master: this.select_master.id,
                id_waranty: this.warranty.id,
            }
            ApplicationsService.update(data)
            .then((response) => {
                console.log(response.data)
            })
            .catch((e) => {
                console.log('Ошибка в обновлении заявки', e)
            })
        },
        showDialog() {
            this.dialogVisible = true
            this.dialogTitle = 'Создание гарантии'
        },
        submitDialog(data) {
            console.log('Submitted data:', data)
            
            this.warranty = data
            console.log('Old warranry:', this.warranty)
            this.dialogVisible = false;
        },
        closeDialog() {
            this.dialogVisible = false;
        }
    },
    watch: {
        application(newData) {
            console.log('newData ' + newData.id)
            newData.date_open = newData.date_open.substring(0,10)
            if (newData.date_close) {
                newData.date_close = newData.date_close.substring(0,10)
            } 
            this.comment = newData.comment
            this.getProblem(newData.id_class_problem)
            this.getStatus(newData.id_status_applic)
            this.getUser(newData.id_client)
            this.getMastersForManager(newData.id_class_problem)
            this.getMaster(newData.id_master)
        },
        warranty(newData, oldData){
            console.log('oldData', oldData)
            console.log('NewData', newData)
            if (newData.date_set){
                newData.date_set = newData.date_set.substring(0,10)
            }
            if (newData.date_close) {
                newData.date_close = newData.date_close.substring(0,10)
            } 
        }
    },  
    mounted() {
        this.getApplication(this.applicationId)
        this.getClassesProblem()
        this.getCategoriesWarranty()
        this.getStatusesApplic()
        this.getDurations()
    }
    

}
</script>

<style>
    
</style>