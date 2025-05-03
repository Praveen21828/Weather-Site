const apiKey = "5fa84f07b0e0221591fa054572b890d3"; // Replace with your real key

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherDiv = document.getElementById("weatherResult");
  const loader = document.getElementById("loader");

  if (!city) {
    weatherDiv.innerHTML = `<p style="color:red;">Please enter a city name.</p>`;
    return;
  }

  weatherDiv.innerHTML = "";
  loader.style.display = "block";

  try {
    const response = await fetch(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(city)}`);
    const data = await response.json();

    loader.style.display = "none";

    if (!data.current) {
      throw new Error(data.error?.info || "Unable to fetch weather.");
    }

    weatherDiv.innerHTML = `
      <h2>Weather in ${data.location.name}, ${data.location.country}</h2>
      <p><strong>Temperature:</strong> ${data.current.temperature} °C</p>
      <p><strong>Weather:</strong> ${data.current.weather_descriptions[0]}</p>
      <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${data.current.wind_speed} km/h</p>
      <img src="${data.current.weather_icons[0]}" alt="Weather Icon" />
    `;
  } catch (err) {
    loader.style.display = "none";
    weatherDiv.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
}
