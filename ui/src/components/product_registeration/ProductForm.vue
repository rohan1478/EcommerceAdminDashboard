<template>
  <div class="p-6 bg-gray-900 min-h-screen text-white">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center gap-4 mb-6">
        <button 
          @click="$router.go(-1)"
          class="p-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h2 class="text-2xl font-bold text-gray-100">Register New Product</h2>
      </div>

      <div class="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <form @submit.prevent="handleSubmit" class="p-6 space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="space-y-5">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">Product Name *</label>
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Enter product name"
                  required
                  class="w-full px-4 py-2.5 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">Price *</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                  <input
                    v-model="form.price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    required
                    class="w-full pl-8 pr-4 py-2.5 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1">Stock *</label>
                <input
                  v-model="form.stock"
                  type="number"
                  min="0"
                  placeholder="Available quantity"
                  required
                  class="w-full px-4 py-2.5 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">Product Image *</label>
              <UploadImage 
                @image-uploaded="onImageUploaded"
                class="h-full min-h-[200px] bg-gray-700 rounded-lg border-2 border-dashed border-gray-600 hover:border-gray-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-1">Description *</label>
            <textarea
              v-model="form.description"
              placeholder="Enter detailed product description"
              rows="4"
              required
              class="w-full px-4 py-2.5 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>

          <div class="flex justify-end gap-3 pt-2">
            <button
              type="button"
              @click="$router.go(-1)"
              class="px-6 py-2.5 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="!form.imageUrl || isSubmitting"
              class="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
            >
              <svg v-if="isSubmitting" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isSubmitting ? 'Processing...' : 'Add Product' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import UploadImage from './UploadImage.vue';

export default {
  components: { UploadImage },
  data() {
    return {
      form: {
        name: '',
        stock: '',
        description: '',
        imageUrl: '',
      },
    };
  },
  methods: {
    onImageUploaded(url) {
      this.form.imageUrl = url;
    },
    async handleSubmit() {
      try {
        const res = await fetch('http://localhost:5000/api/products/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.form),
        });
        const data = await res.json();
        alert('Form submitted successfully!');
        
        this.$router.push('/');

        console.log(data);
      } catch (err) {
        console.error('Submit failed:', err);
      }
    },
  },
};
</script>
