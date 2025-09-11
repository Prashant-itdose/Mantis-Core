import React from 'react';

export default function BrowseInput({ handleImageChange, accept }) {
  return (
    <>
      <input
        type="file"
        id="fileInput"
        onChange={handleImageChange}
        style={{ display: "", cursor: "pointer" }}
        accept={accept}
        multiple
      />
    </>
  );
}

