import Ember from 'ember';
import Database from 'dblist-ember/models/database';
export default Ember.Object.extend({
  init: function() {    
    var databases = Ember.A([]);

    this.get('response.docs').forEach(function(entry) {
      databases.pushObject(Database.create(entry));
    });

    this.set('databases', databases);

    var facets = Ember.Object.create(this.get('facet_counts.facet_fields'));
    this.set('facets', facets);
  },

  facetCount: function(field, value) {
    var fieldArray = this.get('facets').get(field);
    var valueIndex = fieldArray.indexOf(value);
    return fieldArray[valueIndex+1];
  }
});
