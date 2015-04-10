import Ember from 'ember';
var ROW_INCREMENT = 10;

export default Ember.Controller.extend({
  needs: ['application'],
  queryParams: ['rows', 'searchString', 'category', 'selectedKeywords'],
  rows: ROW_INCREMENT,
  searchString: null,
  category: null,
  selectedKeywords: null,

  resetParams: function() {
    this.set('rows', ROW_INCREMENT);
    this.set('category', null);
    this.set('selectedKeywords', null);
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

  categoriesBinding: 'controllers.application.model.categories',
  keywordsBinding: 'controllers.application.model.keywords',

  selectedCategory: function() {
    var category = this.get('categories').findBy('hash_value', this.get('category'));
    return category;
  }.property('category'),

  mainSubjects: function() {
    return [
    {value: "1", label: "Humaniora"},
    {value: "21", label: "Konstiga amnen"},
    {value: "3", label: "Sportkunskap"},
    {value: "4", label: "Vinkelvoltar 101", selected: "true"},
    ];
  }.property('categories'),

  actions: {
    increaseRows: function() {
      var currentRows = this.get('rows');
      var newRows = currentRows + ROW_INCREMENT;
      this.set('rows', 1000);
    },
    setCategory: function(category) {
      this.set('rows', ROW_INCREMENT);
      this.set('category', category.hash_value);
    }
  }
});