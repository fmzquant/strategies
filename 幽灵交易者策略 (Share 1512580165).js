/*
策略出处: https://www.botvs.com/strategy/62303
策略名称: 幽灵交易者策略 (Share 1512580165)
策略作者: ellajella-0378
策略描述:

#### 前言
正如幽灵交易者的名字，该策略的核心思路是，在真实下单交易之前，先虚拟出一个交易，如果这个虚拟的交易是亏损的，那么下一次才启动真实的交易。

.

#### 策略简介
* 该策略思路源自于交易者的观察，交易者从自己的交易记录中发现，如果上一次交易是盈利的，那么下一次交易亏损的概率比较大。因此在设计策略时，人为的控制了这些可能会亏损的交易。

* 具体在策略中，我们将引入虚拟交易和与之对应的真实下单模块。也就是说，虚拟交易一直在运行，而真实下单模块直到上一笔虚拟交易是亏损的，并且达到指定的交易条件的情况下才执行。

.

#### 策略原始需求
* K线数据
![此处输入图片的描述][1]

* 短期指数平均线
* 长期指数平均线
![此处输入图片的描述][2]

* RSI 指标
![此处输入图片的描述][3]

* 唐奇安通道
![此处输入图片的描述][4]

.

#### 入场条件
* 多头开仓：如果当前没有持仓，并且上次虚拟交易时发生过一次亏损，并且短期均线在长期均线之上，并且 RSI 低于超卖值，并且价格创新高。
* 空头开仓：如果当前没有持仓，并且上次虚拟交易时发生过一次亏损，并且短期均线在长期均线之下，并且 RSI 高于超买值，并且价格创新低。

.

#### 出场条件
* 多头平仓：如果当前持有多单，并且价格下破唐奇安通道下轨。
* 空头平仓：如果当前持有空单，并且价格上破唐奇安通道上轨。

.

#### 回测绩效
![此处输入图片的描述][5]

.

#### 策略进阶
* 改变出场方式
* 本策略是通过唐奇安通道上下轨进行止损出场的，也可以采用最大浮动亏损百分比进行止损。
* 改变入场方式
* 本策略每次真实入场前是基于前一次的虚拟盈亏，也可以考虑设置多次虚拟盈亏结果决定是否入场。

.

#### 策略特点
* 该策略中的亮点是虚拟交易与实盘交易完全隔离，当虚拟交易亏损后，实盘交易才入场。

* 将均线与 RSI 相结合，这是区别以往策略的又一亮点，即当行情进入超卖区不做空，当行情进入超买区不做多。

.

#### 特别提示
市场唯一不变的就是一直在变，并且未来不可预测，过去的回测结果并不代表未来。



  [1]: https://dn-filebox.qbox.me/75ce917bea3ca3131c13e718539cb45972942565.png
  [2]: https://dn-filebox.qbox.me/b70fb37d684b32135ad8e3b6f0827230e5ca3ce7.png
  [3]: https://dn-filebox.qbox.me/dfe151d32bd350c5713bf39b7f7940361eee1e40.png
  [4]: https://dn-filebox.qbox.me/236fb56dc1ad9119cc38350270710ec6591cb2ba.png
  [5]: https://dn-filebox.qbox.me/e5dc7e6c903d0a0b43f04483e0ac0607a1212eb3.png


参数            默认值          描述
------------  -----------  -----
contractType  rb000/rb888  合约类型
fastLength    25           短期均线
slowLength    100          长期均线
rsiLength     15           RSI周期
Donchian      20           唐奇安周期
*/

/*backtest
start: 2017-01-01 09:00:00
end: 2017-11-27 15:00:00
period: 1h
*/

var into = 0; // 入场价格
var out = 0; // 出场价格
var myPosition = 0; // 虚拟持仓
var myProfit = 0; // 虚拟利润
var uu = 30; // 超卖
var nn = 70; // 超买

// 语法固定格式，调用main主函数
function main() {
    // 调用商品期货交易类库中的CTA框架
    $.CTA(contractType, function(st) {
        var mp = st.position.amount;
        
        //获取K线数组
        var j = st.records;
        //指标运算参考的最大K线数量
        if (j.length < Math.max(fastLength, slowLength, rsiLength)) {
            return
        }
        var h0 = j[j.length - 1].High;
        var h1 = j[j.length - 2].High;
        var l0 = j[j.length - 1].Low;
        var l1 = j[j.length - 2].Low;
        var o0 = j[j.length - 1].Open;
        var c0 = j[j.length - 1].Close;

        //短期指数平均线数组和长期指数平均线数组
        var fastMas = talib.MA(j, fastLength);
        var slowMas = talib.MA(j, slowLength);
        var fastMa1 = fastMas[fastMas.length - 2];
        var slowMa1 = slowMas[slowMas.length - 2];

        //获取RSI数组
        var rsis = talib.RSI(j, rsiLength);
        var rsi1 = rsis[rsis.length - 2];

        //获取唐奇安通道
        var highest = TA.Highest(j, Donchian, "High");
        var lowest = TA.Lowest(j, Donchian, "Low");

        // 平多
        if (l0 <= lowest) {
            if (myPosition > 0) {
                out = Math.min(o0, lowest);
                myProfit = into - out;
                myPosition = 0;
            }
            if (mp > 0) {
                return -1;
            }
        }

        // 平空
        if (h0 >= highest) {
            if (myPosition < 0) {
                out = Math.max(o0, highest);
                myProfit = into - out;
                myPosition = 0;
            }
            if (mp < 0) {
                return 1;
            }
        }

        // 开多
        if (fastMa1 > slowMa1 && rsi1 < nn && h0 >= h1) {
            if (myPosition === 0) {
                into = Math.max(o0, h1);
                myPosition = 1;
            }
            if (myProfit < 0 && mp < 1) {
                return 1;
            }
        }

        // 开空
        if (fastMa1 < slowMa1 && rsi1 > uu && l0 <= l1) {
            if (myPosition === 0) {
                into = Math.min(o0, l1);
                myPosition = -1;
            }
            if (myProfit < 0 && mp > -1) {
                return -1;
            }
        }

    });
}
