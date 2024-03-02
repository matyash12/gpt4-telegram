import 'dotenv/config'

import TelegramBot from 'node-telegram-bot-api';
import OpenAI from "openai";

const openaiKey = process.env.OPENAIKEY;
const openai = new OpenAI({ apiKey: openaiKey });

const token = process.env.TELEGRAMBOTKEY;
const bot = new TelegramBot(token, { polling: true });

const openaiModel = process.env.OPENAIMODELTOUSER

bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    bot.sendMessage(chatId, resp);
});

async function answerMessage(msg) {
    console.log("The message the user sent: " + msg.text)
    const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: msg.text }],
        model: openaiModel,
    });
    console.log("Message to be sent to user: " + completion.choices[0].message.content)
    bot.sendMessage(msg.chat.id, completion.choices[0].message.content)
}

bot.on('message', (msg) => {
    answerMessage(msg);
});