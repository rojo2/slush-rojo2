var $ = require('jquery');

// Creamos un objeto global
// para la validación.
$.extend({
  validator: function(type, fn) {
    this.validators[type] = fn;
  },
  validate: function(type, value) {
    var validator = this.validators[type];
    return validator(value);
  }
});

// very relaxed e-mail validator.
$.validator('email', function(value) {
  return /^.+@.+\..+$/.test(value);
});

$.validator('url', function(value) {
  return /^$/.test(value);
});

$.validator('color:css', function(value) {
  return /^#([a-f0-9]{3}|[a-f0-9]{6})$/.test(value);
});

$.validator('natural', function(value) {
  return /^[0-9]+$/.test(value);
});

$.validator('real', function(value) {
  return /^-?[0-9]+(?:\.[0-9]+)$/.test(value);
});

$.validator('hex', function(value) {
  return /^[a-f0-9]+$/.test(value);
});

$.validator('byte', function(value) {
  var value = parseInt(value,10);
  return value >= 0 && value <= 255;
});

$.validator('ip:v6', function(value) {
  
});

$.validator('ip:v4', function(value) {
  var matches = /^([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)$/.exec(value);
  return (matches ? {
    var b0 = matches[0],
      b1 = matches[1],
      b2 = matches[2],
      b3 = matches[3];

    return $.validate('byte',b0) && $.validate('byte',b1) && $.validate('byte',b2) && $.validate('byte',b3);
  } : false);
});

module.exports = $.validator;
