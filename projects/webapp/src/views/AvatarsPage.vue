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
        </ion-toolbar>
      </ion-header>

      <div id="container" class="ion-padding">
        <h2>Org Chart</h2>
        <div>
          <ion-card style="min-width: 350px">
            <ion-card-header>
              <ion-card-subtitle color="secondary">
                {{ orgChart.position }}
              </ion-card-subtitle>
              <ion-card-title color="primary">
                {{ orgChart.name }}
              </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <div class="clearfix">
                <div><component v-bind:is="orgChart.component"></component></div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pulvinar, diam sed vulputate ullamcorper, metus.
                </p>
              </div>
              <ion-list>
                <ion-item>
                  <ion-label>Business Expertise</ion-label>
                  <ion-badge slot="end">{{ orgChart.expertise.business }}</ion-badge>
                </ion-item>
                <ion-item>
                  <ion-label>People Expertise</ion-label>
                  <ion-badge slot="end">{{ orgChart.expertise.people }}</ion-badge>
                </ion-item>
                <ion-item>
                  <ion-label>Process Expertise</ion-label>
                  <ion-badge slot="end">{{ orgChart.expertise.process }}</ion-badge>
                </ion-item>
                <ion-item>
                  <ion-label>Technology Expertise</ion-label>
                  <ion-badge slot="end">{{ orgChart.expertise.technology }}</ion-badge>
                </ion-item>
              </ion-list>
              <div>
                <ion-list>
                  <ion-item-group>
                    <ion-item-divider>
                      <ion-label color="secondary">
                        <strong>Direct Reports</strong>
                      </ion-label>
                    </ion-item-divider>
                    <ion-item v-for="associate in orgChart.directReports" :key="associate.id">
                      <ion-avatar slot="start">
                        <img :src="associate.avatarUrl">
                      </ion-avatar>
                      <ion-label>
                        <h3><ion-text color="primary">{{ associate.name }}</ion-text></h3>
                        <p><ion-text color="secondary">{{ associate.position }}</ion-text></p>
                      </ion-label>
                    </ion-item>
                  </ion-item-group>
                </ion-list>
              </div>
            </ion-card-content>
          </ion-card>
        </div>
        <div class="clearfix">
          <our-avatar v-for="avatar in avatars" :key="avatar.id" :avatar="avatar"></our-avatar>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonBadge,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/vue';

import { book, moon, sunnyOutline } from 'ionicons/icons';

import { defineComponent, ref } from 'vue';

import OurAvatar from '../components/OurAvatar.vue';

import { useThemeStore } from '../stores/themeStore';
import { useAvatarStore } from '../stores/avatarStore';

export default defineComponent({
  components: {
    IonBadge,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonItemDivider,
    IonItemGroup,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToggle,
    IonToolbar,
    OurAvatar,
  },
  setup() {
    const themeStore = useThemeStore();
    const avatarStore = useAvatarStore();

    let themeIcon = ref(sunnyOutline);

    document.body.classList.toggle('dark', themeStore.darkMode);

    return {
      orgChart: avatarStore.orgChart,
      avatars: avatarStore.avatars,
      icons: {
        book,
        theme: themeIcon,
      },
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
