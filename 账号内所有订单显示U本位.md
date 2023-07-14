
> Name

账号内所有订单显示U本位

> Author

高频量化





> Source (javascript)

``` javascript
function main() {
    //exchange.SetContractType("swap"); // 设置为永续合约，注意币本位和USDT本位都存在永续
    const binanceFundingRate = {//持仓单数组
        type: 'table',
        title: '币安U本位持仓单',
        cols: ['交易对', '交易方向 ', '开仓量', '开仓价格', '持仓价值','杠杆','占用保证金','持仓盈利'],//列表头
        rows: null //列表数组
    };
        const binanceHangingOrder = {//挂单数组
        type: 'table',
        title: '币安U本位挂单',
        cols: ['交易对', '交易方向','挂单状态', '开仓量', '开仓价格', '挂单价值','订单ID','订单时间'],//列表头
        rows: null //列表数组
    };
    const gateFundingRate = {//个人信息
        type: 'table',
        title: '联系方式',
        cols: ['微信：18826683356', '币安工具出租']
    }
    //循环体
    while (true) {
        binanceFundingRate.rows = []
        binanceHangingOrder.rows = [] //挂单临时数组
        var y = 0 //判断没有改产品也可以
        var yy = 0 //判断没有改产品也可以        
        var exchangeInfo = HttpQuery('https://fapi.binance.com/fapi/v1/exchangeInfo');//如果不能访问，可以通过设置产品池的方式解决
        exchangeInfo = JSON.parse(exchangeInfo) //处理json文件
        for (var i = 0; i < exchangeInfo.symbols.length; i++) {
            var bas = exchangeInfo.symbols[i];
            var symbols1 = bas.baseAsset + "_" + bas.quoteAsset //合成产品名
            var symbolstr = String(symbols1) //强制字符串
            if (symbolstr == "BTCST_USDT") continue //不知道为什么就是多了一个已经没有的产品给
            exchange.SetCurrency(symbolstr) //切换产品
            if(exchangeInfo.symbols[i].contractType=="NEXT_QUARTER"){//下季度
                exchange.SetContractType("next_quarter")
            }else if(exchangeInfo.symbols[i].contractType=="CURRENT_QUARTER"){//当前季度
                exchange.SetContractType("quarter")
            }else if(exchangeInfo.symbols[i].contractType=="PERPETUAL"){//永续
                exchange.SetContractType("swap")
            }else {
                Log("产品过期",symbolstr)              
            }
            let depth = exchange.GetDepth(); //获取行情数据，如果没有改产品，那么就获取不到该行情数据
            if (!depth) {
                Log("该产品不存在：", symbolstr, "或者产品列表格式不对") // 测试时使用
                continue; //没有获得该产品的行情
            }
            //-------------------------------------------------------
            var position = exchange.GetPosition() //获取账号持仓情况
            //币本位不一样的跨期合约放在一个数组。永续与之不一样
            var positionLength = position.length
            if (positionLength > 0) {
            for(var iii= 0;iii <positionLength;iii++){
                if(exchange.GetContractType()==position[iii].ContractType){//为什么要判断，因为跨期合约的持仓，都放在一起了
                binanceFundingRate.rows[y] = [position[iii].Info.symbol, position[iii].Type==0?"BUY":"SELL", position[iii].Amount, 
                                             position[iii].Price, position[iii].Amount* position[iii].Price,
                                             position[iii].MarginLevel,position[iii].Margin,position[iii].Profit]
                y = y + 1
                }
            }
            } //存在该产品，否则弹数组错误 
            //-------------------------------------------------------
             var GetOrder=  exchange.GetOrders() //获取账号该产品的挂单情况
             //币本位不一样的跨期合约不放在一个数组。永续与之不一样
             var GetOrderLength = GetOrder.length
             if (GetOrderLength > 0) {
                 //循环订单
                 for(var ii = 0;ii <GetOrderLength;ii++ ){
                     binanceHangingOrder.rows[yy]=[
                                             GetOrder[ii].Info.symbol,GetOrder[ii].Info.side,GetOrder[ii].Info.type,GetOrder[ii].Amount, 
                                             GetOrder[ii].Price, GetOrder[ii].Amount* GetOrder[ii].Price,
                                             GetOrder[ii].Id,_D(GetOrder[ii].Info.time)]
                  yy = yy + 1 
                 }
             }
        }
        //binanceFundingRate.rows = binanceFundingRaterows
        //binanceHangingOrder.rows = binanceFundingRaterowsOrder
        //Log("binanceFundingRate.rows", binanceFundingRate.rows)
        LogStatus('\n`' + JSON.stringify([binanceFundingRate,binanceHangingOrder, gateFundingRate]) + '`\n'); //栏目框展示
        Sleep(1000*10); //一分钟   
    }
}
```

> Detail

https://www.fmz.com/strategy/335519

> Last Modified

2021-12-17 23:22:30
