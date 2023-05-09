<template>
    <v-card
        flat
        height="200px"
    >
        <Pie
            id="my-pie-id"
            :options="chartOptions"
            :data="chartData"
        />
    </v-card>
    
  </template>
  
  <script>
  import { Pie } from 'vue-chartjs'

  import {
        Chart as ChartJS,
        ArcElement,
        Title,
        Tooltip,
        Legend
    } from 'chart.js'
  
  ChartJS.register(
        ArcElement,
        Title,
        Tooltip,
        Legend
    )
  
  export default {
    name: 'PieChart',
    components: { Pie },
    props: {
      chartData: {
        type:Object
      }
    },
    data() {
      return {
        /*chartData: {
            labels: [],
            datasets: [
                {
                backgroundColor: [],
                data: []
                }
            ]
        },*/
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false
        },
      }
    }
  }
  </script>