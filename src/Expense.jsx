import { useState } from 'react';
import './Expense.css';
import Popup from './Popup';

function Expense() {
  const [date, setDate] = useState('');
  const [count, setCount] = useState(0);
  const [method, setMethod] = useState('');
  const [paidTo, setPaidTo] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});


  
  const handleOk = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const amt = Number(amount);
    let oldAmount = 0;
    let runningTotal = 0;

    if (editId !== null) {
      const updatedExpenses = expenses.map((exp) => {
        runningTotal += exp.amount;
        console.log("running tot 0",runningTotal);
        if (exp.id == editId) {
          oldAmount = Number(exp.amount);
          console.log("id",editId);
          console.log("old amount",oldAmount);
          console.log("amt",amt);
          console.log("total",total);
          runningTotal = amt !== oldAmount ?runningTotal - oldAmount + amt : runningTotal;
          return {
            ...exp,
            date,
            method,
            paidTo,
            description,
            amount: amt,
            total: runningTotal, 
          };
        }
        else if(exp.id > editId){
          
          oldAmount = Number(exp.amount);
          console.log("id",exp.id);
          console.log("old amount",oldAmount);
          console.log("amt",exp.amount);
          console.log("total",exp.total);
          console.log("running tot",runningTotal);
          return {
            ...exp,
            
          total: runningTotal, 
          };
        }
        
        return exp;
      });
      setExpenses(updatedExpenses);
      setTotal(runningTotal);
      setEditId(null);
    } else {
      const newExpense = {
        id: count,
        date,
        method,
        paidTo,
        description,
        amount: amt,
        total: total + amt,
      };

      setExpenses([...expenses, newExpense]);
      setTotal(total + amt);
      setCount(count + 1);
    }

    setShowModal(false);
    setDate('');
    setMethod('');
    setPaidTo('');
    setDescription('');
    setAmount('');
    setErrors({});
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const popupClose = () => {
    setShowModal(false);
  };

 function handleDelete(val) {
  const newExpenses = [];
  let runningTotal = 0;

  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i].id !== val.id) {
      runningTotal += expenses[i].amount;
      console.log("runningTotal in delete",runningTotal);
      newExpenses.push({
        ...expenses[i],
        total: runningTotal,
      });
    }
  }

  setExpenses(newExpenses);
  setTotal(runningTotal);
}

  const handleEdit = (item) => {
    setEditId(item.id);
    setDate(item.date);
    setMethod(item.method);
    setPaidTo(item.paidTo);
    setDescription(item.description);
    setAmount(item.amount);
    setShowModal(true);
  };

  const validateForm = () => {
    const errors = {};
    if (date.trim() === '') {
      errors.date = 'Date is required';
    }
    if (method.trim() === '') {
      errors.method = 'Method of payment is required';
    }
    if (paidTo.trim() === '') {
      errors.paidTo = 'Paid to is required';
    }
    if (description.trim() === '') {
      errors.description = 'Description is required';
    }
    if (amount === '') {
      errors.amount = 'Valid amount is required';
    }
    return errors;
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
              <td className="table-edit">
                <button className="edit-button" onClick={() => handleEdit(row)}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => handleDelete(row)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Total: ${total}.00</h2>

      {showModal && (
        <Popup
          popupClose={popupClose}
          handleOk={handleOk}
          handleCancel={handleCancel}
          errors={errors}
          date={date}
          setDate={setDate}
          method={method}
          setMethod={setMethod}
          paidTo={paidTo}
          setPaidTo={setPaidTo}
          description={description}
          setDescription={setDescription}
          amount={amount}
          setAmount={setAmount}
        ></Popup>
      )}
    </>
  );
}

export default Expense;
