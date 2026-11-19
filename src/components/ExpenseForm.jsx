
import { useState } from "react";
import "../styles/ExpenseForm.css";
;


export default function ExpenseForm() {
    const [fromData, setfromData] = useState({
        amount: "",
        description: '',
        date: new Date().toISOString().split('T')[0],
        category:'',
    });
    const [errors, setErrors] = useState({});


    const handleChange =(e)=> {
        const {name, value} =e.target;

        setfromData(prev => ({
            ...prev,
            [name]: name === "amount" ? Number(value): value,
        }));
    };
    const validate=()=>{
        const newErrors = {};

        if (!fromData.amount|| fromData.amount <= 0) {
            newErrors.amount = 'Enter an amount greater than 0';
        }
        if (!fromData.description.trim()) {
            newErrors.description = 'Description is reuired';
        }
        if (!fromData.date) {
            newErrors.date = 'Date is required';
        }
        if (!fromData.category) {
            newErrors.category = 'select a category';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        if (!validate()) return;

        console.log("Expense Added Successully",
            fromData.amount,fromData.description,fromData.date,fromData.category);
    }
    return ( 
    <div className="expenseform">
        <form onSubmit={handleSubmit}>
            <h1>Expense Form</h1>

            <input
                type="number"
                name="amount"
                placeholder="Enter ampount.."
                value={fromData.amount}
                onChange={handleChange}
            />
            {errors.amount && <p className="validation">{errors.amount}</p>}

            <input
                type="text"
                name="description"
                placeholder="Enter Description.."
                value={fromData.description}
                onChange={handleChange}
            />
            {errors.description && <p className="validation">{errors.description}</p>}

            <input
                type="date"
                name="date"
                placeholder="Enter Date.."
                value={fromData.date}
                onChange={handleChange}
                />
                {errors.date && <p className="validation">{errors.date}</p>}

                <label htmlFor="category">Category</label>
                <select id="cateory" name="category" value={fromData.category}onChange={handleChange}>
                    <option value="">Select Category</option>
                    <option value="food">Food</option>
                    <option value="shopping">Shopping</option>
                    <option value="Transportation">Transportation</option>
                    <option value="education">Education</option>
                    <option value="phoneBill">Phonr Bill</option>
                    <option valuue="entertainment">Entertainment</option>
                </select>
                {errors.category && <p className="validation">{errors.category}</p>}

                <div className="btn">
                    <button>Add Expense</button>
                </div>
        </form>

    </div>
        
    );
}