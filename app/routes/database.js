import Ember from 'ember';


export default Ember.Route.extend({
  beforeModel: function(params) {
    this.transitionTo('databases', {queryParams: {searchString: params.params.database.id}});
  }
});
