'use client'
import { useEffect, useState, } from "react";
import { PiShuffleAngularBold } from "react-icons/pi";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
import Flashcard from "./flashcard";
import LoadingPage from "@/app/loading";
import { fetchDataWithCategory } from "../fetchCards";

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

    const handleCategoryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = event.target.value;

        if (selectedCategory === "All Cards") {
            setFilteredData(data);
            setshuffled(data);
        } else {
            try {
                const response = await fetchDataWithCategory(selectedCategory);
                setFilteredData(response);
                setshuffled(response);
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return (
        <>
            {isLoading ? <LoadingPage /> :
                <main className="sm:w-3/4 m-[5%]">
                    <div className="flex flex-col justify-between mb-7 w-full">
                        <h1 className="text-4xl font-extrabold mb-2">
                            Question & Answer <span className="text-[var(--backgroundPrimary)]">Flashcards</span>
                        </h1>
                        <div className="flex flex-col sm:flex-row justify-between gap-5 sm:gap-0 w-full">
                            <p className="">Flip or click the flashcards to view the answer.</p>
                            <div className="flex justify-between items-center sm:gap-5">
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
                    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-14 justify-items-center sm:justify-items-start gap-y-16">
                        {shuffled?.map((item: any, index: number) => {
                            return (
                                <>
                                    {(isShowMore ? item : (window.innerWidth < 1536 ? (window.innerWidth < 1024 ? index < 4 : index < 6) : index < 8)) && (
                                        <Flashcard key={item.id} data={item} />
                                    )}
                                </>
                            );
                        })}
                    </div>
                    {filteredData.length > (window.innerWidth < 1536 ? (window.innerWidth < 1024 ? 4 : 6): 8) &&
                        <div className="w-full flex justify-center text-[var(--backgroundSecondary)]">
                            <div onClick={handleShowMore} className={"py-8 flex cursor-pointer"}>
                                {isShowMore ? (
                                    <>
                                        <div className="font-semibold">Show less</div>
                                        <MdOutlineExpandLess size={23} className="mt-0.5" />
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
