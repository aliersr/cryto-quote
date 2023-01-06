import React, { useEffect, useState } from 'react'

import styled from 'styled-components';

import { useSelectCurrencies } from '../hooks/useSelectCurrencies';
import { currencies } from '../data/currencies';
import Error from './Error';

const InputSubmit = styled.input`
background-color: #9497FF;
border: none;
width: 100%;
padding: 10px;
color: #FFF;
font-weight: 700;
text-transform: uppercase;
font-size: 20px;
border-radius: 5px;
transition: background-color .3s ease;
margin-top: 30px;

&:hover {
    background-color: #7A7DFE;
    cursor: pointer;

}
`
const MyForm = () => {
  const [cryptos, setCryptos] = useState([]);
  const [error, setError] = useState(false);

  const [currency, SelectCurrencies] = useSelectCurrencies('Select Currency', currencies);
  const [cryptoCurrency, SelectCryptoCurrency] = useSelectCurrencies('Select Crytocurrency', cryptos);

  useEffect(() => {

    const getAPI = async () => {
      const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;
      const get = await fetch(url);
      const result = await get.json();
      const arrayCrytos = result.Data.map(cryto => {

        const object = {
          id: cryto.CoinInfo.Name,
          name: cryto.CoinInfo.FullName
        }

        return object;
      })
      setCryptos(arrayCrytos);

    }
    getAPI();

  }, [])

  const handleSubmit = e => {
    e.preventDefault();

    if ([currency, cryptoCurrency].includes('')) {
      setError(true);

      return;
    }

    setError(false);

  }

  return (
    <>
      {error && <Error>All fields are required</Error>}
      <form
        onSubmit={handleSubmit}
      >

        <SelectCurrencies />
        <SelectCryptoCurrency />

        <InputSubmit
          type="submit"
          value="Quote" />

      </form>
    </>
  )
};

export default MyForm;