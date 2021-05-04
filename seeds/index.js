const mongoose = require('mongoose');
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
});

const sample = array => array[Math.floor(Math.random()* array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()* 20) + 10;
        const camp = new Campground({
            author: '607c10e6b20c2100f4258696',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti, tempora? Facilis sequi tempora ad necessitatibus quas harum error. Quae illum porro expedita quos in dolores vero reiciendis saepe nihil vel.',
            price,
            geometry: { 
                type: 'Point', 
                coordinates: [
                    cities[random1000].longitude, 
                    cities[random1000].latitude, 
                ],
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/missouricloud/image/upload/v1619279971/YelpCamp/uofo9u0g9yqiux3dw2tw.jpg',
                  filename: 'YelpCamp/uofo9u0g9yqiux3dw2tw'
                },
                {
                  url: 'https://res.cloudinary.com/missouricloud/image/upload/v1619279972/YelpCamp/fiv3vwquezwuac1ufzec.jpg',
                  filename: 'YelpCamp/fiv3vwquezwuac1ufzec'
                }
              ]
              
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})