function NavBar({ isLoggedIn, setIsLoggedIn, username, setUsername }) {
  function handleLogout() {
    setIsLoggedIn(false);
    setUsername("");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a
          className="navbar-brand"
          href="#"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Home"
        >
          Bank App
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                href="#/CreateAccount/"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Create Account"
              >
                Create Account
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#/login/"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Login"
              >
                Login
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#/deposit/"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Deposit"
              >
                Deposit
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#/withdraw/"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Withdraw"
              >
                Withdraw
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#/balance/"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Balance"
              >
                Balance
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#/alldata/"
                data-toggle="tooltip"
                data-placement="bottom"
                title="All Data"
              >
                All Data
              </a>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <span className="nav-link">Welcome, {username}</span>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#"
                    onClick={handleLogout}
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Logout"
                  >
                    Logout
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
