(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define('simple-loading', ["jquery","simple-module"], function (a0,b1) {
      return (root['loading'] = factory(a0,b1));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"),require("simple-module"));
  } else {
    root.simple = root.simple || {};
    root.simple['loading'] = factory(root["jQuery"],root["SimpleModule"]);
  }
}(this, function ($, SimpleModule) {

var Loading, loading,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Loading = (function(superClass) {
  extend(Loading, superClass);

  function Loading() {
    return Loading.__super__.constructor.apply(this, arguments);
  }

  Loading.i18n = {
    "zh-CN": {
      loading: "正在加载数据..."
    },
    "en": {
      loading: "loading..."
    }
  };

  Loading.prototype.opts = {
    type: "global",
    msg: Loading._t('loading'),
    el: null,
    image: null,
    autoshow: true
  };

  Loading._tpl = {
    mask: "<div class=\"simple-loading-mask\"></div>",
    blank: "<img class=\"simple-tiny-loading\" src=\"data:image/gif;base64,R0lGODlhAQABAJH/AP///wAAAMDAwAAAACH5BAEAAAIALAAAAAABAAEAAAICVAEAOw==\"/>",
    icon: "<i class='icon-circle-o-notch'></i>"
  };

  Loading.prototype._init = function() {
    if (!this.opts.type) {
      throw "simple loading: option type is required";
      return;
    }
    this.isGlobal = (this.opts.type === "global") || !(this.opts.el instanceof jQuery);
    this._render();
    if (this.opts.autoshow) {
      return this.show();
    }
  };

  Loading.prototype._render = function() {
    var bottom, left, right, top;
    if (this.isGlobal) {
      this.maskEl = $(Loading._tpl.mask).appendTo($(document.body));
      this.loadingEl = $("<div class='simple-loading simple-global-loading' />").data("loading", this);
      if (this.opts.image) {
        this.loadingEl.text(this.opts.msg).addClass("simple-global-loading-image").css({
          backgroundImage: "url(" + this.opts.image + ")"
        });
      } else {
        this.loadingEl.html(Loading._tpl.icon + " <span>" + this.opts.msg + "</span>");
      }
      return this.loadingEl.appendTo($(document.body));
    } else {
      this.btnEl = this.opts.el;
      this.btnEl.addClass("simple-loading").data("loading", this);
      if (this.opts.type === "button") {
        return this.btnEl.data("origin-text", this.btnEl.text());
      } else if (this.opts.type === "tiny") {
        this.tinyEl = $(Loading._tpl.blank).css({
          position: this.btnEl.css("position"),
          width: this.btnEl.outerWidth(),
          height: this.btnEl.outerHeight(),
          marginTop: this.btnEl.css("marginTop"),
          marginRight: this.btnEl.css("marginRight"),
          marginBottom: this.btnEl.css("marginBottom"),
          marginLeft: this.btnEl.css("marginLeft"),
          float: this.btnEl.css("float")
        }).insertAfter(this.btnEl);
        top = this.btnEl.css("top");
        right = this.btnEl.css("right");
        bottom = this.btnEl.css("bottom");
        left = this.btnEl.css("left");
        if (!top || top === "auto") {
          this.tinyEl.css("bottom", bottom);
        } else {
          this.tinyEl.css("top", top);
        }
        if (!left || left === "auto") {
          return this.tinyEl.css("right", right);
        } else {
          return this.tinyEl.css("left", left);
        }
      }
    }
  };

  Loading.prototype.show = function() {
    document.offsetHeight;
    if (this.isGlobal) {
      this.loadingEl.css({
        marginTop: -this.loadingEl.outerHeight() * 0.5,
        marginLeft: -this.loadingEl.outerWidth() * 0.5
      }).fadeIn();
      return this.maskEl.fadeIn();
    } else if (this.opts.type === "button") {
      return this.btnEl.css({
        width: this.btnEl.outerWidth()
      }).html(Loading._tpl.icon + " " + this.opts.msg).prop("disabled", true);
    } else if (this.opts.type === "tiny") {
      this.tinyEl.css({
        display: this.btnEl.css("display")
      });
      return this.btnEl.hide();
    }
  };

  Loading.prototype.hide = function() {
    if (this.isGlobal) {
      this.loadingEl.fadeOut();
      return this.maskEl.fadeOut();
    } else if (this.opts.type === "button") {
      return this.btnEl.text(this.btnEl.data("origin-text")).attr("style", "").prop("disabled", false);
    } else if (this.opts.type === "tiny") {
      return this.btnEl.show().attr("style", "").next(".simple-tiny-loading").remove();
    }
  };

  Loading.prototype.destroy = function() {
    if (this.isGlobal) {
      this.loadingEl.fadeOut((function(_this) {
        return function() {
          return _this.loadingEl.remove();
        };
      })(this));
      return this.maskEl.fadeOut((function(_this) {
        return function() {
          return _this.maskEl.remove();
        };
      })(this));
    } else if (this.opts.type === "button") {
      return this.btnEl.text(this.btnEl.data("origin-text")).attr("style", "").prop("disabled", false).removeData("simple origin-text");
    } else if (this.opts.type === "tiny") {
      return this.btnEl.show().attr("style", "").next(".simple-tiny-loading").remove();
    }
  };

  Loading.destroy = function() {
    var loading;
    loading = $(".simple-global-loading").data("loading");
    return loading != null ? loading.destroy() : void 0;
  };

  return Loading;

})(SimpleModule);

loading = function(opts) {
  return new Loading(opts);
};

loading.destroy = Loading.destroy;

return loading;

}));
