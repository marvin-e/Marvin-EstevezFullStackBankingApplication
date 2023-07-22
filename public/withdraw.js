function Withdraw({ onWithdraw, balance }) {
  const [amount, setAmount] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // const amountNum = Number(amount);
    if (isNaN(amount) || amount === "") {
      setErrorMessage("Value must be a number");
      setSuccessMessage("");
      setAmount("");
      return;
    }
    if (Number(amount) < 0) {
      setErrorMessage("Cannot withdraw negative amount");
      setSuccessMessage("");
      setAmount("");
      return;
    }
    if (Number(amount) > balance) {
      setErrorMessage("Account has been overdrawn");
      onWithdraw(amount);
      setSuccessMessage("");
      setAmount("");
      return;
    }
    setErrorMessage("");
    onWithdraw(amount);
    setSuccessMessage("Your withdrawal has been successfully processed");
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
      header="Withdraw"
      body={
        <>
          <p>Current Balance: {balance}</p>
          {successMessage && <p>{successMessage}</p>}
          {errorMessage && <p>{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <label>
              Amount:
              <input
                type="text"
                placeholder="Withdraw Amount"
                pattern="-?\d*\.?\d{0,2}|[-+]?[a-zA-Z]+"
                value={amount}
                onChange={handleChange}
              />
            </label>
            <button
              type="submit"
              className="btn btn-light"
              style={{ marginTop: "1.5em" }}
            >
              Withdraw
            </button>
          </form>
        </>
      }
    />
  );
}
