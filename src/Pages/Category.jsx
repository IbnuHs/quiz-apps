import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Category() {
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelecetedCategory] = useState("");
  const [selectedDifficulty, setSelecetedDifficulty] = useState("");
  useEffect(() => {
    const fetchCategory = async () => {
      const res = await axios.get("https://opentdb.com/api_category.php");
      setCategory(res.data.trivia_categories);
    };

    fetchCategory();
  });
  const navigate = useNavigate();
  const submitForm = (e) => {
    if (selectedCategory && selectedDifficulty) {
      console.log(selectedCategory, selectedDifficulty);
      navigate("/quiz", {
        state: { category: selectedCategory, difficulty: selectedDifficulty },
      });
    }
    setSelecetedCategory("");
    setSelecetedDifficulty("");
    e.preventDefault();
  };
  return (
    <div className="w-[50%] border-2 px-5 py-8 rounded-md lg:w-[30%] lg:px-10">
      <h1 className="text-center text-[24px] font-semibold">Choice Level</h1>
      <form
        action=""
        onSubmit={submitForm}
        className="mt-5 flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="text-[16px] font-semibold">
            Select Category
          </label>
          <select
            name=""
            id=""
            required
            onChange={(e) => setSelecetedCategory(e.target.value)}
            className="rounded-md border-2 text-sm font-semibold px-2 py-1 text-gray-600"
          >
            <option value="" selected disabled>
              Select Category
            </option>
            {category.map((i, index) => {
              return (
                <option key={index} value={i.id}>
                  {i.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="text-[16px] font-semibold">
            Select Difficulty
          </label>
          <select
            name=""
            id=""
            required
            onChange={(e) => setSelecetedDifficulty(e.target.value)}
            className="rounded-md border-2 text-sm font-semibold px-2 py-1 text-gray-600"
          >
            <option value="" selected disabled>
              Select Difficulty
            </option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="flex justify-center mt-5">
          <button
            type="submit"
            className="border-2 bg-gray-500 text-white px-4 py-[2px] rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
