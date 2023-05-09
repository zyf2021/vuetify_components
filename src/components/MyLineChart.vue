<template>
    <v-card
        flat
        :height="heightCard"
    >
        <Line
            id="my-line-id"
            :options="chartOptions"
            :data="chartData"
        />
    </v-card>
    
  </template>
  
  <script>
  import { Line } from 'vue-chartjs'

  import {
        Chart as ChartJS,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    } from 'chart.js'
  
  ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    )
  //import ApplicationsService from '@/services/ApplicationsService'
  export default {
    name: 'LineChart',
    props: {
        heightCard:{
            type: String
        },
        titleCard:{
            type: String
        },
        chartData: {
          type: Object
        }
    },
    components: { Line },
    data() {
      return {
        /*chartData: {
          labels: [],
          datasets: [
                {
                label: 'Количество заявок в месяц',
                backgroundColor: '#f87979',
                data: []
                }
            ],
        },*/
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false
        },
        data_chart:[]
      }
    },
    methods: {
    },
    mounted(){
    },
    watch: {
      
    }
  }
  </script>