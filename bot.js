const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

// استبدل TOKEN برمز API الخاص ببوتك
const token = '7306866838:AAH147GN_MoxE3Mca1bhUz-ZFq0GnOYp6a4';
const bot = new TelegramBot(token, { polling: true });

// إعداد الأوامر (Menu Button)
function setBotCommands() {
    const commands = [
        { command: 'start', description: 'ابدأ المحادثة مع البوت' }
    ];
    bot.setMyCommands(commands);
}

// معالجة الأمر /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'مرحباً! اضغط على الزر أدناه لفتح نافذة منبثقة:', {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'افتح الموقع',
                        web_app: { url: 'https://mmmmmmmmkjhjkh2.github.io/-/' }  // استبدل بالرابط المطلوب
                    }
                ]
            ]
        }
    });
});

// إعداد الأوامر عند بدء تشغيل البوت
setBotCommands();

// إعداد خادم الويب (اختياري)
app.get('/', (req, res) => {
    res.send('خادم البوت يعمل.');
});

// تشغيل خادم الويب
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
