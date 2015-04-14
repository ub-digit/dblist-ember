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
    },
    parentKeyword: {
      refreshModel: true
    },
    selectedKeywords: {
      refreshModel: true
    },
    language: {
      refreshModel: true
    }
  },
  model: function(params) {
    var that = this;
    var application = this.container.lookup('application:main');
    var language = application.get('locale');
    var rows = params.rows;
    var searchString = '((title%3A*' + params.searchString + '*)OR(libris_id%3A' + params.searchString + '))';
    var categoryString = '';
    var keywordString = '';
    var facetString = '&facet=true&facet.field={!ex=dc}categories_' + language + '&facet.field={!ex=dt}keywords_' + language

    if (params.category) {
      categoryString = '&fq={!tag=dc}categories_' + language + '%3A' + params.category + '';
    }
    if (params.parentKeyword) {
      keywordString = '&fq={!tag=dt}keywords_' + language + '%3A' + params.parentKeyword + '';
    }
    if (params.selectedKeywords) {
      var list = Ember.A(params.selectedKeywords.split(':'));
      keywordString += '&fq={!tag=dt}keywords_' + language + '%3A(';
      var keywordsCount = list.length;
      var count = 0;
      list.forEach(function(entry){
        keywordString += entry;
        count++;
        if (count < keywordsCount) {
          keywordString += ' OR ';
        }
      })
      keywordString += ')'
    }
    if (!params.searchString) {
      searchString = '(*%3A*)';
    }
    return Ember.$.ajax({
      type: 'GET',
      url: ENV.APP.serviceURL + '/dblist_databases/select?q=' + searchString + categoryString + keywordString + '&wt=json&rows=' + rows + facetString,
      data: {
      },
      dataType: 'jsonp',
      jsonp: 'json.wrf'
    }).then(function(response) {
      return response;
    },
    function(error) {
      console.log(error);
    });
  },

  setupController: function(controller, model) {
    var databaseList = DatabaseList.create(model);
    controller.set('model', databaseList);
  }

});
