'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { data } from '@/components/data';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';

export default function AdminPage() {
  const [cards, setcards] = useState([])
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch('/api/cards')
        if (!response.ok) {
          throw new Error("Failed to fetch cards.")
        }
        const data = await response.json()
        setcards(data)
      } catch (error) {
        console.log("Error: ", error)
      }
    }
    fetchdata()
  }, [])
  return (
    <div className='text-center mx-[5%]'>
      <div className="flex justify-between mb-3 "><b>Table</b> <Link href={'/'} className='text-sm text-[#FAA31B]' >Back Home</Link></div>
      <div className='overflow-auto inline-block max-w-full'>
        <table className='text-center shadow-md'>
          <thead className='bg-[#FAA31B] text-white border-collapse'>
            <tr className='border'>
              <th className='px-5 py-2'>Id</th>
              <th className='px-5 py-2'>Question</th>
              <th className='px-5 py-2'>Answer</th>
              <th className='px-5 py-2'>Likes</th>
              <th className='px-5 py-2'>Edit</th>
              <th className='px-5 py-2'>Delete</th>
            </tr>
          </thead>
          <tbody className='border-collapse'>
            {cards?.map((item: any, index: number) => (
              <tr className={`border item-center ${!(index % 2 === 0) && ' bg-gray-200'} `} key={item._id}>
                <th className='py-2'>{index + 1}</th>
                <td className='px-4 py-2'>{item.question}</td>
                <td className='px-4 py-2'>{item.answer}</td>
                <td className='py-2'>13</td>
                <td className='py-2 pl-[2%]'><Link href={`/edit/${item.id}`}><BiEdit /></Link></td>
                <td className='py-2 pl-[3%] cursor-pointer'><MdDelete color='red' /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link href={'/create'}> <button className='bg-[#FAA31B] text-white px-4 py-1 mt-3 rounded-md'>Add</button></Link>
      </div>
    </div>
  );
}