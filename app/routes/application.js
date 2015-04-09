import Ember from 'ember';
import ENV from 'dblist-ember/config/environment';

export default Ember.Route.extend({
  model: function() {
    var that = this;
    // Used to load data that will not be changed during runtime
    return Ember.RSVP.hash({
      descriptions: this.callQuery('/dblist_descriptions/select?q=*%3A*&wt=json&rows=10000'),
      categories: this.callQuery('/dblist_categories/select?q=*%3A*&wt=json&rows=10000')
    });
    },
    setupController: function(controller, model) {
    // To be able to access from specific controllers
    controller.set('model', {});
    var descriptions = Ember.A([]);
    model.descriptions.forEach(function(entry) {
      descriptions.pushObject(Ember.Object.create(entry));
    });
    controller.set('model.descriptions', descriptions);

    var categories = Ember.A([]);
    model.categories.forEach(function(entry) {
      categories.pushObject(Ember.Object.create(entry));
    });
    controller.set('model.categories', categories);
  },
  callQuery: function(link) {
   return Ember.$.ajax({
    type: 'GET',
    url: ENV.APP.serviceURL + link,
    data: {
    },
    dataType: 'jsonp',
    jsonp: 'json.wrf'
  }).then(function(response) {
    return response.response.docs;
  },
  function(error) {
    console.log(error);
  })
}
});
