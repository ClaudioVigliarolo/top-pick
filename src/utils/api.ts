import axios from "axios";
import { JSONresponse, Report } from "../interfaces/Interfaces";
import { generateDB } from "./utils";

const HOSTNAME ="https://topicks-dashboard.herokuapp.com";


export const updateTopics = async (date:string, lang:string,setUpdatedContent:(val:boolean)=>void, setLoadingContent:(val:boolean)=>void ):Promise<void>  => {
  setLoadingContent(true);
    try{
      let response = await axios
      .get(`${HOSTNAME}/topicks/get_updates/${date}/${lang}`)
      .then(async (response) => {
          const data: JSONresponse = response.data;
          console.log(data);
          if(data.isUpdated)
          {
              //set the app as updated
              setUpdatedContent(true);
              setLoadingContent(false);
              return;
          }else
          {
            const myval =await generateDB(response.data,lang);
            console.log("my amico",myval)
              if(myval)
                setUpdatedContent(true);
              else
                setUpdatedContent(false);
              
              setLoadingContent(false);
          }
      })
      return response;
    } catch(err){
        setUpdatedContent(false);
        setLoadingContent(false);
        console.log("CANNOT FETCH DATA "+err)
    }
  }



  export const addReport = async (report:Report, lang:string):Promise<boolean> => {
    try{
      let response = await  axios
      .post(`${HOSTNAME}/topicks/add_report`, {
        report,
        lang
      });
        return response.status == 200;
    } catch(err){
      console.log(err)
        return false;
    }
  }
  