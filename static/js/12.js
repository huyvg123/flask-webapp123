jQuery(document).ready(function($) {
    $(".js_show_more_addresses").click(function(){
        $(".accountaddress .account__address,.accountaddress .account__divider").removeClass("hidden");
        $(this).remove();
    });
    $(".account__address__rec").click(function(){
        if(!$(this).hasClass("active")){
            var $this = $(this);
            $(".account__address__rec.active").removeClass("active");
            $this.addClass("active");
            var data = {
                "form_type": "customer_address",
                "_method": "put",
                "address": {"default": 1}
            };
                        $.ajax({
                            method: "POST",
                            url: "/account/addresses/" + $this.data("id"),
                            data:  data
                        })
                            .done(function( msg ) {

                            });


                    }
                });

$("#add-new-address form").submit(function (z) {
z.preventDefault();
    var data = {};
    var $this = $(this);
    $.each($(this).serializeArray(),function(i,e){
        data[e.name] = e.value;
    });

    $.ajax({
        method: "POST",
        url: $this.attr("action"),
        data:  data
    })
        .done(function( msg ) {
            window.location.reload();
        });

    return false;

});


$(".account__address__delete").click(function(){
    var formId = $(this).data("id");
    $("#confirm_address_delete .js_delete").data("form-id",formId);
    $("#confirm_address_delete").modal("show");
});

    $("#confirm_address_delete .js_delete").click(function(){
        var formId = $(this).data("form-id");
        $.ajax({
            method: "POST",
            url: '/account/addresses/' + formId,
            data:  {_method: 'delete'}
        })
            .done(function( msg ) {
                window.location.reload();
            });
    });
});