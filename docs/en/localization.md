# Localization

Ext JS Implementation of localization using the override, the specific example can view the Ext JS package in the `Examples\kitchensink` folder. It is too tedious to implement localization in this way, especially when defining your own views, any information needs to be defined as property, and then overridden to achieve localization.

At the beginning of the creation of the template, localization has been achieved through the form of a localized class, but it is still less than satisfactory, and it is still a bit cumbersome to achieve localization in the end, depending on the language in which different application packages are generated. This is ideal if you can extract these localized information outside the framework and not be affected by the framework. The most difficult thing to do with this ideal is the localization of the component, which can only be implemented by overriding.

After some exploration, finally found a solution. The specific implementation step is to add a localized file under the `resources\locale` folder with the file name in the national language code, such as `zh-cn.js`, and the specific definition of the file is as follows:
```javascript
I18N={
    //Defining localized information for an application
    Message: 'message',

    //The Init method is used to localize the Ext JS component
    init: function(){

        //Specific ovrride code please refer to the contents of the file

    }
}
```
In this way, in your application, you can call `I18N` directly to get localized information.

In order to be able to invoke the `init` method to complete a localized override of the component before the application starts after the framework has been loaded, you need to add the following code at the top of the `app.js` file:
```javascript
var I18N= I18N || {};

Ext.onReady(function(){
    I18N.init();
});
```
If you do not write the first line of code, the `sencha app build` will show an error that cannot find the `I18N` object.

After the application is loaded, the framework initialization is completed, the `onReady` method is executed and the `init` method is invoked to localize information on the overridden component before invoking the `application` method to start loading the application.

In order to achieve automatic language switching, you need to modify the `index.html` file to load the localized script before loading the `bootstrap.js` file, the code is as follows:
```html
    <script type="text/javascript">
        var locale  =location.href.match(/lang=([\w-]+)/),
            lang = (locale && locale[1]) || 'zh_cn';
        document.write('<script src="resources/locale/'+ lang+'.js" type="text/javascript"><\/script>');
    </script>
```
This allows localization to be done without adding localized files in `App.json`.


![English](https://github.com/tianxiaode/qTemplate-ExtJS/blob/master/docs/images/en.png)
![中文](https://github.com/tianxiaode/qTemplate-ExtJS/blob/master/docs/images/zh-cn.png)
