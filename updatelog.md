# V0.0.1 主体完成

# V0.0.2 更新安装方式
* 新增下载、安装方式
* npm更新`README.MD`

# V0.0.3 更新`/cmd`命令
* 新增`/cmd`命令, 具体用法详见[自述文件.如何使用](README.md)

# V0.0.4 修复`/cmd`命令bug
* 修复`/cmd`后命令子项以`/\-*`等开头导致命令子项缺失的问题 (如`/cmd ping -c 4 xxx.com`会识别为`/cmd ping 4 xxx.com`)

# V0.0.5 修复`/cmd`命令bug
* 修复ReferenceError: otherCmds is not defined(index.js:69:25))
