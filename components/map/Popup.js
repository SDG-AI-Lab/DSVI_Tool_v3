import { Popup } from "react-leaflet"
const CustomPopup=(props)=>{
    const {maxWidth,maxHeight,bgcolor,textcolor,data}=props;
    return(
        <Popup maxWidth={maxWidth} maxHeight={maxHeight} className={`${bgcolor} p-0 m-0 rounded-lg`}>
        <div className='w-full '>
            {
                data.map((val,index)=>{
                    return(
                        <div key={index} className={`${textcolor} font-bold text-xs`}>
                        {val.key}:- {' '}<span className=''>{val.value == null ? 'No Data' : val.value}</span><br />
                      </div>  
                    )
                })
            }
        </div> </Popup>
    )
}
export default CustomPopup;



