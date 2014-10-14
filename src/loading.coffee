
class Loading extends SimpleModule

  opts:
    type: "default"  # or button element
    msg: "Loading..."

  @_tpl:
    mask: """
      <div class="simple-loading-mask" class="hidden"></div>
    """

    blank: """
      <img class="simple-tiny-loading" src="data:image/gif;base64,R0lGODlhAQABAJH/AP///wAAAMDAwAAAACH5BAEAAAIALAAAAAABAAEAAAICVAEAOw=="/>
    """

  _init: ->
    unless @opts.type
      throw "simple loading: option type is required"
      return

    @_render()

  _render: ->
    if @opts.type is "default"
      $mask = $(Loading._tpl.mask).appendTo $(document.body)
      $loading = $("<div class='simple-loading simple-global-loading' />").data("loading", @)
        .text(@opts.msg).appendTo $(document.body)

      document.offsetHeight  # reflow
      $mask.css
        cursor: "default"
      .removeClass "hidden"

      $loading.css
        marginTop:  - $loading.outerHeight() * 0.5
        marginLeft: - $loading.outerWidth()  * 0.5

    else if @opts.type instanceof jQuery
      $btn = @opts.type
      $btn.addClass("simple-loading").data("loading", @)

      if $btn.is "button"
          $btn.data("origin-text", $btn.text())
          .css
            width: $btn.outerWidth()
          .html "<i class='fa fa-spinner fa-spin'></i> #{@opts.msg}"
          .prop "disabled", true
      else if $btn.is "a"
        $img = $(Loading._tpl.blank).css
          position: $btn.css( "position" )
          display: $btn.css( "display" )
          width: $btn.outerWidth()
          height: $btn.outerHeight()
          marginTop: $btn.css( "marginTop" )
          marginRight: $btn.css( "marginRight" )
          marginBottom: $btn.css( "marginBottom" )
          marginLeft: $btn.css( "marginLeft" )
          float: $btn.css( "float" )
          verticalAlign: 'middle'
          background: "url(/assets/tiny-loading.gif) no-repeat 50% 50%"
        .insertAfter $btn

        top = $btn.css("top")
        right = $btn.css("right")
        bottom = $btn.css("bottom")
        left = $btn.css("left")
        if not top or top is "auto"
          $img.css "bottom", bottom
        else
          $img.css "top", top
        if not left or left is "auto"
          $img.css "right", right
        else
          $img.css "left", left

        $btn.hide()

  destroy: ->
    if @opts.type is "default"
      $( ".simple-loading-mask, .simple-loading" ).remove()
    else if @opts.type instanceof jQuery
      $btn = @opts.type
      if $btn.is "button"
        $btn.text $btn.data("origin-text")
          .attr "style", ""
          .prop "disabled", false
          .removeClass "simple-loading"
          .removeData "simple origin-text"
      else
        $btn.show().next(".simple-tiny-loading").remove()


loading = (opts) ->
  new Loading(opts)
