import Ember from 'ember';
import ENV from 'dblist-ember/config/environment';
var ROW_INCREMENT = 10;
export default Ember.Controller.extend({
  queryParams: ['rows', 'searchString'],
  rows: ROW_INCREMENT,
  searchString: null,

  resetParams: function() {
    this.set('rows', ROW_INCREMENT);
  }.observes('searchString'),

  actions: {
    increaseRows: function() {
      var currentRows = this.get('rows');
      var newRows = currentRows + ROW_INCREMENT;
      this.set('rows', newRows);
    } 
  }
});