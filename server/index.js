'use strict';

var Realm = require('realm');

// var realm = new Realm({
//   schema: [{name: 'Dog', properties: {name: 'string'}}]
// });
//
// realm.write(() => {
//   realm.create('Dog', {name: 'Lex Luthor'});
// });

const CarSchema = {
  name: 'Car',
  properties: {
    make:  'string',
    model: 'string',
    miles: {type: 'int', default: 0},
  }
};

const PersonSchema = {
  name: 'Person',
  properties: {
    name:     'string',
    birthday: {type: 'date', optional: true}, // former date new Date(1995, 11, 25),
    cars:     {type: 'list', objectType: 'Car'},
    picture:  {type: 'data', optional: true}, // optional property
  }
};

// Initialize a Realm with Car and Person models
// let realm = new Realm({schema: [CarSchema, PersonSchema]});

// Open a realm at a specific path other that default.realm
let realm = new Realm({
  path: './../realms/persons_cars.realm',
  schema: [CarSchema, PersonSchema]
});

realm.write(() => {
  let car = realm.create('Car', {
    make: 'Honda',
    model: 'Civic',
    miles: 750,
  });
  let person = realm.create('Person', {
      name: 'Brenda',
      birthday: new Date(1968, 1, 5),
    });

  let carList = person.cars;
  carList.push({make: 'Honda', model: 'Accord', miles: 100});
  carList.push({make: 'Toyota', model: 'Prius', miles: 200});
  carList.push({make: 'BMW', model: '325i', miles: 23400});

  // person.car = {make: 'Ford', model: 'Transit', miles: 1100};

  // console.log(person.cars);

  // person.car.make = 'BMW 325i';
  // person.car.model = 'Turbo';
  // person.car.miles = 1100;

  // you can access and set all properties defined in your model
  console.log('');
  console.log('Car type is ' + car.make + ' ' + car.model);
  car.miles = 1500;
  console.log('The person is ' + person.name + ' and is born ' + person.birthday);
});
