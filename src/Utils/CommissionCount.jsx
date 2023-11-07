// Utility function to calculate total commission for all clients in an array
export function calculateTotalCommissionForAllClients(clients) {
  let totalCommission = 0;

  const commision = ((clients?.amount * 100) / 15 / 100).toFixed(2);

  totalCommission = +commision;

  return totalCommission;
}
