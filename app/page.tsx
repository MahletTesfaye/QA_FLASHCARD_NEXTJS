'use client'
import { useState } from "react";
import { PiShuffleAngularBold } from "react-icons/pi";
import Flashcard from "@/components/flashcard";

const data = [
  {
    id: 0,
    question: "What is your name?",
    answer: "My name is paul"
  },
  {
    id: 1,
    question: "What is your father's name?",
    answer: "My name father's is gb"
  },
  {
    id: 2,
    question: "What is your pets name?",
    answer: "My pets name is pp"
  },
  {
    id: 3,
    question: "What is your pets name?",
    answer: "My pets name is pp"
  },
  {
    id: 4,
    question: "What is your pets name?",
    answer: "My pets name is pp"
  },
  {
    id: 5,
    question: "What is your pets name?",
    answer: "My pets name is pp"
  },
  {
    id: 6,
    question: "What is your pets name?",
    answer: "My pets name is pp"
  },
  {
    id: 7,
    question: "What is your pets name?",
    answer: "My pets name is pp"
  },
  {
    id: 8,
    question: "What is your pets name?",
    answer: "My pets name is pp"
  },
  {
    id: 9,
    question: "What is your pets name?",
    answer: "My pets name is pp"
  },
  {
    id: 10,
    question: "What is your pets name?",
    answer: "My pets name is pp"
  }
]

export default function Home() {
  const [isLoadMore, setisLoadMore] = useState(false)
  const handleLoadMore = () => {
    setisLoadMore(!isLoadMore)
  }
  const handleShuffle = () => {

  }
  return (
    <main>
      <div className="flex flex-col border p-[5%]">
        <div className="flex justify-between">
          <div className="">From articles...</div>
          <PiShuffleAngularBold size={18} onClick={handleShuffle} className="float-end" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-around gap-10 items-center">
          {
            data.map((item: any, index: number) => {
              return <>
                {
                  (isLoadMore ? item : index < 6) && <Flashcard key={item.id} question={item.question} answer={item.answer} />
                }
              </>
            })
          }
        </div>
        <div onClick={handleLoadMore} className={`text-center pt-4 cursor-pointer opacity-80 ${isLoadMore ? 'hidden' : ''}`}>Load more...</div>
        <div onClick={handleLoadMore} className={`text-center pt-4 cursor-pointer opacity-80 ${isLoadMore ? '' : 'hidden'}`}>Show less...</div>
      </div>
    </main >
  );
}
