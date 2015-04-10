import Ember from 'ember';
import ENV from 'dblist-ember/config/environment';
import DatabaseList from 'dblist-ember/models/database-list';

export default Ember.Route.extend({
  beforeModel: function(params) {
    this.transitionTo('databases', {queryParams: {searchString: params.params.database.id}});
  }
});
