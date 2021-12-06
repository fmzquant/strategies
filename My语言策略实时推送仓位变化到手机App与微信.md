
> 策略名称

My语言策略实时推送仓位变化到手机App与微信

> 策略作者

程文

> 策略描述

### 一、摘要
随着量化交易策略的不断完善，用户对于持仓变化的实时推送要求也越来越高，比如：Web在线日志、手机App、微信等，都需要将账户持仓发生的变化实时地、主动地传送到浏览器、手机等等。为此本文针对发明者量化(FMZ.CN)My语言策略，来实现将仓位实时推送到手机App和微信。

### 二、演示交易策略
为了便于演示，本文将引用之前的威廉W%R交易策略，策略链接地址为：https://www.fmz.cn/digest-topic/7219 该策略逻辑由威廉值和均线共同组成，完整的策略和回测配置，可以点击该链接获取，下面是这个策略的代码：
```
HC := HHV(HIGH, 14) - CLOSE;
HL := HHV(HIGH, 14) - LLV(LOW, 14);
WR := -100 * HC / HL;
MA20 : EMA2(C, 14);
C1 := WR < -60 && C > MA20;
C2 := WR > -15 && C < MA20;
C1, BPK;
C2, SPK;
```

### 三、My语言语言增强
发明者量化(FMZ.CN)的My语言是JavaScript语言的进一步封装，旨在帮助量化初学者更好的入门，My语言有语法简洁的特点，可以应付一些简单的策略逻辑，但面对一些复杂的策略就会捉襟见肘。为此发明者量化在My语言的基础之上，推出了语言增强功能。如下面的代码例子：
```
%%
// 这里面可以调用发明者量化的任何API 
scope.TEST = function(obj) {
    return obj.val * 100;
}
%% 
收盘价:C;
收盘价放大100倍:TEST(C);
上一个收盘价放大100倍:TEST(REF(C, 1)); // 鼠标移动到回测的K线上就会提示变量值
```
如上面的代码所示，语言增强功能可以让My语言与JavaScript语言混合编程。

其中：

**1、scope对象**
scope对象，可以添加属性，并赋值匿名函数给属性。在麦语言代码部分就可以调用这个属性引用的匿名函数。

**2、scope.get_locals('name')**
该函数可以获取My语言的变量，从而实现My语言和JavaScript语言实现交互。

### 四、推送仓位变化
在My语言策略中，BKVOL函数可以获取买开信号手数，也就是当前的多头持仓。SKVOL函数可以获取卖开信号手数，也就是当前的空头持仓。那么我们通过BKVOL减去SKVOL，就可以计算出当前仓位变化状态。如下面的代码所示：
```
HC := HHV(HIGH, 14) - CLOSE;
HL := HHV(HIGH, 14) - LLV(LOW, 14);
WR := -100 * HC / HL;
MA20 : EMA2(C, 14);
C1 := WR < -60 && C > MA20;
C2 := WR > -15 && C < MA20;
C1, BPK;
C2, SPK;

%%
// 下面代码附加到任何My语言策略最后都可以实现仓位变化推送到手机App与微信
if (typeof(scope._tmp) !== 'number') {
    scope._tmp = 0;
}
var pos = scope.get_locals('BKVOL') - scope.get_locals('SKVOL');
if (pos != scope._tmp) {
   scope._tmp = pos;
   Log('通知仓位变化:', scope.symbol, pos, '@');
}
%%
```

在上面的代码中，我们把威廉W%R交易策略和推送仓位变化功能放在一起，从而实现交易策略下单交易与仓位变化实时同步，并推送到手机App和微信上面。

### 五、实盘测试
接下来我们运行一个实盘验证这个功能，创建实盘选择商品期货，品种设置为橡胶ru2201。

**1、信号触发，web端日志**
 ![IMG](https://www.fmz.cn/upload/asset/230c318d01e4cf7d8a13d.png) 
**2、信号触发，手机App消息推送**
 ![IMG](https://www.fmz.cn/upload/asset/231b1ceac094067b4c575.png) 
**3、信号触发，微信信息推送**
 ![IMG](https://www.fmz.cn/upload/asset/230fb050a27bf44ad3388.png) 
 
### 六、总结
以上我们通过一个简单的My语言威廉W%R交易策略，配合My语言中的语言增强模块所开发的消息推送模块，从而实现策略实时推送仓位变化到手机App与微信。该模块代码可以附加到任何My语言策略中，实现仓位变化推送到手机App与微信，并且针对不同的场景推出多种推送类型，满足您的个性化推送需求。




> 源码 (麦语言)

``` pascal
HC := HHV(HIGH, 14) - CLOSE;
HL := HHV(HIGH, 14) - LLV(LOW, 14);
WR := -100 * HC / HL;
MA20 : EMA2(C, 14);
C1 := WR < -60 && C > MA20;
C2 := WR > -15 && C < MA20;
C1, BPK;
C2, SPK;

%%
// 下面代码附加到任何My语言策略最后都可以实现仓位变化推送到手机App与微信
if (typeof(scope._tmp) !== 'number') {
    scope._tmp = 0;
}
var pos = scope.get_locals('BKVOL') - scope.get_locals('SKVOL');
if (pos != scope._tmp) {
   scope._tmp = pos;
   Log('通知仓位变化:', scope.symbol, pos, '@');
}
%%
```

> 策略出处

https://www.fmz.cn/strategy/329988

> 更新时间

2021-11-19 10:25:28
