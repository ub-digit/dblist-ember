import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'select',
  classNames: [''],
  attributeBindings: ['id', 'multiple'],
  multiple: 'multiple',

  didInsertElement: function(){
    var that = this;
    this.$().multiselect({
      disableIfEmpty: true,
      nonSelectedText: 'Aemnesord',
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
      if (that.get('selected')){
        var selectedArray = that.get('selected').split(':');
        that.$().multiselect('select', selectedArray);
      }
    });
  },

  // Reloads component if string is null
  updateMultiselect: function() {
    var that = this;
    if (this.get('selected') === null) {
      that.$().multiselect('destroy');
      that.rerender();
    }
  }.observes('selected', 'parentKeyword')
});