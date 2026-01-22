import React, { useState } from "react";
import { Photo } from "../../components/Photo";
import { Add } from "../../components/Add";

export const NewPhoto = () => {
  const [book, setBook] = useState({ author: '', title: ''});
  const [isValidPhoto, setIsValidPhoto] = useState(false);
  return (
    <>
      <h2>New book</h2>
      {isValidPhoto ? <Add {...book}/> : <Photo setBook={setBook} acceptPhoto={setIsValidPhoto}/>}
    </>
  );
};
