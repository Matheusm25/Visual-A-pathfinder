import styled from "styled-components";

export const ControlsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 20px;
`;

export const Button = styled.button`
  width: 100px;
  height: 50px;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-size: 1.2rem;
  margin-left: 10px;
  &:hover {
    transform: scale(1.05);
  }
`;

export const Input = styled.input`
  width: 100px;
  height: 45px;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
  font-size: 1.2rem;
  margin-left: 10px;
  &:hover {
    transform: scale(1.05);
  }
`;

export const Label = styled.label`
  font-size: 1.2rem;
  padding-right: 10px;
`;

export const SelectedButton = styled(Button)`
  background-color: #000;
  color: #fff;
`;

export const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  margin-left: 10px;
`;