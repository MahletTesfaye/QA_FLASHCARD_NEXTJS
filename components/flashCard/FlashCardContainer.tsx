'use client'
import { useEffect, useState, } from "react";
import { PiShuffleAngularBold } from "react-icons/pi";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
import Flashcard from "./flashcard";
import LoadingPage from "@/app/loading";

export default function FlashCardContainer({ data, categoryData }: any) {
    const [isLoading, setIsLoading] = useState(true);
    const [isShowMore, setisShowMore] = useState(false);
    const [shuffled, setshuffled] = useState(data);
    const [filteredData, setFilteredData] = useState(data);

    const handleShowMore = () => {
        setisShowMore(!isShowMore);
    };

    const handleShuffle = () => {
        setshuffled([...filteredData].sort(() => Math.random() - 0.5));
    };

    const handleCategoryChange = (event: any) => {
        const selectedCategory = event.target.value
        let newFilteredData = [];

        if (selectedCategory === "All Cards") {
            newFilteredData = data;
        } else {
            newFilteredData = data.filter(
                (item: any) => item.category === selectedCategory
            );
        }
        setFilteredData(newFilteredData);
        setshuffled(newFilteredData)
    };
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        <>
            {isLoading ? <LoadingPage /> :
                <main className="mx-[3%] flex flex-col">
                    <div className="flex flex-col sm:flex-row justify-between mr-4 mb-4">
                        <div className="w-full flex flex-col gap-y-5">
                            <div className="flex w-full">
                                <p className="sm:text-xl md:text-2xl lg:text-4xl flex font-extrabold ml-[7%] sm:ml-0">
                                    Question & Answer<span className="text-[var(--backgroundPrimary)]">&nbsp;Flashcards</span>
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-between gap-5 sm:gap-0 items-center w-full">
                                <p className="ml-[7%] sm:ml-0">Flip or click the flashcards to view the answer.</p>
                                <div className="flex sm:gap-5 items-center w-full sm:w-auto justify-around">
                                    <select
                                        name="Category"
                                        title="Category"
                                        onChange={handleCategoryChange}
                                        className="border shadow rounded-md px-2 py-1 text-sm cursor-pointer bg-transparent focus:outline-none font-semibold"
                                    >
                                        <option value="All Cards">All Cards</option>
                                        {categoryData &&
                                            categoryData.map((category: string, index: any) => {
                                                return <option key={index} value={category}>{category}</option>;
                                            })}
                                    </select>

                                    <PiShuffleAngularBold
                                        size={18}
                                        onClick={handleShuffle}
                                        className="cursor-pointer hover:scale-110 align-center"
                                        title="shuffle"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-around gap-10 mx-2 items-center">
                        {shuffled?.map((item: any, index: number) => {
                            return (
                                <>
                                    {(isShowMore ? item : index < 6) && (
                                        <Flashcard key={item.id} data={item} />
                                    )}
                                </>
                            );
                        })}
                    </div>
                    {filteredData.length > 6 &&
                        <div className="w-full flex justify-center text-[var(--backgroundSecondary)]">
                            <div onClick={handleShowMore} className={"py-8 flex cursor-pointer"}>
                                {isShowMore ? (
                                    <>
                                        <div className="font-semibold">Show less</div>
                                        <MdOutlineExpandLess size={23} className="mt-0.5"/>
                                    </>
                                ) : (
                                    <>
                                        <div className="font-semibold">Show more</div>
                                        <MdOutlineExpandMore size={23} className="mt-0.5" />
                                    </>
                                )}
                            </div>
                        </div>
                    }
                </main>
            }
        </>
    );
}
