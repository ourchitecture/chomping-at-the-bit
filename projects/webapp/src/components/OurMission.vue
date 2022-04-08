<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Our Mission</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <blockquote>
        "Inspiring <strong>all levels of organizational leadership</strong> through open
        collaboration and shared contribution."
      </blockquote>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/vue';

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'OurHomePage',
  components: {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
  },
});
</script>

<style scoped>
ion-card-title {
  font-size: 1.8em;
}

blockquote {
  font-size: 1.5em;
}
</style>
