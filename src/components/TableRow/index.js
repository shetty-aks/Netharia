import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Select from 'react-select';
import {Cross} from '../Svg'
import {getInstanceList} from "../../API/queries";


const LargeCell = styled.div`
  flex: 4;
`;

const MediumCell = styled.div`
  flex: 2;

  p {
    color: ${(props) => props.color}
  }
`;

const SmallCell = styled.div`
  flex: 1;
`;

const TableRowWrapper = styled.div`
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 20px;

`;

const CrossButton = styled.div`
  border: none;
  background-color: white;
  cursor: pointer;
`;


const TableRow = ({
                      providerOptions,
                      id,
                      onProviderChange,
                      onInstanceChange,
                      data,
                      deleteRow
                  }) => {
    const [instanceList, setInstanceList] = useState([])
    const [selectedInstance, setSelectedInstance] = useState(data.instance)
    useEffect(() => {
        if (data.provider) {
            getInstanceList(data.provider).then(items => {
                setInstanceList(items)
            })
        }
    }, [data.provider])

    const handleProviderChange = (selectedItem) => {
        onProviderChange(selectedItem, id)
    }

    const handleInstanceChange = (selectedItem) => {
        setSelectedInstance(selectedItem.value)
        const selectedHardware = instanceList.filter((item, ind) => item.instance === selectedItem.value)[0]
        onInstanceChange(selectedHardware, id)
    }

    return (
        <TableRowWrapper>
            <LargeCell>
                <Select value={providerOptions.filter((item, ind) => item.value === data.provider)}
                        options={providerOptions} onChange={handleProviderChange}/>
            </LargeCell>
            <LargeCell>
                <Select options={instanceList.map((item) => {
                    return ({'value': item.instance, 'label': item.instance})
                })} onChange={handleInstanceChange} value={{'value': data.instance, 'label': data.instance}}
                        isDisabled={data.provider === ''}/>
            </LargeCell>
            <MediumCell color={data.instance === '' ? '#c6c7c9' : '#555B62'}>
                <p>{data.instance === '' ? 0 : data.cpu}</p>
            </MediumCell>
            <MediumCell color={data.instance === '' ? '#c6c7c9' : '#757a83'}>
                <p>{data.instance === '' ? 0 : data.memory}</p>
            </MediumCell>
            <SmallCell>
                <CrossButton onClick={() => deleteRow(data.id)}>
                    <Cross/>
                </CrossButton>
            </SmallCell>
        </TableRowWrapper>

    )
}

export default TableRow;