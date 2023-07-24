function Deposit({ onDeposit, balance, username }) {
  const [amount, setAmount] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  const handleDeposit = (event) => {
    event.preventDefault();
    if (amount < 0) {
      setErrorMessage("Deposit has to be positive number");
      setSuccessMessage("");
      setAmount("");
      return;
    }
    if (isNaN(amount) || amount === "") {
      setErrorMessage("Value must be a number");
      setSuccessMessage("");
      setAmount("");
      return;
    }
    setErrorMessage("");
    onDeposit(amount);
    setSuccessMessage("Your deposit has been successfully processed");
    setAmount("");
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const regex = /^-?\d*\.?\d{0,2}$|^[-+]?[a-zA-Z]+$/;
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
          <label htmlFor="amount">Deposit amount: {balance}</label>
          {successMessage && <p>{successMessage}</p>}
          {errorMessage && <p>{errorMessage}</p>}
          <input
            type="text"
            placeholder="Deposit Amount"
            pattern="-?\d*\.?\d{0,2}|[-+]?[a-zA-Z]+"
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
