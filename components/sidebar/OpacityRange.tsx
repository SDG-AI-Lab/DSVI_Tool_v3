import React, { useContext, useState, useEffect, ChangeEvent } from 'react'
import { FilterContext } from '../../context/FilterContext'
import {
  SvLayerObjectType,
  SeLayerObjectType,
} from '../../reducer/reducerInitialState'

interface OpacityRangeProps {
  layer: SvLayerObjectType | SeLayerObjectType
  index: number
  index2: number
  changeType: 'SOCIOECONOMIC' | 'GEODATA'
}

function OpacityRange({ layer, index, index2, changeType }: OpacityRangeProps) {
  const { dispatch } = useContext(FilterContext)

  const inputClassNames =
    'input-sm mx-2 w-14 border rounded border-solid border-gray-300 bg-white bg-clip-padding text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'

  const { value } = layer

  const onRangeChange = (range: number) => {
    dispatch({
      type: `CHANGE_${changeType}`,
      payload: { ...layer, value: range },
      index_1: index,
      index_2: index2,
    })
  }

  // DEBOUNCING THE DRAG OF RANGE ITEM TO AVOID TOO MANY RE-RENDERS
  const [range, setRange] = useState<number>(Number(layer.value))
  const [debouncedRange, setDebouncedRange] = useState<number>(range)

  const debounceDelay = 100
  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedRange(range)
    }, debounceDelay)

    return () => {
      clearTimeout(id)
    }
  }, [range])

  useEffect(() => {
    onRangeChange(Number(debouncedRange))
  }, [debouncedRange])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rangeNum = Number(e.target.value)
    const newRange = rangeNum > 100 ? 100 : rangeNum < 0 ? 0 : rangeNum
    setRange(newRange)
  }

  return (
    <div className={`flex flex-col space-y-2 p-2 px-6`}>
      <span className="text-sm text-gray-700">
        opacity:
        <input
          type="number"
          className={inputClassNames}
          value={value}
          onChange={onChange}
        />
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={value}
          className="form-range h-6 p-0 hover:cursor-pointer focus:shadow-none focus:outline-none focus:ring-0"
          onChange={(e) => setRange(Number(e.target.value))}
        />
      </span>
    </div>
  )
}

export default OpacityRange
