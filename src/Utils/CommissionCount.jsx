export function calculateTotalCommissionForAllClients(clients) {
  let totalCommission = 0;

  clients?.forEach((client) => {
    const commission = ((client?.amount * 100) / 15 / 100).toFixed(2);

    totalCommission += +commission; // Increment the total commission with the calculated commission
  });

  if (isNaN(totalCommission)) {
    return 0;
  } else {
    return totalCommission;
  }
}
