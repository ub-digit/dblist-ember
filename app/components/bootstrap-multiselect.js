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
/*
      templates: {
        button: '<button id="qwerty" type="button" class="multiselect dropdown-toggle btn btn-default" data-toggle="dropdown"><span class="multiselect-selected-text"></span> <b class="caret"></b></button>'
      },
*/
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
        that.updateMultiselect();

      }
    });
  },

  // Reloads component if string is null
  updateMultiselect: function() {
    var that = this;
    var button = that.$().next().find('button');
    if (!that.get('selected')) {
      button.removeClass('btn-primary');
      button.addClass('btn-default');
    } else {
      button.removeClass('btn-default');
      button.addClass('btn-primary');
    }
    if (this.get('selected') === null) {
      that.$().multiselect('destroy');
      that.rerender();
    }
  },
  checkForUpdate: function() {
    Ember.run.once(this, 'updateMultiselect');
  }.observes('selected', 'parentKeyword')
});
