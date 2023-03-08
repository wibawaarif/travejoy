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
    itemId: [{
        _id: {
            type: ObjectId,
            ref: 'Item',
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        night: {
            type: Number,
            required: true,
        }
    }],
    memberId: [{
        type: ObjectId,
        ref: 'Member'
    }],
    bankId: {
        type: ObjectId,
        ref: 'Bank'
    },
    payment: [{
        type: String,
        required: true,
    }],
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
        required: true,
    }

})


module.exports = mongoose.model('Booking', bookingSchema);