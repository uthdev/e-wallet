import axios, { AxiosRequestConfig } from 'axios';
// import RequestWithUser from '../interfaces/requestWithUser.interface';

type IPayment = {
  reference: string,
  amount: string,
}

const BASE_URL = 'https://api.paystack.co/charge';

const initiatePayment = async (email: string, request: Record<string, string>): Promise<IPayment> => {
  console.log(request)
  const data: AxiosRequestConfig = {
    method: 'POST',
    url: BASE_URL,
    headers: {
      Authorization: `BEARER ${process.env.PAYSTACK_API_KEY}`
    },
    data: {
      email,
      amount: request.amount,
      ussd: { 
        type: request.ussdCode,
      },
    }
  };
  try {
    const response = await axios(data);
    console.log(response)
    return { reference: response.data.data.reference, amount: request.amount};
  } catch (error) {
    console.log(error)
    throw error;
  }
};

export default initiatePayment;