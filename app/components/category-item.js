import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  category: function() {
    return this.get('categories').findBy('hash_value', this.get('categoryId'));
  }.property('categoryId')
});