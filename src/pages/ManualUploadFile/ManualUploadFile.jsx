import { useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";



const ManualUploadFile = ({ modalHead = "" }) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch()
  const {manualUploadFile} = useSelector((state)=>state.dynamicSearchSlice)
  const [manualUploadData, setManualUploadData] = useState({
    fileList: [],
    selectedType: "",
  });
  const [inputFile, setInputFile] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleReactSelect = (name, e) => {
    const {value} = e.target;
    setManualUploadData((prev) => ({ ...prev, selectedType: value }));
  };

  const handleInputRef = () => {
    inputRef.current.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInputFile(file);
    }
  };

  const handleUpload=()=>{
    if(!inputFile) return;
    setManualUploadData((prev)=>(
        {...prev, fileList: [...prev.fileList, {fileData: inputFile, fileType:manualUploadData?.selectedType}], selectedType:''}
    ))
    setInputFile(null)
  }

  const handleFileRemove = () => {
    setInputFile(null);
    inputRef.current.value = "";
  };

  const handleRemoveFile=(id)=>{
    console.log(id);

    setManualUploadData((prev) => ({
        ...prev,
        fileList: prev.fileList.filter((_, index) => index !== id),
      }));
  }

  const handleSave=()=>{
    dispatch(setManualUploadFile(manualUploadData?.fileList))
    handleClose()
  }

  console.log('manualUploadFile',manualUploadData);
  return (
    <>
      <Button
        className="upload-manauloption d-flex align-items-center"
        variant="primary"
        onClick={handleShow}
      >
        <span>{manualUploadData?.fileList?.length}</span> <span>Manual Upload</span>
      </Button>

      <Modal className={"modal_manual"} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-Title">
            {modalHead || "Patient Documents Manual Upload"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-5 col-12">
              <div className="uploadFile_input">
                {inputFile ? (
                  <span className="justify-content-between px-2">
                    {inputFile.name?.length > 20 ? inputFile?.name?.slice(0,20)+'...':inputFile?.name}{" "}
                    <i className="bi bi-trash3 mb-0" onClick={handleFileRemove}></i>
                  </span>
                ) : (
                  <span onClick={handleInputRef}>
                    Upload File <IoCloudUploadOutline fontSize={25} />
                  </span>
                )}
              </div>
              <input ref={inputRef} onChange={handleFileUpload} className="d-none" type="file"/>
            </div>
            <div className="col-md-5 col-12">
                <select
                 value={manualUploadData?.selectedType} 
                 onChange={(e)=>handleReactSelect('fileType',e)}
                 className="w-100 select_manaul">
                    <option value={""} selected>Open this select menu</option>
                    {
                        documentTypes?.map((data,idx)=>
                        <option value={data?.label}>
                           <span className="opionHover">{data?.label}</span>
                        </option>
                        )
                    }
                </select>
            </div>
            <Button onClick={handleUpload} disabled={!inputFile && !manualUploadData?.selectedType} className="col-md-2 col-2">Add</Button>
          </div>
          <div className="uploadDatafile mt-3">
                {manualUploadData?.fileList?.length > 0 && 
                <Table>
                    <thead>
                        <tr>
                            <th>File Type</th>
                            <th>File Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            manualUploadData?.fileList?.map((data, idx)=>(
                            <tr key={idx}>
                                <td>{data?.fileType}</td>
                                <td>{data?.fileData?.name}</td>
                                <td><i className="bi bi-trash3 mb-0" onClick={()=>handleRemoveFile(idx)}></i></td>
                            </tr>
                            ))
                        }
                    </tbody>
                </Table>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ManualUploadFile;