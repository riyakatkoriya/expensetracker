
import{FaMoon} from 'react-icons/fa6';  
import'../styles/Navbar.css';
import { NavLink } from 'react-router-dom';   

import'../styles/Navbar.css';


export default function Navbar(){
    return(
        <div className="main-container">
            <div className="nav-container">
                <div>
                    <h1>Expense Tracker</h1>
                </div>

                <div className="nav-link">
                    <ul>
                        <li><NavLink to="/" className="links">Home</NavLink></li>
                    </ul>

                    <ul>
                        <li><NavLink to="/add-expense"className="links">Add Expense</NavLink></li>
                    </ul>

                    <ul>
                        <li><a href=""className="links">Expense Items</a></li>
                    </ul>
                </div>
                <div className="nav-actions">
                    <button type="button"className="theme-toggle">
                        <FaMoon/>
                        </button>


                        <a href=""className="logout-btn">
                            logout
                        </a>
                        </div>
            </div>
                
        </div>     
        
    );
}