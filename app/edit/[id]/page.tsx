'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const EditPage = ({ params }: { params: { id: string } }) => {
    const router = useRouter()
    const [card, setCard] = useState({
        question: '',
        answer: ''
    })
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/cards/${params.id}`)

                if (response.ok) {
                    console.log('Card updated successfully')
                }
                const data = await response.json()
                setCard({ question: data.question, answer: data.answer })
            } catch (error) {
                console.log('Failed to update card')
            }
        }
        fetchData()
    }, [params.id])

    const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()
        try {
            const response = await fetch(`/api/cards/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(card)
            })
            if (response.ok) {
                console.log('Card updated successfully')
                router.push('/AdminPage')
            } else {
                throw new Error('Failed to update card: ' + response.statusText)
            }
        } catch (error) {
            console.log('Failed to update card')
        }
    }


    return (
        <div className="border p-5 w-2/5 shadow-lg rounded-lg">
            <pre className="text-lg flex flex-col md:flex-row my-4">EDIT<pre className="text-[var(--backgroundPrimary)]"> FLASHCARD</pre></pre>
            <form>
                <div className="">
                    <label className="">Question</label><br />
                    <textarea value={card.question} className=" p-1 border w-full" onChange={(e) => setCard({ ...card, question: e.currentTarget.value })} />
                </div>
                <div className="">
                    <label className="">Answer</label><br />
                    <textarea value={card.answer} className="p-1 border w-full" onChange={(e) => setCard({ ...card, answer: e.currentTarget.value })} />
                </div>
                <div className="flex justify-center">
                    <button onClick={handleSubmit} className='bg-[var(--backgroundPrimary)] text-white px-4 py-1 mt-3 rounded-md'>Update</button>
                </div>
            </form>
        </div>
    )
}
export default EditPage

