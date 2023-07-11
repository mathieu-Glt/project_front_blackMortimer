import styled from 'styled-components'
import { useContext } from 'react'
import { ThemeContext } from '../../context'



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

    const { theme } = useContext(ThemeContext)
    console.log("🚀 ~ file: footer.js:24 ~ Footer ~ theme:", theme)

    
    return (
        <>
        <h1>Footer</h1>
        
        </>
        // <FooterContainer >
        //     <NightModeButton>Changer de mode</NightModeButton>
        // </FooterContainer>
    )
}
 
export default Footer