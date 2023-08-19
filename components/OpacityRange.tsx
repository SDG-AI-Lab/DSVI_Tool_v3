import React, { useContext, useState, useEffect, ChangeEvent } from 'react'
import { FilterContext } from '../context/FilterContext'

type val2 = {
  id: number
  json_library: string
  reverse_meaning: boolean
  slug: string
  status: boolean
  title: string
  units: string
  value: string
}

interface OpacityRangeProps {
  val2: val2
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

  const onClickChange = (
    val2,
    index: number,
    index2: number,
    event?: ChangeEvent<HTMLInputElement>
  ): void => {
    let value = event ? event.target.value : val2.value

    const newItem = {
      id: val2.id,
      slug: val2.slug,
      title: val2.title,
      status: !val2.status,
      value,
      reverse_meaning: val2.reverse_meaning,
      units: val2.units,
      json_library: val2.json_library,
    }
    dispatch({
      type: 'CHANGE_SOCIOECONOMIC',
      payload: newItem,
      index_1: index,
      index_2: index2,
    })
    if (event) return
    dispatch({
      type: 'CHANGE_ACTIVE_LEGENDS',
      payload: newItem,
    })
  }

  const onRangeChange = (
    val2: val2,
    index: number,
    index2: number,
    range: string
  ) => {
    const newItem = {
      id: val2.id,
      slug: val2.slug,
      title: val2.title,
      status: val2.status,
      value: range,
      reverse_meaning: val2.reverse_meaning,
      units: val2.units,
      json_library: val2.json_library,
    }
    dispatch({
      type: 'CHANGE_SOCIOECONOMIC',
      payload: newItem,
      index_1: index,
      index_2: index2,
    })
  }

  const [range, setRange] = useState(val2.value)
  const [debouncedRange, setDebouncedRange] = useState(range)

  useEffect(() => {
    const id = setTimeout(() => {
      // console.log('setting new time out')
      setDebouncedRange(range)
    }, delay)

    return () => {
      // console.log('clearing the timeout')
      clearTimeout(id)
    }
  }, [range])
  useEffect(() => {
    onRangeChange(val2, index, index2, debouncedRange)
  }, [debouncedRange])

  return (
    <div
      className={`${isVisible ? 'flex' : 'hidden'} flex-col space-y-2 p-2 px-6`}
    >
      <span className="text-sm text-gray-700">
        opacity:
        <input
          type="number"
          className={inputClassNames}
          value={parseInt(val2.value)}
          onChange={(e) => onClickChange(val2, index, index2, e)}
        />
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          // value={val2.value}
          value={range}
          className="form-range h-6 p-0 focus:shadow-none focus:outline-none focus:ring-0"
          onChange={(e) => setRange(e.target.value)}
        />
      </span>
    </div>
  )
}

export default OpacityRange
