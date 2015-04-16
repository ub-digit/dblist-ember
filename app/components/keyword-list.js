import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['subjects'],

  keywordObjects: function() {
    var that = this;
    var keywordObjects = Ember.A([]);
//    console.log(this.get('keywords'));
//    console.log(this.get('dbKeywords'));
    if (this.get('dbKeywords')) {
      this.get('dbKeywords').forEach(function(entry) {
        keywordObjects.pushObject(that.get('keywords').findBy('hash_value', entry));
      });
    }
    return keywordObjects;
  }.property('dbKeywords'),

  parentKeywords: function() {
    var that = this;
    var parentKeywords = this.get('keywordObjects').filterBy('parent_id', undefined);
    parentKeywords.forEach(function(entry) {
      var childKeywords = that.get('keywordObjects').filterBy('parent_id', entry.id);
      entry.set('children', childKeywords);
    });
    return parentKeywords;
  }.property('dbKeywords')
});