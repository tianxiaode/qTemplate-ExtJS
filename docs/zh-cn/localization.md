# 本地化

Ext JS实现本地化使用的是重写方式，也就是通过重写类来实现的，具体的示例可以查看Ext JS包中的`examples\kitchensink`文件夹。使用这种方式实现本地化太繁琐了，尤其是在定义自己的视图的时候，任何信息都需要定义为属性，然后通过重写才能实现本地化。

在创建模版之初，就已通过本地化类的形式来实现本地化，但还是不太令人满意，要最终实现本地化，需要根据不同语言生成不同的应用程序包，还是有点繁琐。如果能将这些本地化信息提取到框架之外，不受框架影响，这是最理想的情况。要实现这种理想情况，最难处理的就是组件的本地化，因为这个只能通过重写的方式来实现。

经过一番探索，终于找到了解决方案。具体的实现步骤是，在`resources\locale`文件下添加本地化文件，文件名以国家语言代码为文件名，如`zh-cn.js`，文件的具体定义如下：
```javascript
I18N={
    //定义应用程序的本地化信息
    Message: '信息',

    //init方法用于实现Ext JS组件的本地化
    init: function(){

        //具体的重写代码请参考文件内容

    }
}
```

这样，在应用程序中，就可直接调用`I18N`来获取本地化信息。

为了能在框架加载完成后，应用程序启动之前调用`init`方法完成组件的本地化重写，需要在`app.js`文件的顶部添加以下代码：
```javascript
var I18N= I18N || {};

Ext.onReady(function(){
    I18N.init();
});
```
如果不写第一行代码，执行`sencha app build`时会出现找不到`I18N`对象的错误。
在应用程序加载完毕，框架初始化完成后，会执行`onReady`方法并调用`init`方法来对重写组件的本地化信息，然后才调用`application`方法开始加载应用程序。

为了实现自动语言切换，需要修改`index.html`文件，在加载`bootstrap.js`文件之前，加载本地化脚本，代码如下：
```html
    <script type="text/javascript">
        var locale  =location.href.match(/lang=([\w-]+)/),
            lang = (locale && locale[1]) || 'zh_cn';
        document.write('<script src="resources/locale/'+ lang+'.js" type="text/javascript"><\/script>');
    </script>
```
这样，就不用在`app.json`中添加本地化文件来实现本地化了。

![English](https://github.com/tianxiaode/qTemplate-ExtJS/blob/master/docs/images/en.png)
![中文](https://github.com/tianxiaode/qTemplate-ExtJS/blob/master/docs/images/zh-cn.png)
