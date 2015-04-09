import Ember from 'ember';
var ROW_INCREMENT = 10;

export default Ember.Controller.extend({
  needs: ['application'],
  queryParams: ['rows', 'searchString', 'category'],
  rows: ROW_INCREMENT,
  searchString: null,
  category: null,

  resetParams: function() {
    this.set('rows', ROW_INCREMENT);
    this.set('selectedCategory', null);
  }.observes('searchString'),

  displayExtraRowsButton: function() {
    if (this.get('model.databases.length') === this.get('model.numFound')) {
      return false;
    }
    return true;
  }.property('model.databases', 'model.numFound'),

  rowsToGo: function() {
    return this.get('model.numFound') - this.get('model.databases.length')
  }.property('model.databases', 'model.numFound'),

  categories: function() {
    return this.get('controllers.application.model.categories');
  }.property('controllers.application.model.categories'),

  updateCategorySearchId: function() {
    this.set('category', this.get('selectedCategory.id'));
  }.observes('selectedCategory'),

  actions: {
    increaseRows: function() {
      var currentRows = this.get('rows');
      var newRows = currentRows + ROW_INCREMENT;
      this.set('rows', 1000);
    },
    setCategory: function(category) {
      this.set('rows', ROW_INCREMENT);
      this.set('selectedCategory', category);
    }
  }
});