var $ = require('jquery');

$.fn.extend({
  restrict: function() {
    return this.each(function() { 
      var $this = $(this), 
        pattern = $this.attr('restrict'),
        re = new RegExp('^[' + pattern + ']$'),
        rre = new RegExp('[' + pattern + ']','g');
      
      $this.on('keypress', function(e) {
        var value = String.fromCharCode(e.keyCode);
        if (!re.test(value))
          e.preventDefault();
      }).on('paste', function(e) {
        var $this = $(this), value = $this.val();
        $this.val(value.replace(rre));
      });
    });
  }
});

module.exports = $.fn.restrict();
