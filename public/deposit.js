function Deposit({ onDeposit, balance, username }) {
  const [amount, setAmount] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  const handleDeposit = async (event) => {
    event.preventDefault();
    const updatedBalance = balance + Number(amount);
    onDeposit(updatedBalance);
    setSuccessMessage("Your deposit has been successfully processed");
    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);

    try {
      const response = await fetch("http://localhost:3000/update-balance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username, deposit: Number(amount) }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
    } catch (error) {
      console.error("Updating balance failed:", error);
    }

    setAmount("");
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const regex = /^\d*\.?\d{0,2}$/;
    if (value === "" || regex.test(value)) {
      setAmount(value);
    }
  };

  return (
    <Card
      bgcolor="primary"
      header="Deposit"
      body={
        <form onSubmit={handleDeposit}>
          <label htmlFor="amount">Deposit amount: {amount}</label>
          {successMessage && <p>{successMessage}</p>}
          <input
            type="text"
            id="amount"
            placeholder="Deposit Amount"
            value={amount}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="btn btn-light"
            style={{ marginTop: "1.5em" }}
          >
            Deposit
          </button>
        </form>
      }
    />
  );
}
