import React, { useEffect, useState } from "react";
import nurse from "../../../assets/image/nurse.png";
import { useDispatch, useSelector } from "react-redux";
import { GetPanelDocument } from "../../../store/reducers/common/CommonExportFunction";
import Modal from "../Modal";
import BrowseButton from "../../formComponent/BrowseButton";
import Button from "../../formComponent/Button";

const AttachDoumentModal = ({
  isuploadOpen,
  setIsuploadOpen,
  preview,
  handleImageChange,
  modelHeader
}) => {
  const dispatch = useDispatch();
  const { GetPanelDocumentList } = useSelector((state) => state.CommonSlice);
  useEffect(() => {
    dispatch(GetPanelDocument({ PanelID: 88 }));
  }, [dispatch]);

  const [isActive, setIsActive] = useState();
  const [documents, setDocuments] = useState([]);

  const handleActive = (index, document) => {
    const DataObject = { [index]: index, document: document };
    const data = documents.find((item) => item.index === index);
    if (!data?.document) {
      const mapData = documents.map((item) => {
        item.document = document;
      });
      setDocuments(mapData);
    } else {
      setDocuments((val) => [...val, DataObject]);
    }
    setIsActive(index);
  };

  return (
    <Modal
      visible={isuploadOpen}
      setVisible={() => {
        // closeCameraStream();
        setIsuploadOpen(false);
      }}
      modalWidth={`70vw`}
      Header={modelHeader}
      buttons={<>
        <BrowseButton handleImageChange={handleImageChange} accept="image/*"/>
        <Button name={"Scan Document"} type={"button"} className={'text-white'} handleClick={()=>{}} />
        </>
      }
    >
      {/* name, type, className ,handleClick */}
      <div className="row">
        <div className="col-sm-12 col-md-4">
          <div
            style={{
              minHeight: "300px",
              overflow: "scroll",
              borderRight: "3px solid grey",
              padding: "10px",
            }}
          >
            <button
              className="btn btn-sm my-1 btn-warning text-white w-100"
              style={{ background: "green" }}
            >
              Panel Required Document's
            </button>
            {GetPanelDocumentList?.map((data, index) => (
              <div
                className={`btn btn-sm my-1 btn-info text-white w-100 ${isActive === index && "active-upload-document"} `}
                key={index}
                onClick={() => {
                  handleActive(index, preview);
                }}
              >
                {data?.Document}
              </div>
            ))}
          </div>
        </div>
        <div className="col-sm-12 col-md-8">
          <div className="w-100">
            {/* <img className="w-100" src={nurse} /> */}
            <img src={preview} alt="Preview" width="100%" height="auto" />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AttachDoumentModal;
