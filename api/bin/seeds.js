require("dotenv").config();
require('../config/db.config');
const mongoose = require('mongoose');
const { Faker, es, en } = require('@faker-js/faker');
const Event = require('../models/event.model');

const faker = new Faker({ locale: [es, en] });
const cities = {
  'madrid': [40.416775, - 3.703790],
  'barcelona': [41.390205, 2.154007]
}
const desiredEvents = 200;

function getRandomDate() {
  const from = faker.date.soon();
  const to = faker.date.soon({ refDate: from })
  return faker.date.betweens({ 
    from: from, 
    to: to, 
    count: 2 
  })
}

function getRandomAddress({ city }) {
  const [lat, lng] = faker.location.nearbyGPSCoordinate({ origin: cities[city], isMetric: true })
  return {
    city: city,
    street: faker.location.streetAddress(),
    location: {
      type: 'Point',
      coordinates: [lng, lat]
    }
  }
}

function getRandomEvent({ seed }) {
  const [startDate, endDate] =  getRandomDate();
  return {
    title: faker.lorem.words({ min: 2, max: 4 }),
    description: faker.lorem.paragraphs({ min: 3, max: 10 }),
    startDate,
    endDate,
    categories: [faker.word.adjective(), faker.word.adjective()],
    poster: `https://picsum.photos/seed/${seed}/800/600`,
    address: getRandomAddress({ city: faker.helpers.arrayElement(Object.keys(cities))})
  }
}

function getRandomEvents(size) {
  const events = [];
  for (let i = 0; i < size;i++) {
    events.push(getRandomEvent({ seed: i }));
  }
  return events;
}

Event.collection.drop()
  .then(() => Event.create(getRandomEvents(desiredEvents)))
  .then((events) => console.info(`- Created events: ${events.length}`))
  .catch((error) => console.error(error))
  .finally(() => mongoose.connection.close())

/*

{
    "title": "Concierto de Flamenco al Aire Libre",
    "description": "Vive una experiencia auténtica del flamenco en un entorno único.",
    "startDate": "2025-02-25T13:00:00Z",
    "endDate": "2025-02-25T14:00:00Z",
    "categories": ["pepe"],
    "address": {
        "city": "Madrid",
        "street": "C/ Falsa 123",
        "location": {
            "lat": 50,
            "lng": 50
        }
    }
}
    
*/

