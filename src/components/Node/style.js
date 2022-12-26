import styled from "styled-components";

export const NodeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

export const CostInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const LeftInfo = styled.span`
  font-size: 1rem;
  margin-left: 10px;
  margin-top: 5px;
`;

export const RigthInfo = styled.span`
  font-size: 1rem;
  margin-right: 10px;
  margin-top: 5px;
`;
  
export const CenterInfo = styled.span`
  font-size: 1.2rem;
  align-self: center;
  justify-self: center;
  margin-right: 5px;
`;