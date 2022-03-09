
> 策略名称

DMI指标

> 策略作者

独舞

> 策略描述

最近用到了DMI指标，TV上超级简单一行代码搞定的事，我找了又找就是找不到JS版的
没办法自己写吧，对于我这种非专业人士，就这一个指标连写代改用了一天，烦死了。

TraingView 上的DMI指标，只包含DI+ DI-和ADX三条线
完全按照TV上的DMI算法计算，误差非常非常小，数组第一个元素就是当前K线的DMI值



> 源码 (javascript)

``` javascript

//当前值与前值的差异,x[0] - x[length],symbol参数值只能是1或-1
function change(records, length, symbol) {
    if (!records || !length || !Math.abs(symbol) == 1) {
        return;
    }
    //反转数组让最新的数据在数组最开端
    records = records.slice().reverse();
    //将records中的最高价最低价单独录入不同的数组
    var srcHigh = [];
    var srcLow = [];
    for (var i = 0; i < records.length; i++) {
        srcHigh.push(records[i].High);
        srcLow.push(records[i].Low);
    }
    //计算差值数据不足处用NaN填充
    var src = [];
    for (var i = 0; i < records.length; i++) {
        if (i > records.length - 1 - length) {
            src.push(NaN);
        } else {
            if (symbol > 0) {
                src.push((srcHigh[i] - srcHigh[i + length]) * symbol);
            } else {
                src.push((srcLow[i] - srcLow[i + length]) * symbol);
            }
        }
    }
    return src;
}
//真实波动幅度，也可以为TR
function tr(records) {
    if (!records) {
        return;
    }
    //反转数组让最新的数据在数组最开端
    records = records.slice().reverse();
    var high = [];
    var low = [];
    var close = [];
    //将records中的最高价最低价收盘价单独录入不同的数组
    for (var i = 0; i < records.length; i++) {
        high.push(records[i].High);
        low.push(records[i].Low);
        close.push(records[i].Close);
    }
    var src = [];
    //计算tr值数据不足处用NaN填充
    for (var i = 0; i < records.length; i++) {
        if (i > records.length - 2) {
            src.push(NaN);
        } else {
            src.push(Math.max(high[i] - low[i], Math.abs(high[i] - close[i + 1]), Math.abs(low[i] - close[i + 1])));
        }
    }
    return src;
}
//RSI DMI中使用的移动平均线。 它是指数加权移动平均线，alpha加权值 = 1 /长度
function rma(records, length) {
    if (!records || !length) {
        return;
    }
    //反转数组让最新的数据在数组最末端方便计算
    records = records.slice().reverse();
    //alpha加权因子
    var alpha = 1 / length;

    var sum = 0.0;
    var lenNum = 0;
    var src = [];
    //计算ram值数据不足处用NaN填充
    for (var i = 0; i < records.length; i++) {
        if (isNaN(records[i])) {
            src.push(NaN);
            lenNum = i + 1;
        } else if (!isNaN(records[i]) && i < lenNum + length) {
            sum = sum + records[i] / length;
            if (i == lenNum + length - 1) {
                src.push(sum);
            } else {
                src.push(NaN);
            }
        } else {
            sum = alpha * records[i] + (1 - alpha) * src[i - 1];
            src.push(sum);
        }
    }
    return src.slice().reverse();
}
$.DMI = function DMI(records, adxLength, adxSmoothing) {
    if (!records || !adxLength || !adxSmoothing) {
        return;
    }
    var up = change(records, 1, 1);
    var down = change(records, 1, -1);
    var plusDM = [];
    var minusDM = [];
    for (var i = 0; i < records.length; i++) {
        p = isNaN(up[i]) ? NaN : up[i] > down[i] && up[i] > 0 ? up[i] : 0;
        m = isNaN(down[i]) ? NaN : down[i] > up[i] && down[i] > 0 ? down[i] : 0;
        plusDM.push(p);
        minusDM.push(m);
    }
    var trur = rma(tr(records), adxLength);
    var plus = [];
    var minus = [];
    var plusDMrma = rma(plusDM, adxLength);
    var minusDMrma = rma(minusDM, adxLength);
    for (var i = 0; i < records.length; i++) {
        if (i > 0 && (isNaN(plusDMrma[i]) || isNaN(minusDMrma[i]))) {
            plus.push(plus[i - 1]);
            minus.push(minus[i - 1]);
        } else {
            plus.push((plusDMrma[i] * 100) / trur[i]);
            minus.push((minusDMrma[i] * 100) / trur[i]);
        }
    }
    var scr = [];
    var sum = [];
    for (var i = 0; i < records.length; i++) {
        sum.push(plus[i] + minus[i]);
        scr.push(Math.abs(plus[i] - minus[i]) / (sum[i] == 0 ? 1 : sum[i]));
    }
    var adx = [];
    var src2 = rma(scr, adxSmoothing);
    for (var i = 0; i < src2.length; i++) {
        adx.push(100 * src2[i]);
    }
    return [plus, minus, adx];
}
function main() {
    
    exchange.SetCurrency("BTC_USDT");
    exchange.SetContractType("swap");
    
    var records = exchange.GetRecords(PERIOD_M5);
    var ret = DMI(records, 14, 14);

    Log("plus", ret[0].length, ret[0]);
    Log("minus", ret[1].length, ret[1]);
    Log("adx", ret[2].length, ret[2]);
}

```

> 策略出处

https://www.fmz.com/strategy/349804

> 更新时间

2022-03-09 15:58:20
