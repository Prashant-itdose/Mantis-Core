import React from "react";
import { Editor } from "primereact/editor";

const PrimeTextEditor = ({
  value = "",
  onChange,
  toolbarOptions = ["bold", "italic", "underline"],
  height = "320px",
}) => {
  const handleTextChange = (e) => {
    onChange?.(e.htmlValue);
  };

  const renderHeader = () => (
    <span className="ql-formats">
      {toolbarOptions.includes("bold") && (
        <button className="ql-bold" aria-label="Bold" />
      )}
      {toolbarOptions.includes("italic") && (
        <button className="ql-italic" aria-label="Italic" />
      )}
      {toolbarOptions.includes("underline") && (
        <button className="ql-underline" aria-label="Underline" />
      )}
    </span>
  );

  return (
    <div className="card">
      <Editor
        value={value}
        onTextChange={handleTextChange}
        headerTemplate={renderHeader()}
        style={{ height }}
      />
    </div>
  );
};
export default PrimeTextEditor;
