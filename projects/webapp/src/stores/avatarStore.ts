import { defineStore } from 'pinia';

import {
  IOrgChartEmployee,
  genderMap,
  expertiseTitles,
  generateAvatarComponents,
  generateRandomEmployee,
} from './avatars';

export { GenderEnum } from './avatars';

export const useAvatarStore = defineStore('AvatarStore', {
  state: () => {

    const avatars = generateAvatarComponents();

    const randomEmployees: IOrgChartEmployee[] = [];

    while (randomEmployees.length < 6) {
      let randomEmployee = generateRandomEmployee(avatars);

      // avoid reusing an employee id (i.e. same avatar)
      while (randomEmployees.find((employee: IOrgChartEmployee) => employee.id == randomEmployee.id)) {
        randomEmployee = generateRandomEmployee(avatars);
      }

      randomEmployees.push(randomEmployee);
    }

    const orgChart = randomEmployees[0];

    const directReports = randomEmployees.slice(1);

    orgChart.directReports.push(...directReports);

    return {
      // multiple genders are indeed recognized, however the avatars represent a "preference" too
      // setting this flag to `true` will ensure that ALL avatars are gender-neutral including
      // "non-traditional" names for what may appear to someone to be a male or female
      genderNeutral: false,
      genderMap,
      expertiseTitles,
      avatars,
      orgChart,
    };
  },
});
