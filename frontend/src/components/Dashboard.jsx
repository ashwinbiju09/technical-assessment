import { useState, useRef } from "react";
import axios from "axios";
import domtoimage from "dom-to-image-more";

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function Dashboard() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const weatherRef = useRef(null);

  const mockHistory = Array(5).fill({
    city: "London",
    description: "Clear Sky",
    temperature: 23,
    humidity: 45,
    windSpeed: 3.4,
    createdAt: new Date(),
  });

  const fetchWeatherData = async () => {
    if (!city.trim()) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
      );

      setWeatherData({
        city: response.data.name,
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed,
      });
    } catch (err) {
      alert("City not found or API error");
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!weatherData || !weatherRef.current) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to save data.");
      return;
    }

    setSaving(true);

    try {
      const blob = await domtoimage.toBlob(weatherRef.current);
      const reader = new FileReader();

      reader.onloadend = async () => {
        const screenshot = reader.result;

        const response = await axios.post(
          "http://localhost:5000/api/weather/save",
          { ...weatherData, screenshot },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("Saved data:", response.data);
        alert("Weather data saved successfully!");
      };

      reader.readAsDataURL(blob); // converts blob to base64
    } catch (err) {
      console.error("Save error:", err);
      alert("Error saving data: " + (err.response?.data?.msg || err.message));
    }

    setSaving(false);
  };

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
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchWeatherData(city)}
          />
          <button
            className="px-6 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-500 transition-all shadow-md"
            onClick={() => fetchWeatherData(city)}
            disabled={loading || !city.trim()}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Current Weather Display */}
        {weatherData && (
          <div
            ref={weatherRef}
            className="flex flex-col md:flex-row justify-between items-center bg-blue-50 rounded-2xl shadow-md p-6 space-y-4 md:space-y-0 md:space-x-6"
            style={{ backgroundColor: "#ffffff", color: "#111827" }}
          >
            <div className="flex flex-col text-center md:text-left flex-1">
              <h2 className="text-3xl font-bold text-gray-900">
                {weatherData.city}
              </h2>
              <p className="text-lg capitalize text-gray-500">
                {weatherData.description}
              </p>
            </div>

            <div className="text-4xl font-extrabold text-blue-600 md:text-right">
              {weatherData.temperature.toFixed(1)}°C
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center bg-blue-50 rounded-xl p-4 shadow-md">
                <p className="text-sm text-gray-500 mb-1">Humidity</p>
                <p className="text-lg font-bold text-gray-900">
                  {weatherData.humidity}%
                </p>
              </div>
              <div className="flex flex-col items-center bg-blue-50 rounded-xl p-4 shadow-md">
                <p className="text-sm text-gray-500 mb-1">Wind</p>
                <p className="text-lg font-bold text-gray-900">
                  {weatherData.windSpeed} m/s
                </p>
              </div>
            </div>

            <button
              onClick={() => handleSave()}
              disabled={saving}
              className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-500 transition-all shadow-lg font-semibold"
            >
              {saving ? "Saving..." : "Save Weather Data"}
            </button>
          </div>
        )}

        <p className="text-xl font-medium">Recent Searches</p>

        {/* History Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockHistory.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 gap-6"
            >
              {/* Weather Image */}
              <div className="shrink-0">
                <img
                  src={item.imageUrl || "https://via.placeholder.com/100"}
                  alt={item.city}
                  className="w-40 h-40 object-cover rounded-2xl"
                />
              </div>

              {/* City Info + Weather Details */}
              <div className="flex-1 flex flex-col justify-between h-full">
                {/* City Info */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {item.city}
                  </h3>
                  <p className="text-gray-600 capitalize mt-1">
                    {item.description}
                  </p>
                </div>

                {/* Weather Details */}
                <div className="flex items-center gap-6">
                  {/* Temperature */}
                  <div className="text-blue-600 font-extrabold text-2xl">
                    {item.temperature}°C
                  </div>

                  {/* Humidity */}
                  <div className="flex flex-col items-center bg-blue-50 rounded-xl p-3 min-w-[70px]">
                    <p className="text-xs text-gray-600">Humidity</p>
                    <p className="text-sm font-bold text-blue-700">
                      {item.humidity}%
                    </p>
                  </div>

                  {/* Wind */}
                  <div className="flex flex-col items-center bg-purple-50 rounded-xl p-3 min-w-[70px]">
                    <p className="text-xs text-gray-600">Wind</p>
                    <p className="text-sm font-bold text-purple-700">
                      {item.windSpeed} m/s
                    </p>
                  </div>
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
