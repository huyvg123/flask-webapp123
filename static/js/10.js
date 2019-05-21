jQuery(document).ready(function($) {
    var currentProductsProperties;
    var itemsInCart = 0;
  
    // $(document).on('click', '.bold-ro__recurring-text', function() {
    //   $(this).parent().parent().find($('.bold-ro__see-details')).css({'display': 'block'});
    //   var see_more = $(this).parent().parent().find('.bold-ro__see-details a').addClass('bold-ro__see-details form__checkbox__info rounded-circle text-center font-family-ProximaNovaSemibold js-buy-subscribe').text("?").css("display", "block"); 
    //   $(this).parent().parent().find($('.bold-ro__initial-discount-percent')).before(see_more); 
    //   $(this).parent().parent().find($('.bold-ro__initial-discount-percent')).css("display", "none");
    // });
  
    // $(document).on('click', '.bold-ro__one-time-purchase', function() {
    //   $(this).parent().parent().parent().find($('.bold-ro__see-details.form__checkbox__info')).css("display", "none");
    //   $(this).parent().parent().parent().find($('.bold-ro__initial-discount-percent')).css("display", "inline-block");
    // });
  
    // // save & subscribe
    // $(document).on('click', '.bold-ro__recurring-text', function() {
    //   $(this).closest($('.ro_widget')).find('.form__checkbox__info').remove();
    //   $(this).parent().parent().find($('.bold-ro__initial-discount-percent')).before('<span class="form__checkbox__info rounded-circle text-center font-family-ProximaNovaSemibold js-buy-subscribe">?</span>');    
    //   $(this).parent().parent().find($('.bold-ro__initial-discount-percent')).css("display", "none");
    //   $(this).closest($('.ro_widget')).find('.form__checkbox__info').css("display", "inline-block");
    // });
  
    // // ? button
    // $(document).on('click', '.form__checkbox__info', function() {
    //   $(this).parent().parent().parent().find($('.bold-ro__recurring-lbl')).after(asd());    
    //   var parent = $(this).closest('.ro_widget').css("position", "relative");
    //   parent.find('.product__buy__subscribe-info').css({"display": "block", "position": "absolute", "top": "60%"});
    // });
  
    // // see_more div 
    // $(document).on('click', '.product__buy__subscribe-info__close', function() {
    //   console.log($(this).closest('.product__buy__subscribe-info'));
    //   $(this).closest('.product__buy__subscribe-info').remove();
    // });
   
    // // one time purchase
    // $(document).on('click', '.bold-ro__one-time-purchase', function() {
    //   $(this).closest($('.ro_widget')).find('.form__checkbox__info').css("display", "none");
    //   $(this).parent().parent().parent().find($('.bold-ro__see-details.form__checkbox__info')).css("display", "none");
    //   $(this).parent().parent().parent().find($('.bold-ro__initial-discount-percent')).css("display", "inline-block");
    // });
  
    $(".blog_view_more_btn").click(function() {
      $(".latest_news").css("display", "block");
      $(this).css("display", "none");
    });
    
    $(".product__buy__quantity__down").click(function(){
      var qty = $("#Quantity");
      if(qty.val() > 1){
          qty.val(parseInt(qty.val()) - 1);
      } 
    });
  
    $(".product__buy__quantity__up").click(function(){
      var qty = $("#Quantity");
      qty.val(parseInt(qty.val()) + 1);
    });
    
    
      $(document).on('click', '.js-profile', function() {
        if( $('body').hasClass('profile--opened') ) {
          $('.cart-backdrop').remove();
        } else {
          $('body').append('<div class="cart-backdrop js-profile"></div>');
        } 
        $('body').toggleClass('profile--opened');
      });
    
    
      $(document).on('click', '.js-cart', function() {
        if( $('body').hasClass('cart--opened') ) {
          $('.cart-backdrop').remove();
        } else {
          $('body').append('<div class="cart-backdrop js-cart"></div>');
            getWhatIsInTheCart();
        }
        $('body').toggleClass('cart--opened');
      });
    
      function showWhatIsInTheCart(){
        if( $('body').hasClass('cart--opened') ) {
          $('.cart-backdrop').remove();
        } else {
          $('body').append('<div class="cart-backdrop js-cart"></div>');
            getWhatIsInTheCart();
        }
        $('body').toggleClass('cart--opened');
      };
    
      $(document).on('submit', '#add_to_cart',function(e){
        e.preventDefault();
        var unindexed_array = $(this).serializeArray();
        var indexed_array = {};
        var properties = {};
        $(this).find("input[name='similar_products[]']").each(function(i, e) {
          properties[$(this).val()] = $(this).val();  
        });
        $.map(unindexed_array, function(n, i){
          var name = n['name'];
            if(name == "similar_products[]"){
              //obj for storing related products
              name = 'properties';
              indexed_array[name] = properties;
            } else {
              indexed_array[name] = n['value'];
            }
        });
        jQuery.post('/cart/add.js', indexed_array, function(){
          showWhatIsInTheCart();
        }).done(function(data) {
            setTimeout(function() {
              $('.cart_item_count').html(itemsInCart);
            }, 500);
        })
      }); 
  
      $(document).on('submit', '.add_product_inside_cart',function(e){
        e.preventDefault();
        var current_product_id = $(this).find("*[name='id']").val();
        var properties = JSON.parse($(this).find("[name='properties']").val());
        for (var i in window.current_products_array) {
          if(window.current_products_array[i].id == current_product_id){
             jQuery.post('/cart/update.js', "updates["+ current_product_id +"]=" + ++window.current_products_array[i].quantity, function(){
              return getWhatIsInTheCart();
            });
          } else {
            jQuery.post('/cart/add.js', {
              quantity: 1,
              id: current_product_id,
              properties: properties
            }, function(){
              return getWhatIsInTheCart();
            });
          }
        }
        $('.cart_item_count').html(++itemsInCart);
      });
  
      function showRelatedProducts(product, currentCartRelatedProducts){
        delete currentProductsProperties[product.handle]; 
        // var desc = product.description.length > 150 ? product.description.substr(0, product.description.lastIndexOf(' ', 97)) + '...' : product.description;
        currentCartRelatedProducts += '<div class="row cart__product cart__product--more bg-white">';
        currentCartRelatedProducts += '  <div class="col-auto">';
        currentCartRelatedProducts += '    <figure class="product__image cart__product__image text-center">';
        currentCartRelatedProducts += '       <a href="' + product.url + '"><img src="' + product.images[0] + '" alt=""></a>';
        currentCartRelatedProducts += '    </figure>';
        currentCartRelatedProducts += '  </div>';
        currentCartRelatedProducts += '  <div class="col">';
        currentCartRelatedProducts += '    <h4 class="h6-px mb-sm-10"><a href="'+ product.url +'">'+ product.title +'</a></h4>';
        currentCartRelatedProducts += '    <p class="cart__product__meta mb-sm-20 mb-15"></p>';
        // currentCartRelatedProducts += '      <form class="add_product_inside_cart">';
        // currentCartRelatedProducts += '        <input type="hidden" name="quantity" value="1"/>';
        // currentCartRelatedProducts += '        <textarea style="display: none;" name="properties" placeholder="Enter the text...">' + JSON.stringify(currentProductsProperties) + '</textarea>';
        //                                        if(product.variants.length > 1) {
        // currentCartRelatedProducts += '           <select style="display: block; margin-bottom: 10px; height: 35px; " name="id" data-productid="' + product.id + '" id="product-select" class="form-control form-control-lg product-select">';
        //                                           for (let key in product.variants) {
        // currentCartRelatedProducts += '             <option value="' + product.variants[key].id + '">' + product.variants[key].title + '</option>';
        //                                           }
        // currentCartRelatedProducts += '           </select>';
        //                                        } else {
        // currentCartRelatedProducts += '           <input type="hidden" name="id" value="' + product.variants[0].id + '"/>';
        //                                        }
        // currentCartRelatedProducts += '        <a href= class="btn btn--sm">ADD TO CART</button>';
        // currentCartRelatedProducts += '      </form>';
        currentCartRelatedProducts += '    <a href="'+ product.url +'" class="btn btn--sm">ADD TO CART</a>';
        currentCartRelatedProducts += '    <div class="row align-items-center pb-sm-30">';
        currentCartRelatedProducts += '      <div class="col-sm col-12 order-sm-2 mb-sm-0 mb-20">';
        currentCartRelatedProducts += '        <p class="h5-sm-px h5 text-sm-right">' + Shopify.formatMoney(product.price_min) + '</p>';
        currentCartRelatedProducts += '      </div>';
        currentCartRelatedProducts += '      <div class="col-sm-auto col-12 order-sm-1">';
        currentCartRelatedProducts += '      </div>';
        currentCartRelatedProducts += '    </div>';
        currentCartRelatedProducts += '  </div>';
        currentCartRelatedProducts += '</div>';
        currentProductsProperties[product.handle] = product.handle;
        $(".cart_related_products").append(currentCartRelatedProducts);
      }
    
      $(document).on('submit', '.add_product_from_product_page', function(e)  {
        e.preventDefault();
        var unindexed_array = $(this).serializeArray();
        var indexed_array = {};
        var properties = {};
        $(this).find("input[name='similar_products[]']").each(function(i, e)  {
          properties[$(this).val()] = $(this).val();  
        });
        $.map(unindexed_array, function(n, i)  {
            if(n['name'] == "similar_products[]"){
              indexed_array['properties'] = properties;
            } else {
              indexed_array[n['name']] = n['value'];
            }
        });
        jQuery.post('/cart/add.js', indexed_array, function(){
          showWhatIsInTheCart();
        }).done(function(data) {
          setTimeout(function() {
            $('.cart_item_count').html(itemsInCart);
          }, 500);
        });
      });
  
  
      $(document).on('submit', '.add_product_form_apparel_collection', function(e)  {
        e.preventDefault();
        var unindexed_array = $(this).serializeArray();
        var indexed_array = {};
        var properties = {};
        $(this).find("input[name='similar_products[]']").each(function(i, e)  {
          properties[$(this).val()] = $(this).val();  
        });
        $.map(unindexed_array, function(n, i)  {
            if(n['name'] == "similar_products[]"){
              indexed_array['properties'] = properties;
            } else {
              indexed_array[n['name']] = n['value'];
            }
        });
        jQuery.post('/cart/add.js', indexed_array, function(){
          showWhatIsInTheCart();
        }).done(function(data) {
          setTimeout(function() {
            $('.cart_item_count').html(itemsInCart);
          }, 500);
        });
      });
  
      $(document).on('click', '.cart__product__quantity__up', function(e){
        e.preventDefault();
        var productId = $(this).attr("data-id");
        var productQ = $('strong[data-productId^="' + productId + '"]').html();
        ++productQ;
        var data = { updates: {} };
        data.updates[productId] = productQ;
        jQuery.ajax({
          type: 'POST',
          url: '/cart/update.js',
          data: data,
          dataType: 'json',
          success: function() { 
            getWhatIsInTheCart();
          }
        }).done(function( data ) {
          $('.cart_item_count').html(++itemsInCart);
        });
      }); 
    
      $(document).on('click', '.cart__product__quantity__down', function(e){
        e.preventDefault();
        var productId = $(this).attr("data-id");
        var productQ = $('strong[data-productId^="'+productId+'"]').html();
        --productQ;
        if(productQ < 1) { 
          $(".cart_related_products").empty();
        }
        var data = { updates: {} };
        data.updates[productId] = productQ;
        jQuery.ajax({
          type: 'POST',
          url: '/cart/update.js',
          data: data,
          dataType: 'json',
          success: function(data) {
            getWhatIsInTheCart();
          }
        }).done(function( data ) {
          $('.cart_item_count').html(--itemsInCart);
        });
      }); 
      
      
      $(document).on('click', '.on_click_show_rel_products', function(e){
        e.preventDefault();
        var product = JSON.parse($(this).find('#product_rel').html());
        var current_products_handle = $(this).find('#current_products_handle').html();
        $(".cart_related_products").empty();
        if ($(this).find('#product_rel').html() === "null") {
          return $(".cart_related_products").append('<h4 class="h6-px mb-30 text-center">No realted products.</h4>');
        }
        var currentCartRelatedProducts = "";
        $(".cart_related_products").append('<h4 class="h6-px mb-30 text-center">Stacks Well With:</h4>');
        Object.keys(product).map(function(key, index) {
          jQuery.getJSON('/products/' + product[key] + '.js', function(product) {
            showRelatedProducts(product, currentCartRelatedProducts);
          });
        });
        product[current_products_handle] = current_products_handle;
        currentProductsProperties = product;
      });
  
      function getWhatIsInTheCart(){
        return jQuery.getJSON('/cart.js', function(cart) {
          $(".cart__products_main_cart").empty();
          $(".cart__finalize_prices").empty();
          var totalPrice = 0;
          var final_price = "";
          var current_products_array = [];
          cart.items.forEach(element => {
            current_products_array.push({id: element.id, quantity: element.quantity, properties: element.properties});
            var desc = element.product_description.length > 150 ? element.product_description.substr(0, element.product_description.lastIndexOf(' ', 97)) + '...' : element.product_description;
            var currentCartItems = "";
            currentCartItems +='    <div class="cart__product">'; 
            currentCartItems +='    <div class="row">'; 
            currentCartItems +='      <div class="col-sm-auto col-12">';
            currentCartItems +='        <div class="on_click_show_rel_products" data-current_product>';
            currentCartItems +='         <figure class="product__image cart__product__image mb-sm-0 mb-20 text-center">';
            currentCartItems +='            <a href="#"><img src="' + element.image + '" alt=""></a>';
            currentCartItems +='            <p id="product_rel" style="display: none">' + JSON.stringify(element.properties) + '</p>';
            currentCartItems +='            <p id="current_products_handle" style="display: none">' + element.handle + '</p>';
            currentCartItems +='          </figure>';
            currentCartItems +='          <div class="cart__product__quantity text-white text-center font-family-ProximaNovaLight bg-orange rounded-circle">x<strong data-productId="'+element.id+'" class="product_Q">' + element.quantity + '</strong></div>';
            currentCartItems +='        </div>';
            currentCartItems +='        </div>';
            currentCartItems +='        <div class="col">';
            currentCartItems +='        <div class="on_click_show_rel_products"';
            currentCartItems +='          <h4 class="h6-px mb-10 text-sm-left text-center"><a href="' + element.url + '">' + element.product_title + '</a></h4>';
            currentCartItems +='          <p class="cart__product__meta mb-20">' + desc + '</p>';
            currentCartItems +='          <p id="product_rel" style="display: none">' + JSON.stringify(element.properties) + '</p>';
            currentCartItems +='          <p id="current_products_handle" style="display: none">' + element.handle + '</p>';
            currentCartItems +='        </div>';
            currentCartItems +='          <div class="row align-items-center">';
            currentCartItems +='            <div class="col-auto">';
            currentCartItems +='              <div class="d-flex align-items-center">';
            currentCartItems +='               <p class="cart__product__quantity__label mr-10">Qty</p>';
            currentCartItems +='                <button data-id="'+ element.id +'" class="cart__product__quantity__down position-relative"></button>';
            currentCartItems +='                <button data-id="'+ element.id +'" class="cart__product__quantity__up position-relative"></button>';
            currentCartItems +='              </div>';
            currentCartItems +='           </div>';
            currentCartItems +='             <div class="col">';
            currentCartItems +='              <p class="h5-px text-right">' + Shopify.formatMoney(element.price) + '</p>';
            currentCartItems +='           </div>'; 
            currentCartItems +='         </div>';
            currentCartItems +='       </div>';
            currentCartItems +='      </div>';
            currentCartItems +='      </div>';
            totalPrice += element.line_price;
            $(".cart__products_main_cart").append($(currentCartItems));
          });
          itemsInCart = cart.item_count;
            window.current_products_array = current_products_array;
            final_price += '<div class="row mb-sm-15 mb-10">';
            final_price += '  <div class="col">Subtotal</div>';
            final_price += '  <div class="col-auto">' + Shopify.formatMoney(totalPrice) + '</div>';
            final_price += '</div>';
            final_price += '<div class="row mb-sm-20 mb-15">';
            final_price += '  <div class="col">Delivery</div>';
            final_price += '  <div class="col-auto">Free</div>';
            final_price += '</div>';
            final_price += '<div class="row mb-20">';
            final_price += '  <div class="col h5-sm-px h5 text-orange text-uppercase">Total</div>';
            final_price += '  <div class="col-auto h4-sm-px h4 text-orange">' + Shopify.formatMoney(totalPrice) + '</div>'; 
            final_price += '</div>';
            final_price += '<button id="addToCart" class="btn btn--lg btn--orange-gradient w-100">CHECKOUT</button>';
            $(".cart__finalize_prices").append(final_price);
        });
      };
  
      $(document).on('click', '#addToCart', function(e) {
        e.preventDefault();
        $.ajax({
          type: 'GET',
          url: '/cart',
          success: function(data) {
             window.location.href = "/checkout";
          }
        });
      });
  
      //templates/page.the-team apply anchor scrolls to apply form
      function scrollToAnchor(aid){
        var aTag = $("#"+ aid +"");
        $('html,body').animate({scrollTop: aTag.offset().top},'slow');
      }
      
      $("#link").click(function() {
        scrollToAnchor('apply');
      });
  
      $(document).on("keypress", "#create_customer", function(event) { 
        if(event.keyCode === 13){
          event.preventDefault();
          $('.js-signup-steps').trigger('next.owl.carousel');
        }
      });
  }); 