export interface Topic {
    title: string;
    value: string;
  }

export  interface Category {
    title: string;
    value: string;
    counter: number;
  }

 export interface Question {
    id: number;
    title: string;
    selected: boolean;
    liked: boolean;
  }

  