const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelper');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Mongo connection error:', err));



const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error'))
db.once("open", () => {
    console.log("Database connected")
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: "6a984466f0ee7735f088e7e1",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dge75zsga/image/upload/v1788945633/yelp-camp/duuvx1gyirqrnqb4clg1.jpg',
                    filename: 'yelp-camp/duuvx1gyirqrnqb4clg1',
                   
                },
                {
                    url: 'https://res.cloudinary.com/dge75zsga/image/upload/v1788945633/yelp-camp/amolbaont78bpdhklit0.jpg',
                    filename: 'yelp-camp/amolbaont78bpdhklit0',
                   
                }
            ],
        })
        await camp.save()
    }

    mongoose.connection.close();
}

seedDb();
