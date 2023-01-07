import { useState } from "react";
import styled from "styled-components";


const Container = styled.div`
  color: #FFF;
  font-family: 'Lato', sans-serif;
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Imagen = styled.img`
  display: block;
  width: 100px;

`
const Text = styled.p`
  font-size: 18px;
  span {
    font-weight: 700;
  }
`

const Price = styled.p`
  font-size: 24px;
  span {
    font-weight: 700;
  }
`


const ShowQuote = ({ quote }) => {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = quote;



  return (
    <Container>
      <Imagen src={`http://cryptocompare.com/${IMAGEURL}`} alt="Cyrpto imagen" />
      <div>
        <Price>The price is: <span>{PRICE}</span></Price>
        <Text>The higher price of day is: <span>{HIGHDAY}</span></Text>
        <Text>The lower price of day is: <span>{LOWDAY}</span></Text>
        <Text>The latest Change on 24 Hours: <span>{CHANGEPCT24HOUR}</span></Text>
        <Text>The last update: <span>{LASTUPDATE}</span></Text>
      </div>
    </Container>
  )
}

export default ShowQuote;