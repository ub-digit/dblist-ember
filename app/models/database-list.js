import Ember from 'ember';
import Database from 'dblist-ember/models/database';
export default Ember.Object.extend({
  init: function() {
    var that = this;
    //console.log(this.get('descriptions'));
    var databases = Ember.A([]);

    this.get('docs').forEach(function(entry) {
      entry.descriptions = that.get('applicationModel.descriptions').filterBy('db_id', entry.id);
      databases.pushObject(Database.create(entry));
    });

    this.set('databases', databases);
  }
});
