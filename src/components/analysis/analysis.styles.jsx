import styled from "styled-components"

export const AnalysisContainer = styled.div`
  display: grid;
  grid-column-gap: 16px;
  grid-row-gap: 16px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 100%;
  margin-bottom: 24px;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
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
  font-size: 0.875rem;
`

export const AnalysisMethodTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  padding: 0 0 8px 0;
  text-align: left;
`

export const Row = styled.div`
  padding: 8px 0 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
`

export const Left = styled.div`
  text-align: left;
  align-self: center;
`

export const Right = styled.div`
  text-align: right;
  align-self: center;
`

export const Column = styled.div`
  padding: 8px 0 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`

export const Value = styled.div``

export const ValueDisplay = styled.div``

export const ValueLabel = styled.div`
  font-family: "Oswald";
  padding: 8px 0 4px;
  font-size: 1rem;
  font-weight: 500;
`

export const ValueTotal = styled.div`
  display: inline;
  font-size: 0.8rem;
  color: grey;
`
