;(function($) {
  'use strict';

  var markdownConverter = new showdown.Converter();

  function markdownConvert($el) {
    var text = $el.find('.markdown-input').val();
    var html = markdownConverter.makeHtml(text);
    $el.find('.markdown-output').html(html);
  }

  $(function() {
    var $markdownPreview = $('.markdown-preview');
    $markdownPreview.on('input', '.markdown-input', function() {
      markdownConvert($markdownPreview);
    });
    markdownConvert($markdownPreview);

  });
})(jQuery, undefined);
