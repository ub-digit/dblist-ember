import Ember from 'ember';

export default Ember.Route.extend({

  model: function(params) {
    return Ember.$.ajax({
      type: 'GET',
      url: 'http://130.241.35.208:90/solr/dblist_databases/select?q=*%3A*&wt=json',
      data: {
      },
      dataType: 'jsonp',
      jsonp: 'json.wrf'
    }).then(function(response) {
      return response.response;
    },
    function(error) {
      console.log(error);
    });
  }

});