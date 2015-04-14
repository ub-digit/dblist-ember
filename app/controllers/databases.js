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

  isSwedish: Ember.computed('language', function(){
    return this.get('language') === 'sv';
  }),

  displayExtraRowsButton: function() {
    if (this.get('model.databases.length') === this.get('model.response.numFound')) {
      return false;
    }
    return true;
  }.property('model.databases', 'model.numFound'),

  rowsToGo: function() {
    return this.get('model.response.numFound') - this.get('model.databases.length');
  }.property('model.databases', 'model.response.numFound'),

  categoriesBinding: 'controllers.application.model.categories',
  keywordsBinding: 'controllers.application.model.keywords',
  languageBinding: 'controllers.application.model.language',

  parentKeywords: Ember.computed('keywords', 'model', function(){
    var that = this;
    var keywords = this.get('keywords').filterBy('parent_id', undefined);

    // Add facet count unless parentKeyword is selected
    keywords.forEach(function(entry){
      if (!that.get('parentKeyword')) {
      entry.set('facetCount', that.get('model').facetCount('keywords_' + that.get('language'), entry.hash_value));
      } else {
        entry.set('facetCount', null); 
      }
    });
    return keywords;
  }),

  categoriesList: Ember.computed('categories', 'model', 'category', function(){
    var that = this;
    var categories = this.get('categories');
    
    // Add facet count unless category is selected
    categories.forEach(function(entry){
      if (!that.get('category')) {
        entry.set('facetCount', that.get('model').facetCount('categories_' + that.get('language'), entry.hash_value)); 
      } else {
        entry.set('facetCount', null); 
      }
    });
    return categories;
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
    var that = this;
    if (this.get('parentKeyword') === null) {
      return [];
    } else {
      var childKeywords = this.get('keywords').filterBy('parent_id', this.get('selectedParentKeyword.id'));
      var selectList = Ember.A([]);
      childKeywords.forEach(function(entry){
        var label = entry.keyword;
        //label += " (" + that.get('model').facetCount('keywords_sv', entry.hash_value) + ")"
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
      this.set('selectedKeywords', null);
      this.set('rows', ROW_INCREMENT);
    },
    clearSearch: function() {      
      this.set('rows', ROW_INCREMENT);
      this.set('category', null);
      this.set('selectedKeywords', null);
      this.set('parentKeyword', null);
      this.set('searchString', null);
    }
  }
});
