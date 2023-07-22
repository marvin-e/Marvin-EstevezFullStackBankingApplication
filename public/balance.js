function Balance({ balance }) {
  return (
    <Card
      bgcolor="primary"
      header="Balance"
      body={<p>Account balance: {balance}</p>}
    />
  );
}
