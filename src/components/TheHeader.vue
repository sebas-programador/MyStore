<template>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button shape="round" router-link="/favoritos" >
            <ion-icon slot="icon-only" :icon="heartOutline"></ion-icon>
          </ion-button>
         </ion-buttons>
      </ion-toolbar>
    </ion-header>
</template>

<script setup lang="ts">
import { IonHeader, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/vue';
import {heartOutline} from 'ionicons/icons'
</script>
