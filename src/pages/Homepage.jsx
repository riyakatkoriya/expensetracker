
import ExpenseList from "../components/Expenselist";
import { useTheme } from "../context/ThemeContext";
import "../styles/HomePage.css"


  function Homepage (){
    const { theme } = useTheme();
    
      return(
        <main className={`home-page ${theme}`}>
         <ExpenseList/>        
        </main>
        
      )
}

export default Homepage;