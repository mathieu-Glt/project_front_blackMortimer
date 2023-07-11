import { useState } from "react";
import React, { createContext } from 'react';


export const ThemeContext = createContext();


const ThemeProvider = ({ children }) => {
        const [theme, setTheme] = useState({
            themeLight : true,
            themeDark : false
        })
        const toggleTheme = () => {
            setTheme(theme === 'light' ? 'dark' : 'light')
        }
     
        return (
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                {children}
            </ThemeContext.Provider>
        )
}


export default ThemeProvider;