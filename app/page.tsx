import FlashCardContainer from '@/components/flashCard/FlashCardContainer';
import { fetchCards, fetchCategory} from '@/components/fetchCards';
import React from 'react'

const page = async () => {
    const data = await fetchCards();
    const categoryData = await fetchCategory()
    return (
        <div>
            <FlashCardContainer data={data} categoryData={categoryData}/>
        </div>
    )
}
export default page
