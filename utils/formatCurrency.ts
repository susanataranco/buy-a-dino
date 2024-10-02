export function formatCurrency(number: string) {
    return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'JPY' 
      }).format(Number(number));
}
