const Category = require('../models/Category');

module.exports = {
    viewDashboard: (req, res) => {
        res.render('admin/dashboard/view_dashboard');
    },
    viewCategory: async(req, res) => {
        const category = await Category.find({})
        console.log(category)
        res.render('admin/category/view_category', { category });
    },
    viewBank: (req, res) => {
        res.render('admin/bank/view_bank');
    },
    addCategory: async(req, res) => {
        const { name } = req.body;
        await Category.create({name});
        res.redirect('/admin/category')
    },
    deleteCategory: async(req, res) => {
        const { id } = req.params;
        const category = await Category.findById(id)
        category.deleteOne({_id: id})
        res.redirect('/admin/category')
    },
    editCategory: async(req, res) => {
        const { name, id } = req.body;
        const category = await Category.findById(id)
        category.name = name;
        await category.save()
        res.redirect('/admin/category')
    },
    viewItem: (req, res) => {
        res.render('admin/item/view_item');
    },
    viewBooking: (req, res) => {
        res.render('admin/booking/view_booking');
    }
}