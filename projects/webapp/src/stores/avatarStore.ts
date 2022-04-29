import { defineStore } from 'pinia';

import {
  genderMap,
  expertiseTitles,
  generateAvatarComponents,
  generateRandomEmployee,
  generateRandomName,
} from './avatars';

export { GenderEnum } from './avatars';

export const useAvatarStore = defineStore('AvatarStore', {
  state: () => {

    const avatars = generateAvatarComponents();

    return {
      // multiple genders are indeed recognized, however the avatars represent a "preference" too
      // setting this flag to `true` will ensure that ALL avatars are gender-neutral including
      // "non-traditional" names for what may appear to someone to be a male or female
      genderNeutral: false,
      genderMap,
      expertiseTitles,
      avatars,
    };
  },
  getters: {
    getRandomName: () => {
      return generateRandomName;
    },
    createRandomEmployee: (state) => {
      return () => generateRandomEmployee(state.avatars);
    }
  },
});
