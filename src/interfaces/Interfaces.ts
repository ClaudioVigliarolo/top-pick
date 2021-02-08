export interface Topic {
    title: string;
  }

export  interface Category {
    title: string;
    counter: number;
  }

 export interface Question {
    id: number;
    title: string;
    selected: boolean;
    liked: boolean;
  }

  
  export enum Lang {
    italian = 'IT',
    english = 'EN',
  }

