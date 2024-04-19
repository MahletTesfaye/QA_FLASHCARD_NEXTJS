'use client'
import React from 'react'
import { useState } from "react";
import { BiLike } from 'react-icons/bi';
import { HiSpeakerWave } from "react-icons/hi2";
import { RiQuestionnaireFill } from "react-icons/ri";
import { SiAnswer } from 'react-icons/si';

const Flashcard = (props: any) => {
    const show = "Show Answer"
    const hide = "Hide Answer"
    const [isFlipped, setisFlipped] = useState(false)
    const [isLiked, setIsLiked] = useState(false)

    const handleFlip = () => {
        if (window.speechSynthesis) {
            setisFlipped((prevIsFlipped) => (!prevIsFlipped))
            isFlipped && window.speechSynthesis.cancel()
        }
        else {
            console.log("Speach synthesis utterance is not supported in this browser!")
        }
    }
    const handleLike = () => {
        setIsLiked((prevIsLiked) => (!prevIsLiked))
    }
    const speakText = (text: any) => {
        const speechSynthesisUtterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(speechSynthesisUtterance);
    };

    const speakAll = (e: any) => {
        e.stopPropagation();
        isFlipped ? speakText(props.answer) : speakText(props.question);
    };
    return (
        <div className="flex flex-col duration-500 hover:scale-105 cursor-pointer items-center ">
            <div onClick={handleFlip} className={`card relative ${isFlipped ? 'cardFlip' : ''}`}>
                <div className="card-front absolute top-0">
                    <div className="border-2 border-[var(--backgroundSecondary)] shadow-md hover:shadow-lg h-96 w-56 pt-3 px-3 mb-1 mt-6 rounded-2xl bg-white ">
                        <div className="flex justify-between ">
                            <RiQuestionnaireFill color="gray" size={18} className='cursor-default' onClick={(e) => e.stopPropagation()} />
                            <HiSpeakerWave size={18} onClick={speakAll} title='speaker' />
                        </div>
                        <div className="flex items-center h-[75%] justify-center">
                            <div className="text-center">{props.question}</div>
                        </div>
                    </div>
                </div>
                <div className="card-back">
                    <div className="border-2 border-[var(--backgroundSecondary)] shadow-md hover:shadow-lg h-96 w-56 pt-3 px-3 mb-3 mt-6 rounded-2xl bg-white">
                        <div className="flex justify-between ">
                            <SiAnswer color='gray' size={16} className='cursor-default' onClick={(e) => e.stopPropagation()} />
                            <HiSpeakerWave size={18} onClick={speakAll} title='speaker' />
                        </div>
                        <div className="flex items-center h-[80%] justify-center">
                            <div className="text-center">{props.answer}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-2 cursor-pointer justify-center">
                <div onClick={handleFlip} className="border h-8 items-center text-white px-7 rounded-md bg-[var(--backgroundPrimary)]">{isFlipped ? hide : show}</div>
                <BiLike size={27} onClick={handleLike} color={isLiked ? 'red' : 'inherit'} className='mt-0.5' />
            </div>
        </div>
    )
}

export default Flashcard
