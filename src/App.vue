<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { onMounted } from 'vue';

import { useFavoritesStore } from './stores/favorites';

const favoritesStore = useFavoritesStore()

onMounted(() => {
  favoritesStore.loadFavorites()
})
</script>
