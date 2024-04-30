'use client'
import React, { useState } from "react";
import { HiSpeakerWave } from "react-icons/hi2";
import { BiSolidVolumeMute } from "react-icons/bi";
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
  const [isClicked, setisClicked] = useState(false);

  const handleFlip = () => {
    setisFlipped((prevIsFlipped) => !prevIsFlipped);
    window.speechSynthesis.cancel();
    setisClicked(false);
  };

  const speakText = (text: any) => {
    if (window.speechSynthesis) {
      const speechSynthesisUtterance = new SpeechSynthesisUtterance(text);
      speechSynthesisUtterance.onend = () => {
        setisClicked(false);
      };
      speechSynthesis.speak(speechSynthesisUtterance);
      isClicked && window.speechSynthesis.cancel();
    } else {
      alert('Text-to-speech is not supported in this browser!');
    }
  };

  const speakAll = (e: any) => {
    e.stopPropagation();
    setisClicked((prevIsClicked) => !prevIsClicked);
    isFlipped ? speakText(data.answer) : speakText(data.question);
  };

  return (
    <div className="duration-500 hover:scale-105 cursor-pointer max:w-fit w-full">
      <div onClick={handleFlip} className={`w-full card relative ${isFlipped ? 'cardFlip' : ''}`}>
        <div className="w-full card-front absolute top-0 self-center">
          <div className="bg-gray-50 shadow-md hover:shadow-lg border h-80 max:w-64 w-full pt-3 px-3 rounded-2xl">
            <div className="flex justify-end">
              {
                isClicked ? <HiSpeakerWave size={15} onClick={speakAll} title='Mute' /> : <BiSolidVolumeMute size={15} onClick={speakAll} title='Unmute' />
              }
            </div>
            <div className="flex items-center h-[75%] justify-center">
              <div className="text-center">{data.question}</div>
            </div>
          </div>
        </div>
        <div className="w-full card-back">
          <div className="bg-gray-100 shadow-md hover:shadow-lg border h-80 max:w-64 w-full pt-3 px-3 rounded-2xl">
            <div className="flex justify-end ">
              {
                isClicked ? <HiSpeakerWave size={15} onClick={speakAll} title='Mute' /> : <BiSolidVolumeMute size={15} onClick={speakAll} title='Unmute' />
              }
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