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
  
  export default {
    name: 'LineChart',
    props: {
        heightCard:{
            type: String
        },
        titleCard:{
            type: String
        }
    },
    components: { Line },
    data() {
      return {
        chartData: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
                {
                label: 'Data One',
                backgroundColor: '#f87979',
                data: [40, 39, 10, 40, 39, 80, 40]
                }
            ],
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false
        },
      }
    }
  }
  </script>