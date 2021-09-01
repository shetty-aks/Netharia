import React, {useState} from "react";
import styled from "styled-components";
import TableRow from "../TableRow";
import {Arrow} from '../Svg'
import Select from 'react-select';

const SelectPanelWrapper = styled.div`
  width: 875px;
  min-height: 200px;
  background: #FFFFFF;
  box-shadow: 0px 2px 8px rgba(46, 50, 56, 0.04), 0 8px 24px rgba(46, 50, 56, 0.08);
  border-radius: 8px;
`;

const Header = styled.section`
  height: 80px;
  padding: 0 20px;

  h2 {
    font-weight: 300;
    font-size: 30px;
    line-height: 80px;
    color: #7B818A
  }
`;

const HardwareSection = styled.section`

`;

const Accordian = styled.div`
  border: 1px solid #D1D5DB;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  margin: 16px;
`;

const TitleRow = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  padding: 16px 20px;

  input {
    width: 16px;
    height: 16px;
    border: 1px solid #0180FF;
    box-sizing: border-box;
    border-radius: 4px;
    margin-right: 10px;
  }

  h3 {
    font-size: 14px;
    line-height: 20px;
    color: #111827;
    font-weight: bold;
  }

  p {
    font-size: 14px;
  }
`;

const AccBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 20px;
  gap: 15px;

  label {
    font-weight: 500;
    font-size: 10px;
    line-height: 12px;
    color: #7B818A;
  }

  .number-input {
    height: 30px;
    width: 80px;
    padding-left: 10px;
    border: 1px solid #D1D5DB;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
  }
`;

const ArrowButton = styled.button`
  margin-left: auto;
  border: none;
  background-color: white;
  cursor: pointer;

  svg {
    transform: ${(props) => props.rotate};
  }
`;

const Title = styled.section`
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #7B818A;
  }

  button {
    border: none;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: #FFFFFF;
    background: #0180FF;
    padding: 8px 16px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
  }
`;

const TableHeader = styled.section`
  padding: 15px 20px;
  display: flex;
  box-shadow: inset 0px -1px 0px #E0E0E0;
  gap: 20px;

  h4 {
    font-weight: 500;
    font-size: 10px;
    line-height: 12px;
    color: #7B818A;
  }
  
  h4.highlighted {
    color: #0180FF;
  }
`;

const LargeCell = styled.div`
  flex: 4;
`;

const MediumCell = styled.div`
  flex: 2;
`;

const SmallCell = styled.div`
  flex: 1;
`;

const Error = styled.p`
  text-align: left;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: orangered;
  padding: 15px 20px;
`;

const SelectPanel = ({
                         providerOptions,
                         onProviderChange,
                         onInstanceChange,
                         hardwareTargets,
                         addRow,
                         deleteRow,
                         onToggleBenchmark,
                         onToggleAccelerate,
                         benchmark,
                         accelerate,
                         onRunsChange,
                         onTrialsChange,
                         selectBenchmarkEngine,
                         selectAccEngine,
                         benchmarkEngine,
                         accelerateEngine,
                         runs,
                         trial,
                         kernels,
                         error,
                         onKernelChange
                     }) => {
    const [showBenchmark, setShowBenchmark] = useState(false)
    const [showAccelerate, setShowAccelerate] = useState(false)
    const engineOptions = [
        {value: 'ONNX', label: 'ONNX'},
        {value: 'TVM', label: 'TVM'},
    ]
    return (
        <SelectPanelWrapper>
            <Header>
                <h2>Octomize</h2>
            </Header>
            <Accordian>
                <TitleRow>
                    <input type='checkbox' checked={benchmark} onChange={onToggleBenchmark}/>
                    <div>
                        <h3>Benchmark</h3>
                        <p>This is some sub content to explain becnhmarking.</p>
                    </div>
                    <ArrowButton rotate={showBenchmark ? 'rotate(180deg)' : 'rotate(0deg)'}
                                 onClick={() => setShowBenchmark(!showBenchmark)}> <Arrow/>
                    </ArrowButton>
                </TitleRow>
                {showBenchmark && <AccBody>
                    <Select options={engineOptions} onChange={selectBenchmarkEngine} value = {{'value': benchmarkEngine , 'label':benchmarkEngine}}/>
                    <label>{'number of trials'.toUpperCase()}</label>
                    <input className='number-input' type='number' value ={trial.toString()} onChange={onTrialsChange}/>
                    <label>{'runs per trial'.toUpperCase()}</label>
                    <input className='number-input' type='number' value ={runs.toString()} onChange={onRunsChange}/>
                </AccBody>}
            </Accordian>
            <Accordian>
                <TitleRow>
                    <input type='checkbox' checked={accelerate} onChange={onToggleAccelerate}/>
                    <div>
                        <h3>Accelerate</h3>
                        <p>Could even open this accordian for a paragraph of text.</p>
                    </div>
                    <ArrowButton rotate={showAccelerate ? 'rotate(180deg)' : 'rotate(0deg)'}
                                 onClick={() => setShowAccelerate(!showAccelerate)}> <Arrow/></ArrowButton>
                </TitleRow>
                {showAccelerate && <AccBody>
                    <Select options={engineOptions} onChange={selectAccEngine} value = {{'value': accelerateEngine , 'label':accelerateEngine}}/>
                    { accelerateEngine === 'TVM'&&
                        <>
                            <label>{'number of Kernels'.toUpperCase()}</label>
                            <input className='number-input' type='number' value ={kernels.toString()} onChange={onKernelChange}/>
                        </>
                    }
                </AccBody>}
            </Accordian>
            <HardwareSection>
                <Title>
                    <h3>Hardware Targets</h3>
                    <button onClick={addRow}>
                        Add
                    </button>
                </Title>
                <TableHeader>
                    <LargeCell>
                        <h4 className = 'highlighted'>{'Provider'.toUpperCase()}</h4>
                    </LargeCell>
                    <LargeCell>
                        <h4>{'Instance'.toUpperCase()}</h4>
                    </LargeCell>
                    <MediumCell>
                        <h4>{'vcpu'.toUpperCase()}</h4>
                    </MediumCell>
                    <MediumCell>
                        <h4>{'Memory (GiB)'.toUpperCase()}</h4>
                    </MediumCell>
                    <SmallCell>
                    </SmallCell>
                </TableHeader>
                {hardwareTargets.map((item, ind) => <TableRow data={item} key={item.id} id={item.id}
                                                              deleteRow={deleteRow}
                                                              providerOptions={providerOptions}
                                                              onProviderChange={onProviderChange}
                                                              onInstanceChange={onInstanceChange}/>)}
                {error && <Error>{error}</Error >}
            </HardwareSection>
        </SelectPanelWrapper>
    )
}

export default SelectPanel;