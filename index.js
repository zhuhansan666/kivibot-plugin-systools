const os = require("node:os")
const exec = require('child_process').exec;
const { KiviPlugin, segment, http } = require('@kivibot/core')
const { kiviConf } = require("@kivibot/core")
const iconv = require('iconv-lite');
const encoding = 'cp936';
const binaryEncoding = 'binary';

const config = {
    "cmd": ["/cmd", "/c"],
    "reboot": ["/reboot", "/r"],
    "alias": ["/alias", "/a", "/unalias", "/ua"]
}

const { version } = require('./package.json')
const plugin = new KiviPlugin('reboot-tools', version)

async function reloadConfig() {
    plugin.saveConfig(Object.assign(config, plugin.loadConfig()))
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
    try {
        func(event, params, plugin)
    } catch (error) {
        try {
            var funcname = func.name
        } catch (err) {
            var funcname = undefined
        }
        const msg = `〓 运行"${funcname}"发生错误: 〓\n${error.stack}\n(如有需要请发送邮件至开发者 public.zhuhansan666@outlook.com 备注 reboot-tools:bug)`
        event.reply(msg)
    }
}

function reboot(event, params, plugin) {
    // 是否是主管理员
    const isMainAdmin = isAdmin(event, true);

    secondCmd = params[0]
    if (secondCmd == "help") {
        event.reply(`〓 reboot-tools./reboot 帮助 〓\n/reboot sys/system  ->  重启系统\n/reboot bot/kivi  ->  重启框架`)
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
        event.reply(`〓 reboot-tools./cmd帮助 〓\n使用/cmd <system-command>执行系统命令`)
    } else {
        cmdString = event.raw_message.slice(5, event.raw_message.length)
        if (isAdmin(event, true)) {
            event.reply(`〓 开始执行 ${cmdString} 〓`)
            const startTime = new Date().getTime()
            exec(cmdString, { encoding: binaryEncoding }, function(error, stdout, stderr) {
                        stdout = iconv.decode(new Buffer.from(stdout, binaryEncoding), encoding)
                        stderr = iconv.decode(new Buffer.from(stderr, binaryEncoding), encoding)
                        event.reply(`〓 运行 "${cmdString}" 〓\n${stdout.length > 0 ? `指令输出: ${stdout}` : ""} ${stderr.length > 0 ? `指令输出: ${stderr}` : ""}共耗时${(new Date().getTime() - startTime) / 1000}秒`)
            });
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
        event.reply(`〓 reboot-tools./alias帮助 〓\n使用/alias <command-a> = <command-b>定义指令a指向b\n使用/unalias <command-a> <command-b>取消a指向b\n*(注意: 空格不能省略, 指令b必须存在, a必须以"/"开头)`)
    }
}

function alias_rm(event, params, plugin) {
    secondCmd = params[0]
    thirdCmd = params[1]
    if (secondCmd != undefined && thirdCmd != undefined) {
        let arr = config[thirdCmd.slice(1, thirdCmd.length)]
        if (arr != undefined) {
            if (isAliasCmd(thirdCmd)) {
                event.reply("〓 ${secondCmd}=>${fouthCmd} 设置失败 〓\n[WARN]本命令不得指向")
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
        event.reply(`〓 reboot-tools./ualias帮助 〓\n使用/alias <command-a> = <command-b>定义指令a指向b(注意: 空格不能省略, 指令b必须存在, a必须以"/"开头)\n使用/unalias <command-a> <command-b>取消a指向b`)
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
            event.reply(`〓 reboot-tools./alias帮助 〓\n使用/alias <command-a> = <command-b>定义指令a指向b(注意: 空格不能省略, 指令b必须存在, a必须以"/"开头)\n使用/unalias <command-a> <command-b>取消a指向b`)
        }
    }
}

plugin.onMounted(() => {
    reloadConfig()
    plugin.onCmd(config["reboot"], (event, params) => hooker(event, params, plugin, reboot))
    plugin.onCmd(config["cmd"], (event, params) => hooker(event, params, plugin, runCmd))
    plugin.onCmd(config["alias"], (event, params) => hooker(event, params, plugin, alias))
    // plugin.onCmd('/test', (event, params) => hooker(event, params, plugin, undefined)) //  用于错误信息测试
})

plugin.onUnmounted(() => {
    plugin.saveConfig(config)
})

module.exports = { plugin }