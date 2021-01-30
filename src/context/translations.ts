import LocalizedStrings from 'localized-strings';

// the translations
// (tip: move them in separate JSON files and import them)
export const DEFAULT_LANGUAGE = 'en';

const translations = {
 
  it: {
    PICK_TOPIC: 'Pick un Topic',
    EXPORT_TO_PDF:'Esporta come PDF', 
    START_PRESENTATION: 'Inizia Presentazione', 
    CLOSE: 'Chiudi',
    LANGUAGE_SELECT: 'Cambia Lingua',
    CATEGORIES: "Categorie", 
    FAVOURITES: "Preferite",
    SETTINGS: "Impostazioni", 
    SEARCH: "Ricerca" ,
    QUESTIONS: "Domande" ,
    ARRANGE_QUESTIONS: "Ordina le Domande" ,
    IS_TIME:"E' ora di iniziare",
    ADD_YOUR_QUESTION : "Aggiungi Una Domanda",
    NEXT: "Continua",
    SELECTED : "Selezionati",
    POPULAR_SEARCHES : "Ricerche più popolari",
    READY_TO_TALK: "Pronti a Chiacchierare",
    SEARCH_A_TOPIC: "Cerca un Topic",
    SEARCH_IN : "Cerca in",
    DB_NAME : 'IT',
  },
  en: {
    PICK_TOPIC: 'Pick a Topic',
    EXPORT_TO_PDF:'Export to PDF', 
    START_PRESENTATION: 'Start Presentation', 
    CLOSE: 'Close',
    READY: "I'm Ready! ",
    IS_TIME:"Now Is The Time",
    ADD_YOUR_QUESTION : "Add Your Question",
    NEXT: "Next",
    SELECTED : "Selected",
    POPULAR_SEARCHES : "Popular Searches",
    LANGUAGE_SELECT: 'Change Language',
    SEARCH_A_TOPIC: "Search a Topic",
    CATEGORIES: "Categories", 
    FAVOURITES: "Favourites",
    SETTINGS: "Settings", 
    SEARCH: "Search" ,
    QUESTIONS: "Questions" ,
    SEARCH_IN : "Search in",
    ARRANGE_QUESTIONS: "Arrange Questions" ,
    DB_NAME : 'EN',
    READY_TO_TALK:'Ready To Talk'

  },

};

export default new LocalizedStrings(translations);
