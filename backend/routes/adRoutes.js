const express = require('express');
const router = express.Router();
const AdInteraction = require('../models/AdInteraction');
const Advertisement = require('../models/Advertisement');

// Track ad impressions
router.post('/impression', async (req, res) => {
    const { adId, userId } = req.body; // Extract adId and userId from request body
    const ipAddress = req.ip; // Get IP address from request
    const userAgent = req.get('User-Agent'); // Get user agent from request headers

    try {
        const newInteraction = new AdInteraction({
            ad: adId,
            user: userId, // Use userId from request
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

// Track ad clicks
router.post('/click', async (req, res) => {
    const { adId, userId } = req.body;
    const ipAddress = req.ip; // Get IP address from request
    const userAgent = req.get('User-Agent'); // Get user agent from request headers
  
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
      // Error handling
    }
  });
  
  
// Get a random ad
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
