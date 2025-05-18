<template>
  <div class="container mx-auto p-4 max-w-6xl min-h-screen">
    <div class="flex flex-col md:flex-row gap-6">
      <div class="flex-1 bg-gray-800 p-4 rounded-lg shadow-md">
        <div class="flex justify-between items-center mb-4">
          <div class="flex gap-2">
            <label class="flex items-center gap-1">
              <span class="text-sm text-gray-300">Start:</span>
              <input 
                type="month" 
                v-model="startDate" 
                class="px-2 py-1 bg-gray-700 border border-gray-600 rounded-md text-xs text-white"
              />
            </label>
            <label class="flex items-center gap-1">
              <span class="text-sm text-gray-300">End:</span>
              <input 
                type="month" 
                v-model="endDate" 
                class="px-2 py-1 bg-gray-700 border border-gray-600 rounded-md text-xs text-white"
              />
            </label>
          </div>
        </div>
        <div class="h-80">
          <Bar v-if="barData" :data="barData" :options="barOptions" />
        </div>
      </div>
      <div class="flex-1 bg-gray-800 p-4 rounded-lg shadow-md">
        <div class="h-80">
          <Pie :data="pieData" :options="pieOptions" />
        </div>
      </div>  
    </div>
    <div class="flex-1 mt-10 bg-gray-800 p-4 rounded-lg shadow-md">
        <div class="h-80">
          <Line :data="lineData" :options="lineOptions" />
        </div>
      </div>
  </div>
</template>

  <script lang="ts">
  import { defineComponent } from 'vue'
  import { Bar, Pie, Line } from 'vue-chartjs'  
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    LineElement,
    PointElement
  } from 'chart.js'

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
  )

  import { pieData, pieOptions } from './PieChartData'
  import { barOptions, getFilteredBarData } from './BarChartData'
  import { lineData, lineOptions } from './LineChartData'

  export default defineComponent({
    name: 'CombinedChart',
    components: {
      Bar,
      Pie,
      Line
    },
    data() {
      return {
        startDate: '2023-01',
        endDate: '2023-12',
        barData: null as any,
        pieData,
        lineData,
        lineOptions,
        pieOptions,
        barOptions
      }
    },
    watch: {
      startDate: 'updateBarData',
      endDate: 'updateBarData'
    },
    mounted() {
      this.updateBarData()
    },
    methods: {
      updateBarData() {
        this.barData = getFilteredBarData( this.startDate, this.endDate)
      }
    }
  })
  </script>
  
  <style scoped>
  label {
    margin-right: 10px;
  }
  </style>
  

  