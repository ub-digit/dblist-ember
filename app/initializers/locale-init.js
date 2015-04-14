import Ember from 'ember';
import ENV from '../config/environment';

export default {
  name: 'locale-init',
    initialize: function(container, app) {
      var rootElement = Ember.$(ENV.APP.rootElement);
      var lang = rootElement.data().lang;
      
      if (!lang) {
        lang = ENV.APP.defaultLocale;
      }

      var application = container.lookup('application:main');
      Ember.set(application, 'locale', lang);

      var locale = function() {
          return Ember.get(application, 'locale');
      }
      //app.register('dblist:locale', locale, {
      //      singleton: true,
      //      instantiate: true
      //  });
      //app.inject('model:database', 'locale', 'dblist:locale');
      //console.log(Ember.I18n.translations);
    }
};