const express = require('express');
const router = express.Router();
const { addBook, fetchAllBook, deleteBooksByTitle} = require('../controllers/book');
const { protect, authorize } = require('../../middleware/auth');
var advancedFind = require('../middleware/Advancedfind');
const Book = require('../../models/book');


router.route('/')
    .get(protect,authorize('admin'), advancedFind(Book), fetchAllBook)
    .post(/*protect, authorize(),*/ addBook)

router.route('/:title')
    .delete(protect, authorize('admin'), deleteBooksByTitle)

module.exports = router;