
class Loading extends SimpleModule

  @i18n:
    "zh-CN":
      loading: "正在加载数据..."
    "en":
      loading: "loading..."

  opts:
    type: "global"  # "tiny" or "button"
    msg: Loading._t('loading')
    el: null
    image: null     # loading image url
    autoshow: true

  @_tpl:
    mask: """
      <div class="simple-loading-mask"></div>
    """

    blank: """
      <img class="simple-tiny-loading" src="data:image/gif;base64,R0lGODlhAQABAJH/AP///wAAAMDAwAAAACH5BAEAAAIALAAAAAABAAEAAAICVAEAOw=="/>
    """

    icon: """
      <i class='fa fa-circle-o-notch fa-spin'></i>
    """

  _init: ->
    unless @opts.type
      throw "simple loading: option type is required"
      return

    @isGlobal =  (@opts.type is "global") or !(@opts.el instanceof jQuery)
    @_render()
    @show() if @opts.autoshow


  _render: ->
    if @isGlobal
      @maskEl = $(Loading._tpl.mask).appendTo $(document.body)
      @loadingEl = $("<div class='simple-loading simple-global-loading' />").data("loading", @)
      if @opts.image
        @loadingEl.text(@opts.msg)
          .addClass "simple-global-loading-image"
          .css
            backgroundImage: "url(#{@opts.image})"
      else
        @loadingEl.html "#{Loading._tpl.icon} <span>#{@opts.msg}</span>"
      @loadingEl.appendTo $(document.body)
    else
      @btnEl = @opts.el
      @btnEl.addClass("simple-loading").data("loading", @)

      if @opts.type is "button"
          @btnEl.data("origin-text", @btnEl.text())
      else if @opts.type is "tiny"
        @tinyEl = $(Loading._tpl.blank).css
          position: @btnEl.css( "position" )
          width: @btnEl.outerWidth()
          height: @btnEl.outerHeight()
          marginTop: @btnEl.css( "marginTop" )
          marginRight: @btnEl.css( "marginRight" )
          marginBottom: @btnEl.css( "marginBottom" )
          marginLeft: @btnEl.css( "marginLeft" )
          float: @btnEl.css( "float" )
        .insertAfter @btnEl

        top = @btnEl.css("top")
        right = @btnEl.css("right")
        bottom = @btnEl.css("bottom")
        left = @btnEl.css("left")
        if not top or top is "auto"
          @tinyEl.css "bottom", bottom
        else
          @tinyEl.css "top", top
        if not left or left is "auto"
          @tinyEl.css "right", right
        else
          @tinyEl.css "left", left


  show: ->
    document.offsetHeight  # reflow

    if @isGlobal
      @loadingEl.css
        marginTop:  - @loadingEl.outerHeight() * 0.5
        marginLeft: - @loadingEl.outerWidth()  * 0.5
      .fadeIn()
      @maskEl.fadeIn()
    else if @opts.type is "button"
      @btnEl.css
        width: @btnEl.outerWidth()
      .html "#{Loading._tpl.icon} #{@opts.msg}"
      .prop "disabled", true
    else if @opts.type is "tiny"
      @tinyEl.css
        display: @btnEl.css( "display" )
      @btnEl.hide()


  hide: ->
    if @isGlobal
      @loadingEl.fadeOut()
      @maskEl.fadeOut()
    else if @opts.type is "button"
      @btnEl.text @btnEl.data("origin-text")
        .attr "style", ""
        .prop "disabled", false
    else if @opts.type is "tiny"
      @btnEl.show().next(".simple-tiny-loading").hide()


  destroy: ->
    if @isGlobal
      @loadingEl.fadeOut =>
        @loadingEl.remove()
      @maskEl.fadeOut =>
        @maskEl.remove()
    else if @opts.type is "button"
      @btnEl.text @btnEl.data("origin-text")
        .attr "style", ""
        .prop "disabled", false
        .removeData "simple origin-text"
    else if @opts.type is "tiny"
      @btnEl.show().next(".simple-tiny-loading").remove()


  @destroy: () ->
    loading = $(".simple-global-loading").data("loading")
    loading.destroy()

loading = (opts) ->
  new Loading(opts)

loading.destroy = Loading.destroy
