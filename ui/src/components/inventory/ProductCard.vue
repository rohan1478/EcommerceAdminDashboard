<template>
    <div class="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div class="relative">
        <img
          v-if="product.imageUrl"
          :src="product.imageUrl"
          alt="Product image"
          class="w-full h-48 object-cover"
        />
        <div v-else class="w-full h-48 bg-gray-700 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div 
          class="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold"
          :class="product.stock > 0 ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'"
        >
          {{ product.stock > 0 ? 'In Stock' : 'Out of Stock' }}
        </div>
      </div>

      <div class="p-4">
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-lg font-semibold line-clamp-1">{{ product.name }}</h3>
          <span class="text-green-400 font-bold">${{ product.price }}</span>
        </div>
        
        <p class="text-gray-400 text-sm line-clamp-2 mb-3">{{ product.description }}</p>
        
        <div class="mb-3 ">
          <div class="flex justify-between items-center mb-1">
            <span class="text-sm text-gray-300">Stock Level:</span>
            <span class="text-sm font-medium" :class="product.stock > 0 ? 'text-green-400' : 'text-red-400'">
              {{ product.stock }} in stock
            </span>
          </div>
          <div class="flex items-center w-full">
            <button
              @click.stop="adjustStock(-1)"
              :disabled="product.stock <= 0"
              class="p-1.5 rounded-md bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
              </svg>
            </button>
            
            <input
              type="number"
              v-model.number="localStock"
              @change="updateStock"
              min="0"
              class="flex-1 w-12 px-3 py-1.5 text-center rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
            
            <button
              @click.stop="adjustStock(1)"
              class="p-1.5 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProductCard',
    props: {
      product: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        localStock: this.product.stock
      }
    },
    watch: {
      'product.stock'(newVal) {
        this.localStock = newVal
      }
    },
    methods: {
      formatDate(dateStr) {
        const date = new Date(dateStr)
        return date.toLocaleDateString()
      },
      adjustStock(amount) {
        const newStock = Math.max(0, this.localStock + amount)
        if (newStock !== this.localStock) {
          this.localStock = newStock
          this.$emit('stock-update', { 
            productId: this.product._id, 
            newStock: this.localStock 
          })
        }
      },
      updateStock() {
        const newStock = Math.max(0, parseInt(this.localStock) || 0)
        this.localStock = newStock
        this.$emit('stock-update', { 
          productId: this.product._id, 
          newStock: this.localStock 
        })
      }
    }
  }
  </script>
  
  <style scoped>
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>