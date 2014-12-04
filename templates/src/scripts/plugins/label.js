var $ = require('jquery');

$.fn.extend({
  label: function() {
    return this.each(function() {
      var $this = $(this),
          $label = $this.find('label'),
          $input = $('#' + $label.attr('for'));

      $input.on('keyup', function(e) {
        var $this = $(this),
            $parent = $this.parent('.control'),
            value = $this.val();
        if (value.length > 0) {
          $parent.removeClass('empty');
        } else {
          $parent.addClass('empty');
        }
      }).on('focus', function() {
        var $this = $(this),
            $parent = $this.parent('.control');
        $parent.addClass('active');
      }).on('blur', function() {
        var $this = $(this),
            $parent = $this.parent('.control');
        $parent.removeClass('active');
      });

    });
  }
});
