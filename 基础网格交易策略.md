
> Name

基础网格交易策略

> Author

xl9211

> Strategy Description

基础网格交易策略实现

目前这个不是最优的版本，我自己目前跑的是币安的websocket版本。
如果大家有需要，我再把币安的websocket版本改成适合在发明者上跑的版本。

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|trading_pair|BTC_USDT|交易对|
|lower_price|false|区间下限价格|
|upper_price|false|区间上限价格|
|grid_num|2|网格数|
|trading_per_grid|false|每格购买数量|
|price_precision|2|下单价格精度|
|amount_precision|5|下单数量精度|


> Source (python)

``` python
'''backtest
start: 2021-08-01 00:00:00
end: 2021-09-01 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Binance","currency":"BTC_USDT","balance":1000000,"stocks":0,"fee":[0.06,0.075]}]
args: [["lower_price",30000],["upper_price",50000],["grid_num",200],["trading_per_grid",0.1]]
'''

grid = dict()
interval = 0


class GridItem:
    def __init__(self, order_id, status, price):
        self.order_id = order_id
        self.status = status  # -1：此点为空白点; -2：此点未下过单
        self.side = 0  # 1：买入；2：卖出；0：未知
        self.price = price


def create_grid(ticker_price):
    global grid
    global interval

    exchange.SetCurrency(trading_pair)
    exchange.SetPrecision(price_precision, amount_precision)

    interval = _N((upper_price - lower_price) / grid_num, price_precision)
    
    grid[lower_price] = GridItem(-1, -2, lower_price)
    grid[upper_price] = GridItem(-1, -2, upper_price)
    for i in range(1, grid_num):
        price = lower_price + interval * i
        grid[price] = GridItem(-1, -2, price)
        
    buy_stocks = (grid_num - int((ticker_price - lower_price) / interval) - 1) * trading_per_grid
    buy_2_sell(buy_stocks)
    
    
def buy_2_sell(buy_stocks):
    while True:
        account = exchange.GetAccount()
        stocks = _N(account['Stocks'], amount_precision)
        if stocks < buy_stocks:
            depth = exchange.GetDepth()
            price = depth['Asks'][0]['Price']
            vol = _N(price * trading_per_grid, price_precision)
            min_vol = 1.0 / (10 ** price_precision)
            exchange.Buy(-1, vol if vol > min_vol else min_vol)
        else:
            break
        Sleep(1000)


def set_blank(price):
    grid[price].order_id = -1
    grid[price].status = -1
    grid[price].side = 0


def update_order():
    last_blank_price = -1
    close_price_list = set()

    for grid_item in grid.values():
        if grid_item.status == -1:
            last_blank_price = grid_item.price
        elif grid_item.status == -2:
            close_price_list.add(grid_item.price)
        else:
            order = exchange.GetOrder(grid_item.order_id)
            grid_item.status = order["Status"]
            if grid_item.status == 1:
                close_price_list.add(grid_item.price)
    return close_price_list, last_blank_price


def remove_blank(close_price_list, last_blank_price):
    if last_blank_price != -1:
        close_price_list.discard(last_blank_price)


def set_left_blank(close_price_list, left_side_grid, last_blank_price):
    set_blank(left_side_grid)
    close_price_list.discard(left_side_grid)
    if last_blank_price != -1:
        close_price_list.add(last_blank_price)
    
    
def set_right_blank(close_price_list, right_side_grid, last_blank_price):
    set_blank(right_side_grid)
    close_price_list.discard(right_side_grid)
    if last_blank_price != -1:
        close_price_list.add(last_blank_price)


def trace():
    close_price_list, last_blank_price = update_order()
    
    has_buy_order = False
    for price in close_price_list:
        if grid[price].side == 1:
            has_buy_order = True
            break
    
    if has_buy_order:
        ticker_price = min(close_price_list) - interval / 2.0
    else:
        ticker = exchange.GetTicker()
        ticker_price = ticker['Last']
    
    if not grid:
        create_grid(ticker_price)

    left_side_grid = int((ticker_price - lower_price) / interval) * interval + lower_price
    right_side_grid = left_side_grid + interval

    # 设置空白点
    # 当前价格左侧未成交，当前价格右侧未成交，不存在
    # 当前价格左侧空白点，当前价格右侧空白点，不存在
    # 左侧和右侧任何一个为空白点，不需要更新空白点
    if left_side_grid >= upper_price or right_side_grid <= lower_price:
        # 在区间外，不需要空白点
        remove_blank(close_price_list, last_blank_price)
    elif grid[left_side_grid].status == 0 and grid[right_side_grid].status == 1:
        set_right_blank(close_price_list, right_side_grid, last_blank_price)
    elif grid[left_side_grid].status == 1 and grid[right_side_grid].status == 0:
        set_left_blank(close_price_list, left_side_grid, last_blank_price)
    elif grid[left_side_grid].status == 1 and grid[right_side_grid].status == 1:
        set_right_blank(close_price_list, right_side_grid, last_blank_price)
    elif grid[left_side_grid].status == -2 and grid[right_side_grid].status == -2:
        set_right_blank(close_price_list, right_side_grid, last_blank_price)

    # 重新下单
    for price in close_price_list:            
        if price <= ticker_price:
            order_id = exchange.Buy(price, trading_per_grid)
            side = 1
        else:
            buy_2_sell(trading_per_grid)
            order_id = exchange.Sell(price, trading_per_grid)
            side = 2

        if order_id:
            grid[price].order_id = order_id
            grid[price].status = 0
            grid[price].side = side


def main():
    while True:
        trace()
        Sleep(1000)


```

> Detail

https://www.fmz.com/strategy/316809

> Last Modified

2021-09-27 11:59:39
