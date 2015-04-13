import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'span',
  classNames: ['label'],
  classNameBindings: ['isParent:label-primary:label-default'],
  
  isParent: Ember.computed('keyword.parent_id', function() {
    if (this.get('keyword.parent_id')) {
      return false;
    }
    return true;
  })

});