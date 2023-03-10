const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const bookingSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    invoice: {
        type: String,
        required: true,
    },
    itemId: {
        _id: {
            type: ObjectId,
            ref: 'Item',
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        }
    },
    total: {
        type: Number,
        required: true,
    },
    memberId: {
        type: ObjectId,
        ref: 'Member'
    },
    bankId: {
        type: ObjectId,
        ref: 'Bank'
    },
    payments: {
    receipt: {
        type: String,
        required: true,
    },
    bankOrigin: {
        type: String,
        required: true,
    },
    accountHolder: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'Process'
    }
},
   
})


module.exports = mongoose.model('Booking', bookingSchema);