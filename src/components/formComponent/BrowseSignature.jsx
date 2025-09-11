import React from 'react';

const BrowseSignature = ({ handleSignatureChange }) => {
  return (
    <div>
      <label className='mr-2'>Upload Signature:</label>
      <input type="file" accept="image/*" onChange={handleSignatureChange} />
    </div>
  );
};

export default BrowseSignature;

