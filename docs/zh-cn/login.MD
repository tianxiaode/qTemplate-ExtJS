# 登录

由于ABP项目的登录是分两步走的。第一步是通过Session的GetCurrentLoginInformations获取用户名等信息，第二步是通过AbpUserConfiguration的GetAll获取系统信息，因而，在Application.js中，调用了`SESSION.init()`来获取Session信息，在主视图控制器（`app\view\main\MainControll.js`）的`onMainViewRender`方法中获取登录信息。如果你的系统不需要这么复杂的步骤，可以删除Application.js中与`SESSION`有关的部分代码。

由于使用的是WebApi模式，是通过Token进行认证的，在`onMainViewRender`方法内，如果在Cookie中没有找到Token，就会显示登录视图。如果已经登录，且已获取Token并保存到Cookie中，则可获取登录信息，并切换到用户视图。

在登录视图中输入用户名`admin`,密码`123qwe`即可登录入系统。