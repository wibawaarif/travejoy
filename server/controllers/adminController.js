const Category = require('../models/Category');
const Bank = require('../models/Bank')
const Item = require('../models/Item')
const Image = require('../models/Image')
const Feature = require('../models/Feature')
const Activity = require('../models/Activity')
const User = require('../models/User')
const Booking = require('../models/Booking')
const Member = require('../models/Member')

const { getStorage, ref, deleteObject ,uploadBytesResumable } = require('firebase/storage')
const { signInWithEmailAndPassword, } = require("firebase/auth");
const { auth } = require('../config/firebase.config')

const bcrypt = require('bcryptjs')
const fs = require('fs-extra')
const path = require('path')

async function uploadImage(file, quantity) {
    const storageFB = getStorage();

    await signInWithEmailAndPassword(auth, process.env.FIREBASE_USER, process.env.FIREBASE_AUTH)

    if (quantity === 'single') {
        const dateTime = Date.now();
        const fileName = `images/${dateTime}`
        const storageRef = ref(storageFB, fileName)
        const metadata = {
            contentType: file.type,
        }
        await uploadBytesResumable(storageRef, file.buffer, metadata);
        return fileName
    }

    if (quantity === 'multiple') {
        for(let i=0; i < file.images.length; i++) {
            const dateTime = Date.now();
            const fileName = `images/${dateTime}`
            const storageRef = ref(storageFB, fileName)
            const metadata = {
                contentType: file.images[i].mimetype,
            }

            const saveImage = await Image.create({imageUrl: fileName});
            file.item.imageId.push({_id: saveImage._id});
            await file.item.save();

            await uploadBytesResumable(storageRef, file.images[i].buffer, metadata);

        }
        return
    }

}

async function deleteImage(image) {
    try {
        const storage = getStorage();
        await signInWithEmailAndPassword(auth, process.env.FIREBASE_USER, process.env.FIREBASE_AUTH)
        const desertRef = ref(storage, image)
        await deleteObject(desertRef);
    } catch (error) {
        console.log(error)
    }


}

module.exports = {
    viewSignin: async (req, res) => {
        try {
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {message: alertMessage, status: alertStatus}
            if(req.session.user == null || req.session.user == undefined) {
                res.render('index', { alert, title: "Travejoy | Login" });
            } else {
                res.redirect('/admin/dashboard')
            }

        } catch (error) {
            res.redirect('/admin/signin')
        }
    },
    actionSignin: async (req, res) => {
        try {
            const { username, password } = req.body;

            const user = await User.findOne({username});
            if (!user) {
                req.flash('alertMessage', 'User not found')
                req.flash('alertStatus', 'danger')
                res.redirect('/admin/signin')
            }

            const isPasswordMatch = await bcrypt.compare(password, user.password)

            if(!isPasswordMatch) {
                req.flash('alertMessage', 'Invalid credentials')
                req.flash('alertStatus', 'danger')
                res.redirect('/admin/signin')
            }

            req.session.user = {
                id: user.id,
                username: user.username
            }

            res.redirect('/admin/dashboard')
        } catch (error) {
            res.redirect('/admin/signin')
        }
    },
    actionLogout: (req,res) => {
        req.session.destroy();
        res.redirect('/admin/signin')
    },
    viewDashboard: async (req, res) => {
        try {
            const member = await Member.find({});
            const booking = await Booking.find({});
            const item = await Item.find({});
            res.render('admin/dashboard/view_dashboard', {
                title: "Travejoy | Dashboard",
                user: req.session.user,
                member,
                booking,
                item
            });
        } catch (error) {
            res.redirect('/admin/dashboard')
        }
 
    },
    viewCategory: async(req, res) => {

        try {
            const category = await Category.find({})
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {message: alertMessage, status: alertStatus}
            res.render('admin/category/view_category', { category, alert, title: "Travejoy | Category", user: req.session.user });
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
                bank,
                user: req.session.user
                
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
        const file = {
            type: req.file.mimetype,
            buffer: req.file.buffer
        }
        const buildImage = await uploadImage(file, 'single'); 

        await Bank.create({name, accountNumber: account, bankName: bank, imageUrl: buildImage});

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
            if (!bank) return res.status(400).send({message: 'Bank ID Not Found'})
            await deleteImage(bank.imageUrl)
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
                action: 'view',
                user: req.session.user
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
            const files = {
                item,
                images: req.files
            }
            await uploadImage(files ,'multiple')

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
                action: 'show image',
                user: req.session.user
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
    deleteItem: async(req, res) => {
        try {
            const {id} = req.params;
            const item = await Item.findOne({_id: id}).populate('imageId')
            for(let i=0; i < item.imageId.length; i++) {
                Image.findOne({_id: item.imageId[i]._id}).then((image) => {
                    fs.unlink(path.join(`public/${image.imageUrl}`));
                    deleteImage(image.imageUrl).then(res => {
                        console.log(res)
                    }).catch(err => {
                        console.log(err)
                    })
                    image.remove();
                }).catch((error) => {
                    req.flash('alertMessage', `${error.message}`)
                    req.flash('alertStatus', 'danger')
                    res.redirect('/admin/item')
                })
            }
            item.deleteOne({_id: id})
            req.flash('alertMessage', 'Success Delete item')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/item')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/item')
        }

    },
    viewDetailItem: async(req, res) => {
        const {itemId} = req.params;
        try {
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {message: alertMessage, status: alertStatus}
            const feature = await Feature.find({itemId})
            const activity = await Activity.find({itemId})
            res.render('admin/item/item_detail/view_item_detail', {
                title: "Travejoy | Item Detail",
                alert,
                itemId,
                feature,
                activity,
                user: req.session.user
            });
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect(`/admin/item/show-item-detail/${itemId}`)
        }
    },
    addFeature: async(req, res) => {
        const { quantity, itemId, name} = req.body;
        try{
        if (!req.file) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect(`/admin/item/show-item-detail/${itemId}`)
        }
        const feature = await Feature.create({name, qty: quantity, itemId, imageUrl: `images/${req.file.filename}`});

        const item = await Item.findOne({_id: itemId})
        item.featureId.push({_id: feature._id})
        await item.save()
            req.flash('alertMessage', 'Success Add Feature')
            req.flash('alertStatus', 'success')
            res.redirect(`/admin/item/show-item-detail/${itemId}`)
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect(`/admin/item/show-item-detail/${itemId}`)
        }
    },
    editFeature: async(req, res) => {
        const { id, name, quantity, itemId } = req.body;

        try {
            const feature = await Feature.findById(id)
            if (req.file == undefined) {
                feature.name = name,
                feature.qty = quantity,
                await feature.save();
                req.flash('alertMessage', 'Success Update Feature')
                req.flash('alertStatus', 'success')
                res.redirect(`/admin/item/show-item-detail/${itemId}`)
            } else {
                // delete file
                await fs.unlink(path.join(`public/${feature.imageUrl}`))
                feature.name = name,
                feature.qty = quantity,
                feature.imageUrl = `images/${req.file.filename}`
                await feature.save();
                req.flash('alertMessage', 'Success Update Feature')
                req.flash('alertStatus', 'success')
                res.redirect(`/admin/item/show-item-detail/${itemId}`)
            }
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect(`/admin/item/show-item-detail/${itemId}`)
        }

    },
    deleteFeature: async(req, res) => {
        const { id, itemId } = req.params;
        try {
            const feature = await Feature.findById(id)

            const item = await Item.findOne({_id: itemId})
                .populate('featureId')

            for(let i=0; i < item.featureId.length; i++) {
                if (item.featureId[i]._id.toString() === feature._id.toString()) {
                    item.featureId.pull({_id: feature._id})
                    await item.save();
                }
            }


            await fs.unlink(path.join(`public/${feature.imageUrl}`))
            feature.deleteOne({_id: id})
            req.flash('alertMessage', 'Success Delete Feature')
            req.flash('alertStatus', 'success')
            res.redirect(`/admin/item/show-item-detail/${itemId}`)
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect(`/admin/item/show-item-detail/${itemId}`)
        }

    },
    addActivity: async(req, res) => {
        const { type, itemId, name} = req.body;
        try{
        if (!req.file) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect(`/admin/item/show-item-detail/${itemId}`)
        }
        const activity = await Activity.create({name, type, itemId, imageUrl: `images/${req.file.filename}`});

        const item = await Item.findOne({_id: itemId})
        item.activityId.push({_id: activity._id})
        await item.save()
            req.flash('alertMessage', 'Success Add Activity')
            req.flash('alertStatus', 'success')
            res.redirect(`/admin/item/show-item-detail/${itemId}`)
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect(`/admin/item/show-item-detail/${itemId}`)
        }
    },
    editActivity: async(req, res) => {
        const { id, name, type, itemId } = req.body;
        const activity = await Activity.findById(id)
        try {
            if (req.file == undefined) {
                activity.name = name,
                activity.type = type,
                await activity.save();
                req.flash('alertMessage', 'Success Update Activity')
                req.flash('alertStatus', 'success')
                res.redirect(`/admin/item/show-item-detail/${itemId}`)
            } else {
                // delete file
                await fs.unlink(path.join(`public/${activity.imageUrl}`))
                activity.name = name,
                activity.type = type,
                activity.imageUrl = `images/${req.file.filename}`
                await activity.save();
                req.flash('alertMessage', 'Success Update Activity')
                req.flash('alertStatus', 'success')
                res.redirect(`/admin/item/show-item-detail/${itemId}`)
            }
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect(`/admin/item/show-item-detail/${itemId}`)
        }

    },
    deleteActivity: async(req, res) => {
        const { id, itemId } = req.params;
        try {
            const activity = await Activity.findById(id)

            const item = await Item.findOne({_id: itemId})
                .populate('activityId')

            for(let i=0; i < item.activityId.length; i++) {
                if (item.activityId[i]._id.toString() === activity._id.toString()) {
                    item.activityId.pull({_id: activity._id})
                    await item.save();
                }
            }


            await fs.unlink(path.join(`public/${activity.imageUrl}`))
            activity.deleteOne({_id: id})
            req.flash('alertMessage', 'Success Delete Activity')
            req.flash('alertStatus', 'success')
            res.redirect(`/admin/item/show-item-detail/${itemId}`)
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect(`/admin/item/show-item-detail/${itemId}`)
        }

    },
    viewBooking: async (req, res) => {
        try {
            const booking = await Booking.find({})
                .populate('memberId')
                .populate('bankId')


            res.render('admin/booking/view_booking', {
                title: "Travejoy | Booking",
                user: req.session.user,
                booking,
            });
        } catch (error) {
            res.redirect('/admin/booking')
        }

    },
    showDetailBooking: async (req, res) => {
        const { id } = req.params
        try {
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = {message: alertMessage, status: alertStatus}

            const booking = await Booking.findOne({_id: id})
                .populate('memberId')
                .populate('bankId')
            res.render('admin/booking/show_detail_booking', {
                title: "Travejoy | Booking Detail",
                user: req.session.user,
                booking,
                alert
            });
        } catch (error) {
            res.redirect('/admin/booking')
        }

    },
    actionConfirmation: async (req, res) => {
        const { id } = req.params
        try {
            const booking = await Booking.findOne({_id: id});
            booking.payments.status = 'Accepted';
            await booking.save();
            req.flash('alertMessage', 'Payment Accepted')
            req.flash('alertStatus', 'success')
            res.redirect(`/admin/booking/${id}`)

        } catch (error) {
            res.redirect(`/admin/booking/${id}`)
        }
    },
    actionRejection: async (req, res) => {
        const { id } = req.params
        try {
            const booking = await Booking.findOne({_id: id});
            booking.payments.status = 'Rejected';
            await booking.save();
            req.flash('alertMessage', 'Payment Rejected')
            req.flash('alertStatus', 'success')
            res.redirect(`/admin/booking/${id}`)

        } catch (error) {
            res.redirect(`/admin/booking/${id}`)
        }
    }
}