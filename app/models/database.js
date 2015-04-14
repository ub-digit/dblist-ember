import Ember from 'ember';
import ENV from 'dblist-ember/config/environment';

export default Ember.Object.extend({

  // Fetches Url items for Database-record
  getUrls: function(){
    var that = this;
    var urls = this.callQuery('/dblist_urls/select?q=db_id%3A' + this.get('id') + '&wt=json&rows=10000').then(
      function(urls){
        // Store url value as url
        if (urls.length > 0) {
          that.set('url', urls.objectAt(0));
        }
        if (urls.length > 1) {
          that.set('extraUrls', urls.slice(1));
        }
      });
  }.on("init"),

  description: Ember.computed('descriptions', function(){
    return this.get('descriptions')[0];
  }),

  // Returns true if main URL has reference to ezproxy
  isLocked: Ember.computed('url', function(){
    if (this.get('url') && this.get('url').url.indexOf('ezproxy.ub.gu.se') !== -1) {
      return true;
    }
    return false;
  }),

  // Returns any additional descriptions as array
  extraDescriptions: function() {
    return this.get('descriptions').slice(1);
  }.property('descriptions'),

  // Used for bootstrap logic
  objectIdentifier: function() {
    return '#' + this.get('id');
  }.property('id'),

  callQuery: function(link) {
    var that = this;
    return Ember.$.ajax({
      type: 'GET',
      url: ENV.APP.serviceURL + link,
      data: {
      },
      dataType: 'jsonp',
      jsonp: 'json.wrf',
      contentType: "application/javascript; charset=utf-8"
    }).then(function(response) {
      var list = Ember.A([]);
      response.response.docs.forEach(function(entry) {
        list.pushObject(entry);
      });

      return list;
    },
    function(error) {
      console.log(error);
    });
  }

});