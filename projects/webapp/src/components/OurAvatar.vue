<template>
  <ion-card>
    <ion-card-header>
      <ion-card-subtitle color="secondary">
        {{ avatar.position }}
      </ion-card-subtitle>
      <ion-card-title color="primary">
        {{ avatar.name }}
      </ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <div class="clearfix">
        <div><component v-bind:is="avatar.component"></component></div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pulvinar, diam sed vulputate ullamcorper, metus.
        </p>
      </div>
      <ion-list>
        <ion-item>
          <ion-label>Business Expertise</ion-label>
          <ion-badge slot="end">{{ avatar.expertise.business }}</ion-badge>
        </ion-item>
        <ion-item>
          <ion-label>People Expertise</ion-label>
          <ion-badge slot="end">{{ avatar.expertise.people }}</ion-badge>
        </ion-item>
        <ion-item>
          <ion-label>Process Expertise</ion-label>
          <ion-badge slot="end">{{ avatar.expertise.process }}</ion-badge>
        </ion-item>
        <ion-item>
          <ion-label>Technology Expertise</ion-label>
          <ion-badge slot="end">{{ avatar.expertise.technology }}</ion-badge>
        </ion-item>
      </ion-list>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import {
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/vue';

import { defineComponent } from 'vue';

export default defineComponent({
  props: ['avatar'],
  components: {
    IonBadge,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonItem,
    IonLabel,
    IonList,
  },
});
</script>

<style scoped>
ion-card {
  display: inline-block;
  flex-wrap: wrap;
  height: 100%;
  width: 300px;
}

.our-avatar {
  max-height: 150px;
  float: left;
  padding-right: 15px;
  padding-bottom: 15px;
}

.clearfix::after {
  display: block;
  clear: both;
  content: "";
}
</style>
