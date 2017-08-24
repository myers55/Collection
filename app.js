const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const express = require('express');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const Coin = require('./models/collection.js');
const application = express();
const router = express.Router();

application.use(bodyParser.urlencoded({ extended: false }));
application.use(bodyParser.json());
application.use(express.static(__dirname + '/public'));
mongoose.connect('mongodb://localhost:27017/coindb');
application.engine('mustache', mustacheExpress());

application.set('views', './views');
application.set('view engine', 'mustache');

application.get('/', async (request, response) => {
    var coins = await Coin.find();
    var model = { Coin: coins };
    console.log('in the get');
    response.render('index', model);
});
application.post('/', (request, response) => {
    var newCoin = new Coin();
    newCoin = {
        name: request.body.name,
        year: request.body.year,
        location: {
            state: request.body.state,
            country: request.body.country,
        },
        description: request.body.description,
    }
    console.log('in the post');
    Coin.create(newCoin);
    console.log(newCoin);
    console.log(Coin);
    response.redirect('/');
});
application.get('/:id', async (request, response) => {
    var coins = await Coin.find();
    var model = { Coin: coins };
    response.render('look', model);
    console.log('get {{id}}');
});
///EDIT///
application.get('/edit/:id', async (request, response) => {
    var id = request.params.id;
    // var coin = await Coin.find({_id:id});
    // var model = {coin: coin, id:id};
    var coins = await Coin.findById(id);
    var model = { Coin: coins };
    response.render('edit', model);
});

application.post('/edit/:id', async (request, response) => {
    var id = request.params.id;
    var test = await Coin.findByIdAndUpdate(id,
        {
            $set: {
                name: request.body.name,
                year: request.body.year,
                location: {
                    state: request.body.state,
                    country: request.body.country,
                },
                description: request.body.description,
            }
        })
    console.log(request.body);

    response.redirect('/');
});
application.listen(3000);