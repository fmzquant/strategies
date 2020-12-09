
> 策略名称

python_test

> 策略作者

Hukybo





> 源码 (python)

``` python
'''backtest
start: 2020-09-03 00:00:00
end: 2020-09-04 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
'''



mp=0   # 定义一个全局变量 mp=0空仓，=1开多单，=-1开空单
prc=0
def lessthan_0(arr):
    arr_len=len(arr)
    if arr[arr_len-1]>arr[arr_len-2] and arr[arr_len-2]<0 and arr[arr_len-1]>0:
        return True
def morethan_100(arr):
    arr_len=len(arr)
    if arr[arr_len-1]<arr[arr_len-2] and arr[arr_len-2]>100 and arr[arr_len-1]<100:
        return True
def is_up(arr):
    arr_len=len(arr)
    if arr[arr_len-1]>arr[arr_len-2] and arr[arr_len-2]>arr[arr_len-3]:
        return True
def is_down(arr):
    arr_len=len(arr)
    if arr[arr_len-1]<arr[arr_len-2] and arr[arr_len-2]<arr[arr_len-3]:
        return True
def is_up_cross(arr1,arr2):
    if arr1[len(arr1)-2]<arr2[len(arr2)-2] and arr1[len(arr1)-1]>arr2[len(arr2)-1]:
        return True
def is_down_cross(arr1,arr2):
    if arr1[len(arr1)-2]>arr2[len(arr2)-2] and arr1[len(arr1)-1]<arr2[len(arr2)-1]:
        return True
    
    
def onTick():
    exchange.SetContractType("MA888")
    bar_arr=exchange.GetRecords(PERIOD_M5)
    if len(bar_arr)<36:
        return
    all_macd=TA.MACD(bar_arr,12,26,9)
    dif=all_macd[0]
    dif.pop()
    dea=all_macd[1]
    dea.pop()
    all_kdj=TA.KDJ(bar_arr,9,3,3)
    j=all_kdj[2]
    j.pop()
    last_close=bar_arr[len(bar_arr)-1]['Close']
    global mp 
    global prc
    if mp==0 and is_up_cross(dif,dea):
        Log("")
        Log("开始多仓")
        exchange.SetDirection("buy")
        exchange.Buy(last_close,1)
        prc=last_close
        mp=1
    if mp==0 and is_down_cross(dif,dea):
        Log("")
        Log("开始空仓")
        exchange.SetDirection("sell")
        exchange.Sell(last_close,1)
        prc=last_close
        mp=-1
    if mp==1 and (last_close-prc==10.0 or last_close-prc==-10.0):
        Log("平多前j值：",j[len(j)-1])
        exchange.SetDirection("closebuy")
        exchange.Sell(last_close-1,1)
        mp=0
        Log("平多时j值：",j[len(j)-1])
        Log("平多仓")
        Log("")
    if mp==-1 and (last_close-prc==-10.0 or last_close-prc==13.0):#空平条件：last_close当前价-prc开空单价，赚10元执行或者赔13元执行平仓
        Log("平空前j值：",j[len(j)-1])
        exchange.SetDirection("closesell")
        exchange.Buy(last_close-1,1)
        mp=0
        Log("平空时j值：",j[len(j)-1])
        Log("平空仓")
        Log("")

def main():
    while True:
        onTick()
        Sleep(1000)
```

> 策略出处

https://www.fmz.com/strategy/225708

> 更新时间

2020-09-08 11:40:42
