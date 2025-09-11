import React from 'react';

const BrowseImage = ({ handlePhotoChange }) => {
  return (
    <div>
      <label className='mr-2'>Upload Image:</label>
      <input type="file" accept="image/*" onChange={handlePhotoChange} />
    </div>
  );
};

export default BrowseImage;


