import { useContext } from 'react';
import { LegendContext } from '../../context/LegendContext'
const Legend=(props)=>{
    const {title,description,data,count,bgcolor,textcolor,show_data}=props;
    const { legendData, dispatch: setLegendData } = useContext(LegendContext);
    return(
        <div className="p-1 opacity-60">  
    
        <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white">
        
          <div className="px-1 py-1">
            <div className="font-bold text-sm mb-2">adssssss{JSON.stringify(legendData)}</div>
            <p className="font-bold text-gray-700 text-xs">
             {description}
            </p>
          </div>
{
    data && data.map((val,index)=>{
        return(
            <div key={index}>{val.key}-{val.value}</div>
        )
    })
}
        </div>
      </div>
    
    )
}
export default Legend;