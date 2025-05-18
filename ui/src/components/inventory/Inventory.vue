<template>
   <div class="p-6 bg-gray-900 min-h-screen text-white">
    <h2 class="text-2xl font-bold mb-6">Product Inventory</h2>
    <div class="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div class="relative flex-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search products..."
          class="pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
      </div>
      <div class="flex gap-2">
        <div class="relative flex-1">
          <select
            v-model="stockFilter"
            class="appearance-none px-4 py-2 pr-8 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          >
            <option value="all">All Stock</option>
            <option value="in">In Stock</option>
            <option value="out">Out of Stock</option>
          </select>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 absolute right-3 top-3 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div class="relative flex-1">
          <select
            v-model="sortBy"
            class="appearance-none px-4 py-2 pr-8 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          >
            <option value="name">Sort by Name</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 absolute right-3 top-3 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
    <div v-if="loading" class="fixed inset-0 z-20 flex items-center justify-center p-6 min-h-screen bg-red-500/30 backdrop-blur-sm">
      <span>Loading...</span>
    </div>

    <div v-else-if="error" class="error-message">
      Error: {{ error }}
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product._id"
        :product="product"
        @stock-update="handleStockUpdate"
      />
    </div>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue'

export default {
  components: {
    ProductCard
  },
  data() {
    return {
      products: [],
      searchQuery: '',
      stockFilter: 'all', 
      sortBy: 'name',    
      loading: false,
      error:  null
    };
  },
  computed: {
    filteredProducts() {
      let result = [...this.products];

      if (this.searchQuery) {
        const q = this.searchQuery.toLowerCase();
        result = result.filter((p) =>
          p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
        );
      }

      if (this.stockFilter === 'in') {
        result = result.filter((p) => p.stock > 0);
      } else if (this.stockFilter === 'out') {
        result = result.filter((p) => p.stock <= 0);
      }

      if (this.sortBy === 'name') {
        result.sort((a, b) => a.name.localeCompare(b.name));
      } else if (this.sortBy === 'priceLow') {
        result.sort((a, b) => a.price - b.price);
      } else if (this.sortBy === 'priceHigh') {
        result.sort((a, b) => b.price - a.price);
      }

      return result;
    },
  },
  async mounted() {
    await this.fetchProducts();
  },
  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString();
    },
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      try {
        const res = await fetch('https://ecommerceadmindashboard.onrender.com/api/products');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        this.products = await res.json();
        console.log(this.products);
      } catch (err) {
        this.error = err.message || 'Failed to fetch data';
        console.error('Failed to fetch products:', err);
      } finally {
        this.loading = false;
      }
    },
    async handleStockUpdate({ productId, newStock }) {
      try {
        const res = await fetch(`https://ecommerceadmindashboard.onrender.com/api/products/${productId}/stock`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ stock: newStock }),
        });

        if (!res.ok) throw new Error('Update failed');

        await this.fetchProducts();
      } catch (err) {
        console.error('Stock update failed:', err);
      }
    }
  },
};
</script>
