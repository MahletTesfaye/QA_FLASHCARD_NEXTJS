'use client'
import { useState } from "react";
import { PiShuffleAngularBold } from "react-icons/pi";
import Flashcard from "@/components/flashcard";


export default function Home() {
  const [isLoadMore, setisLoadMore] = useState(false)

  const handleLoadMore = () => {
    setisLoadMore(!isLoadMore)
  }

  return (
    <main>
      <div className="flex flex-col border p-8">
        <div className="flex justify-between mx-8">
          <div className="">From articles...</div>
          <PiShuffleAngularBold size={18} />
        </div>

        <div className="flex justify-around gap-7 mx-10">
          <Flashcard question="who are you?" answer="shega" />
          <Flashcard question="What are the key characteristics of a successful startup?" answer="shega" />
          <Flashcard question="who are you?" answer="shega" />
        </div>

        <div className="flex justify-around gap-7 mx-10">
          <Flashcard question="What are the key characteristics of a successful startup?" answer="shega" />
          <Flashcard question="who are you?" answer="shega" />
          <Flashcard question="What are the key characteristics of a successful startup?" answer="shega" />
        </div>
        <div className={`flex justify-around gap-7 mx-10 ${isLoadMore ? '' : 'hidden'}`}>
          <Flashcard question="who are you?" answer="shega" />
          <Flashcard question="What are the key characteristics of a successful startup?" answer="shega" />
          <Flashcard question="who are you?" answer="shega" />
        </div>
        <div className={`flex justify-around gap-7 mx-10 ${isLoadMore ? '' : 'hidden'}`}>
          <Flashcard question="who are you?" answer="shega" />
          <Flashcard question="What are the key characteristics of a successful startup?" answer="shega" />
          <Flashcard question="who are you?" answer="shega" />
        </div>
        <div className={`flex justify-around gap-7 mx-10 ${isLoadMore ? '' : 'hidden'}`}>
          <Flashcard question="who are you?" answer="shega" />
          <Flashcard question="What are the key characteristics of a successful startup?" answer="shega" />
          <Flashcard question="who are you?" answer="shega" />
        </div>
        <div className={`flex justify-around gap-7 mx-10 ${isLoadMore ? '' : 'hidden'}`}>
          <Flashcard question="who are you?" answer="shega" />
          <Flashcard question="What are the key characteristics of a successful startup?" answer="shega" />
          <Flashcard question="who are you?" answer="shega" />
        </div>
        <div className={`flex justify-around gap-7 mx-10 ${isLoadMore ? '' : 'hidden'}`}>
          <Flashcard question="who are you?" answer="shega" />
          <Flashcard question="What are the key characteristics of a successful startup?" answer="shega" />
          <Flashcard question="who are you?" answer="shega" />
        </div>

        <div onClick={handleLoadMore} className={`text-center pt-4 cursor-pointer opacity-80 ${isLoadMore? 'hidden' : ''}`}>Load more...</div>
        <div onClick={handleLoadMore} className={`text-center pt-4 cursor-pointer opacity-80 ${isLoadMore? '' : 'hidden'}`}>Show less...</div>
      </div>
    </main >
  );
}
