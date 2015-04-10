import Ember from 'ember';
var ROW_INCREMENT = 10;

export default Ember.Controller.extend({
  needs: ['application'],
  queryParams: ['rows', 'searchString', 'category', 'selectedKeywords', 'parentKeyword'],
  rows: ROW_INCREMENT,
  searchString: null,
  category: null,
  selectedKeywords: null,
  parentKeyword: null,

  resetParams: function() {
    this.set('rows', ROW_INCREMENT);
    this.set('category', null);
    this.set('selectedKeywords', null);
    this.set('parentKeyword', null);
  }.observes('searchString'),

  displayExtraRowsButton: function() {
    if (this.get('model.databases.length') === this.get('model.numFound')) {
      return false;
    }
    return true;
  }.property('model.databases', 'model.numFound'),

  rowsToGo: function() {
    return this.get('model.numFound') - this.get('model.databases.length');
  }.property('model.databases', 'model.numFound'),

  categoriesBinding: 'controllers.application.model.categories',
  keywordsBinding: 'controllers.application.model.keywords',

  parentKeywords: Ember.computed('keywords', function(){
    return this.get('keywords').filterBy('parent_id', undefined);
  }),

  selectedCategory: function() {
    var category = this.get('categories').findBy('hash_value', this.get('category'));
    return category;
  }.property('category'),

  selectedParentKeyword: function() {
    var keyword = this.get('keywords').findBy('hash_value', this.get('parentKeyword'));
    return keyword;
  }.property('parentKeyword'),

  childKeywords: function() {
    console.log(this.get('parentKeyword'));
    if (this.get('parentKeyword') === null) {
      return [];
    } else {
      var childKeywords = this.get('keywords').filterBy('parent_id', this.get('selectedParentKeyword.id'));
      var selectList = Ember.A([]);
      childKeywords.forEach(function(entry){
        selectList.pushObject({label: entry.keyword, value: entry.hash_value});
      });
      return selectList;
    }
  }.property('parentKeyword'),

  actions: {
    increaseRows: function() {
      var currentRows = this.get('rows');
      var newRows = currentRows + ROW_INCREMENT;
      this.set('rows', 1000);
    },
    setCategory: function(category) {
      this.set('category', category.hash_value);
    },
    setParentKeyword: function(keyword) {
      this.set('parentKeyword', keyword.hash_value);
    }
  }
});