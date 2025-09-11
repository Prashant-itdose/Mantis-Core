import React from 'react';

export default function BrowseButton({ handleImageChange, accept }) {
  return (
    <>
      <input
        type="file"
        id="fileInput"
        onChange={handleImageChange}
        style={{ display: "none", cursor: "pointer" }}
        accept={accept}
        multiple
      />
      <button className="btn btn-sm">
        <label htmlFor="fileInput" className="text-white file-type-browse">
          Upload Files
        </label>
      </button>
    </>
  );
}

