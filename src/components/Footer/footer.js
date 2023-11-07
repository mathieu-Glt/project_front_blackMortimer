import styled from 'styled-components'
import { useContext } from 'react'
import { ThemeContext } from '../../context/themeContext'
import Button from 'react-bootstrap/Button';



const FooterContainer = styled.footer`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-top: 60px;
`

const NightModeButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: red;
`

function Footer(props) {
    console.log("🚀 ~ file: footer.js:23 ~ Footer ~ props:", props)

    // const { theme, toggleTheme } = useContext(ThemeContext)
    // console.log("🚀 ~ file: footer.js:24 ~ Footer ~ theme:", theme, toggleTheme)


    return (
        <>
            <h1>Footer</h1>


            <div >
                {/* <Button onClick={() => toggleTheme()}>Changer de mode : {theme === 'light' ? '☀️' : '🌙'}</Button> */}
            </div>
        </>
    )
}

export default Footer