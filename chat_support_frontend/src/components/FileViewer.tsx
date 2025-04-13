import React, { useState, useRef } from "react";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { CHAT_SUPPORT_IMAGE_URL } from "../constants";

const FileViewer = ({ file }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1); // State to manage zoom level
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [lastTap, setLastTap] = useState(0);
  const [lastDistance, setLastDistance] = useState(0); // Track the distance between fingers for pinch-to-zoom
  const imagePath = CHAT_SUPPORT_IMAGE_URL + `/${file}`;

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setZoomLevel(1); // Reset zoom when modal is closed
    setPosition({ x: 0, y: 0 }); // Reset image position
  };

  // Handle zoom functionality using mouse wheel (for desktop)
  const handleWheel = (event) => {
    event.preventDefault();
    const zoomChange = event.deltaY > 0 ? -0.1 : 0.1; // Zoom in or out
    setZoomLevel((prevZoom) => {
      const newZoom = Math.max(1, prevZoom + zoomChange); // Prevent zooming out too much
      return newZoom;
    });
  };

  // Handle dragging of the image
  const startDrag = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setPosition((prevPosition) => ({
      x: prevPosition.x + dx,
      y: prevPosition.y + dy,
    }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  // Mobile touch events for drag
  const startTouchDrag = (e) => {
    setIsDragging(true);
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX, y: touch.clientY });
  };

  const onTouchDrag = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragStart.x;
    const dy = touch.clientY - dragStart.y;
    setPosition((prevPosition) => ({
      x: prevPosition.x + dx,
      y: prevPosition.y + dy,
    }));
    setDragStart({ x: touch.clientX, y: touch.clientY });
  };

  const stopTouchDrag = () => {
    setIsDragging(false);
  };

  // Handle double-tap zoom on mobile
  const handleDoubleTap = (e) => {
    const currentTime = new Date().getTime();
    const tapTimeout = 300; // Timeout for double-tap detection

    // Check if the time difference between the last and current tap is within the double-tap threshold
    if (currentTime - lastTap < tapTimeout) {
      // Double-tap detected, toggle zoom level
      setZoomLevel((prevZoom) => (prevZoom === 1 ? 2 : 1)); // Toggle between 1x and 2x zoom
    }

    setLastTap(currentTime);
  };

  // Pinch-to-zoom: Detects the distance between two touch points
  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];

      const currentDistance = Math.sqrt(
        (touch2.clientX - touch1.clientX) ** 2 + (touch2.clientY - touch1.clientY) ** 2
      );

      if (lastDistance) {
        const zoomChange = (currentDistance - lastDistance) / 200; // Adjust zoom sensitivity
        setZoomLevel((prevZoom) => {
          const newZoom = Math.max(1, prevZoom + zoomChange);
          return newZoom;
        });
      }

      setLastDistance(currentDistance);
    }
  };

  const handleTouchEnd = () => {
    setLastDistance(0); // Reset distance on touch end
  };

  return (
    <div>
      {/* Image preview */}
      <img
        draggable={false}
        src={imagePath}
        alt="File preview"
        style={{ objectFit: "cover", width: "200px", cursor: "pointer" }}
        onClick={openModal}
      />

      {/* Material UI Dialog Modal */}
      <Dialog open={isModalOpen} onClose={closeModal} maxWidth="sm" fullWidth>
        <DialogContent
          style={{ padding: "0" }}
          onWheel={handleWheel} // Attach wheel event to handle zoom (desktop)
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: isDragging ? "grabbing" : "grab",
              overflow: "hidden",
            }}
            onMouseDown={startDrag}
            onMouseMove={onDrag}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            onTouchStart={startTouchDrag} // Mobile touch events
            onTouchMove={(e) => {
              onTouchDrag(e);
              handleTouchMove(e); // Pinch-to-zoom handler
            }}
            onTouchEnd={(e) => {
              stopTouchDrag();
              handleTouchEnd(e); // Reset pinch zoom state
            }}
            onTouchCancel={(e) => {
              stopTouchDrag();
              handleTouchEnd(e); // Reset pinch zoom state
            }}
            onDoubleClick={handleDoubleTap} // Double tap zoom handler
          >
            {/* Close Button */}
            <IconButton
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                borderRadius: "50%",
                zIndex: 10, // Ensure the CloseIcon stays on top of the image
              }}
            >
              <CloseIcon style={{ fontSize: "30px", color: "black" }} />
            </IconButton>

            {/* Enlarged Image */}
            <img
              src={imagePath}
              draggable={false}
              alt="Enlarged File"
              style={{
                width: `${zoomLevel * 100}%`, // Adjust the width based on the zoom level
                maxHeight: "70%",
                objectFit: "contain", // Ensure the image fits within the screen
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                transform: `translate(${position.x}px, ${position.y}px)`, // Apply translation based on dragging
                transition: "transform 0.1s ease-out",
                zIndex: 0, // Ensure the image is behind the CloseIcon
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FileViewer;
