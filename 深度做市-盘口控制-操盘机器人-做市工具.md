
> Name

深度做市-盘口控制-操盘机器人-做市工具

> Author

3piggy

> Strategy Description

给交易所跑的策略，大致的策略是，获取当前价格，同时挂出买卖单增加深度，可以复制别的行情，可以参考别的趋势。



> Source (python)

``` python
# -*- coding: UTF-8 -*-
import requests
import time
import random
import hashlib
import sys
import threading
from api import *

symbol = sys.argv[1]
gap= float(sys.argv[2]) #密度/价差
baseamount = float(sys.argv[3])
basebuy = float(sys.argv[4])
amount_add	= float(sys.argv[5]) 	#挂单增量	数字型(number)
amount_add2 = float(sys.argv[6]) 	#挂单增量	数字型(number)
longperoidlimit = int(sys.argv[7])
bigbase = float(sys.argv[8])				#大单基准量
orderlimit = int(sys.argv[9])   #总单量
api_key = sys.argv[10]
secret_key = sys.argv[11]

shortperoidlimit = 3	#高频单量

pre_short_id = []	#高平id标记
pre_long_id = []	#低频id标记
pre_big_id = 0

requests.packages.urllib3.disable_warnings()

def GetTicker():

def GetPV():

def GetDepth():

def GetSign(sign_str):


def GetOrders():

def create_order(side,price,amount):

def CancelOrder(order_id):

def Buy(price,amount):

def Sell(price,amount):

def GetRecords(symbol,period):

def GetPrecision():

def getrr():

def ordersend_shortperoid():

def ordersend_longperoid():

def send_big_order():

def cancel():


if __name__ == '__main__':
	precision = GetPrecision()
	print(precision)
	i = 0
	for x in precision:
		if precision[i]['symbol'] == symbol:
			pricedot = precision[i]['price_precision']
			amountdot = precision[i]['amount_precision']
		i += 1
	pricegap =  max(gap,pow(10,-pricedot))
	threading_list = [ordersend_shortperoid,ordersend_longperoid,send_big_order,cancel]
	threadingList = []
	threadingDict = {}
	for x in threading_list:
		th = threading.Thread(target=x)
		threadingList.append(th)
		threadingDict[th.__dict__['_name']] = th.__dict__['_target']
		th.start()

	while True:
		try:
			time.sleep(200)
			for i in threadingList:
				if i.is_alive() is False:
					threadingList.remove(i)
					result = threadingDict.pop(i.name)
					th = threading.Thread(target=result)
					threadingList.append(th)
					threadingDict[th.__dict__['_name']] = th.__dict__['_target']
					th.start()
		except Exception as e:
			print('check error',e)
```

> Detail

https://www.fmz.com/strategy/146238

> Last Modified

2019-12-10 13:39:07
