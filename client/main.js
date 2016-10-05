import { Template } from 'meteor/templating';
import './main.html';
import '../imports/photos.js';

Template.activity.onCreated(function() {
  this.subscribe('photos');
});

Template.activity.helpers({
  photos() {
    return Photos.find({});
  }
});
