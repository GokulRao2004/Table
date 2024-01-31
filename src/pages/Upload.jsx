import React, { useState, useRef } from 'react';
import './upload.css';
import axios from 'axios';
import { getImageUrl } from '../utils';

export const Upload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showSuccessIcon, setShowSuccessIcon] = useState(false);
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
    handleFileSelection(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileSelection(file);
  };

  const handleFileSelection = (file) => {
    if (file && file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      setSelectedFile(file);
      setErrorMessage(null);
    } else {
      setSelectedFile(null);
      setErrorMessage('Please select any other file. Only .xlsx files are supported');
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
  
      axios
        .post('http://localhost:8085/process_excel', formData, {
          headers: {
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          },
        })
        .then((response) => {
          console.log('This is success msg');
          console.log(response.status);
          
          if (response.status === 200) {
            setUploadSuccess(true);
            setShowSuccessIcon(true);
          } 
          console.log(uploadSuccess);
          
          // Handle success
        })
        .catch((error) => {
          console.error('Error uploading file', error);
          setErrorMessage(`Error uploading file. Please try again after sometime.`);
          setUploadSuccess(false);
          setShowSuccessIcon(false);
          // Handle error
        });
    } else {
      console.warn('No file selected for upload');
      setErrorMessage('No file selected for upload')
    }
  };
  

  const handleReset = () => {
    setUploadSuccess(false);
    setSelectedFile(null);
    setErrorMessage(null);
    setShowSuccessIcon(false);
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
        {uploadSuccess ? (
  <>
    <img src={getImageUrl('verification-on-cloud.png')} alt='success-icon' className="successIcon" />
    <div className="success">File uploaded successfully</div>
    <button className="success" onClick={handleReset}>Upload Another File</button>
  </>
) : (
<>
    {errorMessage && <img src={getImageUrl('errors.png')} alt='error-icon' className="errorIcon" />}
    {!errorMessage && (
      <>
        <img src={getImageUrl('cloud-computing.png')} className='uploadImg' alt='cloud-icon' />
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          ref={(fileInput) => (fileInputRef = fileInput)}
        />
      </>
    )}
    <p className={`uploadText ${errorMessage ? 'error' : ''}`}>
      {errorMessage ? errorMessage : selectedFile ? `Selected File: ${selectedFile.name}` : 'Only .xlsx files are supported'}
    </p>
    {!uploadSuccess && (
      <>
        <button onClick={() => fileInputRef.click()}>Select File</button>
        <button onClick={handleUpload}>Upload</button>
      </>
    )}
  </>
)}
      </div>
    </div>
  );
};