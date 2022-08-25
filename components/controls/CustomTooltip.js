import {Tooltip} from "react-leaflet"

const CustomTooltip = (props) => {

    const {direction, offset, opacity, count, bgcolor, textcolor, show_data} = props;

    if (!show_data) {
        return null;
    }

    return (<Tooltip direction={direction} offset={offset} permanent
                     className='p-0 m-0 bg-transparent  border-none'
                     style={{opacity: opacity}}>
            <span className={`${bgcolor}  p-1 ${textcolor} rounded-full`} style={{opacity: opacity}}>
              {count == null ? 'NA' : `  ${count}`}
            </span>
        </Tooltip>)
}
export default CustomTooltip;
