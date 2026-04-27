<template>
    <ion-page>
        <TheHeader />

        <ion-content :fullscreen="true">
            <ion-grid>
                <ion-row>
                     <ion-col size="2">
                        <ion-button fill="outline" shape="round"  router-link="/productos" router-direction="back">
                            <ion-icon slot="icon-only" :icon="arrowBackOutline"></ion-icon>
                        </ion-button>
                    </ion-col>

                    <ion-col size="10">
                        <ion-text >
                            <h5>Favoritos</h5>
                        </ion-text>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <ion-grid v-if="!loading && favoriteProducts.length === 0">
                <ion-row>
                    <ion-col size="12">
                        <ion-text >
                            <h5>No hay favoritos</h5>
                        </ion-text>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <ion-grid v-if="!loading && favoriteProducts.length">
                <ion-row>
                    <ion-col
                        size="6"
                        v-for="product in favoriteProducts"
                        :key="product.id"
                    >
                        <ProductCard :product="product" />
                    </ion-col>
                </ion-row>
            </ion-grid>

            <ProductCardSkeleton v-if="loading" />
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonText, IonIcon, IonButton } from '@ionic/vue';
import { arrowBackOutline } from 'ionicons/icons'
import { ref, computed, onMounted } from 'vue';

import { useFavoritesStore } from '@/stores/favorites';
import TheHeader from '@/components/TheHeader.vue';
import ProductCard from '@/components/products/ProductCard.vue';
import ProductCardSkeleton from '@/components/products/ProductCardSkeleton.vue';

const favoritesStore = useFavoritesStore()

const loading = ref(true)

onMounted(() => {
    setTimeout(() => {
        loading.value = false
    }, 1000);
})

const favoriteProducts = computed(() => {
  return favoritesStore.favoriteProducts
})
</script>
