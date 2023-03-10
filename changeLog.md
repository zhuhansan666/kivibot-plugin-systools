<!---   For Author:
    1.  更新日志中的 “更新” 一般译为 “change”
        为了增加文件名可读性，文件命名一般使用小驼峰或连字符命名（推荐小驼峰)
        综上所述 “更新日志” 应译为 “changeLog”

    2.  H1 标题在 Github 中已被占用（就是被占用了，我也不想解释了）
        所以文档中的一级标题通通改为二级标题

    3.  为提高文档美观度以及可读性
        推荐在以下情况下加入空格:
            - 中文与英文之间
            - 英文括号与相邻字符之间
            - 代码块与相邻字符之间

    4.  Markdown 文档支持链接到标题，使用 `文档.md#标题` 即可
        所以    `具体用法详见 [自述文件.如何使用](README.md)`
        应改为  `具体用法详见 [自述文件.如何使用](README.md#如何使用)`
      > in line 46

    5.  版本号不规范
        详情参考 http://link.xicrosoft.ml/PzUci 本文（不对是注释）不做过多赘述

    6.  报错/指令示例等较长指令
        不建议使用 inline code
        最好用代码块，且需酌情使用引用 `>需要引用的内容`
      > 如 line 46 以及 line 51-53

    7.  段落与段落间/板块与板块间
        建议加入两行空格，增加可读性，也是为了符合规范

    8.  更新日志一般为近期更新在前啊啊啊啊啊啊啊啊啊啊啊啊啊
        要不然看最新内容还要翻到最后（这个你自己改吧，要不然我相当于帮你重写了一遍）
        还有索引我给你加上了，具体看 line 36 以及 line 135-end
        END | 剩下建议请前往对应文档查看 :( | Written By Xicrosoft. --->

> <a href="#index">index 索引 | 最新版本更新介绍</a>
## V0.0.1 | 主体完成


## V0.0.2 | 更新安装方式
* 新增下载、安装方式
* npm更新 `README.MD`


## V0.0.3 | 更新 `/cmd` 命令
* 新增 `/cmd` 命令, 具体用法详见 [自述文件.如何使用](README.md#如何使用)


## V0.0.4 | 修复 `/cmd` 命令bug
* 修复 `/cmd` 后命令子项以 `/\-*` 等开头导致命令子项缺失的问题
    > 如 `/cmd ping -c 4 xxx.com` 会识别为 `/cmd ping 4 xxx.com`


## V0.0.5 | 修复 `/cmd` 命令bug
* 修复 `/cmd` 命令bug
    ```
    ReferenceError: otherCmds is not defined(index.js:69:25)
    ```


## V0.0.6 | 修复插件版本显示错误
* 修复插件版本在qq显示错误的问题
* 修复
    ```
    TypeError: Cannot read properties of undefined (reading 'user_id')(index.js:23:25))
    ```


## V0.0.7 | 修复部分场景命令识别不正确的问题
* 修复部分场景命令识别不正确的问题


## V0.0.8 | 更新 `README.md`
* 更新 `README.md`


## V0.0.9 | 更新权限不足提示
* 更新权限不足提示


## V0.1.0 | 更新 `/reboot` 命令显示
* 更新 `/reboot` 运行命令时的显示


## V0.1.1 | 2023/01/08 21:45:04
* 更改目标方向, 致力做一个"全能"插件
  >至于为什么还叫重启小助手是因为我不会在npm重命名 (


## V0.1.2 | 2023/01/09 16:40:03
* 新增错误信息 catch 并发送至 qq, 方便排查 bug


## V0.1.3 | 2023/01/09 18:07:03
* 支持 alias 重定向本插件命令


## V0.1.4 | 2023/01/09 18:10:43
* 修复显示问题
  ```
  〓 ${secondCmd}=>${fouthCmd} 设置失败 〓
  [WARN]本命令不得指向
  ```


## V0.1.5 | Unknown


## V0.1.6 | 2023/01-09 19:01:14
* 新增 `/about` 命令


## V0.1.7 | 2023/01/09 20:39:47
* 更新README, 避免歧义


## V0.1.8 | 2023/01/09 20:57:30
* 更新README, 避免歧义


## V0.1.9 | 2023/01/09 21:05:56
* 新增首次启动提示


## V0.2.0 | 2023/01/09 21:47:15
* 优化首次启动算法, 使得首次启动提示更加人性化
~~你敢信今天我除去功能更新发布了8个版本（~~


## V0.2.1 | 2023/01/09 23:38:39
* 更新了README
* 更新了 `/about` 内容(新增 Gitee 链接)

## V0.2.2 | 2023-01-10 14:00:37
* 优化首次启动算法, 使得首次启动提示更加人性化

## V0.2.3 | 2023-01-10 19:06:54
* 修复插件名错误

## V0.2.4
* 修改插件名称为`systool`

## V0.2.5
* 修复错别字一处

## V0.2.6
* 修复再非Windows环境运行命令(`/cmd`)乱码的问题(`使用UTF-8编码`)

## V0.2.7
* 新增检查更新功能

## V0.2.8
* 修复检查更新间隔不正确的问题

## V0.2.9 | 2023-01-11 20:06:41
* 修复提示更新信息最新版本`undefined`问题

## V0.3.0 | 2023-01-11 20:10:30
* 再次修复上个版本"修复提示更新信息最新版本`undefined`"未成功的问题
  
## V0.4.0 | 2023-01-11 20:10:30
* 再一次上修复个版本"修复提示更新信息最新版本`undefined`"未成功的问题

## V0.5.0 | 2023-01-12 12:10:45
* 修复更新插件`config.json["commands"]`不会更新的问题
* 新增`/ip`指令

## V0.5.1 | 2023-01-12 12:37:34
* 修复更新提醒会在全部群聊发送的Feature

## V0.5.2 | 2023-01-12 12:51:36
* 修复`/ip`请求耗时不正确的问题

## V0.5.3 | 2023-01-12 14:40:07
* 修复`/ip` `〓 systool返回 〓`字符串后不换行的问题

## V0.5.4 | 2023-01-12 15:01:02
* 修复检查更新消息admin获取失败的问题
```
//  错误信息
ApiRejection { code: 1, message: 'unknown' }  
```

## V0.5.5 | 2023-01-13 18:11:27
* 更新获取公网ip(包含归属地)  ->  `/ip -p`

## V0.5.6 | 2023-01-13 18:47:59
* 修复`/ip`中`-p`无法识别的问题
* 更新并优化`/about`触发词

## V0.5.7 | 
* 修复`/ip -p`换行过多的问题

## V0.6.0 | 2023-01-13 19:16:39
* 修复检查更新消息重复发送的问题
* 修复`/reboot bot`/`/reboot kivi`重复打开多个机器人的问题

## V0.6.1 | 2023-01-14 12:28:58
* 新增自动更新

## V0.6.2 | 2023-01-14 12:49:14
* 修复`date-and-time`包缺失的问题

## V0.6.3 | 2023-01-14 12:56:09
* 再次修复`date-and-time`包缺失的问题
  
## V0.6.4 | 2023-01-14 13:05:07
* 再一次修复`date-and-time`包缺失的问题 ~~我就不信修不好了~~

## V0.6.5 | 2023-01-14 13:12:46
* 最后一次修复(~~或许吧~~`date-and-time`包缺失的问题 

## V0.6.6 | 2023-01-14 13:29:44
* 修复安装包没有`--save`的问题

## V0.6.7 | 2023-01-14 18:56:49
* 修复`/cmd`指令在使用等价指令(如`/c`)时命令字符分割不正确的问题

## V0.6.8 | 2023-01-15 12:42:21
* 再次修复`/cmd`指令在使用等价指令(如`/c`)时命令字符分割不正确的问题

## V0.6.9 | 2023-01-15 12:43:21
* 再一次修复`/cmd`指令在使用等价指令(如`/c`)时命令字符分割不正确的问题

## V0.7.0 | 2023-01-15 12:51:42
* 最后次修复`/cmd`指令在使用等价指令(如`/c`)时命令字符分割不正确的问题

## V0.7.1 | 2023-01-15 12:58:58
* 修复`/cmd`指令在使用等价指令(如`/c`)时命令字符分割不正确的问题
* 修复自动更新无效的问题

## V0.7.2 | 2023-01-15 13:03:38
* `/cmd`指令在使用等价指令(如`/c`)时命令字符分割不正确的问题 ~~终于~~ 修复完成啦~

## V0.8.0 | 2023-01-15 13:36:08
* 修复自动更新无效的问题(**已测试已解决**)

## V1.0.0 | 2023-01-24 20:54:40
* 对pupbot支持

## V1.1.0 | 2023-01-24 21:37:39
* 修复已知问题: 使用`/reboot bot`或`/reboot pup`时大概率会导致机器人多个进程同时启动
* 修复多处文本问题

## V1.1.1 | 2023-01-24 21:42:54
* 修复自动更新后如果未重载插件导致多次自动更新的问题

## V1.1.2 | 2023-01-24 22:41:54
* 新增更新完成自动重启

## V1.1.3 | 2023-01-24 22:48:37
* 新增自动更新重启后显示后更新成功的功能

## V1.1.4 | 2023-01-26 12:05:56
* 新增`/ncmd`命令, 可执行`nodjs`代码/代码块
  
## V1.1.5 | 2023-01-26 12:05:56
* 修复`/ncmd`无效的问题

## V1.1.6 | 2023-01-26 19:33:48
* 新增启用/禁用/看查状态`/ncmd`普通人可执行(有防注入)  ->  `/systool ncmd on/off/status`

## V1.1.7 | 2023-01-27 20:28:17
* 修复插件挂载错误: `{}`（大概罢

## V1.1.8 | 2023-01-27 20:50:22
* 新增插件挂载错误发送

## V1.2.0 | 2023-01-27 21:05:18
* 修复"`/reboot bot/pupbot`受框架回调策略影响, 不会受到机器人回复"的问题

## V1.2.1 | 2023-02-02 22:39:52
* 修改`/reboot`命令为`/sreboot`以免于框架指令冲突

---
## index
[TOC]
