import AsyncStorage from '@react-native-community/async-storage';
import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';
import { JSONresponse, Category, Topic, CategoryTopic, Question } from '../interfaces/Interfaces';
import NetInfo from "@react-native-community/netinfo";

import keys from '../../database/keys/keys';
import { Platform } from 'react-native';

const NO_DATE= "s"
const NO_LANGUAGE = "EN"
const FIRST_DB_NAME = "first.db"
const SECOND_DB_NAME = "second.db"

const db = SQLite.openDatabase(
    {
      name: 'db.db',
      location: 'default',
      createFromLocation: 1,
    },
    () => {},
    () => {},
  );



  export const getDB=():SQLiteDatabase=>{
      const db = SQLite.openDatabase(
        {
          name: "db.db",
          location: 'default',
          createFromLocation: 1,
        },
        () => {},
        () => {},
      ); 
      return db;
    }
    

  export const getUpdateSettings = async (): Promise<boolean> => {
    const isAutomaticUpdate = await AsyncStorage.getItem(keys.SETTINGS_UPDATE);
    console.log('my new isAutomaticUpdate', isAutomaticUpdate);
    return isAutomaticUpdate == 'true' ? true : false;
  };



  const changeDB=async ():Promise<void>=>{
    let oldDbName = await AsyncStorage.getItem(keys.CURRENT_DB); 
    const newDbName = (!oldDbName || oldDbName== FIRST_DB_NAME)? SECOND_DB_NAME : FIRST_DB_NAME;
    await AsyncStorage.setItem(keys.CURRENT_DB,newDbName );
  }

    const getDate=():string=>{
    const formatYmd = (date: { toISOString: () => string | any[]; }) => date.toISOString().slice(0, 10);
    return formatYmd.toString()
}


export function hashCode(str: string):number {
  const id= str.split('').reduce((prevHash, currVal) =>
    (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);
    console.log("my id"+ id)
    return id
}


export const readTheme = async ():Promise<string> => {
  try {
    const theme = await AsyncStorage.getItem(keys.THEME_KEY);
    if (theme === null || theme == 'light') {
      return 'light'
    } else {
      return 'dark'
    }
  } catch (e) {
    console.log('Failed to fetch the data from storage');
    return 'light'
  }
};

export const getLastUpdate = async ():Promise<string> => {
  try {
    const date = await AsyncStorage.getItem(keys.LAST_UPDATE_KEY);
    if (date === null) {
      return NO_DATE;
    } else {
      return date;
    }
  } catch (e) {
    console.log('Failed to fetch date from storage');
    return NO_DATE;
  }
};

export const setAppContentUpdated = async(val:boolean):Promise<void> =>{
  AsyncStorage.setItem(keys.LANGUAGE_KEY, JSON.stringify(val));

}
export const getStoredLanguage = async ():Promise<string> => {
  try {
    const currentLanguage = await AsyncStorage.getItem(keys.LANGUAGE_KEY);
    if (currentLanguage === null) {
      return NO_LANGUAGE;
    } else {
      return currentLanguage;
    }
  } catch (e) {
    console.log('Failed to fetch date from storage');
    return NO_LANGUAGE;
  }
};

  export const generateDB= async (data:JSONresponse,DB_PREFIX:string):Promise<boolean>=>{
    console.log("start generate")
      try{
        //delete all categories
        await db.transaction((tx) => { 
            tx.executeSql('delete from categories'+DB_PREFIX)
          });

          //insert new categories
        await Promise.all([...data.categories.map(async (categ:Category) => {
             await addCategory(categ, DB_PREFIX)
            })])


          //delete all topics
          await db.transaction((tx) => { 
            tx.executeSql('delete from topics'+DB_PREFIX)
          });

          //insert new topics
          await Promise.all([...data.topics.map(async (topic:Topic) => {
            await addTopic(topic, DB_PREFIX)
          })])


           //delete category topics table
           await db.transaction((tx) => { 
            tx.executeSql('delete from category_topics'+DB_PREFIX)
          });


  
          //insert new category topics table
          await Promise.all([...data.category_topics.map(async (categTopic:CategoryTopic) => {
            await addCategTopic(categTopic, DB_PREFIX)
          })])

              //delete questions table
             await db.transaction((tx) => { 
              tx.executeSql(`delete from questions${DB_PREFIX} WHERE user_modified IN (0)`)
            });


          //insert new questions
        await Promise.all([...data.questions.map(async (question:Question) => {
          await addQuestion(question, DB_PREFIX)
            })])
        console.log("finish 3")
        return true;

    }catch(e)
    {
       return false;
    }
  }

  async function addQuestion (question:Question, DB_PREFIX: string)  {
    return new Promise<void>((resolve, reject) => {
       db.transaction((tx) => { 
        tx.executeSql(        
          `INSERT OR IGNORE INTO questions${DB_PREFIX} (id, topic,title) VALUES (?,?,?)`,
          [question.id,question.topic, question.title],
          (tx, results) => {               
           console.log("inserted");
           resolve();
          })})
  });
}


async function addCategory (categ:Category, DB_PREFIX: string)  {
  return new Promise<void>((resolve, reject) => {
     db.transaction((tx) => { 
      tx.executeSql(        
        `INSERT INTO categories${DB_PREFIX} (title) VALUES (?)`,
        [categ.title],
        (tx, results) => {               
         console.log("inserted");
         resolve();
        })})
});
}

async function addTopic (topic:Topic, DB_PREFIX: string)  {
  return new Promise<void>((resolve, reject) => {
     db.transaction((tx) => { 
      tx.executeSql(        
        `INSERT INTO topics${DB_PREFIX} (title,source) VALUES (?,?)`,
        [topic.title,topic.source],
        (tx, results) => {               
         console.log("inserted");
         resolve();
        })})
});
}


async function addCategTopic (categTopic:CategoryTopic, DB_PREFIX: string)  {
  return new Promise<void>((resolve, reject) => {
     db.transaction((tx) => { 
        tx.executeSql(        
          `INSERT INTO category_topics${DB_PREFIX} (category, topic) VALUES (?,?)`,
          [categTopic.category,categTopic.topic],
        (tx, results) => {               
         console.log("inserted");
         resolve();
        })})
});
}

   export const isConnected=async ():Promise<boolean>=>{
        const state = await NetInfo.fetch();
        console.log("CONNN"+state.isConnected)
        return state.isConnected? true:false;
     }

