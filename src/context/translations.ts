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
    SOURCE_TOPICS: "fonte:",
    SELECTED : "Selezionati",
    POPULAR_SEARCHES : "Ricerche più popolari",
    READY_TO_TALK: "Pronto a Parlare",
    SEARCH_A_TOPIC: "Cerca un Topic",
    SEARCH_IN : "Cerca in",
    DB_NAME : 'IT',
    START: "Iniziamo!",
    STEP_1_TITLE: 'Step 1: Scegli',
    STEP_1_DESCRIPTION:'Premi su una carta per selezionare il topic',
    SELECT_LANGUAGE: "Seleziona lingua",
    CHANGE_THEME: "Cambia tema", 

    STEP_2_TITLE: 'Step 2: Seleziona',
    STEP_2_DESCRIPTION:'Seleziona le domande che preferisci cliccando sul quadratino a destra',

    STEP_3_TITLE: 'Step 3: Riordina',
    STEP_3_DESCRIPTION:"Metti in ordine le domande che hai scelto trascinando l'icona a destra",
      
    READY_TO_START:'Siamo pronti ad iniziare!',
    READY_TO_START_TIP:'TIP: Puoi rivedere questo mini tutorial in ogni momento dalla sezione Impostazioni'

  },
  en: {
    PICK_TOPIC: 'Pick a Topic',
    EXPORT_TO_PDF:'Export to PDF', 
    START_PRESENTATION: 'Start Presentation', 
    CLOSE: 'Close',
   START: "Start!",
    READY: "I'm Ready! ",
    IS_TIME:"Now Is The Time",
    ADD_YOUR_QUESTION : "Add Your Question",
    NEXT: "Next",
    SOURCE_TOPICS: "source:",
    SELECTED : "Selected",
    POPULAR_SEARCHES : "Popular Searches",
    LANGUAGE_SELECT: 'Change Language',
    SEARCH_A_TOPIC: "Search a Topic",
    CATEGORIES: "Categories", 
    FAVOURITES: "Favourites",
    SETTINGS: "Settings", 
    SELECT_LANGUAGE: "Select Language", 
    SEARCH: "Search" ,
    QUESTIONS: "Questions" ,
    CHANGE_THEME: "Change Theme", 
    SEARCH_IN : "Search in",
    ARRANGE_QUESTIONS: "Arrange Questions" ,
    DB_NAME : 'EN',
    READY_TO_TALK:'Ready To Talk',

    STEP_1_TITLE: 'Step 1: Choose',
    STEP_1_DESCRIPTION:'Simply press on the card to select the topic',

    STEP_2_TITLE: 'Step 2: Select',
    STEP_2_DESCRIPTION:'You can Select the questions you like by pressing the little square on the right',

    STEP_3_TITLE: 'Step 3: Arrange',
    STEP_3_DESCRIPTION:'You can put the questions in the order you prefer by dragging the icon on the right',
    
    READY_TO_START:'We are all ready!',
    READY_TO_START_TIP:'TIP: You can rewatch this tutorial in the settings folder'
  },

};

export default new LocalizedStrings(translations);
