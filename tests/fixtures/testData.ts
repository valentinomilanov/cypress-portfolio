export const products = {
  category: 'Pliers',
  productName: 'Pliers',
  quantity: 1
} as const;

export const users = {
  validUser: {
    email: 'customer@practicesoftwaretesting.com',
    password: 'welcome01',
    address: {
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      country: 'United States',
      postal_code: '10001'
    },
    bankDetails: {
      bank_name: 'Bank of America',
      account_name: 'John Doe',
      account_number: '1234567890'
    }
  },
  invalidUser: {
    email: 'customer@practicesoftwaretesting.com',
    password: 'wrongpassword'
  },
  emptyUser: {
    email: '',
    password: ''
  }
} as const;

export const apiUrl =
  process.env.API_URL || 'https://api.practicesoftwaretesting.com';
