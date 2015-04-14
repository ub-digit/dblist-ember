import Ember from 'ember';
import ENV from 'dblist-ember/config/environment';

export default Ember.Object.extend({

  // Fetches Url items for Database-record
  getUrls: function(){
    //this.callQuery('urls', '/dblist_urls/select?q=db_id%3A' + this.get('id') + '&wt=json&rows=10000');
    //console.log(this.get('urls'));
  }.on("init"),

  // Returns any additional descriptions as array
  extraDescriptions: function() {
    if (this.get('descriptions').length > 1) {
      return this.get('descriptions').slice(1);
    } else {
      return [];
    }
  }.property('descriptions'),

  // Used for bootstrap logic
  objectIdentifier: function() {
    return '#' + this.get('id');
  }.property('id'),

  callQuery: function(field, link) {
    var that = this;
    Ember.$.ajax({
      type: 'GET',
      url: ENV.APP.serviceURL + link,
      data: {
      },
      dataType: 'jsonp',
      jsonp: 'json.wrf',
      contentType: "application/json; charset=utf-8"
    }).then(function(response) {
      var list = Ember.A([]);
      console.log(response);
      response.response.docs.forEach(function(entry) {
        list.pushObject(Ember.Object.create(entry));
      });
      that.set(field, list);
    },
    function(error) {
      console.log(error);
    });
  }

});