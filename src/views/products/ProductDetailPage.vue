<template>
    <ion-page>
        <TheHeader />

        <ion-content :fullscreen="true" v-if="product.id">
            <ion-grid>
                <ion-row>
                    <ion-col size="12">
                        <ion-button fill="outline" shape="round"  router-link="/productos" router-direction="back">
                            <ion-icon slot="icon-only" :icon="arrowBackOutline"></ion-icon>
                        </ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <ion-grid fixed>
                <img :src="product.image" :alt="product.title" class="detail-image">
                <ion-row class="ion-align-items-center">
                    <ion-col size="10">
                        <ion-text >
                            <h5>
                                {{ product.title }}
                            </h5>
                        </ion-text>
                    </ion-col>

                    <ion-col size="2" class="ion-text-center">
                        <ion-button fill="clear" shape="round" @click="handleAddProductToFavorites">
                            <ion-icon slot="icon-only" size="large" :icon="heartOutline"></ion-icon>
                        </ion-button>
                    </ion-col>
                </ion-row>

                <ion-row>
                    <ion-col size="12">
                        <p class="price">{{ formatCurrency(product.price) }}</p>
                    </ion-col>
                </ion-row>

                <ion-row>
                    <ion-col size="12">
                        <p>{{ product.description }}</p>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <ion-toast
                :is-open="isOpen"
                message="Producto agregado a favoritos"
                :duration="5000"
                @didDismiss="setOpen(false)"
            ></ion-toast>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonGrid, IonRow, IonCol, IonContent, IonButton, IonIcon, IonText, IonToast } from '@ionic/vue'
import {arrowBackOutline, heartOutline} from 'ionicons/icons'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

import { useProductsStore } from '@/stores/products'
import TheHeader from '@/components/TheHeader.vue'
import { useCurrency } from '@/composables/useCurrency'

const route = useRoute()
const productsStore = useProductsStore()
const { formatCurrency } = useCurrency()
const isOpen = ref(false);

const product = computed(() => {
    return productsStore.product
})

onMounted(() => {
    const { id } = route.params
    productsStore.getProductDetail(Number(id))
})

onUnmounted(() => {
    productsStore.cleanProduct()
})

function handleAddProductToFavorites() {
    productsStore.addProductToFavorites(product.value)
    setOpen(true)
}

 const setOpen = (state: boolean) => {
    isOpen.value = state
  }
</script>

<style>
ion-grid {
    padding: 0px 15px;
}
.detail-image {
    width: 100%;
    max-height: 450px;
    object-fit: contain;
    padding: 10px;
}

.price {
    font-weight: bold;
    font-size: 32px;
    color: var(--ion-color-primary);
    margin: 0px 0px 8px;
}
</style>