import { useState, useEffect } from 'react';
import styled from 'styled-components';

import MyForm from './components/MyForm';
import ShowQuote from './components/ShowQuote';
import Spinner from './components/Spinner';
import ImagenCryto from './img/imagen-criptos.png';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
      }
`;

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 200px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

const Loading = styled.p`
  color: #FFF;
`

function App() {

  const [currencies, setCurrencies] = useState({});
  const [quote, setQuote] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(currencies).length > 0) {

      const quoteCrypto = async () => {
        setLoading(true);
        setQuote({});

        const { currency, cryptoCurrency } = currencies;

        console.log(currency, cryptoCurrency);
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency}&tsyms=${currency}`;
        const getData = await fetch(url);
        const data = await getData.json();

        setQuote(data.DISPLAY[cryptoCurrency][currency]);

        setLoading(false);

      };
      quoteCrypto();
    }
  }, [currencies]);

  return (
    <Container>
      <Imagen
        src={ImagenCryto}
        alt='Crytocurrency Imagen'
      />
      <div>
        <Heading>Cryptocurrency Quote</Heading>
        <MyForm
          setCurrencies={setCurrencies}
        />
        {loading && <Spinner/>}
        {quote.PRICE && <ShowQuote
          quote={quote}

        />}

      </div>
    </Container>
  )
}

export default App 