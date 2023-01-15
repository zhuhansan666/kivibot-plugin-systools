# kivibot-plugin-systool
> 系统小助手
> 这将会是一个萌新从不会到会的见证
> [更新日志](changeLog.md)
<!---   For Author
        更新日志中的 “更新” 一般译为 “change”
        为了增加文件名可读性，文件命名一般使用小驼峰或连字符命名（推荐小驼峰)
        综上所述 “更新日志” 应译为 “changeLog”
        END | Written By Xicrosoft. --->

<details>
<summary> </summary>
确信(
<br>
至于为什么还叫重启小助手是因为我不会在npm重命名(
</details>


## 我们能做什么
* 看查帮助  ->  `/reboot help`
* 重启系统  ->  `/reboot sys`
* 重启框架  ->  `/reboot bot` 或 `kivi`
<!---   For Author
        “或” 不要放进 inline code 里哦
        END | Written By Xicrosoft. --->

## 如何安装
### 安装
```bash
npm install kivibot-plugin-systool
```
> 或在qq对机器人发送
```
/p add systool (等价于/plugin add systool)
```

<!---   For Author
        代码块是 ``` 三反单引包裹，且三反单引每组都独占一行
        直接多加一个换行即可分段落喽
        END | Written By Xicrosoft. --->

### 启用
```
/p on systool(等价于/plugin on systool)
```


## 如何使用
* 看查帮助  ->  `/reboot help`
* 重启系统  ->  `/reboot sys` 或 `system`  *主管理员命令*
* 重启框架  ->  `/reboot bot` 或 `kivi`  *主管理员命令*
* 看查帮助  ->  `/cmd`
* 运行系统命令  ->  `/cmd <system-command>`  *主管理员命令*
* 看查帮助  ->  `/alias`
* 使用  ->  `/alias <command-a> = <command-b>`  ->  定义指令a指向b
* 使用  ->  `/unalias <command-a> <command-b>`  ->  取消a指向b
    > WARN
    > <br>
    >上述两条指令空格均不能省略, 指令b必须存在, a必须以"/"开头
* 获取公网ip  ->  `/ip`  *管理员命令*
* 获取公网ip(包含归属地)  ->  `/ip -p`  *管理员命令*


## Know issues / 已知问题
* 使用 `/cmd` 运行长时间交互式界面不会有返回值, 线程阻塞, 但不影响其他功能, `/cmd` 任可正常使用

## TODO
<!-- - [x] 暂时不知道做什么 -->
- [ ] 制作权限组
- [ ] 动态加载配置文件
> 有建议可以发邮件 [public.zhuhansan666@outlook.com](mailto:public.zhuhansan666@outlook.com?subject=systool:suggest)


## issue / bug 反馈
您可以直接在 [我的 Github](https://github.com/zhuhansan666/kivibot-plugin-systool) 提出issue
> 但是我不常看 Github , 推荐发送邮件 [public.zhuhansan666@outlook.com](mailto:public.zhuhansan666@outlook.com?subject=systool:suggest)