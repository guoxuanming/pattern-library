
//=========================================================
//Cookie Helpers
//=========================================================

function setCookie(c_name,value,expiredays,path) {
  var exdate=new Date();
  exdate.setDate(exdate.getDate()+expiredays);
  document.cookie=c_name+ "=" +escape(value)+ ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())+((path)?";domain=.rubbermaidhealthcare.com;path="+path:"");
}

function getCookie(c_name) {
  var i,x,y,ARRcookies=document.cookie.split(";");
  for (i=0;i<ARRcookies.length;i++) {
    x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
    y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
    x=x.replace(/^\s+|\s+$/g,"");

    if (x==c_name) {
      return unescape(y);
    }
  }
}


/*
=========================================================
DOCUMENT READY
=========================================================
*/
$(function() {

  /*
  =========================================================
  Main Navigation Menu
  =========================================================
  */

  // Determine the correct sub-menu to open
  var open_submenu = function(e) {
    var btn = $(this);

    // If button has a submenu...
    if(btn.data('submenu-id')) {

    e.preventDefault();

    var btn_id = btn.parent().attr('id');
    var menu_id = btn.data('submenu-id');
    var active_menu_item = {};

      // And if the sub-menu is already open...
      if($('#sub-menu').is(':visible')) {

        active_menu_item = $('a.menu-link').parent('.active');
        active_menu_item_id = active_menu_item.attr('id');

        // …the active-sub-menu is whatever menu is currently visible...
        active_sub_menu = '#' + $('.sub-menu:visible').attr('id');
        // active_menu_item =

        // Although, if the sub-menu that is open is also the menu that should be switched to...
        if(active_sub_menu === menu_id ) {

          // Kill the sub-menu item and roll up the sub-menu entirely
          $(active_sub_menu).stop().fadeOut('fast', function() {
            btn.parent().toggleClass('active');
            $('#sub-menu').stop().fadeOut('fast');
          });

        // Otherwise fade out the current sub-menu item and fade in the new one
        } else {
          $(active_sub_menu).fadeOut('fast', function() {
            btn.parent().toggleClass('active');
            active_menu_item.toggleClass('active');
            $(menu_id).fadeIn('fast');
          });
        }
      // But if the sub-menu is NOT open...
      } else {
        // The active_menu_item is whatever button was pressed to open the menu
        active_menu_item = btn_id;
        $('#sub-menu').stop().fadeIn( 'fast', function() {
          btn.parent().toggleClass('active');
          $(menu_id).fadeIn('fast');
        });
      }
    }
  };

  $('.menu-link').click(open_submenu);


  /*
  =========================================================
  Tabs & Tab Controls
  =========================================================
  */

  if(jQuery.ui && jQuery.ui.tabs) {
    $('.is-tabbed').tabs({
      show: { effect: "fade", duration: 300 },
      hide: { effect: "fade", duration: 300 }
    });

    var $nurses_week_tabs = $('#nurses-week-page').tabs({
      show: { effect: "fade", duration: 300 },
      hide: { effect: "fade", duration: 300 },
      disabled: [ 2 ]
    });

    $('.nurses-week-nomination-link').click(function(e){
      e.preventDefault();
      $nurses_week_tabs.tabs("option", "active", 1);
      return false;
    });
  }

  /*
  =========================================================
  Scrollables
  =========================================================
  */
   if(jQuery.scrollable) {
    $('.s-container').scrollable({
      items: '.s-items'
    });
   } else {

   }

  /*
  =========================================================
  Video Player Block
  =========================================================
  */
   var sVideoItemTemplate = '<a rel="[id]" title="[title]" ><img src="[thumbnail]" alt="[title]" /></a>';
   $(".s-videos").each(function(){
    $(this).rmsVideoPlayer({
      tagName:"Test",
      userName: "RubbermaidMedical",
      iframe:'.yt-video > iframe',
      template: "" + sVideoItemTemplate,
      onVideosLoaded:function(count) {
        if( count > 3 ) {
          $('.video-gallery-slider').append('<a class="s-btn prev ir">Back</a><a class="s-btn next ir">Next</a>');
        }
      }
    });
   });

  /*
  =========================================================
  Video Playlists
  =========================================================
  */
  var template = '<li class="sn-vl-item fll clf"><div class="sn-vl-thumb fll"><a href="" rel="[id]" ><img src="[thumbnail]" alt="" /></a></div><div class="sn-vl-text fll"><h2><a href="" rel="[id]" >[title]</a></h2><p>[description]</p></div></li>';

  $(".sn-video-tabs .pane").each(function(){
    $(this).rmsVideoPlayer({
      tagName:"Health",
      userName: "RubbermaidMedical",
      maxResults:4,
      iframe:'.ytplayer > iframe',
      template:""+template
    });
  });

  /*
  =========================================================
  Fancy Box Modal Windows
  =========================================================
  */

  if(jQuery.fancybox) {

    // General Modals
    $("a.fancy-modal").fancybox({
      'transitionIn'  : 'fade',
      'transitionOut' : 'fade',
      'speedIn'   : 600,
      'speedOut'    : 200,
      'overlayShow' : true,
      'overlayColor'  : '#000',
      'overlayOpacity': 0.3,
      'padding'   : 16,
      'showNavArrows' : true
    });

    // Video Modals
    $("a.video-modal").click(function(){
      $.fancybox({
      'transitionIn'  : 'none',
      'transitionOut' : 'none',
      'overlayShow'   : true,
      'overlayColor'  : '#000',
      'overlayOpacity': 0.3,
      'showNavArrows' : false,
      'padding'       : 0,
      'autoScale'     : false,
      'href'          : this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
      'type'          : 'swf',
      'swf'           : {
           'wmode'    : 'transparent',
        'allowfullscreen' : 'true'
      }
    });

      return false;
    });

    // Remove navigation arrows from windows that don't need them
    $(".single-modal").fancybox({
      'showNavArrows': false
    });

    // Homepage Takeover
    if (getCookie("onloadpopupviewed") != "true" ) {
        setCookie("onloadpopupviewed", "true", 60,"/");
        $.fancybox({
          'href': '/Pages/mods/onload-popin/carelink-homepage-popover.html',
            'transitionIn': 'fade',
            'transitionOut': 'fade',
            'type': 'iframe',
            'speedIn': 600,
            'speedOut': 200,
            'overlayShow': true,
            'overlayColor': '#000',
            'overlayOpacity': 0.3,
            'padding': 24,
            'showNavArrows': false,
            'showNavArrows': false,
            'width': 500,
            'height': 328,
            'autoScale': false,
            'scrolling': 'no'
        });

    }
  }

  /*
  ==================================================
  Representative Lookup Show/Hide
  ==================================================
  */
  $('.rep-lookup-results ul li h3').click( function() {
    $(this).parent().children('.product-lit-box').slideToggle();
  });


  /*
  ==================================================
  Welcome Page
  ==================================================
  */
  $(".welcome-select")
  .mouseover(function () {
    if (!$(this).hasClass("selected")) {
      var img = $("img", this);
      var src = img.attr("src");
      if(src.indexOf("_over")<0)
        img.attr("src", src.replace(".png", "_over.png"));
    }
  })
  .mouseout(function () {
    if (!$(this).hasClass("selected")) {
      var img = $("img", this);
      var src = img.attr("src");
      img.attr("src", src.replace("_over", ""));
    }
  })
  .click(function (e) {
    $(".category-links").hide();
    $(".welcome-select").removeClass("selected").mouseout();
    $("#" + $(this).attr("rel")).show();
    $(this).mouseover().addClass("selected");

    e.preventDefault();
  });

  /*
  ==================================================
  CareLink Features & Benefits
  ==================================================
  */

  // Toggle class of the Medication Storage button
  $('#medication-pager #storage').click(function(e) {
    e.preventDefault();
    $(this).toggleClass('cycle-pager-active');
  });

  // Height Adjustable & Rotating Monitor
  var $monitor = $('.monitor-image');
  var $monitorFlat = $monitor.find('img:first-child');
  var $monitorPivot = $monitor.find('img:last-child');
  var $height = $('#height .icon');
  var $pivot = $('#pivot .icon');

  $monitorPivot.removeClass('hidden').hide();

  $height.click(function() {

    if($monitor.position().top == 62) {
      $monitor.stop().animate({ top: '-20px'}, 'slow');
    } else {
      $monitor.stop().animate({ top: '62px'}, 'slow');
    }

    if(!$(this).hasClass('height-active')) {
      if($pivot.hasClass('pivot-active')) {
        $pivot.toggleClass('pivot-active');
      }
      $(this).toggleClass('height-active');
    } else {
      return;
    }

  });

  $pivot.click(function() {

    console.log($monitorFlat);
    console.log($monitorPivot);

    if($monitorFlat.is(':visible')) {
      $monitorFlat.fadeToggle();
      $monitorPivot.fadeToggle();
    } else {
      $monitorFlat.fadeToggle();
      $monitorPivot.fadeToggle();
    }

    if(!$(this).hasClass('pivot-active')) {
      if($height.hasClass('height-active')) {
        $height.toggleClass('height-active');
      }
      $(this).toggleClass('pivot-active');
    } else {
      return;
    }

  });

  // Electronic Lift
  var $lift = $('.lift-graphic-wrapper');
  var $seated = $('#seated .icon');
  var $standing = $('#standing .icon');

  $seated.click(function() {
    if(!$(this).hasClass('seated-active')) {
      if($standing.hasClass('standing-active')) {
        $standing.toggleClass('standing-active');
      }
      $(this).toggleClass('seated-active');
      $lift.stop().animate({ top: '-100px'}, 'slow');
    } else {
      return;
    }
  });

  $standing.click(function() {
    if(!$(this).hasClass('standing-active')) {
      if($seated.hasClass('seated-active')) {
        $seated.toggleClass('seated-active');
      }
      $(this).toggleClass('standing-active');
      $lift.stop().animate({ top: '-250px'}, 'slow');
    } else {
      return;
    }
  });

  /*
  ==================================================
  CareLink Landing Pages
  ==================================================
  */

var stickIt = function(stickyElement) {

  var elementOffset = stickyElement.offset();
  var elementHeight = stickyElement.height();
  var elementTopOffset = $('#page-footer').offset().top - elementHeight * 2;

  $(window).scroll(function(){
    var scrollPos = $(window).scrollTop();

    console.log(scrollPos);
    console.log(elementTopOffset);
    console.log(elementHeight);

    if (scrollPos < elementTopOffset) {
      stickyElement.addClass('sticky');
    } else {
      stickyElement.removeClass('sticky');
    };

  });
};

stickIt($('#page-ctas'));

});