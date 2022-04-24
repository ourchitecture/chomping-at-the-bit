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
          <ion-card>
            <ion-card-header>
              <ion-card-title color="primary">
                {{ orgChart.name }}
              </ion-card-title>
              <ion-card-subtitle>
                {{ orgChart.title }}
              </ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <div class="clearfix">
                <div><component v-bind:is="orgChart.component"></component></div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pulvinar, diam sed vulputate ullamcorper, metus.
                </p>
              </div>
              <div>
                <ion-list>
                  <ion-item-group>
                    <ion-item-divider>
                      <ion-label color="secondary">
                        <strong>Direct Reports</strong>
                      </ion-label>
                    </ion-item-divider>
                    <ion-item v-for="associate in orgChart.directReports" :key="associate.employeeId">
                      <ion-avatar slot="start">
                        <img :src="associate.avatarUrl">
                      </ion-avatar>
                      <ion-label>
                        <h3>{{ associate.name }}</h3>
                        <p>{{ associate.title }}</p>
                      </ion-label>
                    </ion-item>
                  </ion-item-group>
                </ion-list>
              </div>
            </ion-card-content>
          </ion-card>
        </div>
        <div class="clearfix">
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

import { defineComponent, ref, Component } from 'vue';

import names from 'human-names';

import { useThemeStore } from '../stores/themeStore';

import allAvatars from '../components/avatars';

interface OrgChartEmployee {
  id: string;
  avatarUrl: string;
  component: Component;
  name: string;
  title: string;
  directReports: OrgChartEmployee[];
}

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
    IonItem,
    IonItemDivider,
    IonItemGroup,
    IonLabel,
    IonList,
    IonPage,
    IonTitle,
    IonToggle,
    IonToolbar,
  },
  setup() {
    const themeStore = useThemeStore();

    let themeIcon = ref(sunnyOutline);

    document.body.classList.toggle('dark', themeStore.darkMode);

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
        code: avatar.code,
        position,
        component,
      };
    });

    const selectedAvatarIndexes: number[] = [];

    function createRandomEmployee(): OrgChartEmployee {
      let avatarIx = Math.floor(Math.random() * avatars.length);

      // search for unused avatar indexes
      while (selectedAvatarIndexes.indexOf(avatarIx) >= 0) {
        avatarIx = Math.floor(Math.random() * avatars.length);
      }

      selectedAvatarIndexes.push(avatarIx);

      const randomAvatar = avatars[avatarIx];
      const directReports : OrgChartEmployee[] = [];

      return {
        id: `employee${avatarIx}`,
        avatarUrl: `assets/avatars/${randomAvatar.code}_256h.png`,
        component: randomAvatar.component,
        name: randomAvatar.name,
        title: randomAvatar.position,
        directReports,
      };
    }

    const orgChart = createRandomEmployee();

    const directReports = [
      createRandomEmployee(),
      createRandomEmployee(),
      createRandomEmployee(),
      createRandomEmployee(),
      createRandomEmployee(),
    ];

    orgChart.directReports.push(...directReports);

    return {
      orgChart,
      avatars,
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
