'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config.js');
    


/* Connect to your database */
 mongoose.connect(config.db.uri,
  {
    useMongoClient:true, 
 });

 var db = mongoose.connection;
 db.on('error', console.error.bind(console, 'Could not connect to MongoDB'));
/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
*/
db.once('open', function addListings() {
   let listingData = JSON.parse(fs.readFileSync('listings.json', 'utf8'));
   for( let listingKey in listingData.entries){
       let newListing = new Listing(listingData.entries[listingKey]);
       newListing.save(function(err, listing){
        if(err) throw err;
      });
   }
});




/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */