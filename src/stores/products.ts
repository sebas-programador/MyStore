import { defineStore } from "pinia";
import { ref} from 'vue'

import { api } from "@/services/api";
import { IProduct } from "@/interfaces/products";
import { MProduct } from "@/modes/products";

export const useProductsStore = defineStore('products', () => {

    const products = ref<IProduct[]>([])
    const page = ref(1)
    const rowsPerPage = ref(6)
    const limit = ref(0)
    async function getProducts() {
        try {
            const response = await api('/products')

            if (response.status !== 200) {
                products.value = []
                return
            }

            products.value = response.data
            limit.value = products.value.length / rowsPerPage.value
        } catch (error) {
            console.error('Error: ', error)
            products.value = []
        }
    }

    const product = ref<IProduct>({...MProduct})
    async function getProductDetail(id: number) {
        try {
            const response = await api(`/products/${id}`)

            if (response.status !== 200) {
                product.value = {...MProduct}
                return
            } 

            product.value = response.data
        } catch (error) {
            console.error('Error: ', error)
            product.value = {...MProduct}
        }
    }

    function cleanProduct() {
        product.value = {...MProduct}
    }

    const favoriteProducts = ref<IProduct[]>([])
    function addProductToFavorites(product: IProduct) {
        favoriteProducts.value.push(product)
    }

    function cleanFavoriteProducts() {
        favoriteProducts.value = [] 
    }

    return {
        products,
        page,
        rowsPerPage,
        limit,
        getProducts,

        product,
        getProductDetail,
        cleanProduct,

        favoriteProducts,
        addProductToFavorites,
        cleanFavoriteProducts,
    }
})