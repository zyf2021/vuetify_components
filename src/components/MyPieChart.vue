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
    data() {
      return {
        chartData: {
            labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
            datasets: [
                {
                backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                data: [40, 20, 80, 10]
                }
            ]
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false
        },
      }
    }
  }
  </script>