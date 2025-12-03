import React, { useRef, useState } from "react";
import { IoIosCloudUpload } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { FaFileMedical } from "react-icons/fa6";

import "./fileUpload.css";

const FileUpload = ({
  selectedFiles,
  onFileSelect,
  onFileRemove,
  maxFileSize = 10 * 1024 * 1024, // 10MB
  maxNumber,
  acceptMultiple,
}) => {
  const fileInputRef = useRef(null);

  // Error state
  const [error, setError] = useState("");

  // Handle file upload click
  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  // Handle file input change
  const handleFileChange = (e) => {
    if (e.target.files.length) {
      handleFileSelection(e.target.files[0]);
    }
  };

  // Handle drag over event
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    setError("");
    if (e.dataTransfer.files.length) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  // Validate and handle file selection
  const handleFileSelection = (file) => {
    // Validate file type and size
    const validTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];
    const maxSize = maxFileSize;

    // Validate file type
    if (!validTypes.includes(file.type)) {
      setError("Please select a PDF, JPG, or PNG file.");
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      setError("File size must be less than 10MB.");
      return;
    }

    // Add file
    onFileSelect(file);
  };

  return (
    <div className="form-section">
      <h3 className="section-title">
        <IoIosCloudUpload />
        Document Attachment
      </h3>

      <div
        className="file-upload"
        onClick={handleFileUploadClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <i className="upload-icon">
          <IoIosCloudUpload />
        </i>
        <p>Drag & drop files here or click to browse</p>
        <small>Supports PDF, JPG, PNG files (Max: 10MB)</small>
        <input
          type="file"
          ref={fileInputRef}
          className="file-input"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
        />
      </div>
      {error && <div className="error-message">{error}</div>}

      {/* File previews */}
      {selectedFiles &&
        selectedFiles.map((selectedFile, i) => (
          <div key={i} className="file-preview active">
            <div className="file-item">
              <div className="file-info">
                <i className="file-icon">
                  <FaFileMedical />
                </i>
                <span className="file-name">{selectedFile.name}</span>
              </div>
              <button
                type="button"
                className="file-remove"
                onClick={() => onFileRemove(i)}
              >
                <IoClose />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FileUpload;
