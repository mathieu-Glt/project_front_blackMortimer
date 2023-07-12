import { useEffect } from "react";
import { useState } from "react";
import React, { createContext } from 'react';


export const ThemeContext = createContext();


const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light')
    const [themeApp, setThemeApp] = useState(true)

  
    const toggleTheme = () => {
            setTheme(theme === 'light' ? 'dark' : 'light')
            setThemeApp(!themeApp)

    }     
        return (
            <ThemeContext.Provider value={{ theme, toggleTheme, themeApp }}>
                {children}
            </ThemeContext.Provider>
        )
}


export default ThemeProvider;