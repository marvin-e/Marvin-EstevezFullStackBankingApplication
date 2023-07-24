function Login({ setIsLoggedIn, setUsername, setBalance }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [status, setStatus] = React.useState("");

  function handleLogin(e) {
    e.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Login successful") {
          setIsLoggedIn(true);
          setUsername(email);
          setBalance(data.balance); // Set balance here
          setStatus("Great you have an account with us!");
        } else {
          setStatus("Invalid Email or Password");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        setStatus("An error occurred. Please try again.");
      });
  }

  function clearStatus() {
    setStatus("");
  }

  return (
    <Card
      bgcolor="primary"
      header="Login: Must create account first"
      body={
        <>
          Email address
          <br />
          <input
            type="input"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            onFocus={clearStatus}
          />
          <br />
          Password
          <br />
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            onFocus={clearStatus}
          />
          <br />
          <button type="submit" className="btn btn-light" onClick={handleLogin}>
            Login
          </button>
          <div style={{ marginTop: "2em" }}>{status}</div>
        </>
      }
    />
  );
}
