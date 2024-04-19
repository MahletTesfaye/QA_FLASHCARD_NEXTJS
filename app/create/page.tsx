'use client'
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CreatePage = () => {
    const router = useRouter()
    const [card, setCard] = useState({
        question: '',
        answer: ''
    })
    const notify = (message: string) => toast(message)
    const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()
        try {
            const response = await fetch('/api/cards', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(card),
            })
            if (response.ok) {
                router.push('/AdminPage')
                notify('Card created successfully')
                console.log('Card created successfully')
            }

        } catch (error) {
            throw new Error('Failed to create card')
        }
    }
    return (
        <div className="border p-5 w-2/5 shadow-lg rounded-lg">
            <ToastContainer />
            <pre className="text-lg flex flex-col md:flex-row my-4">CREATE<pre className="text-[var(--backgroundPrimary)]"> FLASHCARD</pre></pre>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="">Question</label><br />
                    <textarea placeholder='The question here' className=" p-1 border w-full" onChange={(e: any) => setCard({ ...card, question: e.currentTarget.value })} />
                </div>
                <div>
                    <label className="">Answer</label><br />
                    <textarea placeholder='The answer here' className="p-1 border w-full" onChange={(e: any) => setCard({ ...card, answer: e.currentTarget.value })} />
                </div>
                <div className="flex justify-center">
                    <button type='submit' className='bg-[var(--backgroundPrimary)] text-white px-4 py-1 mt-3 rounded-md'>Create</button>
                </div>
            </form>
        </div>
    )
}

export default CreatePage
