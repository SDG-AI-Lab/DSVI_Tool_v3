import { Tooltip } from "react-leaflet"

const CustomTooltip=(props)=>{
    const {direction,offset,opacity,count,bgcolor,textcolor,show_data,tooltipName_1,tooltipName_2}=props;
    
    const bg = getComputedStyle(document.documentElement).getPropertyValue('--custom_bg_color');
    document.documentElement.style.setProperty('--custom_bg_color', bgcolor);
  
    return (
        <Tooltip direction={direction} offset={offset} className={`p-0 m-0 border-none`} opacity={opacity}>
            <p className={`p-1 ${textcolor}`}>
                {tooltipName_1 == null ? 'Name_1: no data' : `${'Name_1: '} ${tooltipName_1}`}
                <br/>
                {tooltipName_2 == null ? 'Name_2: no data' : `${'Name_2: '} ${tooltipName_2}`}
                <br/>
                {count == null ? 'Count: No data' : `${'Count: '} ${count}`}
            </p>
        </Tooltip>
    );
}
export default CustomTooltip;