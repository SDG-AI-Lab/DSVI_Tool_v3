import { Popup } from "react-leaflet"
const CustomPopup=(props)=>{
    const {maxWidth, maxHeight, bgcolor, textcolor, data, tooltipName_1, tooltipName_2, normalizeDataValue, _mean, units}=props;

    return(
        <Popup className={`p-0 m-0 rounded-lg`}>
            {/* <ul className={`${textcolor}`}>
                {
                    data.map((val,index)=>{
                        return(
                            <li key={index}>
                                {val.key}: {val.value == null ? 'no data' : val.value}
                            </li>  
                        )
                    })
                }
            </ul>  */}
            <p className={`p-1 ${textcolor}`}>
                {tooltipName_1 == null ? 'Oblast: no data' : `Oblast: ${tooltipName_1}`}
                <br/>
                {tooltipName_2 == null ? 'District: no data' : `District: ${tooltipName_2}`}
                <br/>
                {_mean == null ? 'Value: no data' : `Value: ${_mean} ${units}`}
                <br/>
            </p>
        </Popup>
    )
}
export default CustomPopup;



