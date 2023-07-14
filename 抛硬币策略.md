
> Name

抛硬币策略

> Author

扁豆子

> Strategy Description

完全的T神公众号, 吕神特约策略翻译.
下面是转载内容,
请多多关注"千千的量化世界" 获取更多策略源码!!
另外也给自己个广告~
公众号"扁豆子的量化日志" 
给大家每日公开处刑在线量化破产~
更有多项福利更你来拿~

--------

用好波动率，跑赢BTC大盘就这么简单！
原创 吕洋洋 千千的量化世界 3天前
“ 量化策略的研发其实是个两面性，对于刚刚入门的人来说很难很难，难得不光是“术”层面的代码，同样难的也是“略”层面的策略逻辑思维。两者皆为重要，万万不可偏颇。”





各位千千量化的小伙伴们大家好！！！



本篇是特邀稿第二期，千千很荣幸地邀请到吕洋洋大神（微信号LE_CHIFFRE1）为大家介绍：如何利用波动率因子轻松跑赢BTC大盘，实现“降维打击”！

吕神来自传统量投机构，曾经也深度参与过币圈交易所业务，在量化领域有丰富的经验和独特的见解。吕神这期内容涵盖思路启示、编码实现和个人体悟等等，不可谓不是干货满满，千千自己看完也感到获益匪浅，真的是非常佩服和感谢吕神，强烈推荐大家研读细品！

下面掌声有请吕神为大家介绍波动率策略。


01

—



引言



大家好，今天有幸在“千千的量化”公众号推送文章，同时也要感谢T老板（千千的外号之一）的邀请。第一次给T老板写文章，完全的自由发挥，借用工作后的闲余时间，质量和错误也请大家文中指正和包含，谢谢大家。
 

T老板说写个量化的，又没有给什么范围，着实不知道从哪里写起。那就从自己最喜欢与他人讨论的话题入手吧。量化指标与策略（即可辅助也可自动化），当然了，最后咱们还要加上一句老生常谈的话：“投资有风险，入市需谨慎”，策略只是给大家提供思路和借鉴，盈亏自负。一切使用本策略的盈亏与我本人和“千千的量化世界”公众号主体无任何关系。


免责声明说完了，下面就开始正题。




02

—



一个简单的波动率策略





熟悉我的人其实都知道，从我个人来说，我不是很喜欢阿尔法那种玩法，相对来说我更信贝塔，更多的去研究贝塔。至于为什么，e………mmmmm，不知道咋回答了~~，大家自行脑补吧。如果感兴趣的话大家可以私信、留言给该公众号的作者，逻辑鲜明有特色的，作者本人将发一个小红包给大家。

量化策略的研发其实是个两面性，对于刚刚入门的人来说很难很难，难得不光是“术”层面的代码，同样难的也是“略”层面的策略逻辑思维。两者皆为重要，万万不可偏颇。今天给大家介绍的策略其实是很多年前来自华泰一个研报的启发，大家看仔细只是启发哦~~，之所以这么说是因为该策略逻辑已经完全不是研报中所提及的内容，具体研报大家私聊T大佬。

该策略算法采用对数价格一定周期涨跌幅的滚动收益率波动原理，根据该波动区间计算一定周期滚动最高值与最小值的寻找，最高值作为上管道，最小值作为下管道，突破上管道，开仓。上下管道滚动平均值作为平仓线。（此处敲黑板！）

具体图形可视化界面可参考下面的PPT。该图形是本人用Pyecharts所画，具体代码也请私聊T大佬。

 ![IMG](https://www.fmz.com/upload/asset/95f6e8b8196998728de6.png) 



其实该策略是本人之前做宽基ETF所用的策略，当然也用于指数择时进行股票买卖，后来直接挪到币圈，惊愕发现真的降维打击，参数都不用变。



 ![IMG](https://www.fmz.com/upload/asset/95c0d34f79df83ec85c5.png) 





下图所示是当年回测的绩效，具体的部分代码逻辑截图如下：


 ![IMG](https://www.fmz.com/upload/asset/951f56f73aeb0da6ffa1.png) 




上面其实就是读取数据后，通过pandas进行指标数据计算。


 ![IMG](https://www.fmz.com/upload/asset/951a76802f3a22a6da7c.png) 




计算完毕后，可通过pd.to_csv()函数进行数据输出和上面截图中所用到的pyecharts进行可视化输出（注：本人用的是老版本的pyecharts）。



具体所有的策略、可视化、以及绩效指标代码还是私聊T大佬。




03

—

漫谈量化



接下来我主要讲的两点。第一：有人很多疑问或者说你们这些人为什么可以公布实盘的策略，是假的骗子吗？还是说真的普度众生？哈哈~~ 。首先，好的策略是不怕公开的，这又不是什么战争级别对抗的武器开发，会决定生死的东西，所以本人和其他一些机构或者说个人，也不怕所谓的什么策略秘密，因为在我看来CTA没有秘密。只不过是每个人想到的和没想到的点子而已罢了。其次，这个版本是本人最老的版本，在此基础上面做了几个版本的升级，比如说加入了其他的条件判断和止盈止损等等，当然也包括了别的品种别的周期的参数调整等等。



第二：很多人不论是新手还是已经入门甚至包括老玩家，都是需要灵感来源的，包括股票的因子挖掘，择时策略的思路等等，这些往往来源主观经验，研报，圈内的沟通交流等等，不排除现在市面上一些买来的策略然后进行阅读和理解，根据自身的风险承受能力和具体需求在进行改版等。



最后总结一下，量化本来是个舶来品，程序化交易属于量化内的子集，早在本人大学时候（2009年左右）那时候TB 、金字塔等程序化就有人涉猎了，如果持续做到今天，可以说这部分最早先知先觉的人已经有10个年头了，其中还不包括那些从华尔街“带回来”的高频策略和系统的人。因此，量化策略或者说程序化策略在中国已经持续了一段时间，但是在目前市场份额和参与主体，以及政策支持来讲，量化依然是很小众的一部分存在，尽管多因子分析和策略建模的研报满天飞。有的人喜欢无脑的逻辑拿这个跟美国去比较，认为中国量化未来发展大趋势会跟美国一样，爆发式增长等等。但是，这不是瑞幸“咖啡与小罐茶”的商业逻辑，中国有中国的特色，未来的道路依然荆棘与坎坷。因此，我们也聚拢了广大的机构和个人投资者的圈子，希望大家可以共同结识交流与成长，为这个行业做出一份小小的贡献与付出。



最后感谢“千千的量化”公众号对于本人专业的信任以及文章邀请。大家有什么具体代码和策略问题，请私信我本人或T大佬，我也在T大佬的群里。





最后再次感谢吕神的精彩讲解！

还没有加入量化讨论群的朋友们速来加群领取学习资料哦！！！

千千本尊镇楼！


 ![IMG](https://www.fmz.com/upload/asset/9576f0337a4b9144925e.png) 



微信扫一扫
关注该公众号

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|tp_first|0.03|tp_first|
|trailing_tp|0.01|trailing_tp|
|st|0.05|st|


> Source (javascript)

``` javascript
/*backtest
start: 2020-01-20 00:00:00
end: 2021-01-19 23:59:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_BitMEX","currency":"XBT_USD","fee":[0.008,0.1]}]
args: [["st",0.1]]
*/

// 初始化
exchange.SetContractType('XBTUSD')
_CDelay(100)
// 止盈止损
var TP_status = false // 是否触发追踪止盈 
var TP_HH = 0
var TP_LL = 0
var B = 1

// 获取交易所信息
function UpdateInfo() {
    account = exchange.GetAccount()
    pos = exchange.GetPosition()
    records = exchange.GetRecords()
    ticker = exchange.GetTicker()
}

// 定制本次盈亏
function Onept() {
    // 更新用户信息
    UpdateInfo()
    // 如果现在余额 大于 之前的余额, 那么 盈利次数+1, 且pt_1设为现在余额
    if (account.Stocks - pt_1 > 0) {
        pt_times = pt_times + 1
        Log('这回赚钱啦~~~~ (＾Ｕ＾)ノ~ＹＯ', account.Stocks - pt_1)
        B = 1
        pt_1 = account.Stocks
    }
    // 如果现在余额 小于 之前的余额, 那么 亏损次数+1, 且pt_1设为现在余额
    if (account.Stocks - pt_1 < 0) {
        st_times = st_times + 1
        Log('这回亏掉了.... /(ㄒoㄒ)/~~', account.Stocks - pt_1)
        B = B * 1.618
        pt_1 = account.Stocks
    }
}

// 画线
function PlotMA_Kline(records) {
    $.PlotRecords(records, "K")
}

// 追踪止盈 初始%, 追踪U
function TP() {
    var TP_first_long = pos[0].Price + tp_first * ticker.Last
    var TP_trailing_long = TP_HH - trailing_tp * ticker.Last
    var TP_first_short = pos[0].Price - tp_first * ticker.Last
    var TP_trailing_short = TP_LL + trailing_tp * ticker.Last
    // 当多仓时, 现价大于开仓+初始止赢价 -> 触发追踪止盈 
    if ((pos[0].Type == 0) && (ticker.Last > TP_first_long)) {
        // Log('当多仓时, 现价大于开仓+初始止赢价 -> 触发追踪止盈', TP_HH)
        TP_status = true
        // 触发追踪止盈, 未初始化开仓最大价格 -> 开仓后最大价格更新为现价
        if (TP_status === true && TP_HH == 0) {
            Log('触发追踪止盈, 未初始化开仓最大价格 -> 开仓后最大价格更新为现价', TP_HH)
            TP_HH = ticker.Last
        }
        // 触发追踪止盈, 已有开仓后最大价格, 现价大于开仓后最大价格 -> 开仓后最大价格更新为现价
        else if (TP_status === true && TP_HH != 0 && ticker.Last > TP_HH) {
            Log('触发追踪止盈, 已有开仓后最大价格, 现价大于开仓后最大价格 -> 开仓后最大价格更新为现价', TP_HH)
            TP_HH = ticker.Last
        }
        // 触发追踪止盈, 已有开仓后最大价格, 现价小于 (开仓后最大价格减 - 回撤USD) -> 开空平仓止盈
        else if (TP_status === true && TP_HH != 0 && ticker.Last < TP_trailing_long) {
            Log('触发追踪止盈, 已有开仓后最大价格, 现价小于 (开仓后最大价格减 - 回撤USD) -> 开空平仓止盈', TP_HH)
            exchange.SetDirection("closebuy")
            exchange.Sell(ticker.Buy, pos[0].Amount, "在" + ticker.Last + "止赢平多仓!! 开仓价格: " + pos[0].Price + "数量: " + pos[0].Amount)
            $.PlotFlag(new Date().getTime(), 'Sell', 'PT_BK' + ticker.Sell)
            Onept()
            TP_status = false
            TP_HH = 0
        }
    }
    // 当空仓时, 现价小于开仓-初始止赢价 -> 触发追踪止盈
    else if ((pos[0].Type == 1) && (ticker.Last < TP_first_short)) {
        // Log('当空仓时, 现价小于开仓-初始止赢价 -> 触发追踪止盈', TP_LL)
        TP_status = true
        // 触发追踪止盈, 未初始化开仓最大价格 -> 开仓后最小价格更新为现价
        if (TP_status === true && TP_LL == 0) {
            Log('触发追踪止盈, 未初始化开仓最大价格 -> 开仓后最小价格更新为现价', TP_LL)
            TP_LL = ticker.Last
        }
        // 触发追踪止盈, 已有开仓后最小价格, 现价小于开仓后最小价格 -> 开仓后最小价格更新为现价
        else if (TP_status === true && TP_LL != 0 && ticker.Last < TP_LL) {
            Log('触发追踪止盈, 已有开仓后最小价格, 现价小于开仓后最小价格 -> 开仓后最小价格更新为现价', TP_LL)
            TP_LL = ticker.Last
        }
        // 触发追踪止盈, 已有开仓后最小价格, 现价大于 (开仓后最小价格减 + 回撤USD) -> 开多平仓止盈
        else if (TP_status === true && TP_LL != 0 && ticker.Last > TP_trailing_short) {
            Log('触发追踪止盈, 已有开仓后最小价格, 现价大于 (开仓后最小价格减 + 回撤USD) -> 开多平仓止盈', TP_LL)
            exchange.SetDirection("closesell")
            exchange.Buy(ticker.Sell, pos[0].Amount, "在" + ticker.Last + "止赢平空仓!! 开仓价格: " + pos[0].Price + "数量: " + pos[0].Amount)
            $.PlotFlag(new Date().getTime(), 'Buy', 'PT_SK' + ticker.Sell)
            Onept()
            TP_status = false
            TP_LL = 0
        }
    }
}

// 止损 %
function Stoploss() {
    // 当多仓时, 现价小于开仓-止损价, 做空平多
    if ((pos[0].Type == 0) && (ticker.Last < pos[0].Price - st * ticker.Last)) {
        Log('当多仓时, 现价小于开仓-止损价, 做空平多')
        exchange.SetDirection("closebuy")
        exchange.Sell(ticker.Buy, pos[0].Amount, "在" + ticker.Last + "止损平多仓!! 开仓价格: " + pos[0].Price + "数量: " + pos[0].Amount)
        $.PlotFlag(new Date().getTime(), 'Sell', 'ST_BK' + ticker.Buy)
        Onept()
    }
    // 当空仓时, 现价大于开仓+止损价, 做多平空
    else if ((pos[0].Type == 1) && (ticker.Last > pos[0].Price + st * ticker.Last)) {
        Log('当空仓时, 现价大于开仓+止损价, 做多平空')
        exchange.SetDirection("closesell")
        exchange.Buy(ticker.Sell, pos[0].Amount, "在" + ticker.Last + "止损平空仓!! 开仓价格: " + pos[0].Price + "数量: " + pos[0].Amount)
        $.PlotFlag(new Date().getTime(), 'Buy', 'ST_SK' + ticker.Sell)
        Onept()
    }
}

// 计算凯利公式 仓位
function PriceAmount() {
    // 赢可以赢多少 
    y = tp_first
    // 输会输多少 
    s = st
    //赔率
    b = y / s
    // 赢的概率
    if (total_times < 10) {
        p = 0.382
    } else {
        p = pt_times / total_times
    }
    // 输的概率
    q = 1 - p
    // 凯莉公式
    f = (b * p - q) / b
    // 限制B最大值
    if (B > 16.18) {
        B = 16.18
    }
    //Amount = _N(Math.abs(f) * account.Stocks * ticker.Last * B, 0)
    Amount = _N(0.618 * account.Stocks * ticker.Last, 0)
    //Log(Amount)
}

// 交易逻辑
function onTick() {
    // 获取均匀分布 0-9 随机数
    ToTheMoon = Math.floor(Math.random() * 10)
    // 无仓位时
    if (pos.length == 0) {
        // Long 
        if (ToTheMoon > 5) {
            exchange.SetDirection("buy")
            exchange.Buy(ticker.Sell, Amount)
            $.PlotFlag(new Date().getTime(), 'Buy', 'BK' + ticker.Sell)
            total_times = total_times + 1
        }
        // Short 
        if (ToTheMoon < 4) {
            exchange.SetDirection("sell")
            exchange.Sell(ticker.Buy, Amount)
            $.PlotFlag(new Date().getTime(), 'Sell', 'SK' + ticker.Buy)
            total_times = total_times + 1
        }
    }
        // 多仓时
    if (pos.length > 0 && pos[0].Type == 0) {
        // 平多 
        if (ToTheMoon < 1) {
            exchange.SetDirection("closebuy")
            exchange.Sell(ticker.Buy, pos[0].Amount)
            $.PlotFlag(new Date().getTime(), 'Sell', 'PBK')
            Onept()
        }
    }
    // 空仓时
    if (pos.length > 0 && pos[0].Type == 1) {
        // 平空 
        if (ToTheMoon > 8) {
            exchange.SetDirection("closesell")
            exchange.Buy(ticker.Sell, pos[0].Amount)
            $.PlotFlag(new Date().getTime(), 'Buy', 'PSK')
            Onept()
        }
    }
}


function main() {
    UpdateInfo()
    // 统计
    pt_1 = account.Stocks
    total_times = 0
    pt_times = 0
    st_times = 0
    while (1) {
        UpdateInfo()
        PriceAmount()
        onTick()
        PlotMA_Kline(records)
        if (pos.length > 0) {
            TP()
        }
        if (pos.length > 0) {
            Stoploss()
        }
        LogStatus("总余额: " + _N(ticker.Last * account.Stocks, 2), " 下单量: " + Amount, " 下单倍数: " + B, " ToTheMoon: " + ToTheMoon, " 下单量比: " + _N(Amount * 100 / _N(ticker.Last * account.Stocks, 2), 2), "% 胜率: " + _N(p * 100, 2), "%", total_times, pos)
    }
}
```

> Detail

https://www.fmz.com/strategy/201007

> Last Modified

2021-01-21 18:16:19
