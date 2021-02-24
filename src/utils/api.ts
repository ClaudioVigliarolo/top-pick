import axios from "axios";
import { JSONresponse } from "../interfaces/Interfaces";
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
          {//
              if(generateDB(response.data,lang))
              {
                setUpdatedContent(true);
              }else{
                setUpdatedContent(false);
              }
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