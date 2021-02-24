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

  const getPrimaryDB=async ():Promise<SQLiteDatabase>=>{
    let dbName = await AsyncStorage.getItem(keys.CURRENT_DB); 
    if(!dbName) //roll back to first db if nothing is saved
      dbName = FIRST_DB_NAME;

      return SQLite.openDatabase(
        {
          name: FIRST_DB_NAME,
          location: 'default',
          createFromLocation: 1,
        },
        () => {},
        () => {},
      ); 
    }
    
    const getSecondaryDB=async ():Promise<SQLiteDatabase>=>{
      let primaryDbName = await AsyncStorage.getItem(keys.CURRENT_DB); 
      const secondaryDbName = (!primaryDbName || primaryDbName == FIRST_DB_NAME)? SECOND_DB_NAME: FIRST_DB_NAME
        return SQLite.openDatabase(
          {
            name: secondaryDbName,
            location: 'default',
            createFromLocation: 1,
          },
          () => {},
          () => {},
        ); 
      }

  const changeDB=async ():Promise<void>=>{
    let oldDbName = await AsyncStorage.getItem(keys.CURRENT_DB); 
    const newDbName = (!oldDbName || oldDbName== FIRST_DB_NAME)? SECOND_DB_NAME : FIRST_DB_NAME;
    await AsyncStorage.setItem(keys.CURRENT_DB,newDbName );
  }

    const getDate=():string=>{
    const formatYmd = (date: { toISOString: () => string | any[]; }) => date.toISOString().slice(0, 10);
    return formatYmd.toString()
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


  export const generateDB=async (data:JSONresponse,DB_PREFIX:string):Promise<boolean>=>{

      //get secondary db
      const db = await getSecondaryDB();
      //clean secondary db
      try{
        await db.transaction((tx) => { 
          tx.executeSql('delete from categories'+DB_PREFIX),
          tx.executeSql('delete from topics'+DB_PREFIX)

        });


      }catch(e)
      {
        console.error("couldnt clean the secondary db")
      }




      console.log("qqqqq",data.questions)
      //delete categories table
      console.log("start generate")
      try{

        await db.transaction((tx) => { 
            tx.executeSql('delete from categories'+DB_PREFIX)
          });

          //insert new categories
          data.categories.forEach(async (categ:Category) => {
            await db.transaction((tx) => { 
                tx.executeSql(        
                  `INSERT INTO categories${DB_PREFIX} (title) VALUES (?)`,
                  [categ.title],
                  (tx, results) => {               
                    if (results.rowsAffected > 0 ) {
                      console.log('Insert success');              
                    } else {
                      console.log('Insert failed');
                    }
                  }
                );
               });
            });
        //delete all topics
        await db.transaction((tx) => { 
          tx.executeSql('delete from topics'+DB_PREFIX)
        });

        //insert new topics
        data.topics.forEach(async (topic:Topic) => {
        console.log("ttt",topic.title)
          await db.transaction((tx) => { 
            tx.executeSql(        
              `INSERT INTO topics${DB_PREFIX} (title,source) VALUES (?,?)`,
              [topic.title,topic.source],
            );
           });});


        //delete category topics table
        await db.transaction((tx) => { 
          tx.executeSql('delete from category_topics'+DB_PREFIX)
        });

        //insert new category topics table
        data.category_topics.forEach(async(topic:CategoryTopic) => {
          await db.transaction((tx) => { 
            tx.executeSql(        
              `INSERT INTO category_topics${DB_PREFIX} (category, topic) VALUES (?,?)`,
              [topic.category,topic.topic],
            );
           });
          });
         console.log("updated category topics")
        //delete questions NOT modified by user
        db.transaction((tx) => { 
          tx.executeSql(`delete from questions${DB_PREFIX} WHERE user_modified IN (0)`)
        });

          //insert new questions
          data.questions.forEach(async(question:Question) => {
        console.log("aaa")

            await db.transaction((tx) => { 
              tx.executeSql(        
                `INSERT INTO questions${DB_PREFIX} (id, topic,title) VALUES (?,?,?)`,
                [question.id,question.topic, question.title],
              );
             });
        });
         return true;
      }catch(e)
      {
         return false;
      }
    }
      /*
      //delete all topics
      db.transaction((tx) => { 
        tx.executeSql('delete from topics'+DB_PREFIX)
      });

      //insert new topics
      data.topics.forEach((topic:Topic) => {
        db.transaction((tx) => { 
        tx.executeSql(`INSERT INTO topics"+DB_PREFIX +
        "(title,source) VALUES (?,?), ${topic.title},${topic.source}`,)
        .then(()=>{
          console.log("updated topics")
        })
      });
    });

      //delete category topics table
      db.transaction((tx) => { 
        tx.executeSql('delete from category_topics'+DB_PREFIX)
      });

        //insert new topics
        data.category_topics.forEach((topic:CategoryTopic) => {
        db.transaction((tx) => { 
        tx.executeSql(`INSERT INTO topics"+DB_PREFIX +
        "(category, topic) VALUES (?,?), ${topic.category},${topic.topic}`,)
        .then(()=>{
          console.log("updated category topics")
        })
      });
    });
    
    */

      /*
          //delete questions NOT modified by user
          db.transaction((tx) => { 
            tx.executeSql(`delete from questions${DB_PREFIX} WHERE user_modified IN (0)`)
          });

            //insert new questions
            data.questions.forEach((topic:CategoryTopic) => {
              db.transaction((tx) => { 
              tx.executeSql(`INSERT INTO topics"+DB_PREFIX +
              "(category, topic) VALUES (?,?), ${topic.category},${topic.topic}`,)
              .then(()=>{
                console.log("updated category topics")
              })
            });
          });
        */
   


   export const isConnected=async ():Promise<boolean>=>{
        const state = await NetInfo.fetch();
        console.log("CONNN"+state.isConnected)
        return state.isConnected? true:false;
      }
