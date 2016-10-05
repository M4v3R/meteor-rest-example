import { Meteor } from 'meteor/meteor';

Photos = new Mongo.Collection('photos');
if (Meteor.isServer) {
  Meteor.publish('photos', () => {
    return Photos.find();
  });
}
