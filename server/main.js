import { Meteor } from 'meteor/meteor';
import '../imports/photos.js';
var API_URL = "https://api.flickr.com/services/feeds/photos_public.gne";

var fetchData = () => {
  HTTP.call('GET', API_URL, {}, function(callError,callResponse) {
    xml2js.parseString(callResponse.content, function (jsError, jsResult) {
      Photos.remove({});
      jsResult.feed.entry.forEach(entry => {
        if (entry.link[1]['$'].href.indexOf("creativecommons.org") !== -1) return;
        Photos.insert({
          title: entry.title[0],
          author: entry.author[0].name[0],
          image: entry.link[1]['$'].href
        });
      })
    });
  });
};

Meteor.startup(() => {
  SyncedCron.add({
    name: "Fetch data",
    schedule: function(parser) {
      return parser.text("every 5 seconds");
    },
    job: fetchData
  });

  SyncedCron.start();
});
