<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
  },
  setup() {
    // Add or remove the "dark" class based on if the media query matches
    const toggleDarkTheme = (shouldAdd: boolean) => {
      console.log('App dark mode', shouldAdd);
      document.body.classList.toggle('dark', false);
      document.body.classList.toggle('light', true);
      console.log('classList', document.body.classList);
    };

    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    toggleDarkTheme(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));

    toggleDarkTheme(false);
  },
});
</script>
