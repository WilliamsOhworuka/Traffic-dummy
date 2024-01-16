import { TrafficColor } from "@/types";
import styled from "styled-components";

type TrafficLightProps = {
  activeColor: TrafficColor;
};

export default function TrafficLight({ activeColor }: TrafficLightProps) {
  return (
    <Container>
      <Light
        color={activeColor === TrafficColor.Green ? activeColor : undefined}
      />
      <Light
        color={activeColor === TrafficColor.Yellow ? activeColor : undefined}
      />
      <Light
        color={activeColor === TrafficColor.Red ? activeColor : undefined}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100px;
  height: 200px;
  background-color: #8b8000;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  justify-content: space-between;
  border-radius: 10px;
`;
const Light = styled.div<{ color?: string }>`
  height: 50px;
  width: 50px;
  border-radius: 100%;
  border: 2px solid black;
  background-color: ${(props) => props.color || "inherit"};
`;
