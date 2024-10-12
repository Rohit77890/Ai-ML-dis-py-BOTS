const { Client, GatewayIntentBits } = require('discord.js');
const puppeteer = require('puppeteer');
const cron = require('node-cron');
const axios = require('axios');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const AMAZON_URL = 'https://www.amazon.com/dp/B07W7QSP2N'; // Replace with your product's Amazon URL
const FLIPKART_URL = 'https://www.flipkart.com/'; // Replace with the other platform's URL (e.g., Flipkart)
let lastPriceAmazon = null;

client.once('ready', () => {
  console.log('Bot is online!');
});

// Function to scrape product price from Amazon
async function getAmazonPrice() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(AMAZON_URL, { waitUntil: 'domcontentloaded' });
  
  // Update the selector as per the Amazon page structure
  const priceElement = await page.$('#priceblock_ourprice');
  const priceText = await priceElement.evaluate(el => el.textContent.trim());

  // Close the browser
  await browser.close();

  // Clean up the price text
  const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
  return price;
}

// Function to scrape product price from Flipkart (or another platform)
async function getFlipkartPrice() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(FLIPKART_URL, { waitUntil: 'domcontentloaded' });
  
  // Update the selector as per the Flipkart page structure
  const priceElement = await page.$('._30jeq3'); // Example Flipkart price class
  const priceText = await priceElement.evaluate(el => el.textContent.trim());

  // Close the browser
  await browser.close();

  // Clean up the price text
  const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
  return price;
}

// Function to check prices and send a Discord message
async function checkPrices() {
  const channel = client.channels.cache.get('your-channel-id'); // Replace with your Discord channel ID
  
  try {
    const amazonPrice = await getAmazonPrice();
    const flipkartPrice = await getFlipkartPrice();

    let message = `**Price Check!**\n`;
    message += `Amazon Price: $${amazonPrice}\nFlipkart Price: ₹${flipkartPrice}`;

    if (lastPriceAmazon && amazonPrice !== lastPriceAmazon) {
      message += `\n\n**Amazon Price Changed!** Last Price: $${lastPriceAmazon}`;
    }

    lastPriceAmazon = amazonPrice;

    // Send message to Discord
    channel.send(message);
  } catch (error) {
    console.error('Error checking prices:', error);
  }
}

// Schedule the bot to check prices every hour
cron.schedule('0 * * * *', checkPrices);

// Log in to Discord with your bot token
client.login('your-bot-token');
