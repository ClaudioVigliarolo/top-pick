export interface Topic {
    title: string;
    source: string;
  }

export interface Category {
    title: string;
    counter:number;
  }
  
  //counter: number;
  export interface CategoryTopic {
    category: string;
    topic: number;
  }

  export interface Related {
    title: string;
    related: string;
  }

 export interface Question {
    id:number,  
    title: string;
    related?: string;
    topic?:string,
    liked?:boolean;
    isUserModified?:boolean;
    selected?:boolean
  }

  
  export enum Lang {
    italian = 'IT',
    english = 'EN',
  }

  export interface JSONresponse{
    categories: Category[],
    topics:Topic[],
    category_topics:CategoryTopic[],
    related:[],
    questions:Question[],
    isUpdated:boolean
  
  };


  export interface Report {
    id: number;
    topic:string;
    reason:string;
  }

  