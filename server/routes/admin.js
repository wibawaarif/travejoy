const router = require('express').Router();
const adminController = require('../controllers/adminController')
const { upload } = require('../middlewares/multer')

router.get('/dashboard', adminController.viewDashboard);
router.get('/category', adminController.viewCategory);
router.get('/bank', adminController.viewBank);
router.get('/item', adminController.viewItem);
router.get('/booking', adminController.viewBooking);
router.post('/category', adminController.addCategory);
router.put('/category', adminController.editCategory);
router.delete('/category/:id', adminController.deleteCategory);
router.post('/bank', upload, adminController.addBank);


module.exports = router;