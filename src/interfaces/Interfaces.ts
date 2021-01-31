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

  
  export enum Lang {
    italian = 'IT',
    english = 'EN',
  }


export interface Topics{
    computers : string;
    easter : string; 
    disabilities: string; 
    comics: string; 
    change: string; 
    chores: string; 
    airplanes: string;
    cheating: string; 
    clothes: string; 
    creativity: string; 
    drugs: string; 
    art: string;
    celebrities: string; 
    death: string; 
    childhood: string; 
    education: string; 
    entertainment: string; 
    business: string; 
    body_language: string;   
    adoption: string; 
    birthdays: string; 
    advice: string;
    conflict: string;
    diet: string; 
    books: string; 
    basketball: string;
    complaining: string;
    beauty: string;
    arguing: string;
    facebook: string;
    wishes: string;
    cities: string; 
    colors: string;
    animals: string;
    disaster: string;
    anger: string;
    corruption: string;
    cars: string;
    advertising: string;
    environment: string; 
    beach: string; 
    dreams: string; 
    behaviour: string; 
    countries: string; 
    crime: string; 
    bags: string; 
    dating: string; 
    community: string; 
    children: string; 
    charity: string; 
    earthquakes: string; 
    culture: string; 
    dangers: string; 
    conversation: string; 
    aging: string;  
   };