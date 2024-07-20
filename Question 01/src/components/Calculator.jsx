import { useState } from "react";

const AverageCalculator = () => {
  const [numbers, setNumbers] = useState("");
  const [average, setAverage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setNumbers(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setAverage(null);

    const numbersArray = numbers.split(",").map(Number);
    try {
      const response = await fetch("http://localhost:5000/average", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numbers: numbersArray }),
      });

      const result = await response.json();

      if (response.ok) {
        setAverage(result.average);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Average Calculator
        </h1>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Numbers:
            </label>
            <input
              type="text"
              value={numbers}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Calculate
            </button>
          </div>
        </form>
        {average !== null && (
          <h2 className="mt-6 text-xl text-center text-green-600">
            Average: {average}
          </h2>
        )}
        {error && (
          <h2 className="mt-6 text-xl text-center text-red-600">
            Error: {error}
          </h2>
        )}
      </div>
    </div>
  );
};

export default AverageCalculator;
