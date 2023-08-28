import React, { useContext, useState, useEffect, ChangeEvent } from 'react'
import { FilterContext } from '../../context/FilterContext'
import { Val2 } from './SocioeconLayers'

interface OpacityRangeProps {
  val2: Val2
  index: number
  index2: number
  delay: number
  isVisible: boolean
}

function OpacityRange({
  val2,
  index,
  index2,
  delay,
  isVisible,
}: OpacityRangeProps) {
  const { dispatch } = useContext(FilterContext)

  const inputClassNames =
    'input-sm mx-2 w-14 border rounded border-solid border-gray-300 bg-white bg-clip-padding text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'

  const { value } = val2

  /* COMMENT #1 (AT THE BOTTOM OF THE FILE) WAS HERE */

  const onRangeChange = (range: number) => {
    dispatch({
      type: 'CHANGE_SOCIOECONOMIC',
      payload: { ...val2, value: range },
      index_1: index,
      index_2: index2,
    })
  }

  // DEBOUNCING THE DRAG OF RANGE ITEM TO AVOID TOO MANY RE-RENDERS
  const [range, setRange] = useState<number>(Number(val2.value))
  const [debouncedRange, setDebouncedRange] = useState<number>(range)

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedRange(range)
    }, delay)

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
    <div
      className={`${isVisible ? 'flex' : 'hidden'} flex-col space-y-2 p-2 px-6`}
    >
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
          className="form-range h-6 p-0 focus:shadow-none focus:outline-none focus:ring-0"
          onChange={(e) => setRange(Number(e.target.value))}
        />
      </span>
    </div>
  )
}

export default OpacityRange

// COMMENT #1:
// const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
//   const newItem = {
//     id: val2.id,
//     slug: val2.slug,
//     title: val2.title,
//     status: !val2.status,
//     value: val2.value,
//     reverse_meaning: val2.reverse_meaning,
//     units: val2.units,
//     json_library: val2.json_library,
//   }
//   dispatch({
//     type: 'CHANGE_SOCIOECONOMIC',
//     payload: newItem,
//     index_1: index,
//     index_2: index2,
//   })
// }
