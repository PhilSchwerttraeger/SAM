import styled from "styled-components"

export const AnalysisContainer = styled.div`
  display: grid;
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 100%;
  margin-bottom: 24px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }
`

export const Card = styled.div`
  width: 100%;
  padding: 16px;
  background-color: white;
  border-radius: 4px;
  border: 1px solid lightgrey;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.1),
    0px 4px 4px 0px rgba(0, 0, 0, 0.1), 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
  font-size: 14px;
`

export const AnalysisMethodTitle = styled.div`
  font-size: 16px;
  padding: 0;
  text-align: center;
`
export const Left = styled.div`
  text-align: left;
  float: left;
`
export const Right = styled.div`
  text-align: right;
`
