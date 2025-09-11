import { PlayCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";

function LandingVideoModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const videoLinks = [
    {
      title: "Attendance",
      url:"",
    },
    {
      title: "Employee Master",
      url: "",
    },
    {
      title: "Expense Submission",
      url: "",
    },
    {
      title: "Advance Request",
      url: "",
    },
  ];

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      keyboard={false}
      className="rounded-3"
    >
      <Modal.Header
        style={{ backgroundColor: "skyblue" }}
        className="d-flex justify-content-between align-items-center"
      >
        <Modal.Title
          style={{ fontWeight: "bold", fontSize: "70px", color: "red" }}
        >
          📢 We are pleased to announce that these module has been successfully deployed to the live Mantis environment.
          {/* 📢 New Module Details */}
        </Modal.Title>
        <X
          size={22}
          role="button"
          onClick={handleClose}
          style={{ cursor: "pointer" }}
        />
      </Modal.Header>

      <Modal.Body style={{ backgroundColor: "white" }}>
        {videoLinks.map((item, idx) => (
          <Card
            key={idx}
            className="mb-3 shadow-sm border-0"
            style={{
              borderRadius: "12px",
              backgroundColor: "white",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.02)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <Card.Body
              className="d-flex align-items-center"
              style={{ backgroundColor: "whitesmoke" }}
            >
              {/* <PlayCircle size={26} color="#0d6efd" className="me-3" /> */}
              <div className="d-flex">
                <i className="fa fa-file " style={{ color: "skyblue" }}></i>
                <h6
                  style={{ fontWeight: "bold", marginBottom: "4px" }}
                  className="ml-2"
                >
                  {item.title}
                </h6>
              </div>{" "}
              <div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "14px" }}
                >
                  {item.url}
                </a>
              </div>
            </Card.Body>
          </Card>
        ))}
      </Modal.Body>

      <Modal.Footer style={{ backgroundColor: "#f7faff" }}>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LandingVideoModal;
