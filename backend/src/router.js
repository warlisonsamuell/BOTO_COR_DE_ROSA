const express = require('express');
const multer = require('multer');

const router = express.Router();

const storage = require('./utils/savePDFFile');
const upload = multer({ storage });

const PeopleController = require('./controllers/peopleController');
const peopleController = new PeopleController();

// router.post('/pessoa', peopleController.create);
router.get('/pessoa', peopleController.index);
router.get('/completeResume', peopleController.getAll);

router.post('/pessoa', upload.single('file'), (req, res) => {
  res.status(200).json('ok');
});

module.exports = router;
