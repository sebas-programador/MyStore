<template>
    <ion-card class="product" @click="goToDetail(props.product.id)">
        <img :src="props.product.image" :alt="props.product.title" class="product--image"/>

        <ion-card-header class="product__header">
            <ion-card-title class="product__header--title">{{ props.product.title }}</ion-card-title>
        </ion-card-header>

        <ion-card-content class="product__content">
            <p class="product__content--price">{{ formatCurrency(props.product.price) }}</p>
        </ion-card-content>
    </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';
import { useRouter } from 'vue-router';

import { useCurrency } from '@/composables/useCurrency'
import { IProduct } from '@/interfaces/products';

const router = useRouter()
const { formatCurrency } = useCurrency()

const props = withDefaults(defineProps<{product: IProduct}>(), {})

function goToDetail(id: number) {
    router.push(`/productos/${id}`)
}
</script>

<style>
.product{
    margin: 4px;
}

.product--image {
    width: 100%;
    height: 200px;
    object-fit: contain;
    padding: 10px;
}

.product__header {
    padding: 8px;
    white-space: nowrap;
    overflow: hidden;
}

.product__header--title {
    font-size: 14px;
    /* height: 40px; */
    overflow: hidden;
    text-overflow: ellipsis;
}

.product__content {
    padding: 0 8px 20px;
}

.product__content--price {
    font-weight: bold;
    font-size: 16px;
    color: var(--ion-color-primary);
}
</style>