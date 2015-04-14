import Ember from 'ember';
export default Ember.Object.extend({
  //init: function() {
  //  console.log("db-init", this.controllerFor('application'));
  //},

  // Returns any additional descriptions as array
  extraDescriptions: function() {
    if (this.get('descriptions').length > 1) {
      return this.get('descriptions').slice(1);
    } else {
      return [];
    }
  }.property('descriptions'),

  // Used for bootstrap logic
  objectIdentifier: function() {
    return '#' + this.get('id');
  }.property('id'),

  //keywords: Ember.computed('keywords_sv', 'keywords_en', function(){
    //console.log("fdjjfdfdskfds", this.locale, this);
    //var application = this.container.lookup('application:main');
    //var language = application.get('locale');
    //var keywords = this.get('keywords_' + language);
    //return keywords;
  //}),
/*
  categories: Ember.computed('categories_sv', 'categories_en', function(){
    console.log(Ember.I18n.locale);
    var application = this.container.lookup('application:main');
    var language = application.get('locale');
    var language = 'sv';
    return this.get('categories_' + language);
  })
*/
});