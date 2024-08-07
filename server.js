const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();  // لتحميل المتغيرات من ملف .env
const app = express();
const PORT = process.env.PORT || 3000;

// استبدل بالمتغير من ملف .env لتأمين معلومات الاتصال
const mongoURI = process.env.MONGO_URI;  
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

const referralSchema = new mongoose.Schema({
    userId: String,
    referralLink: String,
    referrals: Number
});

const Referral = mongoose.model('Referral', referralSchema);

// Middleware
app.use(express.static('public'));

// API endpoint للحصول على بيانات الإحالات
app.get('/api/referral', async (req, res) => {
    // استبدل هذا بمعرف المستخدم بناءً على التوثيق
    const userId = req.query.userId; 

    if (!userId) {
        return res.status(400).send('User ID is required');
    }

    try {
        let referral = await Referral.findOne({ userId });
        if (!referral) {
            referral = new Referral({
                userId,
                referralLink: `http://yourwebsite.com?ref=${userId}`,
                referrals: 0
            });
            await referral.save();
        }
        
        res.json({
            referralLink: referral.referralLink,
            referrals: referral.referrals
        });
    } catch (err) {
        res.status(500).send('Error retrieving referral data.');
    }
});

// خادم الويب
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
