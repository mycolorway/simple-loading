simple-loading
==============

一个基于 [Simple Module](https://github.com/mycolorway/simple-module) 的 loading 组件。

### 如何使用

#### 下载并引用

通过 `bower install` 下载依赖的第三方库，然后在页面中引入这些文件：

```html
<link rel="stylesheet" type="text/css" href="[style path]/font-awesome.css" />
<link rel="stylesheet" type="text/css" href="[style path]/loading.css" />

<script type="text/javascript" src="[script path]/jquery.min.js"></script>
<script type="text/javascript" src="[script path]/module.js"></script>
<script type="text/javascript" src="[script path]/loading.js"></script>
```

#### 初始化配置

我们需要在这个页面的脚本里初始化 simple-loading：

```javascript
simple.loading({
    type: "global",       // 三种类型，"global" "button" "tiny"
    msg: "Loading...",    // 显示 loading 信息
    el: null,             // "button" "tiny" 时需要传递按钮元素
    image: null           // 图片地址，global loading 可用 loading 图片替换图标
});
```
`type` 参数为 `global` 时，显示为全局的 loading，初始化后需要调用 `show()` 方法来显示 loading 状态。

### 方法

**show()**

显示 loading 状态。

**hide()**

隐藏 loading 状态。

**destroy()**

恢复到初始化之前的状态。

