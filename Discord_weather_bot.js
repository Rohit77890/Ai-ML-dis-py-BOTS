// Import the required modules
const { Client, GatewayIntentBits } = require('discord.js');
const fetch = require('node-fetch');

// Discord bot token and weather API key
const DISCORD_TOKEN = 'YOUR_DISCORD_BOT_TOKEN';  // Replace with your Discord bot token
const WEATHER_API_KEY = 'YOUR_OPENWEATHER_API_KEY';  // Replace with your weather API key

// Set your location (latitude and longitude) or city
const LOCATION = 'London';  // You can replace this with your city name

// Create a new Discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Function to fetch weather data
async function getWeather() {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${LOCATION}&appid=${WEATHER_API_KEY}&units=metric`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200) {
            const description = data.weather[0].description;
            const temp = data.main.temp;
            return `The current weather in ${LOCATION} is ${description} with a temperature of ${temp}°C.`;
        } else {
            return 'Unable to fetch weather data at this time.';
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
        return 'Error fetching weather data.';
    }
}

// Event: Bot is ready
client.once('ready', () => {
    console.log('Weather Bot is online!');

    // Set an interval to send weather updates every 1 hour (3600000 ms)
    setInterval(async () => {
        const channel = client.channels.cache.get('YOUR_DISCORD_CHANNEL_ID');  // Replace with your Discord channel ID
        if (channel) {
            const weatherUpdate = await getWeather();
            channel.send(weatherUpdate);
        }
    }, 3600000); // 1 hour
});

// Log in to Discord
client.login(DISCORD_TOKEN);
