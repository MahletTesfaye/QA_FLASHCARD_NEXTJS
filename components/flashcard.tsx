import React, { useState, useEffect } from "react";
import { BiLike } from 'react-icons/bi';
import { HiSpeakerWave } from "react-icons/hi2";

const Flashcard = (props: any) => {
  const [isFlipped, setisFlipped] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const likedState = localStorage.getItem("likedState");
    if (likedState !== null) {
      setIsLiked(JSON.parse(likedState));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("likedState", JSON.stringify(isLiked));
  }, [isLiked]);

  const handleFlip = () => {
    setisFlipped((prevIsFlipped) => !prevIsFlipped);
    isFlipped && window.speechSynthesis.cancel();
  };

  const handleLike = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  const speakText = (text: any) => {
    if (window.speechSynthesis) {
      const speechSynthesisUtterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(speechSynthesisUtterance);
    } else {
      alert('Text-to-speech is not supported in this browser!');
    }
  };

  const speakAll = (e: any) => {
    e.stopPropagation();
    isFlipped ? speakText(props.answer) : speakText(props.question);
  };

  return (
    <div className="flex flex-col duration-500 hover:scale-105 cursor-pointer items-center">
      <div onClick={handleFlip} className={`card relative mt-6 ${isFlipped ? 'cardFlip' : ''}`}>
        <div className="card-front absolute top-0">
          <div className="flex flex-col bg-gray-50 shadow-md hover:shadow-lg border h-80 w-60 pt-3 px-3 rounded-2xl">
            <div className="flex justify-end">
              <HiSpeakerWave size={15} onClick={speakAll} title='speaker' />
            </div>
            <div className="flex items-center h-[75%] justify-center">
              <div className="text-center">{props.question}</div>
            </div>
          </div>
        </div>
        <div className="card-back">
          <div className="flex flex-col bg-gray-50 shadow-md hover:shadow-lg border h-80 w-60 pt-3 px-3 rounded-2xl">
            <div className="flex justify-end ">
              <HiSpeakerWave size={15} onClick={speakAll} title='speaker' />
            </div>
            <div className="flex items-center h-[80%] justify-center">
              <div className="text-center">{props.answer}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Flashcard;