"use client";

import TrafficLight from "@/components/trafficLight";
import { TrafficColor } from "@/types";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

type Streets = {
  a: TrafficColor;
  b: TrafficColor;
};

const initialState: Streets = {
  a: TrafficColor.Green,
  b: TrafficColor.Red,
};

export default function Home() {
  const [streets, setStreets] = useState(initialState);
  const [active, setActive] = useState(false);

  const timerId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      clearTimeout(timerId.current);
    };
  }, []);

  function handleReset() {
    setStreets(initialState);
    setActive(false);

    clearTimeout(timerId.current);
    timerId.current = undefined;
  }

  const handleTick = (streets: Streets) => {
    if (streets.a === TrafficColor.Green) {
      tick(
        {
          a: TrafficColor.Yellow,
          b: TrafficColor.Yellow,
        },
        5000
      );
    } else if (streets.a === TrafficColor.Yellow) {
      tick({
        a: TrafficColor.Red,
        b: TrafficColor.Green,
      });
    } else {
      tick(initialState);
    }
  };

  const tick = (nextStreets: Streets, cycle = 10000) => {
    setStreets(nextStreets);
    timerId.current = setTimeout(() => handleTick(nextStreets), cycle);
  };

  const handleStart = () => {
    setActive(true);
    timerId.current = setTimeout(() => handleTick(streets), 10000);
  };

  return (
    <Container>
      <Header>Traffic Control System</Header>
      <GameArea>
        <CityBlock>
          <Block />
          <BlockRoad>
            <TrafficLight activeColor={streets.a} />
            <Signal running={active}>
              {streets.a === TrafficColor.Green ||
              streets.a === TrafficColor.Yellow
                ? "🖐️"
                : "👟"}
            </Signal>
          </BlockRoad>
          <Block />
        </CityBlock>
        <Express>
          <ExpressRoad>
            <TrafficLight activeColor={streets.b} />
            <Signal running={active}>
              {streets.b === TrafficColor.Green ||
              streets.b === TrafficColor.Yellow
                ? "🖐️"
                : "👟"}
            </Signal>
          </ExpressRoad>
          <Control>
            <Button type="button" disabled={active} onClick={handleStart}>
              Start
            </Button>
            <Button type="button" disabled={!active} onClick={handleReset}>
              Reset
            </Button>
          </Control>
          <ExpressRoad>
            <TrafficLight activeColor={streets.b} />
            <Signal running={active}>
              {streets.b === TrafficColor.Green ||
              streets.b === TrafficColor.Yellow
                ? "🖐️"
                : "👟"}
            </Signal>
          </ExpressRoad>
        </Express>
        <CityBlock>
          <Block />
          <BlockRoad>
            <TrafficLight activeColor={streets.a} />
            <Signal running={active}>
              {streets.a === TrafficColor.Green ||
              streets.a === TrafficColor.Yellow
                ? "🖐️"
                : "👟"}
            </Signal>
          </BlockRoad>
          <Block />
        </CityBlock>
      </GameArea>
    </Container>
  );
}

const Header = styled.h4`
  text-align: center;
  font-size: 25px;
  font-weight: 500;
`;

const GameArea = styled.div`
  background-color: black;
  width: 70%;
  height: 70%;
  margin: 50px auto 0;
`;

const CityBlock = styled.div`
  background-color: whitesmoke;
  height: 35%;
  display: flex;
  justify-content: center;
`;

const Block = styled.div`
  background-color: whitesmoke;
  height: 100%;
  width: 40%;
`;

const Express = styled.div`
  background-color: black;
  display: flex;
  height: 30%;
`;

const ExpressRoad = styled.div`
  width: 40%;
  height: 100%;
  border-top: 5px solid yellow;
  border-bottom: 5px solid yellow;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Control = styled.div`
  width: 20%;
  height: 100%;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const BlockRoad = styled.div`
  background-color: black;
  width: 20%;
  height: 100%;
  border-left: 5px solid yellow;
  border-right: 5px solid yellow;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.main`
  height: 100vh;
  background-color: whitesmoke;
  padding: 10px;
`;

const Button = styled.button`
  background: green;
  width: 70px;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    cursor: default;
    background-color: gray;
  }
`;

const Signal = styled.p<{ running?: boolean }>`
  font-size: 30px;
  margin-left: 10px;
  display: ${(props) => (props.running ? "block" : "none")};
`;
