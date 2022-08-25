import {useContext} from 'react';
import Control from 'react-leaflet-custom-control'
import {FilterContext} from '../../context/FilterContext'

const ControlMenu = (props) => {
    const {position, show_data, show_sidebar_data} = props;
    const {dispatch} = useContext(FilterContext);
    return (<>
            <Control position={position}>
                <div className="border-black flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className={`transition ease-in-out delay-150 hover:scale-110 hover:bg-white-500 duration-300 bg-white cursor-pointer border-blue-600 border-2 p-1 h-11 w-11 bg-opacity-75 ${show_data === true ? 'stroke-blue-500' : 'stroke-black-50'}`}
                         fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                         onClick={(e) => {
                             e.stopPropagation();
                             e.preventDefault();

                             dispatch({type: "TOGGLE_SHOW_DATA", payload: {}})
                         }}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/>
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg"
                         className={`transition ease-in-out delay-150 hover:scale-110 hover:bg-white-500 duration-300 ml-2 cursor-pointer bg-white border-blue-600 border-2 p-2 h-11 w-11 bg-opacity-75 ${show_sidebar_data === true ? 'stroke-blue-500' : 'stroke-black-50'}`}
                         fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                         onClick={(e) => {
                             e.stopPropagation();
                             e.preventDefault();

                             dispatch({type: "TOGGLE_SIDEBAR_DATA", payload: {}})
                         }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8m-8 6h16"/>
                    </svg>
                </div>
            </Control>
            {props.children && <Control position={position}>
                {props.children}
            </Control>}
        </>
    )
}
export default ControlMenu;
