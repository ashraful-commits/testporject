// Utility function to calculate total commission for all clients in an array
export function calculateTotalCommissionForAllClients(clients) {
  let totalCommission = 0;

  clients.forEach((client) => {
    const commision = ((client?.amount * 100) / 15 / 100).toFixed(2);

    totalCommission = +commision;
  });

  return totalCommission;
}
