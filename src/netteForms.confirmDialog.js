/**
 * Confirm dialog plugin
 *
 * @copyright  Copyright (c) 2012 Jan Červený
 * @license    BSD
 * @link       confirmdialog.redsoft.cz
 * @version    1.0
 */

(function ($, undefined) {

    $.nette.ext({
        load: function () {
            $('[data-confirm]').click(function (event) {
                var obj = this;
                event.preventDefault();
                event.stopImmediatePropagation();
                $("<div id='dConfirm' class='modal fade'></div>").appendTo('body');
                $('#dConfirm').html("<div id='dConfirmDialog' class='modal-dialog'></div>");
                $('#dConfirmDialog').html("<div id='dConfirmContent' class='modal-content'></div>");
                $('#dConfirmContent').html("<div id='dConfirmHeader' class='modal-header'></div><div id='dConfirmBody' class='modal-body'></div><div id='dConfirmFooter' class='modal-footer'></div>");
                $('#dConfirmHeader').html("<a class='close' data-dismiss='modal' aria-hidden='true'>×</a><h4 class='modal-title' id='dConfirmTitle'></h4>");
                $('#dConfirmTitle').html($(obj).data('confirm-title'));
                $('#dConfirmBody').html("<p>" + $(obj).data('confirm-text') + "</p>");
                $('#dConfirmFooter').html("<a id='dConfirmOk' class='btn " + $(obj).data('confirm-ok-class') + "' data-dismiss='modal'>Ano</a><a id='dConfirmCancel' class='btn " + $(obj).data('confirm-cancel-class') + "' data-dismiss='modal'>Ne</a>");
                if ($(obj).data('confirm-header-class')) {
                    $('#dConfirmHeader').addClass($(obj).data('confirm-header-class'));
                }
                if ($(obj).data('confirm-ok-text')) {
                    $('#dConfirmOk').html($(obj).data('confirm-ok-text'));
                }
                if ($(obj).data('confirm-cancel-text')) {
                    $('#dConfirmCancel').html($(obj).data('confirm-cancel-text'));
                }
                $('#dConfirmOk').on('click', function () {
                    var tagName = $(obj).prop("tagName");
                    if (tagName == 'INPUT') {
                        var form = $(obj).closest('form');
                        form.submit();
                    } else {
                        if ($(obj).data('ajax') == 'on') {
                            $.nette.ajax({
                                url: obj.href
                            });
                        } else {
                            document.location = obj.href;
                        }
                    }
                });
                $('#dConfirm').on('hidden.bs.modal', function () {
                    $('#dConfirm').remove();
                });
                $('#dConfirm').modal('show');
                return false;
            });
        }
    });

})(jQuery);