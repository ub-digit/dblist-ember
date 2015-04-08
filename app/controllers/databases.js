import Ember from 'ember';
import ENV from 'dblist-ember/config/environment';
export default Ember.Controller.extend({

  actions: {
    search: function() {
      var that = this;
      var searchString = this.get('searchString');
      Ember.$.ajax({
        type: 'GET',
        url: ENV.APP.serviceURL + '/dblist_databases/select?q=title%3A*' + searchString + '*&wt=json',
        data: {
        },
        dataType: 'jsonp',
        jsonp: 'json.wrf'
      }).then(function(response) {
        console.log(response)
        that.set('model', response.response);
      },
      function(error) {
        console.log(error);
      });
    }
  }
});