<template>
    <ion-page>
        <TheHeader />

        <ion-content :fullscreen="true">
            <ion-grid v-if="!loading && products.length === 0">
                <ion-row>
                    <ion-col size="12">
                        <ion-text >
                            <h5>No hay productos</h5>
                        </ion-text>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <ion-grid v-if="!loading && products.length">
                <ion-row>
                    <ion-col
                        size="6"
                        v-for="product in products"
                        :key="product.id"
                    >
                        <ProductCard :product="product" />
                    </ion-col>
                </ion-row>
            </ion-grid>

            <ProductCardSkeleton v-if="loading" />

            <ion-infinite-scroll v-if="hideInfiniteScroll" @ionInfinite="loadMoreProducts">
                <ion-infinite-scroll-content loading-spinner="bubbles" loading-text="Cargando más productos..." />
            </ion-infinite-scroll>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonText, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/vue';
import { ref, computed, onMounted } from 'vue';

import { useProductsStore } from '@/stores/products';
import TheHeader from '@/components/TheHeader.vue';
import ProductCard from '@/components/products/ProductCard.vue';
import ProductCardSkeleton from '@/components/products/ProductCardSkeleton.vue';

const productsStore = useProductsStore()
const loading = ref(true)

onMounted(() => {
    productsStore.getProducts()
    setTimeout(() => {
        loading.value = false
    }, 1000);
})

const products = computed(() => {
  return productsStore.products.slice(0, productsStore.page * productsStore.rowsPerPage)
})

function loadMoreProducts(event: any) {
    setTimeout(() => {
        productsStore.page++
        event.target.complete()
    }, 1000);
}

const hideInfiniteScroll = computed(() => {
    if(productsStore.page <= productsStore.limit && products.value.length) {
        return true
    }
    return false
})
</script>
