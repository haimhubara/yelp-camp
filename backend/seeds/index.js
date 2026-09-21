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

const randomImages = (images, amount) => {
    return [...images]
        .sort(() => 0.5 - Math.random())
        .slice(0, amount);
};

const imagesData = [
    {
        url: 'https://res.cloudinary.com/dge75zsga/image/upload/v1789815681/lesly-derksen-F4fH5dAfZnE-unsplash.jpg',
        filename: 'yelp-camp/lesly-derksen-F4fH5dAfZnE-unsplash'
    },
    {
        url: 'https://res.cloudinary.com/dge75zsga/image/upload/v1789815680/patrick-hendry-eDgUyGu93Yw-unsplash.jpg',
        filename: 'yelp-camp/patrick-hendry-eDgUyGu93Yw-unsplash'
    },
    {
        url: 'https://res.cloudinary.com/dge75zsga/image/upload/v1789815679/dino-reichmuth-5Rhl-kSRydQ-unsplash.jpg',
        filename: 'yelp-camp/dino-reichmuth-5Rhl-kSRydQ-unsplash'
    },
    {
        url: 'https://res.cloudinary.com/dge75zsga/image/upload/v1789815679/scott-goodwill-y8Ngwq34_Ak-unsplash.jpg',
        filename: 'yelp-camp/scott-goodwill-y8Ngwq34_Ak-unsplash'
    },
    {
        url: 'https://res.cloudinary.com/dge75zsga/image/upload/v1789815678/tegan-mierle-fDostElVhN8-unsplash.jpg',
        filename: 'yelp-camp/tegan-mierle-fDostElVhN8-unsplash'
    },
    {
        url: 'https://res.cloudinary.com/dge75zsga/image/upload/v1789815677/dino-reichmuth-pl1mhwMctJc-unsplash.jpg',
        filename: 'yelp-camp/dino-reichmuth-pl1mhwMctJc-unsplash'
    },
    {
        url: 'https://res.cloudinary.com/dge75zsga/image/upload/v1789815677/pars-sahin-V7uP-XzqX18-unsplash.jpg',
        filename: 'yelp-camp/pars-sahin-V7uP-XzqX18-unsplash'
    },
    {
        url: 'https://res.cloudinary.com/dge75zsga/image/upload/v1789815675/matt-whitacre-F4GGnyJ8aiI-unsplash.jpg',
        filename: 'yelp-camp/matt-whitacre-F4GGnyJ8aiI-unsplash'
    },
    {
        url: 'https://res.cloudinary.com/dge75zsga/image/upload/v1789815674/kevin-ianeselli-ebnlHkqfUHY-unsplash.jpg',
        filename: 'yelp-camp/kevin-ianeselli-ebnlHkqfUHY-unsplash'
    },
    {
        url: 'https://res.cloudinary.com/dge75zsga/image/upload/v1789815674/mike-erskine-S_VbdMTsdiA-unsplash.jpg',
        filename: 'yelp-camp/mike-erskine-S_VbdMTsdiA-unsplash'
    },
    {
        url: 'https://res.cloudinary.com/dge75zsga/image/upload/v1789815672/jimmy-conover-J_XuXX9m0KM-unsplash.jpg',
        filename: 'yelp-camp/jimmy-conover-J_XuXX9m0KM-unsplash'
    },
    {
        url: 'https://res.cloudinary.com/dge75zsga/image/upload/v1789815671/guillaume-gouin-68YXvKCobKI-unsplash.jpg',
        filename: 'yelp-camp/guillaume-gouin-68YXvKCobKI-unsplash'
    },
    {
        url: 'https://res.cloudinary.com/dge75zsga/image/upload/v1789815670/chris-cordes-U4uYhPtgRIs-unsplash.jpg',
        filename: 'yelp-camp/chris-cordes-U4uYhPtgRIs-unsplash'
    },
    {
        url: 'https://res.cloudinary.com/dge75zsga/image/upload/v1789815669/dave-hoefler-a3e7yEtQxJs-unsplash.jpg',
        filename: 'yelp-camp/dave-hoefler-a3e7yEtQxJs-unsplash'
    },
    {
        url: 'https://res.cloudinary.com/dge75zsga/image/upload/v1789815669/jesse-gardner-wTVr4HR4SBI-unsplash.jpg',
        filename: 'yelp-camp/jesse-gardner-wTVr4HR4SBI-unsplash'
    },
    {
        url: 'https://res.cloudinary.com/dge75zsga/image/upload/v1789815666/everett-mcintire-BPCsppbNRMI-unsplash.jpg',
        filename: 'yelp-camp/everett-mcintire-BPCsppbNRMI-unsplash'
    },
    {
        url: 'https://res.cloudinary.com/dge75zsga/image/upload/v1789815666/chris-holder-uY2UIyO5o5c-unsplash.jpg',
        filename: 'yelp-camp/chris-holder-uY2UIyO5o5c-unsplash'
    },
    {
        url: 'https://res.cloudinary.com/dge75zsga/image/upload/v1789815663/alfred-boivin-XoM0eYSXWMs-unsplash.jpg',
        filename: 'yelp-camp/alfred-boivin-XoM0eYSXWMs-unsplash'
    }

]

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
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },

            images: randomImages(imagesData, 3),
        })
        await camp.save()
    }

    mongoose.connection.close();
}

seedDb();
