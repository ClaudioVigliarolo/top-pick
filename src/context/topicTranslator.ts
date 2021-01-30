
export enum Lang {
    italian = 'IT',
    english = 'EN',
  }


interface Topics{
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


const italianTopics:Topics={
        computers : "computers",
        easter : "pasqua",
        disabilities: "disabilità",
        comics: "comics",
        change: "cambiamento",
        chores: "faccende domestiche",
        airplanes:"aereo",
        cheating:"imbrogli",
        clothes:"vestiti",
        creativity:"creatività",
        drugs:"droghe",
        art:"arte",
        celebrities:"celebrità",
        death:"morte",
        childhood:"infanzia",
        education:"educazione",
        entertainment:"intrattenimento",
        business:"business",
        body_language:"linguaggio del corpo",
        adoption:"adozioni",
        birthdays:"compleanni",
        advice:"consigli",
        conflict:"conflitti",
        diet:"diete",
        books:"libri",
        basketball:"pallacanestro",
        complaining:"lamentarsi",
        beauty:"bellezza",
        arguing:"litigi",
        facebook:"facebook",
        wishes:"desideri",
        cities:"città",
        colors:"colori",
        animals:"animali",
        disaster:"disastri",
        anger:"rabbia",
        corruption:"corruzzione",
        cars:"automobili",
        advertising:"pubblicità",
        environment:"ambiente",
        beach:"spiaggia",
        dreams:"sogni",
        behaviour:"comportamento",
        countries:"paesi",
        crime:"criminalità",
        bags:"borse",
        dating:"dating",
        community:"comunità",
        children:"bambini",
        charity:"beneficienza",
        earthquakes:"terremoti", 
        culture:"culture",
        dangers:"pericoli",
        conversation:"conversazioni",
        aging:"invecchiare",
  } 



const englishTopics:Topics={
    computers : "computers",
    easter : "easter",
    disabilities: "disabilities",
    comics: "comics",
    change: "change",
    chores: "chores",
    airplanes:"airplanes",
    cheating:"cheating",
    clothes:"clothes",
    creativity:"creativity",
    drugs:"drugs",
    art:"art",
    celebrities:"celebrities",
    death:"death",
    childhood:"childhood",
    education:"education",
    entertainment:"entertainment",
    business:"business",
    body_language:"body language",
    adoption:"adoption",
    birthdays:"birthdays",
    advice:"advice",
    conflict:"conflict",
    diet:"diet",
    books:"books",
    basketball:"basketball",
    complaining:"complaining",
    beauty:"beauty",
    arguing:"arguing",
    facebook:"facebook",
    wishes:"wishes",
    cities:"cities",
    colors:"colors",
    animals:"animals",
    disaster:"disaster",
    anger:"anger",
    corruption:"corruption",
    cars:"cars",
    advertising:"advertising",
    environment:"environment",
    beach:"beach",
    dreams:"dreams",
    behaviour:"behaviour",
    countries:"countries",
    crime:"crime",
    bags:"bags",
    dating:"dating",
    community:"community",
    children:"children",
    charity:"charity",
    earthquakes:"earthquakes", 
    culture:"culture",
    dangers:"dangers",
    conversation:"conversation",
    aging:"aging",
} 

  export const getTranslatedTopic=<Topic extends keyof Topics>(topic:Topic, language: string): string=>
  {
     switch (language) {
         case Lang.italian:
             return italianTopics[topic]?italianTopics[topic]: topic;
             
        case Lang.english:
        return englishTopics[topic]?englishTopics[topic]: topic;
                
         default:
             return  englishTopics[topic]?englishTopics[topic]: topic;
     }
   };
   