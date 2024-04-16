import React from 'react'

const EditPage = () => {
    return (
        <div className="border p-5 w-2/5 shadow-lg rounded-lg">
            <pre className="text-lg flex flex-col md:flex-row my-4">EDIT<pre className="text-[var(--backgroundPrimary)]"> FLASHCARD</pre></pre>
            <form className="">
                <div className="">
                    <label className="">Question</label><br />
                    <textarea type="text" placeholder='The question here' className=" p-1 border w-full" />
                </div>
                <div className="">
                    <label className="">Answer</label><br />
                    <textarea type="text" placeholder='The answer here' className="p-1 border w-full" />
                </div>
                <div className="flex justify-center">
                    <button className='bg-[var(--backgroundPrimary)] text-white px-4 py-1 mt-3 rounded-md'>Update</button>
                </div>
            </form>
        </div>
    )
}
export default EditPage
