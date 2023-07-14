
> Name

网格合约

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|contract_type|swap|合约类型|
|margin_level|10|杠杆倍数|
|net_type|0|网格类型: 做多|做空|多空|
|net_interval|0.01|网格间距|
|net_amount|true|网格开仓数|
|net_limit|100|网格数量限制|
|stop_profit|15|止盈位|
|stop_loss|15|止损位|


> Source (python)

``` python
'''backtest
start: 2020-02-27 00:00:00
end: 2020-02-27 00:00:00
period: 1d
exchanges: [{"eid":"Futures_OKCoin","currency":"ETH_USD","stocks":1.6}]
'''
#常规上下网格
import json
global_param={
              'sell_id':0,
              'buy_id':0,
              'buy_amount':0,#当前多单数量
              'sell_amount':0,#当前空单数量
              'buy_profit':0,#多单利润
              'sell_profit':0#空单利润
             }

def open_order(price):
    net_buy_count = global_param['buy_amount'] / net_amount
    net_sell_count = global_param['sell_amount'] / net_amount
    if(net_buy_count>= net_limit or net_sell_count>=net_limit):
        Log("超过网格数量限制，不开仓！")
        return
    if(net_type == 1 or net_type == 2):#如果设置为开空或者多空双开
        exchange.SetDirection("sell")#设置下单类型为做空
        order_id = exchange.Sell(_N(price*(1+net_interval),2),net_amount)#以当前价格上限开空，合约数量为10张下单
        global_param['sell_id'] = order_id
    if(net_type == 0 or net_type == 2):#如果设置为开多或者多空双开
        exchange.SetDirection("buy")#设置下单类型为做多
        order_id = exchange.Buy(_N(price*(1-net_interval),2),net_amount)#以当前价格下限开多，合约数量为10张下单                        
        global_param['buy_id'] = order_id
        
def cancel_order():
    for order in _C(exchange.GetOrders):
        _C(exchange.CancelOrder,int(order['Id']))
    global_param['sell_id']=0
    global_param['buy_id']=0
        
def judge_order_finish():
    if(global_param['buy_id']!=0):
        order = exchange.GetOrder(global_param['buy_id'])
        if(order["Status"]==ORDER_STATE_CLOSED):
            return True
        else:
            return False
    if(global_param['sell_id']!=0):
        order = exchange.GetOrder(global_param['sell_id'])
        if(order["Status"]==ORDER_STATE_CLOSED):
            return True  
        else:
            return False
    return True
        
def get_position():
    global_param['sell_amount'] = 0
    global_param['sell_profit'] = 0
    global_param['buy_amount'] = 0
    global_param['buy_profit'] = 0
    positions= exchange.GetPosition()
    for position in positions:
        if(position['Type']==PD_SHORT): #空仓      
            global_param['sell_amount'] = position['Amount']#获取空单持仓
            global_param['sell_profit'] = position['Profit']#获取空单盈利
        elif(position['Type']==PD_LONG):
            global_param['buy_amount'] = position['Amount']#获取多单持仓
            global_param['buy_profit'] = position['Profit']#获取多单盈利

    
def check_stop(price):#止盈止损判断
    total_profit = global_param['sell_profit'] + global_param['buy_profit']
    if( total_profit>= stop_profit or total_profit<=-stop_loss):#如果获利达到止盈值或者亏损达到止损值 平仓
        Log("止盈止损平仓，当前持仓总盈利",total_profit)
        if(global_param['sell_amount']>0):  
            Log("sell_amount",global_param['sell_amount'])
            exchange.SetDirection("closesell");#设置下单类型为平空
            exchange.Buy(_N(price*1.005,2),global_param['sell_amount'])
        if(global_param['buy_amount']>0):
            Log("buy_amount",global_param['buy_amount'])
            exchange.SetDirection("closebuy");#设置下单类型为平多
            exchange.Sell(_N(price*0.995,2),global_param['buy_amount'])
                
def main():
    exchange.SetContractType(contract_type)#设置合约
    exchange.SetMarginLevel(margin_level)#杠杆比例
    while True:
        ticker = exchange.GetTicker()
        price = ticker['Last']
        get_position()
        check_stop(price)
        if(judge_order_finish()):
            Log("当前价格为:",price)
            cancel_order()#撤单
            open_order(price)#下单
        Sleep(1000)
            

            
        
        

```

> Detail

https://www.fmz.com/strategy/227783

> Last Modified

2021-09-04 13:40:25
