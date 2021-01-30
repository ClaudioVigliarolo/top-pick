import React from "react"

const ThemeContext = React.createContext({
  theme: "light",
  setTheme: (newTheme:string) => {
  },
})

export default ThemeContext