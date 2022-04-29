import { Component } from 'vue';

import names from 'human-names';

import avatarComponents from '../components/avatars';

export const expertiseTitles = [
  'Business Capability Expert',
  'People Expert',
  'Process Expert',
  'Technology Expert',
];

export enum GenderEnum {
  male,
  female,
  other,
}

export interface IAvatar {
  id: string;
  name: string;
  gender: string;
  code: string;
  position: string;
  component: Component;
}

export interface IOrgChartEmployee {
  id: string;
  avatarUrl: string;
  component: Component;
  name: string;
  gender: string;
  title: string;
  directReports: IOrgChartEmployee[];
}

export const genderMap: {[key: string]: GenderEnum} = {
  'avatar-01-01': GenderEnum.male,
  'avatar-01-02': GenderEnum.female,
  'avatar-01-03': GenderEnum.male,
  'avatar-01-04': GenderEnum.female,
  'avatar-01-05': GenderEnum.male,
  'avatar-01-06': GenderEnum.other,
  'avatar-01-07': GenderEnum.female,
  'avatar-01-08': GenderEnum.female,
  'avatar-01-09': GenderEnum.female,
  'avatar-01-10': GenderEnum.male,
  'avatar-01-11': GenderEnum.male,
  'avatar-01-12': GenderEnum.male,
  'avatar-01-13': GenderEnum.female,
  'avatar-01-14': GenderEnum.female,
  'avatar-01-15': GenderEnum.female,
  'avatar-01-16': GenderEnum.female,
  'avatar-01-17': GenderEnum.female,
  'avatar-01-18': GenderEnum.female,
  'avatar-01-19': GenderEnum.male,
  'avatar-01-20': GenderEnum.male,
  'avatar-01-21': GenderEnum.other,
  'avatar-01-22': GenderEnum.other,
  'avatar-01-23': GenderEnum.male,
  'avatar-01-24': GenderEnum.female,
  'avatar-01-25': GenderEnum.other,
  'avatar-01-26': GenderEnum.male,
  'avatar-01-27': GenderEnum.other,
  'avatar-01-28': GenderEnum.other,
  'avatar-01-29': GenderEnum.male,
  'avatar-01-30': GenderEnum.other,
  'avatar-01-31': GenderEnum.female,
  'avatar-01-32': GenderEnum.female,
  'avatar-01-33': GenderEnum.female,
  'avatar-01-34': GenderEnum.female,
  'avatar-01-35': GenderEnum.female,
  'avatar-01-36': GenderEnum.female,
  'avatar-01-37': GenderEnum.female,
  // 'avatar-01-38' n/a
  'avatar-01-39': GenderEnum.female,
  'avatar-02-01': GenderEnum.male,
  'avatar-02-02': GenderEnum.female,
  'avatar-02-03': GenderEnum.female,
  'avatar-02-04': GenderEnum.other,
  'avatar-02-05': GenderEnum.female,
  'avatar-02-06': GenderEnum.other,
  'avatar-02-07': GenderEnum.female,
  'avatar-02-08': GenderEnum.female,
  'avatar-02-09': GenderEnum.female,
  'avatar-02-10': GenderEnum.male,
  'avatar-02-11': GenderEnum.female,
  'avatar-02-12': GenderEnum.male,
  'avatar-02-13': GenderEnum.other,
  'avatar-02-14': GenderEnum.male,
  'avatar-02-15': GenderEnum.male,
  'avatar-02-16': GenderEnum.female,
  'avatar-02-17': GenderEnum.female,
  // TODO: 'avatar-02-18': GenderEnum.other, ?? MISSING
  'avatar-02-19': GenderEnum.female,
  'avatar-02-20': GenderEnum.female,
  'avatar-02-21': GenderEnum.male,
  'avatar-02-22': GenderEnum.female,
  'avatar-02-23': GenderEnum.female,
  'avatar-02-24': GenderEnum.female,
  'avatar-02-25': GenderEnum.female,
  'avatar-02-26': GenderEnum.female,
  'avatar-02-27': GenderEnum.female,
  'avatar-02-28': GenderEnum.male,
  'avatar-02-29': GenderEnum.male,
  'avatar-02-30': GenderEnum.male,
  'avatar-02-31': GenderEnum.male,
  'avatar-02-32': GenderEnum.other,
  'avatar-02-33': GenderEnum.female,
  'avatar-02-34': GenderEnum.female,
  'avatar-02-35': GenderEnum.female,
  'avatar-02-36': GenderEnum.female,
  'avatar-02-37': GenderEnum.other,
  // 'avatar-02-38' n/a
  'avatar-02-39': GenderEnum.other,
};

export function generateRandomName(gender: GenderEnum): string {
  switch (gender) {
    case GenderEnum.male:
      return names.maleRandom();
    case GenderEnum.female:
      return names.femaleRandom();
    default:
      return names.allRandom();
  }
}

export function generateAvatarComponents() {

  const avatars = avatarComponents.map((avatar) => {
    const component = avatar.component;
    const mappedGender = genderMap[avatar.code];
    const gender = mappedGender >= 0 ? mappedGender : GenderEnum.other;
    const givenName = generateRandomName(gender);
    const surName = generateRandomName(gender);
    const name = `${givenName} ${surName}`;

    const position = expertiseTitles[Math.floor(Math.random() * expertiseTitles.length)];

    return {
      id: `employee${avatar.code}`,
      name,
      gender: GenderEnum[gender],
      code: avatar.code,
      position,
      component,
    };
  });

  return avatars;
}

export function generateRandomEmployee(avatars: IAvatar[]): IOrgChartEmployee {
  const avatarIx = Math.floor(Math.random() * avatars.length);

  const randomAvatar = avatars[avatarIx];
  const directReports : IOrgChartEmployee[] = [];

  return {
    id: randomAvatar.id,
    avatarUrl: `assets/avatars/${randomAvatar.code}_256h.png`,
    component: randomAvatar.component,
    name: randomAvatar.name,
    gender: randomAvatar.gender,
    title: randomAvatar.position,
    directReports,
  };
}
