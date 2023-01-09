# V0.0.1 主体完成

# V0.0.2 更新安装方式
* 新增下载、安装方式
* npm更新`README.MD`

# V0.0.3 更新`/cmd`命令
* 新增`/cmd`命令, 具体用法详见[自述文件.如何使用](README.md)

# V0.0.4 修复`/cmd`命令bug
* 修复`/cmd`后命令子项以`/\-*`等开头导致命令子项缺失的问题 (如`/cmd ping -c 4 xxx.com`会识别为`/cmd ping 4 xxx.com`)

# V0.0.5 修复`/cmd`命令bug
* 修复ReferenceError: otherCmds is not defined(index.js:69:25)

# V0.0.6 修复插件版本显示错误
* 修复插件版本在qq显示错误的问题
* 修复TypeError: Cannot read properties of undefined (reading 'user_id')(index.js:23:25))

# V0.0.7 修复部分场景命令识别不正确的问题
* 修复部分场景命令识别不正确的问题

# V0.0.8 更新`README.md`
* 更新`README.md`

# V0.0.9
* 更新权限不足提示

# V0.1.0 更新`/reboot`命令显示
* 更新`/reboot`运行命令时的显示

# V0.1.1 2023-01-08 21:45:04
* 更改目标方向, 致力做一个"全能"插件 (至于为什么还叫重启小助手是因为我不会在npm重命名 (

# V0.1.2 2023-01-09 16:40:03
* 新增错误信息catch并发送至qq, 方便排查bug
