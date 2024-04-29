'use client'
import React, { useState } from "react";
import { HiSpeakerWave } from "react-icons/hi2";

interface FlashcardProps {
  data: {
    id: string,
    question: string,
    answer: string,
    category: string
  }
}
const Flashcard = ({ data }: FlashcardProps) => {
  const [isFlipped, setisFlipped] = useState(false);

  const handleFlip = () => {
    setisFlipped((prevIsFlipped) => !prevIsFlipped);
    isFlipped && window.speechSynthesis.cancel();
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
    isFlipped ? speakText(data.answer) : speakText(data.question);
  };

  return (
    <div className="duration-500 hover:scale-105 cursor-pointer max:w-fit w-full">
      <div onClick={handleFlip} className={`w-full card relative ${isFlipped ? 'cardFlip' : ''}`}>
        <div className="w-full card-front absolute top-0 self-center">
          <div className="bg-gray-50 shadow-md hover:shadow-lg border h-80 max:w-64 w-full pt-3 px-3 rounded-2xl">
            <div className="flex justify-end">
              <HiSpeakerWave size={15} onClick={speakAll} title='speaker' />
            </div>
            <div className="flex items-center h-[75%] justify-center">
              <div className="text-center">{data.question}</div>
            </div>
          </div>
        </div>
        <div className="w-full card-back">
          <div className="bg-gray-50 shadow-md hover:shadow-lg border h-80 max:w-64 w-full pt-3 px-3 rounded-2xl">
            <div className="flex justify-end ">
              <HiSpeakerWave size={15} onClick={speakAll} title='speaker' />
            </div>
            <div className="flex items-center h-[80%] justify-center">
              <div className="text-center">{data.answer}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Flashcard;