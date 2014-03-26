/**
 * i18nJs
 */

i18n = window.i18n || {};
__I18N__DEFAULT = 'en';


/**
 * Load a local dictionary
 * @param  {[type]} locale local code
 * @param  {[type]} data   dictionary
 */
i18n.load = function(locale, data) {
  this.data = this.data || {};
  
  var localeData = this.data[locale];
  if (localeData.length) {
    for (var key in localeData) {
      if (!data[key]) {
        data[key] = localeData[key];
      }
    }
  }
  this.data[locale] = data;
};

i18n.getLocale = function() {
  return this.locale || __I18N__DEFAULT;
};

i18n.setLocale = function(locale) {
  this.locale = locale;
};

i18n.get = function(key) {
  var locale = this.getLocale();

  if (this.data[locale] && this.data[locale][key]) {
    return this.data[locale][key];
  }
  else if (this.data[__I18N__DEFAULT]  && this.data[__I18N__DEFAULT][key]) {
    return this.data[__I18N__DEFAULT][key];
  }
  else {
    return "i18n : unknow key : [" + key + "]";
  }
};

/**
 * Locale for pluggins
 */

