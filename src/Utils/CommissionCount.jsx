export function calculateTotalCommissionForAllClients(clients) {
  let totalCommission = 0;
  clients?.forEach((client) => {
    console.log(client.amount);
    const commission = (
      (client?.amount * parseInt(client?.commissionRate)) /
      100
    ).toFixed(2);

    totalCommission += parseFloat(commission); // Increment the total commission with the calculated commission
  });

  return totalCommission;
}
