import axios from 'axios';

const BASE_URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1'

export const getAllCoins = async () => {
  const response = await axios.get(`${BASE_URL}/latest/currencies.min.json`);
  const data = Object.entries(response.data)

  return data
}

export const getCoinPrice = async (ticker, against='usdt', dateString='latest') => {
  
  const response = await axios.get(`${BASE_URL}/${dateString}/currencies/${ticker}/${against}.min.json`);
  return response.data
}

export const getPriceHistory = async (ticker, against='usdt', type='days'|'weeks'|'months', daysBack=7) => {

  let data = []

  const response = await axios.get(`${BASE_URL}/latest/currencies/${ticker}/${against}.min.json`);
  data.push(response.data);
  
  const d = new Date();
  for (var i = 0; i < daysBack; i++){
    switch (type) {
      case 'days': 
        console.log('days')
        d.setDate(d.getDate() - 1);
        break;
      case 'weeks': 
        console.log('weeks')
        d.setDate(d.getDay() - 1);
        break;
      case 'months': 
        console.log('months')
        d.setDate(d.getDate() - 30);
        break;
    }
    const datestring = d.toISOString().split('T')[0];
    console.log(datestring)
    data.push(await getCoinPrice(ticker, against, datestring));
  }
  
  return data
}

