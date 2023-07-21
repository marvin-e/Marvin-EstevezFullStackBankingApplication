function AllData() {
  const [usersData, setUsersData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("http://localhost:3000/fetch-users")
      .then((res) => res.json())
      .then((users) => {
        setUsersData(users);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("An error occurred while fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <Card
      bgcolor="primary"
      header="All Data in Store"
      body={
        isLoading ? (
          <p>Loading data...</p>
        ) : usersData.length === 0 ? (
          <p>No data available</p>
        ) : (
          usersData.map((user, index) => (
            <div key={index}>
              <p style={{ marginBottom: ".25em" }}>Name: {user.name}</p>
              <p style={{ marginBottom: ".25em" }}>Email: {user.email}</p>
              <p style={{ marginBottom: ".25em" }}>Password: {user.password}</p>
              <p style={{ marginBottom: "2em" }}>Balance: {user.balance}</p>
            </div>
          ))
        )
      }
    />
  );
}
