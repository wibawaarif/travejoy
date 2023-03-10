const Category = require('../models/Category');
const Bank = require('../models/Bank')

module.exports = {
    viewDashboard: (req, res) => {
        res.render('admin/dashboard/view_dashboard', {
            title: "Travejoy | Dashboard"
        });
    },
    viewCategory: async(req, res) => {

        try {
            const category = await Category.find({})
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {message: alertMessage, status: alertStatus}
            res.render('admin/category/view_category', { category, alert, title: "Travejoy | Category" });
        } catch (error) {
            res.redirect('/admin/category')
        }

    },
    viewBank: (req, res) => {
        try {
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {message: alertMessage, status: alertStatus}
            res.render('admin/bank/view_bank', {
                title: "Travejoy | Bank",
                alert
            });
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/bank')
        }

    },
    addCategory: async(req, res) => {
        try{
        const { name } = req.body;
        await Category.create({name});
        req.flash('alertMessage', 'Success Add Category')
        req.flash('alertStatus', 'success')
            res.redirect('/admin/category')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/category')
        }
    },
    addBank: async(req, res) => {
        try{
        const { bank, account, name } = req.body;
        await Bank.create({name, account, bank, imageUrl: `images/${req.file.filename}`});

            req.flash('alertMessage', 'Success Add Bank')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/bank')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/bank')
        }
    },
    deleteCategory: async(req, res) => {
        try {
            const { id } = req.params;
            const category = await Category.findById(id)
            category.deleteOne({_id: id})
            req.flash('alertMessage', 'Success Delete Category')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/category')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/category')
        }

    },
    editCategory: async(req, res) => {
        try {
            const { name, id } = req.body;
            const category = await Category.findById(id)
            category.name = name;
            await category.save()
            req.flash('alertMessage', 'Success Update Category')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/category') 
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/category')
        }

    },
    viewItem: (req, res) => {
        res.render('admin/item/view_item', {
            title: "Travejoy | Item"
        });
    },
    viewBooking: (req, res) => {
        res.render('admin/booking/view_booking', {
            title: "Travejoy | Booking"
        });
    }
}