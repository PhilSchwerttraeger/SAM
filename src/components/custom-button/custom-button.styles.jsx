import styled, { css } from "styled-components"

const buttonStyles = css`
  background-color: black;
  color: white;
  border: none;
  border-radius: 1px;

  &:hover {
    background-color: white;
    color: grey;
  }
`

const invertedButtonStyles = css`
  background-color: white;
  color: black;

  &:hover {
    background-color: #f1f1f1;
  }
`

const getButtonStyles = props =>
  props.inverted ? invertedButtonStyles : buttonStyles

export const CustomButtonContainer = styled.button`
  min-width: 100px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 16px 0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: center;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 2px 4px 0px;

  ${getButtonStyles}
`
