const { Client, GatewayIntentBits } = require('discord.js');
const puppeteer = require('puppeteer');

// Replace with your Discord bot token and channel ID
const DISCORD_BOT_TOKEN = 'YOUR_DISCORD_BOT_TOKEN';
const CHANNEL_ID = 'YOUR_CHANNEL_ID';
const AMAZON_URL = 'https://www.amazon.com/dp/B08XJG8MQM';  // Replace with the product URL

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

// Function to scrape the price from Amazon product page
async function checkAmazonPrice() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(AMAZON_URL);

    // Scraping the price (might need adjustment based on the page structure)
    const price = await page.evaluate(() => {
        const priceElement = document.querySelector('#priceblock_ourprice');
        return priceElement ? priceElement.innerText : null;
    });

    await browser.close();
    return price;
}

client.once('ready', () => {
    console.log('Bot is online and ready!');
    
    // Run the price check every hour (3600000 milliseconds)
    setInterval(async () => {
        try {
            const price = await checkAmazonPrice();
            if (price) {
                const channel = await client.channels.fetch(CHANNEL_ID);
                channel.send(`The current price of the product is ${price}`);
            } else {
                console.error('Price element not found on the page');
            }
        } catch (error) {
            console.error('Error fetching the price:', error);
        }
    }, 3600000);  // Check every hour
});

client.login(DISCORD_BOT_TOKEN);
