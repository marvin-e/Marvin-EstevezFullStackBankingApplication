function Spa() {
  const [balance, setBalance] = React.useState(0);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleDeposit = (amount) => {
    setBalance((prevBalance) => prevBalance + parseFloat(amount));
  };

  const handleWithdraw = (amount) => {
    setBalance((prevBalance) => prevBalance - Number(amount));
  };

  return (
    <HashRouter>
      <NavBar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        username={username}
        setUsername={setUsername}
      />
      <UserContext.Provider
        value={{
          users: [],
          currentUser: null,
          setUser: () => {},
        }}
      >
        <div className="container" style={{ padding: "20px" }}>
          <Route path="/" exact component={Home} />
          <Route path="/CreateAccount/" component={CreateAccount} />
          <Route
            path="/login/"
            render={(props) => (
              <Login
                {...props}
                setIsLoggedIn={setIsLoggedIn}
                setUsername={setUsername}
                setEmail={setEmail}
                setBalance={setBalance}
                component={Login}
              />
            )}
          />

          <Route
            path="/deposit/"
            render={(props) => (
              <Deposit
                {...props}
                component={Deposit}
                onDeposit={handleDeposit}
                balance={balance}
                email={username}
              />
            )}
          />
          <Route
            path="/withdraw/"
            render={(props) => (
              <Withdraw
                {...props}
                component={Withdraw}
                onWithdraw={handleWithdraw}
                balance={balance}
              />
            )}
          />
          <Route
            path="/balance/"
            render={(props) => (
              <Balance {...props} balance={balance} email={username} />
            )}
          />
          <Route path="/alldata/" component={AllData} />
        </div>
      </UserContext.Provider>
    </HashRouter>
  );
}

ReactDOM.render(<Spa />, document.getElementById("root"));
