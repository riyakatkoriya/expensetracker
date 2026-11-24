import { useEffect, useState } from "react";
import "../styles/EditModal.css"

function EditModal({ editId, onClose, onUpdate }) {
    const [formData, setFormData] = useState({
        id: editId,
        amount: null,
        description: "",
        date: "",
        category: "",
    });

    useEffect(() => {
        const expenses = JSON.parse(localStorage.getItem("expense") || "[]");
        const expense = expenses.find((item) => String(item.id) === String(editId));

       // eslint-disable-next-line react-hooks/set-state-in-effect
        if (expense) setFormData(expense);
    },[editId]);

    //Handle change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "amount" ? Number(value) : value,
    }));
    };

    //Update expense
    const handleUpdate = (e) => {   
        e.preventDefault();

        const expenses = JSON.parse(localStorage.getItem("expense") || "[]");
        const updatedExpenses = expenses.map((item) =>
            String(item.id) === String(editId) ? formData : item
    );

    localStorage.setItem("expense", JSON.stringify(updatedExpenses));
    onUpdate();
    onClose();
    };
    
    return (
    <div className="modal">
        <div className="from-box">
            <form onSubmit={handleUpdate}>
                <h1>Edit Expense</h1>

                <input
                type="number"
                name="amount"
                defaultValue=""
                placeholder="Amount"
                value={formData.amount || ''}
                onChange={handleChange}
                required
                />

                <input 
                type="text"
                name="description"
                defaultValue=""
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
                />

                <input type="date" name="date" defaultValue="" value={formData.date}
                onChange={handleChange}
                required/>

                <label htmlFor="category">Category:</label>
                <select id="category" name="category" defaultValue=""
                value={formData.category}
                onChange={handleChange}
                required
                >
                    
                <option value="">Select category</option>
                <option value="food">Food</option>
                <option value="shopping">Shopping</option>
                <option value="Transportation">Transportation</option>
                <option value="education">Education</option>
                <option value="phoneBill">Phone Bill</option>
                <option value="entertainment">Entertainment</option>
                </select>

                <div className="modal-btn">
                    <button  className="edit">
                        update
                    </button>
                    <button className="cancel" onClick={onClose}>
                        cancel
                    </button>   
                    </div>
            </form>

        </div>
      
    </div>
  );
}

export default EditModal
