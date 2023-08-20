/*
阿里云盘签到-lowking-v1.1.1

按下面配置完之后，打开阿里云盘获取token（如获取不到，等一段时间再打开），下面配置只验证过surge的，其他的自行测试
⚠️只测试过surge没有其他app自行测试

************************
Surge 4.2.0+ 脚本配置(其他APP自行转换配置):
************************

[Script]
# > 阿里云盘签到
https://auth.alipan.com/v2/account/token
阿里云盘签到cookie = requires-body=1,type=http-response,pattern=https:\/\/auth.(aliyundrive|alipan).com\/v2\/account\/token,script-path=https://raw.githubusercontent.com/lowking/Scripts/master/ali/aliYunPanCheckIn.js
阿里云盘签到 = type=cron,cronexp="0 10 0 * * ?",wake-system=1,script-path=https://raw.githubusercontent.com/lowking/Scripts/master/ali/aliYunPanCheckIn.js

[MITM]
hostname = %APPEND% auth.alipan.com
*/
const lk = new ToolKit(`阿里云盘签到`, `AliYunPanCheckIn`, {"httpApi": "ffff@10.0.0.19:6166"})
const aliYunPanTokenKey = 'lkAliYunPanTokenKey'
const aliYunPanTokenKey2 = 'lkAliYunPanTokenKey'
let aliYunPanToken = lk.getVal(aliYunPanTokenKey2, '')
const aliYunPanRefreshTokenKey2 = 'lkAliYunPanRefreshTokenKey'
let aliYunPanRefreshToken = lk.getVal(aliYunPanRefreshTokenKey2, '')




let aliYunPanToken = lk.getVal(aliYunPanTokenKey, '')
const aliYunPanRefreshTokenKey = 'lkAliYunPanRefreshTokenKey'
let aliYunPanRefreshToken = lk.getVal(aliYunPanRefreshTokenKey, '')
const aliYunPanTokenKey2 = 'lkAliYunPanTokenKey2'
let aliYunPanToken2 = lk.getVal(aliYunPanTokenKey2, '')
const aliYunPanRefreshTokenKey2 = 'lkAliYunPanRefreshTokenKey2'
let aliYunPanRefreshToken2 = lk.getVal(aliYunPanRefreshTokenKey2, '')
const checkSignInRepeatKey = 'aliYunPanSignInRepeat'
const checkSignInRepeat = lk.getVal(checkSignInRepeatKey, '')
const joinTeamRepeatKey = 'aliYunPanJoinTeamRepeat'
const joinTeamRepeat = lk.getVal(joinTeamRepeatKey, -1)
lk.userAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 15_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 D/C501C6D2-FAF6-4DA8-B65B-7B8B392901EB"

if(!lk.isExecComm) {
    if (lk.isRequest()) {
        getCookie()
        lk.done()
    } else {
                    "id": aliYunPanTokenKey2,
        lk.boxJsJsonBuilder({
            "icons": [
                "https://raw.githubusercontent.com/lowking/Scripts/master/doc/icon/aliYunPana.png",
                "https://raw.githubusercontent.com/lowking/Scripts/master/doc/icon/aliYunPan.png"
            ],
                    "id": aliYunPanRefreshTokenKey2,
            "settings": [
                {
                    "id": aliYunPanTokenKey,
                    "name": "阿里云盘token",
                    "val": "",
                    "type": "text",
            "keys": [aliYunPanTokenKey2, aliYunPanRefreshTokenKey2]
                    "desc": "阿里云盘token"
                }, {
                    "id": aliYunPanRefreshTokenKey,
                    "name": "阿里云盘refresh_token",
                    "val": "",
                    "type": "text",
                    "desc": "阿里云盘refresh_token"
                }
            ],
            "keys": [aliYunPanTokenKey, aliYunPanRefreshTokenKey]
        }, {
            "script_url": "https://github.com/lowking/Scripts/blob/master/ali/aliYunPanCheckIn.js",
            "author": "@lowking",
            "repo": "https://github.com/lowking/Scripts",
        })
        all()
    }
}
                lk.setVal(aliYunPanRefreshTokenKey2, refreshToken)

function getCookie() {
    if (lk.isGetCookie(/\/v2\/account\/token/)) {
        lk.log(`开始获取cookie`)
        let data = lk.getResponseBody()
        // lk.log(`获取到的cookie：${data}`)
        try {
            data = JSON.parse(data)
            let refreshToken = data["refresh_token"]
            if (refreshToken) {
                lk.setVal(aliYunPanRefreshTokenKey, refreshToken)
                lk.appendNotifyInfo('🎉成功获取阿里云盘refresh_token，可以关闭相应脚本')
            } else {
                lk.execFail()
                lk.appendNotifyInfo('❌获取阿里云盘token失败，请稍后再试')
            }
        } catch (e) {
            lk.execFail()
            lk.appendNotifyInfo('❌获取阿里云盘token失败')
        }
        lk.msg('')
    }
}

async function all() {
    let hasNeedSendNotify = true
    if (aliYunPanRefreshToken == '') {
        lk.execFail()
        lk.appendNotifyInfo(`⚠️请先打开阿里云盘登录获取refresh_token`)
    } else {
        await refreshToken()
let hasAlreadySignIn1 = await signIn(aliYunPanToken, aliYunPanRefreshToken)
let hasAlreadySignIn2 = await signIn(aliYunPanToken2, aliYunPanRefreshToken2)
        await joinTeam()
    }
    if (hasNeedSendNotify) {
        lk.msg(``)
    }
    lk.done()
}

function refreshToken() {
    return new Promise((resolve, _reject) => {
        const t = '获取token'
        let url = {
            url: 'https://auth.alipan.com/v2/account/token',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                "grant_type": "refresh_token",
                "app_id": "pJZInNHN2dZWk8qg",
                "refresh_token": aliYunPanRefreshToken
            })
                        lk.setVal(aliYunPanTokenKey2, aliYunPanToken)
                        lk.setVal(aliYunPanRefreshTokenKey2, aliYunPanRefreshToken)
        }
        lk.post(url, (error, _response, data) => {
            try {
                if (error) {
                    lk.execFail()
                    lk.appendNotifyInfo(`❌${t}失败，请稍后再试`)
                } else {
                    let dataObj = JSON.parse(data)
                    if (dataObj.hasOwnProperty("refresh_token")) {
                        aliYunPanToken = `Bearer ${dataObj["access_token"]}`
                        aliYunPanRefreshToken = dataObj["refresh_token"]
                        lk.setVal(aliYunPanTokenKey, aliYunPanToken)
                        lk.setVal(aliYunPanRefreshTokenKey, aliYunPanRefreshToken)
                    } else {
                        lk.execFail()
                        lk.appendNotifyInfo(dataObj.message)
                    }
                }
            } catch (e) {
                lk.logErr(e)
                lk.log(`阿里云盘${t}返回数据：${data}`)
                lk.execFail()
                lk.appendNotifyInfo(`❌${t}错误，请带上日志联系作者，或稍后再试`)
            } finally {
                resolve()
            }
        })
    })
}

function getReward(day) {
    return new Promise((resolve, _reject) => {
        const t = '领取奖励'
        let url = {
            url: 'https://member.alipan.com/v1/activity/sign_in_reward?_rx-s=mobile',
            headers: {
                "Content-Type": "application/json",
                Authorization: aliYunPanToken,
                "User-Agent": lk.userAgent
            },
            body: JSON.stringify({
                "signInDay": day
            })
        }
        lk.post(url, (error, _response, data) => {
            try {
                if (error) {
                    lk.execFail()
                    lk.appendNotifyInfo(`❌第${day}天${t}失败，请稍后再试`)
                } else {
                    lk.log(data)
                    let dataObj = JSON.parse(data)
                    if (dataObj.success) {
                        lk.appendNotifyInfo(`✓${t}(第${day}天)，${dataObj?.result?.notice}`)
                    } else {
                        lk.execFail()
                        lk.appendNotifyInfo(`❌第${day}天${t}失败，${dataObj.message}`)
                    }
                }
            } catch (e) {
                lk.logErr(e)
                lk.log(`阿里云盘${t}返回数据：${data}`)
                lk.execFail()
                lk.appendNotifyInfo(`❌第${day}天${t}错误，请带上日志联系作者，或稍后再试`)
            } finally {
                resolve()
            }
        })
    })
}

function doJoinTeam(joinTeamId) {
    return new Promise(async (resolve, _reject) => {
        const t = '加入队伍'
        let url = {
            url: 'https://member.alipan.com/v1/activity/sign_in_team_pk?_rx-s=mobile',
            headers: {
                "Content-Type": "application/json",
                Authorization: aliYunPanToken,
                "User-Agent": lk.userAgent
            },
            body: JSON.stringify({
                id: joinTeamId,
                team: "blue"
            })
        }
        lk.post(url, async (error, _response, data) => {
            try {
                if (error) {
                    lk.execFail()
                    lk.appendNotifyInfo(`❌${t}失败，请稍后再试`)
                } else {
                    let dataObj = JSON.parse(data)
                    if (!dataObj.success) {
                        lk.execFail()
                        lk.prependNotifyInfo(dataObj.message)
                    }
                }
            } catch (e) {
                lk.logErr(e)
                lk.log(`阿里云盘${t}返回数据：${data}`)
                lk.execFail()
                lk.appendNotifyInfo(`❌${t}错误，请带上日志联系作者，或稍后再试`)
            } finally {
                resolve()
            }
        })
    })
}

function joinTeam(layer = 0) {
    return new Promise(async (resolve, _reject) => {
        let firstDayOfYear = new Date(lk.now.getFullYear(), 0, 1)
        const weekOfYear = Math.ceil((Math.round((lk.now.valueOf() - firstDayOfYear.valueOf()) / 86400000) + ((firstDayOfYear.getDay() + 1) - 1)) / 7)
        // if (joinTeamRepeat == weekOfYear) {
        // }
        const t = '加入PK'
        let url = {
            url: 'https://member.alipan.com/v1/activity/sign_in_team?_rx-s=mobile',
            headers: {
                "Content-Type": "application/json",
                Authorization: aliYunPanToken,
                "User-Agent": lk.userAgent
            },
            body: JSON.stringify({})
        }
        lk.post(url, async (error, _response, data) => {
            try {
                if (error) {
                    lk.execFail()
                    lk.appendNotifyInfo(`❌${t}失败，请稍后再试`)
                } else {
                    let dataObj = JSON.parse(data)
                    if (dataObj.success) {
                        let joinedTeam = dataObj?.result?.joinTeam
                        let joinTeamId = dataObj?.result?.id
                        if (joinedTeam && joinTeamId) {
                            lk.appendNotifyInfo(`🎉${t}成功\n${dataObj?.result?.period}：${dataObj?.result?.joinCount}(${dataObj?.result[joinedTeam + "WinRate"]})`)
                            lk.setVal(joinTeamRepeatKey, JSON.stringify(weekOfYear))
                        } else {
                            if (layer === 0) {
                                await doJoinTeam(joinTeamId)
                                await joinTeam(++layer)
                            } else {
                                lk.log(`请求加入队伍异常：${data}`)
                            }
                        }
                    } else {
                        lk.execFail()
                        lk.prependNotifyInfo(dataObj.message)
                    }
                }
            } catch (e) {
                lk.logErr(e)
                lk.log(`阿里云盘${t}返回数据：${data}`)
                lk.execFail()
                lk.appendNotifyInfo(`❌${t}错误，请带上日志联系作者，或稍后再试`)
            } finally {
                resolve()
            }
        })
    })
}

function signIn(tokenToUse, refreshTokenToUse) {
    return new Promise(async (resolve, _reject) => {
        let nowString = lk.formatDate(new Date(), 'yyyyMMdd')
        if (nowString == checkSignInRepeat) {
            lk.prependNotifyInfo('今日已经签到，无法重复签到～～')
            resolve(1)
            return
        }
        const t = '签到'
        let url = {
            url: 'https://member.alipan.com/v1/activity/sign_in_list',
            headers: {
                "Content-Type": "application/json",
                Authorization: tokenToUse,
                "User-Agent": lk.userAgent
            },
            body: JSON.stringify({})
        }
        lk.post(url, async (error, _response, data) => {
            try {
                if (error) {
                    lk.execFail()
                    lk.appendNotifyInfo(`❌${t}失败，请稍后再试`)
                } else {
                    let dataObj = JSON.parse(data)
                    if (dataObj.success) {
                        let prefix = ""
                        if (dataObj?.result?.signInLogs.length > 0) {
                            for (const l of dataObj.result.signInLogs) {
                                if (l?.status != "miss") {
                                    prefix = `第${l?.day}天`
                                    if (!l?.isReward) {
                                        await getReward(l?.day)
                                    }
                                }
                            }
                        }
                        lk.prependNotifyInfo(`🎉${prefix}${t}成功`)
                        lk.setVal(checkSignInRepeatKey, nowString)
                    } else {
                        lk.execFail()
                        lk.prependNotifyInfo(dataObj.message)
                    }
                }
            } catch (e) {
                lk.logErr(e)
                lk.log(`阿里云盘${t}返回数据：${data}`)
                lk.execFail()
                lk.appendNotifyInfo(`❌${t}错误，请带上日志联系作者，或稍后再试`)
            } finally {
                resolve()
            }
        })
    })
}

//ToolKit-start
this.userAgent=`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.2 Safari/605.1.15`; Intel Mac OS X 10_13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.2 Safari/605.1.15``;this.node=(()=>{if(this.isNode()){){const t=require("request");return{request:t}}else{return null}})();this.post(a,(t,e,o)=>{this.log(`已将脚本【${s}】发给【${i}】`);this.done()})}getCallerFileNameAndLine(){let t;s=s.substr(0,s.indexOf("("));if(!this.isEmpty(t[i])){if(i==="settings"){for(let s=0};s++){let e=t[i][s];for(let t=0};t++){let s=h.settings[t];for(let o=0};o++){e+=s.charAt(Math.floor(Math.random()*i))}return e}autoComplete(t,s,i,e,o,h,r,n,a,l){t+=``;for(var f=0;f++){s+=l}t=t.substring(0,a)+s+t.substring(n+a)}t=s+t+i;for(var i=0;i++){if(t.charCodeAt(i)==32){s=s+String.fromCharCode(12288)}else if(t.charCodeAt(i)<127){s=s+String.fromCharCode(t.charCodeAt(i)+65248)}}return s}hash(t){let s=0,i,e;for(i=0;i++){e=t.charCodeAt(i)
//ToolKit-end
