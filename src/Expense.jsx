import { useState } from 'react';
import './Expense.css';

function Expense() {
  const [date, setDate] = useState('');
  const [count, setCount] = useState(1);
  const [method, setMethod] = useState('');
  const [paidTo, setPaidTo] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleOk = () => {
   
    const newAmount = parseFloat(amount);
    const newExpense = {
      id: count,
      date,
      method,
      paidTo,
      description,
      amount: newAmount,
      total: total + newAmount,
    };

    setExpenses([...expenses, newExpense]);
    setTotal(total + newAmount);
    setCount(count + 1);
    setShowModal(false);
    setDate('');
    setMethod('');
    setPaidTo('');
    setDescription('');
    setAmount('');
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const popupClose = () => {
    setShowModal(false);
  };

 function handleDelete(id) {
  const newExpenses = [];
  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i].id !== id) {
      newExpenses.push(expenses[i]);
    }
  }
  setExpenses(newExpenses);
}


  const handleEdit = (item) => {
    setDate(item.date);
    setMethod(item.method);
    setPaidTo(item.paidTo);
    setDescription(item.description);
    setAmount(item.amount.toString());

   const newExpenses = [];
   for (let i = 0; i < expenses.length; i++) {
   if (expenses[i].id !== item.id) {
    newExpenses.push(expenses[i]);
  }
}
setExpenses(newExpenses);
    setTotal(total - item.amount);
    setShowModal(true);
  };

  return (
    <>
      <div className="add-data">
        <h2>Expense Tracker</h2>
        <button className="add-button" onClick={() => setShowModal(true)}>
         Expense
        </button>
      </div>

      <table className="expense-table">
        <thead>
          <tr>
            <th>Date of Payment</th>
            <th>Method of Payment</th>
            <th>Paid to</th>
            <th>Description</th>
            <th>Amount Paid</th>
            <th>Running Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((row) => (
            <tr key={row.id}>
              <td>{row.date}</td>
              <td>{row.method}</td>
              <td>{row.paidTo}</td>
              <td>{row.description}</td>
              <td>${row.amount}</td>
              <td>${row.total}</td>
              <td className='table-edit' >
                <button className="edit-button" onClick={() => handleEdit(row)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(row.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Total: ${total}.00</h2>

      {showModal && (
        <div className="modal-popup">
          <div className="modal">
            <div className="header">
              <h3>Add Expense</h3>
              <button className="cancel-button" onClick={popupClose}>✖️</button>
            </div>
            <div className="inputs">
              <div className="payment">
                <p>Date of Payment</p>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="payment">
                <p>Method of Payment</p>
                <select className="dropdown" value={method} onChange={(e) => setMethod(e.target.value)}>
                  <option value="Cash">Cash</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Check">Check</option>
                </select>
              </div>
              <div className="payment">
                <p>Paid to</p>
                <input type="text" value={paidTo} onChange={(e) => setPaidTo(e.target.value)} />
              </div>
              <div className="payment">
                <p>Description</p>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="payment">
                <p>Amount Paid</p>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
              </div>
            </div>
            <div className="modal-buttons">
              <button className="popup-cancel" onClick={handleCancel}>Cancel</button>
              <button className="popup-ok" onClick={handleOk}>Ok</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Expense;
