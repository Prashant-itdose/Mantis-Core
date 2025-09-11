import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Table } from "react-bootstrap";

const DragAndDropTable = ({ thead, tbody, handleOnDragEnd, uniqueID }) => {
  const isMobile = window.innerWidth <= 768;

  // Helper to reorder the items in the list after dragging
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  // Handling the drag end event
  const onDragEnd = (result) => {
    const { source, destination } = result;
    
    // Dropped outside the list
    if (!destination) {
      return;
    }
    
    const items = reorder(tbody, source.index, destination.index);
    handleOnDragEnd(items); // Update the state of tbody via the parent component
  };

  return (
    tbody?.length > 0 && (
      <div id="no-more-tables" className={`custom-scrollbar TabScroll`}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Table className="mainTable pt-2 pl-2 pr-2" bordered>
            <thead style={{ zIndex: 1 }}>
              <tr>
                {thead.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <Droppable droppableId="droppable">
              {(provided) => (
                <tbody {...provided.droppableProps} ref={provided.innerRef}>
                  {tbody.map((item, index) => {
                    const row = Object.keys(item)?.filter(
                      (key) => key !== uniqueID
                    );
                    return (
                      <Draggable
                        key={item[uniqueID]} // Ensure unique key for draggable items
                        draggableId={item[uniqueID]?.toString()} // unique draggableId
                        index={index}
                      >
                        {(provided) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {row?.map((cell, cellIndex) => (
                              <td
                                key={cellIndex}
                                data-title={thead[cellIndex]?.name || thead[cellIndex]}
                              >
                                {item[cell]?.label
                                  ? item[cell]?.label
                                  : item[cell]}
                                {isMobile && <>&nbsp;</>}
                              </td>
                            ))}
                          </tr>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </Table>
        </DragDropContext>
      </div>
    )
  );
};

export default DragAndDropTable;
