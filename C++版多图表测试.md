
> 策略名称

C++版多图表测试

> 策略作者

小小梦





> 源码 (cpp)

``` cpp
/*backtest
start: 2019-01-22 00:00:00
end: 2019-01-23 00:00:00
period: 30m
exchanges: [{"eid":"OKCoin_EN","currency":"BTC_USD"}]
*/

void main() {
    json cfgA = R"({
        "extension" : {
            "layout" : "single", 
            "height" : 300,
            "col" : 8
        }, 
        "title" : {
            "text" : "盘口图表"
        },
        "xAxis" : {
            "type" : "datetime" 
        }, 
        "series" : [{
            "name" : "买一",
            "data" : []
        }, {
            "name" : "卖一", 
            "data" : []
        }]
    })"_json;    

    json cfgB = R"({
        "title" : {
            "text" : "差价图"
        }, 
        "xAxis" : {
            "type" : "datetime"
        }, 
        "series" : [{
            "name" : "差价", 
            "type" : "column", 
            "data" : []
        }]
    })"_json;    
    
    json cfgC = R"({
        "__isStock" : false,
        "title" : {
            "text" : "饼图"
        }, 
        "series" : [{
            "type" : "pie", 
            "name" : "one", 
            "data" : [
                ["A", 25],
                ["B", 25],
                ["C", 25],
                ["D", 25]
            ]
        }]
    })"_json;    
    
    json cfgD = R"({
        "extension" : {
            "layout" : "single",
            "col" : 8,
            "height" : "300px"
        }, 
        "title" : {
            "text" : "盘口图表"
        }, 
        "series" : [{
            "name" : "买一", 
            "data" : []
        }, {
            "name" : "卖一",
            "data" : []
        }]
    })"_json;    
    
    json cfgE = R"({
        "__isStock" : false, 
        "extension" : {
            "layout" : "single", 
            "col" : 4,
            "height" : "300px"
        }, 
        "title" : {
            "text" : "饼图2"
        },
        "series" : [{
            "type" : "pie",
            "name" : "one", 
            "data" : [
                ["A", 25], 
                ["B", 25], 
                ["C", 25], 
                ["D", 25]
            ]
        }]
    })"_json;

    auto chart = Chart({cfgA, cfgB, cfgC, cfgD, cfgE});
    chart.reset();
    json zz = R"({
        "name" : "ZZ", 
        "y" : 0
    })"_json;
    zz["y"] = rand() % 100;
    chart.add(3, zz);
    
    while(true) {
        Sleep(1000);
        auto ticker = exchange.GetTicker();
        if(!ticker.Valid) {
            continue;
        }
        auto diff = ticker.Sell - ticker.Buy;
        json cfgASubTitle = R"({"text" : ""})"_json;
        cfgASubTitle["text"] = format("买一 %f , 卖一 %f", ticker.Buy, ticker.Sell);
        cfgA["subtitle"] = cfgASubTitle;
        
        json cfgBSubTitle = R"({"text" : ""})"_json;
        cfgBSubTitle["text"] = format("价差 %f", diff);
        cfgB["subtitle"] = cfgBSubTitle;

        chart.add(0, {Unix() * 1000, ticker.Buy});
        chart.add(1, {Unix() * 1000, ticker.Sell});
        chart.add(2, {Unix() * 1000, diff});
        chart.add(4, {Unix() * 1000, ticker.Buy});
        chart.add(5, {Unix() * 1000, ticker.Buy});
        cfgC["series"][0]["data"][0][1] = rand() % 100;
        cfgE["series"][0]["data"][0][1] = rand() % 100;
        chart.update({cfgA, cfgB, cfgC, cfgD, cfgE});
    }
}
```

> 策略出处

https://www.fmz.com/strategy/190848

> 更新时间

2020-03-16 11:48:16
