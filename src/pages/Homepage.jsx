
import ExpenseList from "../components/Expenselist";
import Navbar from "../components/Navbar";

  function Homepage (){
    const expense = [
    {
    amount: "₹2,000",
    shopping: "Grocery shopping",
    date: "17 Nov 202",
    category: "Food"
   },
   {
    amount:"₹1,500",
    shopping: "clothes shopping",
    date: "1 Nov 2026",
    category: "shopping"
   },
   {
    amount:"₹800",
    shopping: "vegetable shopping",
    date: "16 Nov 2026",
    category:"Food"
   },
   {
    amount:"₹9000",
    shopping:"shoes shopping",
    date: "25 Nov 2026",
    category:"shopping"
   },
   
  
];
    return(
        <>
        <Navbar/>
        <ExpenseList expenses={expense} />        
        </>
        

    );
}

export default Homepage;