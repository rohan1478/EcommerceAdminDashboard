<template>
  <div class="fixed top-0 left-0 h-screen bg-gray-800 w-56 text-white flex flex-col transition-all duration-300 border-r border-gray-700"> 

    <div class="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 class="text-lg font-semibold text-gray-100">Admin Panel</h2>
    </div>

    <nav class="flex-1 flex flex-col p-2 space-y-1 overflow-y-auto">
      <router-link
        to="/"
        class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors group"
        active-class="bg-gray-700"
        exact
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <transition name="fade">
          <span  class="text-sm text-gray-300 group-hover:text-white">Inventory</span>
        </transition>
      </router-link>

      <router-link
        to="/add_product"
        class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors group"
        active-class="bg-gray-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <transition name="fade">
          <span class="text-sm text-gray-300 group-hover:text-white">Add Product</span>
        </transition>
      </router-link>

      <router-link
        to="/analysis"
        class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors group"
        active-class="bg-gray-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <transition name="fade">
          <span class="text-sm text-gray-300 group-hover:text-white">Analysis</span>
        </transition>
      </router-link>
    </nav>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>