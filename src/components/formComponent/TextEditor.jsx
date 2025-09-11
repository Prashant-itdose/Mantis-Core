import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = ({ value, onChange }) => {
    return (
        <div className="col-12" style={{height:"auto" ,marginBottom:"8px" ,marginTop:"3px"}}>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default TextEditor;



