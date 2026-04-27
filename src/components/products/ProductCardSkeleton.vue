<template>
    <ion-grid>
        <ion-row>
            <ion-col size="6" v-for="i in 8" :key="i">
                <ion-card class="product">
                    <ion-skeleton-text animated style="width: 100%; height: 200px;" />

                    <ion-card-header>
                        <ion-skeleton-text animated style="width: 80%" />
                    </ion-card-header>

                    <ion-card-content>
                        <ion-skeleton-text animated style="width: 40%" />
                    </ion-card-content>
                </ion-card>
            </ion-col>
        </ion-row>  
    </ion-grid>
</template>

<script setup lang="ts">
import { IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent, IonSkeletonText } from '@ionic/vue';
</script>

<style>
.product{
    margin: 4px;
}
</style>