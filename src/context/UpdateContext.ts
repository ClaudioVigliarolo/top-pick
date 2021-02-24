import React from "react"
/*
    this context is used to notify the app when the app is updating his content
*/
const UpdateContext = React.createContext({
    isLoadingContent: false,
    isUpdatedContent: false,
    setLoadingContent: (value:boolean) => {
  },

  setUpdatedContent:(value:boolean) => {
},
})

export default UpdateContext