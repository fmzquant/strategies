
> Name

冰山委托买入-Jason

> Author

Jason_MJ

> Strategy Description

**1. 前提：**
    初次学习写策略--冰山委托：
    本文主要参考了大佬的策略：https://www.fmz.com/strategy/188435
大致上跟大佬的策略没什么两样，写法还粗糙一些。主要用于学习入门。多多指教

**2.前因**
    在进行大额买卖数字货币时，可能会因为交易金额较大而影响到自己想要买/卖币种的市场价格，对于流动性比较差的数字货币更甚，一个大额买单就可以**拉盘**，大额卖单就可以**砸盘**。
    ①拉盘：拉高了价格，将币价抬高
    ②砸盘：不顾价格，直接将币卖掉，使得币价下跌
    ③交易货币Stocks：用于交易的币种，以BTC/USDT交易对为例，**BTC是交易货币**
    ④计价货币Balance：用户计价的货币，以BTC/USDT交易对为例，**USDT是计价货币**

**冰山委托：**
    操作：是指将大单委托自动拆分为**多笔委托**，根据当前的最新买一/卖一价格和客户设定的价格策略自动进行小单委托，**在上一笔委托被全部交易或最新价格明显偏离当前委托时，自动重新进行委托**
    效果：减少大额买单/卖单对市场价格的影响，进行大额买入时，可以**防止因大额买单造成价格提升而增加自己的买入成本**；在大额卖出时，可以**防止因大额卖单造成拉低价格减少自己的卖出利润**

**数据参数对照：**
1. 委托价格=最新买1价X（1-委托深度）
2. 实际市场委托深度= （最后成交价格 - 上次委托价格）/ 上次委托价格
3. 随机单次购买数量=单次购买数量均值 X（100-单次均值浮点数）% + （单次均值浮动点数X2）%X单次购买数量均值X随机数0~1
4. 可用金额= 取账户计价货币，随机单次购买数量，购买剩余总金额数最小值
5. 购买数量=可用金额/委托价格
6. 购买剩余总金额= 购买总金额-（初始账户计价货币-账户计价货币）


**规则：**
1. 在最新成交价格距离该笔委托超过委托深度X2时自动撤单（说明偏离太大）
2. 当策略总成交量等于总委托数量时停止委托
3. 最新成交价格高于最高限制买入价格停止委托
4. 在最新成交价格低于最高限制买入价格恢复委托

**主要参数：**
1. 买入金额
2. 单笔购买数量
3. 委托深度
4. 最高价格
5. 价格轮询间隔
6. 单次购买数量均值浮点数
7. 最小交易量

**思路：**
1. 获取所有未成交的订单，取消订单
2. 获取初始化账户余额，判断是否大于购买总金额
3. 计算委托价格
4. 计算单次购买数量
5. 计算可用金额
6. 计算购买数量
7. 执行买入
8. 休息指定时间
9. 判断上次订单是否购买成功
10. 成功输出日志
11. 失败判断偏差是否太大，太大则需要撤销

**建议**
1. 建议使用ETH_USDT回测

**策略不完善，希望路过的大佬们指点一二**

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|buyAmount|10000|买入金额|
|buyNum|100|单笔购买数量均值|
|depthStatus|0.1|委托深度|
|highPrice|20000|最高价格|
|priceInterval|true|询问价格间隔|
|minBuyNum|0.0001|最小交易量|
|buyOncePoint|10|单次购买数量均值浮点数|


> Source (python)

``` python
import random


def main():
    # 获取账户所有未成交订单
    Log("取消所有未成交订单")
    orders = _C(exchange.GetOrders)
    if len(orders) > 0:
        for i in range(len(orders)):
            exchange.CancelOrder(orders[i]["Id"])
            Sleep(priceInterval*1000)

    # 对比账户余额
    Log("获取用户初始化账户")
    initAccount = _C(exchange.GetAccount)
    if initAccount["Balance"] < buyAmount:
        Log("账户余额不足")
        return
    
    #比较单笔购买数量均值*市场买一价是否大于账户余额
    ticker = _C(exchange.GetTicker)
    if (ticker['Last'] * buyNum) > initAccount['Balance']:
        Log("单次购买均值价格大于账户余额，请调整参数")
        return

    lastBuyPrice = 0

    while (True):
        Sleep(priceInterval*1000)
        #获取账户信息
        account = _C(exchange.GetAccount)
        #获取当下行情
        ticker = _C(exchange.GetTicker)
        # 上次购买价格不为空，查看订单是否完成，没有完成则取消
        if lastBuyPrice > 0:
            orders1 = exchange.GetOrders()
            if len(orders1) > 0:
                for j in range(len(orders1)):
                    #计算实际市场委托深度
                    if ticker["Last"] > lastBuyPrice and ((ticker["Last"] - lastBuyPrice)/lastBuyPrice) > (2* (depthStatus/100)):
                        Log("委托价格偏离过多，最新成交价:",ticker["Last"],"委托价",lastBuyPrice)
                        exchange.CancelOrder(orders1[j]["Id"])
                        lastBuyPrice = 0
                continue
            else:
                Log("买单完成, 累计花费:", _N(initAccount["Balance"] - account["Balance"]), "平均买入价:", _N((initAccount["Balance"] - account["Balance"]) / (account["Stocks"] - initAccount["Stocks"])))
                lastBuyPrice = 0
                continue     
        else:
            Log("剩余余额:",account["Balance"])
            #委托价格 = 最新买一价*（1-委托深度/100）
            entrustPrice = _N(ticker["Buy"]*(1-depthStatus/100))
            Log("委托价格：",entrustPrice)
            #判断委托价格是否大于最高价格限定
            if entrustPrice > highPrice:
                continue
            #随机购买数量 = 单次购买数量均值 * ((100-单次均值浮点数)/100)+(单次均值浮点数*2 /100* 单次购买数量均值 *随机数0~1)  
            randomBuyNum = (buyNum*((100-buyOncePoint)/100))+(buyOncePoint*2/100 *buyNum*random.random())
            #可用数量金额 
            useMoney = min(account["Balance"],randomBuyNum,buyAmount - (initAccount["Balance"] - account["Balance"]))
            #购买数量
            orderBuyNum = _N(useMoney/entrustPrice)
            Log("交易数量：",orderBuyNum)
            #判断是否小于最小交易量
            if orderBuyNum < minBuyNum:
                break
            #因为要扣手续费，所以大概为账户99.7%
            if (entrustPrice*orderBuyNum)>(account["Balance"]*0.997):
                Log("金额为",(entrustPrice*orderBuyNum))
                Log("账户余额为",(account["Balance"]))
                continue
            #更新上次购买价格
            lastBuyPrice = entrustPrice
            #下单
            exchange.Buy(entrustPrice,orderBuyNum)
            
    account = _C(exchange.GetAccount)  
    Log("冰山委托买单完成,共计花费：",_N(initAccount["Balance"]-account["Balance"]),"平均单价为:",_N((initAccount["Balance"]-account["Balance"])/(account["Stocks"]-initAccount["Stocks"])))        

```

> Detail

https://www.fmz.com/strategy/271475

> Last Modified

2021-04-16 10:26:23
