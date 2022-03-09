
> 策略名称

获取币安usdt合约全币种名称

> 策略作者

无忧网格

> 策略描述

1，放入FMZ调试工具，可以直接运行
2，获取币安usdt合约全币种名称及个数



> 源码 (javascript)

``` javascript
function unique (str) {
	var arr = str.split(',');
	return Array.from(new Set(arr)).join(',')
}

function main() {
    var exchange_info = JSON.parse(HttpQuery('https://fapi.binance.com/fapi/v1/exchangeInfo'));
    //Log(exchange_info.symbols);
    var str = '';
    exchange_info.symbols.forEach(function(exitem, index) {
        if (exitem.symbol.indexOf('USDT') == -1) {return}
        if (exitem.symbol.indexOf('BTCST') !== -1) {return}
        if (exitem.symbol.indexOf('BTCDOM') !== -1) {return}
        var content = ',';
        if (index == exchange_info.symbols.length - 1) {
            content = '';
        }
        str += exitem.baseAsset + content;
    });
    Log(unique(str))
	Log(unique(str).split(',').length)
    //return unique(str);
}

```

> 策略出处

https://www.fmz.com/strategy/327743

> 更新时间

2021-11-04 03:25:30
