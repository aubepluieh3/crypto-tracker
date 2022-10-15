import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const boxAnimation = keyframes`
  0% {
    transform: none;
    opacity: 0;
  }
  1% {
    transform: translateY(-5px);
    opacity: 0;
  }
  100% {
    transform: none;
    opacity: 1;
  }
`;
const Container = styled.div`
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  justify-content: center;
  gap: 10px;
`;

const Overview = styled.div`
  background-color: rgba(256, 256, 256, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 10px 0px;
  margin: 10px 0px;
  transform: translateY(-5px);
  opacity: 0;
  animation: ${boxAnimation} 0.5s linear forwards;
`;

const Tag = styled.div`
  width: 50%;
  color: black;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
`;

const Value = styled.div`
  margin-right: 5px;
`;

const Text = styled.div<{ isPositive?: Boolean }>`
  font-size: 20px;
  font-weight: bold;
  display: flex;
  color: ${(props) => (props.isPositive ? "#57b1ff" : "#ff97c0")};
`;

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
interface PriceProps {
  coinId: string;
  tickersData?: PriceData;
}
function checkValue(value: number | undefined) {
  if (value) {
    return value > 0;
  }
}
function Price({ coinId, tickersData }: PriceProps) {
  const [data, setData] = useState<PriceData>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setData(tickersData);
    setLoading(false);
  }, [coinId, tickersData]);

  return (
    <Container>
      {loading ? (
        "Loading Price..."
      ) : (
        <>
          <Overview>
            <Tag>Price</Tag>
            <Value>
              <Text isPositive={true}>
                ${data?.quotes.USD.price.toFixed(2)}
              </Text>
            </Value>
          </Overview>

          <Overview>
            <Tag> Max Change rate in the past day</Tag>
            <Value>
              <Text
                isPositive={
                  checkValue(data?.quotes.USD.market_cap_change_24h) === true
                }
              >
                {data?.quotes.USD.market_cap_change_24h}%
              </Text>
            </Value>
          </Overview>

          <Overview>
            <Tag> 30 minutes</Tag>
            <Value>
              <Text
                isPositive={
                  checkValue(data?.quotes.USD.percent_change_30m) === true
                }
              >
                {data?.quotes.USD.percent_change_30m}%
              </Text>
            </Value>
          </Overview>

          <Overview>
            <Tag> 1 hours</Tag>
            <Value>
              <Text
                isPositive={
                  checkValue(data?.quotes.USD.percent_change_1h) === true
                }
              >
                {data?.quotes.USD.percent_change_1h}%
              </Text>
            </Value>
          </Overview>

          <Overview>
            <Tag> 12 hours</Tag>
            <Value>
              <Text
                isPositive={
                  checkValue(data?.quotes.USD.percent_change_12h) === true
                }
              >
                {data?.quotes.USD.percent_change_12h}%
              </Text>
            </Value>
          </Overview>

          <Overview>
            <Tag> 24 hours</Tag>
            <Value>
              <Text
                isPositive={
                  checkValue(data?.quotes.USD.percent_change_24h) === true
                }
              >
                {data?.quotes.USD.percent_change_24h} %
              </Text>
            </Value>
          </Overview>
        </>
      )}
    </Container>
  );
}

export default Price;
