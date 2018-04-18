# 启动示例程序

## ABP模版示例的启动方式
* 先将Visual Studio 2017升级到最新版本
* 用Viusal Stuio打开`src\weiapi\abp\文件夹下的解决方案文件`Sample.sln`
* 根据自己的数据库设置修改`Migrator`和`Host`项目中`appsettings.json`的数据库连接字符串
* 将`Migrator`项目设置为启动项目，运行后执行数据迁移
* 将`Host`项目设置为启动项目，然后运行项目
* 使用Visual Studio Code打开`src\client`目录
* 在Visual Studio Code安装`IIS Express`扩展以便在IIS Express中启动客户端
* 按`CRTL+SHIFT+P`选择`IIS Express:Restart Website`启动客户端