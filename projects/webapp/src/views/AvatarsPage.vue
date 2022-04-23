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
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-card>
                <ion-card-header>
                  <ion-card-title>{{ avatar0101 }}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <our-avatar-01-01></our-avatar-01-01>
                </ion-card-content>
              </ion-card>
            </ion-col>
            <ion-col>
              <ion-card>
                <ion-card-header>
                  <ion-card-title>{{ avatar0102 }}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <our-avatar-01-02></our-avatar-01-02>
                </ion-card-content>
              </ion-card>
            </ion-col>
            <ion-col>
              <ion-card>
                <ion-card-header>
                  <ion-card-title>{{ avatar0103 }}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <our-avatar-01-03></our-avatar-01-03>
                </ion-card-content>
              </ion-card>
            </ion-col>
            <ion-col>
              <ion-card>
                <ion-card-header>
                  <ion-card-title>{{ avatar0104 }}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <our-avatar-01-04></our-avatar-01-04>
                </ion-card-content>
              </ion-card>
            </ion-col>
            <ion-col>
              <ion-card>
                <ion-card-header>
                  <ion-card-title>{{ avatar0105 }}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <our-avatar-01-05></our-avatar-01-05>
                </ion-card-content>
              </ion-card>
            </ion-col>
            <ion-col>
              <ion-card>
                <ion-card-header>
                  <ion-card-title>{{ avatar0106 }}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <our-avatar-01-06></our-avatar-01-06>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-card>
                <ion-card-header>
                  <ion-card-title>{{ avatar0201 }}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <our-avatar-02-01></our-avatar-02-01>
                </ion-card-content>
              </ion-card>
            </ion-col>
            <ion-col>
              <ion-card>
                <ion-card-header>
                  <ion-card-title>{{ avatar0202 }}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <our-avatar-02-02></our-avatar-02-02>
                </ion-card-content>
              </ion-card>
            </ion-col>
            <ion-col>
              <ion-card>
                <ion-card-header>
                  <ion-card-title>{{ avatar0203 }}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <our-avatar-02-03></our-avatar-02-03>
                </ion-card-content>
              </ion-card>
            </ion-col>
            <ion-col>
              <ion-card>
                <ion-card-header>
                  <ion-card-title>{{ avatar0204 }}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <our-avatar-02-04></our-avatar-02-04>
                </ion-card-content>
              </ion-card>
            </ion-col>
            <ion-col>
              <ion-card>
                <ion-card-header>
                  <ion-card-title>{{ avatar0205 }}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <our-avatar-02-05></our-avatar-02-05>
                </ion-card-content>
              </ion-card>
            </ion-col>
            <ion-col>
              <ion-card>
                <ion-card-header>
                  <ion-card-title>{{ avatar0206 }}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                  <our-avatar-02-06></our-avatar-02-06>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
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

import OurAvatar0101 from '../components/avatars/avatar-01-01.vue';
import OurAvatar0102 from '../components/avatars/avatar-01-02.vue';
import OurAvatar0103 from '../components/avatars/avatar-01-03.vue';
import OurAvatar0104 from '../components/avatars/avatar-01-04.vue';
import OurAvatar0105 from '../components/avatars/avatar-01-05.vue';
import OurAvatar0106 from '../components/avatars/avatar-01-06.vue';
import OurAvatar0201 from '../components/avatars/avatar-02-01.vue';
import OurAvatar0202 from '../components/avatars/avatar-02-02.vue';
import OurAvatar0203 from '../components/avatars/avatar-02-03.vue';
import OurAvatar0204 from '../components/avatars/avatar-02-04.vue';
import OurAvatar0205 from '../components/avatars/avatar-02-05.vue';
import OurAvatar0206 from '../components/avatars/avatar-02-06.vue';

export default defineComponent({
  name: 'OurAvatarsPage',
  components: {
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
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
    OurAvatar0204,
    OurAvatar0205,
    OurAvatar0206,
  },
  setup() {

    let themeIcon = ref(sunnyOutline);
    let isDarkMode = false;

    return {
      avatar0101: `${names.allRandom()} ${names.allRandom()}`,
      avatar0102: `${names.allRandom()} ${names.allRandom()}`,
      avatar0103: `${names.allRandom()} ${names.allRandom()}`,
      avatar0104: `${names.allRandom()} ${names.allRandom()}`,
      avatar0105: `${names.allRandom()} ${names.allRandom()}`,
      avatar0106: `${names.allRandom()} ${names.allRandom()}`,
      avatar0201: `${names.allRandom()} ${names.allRandom()}`,
      avatar0202: `${names.allRandom()} ${names.allRandom()}`,
      avatar0203: `${names.allRandom()} ${names.allRandom()}`,
      avatar0204: `${names.allRandom()} ${names.allRandom()}`,
      avatar0205: `${names.allRandom()} ${names.allRandom()}`,
      avatar0206: `${names.allRandom()} ${names.allRandom()}`,
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
