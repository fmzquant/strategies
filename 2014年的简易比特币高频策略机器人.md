
> Name

2014年的简易比特币高频策略机器人

> Author

小草

> Strategy Description

**策略的介绍**

策略分享地址：
https://www.fmz.com/strategy/1088
这个策略是我做虚拟货币以来的主要策略，后面经过不断完善和修改，复杂了很多，但主要思想并没有改变，分享的这个版本是无明显bug的    最初版本，最为简单清晰，没有仓位管理，每次交易都是满仓，没有卡死后重启等等，但也足够说明问题。
策略从2014年8月运行，直到今年年初交易所收手续费。期间运行的还算很好，亏损的时间很少。资金从最初的200元跑到了80比特币。具体的过程可以看[小草的新浪博客](http://blog.sina.com.cn/u/2389357153)里[虚拟货币自动化交易之路](http://blog.sina.com.cn/s/blog_8e6ab2610102v6sq.html)系列文章。

**为什么分享这个策略**

1.交易所收取手续费后，几乎杀死了所有的高频策略，我的也不例外。但策略改改也许还能用，大家可以研究一下。
2.好久没有分享东西了，这篇文章早就想写了。
3.和大家共同交流学习。

**策略的原理**

这个策略原理极为简单，可以理解为准高频的做市策略，各位看了之后可能想打人，这都能赚钱，当时几乎谁都能写出来。我开始也没预料到它能这么有效，可见心中有想法要赶紧付出实践，说不一定有意外之喜。在比特币机器人初兴的2014年，写出赚钱的策略太容易了。
和所有的高频策略一样，本策略也是基于orderbook,下图就是一个典型的比特币交易所的订单分布， 
 https://dn-filebox.qbox.me/0d8ec18c831404d3d1c19e17299c78017abcfd48.png 
可以看到左侧是买单，显示了不同价格的挂单数量，右侧是卖单。可以想象如果一个人要买入比特币，如果不想挂单等待的话，只能选择吃单，如果他的单子比较多，会使得卖单挂单大量成交，对价格造成冲击，但是这种冲击一般不会一直持续，还有人想吃单卖出，价格在极短时间很可能还会恢复，反过来理解有人要卖币也类似。
以图中的挂单为例，如果要直接买入5个币，那么价格会达到10377，在这时如果有人要直接卖出5个币，价格会达到10348，这个空间就是利润空间.策略会在稍低于10377的价格挂单，如10376.99，同时会以稍高于10348的价格买入，如10348.01，这是如果刚才的情况发生了，显然就会赚到其中的差价。虽然不会每次都如此完美，但在概率的作用下，赚钱的几率实际高得惊人。
以现在策略的参数讲解一下具体操作，这个参数当然无法使用了，仅作一个说明。它会向上寻找累计卖挂单量为8个币的价格，这里是10377，那么此时的卖价就是这个价格减去0.01（减去多少可以是随机的），同理向下寻找累计买挂单为8个币，这里是10348，那么此时的卖价就是10348.01，此时买卖价的差价是10376.99-10348.01=28.98，大于策略预设的差价1.5，就以这两个价格挂单等待成交，如果价差小于1.5，也会找一个价格进行挂单，如盘口价格加减10，等待捡漏（更合适的应该是继续往下找跟多的深度）。

**进一步的说明**

1. 没有钱或币了怎么办？
这种情况在我的钱较少是十分普遍，大多数时候只挂一边的单子，但不是大问题。其实可以加入币钱平衡的逻辑，但在平衡的过程难免产生损失，毕竟每一次的成交都是概率的垂青，我选择保持单边等待成交，当然这样也浪费了另一边的成交机会。
2. 仓位是如何管理的？
刚开始都是满仓买入卖出，后来根据不同的参数分为不同的组，不会一次完全成交。
3. 没有止损吗？
策略有完整的买卖挂单的逻辑，我认为不需要止损（可以讨论），还有就是概率的垂青，成交就是机会，止损可惜了。
4. 如何调整为赚币的策略？
此时的参数是对称的，即向上8个币的累计卖单，向下8个币的累计买单，稍微不平衡一下，比如向上改为15个币的累计卖单，使得卖币机会更难得，有更大的几率会以更低的价格接回来，这样就会赚币，反过来就赚钱。实际上前期策略如此有效，币和钱都是增加的。

**代码讲解**

完整的代码可以见我在www.fmz.com得策略分享，这里只讲解核心逻辑函数。在没有改动的情况下，在botvs自带的模拟盘竟然运转完全正常，这是一个3年多前的策略，平台还支持到现在，太让人感动了。
首先是获取买卖价函数GetPrice()，需要获取订单深度信息，注意不同平台的订单深度信息长度不同，以及即使遍历了所有订单仍然没有所需要的量的情况（在后期许多0.01的网格挂单会导致这种情况），调用是GetPrice('Buy')就是获取买价。
```
function GetPrice(Type) {
   //_C()是平台的容错函数
    var depth=_C(exchange.GetDepth);
    var amountBids=0;
    var amountAsks=0;
    //计算买价，获取累计深度达到预设的价格
    if(Type=="Buy"){
       for(var i=0;i<20;i++){
           amountBids+=depth.Bids[i].Amount;
           //参数floatamountbuy是预设的累计深度
           if (amountBids>floatamountbuy){
               //稍微加0.01，使得订单排在前面
              return depth.Bids[i].Price+0.01;}
        }
    }
    //同理计算卖价
    if(Type=="Sell"){
       for(var j=0; j<20; j++){
    	   amountAsks+=depth.Asks[j].Amount;
            if (amountAsks>floatamountsell){
            return depth.Asks[j].Price-0.01;}
        }
    }
    //遍历了全部深度仍未满足需求，就返回一个价格，以免出现bug
    return depth.Asks[0].Price
}
```
每个循环的主函数onTick(),这里定的循环时间3.5s，每次循环都会把原来的单子撤销，重新挂单，越简单越不会遇到bug.
```
function onTick() {
    var buyPrice = GetPrice("Buy");
    var sellPrice= GetPrice("Sell");
    //diffprice是预设差价，买卖价差如果小于预设差价，就会挂一个相对更深的价格
    if ((sellPrice - buyPrice) <= diffprice){
            buyPrice-=10;
            sellPrice+=10;}
    //把原有的单子全部撤销，实际上经常出现新的价格和已挂单价格相同的情况，此时不需要撤销
    CancelPendingOrders() 
    //获取账户信息，确定目前账户存在多少钱和多少币
    var account=_C(exchange.GetAccount);
    //可买的比特币量，_N()是平台的精度函数
    var amountBuy = _N((account.Balance / buyPrice-0.1),2); 
    //可卖的比特币量，注意到没有仓位的限制，有多少就买卖多少，因为我当时的钱很少
    var amountSell = _N((account.Stocks),2); 
    if (amountSell > 0.02) {
        exchange.Sell(sellPrice,amountSell);}
    if (amountBuy > 0.02) {
        exchange.Buy(buyPrice, amountBuy);}
    //休眠，进入下一轮循环
    Sleep(sleeptime);
}
```

**尾巴**

整个程序也就40多行，看上去十分简单，但当时也花了我一个多星期，这还是在botvs平台上情况下。最大的优势还是起步早，在2014年，市场上以搬砖为主，网格和抢盘口的高频也不多，使得策略如鱼得水，后来竞争不可避免越来越激烈，我的钱也越来越多，面临的挑战很多，每隔一段时间都要进行较大的改动来应对，但总体还算顺利。在交易平台不收取手续费的情况下，是程序化交易的天堂，散户因为不收手续费跟倾向于操作，为高频和套利提供了空间，这一切也基本随着动辄0.1-0.2%的双向手续费终结了，不仅是自己被收费的问题，而是整个市场活跃度下降。
但不需要高频的量化策略任然有很大的空间。

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|sleeptime|3500|休眠时间|
|floatamountbuy|8|买单深度|
|floatamountsell|8|卖单高度|
|diffprice|1.5|套利差价|


> Source (javascript)

``` javascript
/*
就是我刚开始编写机器人的源代码，几乎没有改动，参数也是原来的参数。这个版本的程序有许多
需要改进的地方，但即使如此，它也当时表现除了惊人的盈利能力，在我本金不多时，不加杠杆平
均每天盈利在5%左右。当然无论从哪一方面，它都不适应今天的市场。
我同时也发了一篇文章在社区，大家可以看看。
by 小草
*/

//稍微改了一下，用了平台的容错函数_C(),和精度函数_N().
//取消全部订单
function CancelPendingOrders() {
    var orders = _C(exchange.GetOrders);
    for (var j = 0; j < orders.length; j++) {
          exchange.CancelOrder(orders[j].Id, orders[j]);}
}

//计算将要下单的价格
function GetPrice(Type,depth) {
    var amountBids=0;
    var amountAsks=0;
    //计算买价，获取累计深度达到预设的价格
    if(Type=="Buy"){
       for(var i=0;i<20;i++){
           amountBids+=depth.Bids[i].Amount;
           //floatamountbuy就是预设的累计买单深度
           if (amountBids>floatamountbuy){
               //稍微加0.01，使得订单排在前面
              return depth.Bids[i].Price+0.01;}
        }
    }
    //同理计算卖价
    if(Type=="Sell"){
       for(var j=0; j<20; j++){
    	   amountAsks+=depth.Asks[j].Amount;
            if (amountAsks>floatamountsell){
            return depth.Asks[j].Price-0.01;}
        }
    }
    //遍历了全部深度仍未满足需求，就返回一个价格，以免出现bug
    return depth.Asks[0].Price
}
 
function onTick() {
    var depth=_C(exchange.GetDepth);
    var buyPrice = GetPrice("Buy",depth);
    var sellPrice= GetPrice("Sell",depth);
    //买卖价差如果小于预设值diffprice，就会挂一个相对更深的价格
    if ((sellPrice - buyPrice) <= diffprice){
            buyPrice-=10;
            sellPrice+=10;}
    //把原有的单子全部撤销，实际上经常出现新的价格和已挂单价格相同的情况，此时不需要撤销
    CancelPendingOrders() 
    //获取账户信息，确定目前账户存在多少钱和多少币
    var account=_C(exchange.GetAccount);
    //可买的比特币量
    var amountBuy = _N((account.Balance / buyPrice-0.1),2); 
    //可卖的比特币量，注意到没有仓位的限制，有多少就买卖多少，因为我当时的钱很少
    var amountSell = _N((account.Stocks),2); 
    if (amountSell > 0.02) {
        exchange.Sell(sellPrice,amountSell);}
    if (amountBuy > 0.02) {
        exchange.Buy(buyPrice, amountBuy);}
    //休眠，进入下一轮循环
    Sleep(sleeptime);
}
    
function main() {
    while (true) {
        onTick();
    }
}
```

> Detail

https://www.fmz.com/strategy/1088

> Last Modified

2019-06-06 12:30:10
