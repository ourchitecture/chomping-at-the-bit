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

      <div id="container" class="ion-padding clearfix">
        <ion-card v-for="avatar in avatars" :key="avatar.name">
          <ion-card-header>
            <ion-card-title>
              {{ avatar.name }}
            </ion-card-title>
            <ion-card-subtitle>
              {{ avatar.position }}
            </ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <div style="center"><component v-bind:is="avatar.component"></component></div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pulvinar, diam sed vulputate ullamcorper, metus.
            </p>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
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

import names from 'human-names';

import allAvatars from '../components/avatars';

export default defineComponent({
  components: {
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToggle,
    IonToolbar,
  },
  setup() {
    let themeIcon = ref(moon);
    let isDarkMode = true;

    document.body.classList.toggle('dark', isDarkMode);

    const positions = [
      'Business Capability Expert',
      'People Expert',
      'Process Expert',
      'Technology Expert',
    ];

    const avatars = allAvatars.map((avatar) => {
      const component = avatar.component;
      const givenName = names.allRandom();
      const surName = names.allRandom();
      const name = `${givenName} ${surName}`;

      const position = positions[Math.floor(Math.random() * positions.length)];

      return {
        name,
        position,
        component,
      };
    });

    return {
      avatars,
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
