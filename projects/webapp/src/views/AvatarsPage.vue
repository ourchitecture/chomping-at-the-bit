<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Avatars</ion-title>
        <ion-buttons slot="end">
          <ion-icon :icon="icons.theme.value"></ion-icon>
          <ion-toggle @ionChange="toggleTheme()"></ion-toggle>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Avatars</ion-title>
          <ion-buttons slot="end">
          <ion-icon :icon="icons.theme.value"></ion-icon>
          <ion-toggle @ionChange="toggleTheme()"></ion-toggle>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <div id="container" class="ion-padding">
        <div style="text-align: center">
          <our-avatar-01-01></our-avatar-01-01>
          <our-avatar-01-02></our-avatar-01-02>
          <our-avatar-01-03></our-avatar-01-03>
          <our-avatar-01-04></our-avatar-01-04>
          <our-avatar-01-05></our-avatar-01-05>
          <our-avatar-01-06></our-avatar-01-06>
          <our-avatar-02-01></our-avatar-02-01>
          <our-avatar-02-02></our-avatar-02-02>
          <our-avatar-02-03></our-avatar-02-03>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/vue';

import { book, moon, sunnyOutline } from 'ionicons/icons';

import { defineComponent, ref } from 'vue';

import OurAvatar0101 from '../components/avatars/avatar-01-01.vue';
import OurAvatar0102 from '../components/avatars/avatar-01-02.vue';
import OurAvatar0103 from '../components/avatars/avatar-01-03.vue';
import OurAvatar0104 from '../components/avatars/avatar-01-04.vue';
import OurAvatar0105 from '../components/avatars/avatar-01-05.vue';
import OurAvatar0106 from '../components/avatars/avatar-01-06.vue';
import OurAvatar0201 from '../components/avatars/avatar-02-01.vue';
import OurAvatar0202 from '../components/avatars/avatar-02-02.vue';
import OurAvatar0203 from '../components/avatars/avatar-02-03.vue';

export default defineComponent({
  name: 'OurAvatarsPage',
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToggle,
    IonToolbar,
    OurAvatar0101,
    OurAvatar0102,
    OurAvatar0103,
    OurAvatar0104,
    OurAvatar0105,
    OurAvatar0106,
    OurAvatar0201,
    OurAvatar0202,
    OurAvatar0203,
  },
  setup() {

    let themeIcon = ref(sunnyOutline);
    let isDarkMode = false;

    return {
      icons: {
        book,
        theme: themeIcon,
      },
      toggleTheme: () => {
        isDarkMode = !isDarkMode;
        themeIcon.value = isDarkMode ? moon : sunnyOutline;
        document.body.classList.toggle('dark', isDarkMode);
      },
    };
  },
});
</script>

<style scoped>
.swiper-slide {
  height: auto;
  margin: auto;
}

ion-card {
  height: 100%;
  max-width: 650px;
}

.our-avatar {
  max-height: 150px;
}
</style>
