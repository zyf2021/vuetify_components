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
                    <v-row no-gutters><BarChart/></v-row>
                    <v-row>
                        <v-col cols="12" sm="4">
                            <v-card
                                flat
                                color="accent"
                                theme="dark"
                            >
                                

                                <v-card-subtitle class="text">Открытых заказов</v-card-subtitle>
                                <v-card-title class="text-h5">
                                    125
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
                                <v-card-title class="text-h5">
                                    2568
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
                                <v-card-title class="text-h5">
                                    10235
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
                            />
                        </v-col>
                        <v-col cols="6"><PieChart/></v-col>
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
export default {
    components: { BarChart, LineChart, PieChart },
    data() {
      return {
            items: [
                { text: 'НОВОСТИ', icon: 'mdi-clock', route:'/admin/news'},
                { text: 'ЗАПЧАСТИ', icon: 'mdi-account' },
                { text: 'ЗАКАЗЫ', icon: 'mdi-flag' },
                { text: 'ПОЛЬЗОВАТЕЛИ', icon: 'mdi-flag' },
                { text: 'ТЕМЫ НОВОСТЕЙ', icon: 'mdi-flag', route: '/admin/themes_news' },
            ],
        }
    }
      

}
</script>

<style>

</style>