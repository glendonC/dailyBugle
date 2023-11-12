const express = require('express');
const router = express.Router();
const AdInteraction = require('../models/AdInteraction');
const Advertisement = require('../models/Advertisement');

router.post('/impression', async (req, res) => {
    const { adId, userId } = req.body;
    const ipAddress = req.ip;
    const userAgent = req.get('User-Agent');

    try {
        const newInteraction = new AdInteraction({
            ad: adId,
            user: userId,
            type: 'impression',
            ipAddress,
            userAgent
        });
        await newInteraction.save();
        res.status(200).json({ message: "Impression recorded" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error recording impression" });
    }
});

router.post('/click', async (req, res) => {
    const { adId, userId } = req.body;
    const ipAddress = req.ip;
    const userAgent = req.get('User-Agent');
  
    try {
      const newInteraction = new AdInteraction({
        ad: adId,
        user: userId,
        type: 'click',
        ipAddress,
        userAgent
      });
      await newInteraction.save();
      res.status(200).json({ message: "Click recorded" });
    } catch (error) {
    }
  });
  
  
router.get('/random', async (req, res) => {
    try {
        const count = await Advertisement.countDocuments();
        const random = Math.floor(Math.random() * count);
        const ad = await Advertisement.findOne().skip(random);
        res.json(ad);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching random ad" });
    }
});



module.exports = router;
