
> Name

交易所对倒刷量对敲互刷

> Author

apple7474



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|nnum|5|数量|
|pprice|3|价格|
|trade_num|5|交易次数|




|Button|Default|Description|
|----|----|----|
|开始|__button__|开始刷量|


> Source (python)

``` python
def main():
    # 设置交易所地址
    exchanges[0].SetBase("")
    exchanges[1].SetBase("")
    Log("等待指令")
    while True:
        LogStatus(_D())
        cmd = GetCommand()
        if cmd:
            arr = cmd.split(":")
            # 交易次数
            for i in range(trade_num):
                Account0 = exchanges[0].GetAccount()
                Account1 = exchanges[1].GetAccount()
                # Log("Account0-usdt", Account0["Balance"], "Account0-DEC", Account0["Stocks"])
                # Log("Account 1-usdt", Account1["Balance"], "Account1-DEC", Account1["Stocks"])
                # 获取A0和A1的币
                A0_stocks = Account0["Stocks"]
                A1_stocks = Account1["Stocks"]
                error = 0
                if A0_stocks > A1_stocks:
                    Log("Account0有币")
                    # 重置索引
                    ex_chang = [exchanges[0], exchanges[1]]
                    if abstest(A0_stocks, A1_stocks) == 1:
                        break
                    else:
                        # Log("可继续交易")
                        pass
                else:
                    Log("Account1有dec")
                    # 重置索引
                    ex_chang = [exchanges[1], exchanges[0]]
                    if abstest(A0_stocks, A1_stocks) == 1:
                        break
                    else:
                        # Log("可继续交易")
                        pass
                # 0索引永远卖出    
                ex_chang[0].Sell(pprice, nnum)
                # 1索引永远卖出  
                ex_chang[1].Buy(pprice, nnum)
                Log("交易完成",i)
                Sleep(5)
            if abstest(A0_stocks, A1_stocks) == 1:
                break
            else:
                # Log("可继续交易")
                pass
    Log("运行结束")

def abstest(a, b):
    # 简单判断
    abs_value = abs(a - b)
    # Log("币种差值:" + str(abs_value))
    if abs_value == 0:
        Log("币种不够，请检查")
        error = 1
    else:
        # Log("可继续交易")
        error = 0
    return error


```

> Detail

https://www.fmz.com/strategy/226845

> Last Modified

2021-07-14 15:44:40
