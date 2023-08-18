import React, { useContext } from 'react'
import { FilterContext } from '../context/FilterContext'

function AdminLevels() {
  const { state, dispatch } = useContext(FilterContext)
  const levels = [
    {
      slug: 1,
      title: 'One',
    },
    {
      slug: 2,
      title: 'Two',
    },
    {
      slug: 3,
      title: 'Three',
    },
  ]

  return (
    <ul className="flex">
      {levels.map((val) => {
        return (
          <div key={val.slug}>
            <div
              className="flex"
              onClick={() =>
                dispatch({
                  type: 'CHANGE_LEVEL',
                  payload: { level: val.slug },
                })
              }
            >
              <input
                className="focus:ring-3  ml-5 h-4 w-4 rounded border-gray-300 bg-gray-50 focus:ring-blue-300"
                id="flowbite"
                aria-describedby="flowbite"
                type="radio"
                checked={val.slug === state.level}
                onChange={() =>
                  dispatch({
                    type: 'CHANGE_LEVEL',
                    payload: { level: val.slug },
                  })
                }
              />
              <a
                href="#!"
                className="flex h-6 items-center  overflow-hidden  text-ellipsis whitespace-nowrap rounded pl-2 text-xs text-gray-700 transition duration-300 ease-in-out hover:bg-blue-50 hover:text-blue-600"
                data-mdb-ripple="true"
                data-mdb-ripple-color="primary"
              >
                {val.title}
              </a>
            </div>
            <div className="text-gray-700"></div>
          </div>
        )
      })}
    </ul>
  )
}

export default AdminLevels
