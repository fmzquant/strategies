
> Name

grid

> Author

CYZWX





> Source (python)

``` python
last_tick = []
line = []
grid_buy_list = []

def net(now_price):
    global line
    print(now_price)
    line = [now_price*(1+0.003*i) for i in range(-1000,1000)]
    Log(line)
    
def ontick():
    global last_tick
    global  line
    global grid_buy_list
    account = exchange.GetAccount()
    ticker = exchange.GetTicker()
    last_tick.append(ticker['Last'])
    if len(last_tick) == 1:return
    elif len(last_tick) == 100:del last_tick[0]
    for i in range(len(line)):
        if last_tick[-1] > line[i] and last_tick[-2] < line[i] and len(grid_buy_list)!= 0 and i > min(grid_buy_list)  and account['Stocks'] >= 0.001:
            exchange.Sell(last_tick[-1],0.01)
            del grid_buy_list[grid_buy_list.index(min(grid_buy_list))]
            Log(exchange.GetAccount())
        elif last_tick[-1] < line[i] and last_tick[-2] > line[i] and i not in grid_buy_list:
            exchange.Buy(last_tick[-1],0.01)
            grid_buy_list.append(i)
            Log(exchange.GetAccount())

def main():
    net(exchange.GetTicker()['Last'])
    Log(exchange.GetAccount())
    while(True):
        ontick()
        Sleep(1000)

```

> Detail

https://www.fmz.com/strategy/291160

> Last Modified

2021-06-17 02:43:52
