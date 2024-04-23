'use client'
import { useState, useEffect } from "react";
import { PiShuffleAngularBold } from "react-icons/pi";
import Flashcard from "@/components/flashcard";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
import LoadingPage from "./loading";

export default function Home(props: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [isShowMore, setisShowMore] = useState(false);
  const [data, setData] = useState([])
  const [shuffledData, setShuffledData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/api/cards");
        if (!response.ok) {
          throw new Error("Failed to fetch cards");
        }
        const data = await response.json();
        setData(data);
        setShuffledData(data);
        setFilteredData(data);
      } catch (error) {
        console.log("Error", error);
      }
    };
    getData();
  }, []);

  const handleShowMore = () => {
    setisShowMore(!isShowMore);
  };

  const handleShuffle = () => {
    setShuffledData([...filteredData].sort(() => Math.random() - 0.5));
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
    setShuffledData(newFilteredData)
  };

  return (
    <>
      {isLoading ? <LoadingPage /> :
        <main className="mx-[3%]">
          <div className="flex flex-col sm:flex-row justify-between mr-4">
            <div className="sm:text-lg md:text-xl lg:text-2xl flex font-bold">
              Question & Answer<p className="text-[var(--backgroundPrimary)]">&nbsp;Flashcards</p>
            </div>
            <div className="flex sm:gap-3 items-center w-full sm:w-auto justify-around">
              <select
                name="Category"
                title="Category"
                onChange={handleCategoryChange}
                className="border shadow rounded-md px-2 py-1 text-sm cursor-pointer bg-transparent focus:outline-none "
                style={{ width: "max-content" }}
              >
                <option value="All Cards">All Cards</option>
                <option value="Tech">Tech</option>
                <option value="Startup">Startup</option>
                <option value="Article">Article</option>
              </select>

              <PiShuffleAngularBold
                size={18}
                onClick={handleShuffle}
                className="cursor-pointer hover:scale-110 align-center"
                title="shuffle"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-around gap-10 items-center">
            {shuffledData?.map((item: any, index: number) => {
              return (
                <>
                  {(isShowMore ? item : index < 6) && (
                    <Flashcard key={item.id} question={item.question} answer={item.answer} />
                  )}
                </>
              );
            })}
          </div>
          {filteredData.length > 6 &&
            <div className="w-full flex justify-center text-[var(--backgroundSecondary)]">
              <div onClick={handleShowMore} className={"pt-5 flex cursor-pointer"}>
                {isShowMore ? (
                  <>
                    <div>Show less</div>
                    <MdOutlineExpandLess size={23} />
                  </>
                ) : (
                  <>
                    <div>Show more</div>
                    <MdOutlineExpandMore size={23} />
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
