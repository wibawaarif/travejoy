const Category = require('../models/Category');
const Bank = require('../models/Bank')
const Item = require('../models/Item')
const Image = require('../models/Image')
const fs = require('fs-extra')
const path = require('path')

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
    viewBank: async(req, res) => {
        try {
            const bank = await Bank.find({})
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {message: alertMessage, status: alertStatus}
            res.render('admin/bank/view_bank', {
                title: "Travejoy | Bank",
                alert,
                bank
                
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
        await Bank.create({name, accountNumber: account, bankName: bank, imageUrl: `images/${req.file.filename}`});

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
    editBank: async(req, res) => {
        try {
            const { id, name, account, bank } = req.body;
            const editBank = await Bank.findById(id)
            if (req.file == undefined) {
                editBank.name = name,
                editBank.accountNumber = account,
                editBank.bankName = bank
                await editBank.save();
                req.flash('alertMessage', 'Success Update Bank')
                req.flash('alertStatus', 'success')
                res.redirect('/admin/bank') 
            } else {
                // delete file
                await fs.unlink(path.join(`public/${editBank.imageUrl}`))
                editBank.name = name,
                editBank.accountNumber = account,
                editBank.bankName = bank
                editBank.imageUrl = `images/${req.file.filename}`
                await editBank.save();
                req.flash('alertMessage', 'Success Update Bank')
                req.flash('alertStatus', 'success')
                res.redirect('/admin/bank') 
            }
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/bank')
        }

    },
    deleteBank: async(req, res) => {
        try {
            const { id } = req.params;
            const bank = await Bank.findById(id)
            await fs.unlink(path.join(`public/${bank.imageUrl}`))
            bank.deleteOne({_id: id})
            req.flash('alertMessage', 'Success Delete Bank')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/bank')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/bank')
        }

    },
    viewItem: async (req, res) => {
        try {
            const item = await Item.find({})
                .populate({path: 'imageId', select: 'id imageUrl'})
                .populate({path: 'categoryId', select: 'id name'})
            const category = await Category.find({})
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {message: alertMessage, status: alertStatus}
            res.render('admin/item/view_item', {
                title: "Travejoy | Item",
                alert,
                category,
                item,
                action: 'view'
            });
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/bank')
        }

    },
    addItem: async(req, res) => {
        try{
        const { categoryId, title, price, city, about } = req.body;
        if (req.files.length > 0) {
            const category = await Category.findOne({_id: categoryId})
            const newItem = {
                categoryId: category.id,
                title,
                description: about,
                price,
                city,
            }
            const item = await Item.create(newItem)
            category.itemId.push({_id: item._id})
            await category.save()
            for(let i=0; i < req.files.length; i++) {
                const saveImage = await Image.create({imageUrl: `images/${req.files[i].filename}`});
                item.imageId.push({_id: saveImage._id});
                await item.save();
            }
            req.flash('alertMessage', 'Success Add item')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/item')
        }
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/item')
        }
    },

    showImageItem: async(req, res) => {
        try {
            const {id} = req.params;
            const item = await Item.findOne({_id: id})
                .populate({path: 'imageId', select: 'id imageUrl'})
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {message: alertMessage, status: alertStatus}
            res.render('admin/item/view_item', {
                title: "Travejoy | Show Image Item",
                alert,
                item,
                action: 'show image'
            });
            
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/item')
        }
    },
    showEditItem: async(req, res) => {
        try {
            const {id} = req.params;
            const item = await Item.findOne({_id: id})
                .populate({path: 'imageId', select: 'id imageUrl'})
                .populate({path: 'categoryId', select: 'id name'})
            const category = await Category.find({})
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {message: alertMessage, status: alertStatus}
            res.render('admin/item/view_item', {
                title: "Travejoy | Show Edit Item",
                alert,
                item,
                category,
                action: 'edit'
            });
            
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/item')
        }
    },
    editItem: async(req, res) => {
        try {
            const {id} = req.params;
            const { categoryId, title, price, city, about } = req.body;
            const editBank = await Bank.findById(id)
            const item = await Item.findOne({_id: id})
                .populate({path: 'imageId', select: 'id imageUrl'})
                .populate({path: 'categoryId', select: 'id name'})
        
            if(req.files.length > 0) {
                for(let i=0; i < item.imageId.length; i++) {
                    const imageUpdate = await Image.findOne({_id: item.imageId[i]._id});
                    await fs.unlink(path.join(`public/${imageUpdate.imageUrl}`));
                    imageUpdate.imageUrl = `images/${req.files[i].filename}`
                    await imageUpdate.save();
                }
                item.title = title;
                item.price = price;
                item.city = city,
                item.description = about;
                item.categoryId = categoryId;
                await item.save();
                req.flash('alertMessage', 'Success Edit item')
                req.flash('alertStatus', 'success')
                res.redirect('/admin/item')

            } else {
                item.title = title;
                item.price = price;
                item.city = city,
                item.description = about;
                item.categoryId = categoryId;
                await item.save();
                req.flash('alertMessage', 'Success Edit item')
                req.flash('alertStatus', 'success')
                res.redirect('/admin/item')
            }
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/item')
        }

    },
    viewBooking: (req, res) => {
        res.render('admin/booking/view_booking', {
            title: "Travejoy | Booking"
        });
    }
}