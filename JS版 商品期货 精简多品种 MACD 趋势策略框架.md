
> 策略名称

JS版 商品期货 精简多品种 MACD 趋势策略框架

> 策略作者

小小梦





> 源码 (javascript)

``` javascript
/*backtest
start: 2016-01-30        
end: 2016-12-30           
period: 1440
periodBase: 60
mode: 0  
*/

// 作者 Zero
function Trader(q, symbol){
    var obj = {};
    obj.q = q;
    obj.symbol = symbol;
    obj.position = 0;
    obj.isPending = false;

    obj.onOpen = function(task, ret){
        if(ret){
            obj.position = ret.position.Amount * ((ret.position.Type == PD_LONG || ret.position.Type == PD_LONG_YD) ? 1 : -1);
        }
        Log(task.desc, "Position:", obj.position, ret);
        obj.isPending = false;
    }

    obj.onCover = function(task, ret){
        obj.isPending = false;
        obj.position = 0;
        Log(task.desc, ret);
    }
    
    obj.onTick = function(){
        if(obj.isPending){
            return;
        }
        var ct = exchange.SetContractType(obj.symbol);
        if(!ct){
            return;
        }
        var r = exchange.GetRecords();
        if(!r || r.length < 35){
            return;
        }
        var macd = TA.MACD(r);
        var diff = macd[0][macd[0].length - 2] - macd[1][macd[1].length - 2];
        
        if(Math.abs(diff) > 0 && obj.position == 0){
            obj.ispending = true;
            obj.q.pushTask(exchange, obj.symbol, (diff > 0 ? "buy" : "sell"), 1, obj.onOpen);          
        }

        if(Math.abs(diff) > 0 && ((diff > 0 && obj.position < 0) || (diff < 0 && obj.position > 0))){
            obj.isPending = true;
            obj.q.pushTask(exchange, obj.symbol, (obj.position > 0 ? "closebuy" : "closesell"), 1, obj.onCover);
        }
    }

    return obj;
}

function main(){
    var q = $.NewTaskQueue();
    Log(_C(exchange.GetAccount));
    tasks = [];
    var ContractArray = ["MA701", "rb1701"];
    for(var index in ContractArray){
        tasks.push(Trader(q, ContractArray[index]));
    }
    while(true){
        if(exchange.IO("status")){
            for(var j in tasks){
                tasks[j].onTick();
            }
            q.poll();
        }
        Sleep(1000);
    }
}


```

> 策略出处

https://www.fmz.com/strategy/44593

> 更新时间

2017-06-24 10:32:57
