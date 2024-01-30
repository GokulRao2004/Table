import React, { useState, useRef } from 'react'
import './upload.css'
import axios from 'axios'

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

      // fetch('https://ada6-101-0-63-107.ngrok-free.app/api/upload', {
      //   method: 'POST',
      //   body: formData,
      // })
      //   .then(response => response.json())
      //   .then(data => {
      //     console.log('Upload successful:', data);
      //     // Optionally, you can perform actions based on the API response
      //   })
      //   .catch(error => {
      //     console.error('Error uploading file:', error);
      //   });

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

    <div
      className={`file-upload-box ${isDragging ? 'dragging' : ''}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        ref={(fileInput) => (fileInputRef = fileInput)}
      />
      <p>{selectedFile ? `Selected File: ${selectedFile.name}` : 'Drag and drop a file here or click to select'}</p>
      <button onClick={() => fileInputRef.click()}>Select File</button>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};
