'use client'
import { useState, useEffect } from "react";
import { PiShuffleAngularBold } from "react-icons/pi";
import Flashcard from "@/components/flashcard";
import Link from "next/link";

export default function Home(props: any) {
  const [isLoadMore, setisLoadMore] = useState(false)
  const [shuffledData, setShuffledData] = useState([])
  const handleLoadMore = () => {
    setisLoadMore(!isLoadMore)
  }
  const handleShuffle = (data: any) => {
    setShuffledData([...data].sort(() => Math.random() - 0.5))
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
    <main>
      <Link href={'/AdminPage'} className="flex justify-end text-sm text-[var(--backgroundPrimary)]">Admin</Link>
      <div className="flex flex-col border p-[4%]">
        <div className="flex justify-between">
          <pre className="text-lg flex flex-col md:flex-row">Question & Answer<pre className="text-[var(--backgroundPrimary)]"> Flashcards</pre></pre>
          <PiShuffleAngularBold size={18} onClick={(): void => handleShuffle(data)} className="cursor-pointer hover:scale-125" title='shuffle' />
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
        <div onClick={handleLoadMore} className={`text-center pt-4 cursor-pointer opacity-80 ${isLoadMore ? 'hidden' : ''}`}>Load more...</div>
        <div onClick={handleLoadMore} className={`text-center pt-4 cursor-pointer opacity-80 ${isLoadMore ? '' : 'hidden'}`}>Show less...</div>
      </div>
    </main >
  );
}
