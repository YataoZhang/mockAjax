# mockAjax
a analog ajax request ( mock request ) javascript library
===

## mockAjax 中文文档
*一个用于 mock ajax 的jquery插件.*


`mockAjax`是一个高效的,轻量,易用(整个类库一共只有2个API) jQuery 插件,兼容性很强的的mock ajax 库<br>

你可以在遵守 MIT Licence 的前提下随意使用并分发它。`mockAjax` 代码完全开源并托管在 Github 上。

### mockAjax的引入
```html
  <script type="text/javascript" src="./src/jquery.js"></script>
  <script type="text/javascript" src="./dest/mockAjax.min.js"></script>
    
```

### mockAjax的目的
*使用场景 : 解决前端开发中需要调用后端接口,但是后端接口开没开发好,只有接口文档.<br>*
这种情况下,使用mockAjax就不会受到这个影响.该怎么写就这么写.等后端开发之后再把mockAjax给删掉.丝毫不影响...

### mockAjax如何使用

#### 1) $.mockAjax.init();
初始化mock

`参数列表:`
>+ @param 无
  
`示例用法:`

```js

 $.mockAjax.init();
    
```

#### 2) $.mockAjax.setMockMap(config);
初始化mock

`参数列表:`
>+ @param config {Object} 配置信息
  
`示例用法:`

```js
  // 详情见示例
  $.mockAjax.setMockMap({
     url: '/interfaceOne',
     infos: 'hello world',
     wait: 3000,
     status: 'success'
  });
    
```


## 疑问?

如果您有任何疑问，请随时提出通过 [New Issue](https://github.com/YataoZhang/mockAjax/issues/new).

## License

mockAjax.js在MIT的条款下提供 [MIT License](https://github.com/YataoZhang/mockAjax/blob/master/LICENSE).