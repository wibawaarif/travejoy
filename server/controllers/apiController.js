const Item = require('../models/Item')
const Treasure = require('../models/Activity')
const Traveller = require('../models/Booking')

module.exports = {
    landingPage: async(req, res) => {
        try {
            const mostPicked = await Item.find({})
                .select('_id title country city price unit imageId')
                .limit(5)
                .populate({
                    path: 'imageId',
                    select: '_id imageUrl'
                })

            const traveller = await Traveller.find();
            const treasure = await Treasure.find();
            const city = await Item.find();


            res.status(200).json({
                hero: {
                    travelers: traveller.length,
                    treasures: treasure.length,
                    cities: city.length,
                },
                mostPicked
            })
        } catch (error) {
            
        }

    }
}