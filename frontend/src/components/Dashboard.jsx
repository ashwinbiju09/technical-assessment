import React from "react";

function Dashboard() {
  const mockHistory = Array(6).fill({
    city: "London",
    description: "Clear Sky",
    temperature: 23,
    humidity: 45,
    windSpeed: 3.4,
    createdAt: new Date(),
  });

  return (
    <div className=" flex flex-col items-center px-4 py-10 space-y-8">
      {/* Main Container */}
      <div className="w-full  bg-white  px-8 space-y-8 ">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-extrabold text-gray-900">Weather App</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">Welcome, User</span>
            <button className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-500 transition-all shadow-md">
              Logout
            </button>
          </div>
        </div>

        {/* Search Box */}
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter city name (e.g., London)"
            className="flex-1 px-6 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-900 shadow-sm placeholder-gray-400"
          />
          <button className="px-6 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-500 transition-all shadow-md">
            Search
          </button>
        </div>

        {/* Current Weather Display */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-blue-50 rounded-2xl shadow-md p-6 space-y-4 md:space-y-0 md:space-x-6">
          <div className="flex flex-col text-center md:text-left flex-1">
            <h2 className="text-3xl font-bold text-gray-900">City Name</h2>
            <p className="text-lg capitalize text-gray-500">Clear sky</p>
          </div>

          <div className="text-4xl font-extrabold text-blue-600 md:text-right">
            23°C
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col items-center bg-blue-50 rounded-xl p-4 shadow-md">
              <p className="text-sm text-gray-500 mb-1">Humidity</p>
              <p className="text-lg font-bold text-gray-900">45%</p>
            </div>
            <div className="flex flex-col items-center bg-blue-50 rounded-xl p-4 shadow-md">
              <p className="text-sm text-gray-500 mb-1">Wind</p>
              <p className="text-lg font-bold text-gray-900">3.4 m/s</p>
            </div>
          </div>

          <button className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-500 transition-all shadow-lg font-semibold">
            Save Weather Data
          </button>
        </div>

        <p className="text-xl font-medium">Recent Searches</p>

        {/* History Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockHistory.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-50 rounded-xl p-4 shadow hover:shadow-lg transition-all"
            >
              {/*City + Description */}
              <div className="flex flex-col">
                <h3 className="text-xl font-bold text-gray-900">{item.city}</h3>
                <p className="text-gray-500 capitalize">{item.description}</p>
              </div>

              {/*Temperature */}
              <div className="text-2xl font-extrabold text-blue-600">
                {item.temperature}°C
              </div>

              {/*Humidity + Wind */}
              <div className="flex gap-2">
                <div className="flex flex-col items-center bg-blue-100 rounded-xl p-2">
                  <p className="text-xs text-gray-600">Humidity</p>
                  <p className="text-sm font-bold text-blue-700">
                    {item.humidity}%
                  </p>
                </div>
                <div className="flex flex-col items-center bg-purple-100 rounded-xl p-2">
                  <p className="text-xs text-gray-600">Wind</p>
                  <p className="text-sm font-bold text-purple-700">
                    {item.windSpeed} m/s
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
