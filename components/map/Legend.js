import { useContext } from 'react';
import { LegendContext } from '../../context/LegendContext'
const Legend = (props) => {

  const { legendData, dispatch: setLegendData } = useContext(LegendContext);
  const { data, title, description } = legendData;
  if(data.length<=0 && title=="" && description=="")
  return null;
  return (
    <div className="p-1 opacity-100">

      <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white">

        <div className="px-1 py-1">
          <div className="font-bold text-sm mb-2">{title}</div>
          <p className="font-bold text-gray-700 text-xs">
            {description}
          </p>
        </div>
        {
          data.length > 0 && data.map((val, index) => {
            return (
              <div key={index}>{val.key}-{val.value}</div>
            )
          })

        }
      </div>
    </div>

  )
}
export default Legend;