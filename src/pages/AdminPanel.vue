<template>
  <v-container>
    <v-row>
        <v-col cols="3" class="bg-white">
            <v-card
                class="mx-auto"
                max-width="300"
                flat
                color="secondary"
            >
                <v-list density="compact">
                <v-list-subheader 
                    class="align-center justify-center"
                >
                    ТАБЛИЦЫ
                </v-list-subheader>
                <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    :value="item"
                    active-color="primary"
                    color="seconadry"
                >  
                    <v-btn :to="item.route" flat width="100%" class="ma-0">
                        {{ item.text }}
                    </v-btn>
                </v-list-item>
                </v-list>
            </v-card>
        </v-col>
        <v-col cols="9" class="">
            <v-card flat class="" color="secondary">
                <v-container>
                    <v-row no-gutters>
                        <BarChart
                            :chartData="barChartData"
                            :key="componentBarKey"
                        /></v-row>
                    <v-row>
                        <v-col cols="12" sm="4">
                            <v-card
                                flat
                                color="accent"
                                theme="dark"
                            >
                                

                                <v-card-subtitle class="text">Открытых заказов</v-card-subtitle>
                                <v-card-title class="text-h4">
                                    {{ this.orders }}
                                </v-card-title>
                                <v-card-actions>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-card
                                color="error"
                                theme="dark"
                                flat
                            >
                                <v-card-subtitle>Пользователей</v-card-subtitle>
                                <v-card-title class="text-h4">
                                    {{ this.users }}
                                </v-card-title>
                                <v-card-actions>
                                </v-card-actions>
                            </v-card>

                        </v-col>
                        <v-col cols="12" sm="4">
                            <v-card
                                flat
                                color="warning"
                                theme="dark"
                            >
                                <v-card-subtitle>Запчастей</v-card-subtitle>
                                <v-card-title class="text-h4">
                                    {{ this.details }}
                                </v-card-title>

                                

                                <v-card-actions>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <LineChart 
                                :heightCard="200" 
                                :chartData="lineChartData"
                                :key="componentKey"
                            />
                        </v-col>
                        <v-col cols="6">
                            <PieChart
                                :chartData="pieChartData"
                                :key="componentPieKey"
                            /></v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BarChart from '@/components/MyChartBar.vue'
import LineChart from '@/components/MyLineChart.vue'
import PieChart from '@/components/MyPieChart.vue'
import ApplicationsService from '@/services/ApplicationsService'
export default {
    components: { BarChart, LineChart, PieChart },
    data() {
      return {
            items: [
                { text: 'НОВОСТИ', icon: 'mdi-clock', route:'/admin/news'},
                { text: 'КОММЕНТАРИИ', icon: 'mdi-clock', route:'/admin/comments'},
                { text: 'ТЕМЫ НОВОСТЕЙ', icon: 'mdi-flag', route: '/admin/themes_news' },
                { text: 'ЗАПЧАСТИ', icon: 'mdi-account', route:'/admin/details'},
                { text: 'ЗАКАЗЫ', icon: 'mdi-flag', route:'/admin/applications' },
                { text: 'ПОЛЬЗОВАТЕЛИ', icon: 'mdi-flag', route:'/admin/users' },
                { text: 'ЗАГРУЗКА ФАЙЛОВ', icon: 'mdi-flag', route:'/admin/uploads' },

            ],
            orders: 0,
            users: 0,
            details: 0,

            lineChartData: {
                labels: [],
                datasets: [
                        {
                        label: 'Количество заявок в месяц',
                        backgroundColor: '#004D40',
                        data: []
                        }
                    ],
                },
            data_chart: [],
            componentKey: 0,

            barChartData: {
                labels: [],
                datasets: [{ 
                    label: 'Количество заявок по проблемам',
                    backgroundColor: ['#83E8BA', '#7776BC','#004D40','#003249'],
                    data: [] 
                }]
            },
            data_bar_chart: [],
            componentBarKey: 0,

            pieChartData: {
                labels: [],
                datasets: [{ 
                    label: 'Количество заявок по проблемам',
                    backgroundColor: ['#83E8BA', '#7776BC','#004D40','#003249'],
                    data: [] 
                }]
            },
            data_pie_chart: [],
            componentPieKey: 0,
        }
    },
    methods: {
        forceRerender() {
            this.componentKey += 1;
            console.log('Call!')  
        },
        forceBarRerender() {
            this.componentBarKey += 1;
            console.log('Call!')  
        },
        forcePieRerender() {
            this.componentPieKey += 1;
            console.log('Call!')  
        },
        getCountApplicationsByClasses(){
            ApplicationsService.getCountApplicationsByClasses()
            .then(res=> {
                this.data_bar_chart = res.data
                console.log(this.data_bar_chart)  
                this.TransformDataBarChart()
                this.forceBarRerender()
            })
        },
        getCountApplicationsByMonth(){
            ApplicationsService.getCountApplicationsByMonth()
            .then(res=> {
                    this.data_chart = res.data
                    console.log(this.data_chart)  
                    this.TransformDataChart()
                    this.forceRerender()
            })
        },  
        getCountApplicationsByMasters(){
            ApplicationsService.getCountApplicationsByMasters()
            .then(res=> {
                    this.data_pie_chart = res.data
                    console.log('pie', this.data_pie_chart) 
                    this.TransformDataPieChart()
                    this.forcePieRerender()
            })
        }, 
        TransformDataChart(){
            let data = []
            for (let i = 0; i < this.data_chart.length; i++){
                this.lineChartData.labels.push(this.data_chart[i].mon + ' ' + this.data_chart[i].yyyy)
                data.push(Number(this.data_chart[i].num))
            }
            this.lineChartData.datasets[0].data = data
            console.log(this.lineChartData.datasets[0])
        },
        TransformDataBarChart(){
            try{
                let data = []
                for (let i = 0; i < this.data_bar_chart.length; i++){
                    this.barChartData.labels.push(this.data_bar_chart[i].name)
                    data.push(Number(this.data_bar_chart[i].num_applic))
                }
                this.barChartData.datasets[0].data = data
                console.log(this.barChartData.datasets[0])
            }
            catch(e){
                console.log('TransformDataBarChart', e)
            }  
        },
        TransformDataPieChart(){
            try{
                let data = []
                for (let i = 0; i < this.data_pie_chart.length; i++){
                    this.pieChartData.labels.push(this.data_pie_chart[i].last_name)
                    data.push(Number(this.data_pie_chart[i].num_applic))
                }
                this.pieChartData.datasets[0].data = data
                console.log(this.pieChartData.datasets[0])
            }
            catch(e){
                console.log('TransformDataPieChart', e)
            }
            
        },      
        getCountStatusApplic(){
            ApplicationsService.getCountStatusApplic()
            .then(res=> {
                this.orders = res.data.count
            })
        },
        getCountUsers(){
            ApplicationsService.getCountUsers()
            .then(res=> {
                this.users = res.data.count
            })
        },
        getCountDetails(){
            ApplicationsService.getCountDetails()
            .then(res=> {
                this.details = res.data.count
            })
        }
    },
    mounted() {
        this.getCountStatusApplic()
        this.getCountUsers()
        this.getCountDetails()
        this.getCountApplicationsByClasses()
        this.getCountApplicationsByMonth()
        this.getCountApplicationsByMasters()
        
    },
    watch: {
      
    }
      

}
</script>

<style>

</style>