import { createRouter, createWebHistory } from 'vue-router'
import Inventory from '../components/inventory/Inventory.vue'
import ProductForm from '../components/product_registeration/ProductForm.vue'
import Analysis from '../components/analysis/Analysis.vue'

const routes = [
  { path: '/', component: Inventory },
  { path: '/add_product', component: ProductForm },
  { path: '/analysis', component: Analysis }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
