<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>Our Vision</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <blockquote>
        "<strong>Open Source Leadership:</strong>
        applying the principles of open source culture to organizational leadership."
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
