import React, {useEffect, useState} from "react";
import styled, {createGlobalStyle} from "styled-components";
import {postAccelerate, postBenchmark} from '../src/API/queries'
import SideBar from "../src/components/Sidebar";
import SelectPanel from "../src/components/Panels";
import TotalRuns from "../src/components/Panels/totalRuns";
import nextId from "react-id-generator";


const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    color: #111827;
  }

`

const AppWrapper = styled.div`
  font-family: 'Inter', sans-serif;
  background: #FAFAFA;
  min-height: 100vh;
  width: 100%;
  display: flex;
`;

const Header = styled.div`
  color: #555B62;
  text-align: left;
  margin-bottom: 30px;

  h1 {
    font-weight: 300;
    font-size: 36px;
    line-height: 40px;
    color: inherit;
  }

  p {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: inherit;
  }
`;

const AppBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  flex: 1 0 auto;
  padding: 80px 0 0 80px;
`;

const Panels = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: flex-start;

`;

const App = () => {
    const providerOptions = [
        {value: 'AWS', label: 'Amazon Web Service'},
        {value: 'GCP', label: 'Google Cloud'},
        {value: 'Azure', label: 'Microsoft Azure'}
    ]
    const [hardwareTargets, setHardwareTargets] = useState([])
    const [completeTargets, setCompleteTargets] = useState([])
    const [error, setError] = useState('')
    const [benchmark, setBenchmark] = useState(false)
    const [accelerate, setAccelerate] = useState(false)
    const [benchmarkEngine, setBenchmarkEngine] = useState('ONNX')
    const [trials, setTrials] = useState(10)
    const [runs, setRuns] = useState(10)
    const [benchStatus, setBenchStatus] = useState('')
    const [accStatus, setAccStatus] = useState('')
    const [accelerateEngine, setAccelerateEngine] = useState('ONNX')
    const [kernels, setKernels] = useState(0)

    useEffect(() => {
        setCompleteTargets(hardwareTargets.filter((item, ind) => item.instance !== ''))
    }, [hardwareTargets])

    useEffect(() => {
        setBenchStatus(!benchmark ? '' : benchStatus)
        setAccStatus(!accelerate ? '' : accStatus)
    }, [benchmark, accelerate])


    const onToggleBenchmark = () => {
        setBenchmark(!benchmark)
    }

    const onToggleAccelerate = () => {
        setAccelerate(!accelerate)
    }

    const onRunsChange = (e) => {
        setRuns(parseInt(e.target.value))
    }

    const onTrialsChange = (e) => {
        setTrials(parseInt(e.target.value))
    }

    const selectBenchmarkEngine = (selectedValue) => {
        setBenchmarkEngine(selectedValue.value)
    }

    const selectAccEngine = (selectedValue) => {
        setAccelerateEngine(selectedValue.value)
    }

    const onKernelChange = (e) => {
        setKernels(parseInt(e.target.value))
    }


    const onProviderChange = (selectedOption, id) => {
        setHardwareTargets(hardwareTargets.map((item, ind) => item.id === id ? {
            ...item,
            'provider': selectedOption.value,
            'instance': selectedOption.value !== item.provider ? '' : item.instance
        } : item))
    }

    const onInstanceChange = (selectedHardware, id) => {
        if(hardwareTargets.filter((item, ind) => item.provider === selectedHardware.provider && item.instance === selectedHardware.instance).length>0) {
            setError('We cannot accept duplicate entries, please try again!')
            setHardwareTargets(hardwareTargets.map((item, ind) => item.id === id ? {
                'id': item.id,
                "provider": '',
                "instance": '',
                "cpu": '',
                "memory": ''
            } : item))
        }
        else {
            setError('')
            setHardwareTargets(hardwareTargets.map((item, ind) => item.id === id ? {
                ...selectedHardware,
                'id': item.id
            } : item))
        }
    }

    const addRow = () => {
        const id = nextId();
        setHardwareTargets([...hardwareTargets, {
            'id': id,
            "provider": '',
            "instance": '',
            "cpu": '',
            "memory": ''
        }])
    }

    const deleteRow = (id) => {
        setHardwareTargets(hardwareTargets.filter((item, ind) => item.id !== id))
    }

    const onOctomize = () => {
        if (benchmark) {
            completeTargets.forEach((item, ind) => {
                let hardware = {...item}
                delete hardware.id
                const benchSpec = {
                    "engine": benchmarkEngine,
                    "hardware": hardware,
                    "num_trials": trials,
                    "runs_per_trial": runs,
                }
                postBenchmark(benchSpec).then((resp) => setBenchStatus(resp.status))
            })
        }
        if (accelerate) {
            completeTargets.forEach((item, ind) => {
                let hardware = {...item}
                delete hardware.id
                let engine = accelerateEngine === 'TVM' ? {
                    'TVM' : { "kernel_trials": kernels }
                } : 'ONNX'
                const accSpec = {
                    "engine": engine,
                    "hardware": hardware
                }
                postAccelerate(accSpec).then((resp) => setAccStatus(resp.status))
            })
        }
    }

    return (
        <AppWrapper>
            <GlobalStyle/>
            <SideBar/>
            <AppBody>
                <Header>
                    <h1>Shufflenet-v2.onnx</h1>
                    <p>Created three days ago by Mike Johnson</p>
                </Header>
                <Panels>
                    <SelectPanel onProviderChange={onProviderChange}
                                 hardwareTargets={hardwareTargets}
                                 deleteRow={deleteRow}
                                 onInstanceChange={onInstanceChange}
                                 providerOptions={providerOptions}
                                 error={error}
                                 addRow={addRow}
                                 benchmark={benchmark}
                                 onToggleBenchmark={onToggleBenchmark}
                                 selectBenchmarkEngine={selectBenchmarkEngine}
                                 onTrialsChange={onTrialsChange}
                                 onRunsChange={onRunsChange}
                                 trial={trials}
                                 runs={runs}
                                 benchmarkEngine={benchmarkEngine}
                                 accelerate={accelerate}
                                 onToggleAccelerate={onToggleAccelerate}
                                 selectAccEngine={selectAccEngine}
                                 accelerateEngine={accelerateEngine}
                                 kernels={kernels}
                                 onKernelChange={onKernelChange}
                    />
                    <TotalRuns benchStatus={benchStatus}
                               onOctomize={onOctomize}
                               completeTargets={completeTargets}
                               benchmark={benchmark}
                               accelerate={accelerate}
                               accStatus={accStatus}/>
                </Panels>
            </AppBody>
        </AppWrapper>
    );
}

export default App;
