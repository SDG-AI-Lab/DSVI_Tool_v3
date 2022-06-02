import { Tooltip } from "react-leaflet"
const CustomTooltip=(props)=>{
    const {direction,offset,opacity,count,bgcolor,textcolor}=props;
    return(
        <Tooltip direction={direction} offset={offset} permanent className='p-0 m-0 bg-transparent  border-none '>
            <span className={`${bgcolor}  p-1 ${textcolor} rounded-full`} style={{ opacity: {opacity} }}>
                {count == null ? 'NA' : `${' '} ${count}`}
            </span>
        </Tooltip>
    )
}
export default CustomTooltip;