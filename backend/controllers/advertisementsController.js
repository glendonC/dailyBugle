// controllers/advertisementsController.js

const AdInteraction = require('../models/AdInteraction');

exports.trackInteraction = async (req, res) => {
  const { adId } = req.params;
  const userId = req.user._id; // Replace with actual user ID retrieval logic

  try {
    // Track the click interaction
    await new AdInteraction({
      ad: adId,
      user: userId,
      type: 'click'
    }).save();

    res.status(200).json({ message: 'Interaction tracked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error tracking interaction', error });
  }
};


exports.serveAd = async (req, res) => {
    // Logic to select an ad goes here
    const ad = {};
  
    // Track the impression
    await new AdInteraction({
      ad: ad._id,
      user: req.user._id,
      type: 'impression'
    }).save();
  
    res.json(ad);
  };
  