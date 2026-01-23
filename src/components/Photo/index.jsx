import React, { useState, useRef, useEffect } from "react";
import { createWorker } from "tesseract.js";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";

import * as mobilenet from "@tensorflow-models/mobilenet";

import "./Photo.css";
const WIDTH = 320; // We will scale the photo width to this

export const Photo = ({ setBook, acceptPhoto }) => {
  const [streaming, setStreaming] = useState(false);
  const [height, setHeight] = useState(0);
  const [isCameraFired, setCameraFired] = useState(false);
  const [isBookPhoto, setIsBookPhoto] = useState(false);
  const [worker, setWorker] = useState(null);
  const [model, setModel] = useState(null);
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
    Promise.all([
      createWorker("eng"),
      navigator.mediaDevices.getUserMedia({ video: true, audio: false }),
      mobilenet.load({ version: 2, alpha: 0.5 }),
    ])
      .then(([worker, stream, model]) => {
        setWorker(worker);
        video.current.srcObject = stream;
        video.current.play();
        setModel(model);
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
      const context = canvas.current.getContext("2d");
      context.drawImage(canvas.current, 0, 0, WIDTH, height);
      const data = canvas.current.toDataURL("image/png");
      photo.current.setAttribute("src", data);
    }
  }, [height, streaming]);

  useEffect(() => {
    if (isCameraFired) {
      model
        .classify(photo.current)
        .then((prediction) =>
          prediction.some(({ className }) => /book/i.test(className))
            ? Promise.resolve()
            : Promise.reject(new Error("It is not a book cover!")),
        )
        .then(() =>
          worker.recognize(photo.current).then(({ data: { text } }) => {
            const [author, ...title] = text.split("\n");
            setCaptureBook({ title: title.join(" "), author });
            setIsBookPhoto(true);
          }),
        )
        .catch((error) => {
          console.error(error);
          setIsBookPhoto(false);
        })
        .finally(() => {
          worker.reinitialize();
          setCameraFired(false);
        });
    }
  }, [isCameraFired, photo]);

  const clearPhoto = () => {
    const context = canvas.current.getContext("2d");
    context.fillStyle = "#aaaaaa";
    context.fillRect(0, 0, canvas.current.width, canvas.current.height);
    const data = canvas.current.toDataURL("image/png");
    photo.current.setAttribute("src", data);
    setCameraFired(false);
  };

  const takePicture = () => {
    const context = canvas.current.getContext("2d");
    if (WIDTH && height) {
      context.drawImage(video.current, 0, 0, WIDTH, height);
      const data = canvas.current.toDataURL("image/png");
      photo.current.setAttribute("src", data);
      setIsBookPhoto(false);
      setCameraFired(true);
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
        {model && (
          <>
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

            <button
              className={isBookPhoto ? "btn" : "btn btn-disabled"}
              disabled={!isBookPhoto}
              onClick={(ev) => {
                ev.preventDefault();
                setBook(captureBook);
                acceptPhoto(true);
              }}
              aria-label="Accept title and author from picture"
            >
              Accept Book
            </button>
          </>
        )}
      </section>
    </article>
  );
};
