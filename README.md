# mockAjax
virtual ajax request ( mock request ).
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
设置mock映射。把接口文档按照指定的格式存放起来。

`参数列表:`
>+ @param config {Object} 配置信息
  
`示例用法:`

```js
  // 假设现在有一份这样的接口文档,但是后台接口还没有开发好。
  // 接口url："/getInfo"
  // 返回格式："{"errorno":0,"result":[{"name":"小张","age":"17"},{"name":"小李","age":"23"},{"name":"小王","age":"22"}]}"

  // 这种情况我们就可以用到mockAjax来模拟ajax请求了。
  $.mockAjax.setMockMap({
      // mock的url.
      url: '/getInfo',
      // 返回的数据信息,可以为字符串也可以为对象.
      // 具体用法见index.html中的示例.
      // 如设置了status,则该属性中必须含有对应的字段.(ps:status为success,info中必须含有success字段,具体如下面代码).
      infos: {
          success: {
              "errorno": 0,
              "result": [{"name": "小张", "age": "17"}, {"name": "小李", "age": "23"}, {"name": "小王", "age": "22"}]
          },
          error:{}
      },
      // 等待毫秒数,用于模拟网络延迟.
      wait: 3000,
      // 本次mock希望得到的结果.可以指定三张状态 'success' 'error' 'timeout' 分别代表'成功','失败','超时'
      status: 'success'
  });
    
```

#### 3) $.ajax调用

`示例用法:`

```js
   $.ajax({
      url: '/getInfo',
      // 只有添加此属性才能触发mock,否则调用的为jQuery的ajax方法
      mock: true,
      success: function (data) {
         // 将会打印出设置的mock infos
         console.log(data)
      },
      error: function (err) {
         console.error(err)
      }
   }).done(function(data){
        // 支持promise调用
   }).fail(function(err){
        // ...
   }).always(function(){
        // ...
   });
    
```

## 疑问?

如果您有任何疑问，请随时提出通过 [New Issue](https://github.com/YataoZhang/mockAjax/issues/new).

## License

mockAjax.js在MIT的条款下提供 [MIT License](https://github.com/YataoZhang/mockAjax/blob/master/LICENSE).————
