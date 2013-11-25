// Avoid `console` errors in browsers that lack a console.
(function() {
  var method;
  var noop = function () {};
  var methods = [
  'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
  'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
  'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
  'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());




// Place any jQuery/helper plugins in here.

//rms video player plugin
(function ($) {

  // here we go!
  $.rmsVideoPlayer = function (element, options) {

    // plugin's default options
    // this is private property and is  accessible only from inside the plugin
    var defaults = {

      apiKey: 'AI39si5YTnCbRpBgnWiyY_jNJPoxuZQdsMOK4joGkYxIy1g94z1yxGmNSnGS_nL7DTR3SrdmHbCE9SxJ1UlVprj2Qa0_BzCksg',
      userName: '',
      maxResults: 5,
      tagName: '',
      template: '<li>title</li>',
      iframe: '#videoContainer',
      onVideosLoaded: function () { }
    };

    // to avoid confusions, use "plugin" to reference the current instance of the object
    var plugin = this;

    // this will hold the merged default, and user-provided options
    // plugin's properties will be available through this object like:
    // plugin.settings.propertyName from inside the plugin or
    // element.data('pluginName').settings.propertyName from outside the plugin, where "element" is the
    // element the plugin is attached to;
    plugin.settings = {};

    //var $element = $(element),  // reference to the jQuery version of DOM element the plugin is attached to
         //element = element;        // reference to the actual DOM element

    // the "constructor" method that gets called when the object is created
    plugin.init = function () {

        // the plugin's final properties are the merged default and user-provided options (if any)
        plugin.settings = $.extend({}, defaults, options);

        // code goes here
        var dataUrl = "http://gdata.youtube.com/feeds/api/videos/-/" + encodeURI("{http://gdata.youtube.com/schemas/2007/keywords.cat}").split("/").join("%2F") + plugin.settings.tagName + "?max-results=" + plugin.settings.maxResults + "&alt=json" + ((plugin.settings.userName !== '') ? "&author=" + plugin.settings.userName : "");


        $.getJSON(dataUrl, function (data) {
          var feed = data.feed;
          var entries = feed.entry || [];
          writePlaylist(entries);
          plugin.settings.onVideosLoaded(entries.length);
        });
      };

    // private methods
    // these methods can be called only from inside the plugin like:
    // methodName(arg1, arg2, ... argn)

    var writePlaylist = function (entries) {

        // Identify elements that are scrollable
        var isScrollable = $('.s-videos');

        // Container Constructor
        var container;  /* for simple video lists */

      // Modify container based on element
      if ( element === isScrollable[0] ) {
        container = $("<div/>").addClass("fll clf");
      } else {
        container = $("<ul/>").addClass("sn-video-list clf");
      }

      for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var title = entry.title.$t;
        var desc = entry.media$group.media$description.$t.replace(/\n/g, '<br/>');
        var id = entry.id.$t.split("/");
        id = id[id.length - 1];
        var thumbnail = entry.media$group.media$thumbnail[0].url;
        var fields = [
        ["[id]", id],
        ["[title]", title],
        ["[description]", desc],
        ["[thumbnail]", thumbnail]

        ];
        var inner = "" + plugin.settings.template;
        for (var j = 0; j < fields.length; j++) {
          inner = inner.split(fields[j][0]).join(fields[j][1]);
        }
        inner = $(inner);
        container.append(inner);

        $("a", inner).click( playVideo($(this).attr('rel')) );
      }
      $(element).empty();
      $(element).append(container);
    };

    var playVideo = function (id) {

      // code goes here
      var new_video_rel = id;
      // var current_video_src = $(plugin.settings.iframe).attr('src');
      var new_video_src = 'http://www.youtube.com/embed/' + new_video_rel;

      $(plugin.settings.iframe).attr('src', new_video_src);

    };

    // fire up the plugin!
    // call the "constructor" method
    plugin.init();

  };

  // add the plugin to the jQuery.fn object
  $.fn.rmsVideoPlayer = function (options) {

    // iterate through the DOM elements we are attaching the plugin to
    return this.each(function () {

      // if plugin has not already been attached to the element
      if (undefined === $(this).data('pluginName')) {

        // create a new instance of the plugin
        // pass the DOM element and the user-provided options as arguments
        var plugin = new $.rmsVideoPlayer(this, options);

        // in the jQuery version of the element
        // store a reference to the plugin object
        // you can later access the plugin and its methods and properties like
        // element.data('pluginName').publicMethod(arg1, arg2, ... argn) or
        // element.data('pluginName').settings.propertyName
        $(this).data('pluginName', plugin);

      }
    });
  };
})(jQuery);