(function ($, $document) {
  'use strict';

  $.validator.register('foundation.validation.validator', {
    selector: 'coral-multifield',
    validate: function (el) {
      var totalPanels = el['0'].items.getAll().length;
      var max;
      if ($(el).data('max-item')) {
        max = $(el).data('max-item');
        if (totalPanels > max) {
          return 'Maximum allowed extra card is ' + max + " and you've reached the limit";
        }
      }
    },
  });
})($, $(document));
