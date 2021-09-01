import React, {useEffect, useState} from "react";
import styled from "styled-components";

const TotalRunsWrapper = styled.div`
  width: 287px;
  max-height: max-content;
  background: #FFFFFF;
  box-shadow: 0px 2px 8px rgba(46, 50, 56, 0.04), 0 8px 24px rgba(46, 50, 56, 0.08);
  border-radius: 8px;
  padding: 24px;

  button {
    border: none;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: ${(props) => props.color};
    background: ${(props) => props.buttonColor};
    padding: 12px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    height: 48px;
    width: 100%;
  }
`;

const TotalRunsHeader = styled.div`
  text-align: right;

  h3 {
    font-weight: bold;
    font-size: 12px;
    line-height: 15px;
    text-align: right;
    color: #7B818A;
  }

  h2 {
    font-weight: 600;
    font-size: 32px;
    line-height: 136.52%;
    text-align: right;
    color: #4DB396;
  }
`;

const TotalRunsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;

  .title {
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
    color: #2E3238;
  }

  .help-text {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: #91969C;
  }

  .number {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #4DB396;
  }

`;

const Status = styled.p`
  text-align: left;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: ${(props) => props.color};
  padding: 10px 0;
`;


const TotalRuns = ({benchmark, accelerate, completeTargets, onOctomize, benchStatus, accStatus}) => {
    const [runFactor, setRunFactor] = useState(0)
    const [disable, setDisable] = useState(0)
    useEffect(() => {
        if (benchmark && accelerate) {
            setRunFactor(2)
        } else if (benchmark) {
            setRunFactor(1)
        } else if (accelerate) {
            setRunFactor(1)
        } else if (!accelerate && !benchmark) {
            setRunFactor(0)
        }

    }, [benchmark, accelerate])
    useEffect(() => {
        setDisable(completeTargets.length === 0)
    }, [completeTargets])
    return (
        <TotalRunsWrapper buttonColor={disable? '#D0D1D2' : '#0180FF' } color={disable? '#ADAFB3' : '#FFFF'}>
            <TotalRunsHeader>
                <h3>Total Runs</h3>
                <h2>{runFactor * completeTargets.length}</h2>
            </TotalRunsHeader>
            {completeTargets.map((item, ind) =>
                <TotalRunsRow key={item.id + 'runs'}>
                <span>
                    <p className='title'>{item.instance}</p>
                    <p className='help-text'>{`${item.cpu} cores`}</p>
                </span>
                    <span className='number'>
                    {runFactor}
                </span>
                </TotalRunsRow>)}
            <button onClick={onOctomize}
                    disabled={disable}>
                Octomize
            </button>
            {benchStatus && benchmark &&
            <Status
                color={benchStatus === 400 ? 'red' : 'green'}>{benchStatus === 400 ? 'Benchmark failed, please try again after updating the value for trials, and runs' : 'Benchmark success, you are all set!'}</Status>}
            {accStatus && accelerate &&
            <Status
                color={accStatus === 400 ? 'red' : 'green'}>{accStatus === 400 ? 'Accelerate failed, please try again after updating the value for trials, and runs' : 'Accelerate success, you are all set!'}</Status>}
        </TotalRunsWrapper>
    )
}

export default TotalRuns;