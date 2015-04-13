import Ember from 'ember';
import ENV from 'dblist-ember/config/environment';

export default Ember.Route.extend({
  model: function() {
    var that = this;
    var language = 'sv';
    // Used to load data that will not be changed during runtime
    return Ember.RSVP.hash({
      descriptions: this.callQuery('/dblist_descriptions/select?q=*%3A*&wt=json&rows=10000'),
      categories: this.callQuery('/dblist_categories/select?q=(*%3A*)AND(language%3A' + language +')&wt=json&rows=10000'),
      keywords: this.callQuery('/dblist_keywords/select?q=(*%3A*)AND(language%3A' + language + ')&wt=json&rows=10000')
    });
  },

  setupController: function(controller, model){
    controller.set('model', model);
    var rootElement = Ember.$(ENV.APP.rootElement);
    controller.set('model.externalParams', rootElement.data());
    if (!controller.get('model.externalParams.lang')) {
      controller.set('model.externalParams.lang', 'sv');
    }
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
    var list = Ember.A([]);
    response.response.docs.forEach(function(entry) {
      list.pushObject(Ember.Object.create(entry));
    });
    return list;
  },
  function(error) {
    console.log(error);
  });
}
});
