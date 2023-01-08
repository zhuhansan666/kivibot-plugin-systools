# kivibot-plugin-reboot-tools

# 我们能做什么
* 给kivibot安装上本插件
* 使用/reboot help看查帮助
* /reboot sys/system  ->  重启系统
* /reboot bot/kivi  ->  重启框架

# 如何安装
`npm install kivibot-plugin-reboot-tools`
或在qq对机器人发送
`/p add reboot-tools(等价于/plugin add reboot-tools)`

# 如何使用
* `/reboot help`  ->  看查/reboot帮助
* `/reboot sys/system`  ->  重启系统
* `/reboot bot/kivi`  ->  重启框架
* `/cmd`  ->  看查/cmd帮助
* `/cmd <system-command>`  ->  运行系统命令(此处<...>代表命令, 无需在调用时包含)

# Know issues / 已知问题
* 使用`/cmd`运行长时间交互式界面(如`python`/`ipython`/`node`)不会有返回值, 线程阻塞, 但不影响其他功能, `/cmd`任可正常使用
