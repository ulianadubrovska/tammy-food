AOS.init();
jQuery(document).ready(function(){
    jQuery(window).scroll(function () {
        if (jQuery(this).scrollTop() > 600) {
            jQuery('#myBtn').css('opacity', '1');
        } else {
            jQuery('#myBtn').css('opacity', '0');
        }
    });

    jQuery('#myBtn').click(function () {
        jQuery('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
});