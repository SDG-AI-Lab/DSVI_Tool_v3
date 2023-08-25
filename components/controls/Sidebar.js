import { useContext } from 'react'
import { FilterContext } from '../../context/FilterContext'

const Sidebar = () => {
  const { state, dispatch } = useContext(FilterContext)
  const show_sidebar_data = state['show_sidebar_data']

  return (
    <>
      <div
        className={`fixed top-0 right-0 z-40  h-full w-[40vw] bg-white p-10 pl-20 text-white shadow-2xl  duration-300 ease-in-out ${
          show_sidebar_data ? 'translate-x-0 ' : 'translate-x-full'
        }`}
      >
        <div className=" text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            onClick={() =>
              dispatch({ type: 'TOGGLE_SIDEBAR_DATA', payload: {} })
            }
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <h3 className="mt-20 text-4xl font-semibold ">Data will be here</h3>
        </div>
      </div>
    </>
  )
}
export default Sidebar
