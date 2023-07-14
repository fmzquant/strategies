
> Name

交易对精度标定

> Author

斯巴达玩量化





> Source (javascript)

``` javascript
/*
-- 策略引用该模板以后直接用 $.Test() 调用此方法
-- main 函数在策略中不会触发, 只做为模板调试的入口

-- GetExPrecision 函数的精度标定只支持到个位, 暂不支持交易对精度为 十位/百位/千位... 的情况
-- 【警告】若盘口深度较低，不足以精确表达真实精度，则函数有可能失去准确性
*/

let gCache = {};

let scientificToNumber = function(num) {
    if (/\d+\.?\d*e[\+\-]*\d+/i.test(num)) { //正则匹配科学计数法的数字
        var zero = '0', //
            parts = String(num).toLowerCase().split('e'), //拆分成系数和指数
            e = parts.pop(), //存储指数
            l = Math.abs(e), //取绝对值，l-1就是0的个数
            sign = e / l, //判断正负
            coeff_array = parts[0].split('.'); //将系数按照小数点拆分
        if (sign === -1) { //如果是小数
            num = zero + '.' + new Array(l).join(zero) + coeff_array.join(''); //拼接字符串，如果是小数，拼接0和小数点
        } else {
            var dec = coeff_array[1];
            if (dec) l = l - dec.length; //如果是整数，将整数除第一位之外的非零数字计入位数，相应的减少0的个数
            num = coeff_array.join('') + new Array(l + 1).join(zero); //拼接字符串，如果是整数，不需要拼接小数点
        }
    }
    return num;
}

$.GetPrecision = function(depth) {
    let maxLenAmt = 0;
    let maxLenPrice = 0;
    depth.Asks.forEach(function(ask) {
        let price = scientificToNumber(ask["Price"]).toString();
        if (price.indexOf('.') > -1) {
            let priceP = price.split(".")[1].length;
            if (priceP > maxLenPrice) {
                maxLenPrice = priceP;
            }
        }
        let amt = scientificToNumber(ask["Amount"]).toString();
        if (amt.indexOf('.') > -1) {
            let amtP = amt.split(".")[1].length;
            if (amtP > maxLenAmt) {
                maxLenAmt = amtP;
            }
        }
    })
    return [maxLenPrice, maxLenAmt];
}

// 返回数组 [价格的精度大小, 数量的精度大小]
$.GetExPrecision = function(ex, force) {
    if (IsVirtual()) {
        return null;
    }
    let key = ex.GetName() + '_ex_precision_' + ex.GetCurrency();
    let cache = gCache[key];
    if (!force && cache) {
        return cache;
    }
    let r = $.GetPrecision(_C(ex.GetDepth));
    gCache[key] = r;
    Log("缓存精度信息至本地", key, r);
    return r;
}

function main() {
    $.GetExPrecision(exchange, false);
}
```

> Detail

https://www.fmz.com/strategy/372101

> Last Modified

2022-09-23 16:16:20
