<template>
    <div class="flex bg-gray-900">
      <Sidebar  />
      <div class="ml-58 w-full min-h-screen ">
        <router-view />
      </div>
    </div>
  </template>
  
  <script setup>
  import Sidebar from '../components/Sidebar.vue'
  import Papa from 'papaparse'

  fetch('/revenue_data.csv')
    .then(response => response.text())
    .then(csvText => {
      const result = Papa.parse(csvText, { header: true, skipEmptyLines: true })
      localStorage.setItem('revenuData', JSON.stringify(result.data))
      console.log(JSON.stringify(result.data))  
      console.log('Parsed data saved to localStorage:', result)
    })
    .catch(err => console.error('Error loading CSV:', err))

    
  </script>
  