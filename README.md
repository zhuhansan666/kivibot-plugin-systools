## kivibot-plugin-reboot-tools
### 这是 ~~重启小助手~~ 我进化啦！这将会是一个萌新从0到1的见证 (确信 \[至于为什么还叫重启小助手是因为我不会在npm重命名(]
#### [更新日志](updatelog.md)


## 我们能做什么
* 给kivibot安装上本插件
* 使用`/reboot help`看查帮助
* `/reboot sys或system`  ->  重启系统
* `/reboot bot或kivi`  ->  重启框架

## 如何安装
### 安装
``npm install kivibot-plugin-reboot-tools`` <br>
或在qq对机器人发送 <br>
``/p add reboot-tools(等价于/plugin add reboot-tools)``

### 启用
``/p on reboot-tools(等价于/plugin on reboot-tools)``


## 如何使用
* `/reboot help`  ->  看查/reboot帮助
* `/reboot sys或system`  ->  重启系统
* `/reboot bot或kivi`  ->  重启框架
* `/cmd`  ->  看查/cmd帮助
* `/cmd <system-command>`  ->  运行系统命令(此处<...>代表命令, 无需在调用时包含)
* `/alias`  ->  看查其帮助
* 使用`/alias <command-a> = <command-b>`定义指令a指向b
* 使用`/unalias <command-a> <command-b>`取消a指向b
*(注意: 上述两条指令空格均不能省略, 指令b必须存在, a必须以"/"开头)


## Know issues / 已知问题
* 使用`/cmd`运行长时间交互式界面(如`python`/`ipython`/`node`)不会有返回值, 线程阻塞, 但不影响其他功能, `/cmd`任可正常使用

## Todo
<!-- ## 内部
## 外部 -->
#### 暂时不知道做什么
#### 有建议可以发邮件 public.zhuhansan666@outlook.com 备注 reboot-tools:suggest


## issue / bug 反馈
#### 您可以直接在[我的github](https://github.com/zhuhansan666/kivibot-plugin-reboot-tools)提出issue
#### 但是我不常看github, 推荐发送邮件 public.zhuhansan666@outlook.com 备注 reboot-tools:bug
