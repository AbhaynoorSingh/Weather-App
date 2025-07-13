const apiKey = "2f06dc5683744fb0bd0153647251307";

async function getWeather() {
  const location = document.getElementById("locationInput").value.trim();
  const result = document.getElementById("result");
  const errorDiv = document.getElementById("error");

  // Reset UI
  result.classList.add("hidden");
  errorDiv.classList.add("hidden");
  errorDiv.textContent = "";  // Clear previous error text

  if (!location) {
    showError("Please enter a city name.");
    return;
  }

  try {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=yes`);
    const data = await response.json();

    // Check if city is valid
    if (data.error) {
      showError(`❌ ${data.error.message}`);
      return;
    }

    // ✅ Hide error on success
    errorDiv.classList.add("hidden");
    errorDiv.textContent = "";

    // Display weather info
    document.getElementById("city").textContent = `${data.location.name}, ${data.location.country}`;
    document.getElementById("temp").textContent = `${data.current.temp_c}°C`;
    document.getElementById("feelsLike").textContent = `${data.current.feelslike_c}°C`;
    document.getElementById("condition").textContent = data.current.condition.text;
    document.getElementById("humidity").textContent = data.current.humidity;
    document.getElementById("wind").textContent = data.current.wind_kph;
    document.getElementById("time").textContent = data.location.localtime;
    document.getElementById("icon").src = `https:${data.current.condition.icon}`;

    result.classList.remove("hidden");
  } catch (err) {
    showError("❌ Failed to fetch weather data. Please check your internet connection.");
  }
}

function showError(message) {
  const errorDiv = document.getElementById("error");
  errorDiv.textContent = message;
  errorDiv.classList.remove("hidden");

  const result = document.getElementById("result");
  result.classList.add("hidden"); // Hide result if there's an error
}
