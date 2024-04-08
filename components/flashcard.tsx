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
        setisFlipped((prevIsFlipped) => (!prevIsFlipped))
    }
    const handleLike = () => {
        setIsLiked((prevIsLiked) => (!prevIsLiked))
    }
    return (
        <div className="flex flex-col duration-500 hover:scale-105 cursor-pointer items-center">
            <div onClick={handleFlip} className={`card relative ${isFlipped ? 'cardFlip' : ''}`}>
                <div className="card-front absolute top-0">
                    <div className="border shadow-md hover:shadow-lg h-96 w-56 pt-3 px-3 mb-1 mt-6 rounded-2xl bg-white">
                        <div className="flex justify-between ">
                            <RiQuestionnaireFill color="gray" size={18} />
                            <HiSpeakerWave size={18} />
                        </div>
                        <div className="text-center mt-[50%]">{props.question}</div>
                    </div>
                </div>
                <div className="card-back">
                    <div className="border shadow-md hover:shadow-lg h-96 w-56 pt-3 px-3 mb-1 mt-6 rounded-2xl bg-white">
                        <div className="flex justify-between ">
                            <SiAnswer color='gray' size={16} />
                            <HiSpeakerWave size={18} />
                        </div>
                        <div className="text-center mt-[50%]">{props.answer}</div>
                    </div>
                </div>
            </div>
            <div className="flex cursor-pointer">
                <div onClick={handleFlip} className="border h-8 text-center text-white px-10  rounded-lg bg-[var(--backgroundPrimary)]">{isFlipped ? hide : show}</div>
                <BiLike size={27} onClick={handleLike} color={isLiked ? 'red' : 'inherit'} className='mt-1' />
            </div>
        </div>
    )
}

export default Flashcard
