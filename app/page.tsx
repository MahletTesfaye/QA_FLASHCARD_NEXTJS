'use client'
import { useState, useEffect } from "react";
import { PiShuffleAngularBold } from "react-icons/pi";
import Flashcard from "@/components/flashcard";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";

export default function Home(props: any) {
  const [isLoadMore, setisLoadMore] = useState(false)
  const [shuffledData, setShuffledData] = useState([])
  const handleLoadMore = () => {
    setisLoadMore(!isLoadMore)
  }
  const handleShuffle = () => {
    setShuffledData([...shuffledData].sort(() => Math.random() - 0.5))
  }
  useEffect(() => {
    const getdata = async () => {
      try {
        const response = await fetch('/api/cards')
        if (!response.ok) {
          throw new Error('Failed to fetch cards')
        }
        const data = await response.json()
        setShuffledData(data)
      } catch (error) {
        console.log('Error', error)
      }
    }
    getdata();
  }, [])

  return (
    <main className="mx-[3%]">
      <div className="flex justify-between items-center">
        <div className="sm:text-2xl flex flex-col md:flex-row font-bold">Question & Answer<p className="text-[var(--backgroundPrimary)]">&nbsp;Flashcards</p></div>
        <PiShuffleAngularBold size={18} onClick={handleShuffle} className="cursor-pointer hover:scale-110 align-center" title='shuffle' />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-around gap-10 items-center">
        {
          shuffledData?.map((item: any, index: number) => {
            return <>
              {
                (isLoadMore ? item : index < 6) && <Flashcard key={item.id} question={item.question} answer={item.answer} />
              }
            </>
          })
        }
      </div>
      <div className="w-full items-center flex justify-center">
        <div onClick={handleLoadMore} className={'pt-5 w-fit flex cursor-pointer'}>{isLoadMore ? (<><div>Show less</div><MdOutlineExpandLess size={25} /></>) : (<><div>Show more</div><MdOutlineExpandMore size={25} /></>)}</div>
      </div>
    </main >
  );
}
