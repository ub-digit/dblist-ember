import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  category: function() {
    return this.get('targetObject.controllers.application.model.categories').findBy('id', this.get('categoryId'));
  }.property('categoryId')
});