console.log("JavaScript connected");

const themeToggleBtn = document.getElementById("themeToggle");

if (themeToggleBtn) {
  const iconSpan = themeToggleBtn.querySelector(".theme-icon");
  const textSpan = themeToggleBtn.querySelector(".theme-text");

  // Set initial icon and text based on current body class
  const isDarkInitial = document.body.classList.contains("dark-mode");
  if (iconSpan && textSpan) {
    iconSpan.textContent = isDarkInitial ? "☀️" : "🌙";
    textSpan.textContent = isDarkInitial ? "Switch to Light Mode" : "Switch to Dark Mode";
  }

  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");

    // Save user choice
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    // Switch between Sun and Moon icons dynamically
    if (iconSpan && textSpan) {
      iconSpan.textContent = isDarkMode ? "☀️" : "🌙";
      textSpan.textContent = isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode";
    }
  });
}

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

const projectSearch = document.getElementById("projectSearch");
const projectItems = document.querySelectorAll("#projects .projects-list > li");
const noProjectsMessage = document.getElementById("noProjectsMessage");

function filterProjects() {
  const query = projectSearch.value.trim().toLowerCase();
  let matchCount = 0;

  projectItems.forEach(function (item) {
    const searchableText = item.textContent.toLowerCase();
    const isMatch = searchableText.includes(query);
    item.classList.toggle("is-hidden", !isMatch);
    if (isMatch) {
      matchCount += 1;
    }
  });

  noProjectsMessage.hidden = matchCount > 0;
}

projectSearch.addEventListener("input", filterProjects);