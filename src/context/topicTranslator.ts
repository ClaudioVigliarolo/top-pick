
import { Lang} from '../interfaces/Interfaces';

interface Topics {
    [name: string]: string
}

    const italianTopics:Topics={
        computers : "computer",
        easter : "pasqua",
        disabilities: "disabilità",
        comics: "comics",
        change: "cambiamenti",
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
        corruption:"corruzione",
        cars:"automobili",
        advertising:"pubblicità",
        environment:"ambiente",
        beach:"spiaggia",
        dreams:"sogni",
        behaviour:"comportamento",
        countries:"paesi",
        crime:"criminalità",
        bags:"borse",
        dating:"appuntamenti",
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

  export const getTranslatedTopic=<Topic extends keyof Topics>(topic:Topic, language: string): any=>
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
   
 
   export const getCurrentTopics=(language:string): any=>
   {
      switch (language) {
          case Lang.italian:
              return italianTopics;
          case Lang.english:
              return englishTopics;
          default:
              return englishTopics;
      }
    };
    