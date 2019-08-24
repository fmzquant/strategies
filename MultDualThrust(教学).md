
> 策略名称

MultDualThrust(教学)

> 策略作者

小小梦





> 源码 (javascript)

``` javascript
/*
## 商品期货 多品种 Dual Thrust 策略

*/

var _Symbols = [
    {
        ContractTypeName : "rb1910",
        NPeriod : 4,
        Ks : 0.5,
        Kx : 0.5,
        AmountOP : 1,
    },
    {
        ContractTypeName : "i1909",
        NPeriod : 4,
        Ks : 0.5,
        Kx : 0.5,
        AmountOP : 1,
    },
    {
        ContractTypeName : "pp1909",
        NPeriod : 4,
        Ks : 0.5,
        Kx : 0.5,
        AmountOP : 1,        
    },
    {
        ContractTypeName : "MA909",
        NPeriod : 4,
        Ks : 0.5,
        Kx : 0.5,
        AmountOP : 1,        
    },
]

var manager = $.NewPositionManager()
var STATE_IDLE = 0;
var STATE_LONG = 1;
var STATE_SHORT = 2;

function init () {
    for (var i = 0 ; i < _Symbols.length ; i++) {
        _Symbols[i].State = STATE_IDLE
        _Symbols[i].LastBarTime = 0
        _Symbols[i].UpTrack = 0
        _Symbols[i].DownTrack = 0
    }
}

function DualThrustProcess (symbols) {
    for (var i = 0 ; i < symbols.length ; i++) {
        var ContractTypeName = symbols[i].ContractTypeName
        var NPeriod = symbols[i].NPeriod
        var Ks = symbols[i].Ks
        var Kx = symbols[i].Kx
        var AmountOP = symbols[i].AmountOP

        // 首先判断是不是在交易时间
        if (!$.IsTrading(ContractTypeName)) {
            continue
        }

        // 切换为当前 symbol 参数的合约
        var insDetail = _C(exchange.SetContractType, ContractTypeName)
        
        // 判断K线长度
        var records = _C(exchange.GetRecords);
        if (!records || records.length <= NPeriod) {
            LogStatus("Calc Bars...");
            continue
        }

        var Bar = records[records.length - 1]
        if (symbols[i].LastBarTime !== Bar.Time) {
            var HH = TA.Highest(records, NPeriod, 'High')
            var HC = TA.Highest(records, NPeriod, 'Close')
            var LL = TA.Lowest(records, NPeriod, 'Low')
            var LC = TA.Lowest(records, NPeriod, 'Close') 
            var Range = Math.max(HH - LC, HC - LL)

            symbols[i].UpTrack = _N(Bar.Open + (Ks * Range))
            symbols[i].DownTrack = _N(Bar.Open - (Kx * Range)) 

            symbols[i].LastBarTime = Bar.Time;
        }

        if (symbols[i].State === STATE_IDLE || symbols[i].State === STATE_SHORT) {
            if (Bar.Close >= symbols[i].UpTrack) {
                if (symbols[i].State !== STATE_IDLE) {
                    Log(ContractTypeName, "平空仓")
                    manager.Cover(ContractTypeName);
                }
                Log(ContractTypeName, "开多仓")
                manager.OpenLong(ContractTypeName, AmountOP);
                symbols[i].State = STATE_LONG;
            }
        }    

        if (symbols[i].State === STATE_IDLE || symbols[i].State === STATE_LONG) {
            if (Bar.Close <= symbols[i].DownTrack) {
                if (symbols[i].State !== STATE_IDLE) {
                    Log(ContractTypeName, "平多仓")
                    manager.Cover(ContractTypeName);
                }
                Log(ContractTypeName, "开空仓")
                manager.OpenShort(ContractTypeName, AmountOP);
                symbols[i].State = STATE_SHORT;
            }
        }
    }
}


function main(){
    while(true){
        if(exchange.IO("status")){
            LogStatus(_D(), "已经连接CTP ！")
            DualThrustProcess(_Symbols)
        } else {
            LogStatus(_D(), "未连接CTP ！")
        }
        Sleep(1000)
    }
}
```

> 策略出处

https://www.fmz.com/strategy/163212

> 更新时间

2019-08-22 15:39:24
