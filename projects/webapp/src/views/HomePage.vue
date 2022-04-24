<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title><ion-icon :icon="icons.book"></ion-icon> Chomping at the Bit</ion-title>
        <ion-buttons slot="end">
          <ion-icon :icon="icons.theme.value"></ion-icon>
          <ion-toggle @ionChange="toggleTheme()"></ion-toggle>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large"><ion-icon :icon="icons.book"></ion-icon> Chomping at the Bit</ion-title>
          <ion-buttons slot="end">
          <ion-icon :icon="icons.theme.value"></ion-icon>
          <ion-toggle @ionChange="toggleTheme()"></ion-toggle>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <div id="container" class="ion-padding">
        <h1>Examples in Leadership</h1>
        <p>
          Across business and technology, executives, leaders, management, and individual
          contributors, are all challenged to integrate effective and efficient strategies
          across the areas of business value, people, processes, and / or technology. The
          features of this website serve as a companion to the <em>free and open book</em>
          &nbsp;<a href="./assets/book/chomping-at-the-bit.pdf" target="_blank">&quot;Chomping at the Bit&quot;</a>,
          offering functional and interactive examples to learn from and apply.
        </p>

        <swiper
          :slides-per-view="1"
          :space-between="15"
          :keyboard="{
            enabled: true,
          }"
          :pagination="{
            clickable: true,
          }"
          :navigation="true"
          :modules="modules"
        >
          <swiper-slide>
            <our-values></our-values>
          </swiper-slide>
          <swiper-slide>
            <our-mission></our-mission>
          </swiper-slide>
          <swiper-slide>
            <our-vision></our-vision>
          </swiper-slide>
        </swiper>

        <div style="margin-top: 50px; text-align: center">
          <router-link to="avatars">Avatars Test Page</router-link>
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

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Keyboard, Pagination, Navigation } from "swiper";

import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import '@ionic/vue/css/ionic-swiper.css';

import { defineComponent, ref } from 'vue';

import { useThemeStore } from '../stores/themeStore';

import OurMission from '../components/OurMission.vue';
import OurValues from '../components/OurValues.vue';
import OurVision from '../components/OurVision.vue';

export default defineComponent({
  name: 'OurHomePage',
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToggle,
    IonToolbar,
    OurMission,
    OurValues,
    OurVision,
    Swiper,
    SwiperSlide,
  },
  setup() {
    const themeStore = useThemeStore();

    let themeIcon = ref(sunnyOutline);

    document.body.classList.toggle('dark', themeStore.darkMode);

    return {
      icons: {
        book,
        theme: themeIcon,
      },
      modules: [
        Keyboard,
        Pagination,
        Navigation,
      ],
      toggleTheme: () => {
        themeStore.darkMode = !themeStore.darkMode;
        themeIcon.value = themeStore.darkMode ? moon : sunnyOutline;
        document.body.classList.toggle('dark', themeStore.darkMode);
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
