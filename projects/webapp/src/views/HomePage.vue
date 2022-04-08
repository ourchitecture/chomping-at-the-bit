<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Chomping at the Bit</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Chomping at the Bit</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container" class="ion-padding">
        <h1>Examples in Leadership</h1>
        <p>
          Across business and technology, executives, leaders, management, and individual
          contributors, are all challenged to integrate effective and efficient strategies
          across the areas of business value, people, processes, and / or technology. The
          features of this website serve as a companion to the free and open book
          <a href="/assets/book/chomping-at-the-bit.pdf" target="_blank">&quot;Chomping at the Bit&quot;</a>,
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
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Keyboard, Pagination, Navigation } from "swiper";

import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import '@ionic/vue/css/ionic-swiper.css';

import { defineComponent } from 'vue';

import OurMission from '../components/OurMission.vue';
import OurValues from '../components/OurValues.vue';
import OurVision from '../components/OurVision.vue';

export default defineComponent({
  name: 'OurHomePage',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    OurMission,
    OurValues,
    OurVision,
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [
        Keyboard,
        Pagination,
        Navigation,
      ],
    };
  },
});
</script>

<style scoped>
.swiper-slide {
  height: auto;
}

ion-card {
  height: 100%;
  max-width: 650px;
}
</style>
