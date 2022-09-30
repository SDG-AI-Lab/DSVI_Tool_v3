import { Popup } from "react-leaflet"
const CustomPopup=(props)=>{
    const {maxWidth,maxHeight,bgcolor,textcolor,data}=props;

    return(
        <Popup className={`p-0 m-0 rounded-lg`}>
            <ul className={`${textcolor}`}>
                {
                    data.map((val,index)=>{
                        return(
                            <li key={index}>
                                {val.key}: {val.value == null ? 'no data' : val.value}
                            </li>  
                        )
                    })
                }
            </ul> 
        </Popup>
    )
}
export default CustomPopup;



