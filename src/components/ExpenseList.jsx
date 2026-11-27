import { useEffect, useState } from "react";
import "../styles/ExpenseList.css";
import ConfirmationModal from "./ConfirmationModal";
import EditModal from "./EditModal";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function ExpenseList() {
    const { theme } = useTheme();
    const [expenses, setExpenses] = useState([]);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [deleteExpense, setDeleteExpense] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const navigate = useNavigate();



    const loadExpenses = () => {
        const savedExpenses = JSON.parse(localStorage.getItem("expense") || "[]");
        setExpenses(savedExpenses);
    };

    useEffect(() => {
        //safe: we only read localstorage on mount
        //eslint-disable-next-line react-hooks/set-state-in-effect
        loadExpenses();
    }, []);
    const totalAmount = expenses.reduce(
        (sum, item) => sum + Number(item.amount),
        0
    );

    // Delete expense
    const handleDelete = (id) => {
        const savedExpenses = JSON.parse(localStorage.getItem("expense") || "[]");
        const updatedExpenses = savedExpenses.filter((item) => item.id !== id);

        localStorage.setItem("expense", JSON.stringify(updatedExpenses));
        setExpenses(updatedExpenses);
        setDeleteExpense(null);
    };

    const editHandler = (id) => {
        setEditId(id);
        setOpenModal(true);
    };
    // Read more handler
    const handleReadMore = (id) => {
        navigate(`/expenseDetails/${id}`);
    };
    // Filtered expenses
    const filteredExpenses = expenses.filter((item) => {
        const matchesCategory = filter === 'all' || item.category === filter;
        const matchesSearch =
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    //Handlers
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            <div className={`ExpenseList ${theme}`}>
                <div className="list-search">
                    <div>
                        <h1>Your Expense</h1>
                        <p className="list-help">
                            search,edit,or remove an expense below.
                        </p>
                    </div>
                    <div>
                        <select value={filter} onChange={handleFilterChange}>
    
                            <option value="all">All categories</option>
                            <option value="food">Food</option>
                            <option value="shopping">Shopping</option>
                            <option value="Transportaion">Transportation</option>
                            <option value="education">Education</option>
                            <option value="phonebill">Phone Bill</option>
                            <option value="entertainment">Entertainment</option>
                        </select>

                        <input
                            type="search"
                            placeholder="search expense..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredExpenses.length > 0 ?
                            (filteredExpenses.map((expense) => (
                                <tr key={expense.id}>
                                    <td>{expense.amount}</td>
                                    <td>{expense.description}</td>
                                    <td>{expense.date}</td>
                                    <td>{expense.category}</td>
                                    <td className="table-actions">
                                        <button
                                            type="button"
                                            className="btn-delete"
                                            onClick={() => setDeleteExpense(expense)}>

                                            Delete</button>
                                        <button 
                                            onClick={() => editHandler(expense.id)}
                                            className="btn-edit">
                                            Edit</button>
                                        <button className="btn-readmore" onClick={() => handleReadMore(expense.id)}>
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))) : (<>
                                <tr>
                                    <td colSpan="7" className="no-data">No Expenses Found</td>
                                </tr>

                            </>)
                        }


                        <tr className="expense-total">
                            <td colSpan="7">TotalAmount: {totalAmount}</td>
                        </tr>
                    </tbody>


                </table>
            </div>
            {/* Delete Confirmation Modal */}
            {deleteExpense !== null && (
                <ConfirmationModal
                    title="Delete Expense"
                    message="Are you sure you want to delete this expense?"
                    confirmText="Delete"
                    cancelText="Cancel"
                    onCancel={() => setDeleteExpense(null)}
                    onConfirm={() => handleDelete(deleteExpense.id)}
                />
            )}
            {openModal && editId !== null && (
            <EditModal
            editId={editId}
            onClose={() => setOpenModal(false)}
            onUpdate={loadExpenses}
            />
            )}
        </>

    );

}

