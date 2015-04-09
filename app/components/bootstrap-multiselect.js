import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'select',
  classNames: [''],
  
  attributeBindings: ['id', 'multiple'],
  id: 'example-getting-started',
  multiple: 'multiple',
  didInsertElement: function(){
    $('#example-getting-started').multiselect();
  }
});