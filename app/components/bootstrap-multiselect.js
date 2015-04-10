import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'select',
  classNames: [''],
  
  attributeBindings: ['id', 'multiple'],

  multiple: 'multiple',
  didInsertElement: function(){
    var that = this;
    this.$().multiselect({
      onChange:function(element) {
        var items = that.$('option:selected');
        var selected = [];
        Ember.$(items).each(function(index, item){
          selected.push($(this).val());
        });
        that.set('selected', selected.join(':'));
      }
    }
    );
    Ember.run.later(function(){
      var selectedArray = that.get('selected').split(':');
      console.log('array', selectedArray);
      that.$().multiselect('select', selectedArray);
    });
  }
});