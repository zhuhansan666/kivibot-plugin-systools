const about_string = `〓 关于systool 〓
本插件由"爱喝牛奶の涛哥"制作, 使用commonjs标准
本插件完全免费, bug反馈可发送邮件至public.zhuhansan666@outlook.com 备注 systool:bug
本插件采用GNU3.0协议, 请自觉遵循

〓 源码 〓
Github: https://github.com/zhuhansan666/kivibot-plugin-systool
Gitee: https://gitee.com/zhu-hansan/kivibot-plugin-systool

〓 联系我 〓
爱喝牛奶の涛哥@Bilibili: https://space.bilibili.com/687039517
爱喝牛奶の涛哥@Github: https://github.com/zhuhansan666
爱喝牛奶の涛哥@Gitee: https://gitee.com/zhu-hansan
爱喝牛奶の涛哥@outlook: public.zhuhansan666@outlook.com

感谢您对本插件的支持, 有什么建议和bug可以在Github提出或发送邮件并备注(备注内容详见README文件)
`

const first_time = `〓 systool警告 〓
由于本插件会对系统进行操作(开关机), 使用前请仔细阅读README_md帮助文档, 获取Github链接请输入/about
否则任何因使用不当造成的后果本人概不负责
\t\t\t\t\t\t\t\t\t\t\t\t开发者: 爱喝牛奶の涛哥 20230109
*该信息将在下次启动kivibot框架时不再提示`

// const Math = require("node:Math")
const process = require("node:process")
const os = require("node:os")
const exec = require('child_process').exec;
const { KiviPlugin, http } = require('@kivibot/core')
const { kiviConf } = require("@kivibot/core")
const iconv = require('iconv-lite');
const encoding = 'cp936';
const binaryEncoding = 'binary';

const config = {
    "start-time": true,
    "latest-start-time": undefined,
    "latest-exit-time": undefined,
    "commands": {
        "cmd": ["/cmd", "/c"],
        "reboot": ["/reboot", "/r"],
        "alias": ["/alias", "/a", "/unalias", "/ua"],
        "about": ["/about", "/关于"]
    }
}

const { version } = require('./package.json')
const { url } = require("node:inspector")
const plugin = new KiviPlugin('systool', version)

const npmRoot = "https://registry.npmjs.org/"
var isLatestVersion = true;

// function getRndInteger(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

function sleep(ms) {
    const start = new Date().getTime()
    while (true) {
        if (new Date().getTime() - start > ms) {
            return
        }
    }
}

async function reloadConfig() {
    plugin.saveConfig(Object.assign(config, plugin.loadConfig()))
    if (config["start-time"] != false && config["start-time"] != true) {
        config["start-time"] = true
        plugin.saveConfig(config)
    }
    config["latest-start-time"] = new Date().getTime()
    plugin.saveConfig(config)
}

function isAdmin(event, mainOnly = false) {
    if (mainOnly) {
        return plugin.admins[0] === event.sender.user_id;
    } else {
        return plugin.admins.includes(event.sender.user_id);
    }

}

async function hooker(event, params, plugin, func) {
    /**
     * 本函数用于hook错误, 在发生错误时发送错误信息到qq
     */
    checkStartAtFirstTime(event, plugin)
    try {
        func(event, params, plugin)
    } catch (error) {
        try {
            var funcname = func.name
        } catch (err) {
            var funcname = undefined
        }
        const msg = `〓 糟糕！systool运行"${funcname}"发生错误, 请您坐和放宽, 下面是详细错误信息(好东西就要莱纳~) 〓\n${error.stack}\n(如有需要请发送邮件至开发者 public.zhuhansan666@outlook.com 备注 systool:bug)`
        event.reply(msg)
    }
}

function reboot(event, params, plugin) {
    // 是否是主管理员
    const isMainAdmin = isAdmin(event, true);

    secondCmd = params[0]
    if (secondCmd == "help") {
        event.reply(`〓 systool./reboot 帮助 〓\n/reboot sys/system  ->  重启系统\n/reboot bot/kivi  ->  重启框架(此指令不稳定, 建议deploy模式下直接/exit重启机器人)`)
    } else {
        if (isMainAdmin) {
            if (secondCmd == "sys" || secondCmd == "system") {
                if (os.type() == "Linux" || os.type() == "Darwin") {
                    event.reply(`〓 开始运行 "reboot" 〓`)
                    const startTime = new Date().getTime()
                    exec("reboot", function(error, stdout, stderr) {
                                event.reply(`〓 运行 "reboot" 〓\n${stdout.length > 0 ? `指令输出: ${stdout}` : ""} ${stderr.length > 0 ? `指令输出: ${stderr}` : ""}共耗时${(new Date().getTime() - startTime) / 1000}秒`)
                    });
                } else {
                    event.reply(`〓 开始运行 "shutdown /f /r /t 3" 〓`)
                    const startTime = new Date().getTime()
                    exec("shutdown /f /r /t 3", function(error, stdout, stderr) {
                        event.reply(`〓 运行 "shutdown /f /r /t 3" 〓\n${stdout.length > 0 ? `指令输出: ${stdout}` : ""} ${stderr.length > 0 ? `指令输出: ${stderr}` : ""}共耗时${(new Date().getTime() - startTime) / 1000}秒`)
                    });
                }
            } else {
                if (secondCmd == "bot" || secondCmd == "kivi") {
                    // event.reply(`暂不支持`)
                    event.reply(`〓 开始运行 "kivi deploy -f" 〓`)
                    const startTime = new Date().getTime()
                    exec("kivi deploy -f", function(error, stdout, stderr) {
                        event.reply(`〓 运行 "kivi deploy -f" 〓\n${stdout.length > 0 ? `指令输出: ${stdout}` : ""} ${stderr.length > 0 ? `指令输出: ${stderr}` : ""}共耗时${(new Date().getTime() - startTime) / 1000}秒`)
                        process.exit()
                    });
                } else {
                    event.reply(`未知的参数: "${secondCmd}", 输入 "/reboot help" 以获取帮助`)
                }
            }
        } else {
            event.reply(`〓 Permission Error: 非主管理员 〓`)
        }
    }

}

function runCmd(event, params, plugin) {
    secondCmd = params[0]
    if (secondCmd == undefined) {
        event.reply(`〓 systool./cmd帮助 〓\n使用/cmd <system-command>执行系统命令`)
    } else {
        cmdString = event.raw_message.slice(5, event.raw_message.length)
        if (isAdmin(event, true)) {
            event.reply(`〓 开始执行 ${cmdString} 〓`)
            const startTime = new Date().getTime()
            if (os.type() == "Linux" || os.type() == "Darwin") {
                exec(cmdString, function(error, stdout, stderr) {
                    event.reply(`〓 运行 "${cmdString}" 〓\n${stdout.length > 0 ? `指令输出: ${stdout}` : ""} ${stderr.length > 0 ? `指令输出(错误信息): ${stderr}` : ""}共耗时${(new Date().getTime() - startTime) / 1000}秒`)
                });
                
            } else {
                exec(cmdString, { encoding: binaryEncoding }, function(error, stdout, stderr) {
                    stdout = iconv.decode(new Buffer.from(stdout, binaryEncoding), encoding)
                    stderr = iconv.decode(new Buffer.from(stderr, binaryEncoding), encoding)
                    event.reply(`〓 运行 "${cmdString}" 〓\n${stdout.length > 0 ? `指令输出: ${stdout}` : ""} ${stderr.length > 0 ? `指令输出(错误信息): ${stderr}` : ""}共耗时${(new Date().getTime() - startTime) / 1000}秒`)
                });
            }
        } else {
            event.reply(`Permission Error: 非主管理员`)
        }
    }
}

function getElement(arr, item) {
       for(var i=0; i<arr.length; i++){
       if(arr[i]==item){
           return i;
       }
   }
   return -1;
}

function isAliasCmd(item) {
    if (config["alias"].includes(item)) {
        return true;
    } else {
        return false;
    }
}

function alias_add(event, params, plugin) {
    secondCmd = params[0]
    thirdCmd = params[1]
    fouthCmd = params[2]
    if (secondCmd != undefined && thirdCmd == "=" && fouthCmd != undefined) {
        const arr = config[fouthCmd.slice(1, fouthCmd.length)]
        if (arr != undefined) {
            if (isAliasCmd(fouthCmd)) {
                event.reply("〓 ${secondCmd}=>${fouthCmd} 设置失败 〓\n[WARN]本命令不得指向")
                return
            }
            if (secondCmd.indexOf("/") == 0) {
                if (!arr.includes(secondCmd)) {
                    arr.push(secondCmd)
                    event.reply(`〓 ${secondCmd}=>${fouthCmd} 设置成功 〓`)
                    plugin.saveConfig(config)
                } else {
                    event.reply(`〓 ${secondCmd}=>${fouthCmd} 设置成功 〓\n[WARN]${secondCmd} 已指向 ${fouthCmd}`)
                }
            } else {
                event.reply(`〓 ${secondCmd}=>${fouthCmd} 设置失败 〓\n<command-a>(${secondCmd})必须以"/"开头`)
            }
        } else {
            event.reply(`〓 ${secondCmd}=>${fouthCmd} 设置失败 〓\n<command-b>(${fouthCmd})不存在`)
        }
    } else {
        event.reply(`〓 systool./alias帮助 〓\n使用/alias <command-a> = <command-b>定义指令a指向b\n使用/unalias <command-a> <command-b>取消a指向b\n*(注意: 空格不能省略, 指令b必须存在, a必须以"/"开头)`)
    }
}

function alias_rm(event, params, plugin) {
    secondCmd = params[0]
    thirdCmd = params[1]
    if (secondCmd != undefined && thirdCmd != undefined) {
        let arr = config[thirdCmd.slice(1, thirdCmd.length)]
        if (arr != undefined) {
            if (isAliasCmd(thirdCmd)) {
                event.reply(`〓 ${secondCmd}=>${fouthCmd} 设置失败 〓\n[WARN]本命令不得指向`)
                return
            }
            if (secondCmd.indexOf("/") == 0) {
                if (arr.includes(secondCmd)) {
                    itemIndex = getElement(arr, secondCmd)
                    arr.splice(itemIndex, 1)
                    event.reply(`〓 ${secondCmd}=>${thirdCmd} 删除成功 〓`)
                    plugin.saveConfig(config)
                } else {
                    event.reply(`〓 ${secondCmd}=>${thirdCmd} 删除成功 〓\n[WARN]${secondCmd} 未指向 ${thirdCmd}`)
                }
            } else {
                event.reply(`〓 ${secondCmd}=>${thirdCmd} 删除失败 〓\n<command-a>(${secondCmd})必须以"/"开头`)
            }
        } else {
            event.reply(`〓 ${secondCmd}=>${thirdCmd} 删除失败 〓\n<command-b>(${thirdCmd})不存在`)
        }
    } else {
        event.reply(`〓 systool./ualias帮助 〓\n使用/alias <command-a> = <command-b>定义指令a指向b(注意: 空格不能省略, 指令b必须存在, a必须以"/"开头)\n使用/unalias <command-a> <command-b>取消a指向b`)
    }
}

function alias(event, params, plugin) {
    if (event.raw_message.indexOf("/u") == -1) {
        console.log("alias_add")
        alias_add(event, params, plugin)
    } else {
        if (event.raw_message.indexOf("/u") == 0) {
            alias_rm(event, params, plugin)
        } else {
            event.reply(`〓 systool./alias帮助 〓\n使用/alias <command-a> = <command-b>定义指令a指向b(注意: 空格不能省略, 指令b必须存在, a必须以"/"开头)\n使用/unalias <command-a> <command-b>取消a指向b`)
        }
    }
}

function about(event, params, plugin) {
    event.reply(about_string)
}

function checkStartAtFirstTime(event, plugin) {
    if (config["start-time"] != false) {
        event.reply(first_time)
        sleep(500)
    }
}

async function checkUpdate(bot, admins) {
    npmUrl = `${npmRoot}kivibot-plugin-${plugin.name}/latest`

    try {
        const { data } = await http.get(npmUrl)
        latestVersion = data.version
    } catch(err) {
        latestVersion = "0.0.0"
        plugin.error(err)
    }

    if (!checkVersion(plugin.version, latestVersion)) {
        isLatestVersion = false
        getAllGroups(bot, (key, value, latestVersion) => {
            plugin.bot.sendGroupMsg(key, `〓 systool提示 〓
systool有新版本拉~
输入/plugin update systool 以更新至最新版本 (${version} => ${latestVersion})
请不要关闭计算机,好东西就要来啦~ (bushi`)
            sleep(1500)
        })
    } else {
        isLatestVersion = true
    }
}

function checkVersion(now, latest) {
    /**
     * @param now -> 当前版本字符串
     * @param latest -> 最新版本字符串
     * @returns bool (false -> 当前不是最新版)
     */
    nowVersionArr = now.split(".")
    latestVersionArr = latest.split(".")
    for (i=0; i < nowVersionArr.length; i++) {
        if (nowVersionArr[i] < latestVersionArr[i]) {
            return false
        }
    }
    return true
}

function getAllGroups(bot, callback) {
    groups = plugin.bot.gl
    for (let key of groups) {
        callback(key[0], key[1])
    }
}

plugin.onMounted((bot, admins) => {
    reloadConfig()
    plugin.onCmd(config["commands"]["reboot"], (event, params) => hooker(event, params, plugin, reboot))
    plugin.onCmd(config["commands"]["cmd"], (event, params) => hooker(event, params, plugin, runCmd))
    plugin.onCmd(config["commands"]["alias"], (event, params) => hooker(event, params, plugin, alias))
    plugin.onCmd(config["commands"]["about"], (event, params) => hooker(event, params, plugin, about))
    plugin.onCmd('/test', (event, params) => hooker(event, params, plugin, (event, params, plugin) => {
        throw Error("错误测试")
    })) //  用于错误信息测试;
    updateChecker = plugin.cron("* */10 * * * *", (bot, admins) => checkUpdate(bot, admins))

    process.on('exit', (exitcode) => { 
        config["start-time"] = false
        config["latest-exit-time"] = new Date().getTime()
        plugin.saveConfig(config)
    })
})

plugin.onUnmounted(() => {
    plugin.saveConfig(config)
})

module.exports = { plugin }