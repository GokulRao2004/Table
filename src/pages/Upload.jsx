import React, { useState, useRef } from 'react'
import './upload.css'
import axios from 'axios'
import { getImageUrl } from '../utils';

export const Upload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  var fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      axios
        .post('http://localhost:8085/process_excel', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log("This is success msg")
          console.log(response.data);
          // Handle success
        })
        .catch((error) => {
          console.log("This is failure")
          console.error('Error uploading file', error);
          // Handle error
        });




    } else {
      console.warn('No file selected for upload');
    }
  };

  return (
    <div className='container'>
      <h1 className='title'>SLN & CO</h1>
      <div className='upload'>Upload Files Here </div>
      <div
        className={`file-upload-box ${isDragging ? 'dragging' : ''}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        
        <img src={getImageUrl('cloud-computing.png')} className='uploadImg'></img>
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          ref={(fileInput) => (fileInputRef = fileInput)}
        />
        <p className='uploadText'>{selectedFile ? `Selected File: ${selectedFile.name}` : 'Only .xlsx files are supported'}</p>

        <button onClick={() => fileInputRef.click()}>Select File</button>
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};
