import Ember from 'ember';
import ENV from 'dblist-ember/config/environment';

var TRANSLATIONS = {
  en: {
    other_lang: 'sv',
    main: {
      title: "My loans",
      description: "My loans - Gothenburg University Library"
    }
  },
  sv: {
    other_lang: 'en',
    main: {
      title: "Databaslistan",
      description: "Databaslistan - Göteborgs Universitetsbibliotek"
    },
    search: {
      placeholder: "Skriv vad du letar efter, tex PubMed"
    }

    
  }
};

// Adds support for translatable properties, i.e. placeholderTranslation='key'
Ember.View.reopen(Ember.I18n.TranslateableAttributes);

// Initializes language support
var i18nInitializer = {
  name: 'i18n',
  initialize: function() {
    var rootElement = Ember.$(ENV.APP.rootElement);
    var lang = rootElement.data().lang;
    if(!lang || lang !== 'sv') {
      lang = 'en';
    }
    moment.locale(lang);
    var translation = Ember.$.extend(true, {}, TRANSLATIONS)[lang];
    Ember.I18n.translations = translation;
    Ember.I18n.allTranslations = TRANSLATIONS;
    Ember.FEATURES.I18N_TRANSLATE_HELPER_SPAN = false;
    Ember.ENV.I18N_COMPILE_WITHOUT_HANDLEBARS = true;
  }
};
export default i18nInitializer;
