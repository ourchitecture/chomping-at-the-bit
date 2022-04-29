import { defineStore } from 'pinia';

export const useThemeStore = defineStore('ThemeStore', {
  state: () => {
    return {
      darkMode: true,
    };
  },
});
