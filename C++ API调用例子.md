
> 策略名称

C++ API调用例子

> 策略作者

Zero

> 策略描述

支持C++ 11, 兼容各种平台(Windows/Linux/Mac). 云端编译.



> 源码 (cpp)

``` cpp
void main() {
    if (!Test("c++")) {
        Panic("请下载最新版本托管者");
    }
    // json: https://github.com/nlohmann/json
    // 所有的对像返回用Valid来判断是否有效
    LogProfitReset();
    LogReset();
    Log(_N(9.12345, 2));
    Log("use _C", _C(exchange.GetTicker), _C(exchange.GetAccount));

    // 测试异步并发
    auto routineTicker = exchange.Go("GetTicker");
    auto routineDepth = exchange.Go("GetDepth");
    Ticker asyncTicker;
    Depth asyncDepth;
    
    // 无超时, 一直等到 Ticker 返回
    if (routineTicker.wait(asyncTicker)) {
        Log("Wait Ticker OK", asyncTicker.Valid, asyncTicker, asyncTicker.Last);
    } else {
        Log("Wait Ticker fail");
    }
    // 带超时的等待300ms, 如果指定为0，就立即返回
    if (routineDepth.wait(asyncDepth, 200)) {
        // 在等待时间Api返回调用, 但不说明深度一定就有效, asyncDepth.Valid 代表是否有效
        Log("Wait Depth OK", asyncDepth.Valid, asyncDepth);
    } else {
        Log("Wait Depth timeout");
    }
    
    auto records = _C(exchange.GetRecords);
    Log("K线最后一根", records[records.size()-1].Time, _D(records[records.size()-1].Time), records[records.size()-1]);
    // Test TA
    auto ema = TA.EMA(records, 20);
    Log("EMA最后几组", ema[ema.size()-1], ema[ema.size()-2], ema[ema.size()-3]);
    
    auto macd = talib.MACD(records);
    Log("MACD最后几组", macd[0][macd[0].size()-1], macd[1][macd[1].size()-1], macd[2][macd[2].size()-1]);
        
    //SetErrorFilter("timeout");
    Log(GetOS(), GetPid(), GetLastError(), "MD5", MD5("hello"));
    Log("Hash", Hash("md5", "hex", "hello"), Hash("sha512", "base64", "hello"));
    Log("HMAC", HMAC("sha512", "base64", "hello", "pass"));
    Log(Version(), Unix(), UnixNano());
    Log("Start Test Chart");
    Chart c = Chart(R"EOF({"chart":{"type":"line"},"title":{"text":"简单图表"},"xAxis":{"title":{"text":"Date"}},"yAxis":{"title":{"text":"Number"}},"series":[{"name":"number","data":[]}]})EOF");
    c.reset();
    for (size_t i = 0; i < 10; i++) {
        c.add(0, {(Unix() + i)*1000, rand() % 100});
    }
    Log(exchange.GetName(), exchange.GetLabel(), exchanges.size());
    auto acc = exchange.GetAccount();
    if (acc.Valid) {
        Log(acc);
    }
    
    // 用LogStatus结合json画一个表格, 自带的json库很强大, 可参考:  https://github.com/nlohmann/json
    json tbl = R"({"type" : "table", "title" : "AAA", "cols" : ["Head1", "Head2"], "rows": []})"_json;
    tbl["rows"].push_back({"111", "222"});
    tbl["rows"].push_back({"col2", "col22"});
    LogStatus("`"+tbl.dump()+"`");
    
    auto ticker = exchange.GetTicker();
    if (ticker.Valid) {
        Log(ticker);
        Log(ticker.Info); // Info结构直接是json对像
    }
    
    auto d = exchange.GetDepth();
    if (d.Valid) {
        Log(d.Asks[0], d.Bids[0]);
    }
    // 测试期货
    if (exchange.GetName() == "Futures_OKCoin") {
        exchange.SetContractType("this_week");
        exchange.SetMarginLevel(20);
        exchange.SetDirection("closebuy");
            
        auto positions = exchange.GetPosition();
        if (positions.Valid) {
            Log(positions);
        }
    }
    // 测试其它库
    Log("HttpQuery", HttpQuery("http://www.baidu.com/404").size());
    auto obj = json::parse(HttpQuery("http://www.baidu.com/404", "", "", "", true));
    string body = obj["Body"];
    Log("HttpQuery", body.size(), obj["Header"].dump());
    Log(Mail("smtp://smtp.163.com", "test@163.com", "password", "admin@163.com", "title", "test c++ email"));
    // Test Dial
    auto client = Dial("tcp://www.baidu.com:80");
    if (client.Valid) {
        client.write("GET / HTTP/1.1\nHost: www.baidu.com\nConnection: Close\n\n");
        while (true) {
            string buf = client.read();
            if (buf == "") {
                break;
            }
            Log("Dial receive", buf.size());
        }
        client.close();
    }

    _G("OK","xxx");
    Log(_G("OK"));
    _G("OK","yyyyyy");
    Log(_G("OK"));
    _G("OK",NULL);
    Log(_G("OK"));
    
    // 测试商品期货 
    if (exchange.GetName() == "Futures_CTP") {
        // C++ IO返回的是一个json对象
        exchange.IO("mode", 0);
        vector<string> Symbols = {"MA888", "rb888"};
        for (auto &s : Symbols) {
            // C++ SetContractType 返回的是一个json对象
            Log(s, _C(exchange.SetContractType, s)["InstrumentName"]);
        }
        // 接收到100个tick后退出
        for (size_t i = 0; i < 100; i++) {
            Log(exchange.IO("wait_any"));
        }
    }
}
```

> 策略出处

https://www.fmz.com/strategy/61533

> 更新时间

2018-02-14 11:35:11
