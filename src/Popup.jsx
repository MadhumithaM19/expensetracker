function Popup({
  popupClose,
  handleCancel,
  handleOk,
  errors,
  date,
  setDate,
  method,
  setMethod,
  paidTo,
  setPaidTo,
  description,
  setDescription,
  amount,
  setAmount,
}) {
  return (
    <div className="modal-popup">
      <div className="modal">
        <div className="header">
          <h3>Add Expense</h3>
          <button className="cancel-button" onClick={popupClose}>✖️</button>
        </div>

        <div className="inputs">
          <div className="payment">
            <p>Date of Payment</p>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            {errors.date && <span style={{color:"red"}}>{errors.date}</span>}
            {errors.dateval && <span style={{color:"red"}}>{errors.dateval}</span>}
          </div>

          <div className="payment">
            <p>Method of Payment</p>
            <select
              className="dropdown"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option> </option>
              <option value="Cash">Cash</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Check">Check</option>
            </select>
            {errors.method && <span style={{color:"red"}}>{errors.method}</span>}
          </div>

          <div className="payment">
            <p>Paid to</p>
            <input
              type="text"
              value={paidTo}
              onChange={(e) => setPaidTo(e.target.value)}
            />
            {errors.paidTo && <span style={{color:"red"}}>{errors.paidTo}</span>}
          </div>

          <div className="payment">
            <p>Description</p>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && <span style={{color:"red"}}>{errors.description}</span>}
          </div>

          <div className="payment">
            <p>Amount Paid</p>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            {errors.amount && <span style={{color:"red"}}>{errors.amount}</span>}
          </div>
        </div>

        <div className="modal-buttons">
          <button className="popup-cancel" onClick={handleCancel}>Cancel</button>
          <button className="popup-ok" onClick={handleOk}>Ok</button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
