import styled from "styled-components"
import { Link } from "react-router-dom"

/*
// Shareable Code between components
import { css } from "styled-components"

const OptionContainerStyles = css`
  padding: 10px 15px;
  cursor: pointer;
`

export const OptionDiv = styled.div`
  ${OptionContainerStyles}
`

*/

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  background-color: white;
  padding: 0 16px;
  border: 1px solid lightgrey;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.1),
    0px 4px 4px 0px rgba(0, 0, 0, 0.1), 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
`

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
  align-self: center;
`

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  align-self: center;
`

export const OptionLink = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  white-space: nowrap;
`
