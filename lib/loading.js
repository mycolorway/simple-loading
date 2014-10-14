(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define('simple-loading', ["jquery",
      "simple-module"], function ($, SimpleModule) {
      return (root.returnExportsGlobal = factory($, SimpleModule));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"),
      require("simple-module"));
  } else {
    root.simple = root.simple || {};
    root.simple['loading'] = factory(jQuery,
      SimpleModule);
  }
}(this, function ($, SimpleModule) {

var Loading, loading,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Loading = (function(_super) {
  __extends(Loading, _super);

  function Loading() {
    return Loading.__super__.constructor.apply(this, arguments);
  }

  Loading.prototype.opts = {
    type: "default",
    msg: "Loading..."
  };

  Loading._tpl = {
    mask: "<div class=\"simple-loading-mask\" class=\"hidden\"></div>",
    blank: "<img class=\"simple-tiny-loading\" src=\"data:image/gif;base64,R0lGODlhAQABAJH/AP///wAAAMDAwAAAACH5BAEAAAIALAAAAAABAAEAAAICVAEAOw==\"/>"
  };

  Loading.prototype._init = function() {
    if (!this.opts.type) {
      throw "simple loading: option type is required";
      return;
    }
    return this._render();
  };

  Loading.prototype._render = function() {
    var $btn, $img, $loading, $mask, bottom, left, right, top;
    if (this.opts.type === "default") {
      $mask = $(Loading._tpl.mask).appendTo($(document.body));
      $loading = $("<div class='simple-loading simple-global-loading' />").data("loading", this).text(this.opts.msg).appendTo($(document.body));
      document.offsetHeight;
      $mask.css({
        cursor: "default"
      }).removeClass("hidden");
      return $loading.css({
        marginTop: -$loading.outerHeight() * 0.5,
        marginLeft: -$loading.outerWidth() * 0.5
      });
    } else if (this.opts.type instanceof jQuery) {
      $btn = this.opts.type;
      $btn.addClass("simple-loading").data("loading", this);
      if ($btn.is("button")) {
        return $btn.data("origin-text", $btn.text()).css({
          width: $btn.outerWidth()
        }).html("<i class='fa fa-spinner fa-spin'></i> " + this.opts.msg).prop("disabled", true);
      } else if ($btn.is("a")) {
        $img = $(Loading._tpl.blank).css({
          position: $btn.css("position"),
          display: $btn.css("display"),
          width: $btn.outerWidth(),
          height: $btn.outerHeight(),
          marginTop: $btn.css("marginTop"),
          marginRight: $btn.css("marginRight"),
          marginBottom: $btn.css("marginBottom"),
          marginLeft: $btn.css("marginLeft"),
          float: $btn.css("float"),
          verticalAlign: 'middle',
          background: "url(/assets/tiny-loading.gif) no-repeat 50% 50%"
        }).insertAfter($btn);
        top = $btn.css("top");
        right = $btn.css("right");
        bottom = $btn.css("bottom");
        left = $btn.css("left");
        if (!top || top === "auto") {
          $img.css("bottom", bottom);
        } else {
          $img.css("top", top);
        }
        if (!left || left === "auto") {
          $img.css("right", right);
        } else {
          $img.css("left", left);
        }
        return $btn.hide();
      }
    }
  };

  Loading.prototype.destroy = function() {
    var $btn;
    if (this.opts.type === "default") {
      return $(".simple-loading-mask, .simple-loading").remove();
    } else if (this.opts.type instanceof jQuery) {
      $btn = this.opts.type;
      if ($btn.is("button")) {
        return $btn.text($btn.data("origin-text")).attr("style", "").prop("disabled", false).removeClass("simple-loading").removeData("simple origin-text");
      } else {
        return $btn.show().next(".simple-tiny-loading").remove();
      }
    }
  };

  return Loading;

})(SimpleModule);

loading = function(opts) {
  return new Loading(opts);
};


return loading;


}));

