import EarbudListing from '../models/EarbudListing.js';
import User from '../models/User.js';

export const findMatches = async (listingId) => {
  const currentListing = await EarbudListing.findById(listingId).populate('userId');
  if (!currentListing || currentListing.status !== 'available') return [];

  // Find opposite-side listings with same brand/model
  const matches = await EarbudListing.find({
    brand: currentListing.brand,
    model: currentListing.model,
    side: currentListing.side === 'left' ? 'right' : 'left',
    status: 'available',
  }).populate('userId');

  // Filter by proximity (within 50km)
  const nearbyMatches = await User.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: currentListing.userId.location.coordinates,
        },
        $maxDistance: 50000, // 50km
      },
    },
  });

  const nearbyUserIds = nearbyMatches.map((user) => user._id);
  return matches.filter((match) => nearbyUserIds.includes(match.userId._id));
};