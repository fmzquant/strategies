
> Name

FMZ实盘机器人自动检测重启程序微信推送

> Author

eason04

> Strategy Description

**FMZ实盘机器人自动检测重启程序（微信推送）**
 ![IMG](https://www.fmz.com/upload/asset/27d06163dac4df7fe8520.png) 
 此处填入自己在FMZ平台申请的API和APIkey
 ![IMG](https://www.fmz.com/upload/asset/27cef09a09fbccac93116.png) 
 变量token是用于发送微信推送的代码，以下是申请方式
 打开网站：https://www.pushplus.plus/  用自己的微信登录，并关注公众号(不是打广告)
 ![IMG](https://www.fmz.com/upload/asset/27d5d579fa87c8f486136.png) 
 点击一对一消息
 ![IMG](https://www.fmz.com/upload/asset/27d526d1a1f71b1e4fc15.png) 
 将token复制并填写到token变量处
 ![IMG](https://www.fmz.com/upload/asset/27dd43d36cf1e78165bc7.png) 
 robotId变量处填写自己需要监视的实盘机器人编号(列表形式)
 ![IMG](https://www.fmz.com/upload/asset/27e6ff0ca668d74343caf.png) 
 实盘机器人编号可以打开FMZ网页版里的实盘，在网址上获取
 
**代码可以直接放到本地运行，
不过需要一直开启电脑，
也可以放到自己的服务器上运行，
在服务器上运行需要提前安装第三方库**




> Source (python)

``` python
'''
代码可以直接放到本地运行，
不过需要一直开启电脑，也可以放到自己的服务器上运行
'''

import time
import json
import ssl
import requests
ssl._create_default_https_context = ssl._create_unverified_context

try:
    import md5
    import urllib2
    from urllib import urlencode
except:
    import hashlib as md5
    import urllib.request as urllib2
    from urllib.parse import urlencode

accessKey = '48xxxxxxxxxxxxxxxxxxxxxxxxxxxxde'
secretKey = '91xxxxxxxxxxxxxxxxxxxxxxxxxxxx84'

def api(method, *args):
    d = {
        'version': '1.0',
        'access_key': accessKey,
        'method': method,
        'args': json.dumps(list(args)),
        'nonce': int(time.time() * 1000),
        }

    d['sign'] = md5.md5(('%s|%s|%s|%d|%s' % (d['version'], d['method'], d['args'], d['nonce'], secretKey)).encode('utf-8')).hexdigest()
    # 注意： urllib2.urlopen 函数，超时问题，可以设置超时时间，urllib2.urlopen('https://www.fmz.com/api/v1', urlencode(d).encode('utf-8'), timeout=10) 设置超时 10秒
    return json.loads(urllib2.urlopen('https://www.fmz.com/api/v1', urlencode(d).encode('utf-8')).read().decode('utf-8'))

def send_wechat(msg):
    token = '93xxxxxxxxxxxxxxxxxxxxxxxxxxxx57'  # 前边复制到那个token
    title = '【Waring】 策略信息'
    content = msg
    template = 'html'
    url = f"https://www.pushplus.plus/send?token={token}&title={title}&content={content}&template={template}"
    #print(url)
    r = requests.get(url=url)
    print(json.loads(r.text)['msg'])

robotId = [xxx,xxx,xxx]    #需要监视的机器人代码


while True:
    for j in range(len(robotId)):
        detail = api('GetRobotDetail', robotId[j])
        if detail['data']['result']['robot']['status'] == 1 and detail['data']['result']['robot']['wd'] == 1:
            print(f"实盘{robotId[j]}状态正常 status = {detail['data']['result']['robot']['status']}，实盘监视已打开 wd = {detail['data']['result']['robot']['wd']}")
            pass
        elif detail['data']['result']['robot']['status'] == 1 :
            print(f"实盘{robotId[j]}状态正常 status = {detail['data']['result']['robot']['status']}，实盘监视未打开 wd = {detail['data']['result']['robot']['wd']}")
            pass
        else:
            print(f"实盘{robotId[j]}状态异常 status = {detail['data']['result']['robot']['status']}")
            #尝试重启实盘   尝试次数 = 4    每5s 尝试一次
            status = False
            for i in range(4):
                api('RestartRobot', robotId[j])
                robotDetail = api('GetRobotDetail', robotId[j])
                print(f"尝试重启实盘{robotId[j]}第 {i+1} 次")
                if robotDetail['data']['result']['robot']['status'] == 1 :
                    mess = api('GetRobotLogs',robotId[j],0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
                    print(f"实盘{robotId[j]}重启完成 status = {api('GetRobotDetail', robotId[j])['data']['result']['robot']['status']}\n"
                          f"返回错误信息1：{mess['data']['result']['logs'][0]['Arr'][0][6]}\n"
                          f"返回错误信息2：{mess['data']['result']['logs'][0]['Arr'][1][6]}\n")
                    send_wechat(f"实盘{robotId[j]}重启完成 status = {api('GetRobotDetail', robotId[j])['data']['result']['robot']['status']}\n"
                                f"返回错误信息1：{mess['data']['result']['logs'][0]['Arr'][0][6]}\n"
                                f"返回错误信息2：{mess['data']['result']['logs'][0]['Arr'][1][6]}\n")
                    status = True
                    break
                else:
                    print(f"第 {i+1} 次 重启失败!!")
                time.sleep(5)
            if status == False :
                print(f"尝试 4 次重启实盘{robotId[j]}失败，发送警告信息！！")
                send_wechat(f"尝试 4 次重启实盘{robotId[j]}失败，请及时查看！！\n尝试 4 次重启实盘{robotId[j]}失败，请及时查看！！\n尝试 4 次重启实盘{robotId[j]}失败，请及时查看！！\n")
    time.sleep(60*10)

```

> Detail

https://www.fmz.com/strategy/383695

> Last Modified

2022-09-22 18:27:23
