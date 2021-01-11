import React from "react"

const ThemeContext = React.createContext({
  theme: "light",
  setTheme: (newTheme:string) => {
  },
})

export default ThemeContext

/*
const readTheme = async () => {
  try {
    const theme = await AsyncStorage.getItem(data.THEME_KEY);
    if (theme === null || theme == "light") {
      setTheme("light");
      updateColor("light");
      console.log("retriv");
    } else {
      setTheme("dark");
      updateColor("dark");
    }
  } catch (e) {
    console.log("Failed to fetch the data from storage");
  }
};*/