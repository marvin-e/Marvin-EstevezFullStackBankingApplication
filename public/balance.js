// function Balance({ balance }) {
//   return (
//     <Card
//       bgcolor="primary"
//       header="Balance"
//       body={<p>Account balance: {balance}</p>}
//     />
//   );
// }

function Balance({ balance, email }) {
  // Include email prop
  // This effect runs once when the component mounts
  React.useEffect(() => {
    const updateBalance = async () => {
      try {
        const response = await fetch("http://localhost:3000/update-balance", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, balance: balance }),
        });

        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
      } catch (error) {
        console.error("Fetch error: " + error);
      }
    };

    updateBalance();
  }, [balance]); // Pass an empty array as the second argument to run this effect once

  return (
    <Card
      bgcolor="primary"
      header="Balance"
      body={<p>Account balance: {balance}</p>}
    />
  );
}
