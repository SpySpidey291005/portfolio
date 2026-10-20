console.log("JavaScript connected");

const themeButton = document.getElementById("themeToggle");
themeButton.addEventListener("click", function () {
   document.body.classList.toggle("dark-mode");
   if (document.body.classList.contains("dark-mode")) {
  themeButton.textContent = "Switch to Light Mode";
   } else {
  themeButton.textContent = "Switch to Dark Mode";
   }
});

const cityInput = document.getElementById("cityInput"); 
const weatherButton = document.getElementById("weatherButton"); 
const weatherResult = document.getElementById("weatherResult"); 
weatherButton.addEventListener("click", getWeather);
  
async function getWeather() { 
  const city = cityInput.value.trim(); 
  if (!city) { 
    weatherResult.textContent = "Please enter a city name."; 
    return; 
  } 
  weatherResult.textContent = "Loading weather..."; 
  weatherButton.disabled = true; 
  try { 
    const weatherApiKey = "8526a6dba0a209f5f3f45208cc88793e"; 
    const url = 
`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${weatherApiKey}&units=metric`; 
    const response = await fetch(url); 
    const data = await response.json(); 
    if (!response.ok) { 
      if (response.status === 404) throw new Error("City not found. Check the spelling."); 
      if (response.status === 401) throw new Error("API key is invalid or not active yet."); 
      if (response.status === 429) throw new Error("Too many requests. Please wait and retry"); 
      throw new Error(`Weather service error (${response.status}).`); 
    } 
    weatherResult.textContent = `${data.name}: ${data.main.temp}°C, ${data.weather[0].description}. Humidity: ${data.main.humidity}%.`; 
    weatherButton.disabled = false;
  } catch (error) { 
    weatherResult.textContent = error instanceof TypeError 
      ? "Network error. Check your internet connection." 
      : error.message; 
    console.error("Weather error:", error); }}