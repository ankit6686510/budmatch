import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  createListing,
  getListings,
  deleteListing,
} from '../controllers/listingController.js';

const router = express.Router();

router.post('/', protect, createListing);
router.get('/', getListings);
router.delete('/:id', protect, deleteListing);

export default router;