import React, { useState, useEffect, useContext } from 'react';
import {FilterContext} from '../../context/FilterContext'
import Control from 'react-leaflet-custom-control'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';



const SE_Legend = (props) => {
  return (
    <div className='p-0.5 border-t-2 border-b-2 border-gray-200'>
    <h2 className='font-bold'>Socioeconomic Layers</h2>
    <h3>Selected: {props.title}</h3>
    <table>
      <tbody>
        <tr>
          <td className='bg-[#FF362C] w-5 h-5'></td>
          <td className='pl-1'>0 - 0.25</td>
          <td className='pl-1'>Very High</td>
        </tr>
        <tr>
          <td className='bg-[#ff962c] w-5 h-5'></td>
          <td className='pl-1'>0.25 - 0.55</td>
          <td className='pl-1'>High</td>
        </tr>
        <tr>
          <td className='bg-[#FFDE2C] w-5 h-5'></td>
          <td className='pl-1'>0.55 - 0.7</td>
          <td className='pl-1'>Middle</td>
        </tr>
        <tr>
          <td className='bg-[#00800A] w-5 h-5'></td>
          <td className='pl-1'>0.7 - 0.9</td>
          <td className='pl-1'>Low</td>
        </tr>
        <tr>
          <td className='bg-[#0c58ca] w-5 h-5'></td>
          <td className='pl-1'>0.9+</td>
          <td className='pl-1'>Very Low</td>
        </tr>
      </tbody>
    </table>
  </div>
  );
}

const GeoLegend = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState(null);

  let url = `http://129.151.248.181:8080/geoserver/sdg-ai-lab/wms?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetLegendGraphic&FORMAT=application/json&LAYER=${props.layer}`;
  
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
            setItems(result);
            setIsLoaded(true);  
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  let arrayLegends = [];
  if (items) {
    arrayLegends = items.Legend[0].rules[0].symbolizers[0].Raster.colormap.entries;
  }
 
  if (error) {
    return <div className='p-0.5 border-t-2 border-b-2 border-gray-200'>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div className='p-0.5 border-t-2 border-b-2 border-gray-200'>Loading...</div>;
  } else {
    return (
      <div className='p-0.5 border-t-2 border-b-2 border-gray-200'>
        <h2 className='font-bold'>Geodata Layers</h2>
        <h3>Selected: {props.title}</h3>
        <table>
          <tbody>
          {arrayLegends.map(({color, label, quantity}, index) => {
            return (
              <tr key={label}>
                <td className='w-5 h-5' style={{backgroundColor: color}}></td>
                <td className='pl-1'>{index !== arrayLegends.length-1 ?`${Number.parseFloat(quantity).toFixed(2)} - ${Number.parseFloat(arrayLegends[index+1].quantity).toFixed(2)}` : `${Number.parseFloat(quantity).toFixed(2)}+`}</td>
                <td className='pl-1'>{getWordExplanation(index)}</td>
              </tr>
            )})
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const Cats_Legend = (props) => {
  return (
    <div className='p-0.5 border-t-2 border-b-2 border-gray-200'>
    <h2 className='font-bold'>Vulnerability</h2> 
    <h3>Selected: Categories | {props.title}</h3>
    <table>
      <tbody>
        <tr>
          <td>
            <div className="w-3 h-3 rounded-full" style={{backgroundColor: props.color}}></div>
          </td>
          <td className='pl-1'>{props.title}</td>
        </tr>
        {/* <tr>
          <td className='bg-red-500 w-5 h-5 rounded-full'></td>
          <td className='pl-1'>Very High</td>
        </tr>
        <tr>
          <td className='bg-orange-500 w-5 h-5 rounded-full'></td>
          <td className='pl-1'>High</td>
        </tr>
        <tr>
          <td className='bg-yellow-500 w-5 h-5 rounded-full'></td>
          <td className='pl-1'>Medium</td>
        </tr>
        <tr>
          <td className='bg-green-500 w-5 h-5 rounded-full'></td>
          <td className='pl-1'>Low</td>
        </tr>
        <tr>
          <td className='bg-blue-500 w-5 h-5 rounded-full'></td>
          <td className='pl-1'>Very Low</td>
        </tr> */}
      </tbody>
    </table>
  </div>
  );
}

const getWordExplanation = (index => {
  switch (index) {
    case 0: return 'Very Low';
    case 1:  return 'Low';
    case 2: return 'Middle';
    case 3:  return 'High';
    case 4: return 'Very High';
    default: return 'Not defined';
  }
})

const NewLegend_2 = (props) => {
  const [showUIElements, setShowUIElements] = useState(false);
  const {state, dispatch} = useContext(FilterContext);
  const vulnerability = state["vulnerability"];
  const activeLegends = state['activeLegends'];

  useEffect(() => {
    setShowUIElements(true);
    return () => {
    setShowUIElements(false);
    };
  }, []);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = activeLegends;
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch({ type: "CHANGE_ACTIVE_LEGENDS", payload: items });
  }

  return (
    <Control position="bottomright">
      <div className='p-1 bg-[white] opacity-70 max-h-96 overflow-auto hover:overflow-scroll'>
        <h1 className='text-sm font-bold'>Legend</h1> 
        {showUIElements
          ? <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="legends">
                {(provided) => (
                  <ul className="legends" {...provided.droppableProps} ref={provided.innerRef}>
                    {activeLegends.map((item, index) => {
                      return (
                        <Draggable key={index} draggableId={(index).toString()} index={index}>
                          {(provided) => (
                            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              { item.slug.indexOf("se_") === 0 ? <SE_Legend title={item.title}/> : null }
                              { item.slug.indexOf("sv_") === 0 ? <GeoLegend title={item.title} layer={item.layer}/> : null }
                              { item.slug.indexOf("cats_") === 0 && vulnerability
                                ? <Cats_Legend title={item.title} color={item.color}/> : null }
                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          : null}
      </div>
    </Control> 
  )
}

export default NewLegend_2;
