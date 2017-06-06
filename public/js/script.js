;(function($) {
  'use strict';

  // ______________________________
  // Markdown

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

  // ______________________________
  // Tambah spasi pada markdown preview jika menekan tombol tab

  $('.markdown-preview textarea').on('keydown', function(e) {
    if (e.keyCode !== 9) return; // Selain tab

    e.preventDefault();

    var start = this.selectionStart;
    var end = this.selectionEnd;

    var $this = $(this);
    var value = $this.val();

    $this.val(value.substring(0, start) + '  ' + value.substring(end));

    this.selectionStart = this.selectionEnd = start + 2;
  });

})(jQuery, undefined);
