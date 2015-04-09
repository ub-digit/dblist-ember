import Ember from 'ember';
import ENV from 'dblist-ember/config/environment';
import DatabaseList from 'dblist-ember/models/database-list'

export default Ember.Route.extend({
  queryParams: {
    rows: {
      refreshModel: true
    },
    searchString: {
      refreshModel: true
    }
  },
  model: function(params) {
    var rows = params.rows;
    var searchString = 'title%3A*' + params.searchString + '*';
    if (!params.searchString) {
      searchString = '*%3A*';
    }
    return Ember.$.ajax({
      type: 'GET',
      url: ENV.APP.serviceURL + '/dblist_databases/select?q=' + searchString + '&wt=json&rows=' + rows,
      data: {
      },
      dataType: 'jsonp',
      jsonp: 'json.wrf'
    }).then(function(response) {
      return DatabaseList.create(response.response);
    },
    function(error) {
      console.log(error);
    });
  }

});