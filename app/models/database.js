import Ember from 'ember';
export default Ember.Object.extend({
  init: function() {
  },

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
  }.property('id')

});