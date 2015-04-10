import Ember from 'ember';
import ENV from 'dblist-ember/config/environment';
import DatabaseList from 'dblist-ember/models/database-list';

export default Ember.Route.extend({
  queryParams: {
    rows: {
      refreshModel: true
    },
    searchString: {
      refreshModel: true
    },
    category: {
      refreshModel: true
    }
  },
  model: function(params) {
    var that = this;
    var rows = params.rows;
    var searchString = '((title%3A*' + params.searchString + '*)OR(libris_id%3A' + params.searchString + '))';
    var categoryString = '';
    //console.log(this.controllerFor('databases'));
    if (params.category) {
      categoryString = 'AND(categories%3A' + params.category + ')';
    }
    if (!params.searchString) {
      searchString = '(*%3A*)';
    }
    return Ember.$.ajax({
      type: 'GET',
      url: ENV.APP.serviceURL + '/dblist_databases/select?q=' + searchString + categoryString + '&wt=json&rows=' + rows,
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
  },

  setupController: function(controller, model) {
    model.applicationModel = controller.get('controllers.application.model');
    var databaseList = DatabaseList.create(model);
    controller.set('model', databaseList);
  }

});
