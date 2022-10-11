import React, { useState, useEffect } from 'react';
import Control from 'react-leaflet-custom-control'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const NewLegend_2 = (props) => {
  const [showUIElements, setShowUIElements] = useState(false);
  let arrayOfLegends = props.arrayOfLegends;

  useEffect(() => {
    setShowUIElements(true);
  return () => {
  };
  }, []);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = arrayOfLegends;
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
  
    arrayOfLegends = items;
  }
  return (
    <Control position="bottomright">
      <div className='p-1 bg-[white] opacity-70 max-h-96 w-44 overflow-auto hover:overflow-scroll'>
        <h1 className='text-sm font-bold'>Legend</h1> 
        {showUIElements
          ? <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="legends">
                {(provided) => (
                  <ul className="legends" {...provided.droppableProps} ref={provided.innerRef}>
                    {arrayOfLegends.map(({id, title}, index) => {
                      return (
                        <Draggable key={id} draggableId={id.toString()} index={index}>
                          {(provided) => (
                            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <div className='p-0.5 border-t-2 border-b-2 border-gray-200'>
                                <h2 className='font-bold'>Socioeconomic Layers</h2>
                                <h3>Selected: {title}</h3>
                                <table>
                                  <tbody>
                                    <tr>
                                      <td className='bg-[#FF362C] w-5'></td>
                                      <td className='pl-1'>0 - 0.25</td>
                                      <td className='pl-1'>Very High</td>
                                    </tr>
                                    <tr>
                                      <td className='bg-[#ff962c] w-5'></td>
                                      <td className='pl-1'>0.25 - 0.55</td>
                                      <td className='pl-1'>High</td>
                                    </tr>
                                    <tr>
                                      <td className='bg-[#FFDE2C] w-5'></td>
                                      <td className='pl-1'>0.55 - 0.7</td>
                                      <td className='pl-1'>Middle</td>
                                    </tr>
                                    <tr>
                                      <td className='bg-[#00800A] w-5'></td>
                                      <td className='pl-1'>0.7 - 0.9</td>
                                      <td className='pl-1'>Low</td>
                                    </tr>
                                    <tr>
                                      <td className='bg-[#0c58ca] w-5'></td>
                                      <td className='pl-1'>0.9+</td>
                                      <td className='pl-1'>Very Low</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
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
