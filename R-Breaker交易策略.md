
> 策略名称

R-Breaker交易策略

> 策略作者

程文

> 策略描述

#### 一、摘要
R-Breaker策略由Richard Saidenberg开发，并于1994年公布于世。在之后连续十五年被美国《Futures Truth》杂志评选为前十大最赚钱的交易策略之一。与其他策略相比，R-Breaker是趋势与反转相结合的交易策略。不仅可以捕捉趋势行情获得大利润，还可以在行情反转的时候，及时主动止盈并顺势反手。


#### 二、阻力位与支撑位
简单的说，R-Breaker策略就是一个支撑位和阻力位策略，它根据昨日的最高价、最低价和收盘价，计算出七个价格：一个中心价(pivot)、三个支撑位(s1、s2、s3)、三个阻力位(r1、r2、r3)。然后根据当前价格与这些支撑位和阻力位的位置关系，以形成买卖的触发条件，并且通过一定的算法调整，调节这七个价格之间的距离，进一步改变交易的触发值。

- 突破买入价(阻力位r3) = 昨日最高价 + 2 *（中心价 - 昨日最低价）2
- 观察卖出价(阻力位r2) = 中心价 +（昨日最高价-昨日最低价）
- 反转卖出价(阻力位r1) = 2 * 中心价 - 昨日最低价
- 中心价(pivot)  =（昨日最高价 + 昨日收盘价 + 昨日最低价）/ 3
- 反转买入价(支撑位s1) = 2 * 中心价 - 昨日最高价
- 观察买入价(支撑位s2) = 中心价 -（昨日最高价 - 昨日最低价）
- 突破卖出价(支撑位s3) = 昨日最低价 - 2 *（昨日最高价 - 中心价）

由此我们可以看到，R-Breaker策略是根据昨天的价格绘制了一个类似网格的价格线，并且每天更新一次这些价格线。在技术分析上支撑位和阻力位，并且两者的作用可以互相转换。当价格成功向上突破阻力位时，阻力位变成了支撑位；当价格成功向下突破支撑位时，支撑位变成了阻力位。

在实际交易中，这些支撑位和阻力位为交易者指出了开平仓方向和精确等买卖点位。具体的开平仓条件交易者可以根据盘中价格、中心价、阻力位、支撑位灵活定制，也可以根据这些网格价格线进行加减仓的头寸管理。

#### 三、策略逻辑
接下来，让我们看一下R-Breaker策略是怎样利用这些支撑位和阻力位的。它逻辑一点也不复杂。如果当前没有持仓就进入趋势模式，当价格大于突破买入价就开仓做多；当价格小于突破卖出价就开仓做空。

- 趋势模式
   - 多头开仓：如果无持仓，并且价格大于突破买入价
   - 空头开仓：如果无持仓，并且价格小于突破卖出价
   - 多头平仓：如果持多单，并且当日最高价大于观察卖出价，并且价格小于反转卖出价
   - 空头平仓：如果持空单，并且当日最低价小于观察买入价，并且价格大于反转买入价
- 反转模式
   - 多头开仓：如果持空单，并且当日最低价小于观察买入价，并且价格大于反转买入价
   - 空头开仓：如果持多单，并且当日最高价大于观察卖出价，并且价格小于反转卖出价
   - 多头平仓：如果持多单，并且价格小于突破卖出价
   - 空头平仓：如果持空单，并且价格大于突破买入价

如果有持仓时就进入反转模式，当持有多单时，并且当日最高价大于观察卖出价，并且价格跌破反转卖出价就平掉多头持仓反手做空。当持有空单时，并当日最低价小于观察买入价，并且价格突破反转买入价就平掉空头持仓反手做多。

#### 四、复制完整策略
完整策略已经发布到发明者量化（FMZ.COM）中，点击下面链接直接复制，无需配置即可回测：
https://www.fmz.cn/strategy/187009

#### 五、总结
R-Breaker策略之所以流行，关键在于它并不是纯粹到趋势跟踪类策略，而是以复合型策略同时赚取趋势的alpha和反转的alpha收益。本文的策略只是作为演示，没有优化合适的参数和品种，另外完整的策略也必须包含止损功能，感兴趣的朋友可以加以改进。


> 策略参数



|参数|默认值|描述|
|----|----|----|
|contract_type|MA888|品种代码|
|num|true|num|


> 源码 (python)

``` python
'''backtest
start: 2019-01-01 00:00:00
end: 2021-01-01 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
'''

# 策略主函数
def onTick():
    # 获取数据
    exchange.SetContractType('rb000')   					# 订阅期货品种
    bars_arr =exchange.GetRecords(PERIOD_D1)  			# 获取日K线数组
    if len(bars_arr) < 2:  								# 如果K线数量小于2根
        return
    yesterday_open = bars_arr[-2]['Open']     			# 昨日开盘价
    yesterday_high = bars_arr[-2]['High']     			# 昨日最高价
    yesterday_low = bars_arr[-2]['Low']       			# 昨日最低价
    yesterday_close = bars_arr[-2]['Close']   			# 昨日收盘价
    # 计算
    pivot = (yesterday_high+yesterday_close+yesterday_low) / 3*num # 枢轴点
    r1 = 2 * pivot - yesterday_low 						# 阻力位1
    r2 = pivot + (yesterday_high - yesterday_low)		# 阻力位2
    r3 = yesterday_high + 2 * (pivot - yesterday_low)	# 阻力位3
    s1 = 2 * pivot - yesterday_high  					# 支撑位1
    s2 = pivot - (yesterday_high - yesterday_low)  		# 支撑位2
    s3 = yesterday_low - 2 * (yesterday_high - pivot)  	# 支撑位3
    today_high = bars_arr[-1]['High'] 					# 今日最高价
    today_low = bars_arr[-1]['Low'] 					# 今日最低价
    current_price = _C(exchange.GetTicker).Last 		#当前价格
    # 获取持仓
    position_arr = _C(exchange.GetPosition)  			# 获取持仓数组
    if len(position_arr) > 0:  							# 如果持仓数组大于0
        for i in position_arr:
            if i['ContractType'][:2] == 'rb':  			# 如果持仓品种等于rb
                if i['Type'] % 2 == 0:  					# 如果是多单
                    position = i['Amount']  				# 赋值持仓数量为正数
                else:
                    position = -i['Amount']  				# 赋值持仓数量为负数
                profit = i['Profit']  					# 获取持仓盈亏
    else:
        position = 0  									# 赋值持仓数量为0
        profit = 0  										# 赋值持仓盈亏为0
    if position == 0:  									# 如果无持仓
        if current_price > r3:  							# 如果价格大于阻力位3
            exchange.SetDirection("buy")  				# 设置交易方向和类型
            exchange.Buy(current_price + 1, 1)  			# 开多单
        if current_price < s3:  							# 如果价格小于支撑位3
            exchange.SetDirection("sell")  				# 设置交易方向和类型
            exchange.Sell(current_price - 1, 1)  		# 开空单
    if position > 0:  									# 如果持有多单
    # 如果今日最高价大于阻力位2，并且当前价格小于阻力位1
        if today_high > r2 and current_price < r1 or current_price < s3:  
            exchange.SetDirection("closebuy")  			# 设置交易方向和类型
            exchange.Sell(current_price - 1, 1)  		# 平多单
            exchange.SetDirection("sell")  				# 设置交易方向和类型
            exchange.Sell(current_price - 1, 1)  		# 反手开空单
    if position < 0:  # 如果持有空单
        # 如果今日最低价小于支撑位2，并且当前价格大于支撑位1
        if today_low < s2 and current_price > s1 or current_price > r3:  
            exchange.SetDirection("closesell")  			# 设置交易方向和类型
            exchange.Buy(current_price + 1, 1)  			# 平空单
            exchange.SetDirection("buy")  				# 设置交易方向和类型
            exchange.Buy(current_price + 1, 1)  			# 反手开多单
            
# 程序主函数
def main():
    while True:     										# 循环
        onTick()    										# 执行策略主函数
        Sleep(1000) 										# 休眠1秒
```

> 策略出处

https://www.fmz.com/strategy/187009

> 更新时间

2021-10-26 16:31:36
