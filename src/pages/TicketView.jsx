import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./KanBan.css";

const initialData = {
  columns: {
    todo: {
      id: "todo",
      title: "To-do",
      taskIds: [
        "task-1",
        "task-2",
        "task-3",
        "task-4",
        "task-5",
        "task-6",
        "task-7",
      ],
    },
    thisweek: {
      id: "thisweek",
      title: "This week",
      taskIds: ["task-8", "task-9", "task-10", "task-11", "task-12"],
    },
    inprogress: {
      id: "inprogress",
      title: "In progress",
      subtitle: "3/5",
      taskIds: ["task-13", "task-14"],
    },
    done: {
      id: "done",
      title: "Done",
      taskIds: [
        "task-15",
        "task-16",
        "task-17",
        "task-18",
        "task-19",
        "task-20",
      ],
    },
  },
  tasks: {
    "task-1": {
      id: "task-1",
      content: "Review and update sales pitch for new product",
      color: "purple",
      avatar: "👨‍💼",
    },
    "task-2": {
      id: "task-2",
      content: "Pay employee salaries",
      color: "blue",
      avatar: "👩‍💻",
    },
    "task-3": {
      id: "task-3",
      content: "Design marketing campaign",
      color: "green",
      avatar: "👨‍🎨",
    },
    "task-4": {
      id: "task-4",
      content: "Experiment with AR/VR in app",
      color: "gray",
      avatar: "👩‍🔬",
    },
    "task-5": {
      id: "task-5",
      content: "Update employee handbook with remote work policies",
      color: "purple",
      avatar: "👨‍💼",
    },
    "task-6": {
      id: "task-6",
      content: "Coordinate with influencers for upcoming promotional event",
      color: "green",
      avatar: "👩‍💼",
    },
    "task-7": {
      id: "task-7",
      content: "Implement 2FA for all systems",
      color: "yellow",
      avatar: "👨‍💻",
    },
    "task-8": {
      id: "task-8",
      content: "Prepare and send out client invoices",
      color: "blue",
      avatar: "👩‍💼",
    },
    "task-9": {
      id: "task-9",
      content: "Research market trends",
      color: "green",
      avatar: "👨‍💼",
    },
    "task-10": {
      id: "task-10",
      content: "Add AI chatbot for support",
      color: "teal",
      avatar: "👩‍💻",
    },
    "task-11": {
      id: "task-11",
      content: "Customer reported performance issue",
      color: "pink",
      avatar: "👨‍🔧",
    },
    "task-12": {
      id: "task-12",
      content: "Shortlist candidates for interviews",
      color: "purple",
      avatar: "👩‍💼",
    },
    "task-13": {
      id: "task-13",
      content: "Organize team-building event",
      color: "purple",
      avatar: "👨‍💼",
    },
    "task-14": {
      id: "task-14",
      content: "Review data pipelines for AI model training",
      color: "yellow",
      avatar: "👩‍🔬",
    },
    "task-15": {
      id: "task-15",
      content: "Evaluate sales tools",
      color: "purple",
      avatar: "👨‍💼",
      section: "Today",
    },
    "task-16": {
      id: "task-16",
      content: "Prototype voice-activated features",
      color: "gray",
      avatar: "👩‍💻",
      section: "Yesterday",
    },
    "task-17": {
      id: "task-17",
      content: "Company website is down",
      color: "pink",
      avatar: "👨‍💻",
      section: "Yesterday",
    },
    "task-18": {
      id: "task-18",
      content: "Establish mentorship program for junior staff",
      color: "purple",
      avatar: "👩‍💼",
      section: "Monday, 4 September",
    },
    "task-19": {
      id: "task-19",
      content: "Test compatibility on various devices",
      color: "teal",
      avatar: "👨‍🔧",
      section: "Friday, 1 September",
    },
    "task-20": {
      id: "task-20",
      content: "Review monthly expenditure against budget",
      color: "blue",
      avatar: "👩‍💼",
      section: "Friday, 1 September",
    },
  },
  columnOrder: ["todo", "thisweek", "inprogress", "done"],
};

const KanbanBoard = () => {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newData);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newData);
  };

  const groupTasksBySection = (taskIds, columnId) => {
    if (columnId !== "done") {
      return { "": taskIds };
    }

    const sections = {};
    taskIds.forEach((taskId) => {
      const task = data.tasks[taskId];
      const section = task.section || "";
      if (!sections[section]) {
        sections[section] = [];
      }
      sections[section].push(taskId);
    });

    return sections;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-board">
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const sections = groupTasksBySection(column.taskIds, columnId);

          return (
            <div key={column.id} className="column">
              <div className="column-header">
                <h3 className="column-title">
                  {column.title}
                  {column.subtitle && (
                    <span className="column-subtitle"> {column.subtitle}</span>
                  )}
                </h3>
                <button className="add-button">+</button>
              </div>

              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    className={`task-list ${snapshot.isDraggingOver ? "dragging-over" : ""}`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {Object.entries(sections).map(([sectionName, taskIds]) => (
                      <div key={sectionName} className="section">
                        {sectionName && (
                          <div className="section-header">{sectionName}</div>
                        )}
                        {taskIds.map((taskId, index) => {
                          const task = data.tasks[taskId];
                          const globalIndex = column.taskIds.indexOf(taskId);

                          return (
                            <Draggable
                              key={task.id}
                              draggableId={task.id}
                              index={globalIndex}
                            >
                              {(provided, snapshot) => (
                                <div
                                  className={`task-card ${task.color} ${snapshot.isDragging ? "dragging" : ""}`}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div className="task-content">
                                    {task.content}
                                  </div>
                                  <div className="task-avatar">
                                    {task.avatar}
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                      </div>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
