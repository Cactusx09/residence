$(document).ready(function() {
    $.validator.addMethod('filesize', function(value, element, param) {
        return this.optional(element) || (element.files[0].size <= param)
    }, 'File size must be less than {0}');

    $("form.form-order").each(function(index) {
        var it = $(this);
        it.validate({
            rules: {
                usr_name: {
                    required: false,
                },
                usr_phone: {
                    required: true,
                },
                usr_email: {
                    required: true,
                    email: true,
                },
                usr_doc: {
                    required: true,
                    filesize: 25000000
                },
            },
            messages: {},
            errorPlacement: function(error, element) {},
            submitHandler: function(form) {
                var data = new FormData(it[0]);
                $.ajax({
                    type: "POST",
                    url: "../send.php",
                    data: data,
                    cache: false,
                    processData: false,
                    contentType: false,
                }).done(function() {
                    it.find('input').val("");
                    $('.popup').removeClass('visible');
                    $('.successfully, #overlay').addClass('visible');
                    it.find('input').val("");
                    setTimeout(function() {
                        if ($('.successfully').hasClass('visible')) {
                            $('.popup, #overlay').removeClass('visible');
                        }
                    }, 2400);
                });
                return false;
            },
            success: function() {},
            highlight: function(element, errorClass) {
                $(element).addClass('error');
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).removeClass('error');
            }
        });
    });

    $(".calculation__form").each(function(index) {
        var it = $(this);
        it.validate({
            rules: {
                usr_footage: {
                    required: true,
                },
                usr_type: {
                    required: true,
                },
                usr_terms: {
                    required: true,
                },
            },
            messages: {},
            errorPlacement: function(error, element) {},
            submitHandler: function(form) {
                $('#overlay, .calculate').addClass('visible')
            },
            success: function() {},
            highlight: function(element, errorClass) {
                $(element).addClass('error');
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).removeClass('error');
            }
        });
    });
});
