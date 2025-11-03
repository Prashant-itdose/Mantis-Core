import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./KanBan.css";
import Heading from "../components/UI/Heading";
import axios from "axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { headers } from "../utils/apitools";
import { apiUrls } from "../networkServices/apiEndpoints";
import { useCryptoLocalStorage } from "../utils/hooks/useCryptoLocalStorage";
import Input from "../components/formComponent/Input";
import Loading from "../components/loader/Loading";
import MultiSelectComp from "../components/formComponent/MultiSelectComp";
import Modal from "../components/modalComponent/Modal";
import KanbanNewTicketModal from "../components/UI/customTable/KanbanNewTicketModal";
import { axiosInstances } from "../networkServices/axiosInstance";

// Function to transform API response to kanban data structure
const transformApiDataToKanban = (apiData) => {
  const tasks = {};
  const columnOrder = ["todo", "thisweek", "inprogress", "done"];

  // Initialize empty arrays if they don't exist
  const allTickets = apiData.allTickets || [];
  const currentWeekTickets = apiData.currentWeekTickets || [];
  const inProgressTickets = apiData.InProgress || [];
  const doneTickets = apiData.IsResolved || [];

  // Transform all tickets to tasks (todo column) - BLUE
  allTickets.forEach((ticket) => {
    const taskId = `task-${ticket.TicketID}`;
    if (!tasks[taskId]) {
      tasks[taskId] = {
        id: taskId,
        content: ticket.summary,
        color: "blue", // All tickets get blue color
        avatar: getRandomAvatar(),
        originalData: ticket,
      };
    }
  });

  // Transform current week tickets - ORANGE
  currentWeekTickets.forEach((ticket) => {
    const taskId = `task-${ticket.TicketID}`;
    if (!tasks[taskId]) {
      tasks[taskId] = {
        id: taskId,
        content: ticket.summary,
        color: "pink",
        avatar: getRandomAvatar(),
        originalData: ticket,
      };
    }
  });

  // Transform in progress tickets - YELLOW
  inProgressTickets.forEach((ticket) => {
    const taskId = `task-${ticket.TicketID}`;
    if (!tasks[taskId]) {
      tasks[taskId] = {
        id: taskId,
        content: ticket.summary,
        color: "yellow", // In progress tickets get yellow color
        avatar: getRandomAvatar(),
        originalData: ticket,
      };
    }
  });

  // Transform done tickets - GREEN
  doneTickets.forEach((ticket) => {
    const taskId = `task-${ticket.TicketID}`;
    if (!tasks[taskId]) {
      tasks[taskId] = {
        id: taskId,
        content: ticket.summary,
        color: "green", // Done tickets get green color
        avatar: getRandomAvatar(),
        section: formatDate(ticket.TicketRaisedDate),
        originalData: ticket,
      };
    }
  });

  const columns = {
    todo: {
      id: "todo",
      title: "Assigned",
      // title: "To-do",
      taskIds: allTickets.map((ticket) => `task-${ticket.TicketID}`),
    },
    thisweek: {
      id: "thisweek",
      // title: "This week",
      title: "Planned",
      taskIds: currentWeekTickets.map((ticket) => `task-${ticket.TicketID}`),
    },
    inprogress: {
      id: "inprogress",
      title: "In progress",
      taskIds: inProgressTickets.map((ticket) => `task-${ticket.TicketID}`),
    },
    done: {
      id: "done",
      title: "Resolved",
      taskIds: doneTickets.map((ticket) => `task-${ticket.TicketID}`),
    },
  };

  return {
    tasks,
    columns,
    columnOrder,
  };
};

// Helper functions
const getRandomAvatar = () => {
  const avatars = ["👨‍💻"];
  // const avatars = ["👨‍💼", "👩‍💻", "👨‍🎨", "👩‍🔬", "👩‍💼", "👨‍💻", "👨‍🔧"];
  return avatars[Math.floor(Math.random() * avatars.length)];
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
    const year = String(date.getFullYear()).slice(-2); // last 2 digits
    return `${day}/${month}/${year}`;
  } catch (error) {
    return "";
  }
};

// Format time for display
const formatTime = (timeString) => {
  if (!timeString) return "";
  return timeString.split(":").slice(0, 2).join(":");
};

// Avatar Tooltip Component - For inprogress and done columns
const AvatarTooltip = ({ task, isVisible, columnId }) => {
  if (!isVisible || !task.originalData) return null;

  const originalData = task.originalData;

  return (
    <div className="avatar-tooltip">
      <div className="tooltip-content">
        <div className="tooltip-row">
          <span className="tooltip-label">Developer: </span>
          <span className="tooltip-value">
            {originalData.DeveloperName || "N/A"}
          </span>
        </div>
        {columnId === "inprogress" && (
          <>
            <div className="tooltip-row">
              <span className="tooltip-label">StartDate: </span>
              <span className="tooltip-value">
                {originalData.Date ? formatDate(originalData.Date) : "N/A"}
              </span>
            </div>
            <div className="tooltip-row">
              <span className="tooltip-label">StartTime: </span>
              <span className="tooltip-value">
                {originalData.Time ? formatTime(originalData.Time) : "N/A"}
              </span>
            </div>
          </>
        )}
        {/* Additional info for done column */}
        {columnId === "done" && (
          <>
            <div className="tooltip-row">
              <span className="tooltip-label">EndDate: </span>
              <span className="tooltip-value">
                {originalData.Date ? formatDate(originalData.Date) : "N/A"}
              </span>
            </div>
            <div className="tooltip-row">
              <span className="tooltip-label">EndTime: </span>
              <span className="tooltip-value">
                {originalData.Time ? formatTime(originalData.Time) : "N/A"}
              </span>
            </div>
          </>
        )}
      </div>
      <div className="tooltip-arrow"></div>
    </div>
  );
};

// Task Avatar Component with Hover - Shows tooltip for inprogress and done columns
const TaskAvatar = ({ task, columnId }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Enable tooltip for inprogress and done columns
  const showTooltipForColumn = columnId === "inprogress" || columnId === "done";

  return (
    <div
      className="task-avatar-container"
      onMouseEnter={() => showTooltipForColumn && setShowTooltip(true)}
      onMouseLeave={() => showTooltipForColumn && setShowTooltip(false)}
    >
      <div className="task-avatar">{task.avatar}</div>
      {showTooltipForColumn && (
        <AvatarTooltip
          task={task}
          isVisible={showTooltip}
          columnId={columnId}
        />
      )}
    </div>
  );
};

// Component to render task content
const TaskContent = ({ task, columnId }) => {
  return (
    <div className="task-content">
      <div className="task-summary">
        <strong>Summary:</strong>
        {task.content}
      </div>
      <div className="task-summary">
        <strong>TicketID:</strong>
        {task.originalData?.TicketID}
      </div>
         <div className="task-summary">
        <strong>Total ManMinutes:</strong>
        {/* {task.originalData?.TicketID}  */}
      </div>
    </div>
  );
};

const KanbanBoard = () => {
  const [data, setData] = useState({
    tasks: {},
    columns: {
      todo: { id: "todo", title: "Assigned", taskIds: [] },
      thisweek: { id: "thisweek", title: "Planned", taskIds: [] },
      inprogress: { id: "inprogress", title: "In progress", taskIds: [] },
      done: { id: "done", title: "Done", taskIds: [] },
    },
    columnOrder: ["todo", "thisweek", "inprogress", "done"],
  });

  const [t] = useTranslation();
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [assignto, setAssignedto] = useState([]);
  const [formData, setFormData] = useState({
    AssignedTo: [Number(useCryptoLocalStorage("user_Data", "get", "ID"))]
      ? [Number(useCryptoLocalStorage("user_Data", "get", "ID"))]
      : [],
  });

  const userData = useCryptoLocalStorage("user_Data", "get");
  const ReportingManager = userData?.IsReportingManager;
  const IsEmployee = userData?.realname;
  const userId = userData?.ID;

  // Function to check if drag and drop is allowed between columns
  const isDragAllowed = (sourceColumnId, destinationColumnId) => {
    // ToDo: No drag and drop allowed (cannot be moved to any column)
    if (sourceColumnId === "todo") {
      return false;
    }

    // ThisWeek: Can only be moved to InProgress
    if (sourceColumnId === "thisweek") {
      return destinationColumnId === "inprogress";
    }

    // InProgress: Can only be moved to Done
    if (sourceColumnId === "inprogress") {
      return destinationColumnId === "done";
    }

    // Done: No drag and drop allowed (cannot be moved back)
    if (sourceColumnId === "done") {
      return false;
    }

    return false;
  };

  // Function to disable dragging for specific columns
  const isDraggingDisabled = (columnId) => {
    return columnId === "todo" || columnId === "done";
  };

  // Function to check if a column can accept drops
  const isDropDisabled = (columnId) => {
    // Only "inprogress" and "done" can accept drops
    return columnId !== "inprogress" && columnId !== "done";
  };

  // Function to handle manhour entry when ticket is moved to In Progress
  const handleCreateManhourEntry = (ticketData) => {
    if (!ticketData || !ticketData.originalData) {
      toast.error("Invalid ticket data");
      return;
    }

    const originalTicket = ticketData.originalData;

    // let form = new FormData();
    // form.append("ID", userId);
    // form.append("LoginName", IsEmployee);
    // form.append("TicketID", originalTicket.TicketID || "");
    // form.append("EmployeeID", originalTicket?.EmployeeID || "");
    // form.append("Action", "START");
    // form.append("Status", "0");
    // form.append("timeValue", new Date().toTimeString().split(" ")[0]);
    // form.append("Date", new Date().toISOString().split("T")[0]);

    // axios
    //   .post(apiUrls?.CreateManhourEntry, form, { headers })
    axiosInstances
      .post(apiUrls.CreateManhourEntry, {
        TicketID: originalTicket.TicketID || "",
        EmployeeID: originalTicket?.EmployeeID || "",
        Action: "START",
        Status: "0",
        timeValue: new Date().toTimeString().split(" ")[0],
        Date: new Date().toISOString().split("T")[0],
      })
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          handleSearchEmployee();
          handleSearchList();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log("Error creating manhour entry:", err);
        toast.error("Failed to create manhour entry");
      });
  };

  // Function to handle manhour entry when ticket is moved to Done
  const handleCreateDone = (ticketData) => {
    if (!ticketData || !ticketData.originalData) {
      toast.error("Invalid ticket data");
      return;
    }

    const originalTicket = ticketData.originalData;

    // let form = new FormData();
    // form.append("ID", userId);
    // form.append("LoginName", IsEmployee);
    // form.append("TicketID", originalTicket.TicketID || "");
    // form.append("EmployeeID", originalTicket?.EmployeeID || "");
    // form.append("Action", "STOP");
    // form.append("Status", "1");
    // form.append("timeValue", new Date().toTimeString().split(" ")[0]);
    // form.append("Date", new Date().toISOString().split("T")[0]);

    // axios
    //   .post(apiUrls?.CreateManhourEntry, form, { headers })
    axiosInstances
      .post(apiUrls.CreateManhourEntry, {
        TicketID: originalTicket.TicketID || "",
        EmployeeID: originalTicket?.EmployeeID || "",
        Action: "STOP",
        Status: "1",
        timeValue: new Date().toTimeString().split(" ")[0],
        Date: new Date().toISOString().split("T")[0],
      })
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          handleSearchEmployee();
          handleSearchList();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log("Error creating manhour entry:", err);
        toast.error("Failed to create manhour STOP entry");
      });
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // If there's no destination, do nothing
    if (!destination) {
      return;
    }

    // Check if drag is allowed between these columns
    if (!isDragAllowed(source.droppableId, destination.droppableId)) {
      toast.error("This move is not allowed");
      return;
    }

    // If dropped in the same position, do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    // Check if moving from "thisweek" to "inprogress"
    const isMovingToInProgress =
      source.droppableId === "thisweek" &&
      destination.droppableId === "inprogress";

    // Check if moving from "inprogress" to "done"
    const isMovingToDone =
      source.droppableId === "inprogress" && destination.droppableId === "done";

    // Get the task being moved
    const movedTask = data.tasks[draggableId];

    // Start moving within the same column (only allowed for columns that can be reordered)
    if (start.id === finish.id) {
      // Only allow reordering within same column for columns that are not restricted
      if (start.id === "todo" || start.id === "done") {
        toast.error("Reordering within this column is not allowed");
        return;
      }

      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newState);
      return;
    }

    // Moving from one column to another
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

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newState);

    // If moving from "thisweek" to "inprogress", trigger manhour START API call
    if (isMovingToInProgress && movedTask) {
      handleCreateManhourEntry(movedTask);
    }

    // If moving from "inprogress" to "done", trigger manhour STOP API call
    if (isMovingToDone && movedTask) {
      handleCreateDone(movedTask);
    }
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

  const getAssignTo = () => {
    axiosInstances
      .post(apiUrls.AssignTo_Select, {
        ID: userId,
      })
      .then((res) => {
        const assigntos = res?.data.data.map((item) => {
          return { name: item?.Name, code: item?.ID };
        });
        setAssignedto(assigntos);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMultiSelectChange = (name, selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.code);
    setFormData((prev) => ({
      ...prev,
      [name]: selectedValues,
    }));
  };

  const handleSearchList = () => {
    setLoading(true);
    axiosInstances
      .post(apiUrls.GetKanbanViewList, {
        AssignToID: formData?.AssignedTo ? formData.AssignedTo.join(",") : "0",
      })
      .then((res) => {
        if (res?.data?.success === true) {
          setTableData(res?.data?.data);
          const kanbanData = transformApiDataToKanban(res?.data?.data);
          setData(kanbanData);
        } else {
          toast.error("No Record Found.");
          setTableData([]);
          // Reset to empty state if no data
          setData({
            tasks: {},
            columns: {
              todo: { id: "todo", title: "Assigned", taskIds: [] },
              thisweek: { id: "thisweek", title: "Planned", taskIds: [] },
              inprogress: {
                id: "inprogress",
                title: "In progress",
                taskIds: [],
              },
              done: { id: "done", title: "Done", taskIds: [] },
            },
            columnOrder: ["todo", "thisweek", "inprogress", "done"],
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleSearchEmployee = () => {
    setLoading(true);
    axiosInstances
      .post(apiUrls.GetKanbanViewList, {
        AssignToID: userId,
      })
      .then((res) => {
        if (res?.data?.success === true) {
          setTableData(res?.data?.data);
          const kanbanData = transformApiDataToKanban(res?.data?.data);
          setData(kanbanData);
        } else {
          toast.error("No Record Found.");
          setTableData([]);
          // Reset to empty state if no data
          setData({
            tasks: {},
            columns: {
              todo: { id: "todo", title: "Assigned", taskIds: [] },
              thisweek: { id: "thisweek", title: "Planned", taskIds: [] },
              inprogress: {
                id: "inprogress",
                title: "In progress",
                taskIds: [],
              },
              done: { id: "done", title: "Done", taskIds: [] },
            },
            columnOrder: ["todo", "thisweek", "inprogress", "done"],
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getAssignTo();
    if (ReportingManager == 1) {
      handleSearchList();
    } else {
      handleSearchEmployee();
    }
  }, []);

  const [visible, setVisible] = useState({
    showVisible: false,
    showData: {},
  });
  return (
    <>
      {visible?.showVisible && (
        <Modal
          modalWidth={"800px"}
          visible={visible}
          setVisible={setVisible}
          Header={t("Ticket Details")}
        >
          <KanbanNewTicketModal visible={visible} setVisible={setVisible} />
        </Modal>
      )}
      <div className="card">
        <Heading isBreadcrumb={true} />
        <div className="row p-2">
          {ReportingManager == 1 ? (
            <MultiSelectComp
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              name="AssignedTo"
              placeholderName={t("Employee")}
              dynamicOptions={assignto}
              optionLabel="AssignedTo"
              className="AssignedTo"
              handleChange={handleMultiSelectChange}
              value={formData?.AssignedTo?.map((code) => ({
                code,
                name: assignto.find((item) => item.code === code)?.name,
              }))}
            />
          ) : (
            <Input
              type="text"
              respclass="col-xl-2 col-md-4 col-sm-6 col-12"
              className="form-control"
              placeholder=" "
              lable="Employee"
              id="AssignedTo"
              name="AssignedTo"
              value={IsEmployee}
              disabled={true}
            />
          )}
          {ReportingManager == 1 ? (
            <div>
              {loading ? (
                <Loading />
              ) : (
                <button
                  className="btn btn-sm btn-info ml-2"
                  onClick={handleSearchList}
                  disabled={loading}
                >
                  Search
                </button>
              )}
            </div>
          ) : (
            <div>
              {loading ? (
                <Loading />
              ) : (
                <button
                  className="btn btn-sm btn-info ml-2"
                  onClick={handleSearchEmployee}
                  disabled={loading}
                >
                  Search
                </button>
              )}
            </div>
          )}
        </div>

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
                        <span className="column-subtitle">
                          {" "}
                          {column.subtitle}
                        </span>
                      )}
                      <span className="task-count">
                        {" "}
                        ({column.taskIds.length})
                      </span>
                    </h3>
                  </div>

                  <Droppable
                    droppableId={column.id}
                    isDropDisabled={isDropDisabled(columnId)}
                  >
                    {(provided, snapshot) => (
                      <div
                        className={`task-list ${snapshot.isDraggingOver ? "dragging-over" : ""}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {Object.entries(sections).map(
                          ([sectionName, taskIds]) => (
                            <div key={sectionName} className="section">
                              {sectionName && (
                                <div className="section-header">
                                  {sectionName}
                                </div>
                              )}
                              {taskIds.map((taskId, index) => {
                                const task = data.tasks[taskId];
                                if (!task) return null;

                                return (
                                  <Draggable
                                    key={task.id}
                                    draggableId={task.id}
                                    index={column.taskIds.indexOf(taskId)}
                                    isDragDisabled={isDraggingDisabled(
                                      columnId
                                    )}
                                  >
                                    {(provided, snapshot) => (
                                      <div
                                        className={`task-card ${task.color} ${snapshot.isDragging ? "dragging" : ""} ${isDraggingDisabled(columnId) ? "drag-disabled" : ""}`}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <TaskContent
                                          task={task}
                                          columnId={columnId}
                                        />
                                        {/* Pass columnId to TaskAvatar to conditionally show tooltip */}
                                        <TaskAvatar
                                          task={task}
                                          columnId={columnId}
                                        />
                                        <i
                                          className="fa fa-eye ml-2 mt-1"
                                          onClick={() => {
                                            setVisible({
                                              showVisible: true,
                                              showData: task,
                                              task,
                                            });
                                          }}
                                          style={{
                                            marginLeft: "10px",
                                            color: "black",
                                            cursor: "pointer",
                                          }}
                                          title="Click to Ticket Details."
                                        ></i>
                                      </div>
                                    )}
                                  </Draggable>
                                );
                              })}
                            </div>
                          )
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      </div>
    </>
  );
};

export default KanbanBoard;
