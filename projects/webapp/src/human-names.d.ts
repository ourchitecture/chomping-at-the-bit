declare module 'human-names' {
  export function isPersonName(name: string): boolean;
  export function allRandom(): string;
  export function femaleRandom(): string;
  export function maleRandom(): string;
  export function all(): string[];
  export function male(): string[];
  export function female(): string[];
}
