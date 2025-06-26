import React, { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";

interface Product {
  category: string;
}
interface FetchResponse {
  products: Product[];
}

const Sidebar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectdCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    setKeyword,
  } = useFilter();
  const [categories, setCategories] = useState<string[]>([]);

  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "Fashion",
    "trend",
    "shoes",
    "shirts",
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");

        const data: FetchResponse = await response.json();

        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );

        console.log(uniqueCategories);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching product", error);
      }
    };
    fetchCategories();
  }, []);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };

  const handleRadioChangeCategories = (category: string) => {
    setSelectdCategory(category);
    };
    
    const handlekeywordClick = (keyword: string) => {
        setKeyword(keyword)
    }

    const handleResset = () => {
        setSearchQuery("")
        setSelectdCategory("")
        setMinPrice(undefined)
        setMaxPrice(undefined)
        setKeyword("")
    }
  return (
    <div className="w-70 p-5 h-screen">
      <h1 className="text-2xl font-bold mb-10 mt-4">React Store</h1>
      <section>
        <input
          type="text"
          className="border-2 rounded px-3 py-3 w-full sm:mb-0"
          placeholder="search Product"
          value={searchQuery}
          onChange={e =>
            setSearchQuery(e.target.value)}
          
        />
        <div className="flex justify-center mt-3 items-center">
          <input
            type="text"
            className="border-2 mr-2  px-5 py-3 mb-3 w-full"
            placeholder="Min"
            value={minPrice ?? ""}
            onChange={handleMinPriceChange}
          />
          <input
            type="text"
            className="border-2 mr-2  px-5 py-3 mb-3 w-full"
            placeholder="Max"
            value={maxPrice ?? ""}
            onChange={handleMaxPriceChange}
          />
        </div>
        {/*Categories section */}
        <div className="mb-5">
          <h2 className="text xl font-semibold mb-3">Categories</h2>
        </div>
        <section>
          {categories.map((category, index) => (
            <label key={index} className="block mb-2">
              <input
                type="radio"
                name="category"
                value={category}
                      onChange={() => handleRadioChangeCategories(category)}
                      checked={selectedCategory===category}
                className="mr-2 w-[16px] h-[16px]:"
              />
              {category.toUpperCase()}
            </label>
          ))}
        </section>
        {/*Keyword section */}
        <section>
          <div className="mb-5 mt-4">
            <h2 className="text-xl font-semibold mb-3">Keywords</h2>
            <div>
              {keywords.map((keyword, index) => (
                <button
                      key={index}
                      onClick={()=>handlekeywordClick(keyword)}
                  className="block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200"
                >
                  {keyword.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </section>
        <div>
          <button onClick={handleResset} className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-5">
            Reset Filter
          </button>
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
