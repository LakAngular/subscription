export const SubscriptionFields = {
  email: '',
  password: ''
};

export const SubscriptionValidation = {
  email: {
      required: 'Please Enter Email.',
      asyncval: 'Please Enter Valid Email.'
  },
  password: {
      required: 'Please Enter Password.',
      pattern: 'Please enter a password with 8 character long, at least one character and one special character.'
  }
};

