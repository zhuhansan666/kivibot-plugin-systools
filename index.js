const os = require("node:os")
const exec = require('child_process').exec;
const { KiviPlugin, segment, http } = require('@kivibot/core')
const { kiviConf } = require("@kivibot/core")

// const { version } = require('../package.json')
const plugin = new KiviPlugin('reboot-tools', '0.0.1')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function main(event, params, plugin) {
    // 是否是管理员
    const isAdmin = kiviConf.admins.includes(event.sender.user_id);
    // 是否是主管理员
    const isMainAdmin = kiviConf.admins[0] === event.sender.user_id;

    // console.log(params)
    secondCmd = params[0]
    if (secondCmd == "help") {
        event.reply(`/reboot sys/system  ->  重启系统\n/reboot bot/kivi  ->  重启框架`)
    } else {
        if (isMainAdmin) {
            if (secondCmd == "sys" || secondCmd == "system") {
                if (os.type() == "Linux" || os.type() == "Darwin") {
                    event.reply(`开始运行 "reboot"`)
                    exec("reboot", function(error, stdout, stderr) {
                        event.reply(`运行 "reboot": ${error}, ${stdout}, ${stderr}`)
                    });
                } else {
                    event.reply(`开始运行 "shutdown /f /r /t 3"`)
                    exec("shutdown /f /r /t 3", function(error, stdout, stderr) {
                        event.reply(`运行 "shutdown /f /r /t 3": ${error}, ${stdout}, ${stderr}`)
                    });
                }
            } else {
                if (secondCmd == "bot" || secondCmd == "kivi") {
                    // event.reply(`暂不支持`)
                    event.reply(`开始运行 "kivi deploy -f"`)
                    exec("kivi deploy -f", function(error, stdout, stderr) {
                        event.reply(`运行 "kivi deploy -f": ${error}, ${stdout}, ${stderr}`)
                        process.exit()
                    });
                } else {
                    event.reply(`未知的参数: "${secondCmd}", 输入 "/reboot help" 以获取帮助`)
                }
            }
        } else {
            event.reply(`Permission Error: 非主管理员`, true)
        }
    }

}

plugin.onMounted(() => {
    plugin.onCmd('/reboot', (event, params) => main(event, params, plugin))
})

module.exports = { plugin }