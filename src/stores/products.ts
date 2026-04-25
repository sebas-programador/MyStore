import { defineStore } from "pinia";
import { ref} from 'vue'

import { api } from "@/services/api";
import { IProduct } from "@/interfaces/products";

export const useProductsStore = defineStore('products', () => {

    const products = ref<IProduct[]>([])
    const loading = ref(false)
    async function getProducts() {
        try {
            loading.value = true
            const response = await api('/products')
            console.log('response', response)

            if (response.status === 200) {
                products.value = response.data
                console.log('products: ', products.value)
            } else {
                products.value = []
            }
        } catch (error) {
            console.error('Error: ', error)
            products.value = []

        } finally {
            loading.value = false
        }
    }

    return {
        products,
        getProducts
    }
})