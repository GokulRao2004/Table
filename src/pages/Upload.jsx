import React, { useState, useRef ,useCallback } from 'react';
import './upload.css';
import axios from 'axios';
import { getImageUrl } from '../utils';

export const Upload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showSuccessIcon, setShowSuccessIcon] = useState(false);
  const fileInputRef = useRef(null)


  const captureFileInputRef = useCallback((ref) => {
    if (ref) {
      fileInputRef.current = ref;
    }
  }, []);


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
  
    const files = e.dataTransfer.files;
    handleFileSelection(files);
  };
  
  const handleFileChange = (e) => {
    const files = e.target.files;
    handleFileSelection(files);
  };
  

  const handleFileSelection = (files) => {
    const validFiles = Array.from(files).filter((file) =>
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
  
    setSelectedFiles(validFiles);
    setErrorMessage(validFiles.length === 0 ? 'Please select one or more .xlsx files.' : null);
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      const formData = new FormData();
      selectedFiles.forEach((file, index) => {
        formData.append(`file${index}`, file);
      });
  
      axios
        .post('https://webhook.site/5855237e-7408-4f1f-a18f-efc470d57d1f', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log('This is success msg');
          console.log(response.status);
  
          if (response.status === 200) {
            setUploadSuccess(true);
            setShowSuccessIcon(true);
          }
        })
        .catch((error) => {
          console.error('Error uploading files', error);
          setErrorMessage(`Error uploading files. Please try again after some time.`);
          setUploadSuccess(false);
          setShowSuccessIcon(false);
        });
    } else {
      console.warn('No files selected for upload');
      setErrorMessage('Please select one or more files for upload');
    }
  };
  

  const handleReset = () => {
    setUploadSuccess(false);
    setSelectedFiles(0);
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
    {!errorMessage && <img src={getImageUrl('cloud-computing.png')} className='uploadImg' alt='cloud-icon' />}
      <>
        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          ref={captureFileInputRef}
          multiple
        />
      </>
    <p className={`uploadText ${errorMessage ? 'error' : ''}`}>
  {errorMessage ? errorMessage : selectedFiles.length > 0 ? `Selected Files: ${selectedFiles.map(file => file.name).join(', ')}` : 'Only .xlsx files are supported'}
    </p>
    {!uploadSuccess && (
      <>
        <button onClick={() => fileInputRef.current && fileInputRef.current.click()}>Select File</button>
        <button onClick={handleUpload}>Upload</button>
      </>
    )}
  </>
)}
      </div>
    </div>
  );
};