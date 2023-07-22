function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function validate(name, email, password) {
    const errors = [];

    if (!name) {
      errors.push("Name is required");
    } else if (!/^[a-zA-Z ]+$/.test(name)) {
      errors.push("Name must contain only letters");
    }

    if (!email) {
      errors.push("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.push("Email is invalid");
    }

    if (!password) {
      errors.push("Password is required");
    } else if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }

    if (errors.length > 0) {
      setStatus(
        <ul>
          {errors.map((error) => (
            <li className="mt-4">{error}</li>
          ))}
        </ul>
      );
      return false;
    }
    setStatus("");
    return true;
  }

  async function handleCreate(e) {
    if (!validate(name, email, password)) {
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setShow(false);
      } else {
        setStatus(data.message);
      }
    } catch (error) {
      setStatus("An error occurred while creating the account.");
      console.error(error);
    }
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
  }

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={
        show ? (
          <>
            Name
            <br />
            <input
              type="input"
              className="form-control"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <br />
            Email address
            <br />
            <input
              type="input"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
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
            />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              onClick={handleCreate}
            >
              Create Account
            </button>
            <div style={{ marginTop: "1em" }}></div>
          </>
        ) : (
          <>
            <h5>Success</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Add another account
            </button>
          </>
        )
      }
    />
  );
}
