import React, { useState, useRef, useEffect } from "react";
import { createWorker } from "tesseract.js";

import "./Photo.css";
const WIDTH = 320; // We will scale the photo width to this

export const Photo = ({ setBook, acceptPhoto }) => {
  const [streaming, setStreaming] = useState(false);
  const [height, setHeight] = useState(0);
  const [isPhoto, setIsPhoto] = useState(false);
  const [worker, setWorker] = useState();
  const [captureBook, setCaptureBook] = useState({ author: "", title: "" });
  const video = useRef(null);
  const canvas = useRef(null);
  const photo = useRef(null);

  const canPlay = () => {
    if (!streaming) {
      setHeight(video.current.videoHeight / (video.current.videoWidth / WIDTH));
      setStreaming(true);
    }
  };

  useEffect(() => {
    createWorker("eng").then((worker) => {
      setWorker(worker);
    });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        video.current.srcObject = stream;
        video.current.play();
      })
      .catch((err) => {
        console.error(`An error occurred: ${err}`);
      });

    video.current.addEventListener("canplay", canPlay);

    return () => worker?.terminate();
  }, []);

  useEffect(() => {
    if (streaming) {
      video.current.setAttribute("width", WIDTH);
      video.current.setAttribute("height", height);
      canvas.current.setAttribute("width", WIDTH);
      canvas.current.setAttribute("height", height);
    }
  }, [height, streaming]);

  useEffect(() => {
    if (isPhoto) {
      worker
        .recognize(photo.current)
        .then(({ data: { text } }) => {
          console.log(text);
          setCaptureBook({ title: "Hello", author: "World" });
        })
        .catch((error) => {
          console.error(error);
          clearPhoto();
        })
        .finally(() => {
          worker.reinitialize();
        });
    }
  }, [isPhoto, photo]);

  const clearPhoto = () => {
    const context = canvas.current.getContext("2d");
    context.fillStyle = "#aaaaaa";
    context.fillRect(0, 0, canvas.current.width, canvas.current.height);
    const data = canvas.current.toDataURL("image/png");
    photo.current.setAttribute("src", data);
    setIsPhoto(false);
  };

  const takePicture = () => {
    const context = canvas.current.getContext("2d");
    if (WIDTH && height) {
      context.drawImage(video.current, 0, 0, WIDTH, height);
      const data = canvas.current.toDataURL("image/png");
      photo.current.setAttribute("src", data);
      setIsPhoto(true);
    } else {
      clearPhoto();
    }
  };

  return (
    <article className="Photo">
      <div>
        <video ref={video} aria-label="Video to see book's cover">
          Video stream not available.
        </video>
      </div>
      <div>
        <canvas className="canvas" ref={canvas}></canvas>
      </div>
      <div>
        <img
          src=""
          alt="The screen capture will appear in this box."
          ref={photo}
          aria-label="Book's cover picture"
        />
      </div>
      <section className="Photo-buttons">
        <button
          className="btn"
          onClick={(ev) => {
            takePicture();
            ev.preventDefault();
          }}
          aria-label="Take a picture from book's cover"
        >
          Read cover
        </button>
        {isPhoto && (
          <button
            className="btn"
            disabled={!isPhoto}
            onClick={(ev) => {
              ev.preventDefault();
              setBook(captureBook);
              acceptPhoto(true);
            }}
            aria-label="Accept title and author from picture"
          >
            Accept Book
          </button>
        )}
      </section>
    </article>
  );
};
