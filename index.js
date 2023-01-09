const os = require("node:os")
const exec = require('child_process').exec;
const { KiviPlugin, segment, http } = require('@kivibot/core')
const { kiviConf } = require("@kivibot/core")
const iconv = require('iconv-lite');
const encoding = 'cp936';
const binaryEncoding = 'binary';

const { version } = require('./package.json')
const plugin = new KiviPlugin('reboot-tools', version)

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

plugin.onMounted(() => {
    plugin.onCmd('/reboot', (event, params) => hooker(event, params, plugin, reboot))
    plugin.onCmd('/cmd', (event, params) => hooker(event, params, plugin, runCmd))
    // plugin.onCmd('/test', (event, params) => hooker(event, params, plugin, undefined)) //  用于错误信息测试
})

module.exports = { plugin }