//-----Using MongoDB native driver--------------//
/*
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'fruitsDB';

// Create a new MongoClient
const client = new MongoClient(url, {
  useUnifiedTopology: true
});

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  findDocuments(db, function() {
    client.close();
  });
});

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Insert some documents
  collection.insertMany([{
      name: "Apple",
      score: 8,
      review: "Great fruit"
    },
    {
      name: "Orange",
      score: 6,
      review: "Kinda sour"
    },
    {
      name: "Banana",
      score: 9,
      review: "Great stuff!"
    }
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits)
    callback(fruits);
  });
}*/

//------------Using Mongoose--------------//
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,"No name specified"] //validation
  },
  score: {
    type: Number,
    min: 1, //validation
    max: 10 //validation
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const personSchema=new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit:fruitSchema
});

const Person = mongoose.model("Person",personSchema);

const apple = new Fruit({
  name: "Apple",
  score: 8,
  review: "Great fruit"
});

const orange = new Fruit({
  name: "Orange",
  score: 4,
  review: "Too sour"
});

const banana = new Fruit({
  name: "Banana",
  score: 3,
  review: "Weird texture"
});

const melon = new Fruit({
  name: "Melon",
  score: 8,
  review: "Greatest fruit"
});

const pineapple = new Fruit({
  name: "Pineapple",
  score: 9,
  review: "Greatest fruit"
});


const person = new Person(
  {
      name: "Amy",
      age: 12,
      favouriteFruit:pineapple
    }
);

person.save();
//pineapple.save();

// Fruit.insertMany([apple,orange, banana], function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Fruits saved correctly");
//   }
// });

Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close();

    //fruits.forEach(fruit => console.log(fruit.name));
    for (var fruit of fruits) {
      console.log(fruit.name);
    }
  }
});

/*Fruit.updateOne({_id:"60d39bc4e3526d388b271cdf"},{name:"Peach"},function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully updated fruit");
  }
});*/


// Fruit.deleteOne({_id:"60d39b8fb765fd3835588069"},function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted fruit");
//   }
// });
// ---Challenge-----
/*const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/peopleDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});*/
