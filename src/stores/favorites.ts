import { defineStore } from "pinia";
import { ref} from 'vue'

import { IProduct } from "@/interfaces/products";
import storage from "@/services/storage";

export const useFavoritesStore = defineStore('favorites', () => {
    const STORAGE_KEY = 'favorites'
    const favoriteProducts = ref<IProduct[]>([])
    const page = ref(1)
    const rowsPerPage = ref(6)
    const limit = ref(0)

    async function loadFavorites() {
        const data = await storage.get(STORAGE_KEY)
        favoriteProducts.value = data || []
    }

    async function saveFavorites() {
        const serializerData = JSON.parse(JSON.stringify(favoriteProducts.value))
        await storage.set(STORAGE_KEY, serializerData)
    }

    async function addProductToFavorites(product: IProduct) {
        const existsFavorite = isFavorite(product.id)
        if(!existsFavorite) {
            favoriteProducts.value.push(product)
            await saveFavorites()
        }
    }

    async function removeFavorite(id: number) {
      favoriteProducts.value = favoriteProducts.value.filter(favoriteProduct => favoriteProduct.id !== id)
      await saveFavorites()
    }

    function isFavorite(id: number) {
      return favoriteProducts.value.some(favoriteProduct => favoriteProduct.id === id)
    }

    async function cleanFavoriteProducts() {
        favoriteProducts.value = [] 
        await saveFavorites()
    }

    return {
        favoriteProducts,
        page,
        rowsPerPage,
        limit,
        loadFavorites,
        saveFavorites,
        addProductToFavorites,
        removeFavorite,
        isFavorite,
        cleanFavoriteProducts,
    }
})