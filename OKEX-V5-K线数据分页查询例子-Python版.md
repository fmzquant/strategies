
> Name

OKEX-V5-K线数据分页查询例子-Python版

> Author

小小梦

> Strategy Description

## OKEX V5 K线数据分页查询例子

由于OKEX V5接口一次调用最多只有100根，需要分页查询。所以封装了一个例子，如何分页查询K线接口，获取1440根K线数据。

```js
function main() {
    // 访问接口获取数据
    var r = GetRecords("ETH-USDT-SWAP", "1H")   // 例如获取ETH U本位永续合约的1小时K线数据

    // 输出数据
    Log("K线数据：", r)
    Log("K线数据数量：", r.length)

    // 画图输出
    $.PlotRecords(r, "K")

    // 简单验证
    for (var i = 0 ; i < r.length - 1 ; i++) {
        if (r[i + 1].Time - r[i].Time != 1000 * 60 * 60) {
            Log(_D(r[i + 1].Time), _D(r[i].Time), r[i + 1].Time - r[i].Time)
        }
    }
}
```

![IMG](https://www.fmz.com/upload/asset/16d33bb293b09726b5dc.png) 

```main```函数是使用例子，其它函数可以摘出来直接使用。



> Source (python)

``` python
import json
import urllib.request

def encodeParams(params):
    ret = ""
    index = 0 
    for key in params:
        if index == 0:
            ret += key + "=" + str(params[key])
        else :
            ret += "&" + key + "=" + str(params[key])
        index += 1
    return ret 

def GetRecords(symbol, period):
    arr = []
    after = 0
    while True:
        params = {
            "instId": symbol,
            "bar": period,
            "limit": 100,
        }
        if after != 0 :
            params["after"] = after
        query = encodeParams(params)        
        try :
            headers = {
                'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
                'Accept-Language':'zh-CN,zh;q=0.9',
                'Connection':'keep-alive',
                'Cookie':'uuid_tt_dd=10_35489889920-1563497330616-876822; ...... ',
                'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
            }           

            url = "https://www.okex.com/api/v5/market/candles?" + query
            req = urllib.request.Request(url=url,headers=headers)
            r = json.loads(urllib.request.urlopen(req).read().decode('utf-8'))["data"]
            for i in range(len(r)):
                record = {}
                record["Time"] = int(r[i][0])
                record["High"] = float(r[i][2])
                record["Open"] = float(r[i][1])
                record["Low"] = float(r[i][3])
                record["Close"] = float(r[i][4])
                record["Volume"] = float(r[i][5])
                arr.append(record)
                after = record["Time"]
            if len(arr) >= 1440 or len(r) == 0:
                break
        except Exception as e:
            Log(e)
            return 
        Sleep(1000)
    arr.reverse()    
    return arr 
    
def main():
    r = GetRecords("ETH-USDT-SWAP", "1H")
    
    Log("K线数据：", r)
    Log("K线数据数量：", len(r))
    
    ext.PlotRecords(r, "K")
    
    for i in range(len(r) - 1):
        if r[i + 1]["Time"] - r[i]["Time"] != 1000 * 60 * 60:
            Log(_D(r[i + 1]["Time"] / 1000), _D(r[i]["Time"] / 1000), r[i + 1]["Time"] - r[i]["Time"])

```

> Detail

https://www.fmz.com/strategy/316746

> Last Modified

2021-09-16 11:35:10
