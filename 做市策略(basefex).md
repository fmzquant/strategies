
> 策略名称

做市策略(basefex)

> 策略作者

daniaoren

> 策略描述

自用做市策略备份

不能直接用，需配合自己的keygen模块生成私钥



> 源码 (python)

``` python
import requests
import json
import time
import logging
from tenacity import *
from keygen import *

TELEGRAM = False
if len(sys.argv) > 1:
	if sys.argv[1] == 'telegram':
		TELEGRAM = True
if TELEGRAM:
	from telegram_bot import *
else:
	def sendBotMessage(msg):
		print ('telegram:', msg)
		logger.debug('telegram: %s', msg)
	def getNewMessage():
		return ''

global LOGGING_LEVEL
#LOGGING_LEVEL = logging.DEBUG
LOGGING_LEVEL = logging.INFO

baseurl = 'https://api.basefex.com'
slidePrice = 1
minDiff = 10 #最小做市差价
minAmount = 30 #最小下单量
balancePosition = 200 #仓位为多少时考虑平衡减仓或市价减仓
balanceDiff = 12 #差价为多少时考虑平衡减仓
immediateBalanceDiff = 50 #差价为多少时市价减仓
liquidatePriceAlertLow = 4000 #强平危险区下限
liquidatePriceAlertHigh = 20000 #强平危险区上限
lastBuyPrice = 0
lastSellPrice = 0
lastBuyAmount = 0
lastSellAmount = 0
currentBalance = 0
currentPosition = []
initBalance = 0
tradeList = []
totalBuyAmount = 0
totalBuyPosition = 0
totalSellAmount = 0
totalSellPosition = 0
totalBuyCount = 0
totalSellCount = 0

@retry(stop=(stop_after_delay(10) | stop_after_attempt(5)) , wait=wait_fixed(2))
def safeRequest(url, hed):
    response = requests.get(url, headers=hed)
    return response

@retry(stop=(stop_after_delay(10) | stop_after_attempt(5)) , wait=wait_fixed(2))
def safeRequestPost(url, hed, payload):
    response = requests.post(url, headers=hed, json=payload)
    return response

@retry(stop=(stop_after_delay(10) | stop_after_attempt(5)) , wait=wait_fixed(2))
def safeRequestDelete(url, hed):
    response = requests.delete(url, headers=hed)
    return response

def getAccountInfo():
	uri = '/accounts'
	auth_token = generate_token(key_id, private_key, "GET", 1584014794, uri)
	hed = {'authorization': 'Bearer ' + auth_token}
	response = safeRequest(baseurl+uri, hed)
	return response.json()

def updateAccount():
	global currentBalance
	global currentPosition
	accountInfo = getAccountInfo()[0]
	currentBalance = accountInfo['cash']['balances']
	for position in accountInfo['positions']:
		if position['symbol'] == 'BTCUSD':
			currentPosition = position
			break
	print('CURRENT POSITION: ', currentPosition['entryPrice'], currentPosition['size'])
	print('CURRENT BALANCE: ', currentBalance, 'PROFIT: ', currentBalance - initBalance)
	logger.info('CURRENT BALANCE: %s | POSITION %s@%s', currentBalance, currentPosition['size'], currentPosition['entryPrice'])
	logger.info('PROFIT: %s', currentBalance - initBalance)
	return accountInfo

def getTradeList(limit):
	uri = '/trades'
	query = '?limit=' + str(limit)
	auth_token = generate_token(key_id, private_key, "GET", 1584014794, uri, query)
	hed = {'authorization': 'Bearer ' + auth_token}
	response = safeRequest(baseurl+uri+query, hed)
	return response.json()

def getCurrentBestPrices():
	uri = '/depth@BTCUSD/snapshot'
	auth_token = generate_token(key_id, private_key, "GET", 1584014794, uri)
	hed = {'authorization': 'Bearer ' + auth_token}
	response = safeRequest(baseurl+uri, hed)
	return response.json()['bestPrices']

def placeOrder(price, amount, side):
	if amount == 0:
		print ("amount is zero return")
		return
	payload = {'price': price, 'size': amount, 'type': 'LIMIT', 'side': side, 'symbol': 'BTCUSD'}
	print (payload)
	uri = '/orders'
	auth_token = generate_token(key_id, private_key, "POST", 1584014794, "/orders", "", json.dumps(payload))
	hed = {'authorization': 'Bearer ' + auth_token, 'Content-Type': 'application/json'}
	response = safeRequestPost(baseurl+uri, hed, payload)
	# 如果下单失败，报错返回
	if (str(response) != '<Response [200]>'):
		print (str(response))
		logger.error('PLACE ORDER ERROR: %s', str(response))
		sendBotMessage('PLACE ORDER ERROR: ' + str(response))
		return
	# 下单成功，记录相关信息
	if side == 'BUY':
		global lastBuyPrice
		global lastBuyAmount
		lastBuyPrice = price
		lastBuyAmount = amount
	elif side == 'SELL':
		global lastSellPrice
		global lastSellAmount
		lastSellPrice = price
		lastSellAmount = amount
	else:
		logger.error('ERROR： unexpected side')
		sendBotMessage('ERROR： unexpected side')
	return response.json()

def cancelOrder(id):
	uri = '/orders/'+id
	auth_token = generate_token(key_id, private_key, "DELETE", 1584014794, uri)
	hed = {'authorization': 'Bearer ' + auth_token}
	response = safeRequestDelete(baseurl+uri, hed)
	return response

def getOpeningOrderCount():
	uri = '/orders/opening/count'
	query = '?symbol=BTCUSD'
	auth_token = generate_token(key_id, private_key, "GET", 1584014794, uri, query)
	hed = {'authorization': 'Bearer ' + auth_token}
	response = safeRequest(baseurl+uri+query, hed)
	return response.json()

def getOpeningOrderList():
	uri = '/orders/opening'
	query = '?symbol=BTCUSD'
	auth_token = generate_token(key_id, private_key, "GET", 1584014794, uri, query)
	hed = {'authorization': 'Bearer ' + auth_token}
	response = safeRequest(baseurl+uri+query, hed)
	return response.json()

def getOrderList():
	uri = '/orders'
	query = '?symbol=BTCUSD'
	auth_token = generate_token(key_id, private_key, "GET", 1584014794, uri, query)
	hed = {'authorization': 'Bearer ' + auth_token}
	response = safeRequest(baseurl+uri+query, hed)
	return response.json()

def cancelPendingOrders():
	orderList = getOpeningOrderList()
	if len(orderList) <= 0:
		return
	for order in orderList:
		print('canceled:',order['id'])
		cancelOrder(order['id'])
	return

def cancelPendingBuyOrders():
	orderList = getOpeningOrderList()
	if len(orderList) <= 0:
		return
	for order in orderList:
		if order['side'] == 'BUY':
			cancelOrder(order['id'])
	return

def cancelPendingSellOrders():
	orderList = getOpeningOrderList()
	if len(orderList) <= 0:
		return
	for order in orderList:
		if order['side'] == 'SELL':
			cancelOrder(order['id'])
	return

def setLogger(loggerName):
	logger = logging.getLogger(loggerName)
	global LOGGING_LEVEL
	logger.setLevel(LOGGING_LEVEL)

	fileHandler = logging.FileHandler(loggerName+'.log', mode='a')
	formatter = logging.Formatter('%(asctime)s - %(message)s')
	fileHandler.setFormatter(formatter)
	logger.addHandler(fileHandler)
	return logger

def onTick():
	#初始化状态及	确认价位
	global lastBuyPrice, lastSellPrice, lastBuyAmount, lastSellAmount
	cancelBuyOrder = False
	cancelSellOrder = False
	result = getCurrentBestPrices()
	bestAsk = result['ask']
	bestBid = result['bid']
	print('bestBid',bestBid,'bestAsk',bestAsk)
	logger.info('bestBid: %s|bestAsk: %s',bestBid,bestAsk)
	logger.info('LastBuy %s@%s | LastSell %s@%s', lastBuyAmount,lastBuyPrice,lastSellAmount,lastSellPrice)
	buyPrice = bestBid + slidePrice
	sellPrice = bestAsk - slidePrice
	#确认仓位
	global currentPosition
	buyAmountAdjust = 0
	sellAmountAdjust = 0		 

	#####平衡模块####
	#是否满足市价平仓条件，满足直接尝试平仓并返回
	#平仓条件：仓位大于balancePosition, 价差大于immediateBalanceDiff
	#买单方向
	if (currentPosition['size'] > balancePosition):
		if bestBid - currentPosition['entryPrice'] > immediateBalanceDiff:
			cancelPendingOrders()
			placeOrder(bestBid, abs(currentPosition['size']), 'SELL')
			print('immediateBalance', currentPosition)
			sendBotMessage('IMMEDIATE BALANCE\n' + "Position: "+str(currentPosition['size'])+"@"+str(currentPosition['entryPrice'])+"\nBest Bid: " + str(bestBid))
			sleep(3)
			cancelPendingOrders()
			updateAccount()
			return
	#卖单方向
	elif ( currentPosition['size'] < -balancePosition):
		if currentPosition['entryPrice'] - bestAsk > immediateBalanceDiff:
			cancelPendingOrders()
			placeOrder(bestAsk, abs(currentPosition['size']), 'BUY')
			print('immediateBalance', currentPosition)
			sendBotMessage('IMMEDIATE BALANCE\n' + "Position: "+str(currentPosition['size'])+"@"+str(currentPosition['entryPrice'])+"\nBest Ask: " + str(bestAsk))
			sleep(3)
			cancelPendingOrders()
			updateAccount()
			return

	#不能市价平仓，调整买卖单数量偏向减仓
	#买单方向
	if (currentPosition['size'] > balancePosition):
		if sellPrice - currentPosition['entryPrice'] > balanceDiff:
			sellAmountAdjust = int(currentPosition['size']/10)
			print('adjust buy/sell', buyAmountAdjust,sellAmountAdjust)
	#卖单方向
	elif ( currentPosition['size'] < -balancePosition):
		if currentPosition['entryPrice'] - buyPrice >balanceDiff:
			buyAmountAdjust = int(currentPosition['size'] / -10)
			print('adjust buy/sell', buyAmountAdjust,sellAmountAdjust)

	#确认是否进入强平危险区
	#强制平衡时只能单方面下单
	liquidatePrice = currentPosition['liquidatePrice']
	if liquidatePrice > liquidatePriceAlertLow and currentPosition['size'] > balancePosition:
		logger.info('Liquidate risk ONLY CAN SELL')
		buyAmountAdjust = -minAmount
	elif liquidatePrice < liquidatePriceAlertHigh and currentPosition['size'] < -balancePosition:
		logger.info('Liquidate risk ONLY CAN BUY')
		sellAmountAdjust = -minAmount
	####平衡模块结束####

	####做市下单模块####
	#差价不满足条件，取消所有订单并返回
	if sellPrice - buyPrice < minDiff:
		cancelPendingOrders()
		return

	#确认上次的订单价格和现价差距，决定是否要调整买卖单
	if (lastBuyPrice > 0) and (abs(buyPrice - lastBuyPrice) > slidePrice):
		cancelBuyOrder = True
	if (lastSellPrice > 0) and (abs(lastSellPrice - sellPrice) > slidePrice):
		cancelSellOrder = True

	#买单卖单均需调整，取消所有后调整
	if cancelBuyOrder & cancelSellOrder:
		logger.debug('CANCEL ALL')
		cancelPendingOrders()
		placeOrder(buyPrice, minAmount + buyAmountAdjust, 'BUY')
		placeOrder(sellPrice, minAmount + sellAmountAdjust, 'SELL')
		return

	#按单数量分情况处理
	openingOrderCount = getOpeningOrderCount()['count']
	logger.debug('openingOrderCount %s', openingOrderCount)
	#单数超过2不正常，退出
	if openingOrderCount > 2:
		print('openingOrderCount:',openingOrderCount,'error')
		logger.error('ERROR openingOrderCount: %s', str(openingOrderCount))
		sendBotMessage('ERROR openingOrderCount: ' + str(openingOrderCount))
		exit()
	#单数为2，旧单都在，看需要更新买还是卖
	elif openingOrderCount == 2:
		if cancelBuyOrder:
			logger.debug('CANCEL BUY')
			cancelPendingBuyOrders()
			placeOrder(buyPrice, minAmount + buyAmountAdjust, 'BUY')
		elif cancelSellOrder:
			logger.debug('CANCEL SELL')
			cancelPendingSellOrders()
			placeOrder(sellPrice, minAmount + sellAmountAdjust, 'SELL')
		else:
			logger.debug('CANCEL NONE')
	#单数为1，看具体生效的是买单还是卖单再更新
	elif openingOrderCount == 1:
		#看是买单还是卖单
		orderList = getOpeningOrderList()
		#更新的过程中有新单，跳过，重新check
		if len(orderList) != 1:
			logger.debug('openingOrderCount changed!! skip')
			return
		side = orderList[0]['side']
		logger.info('only 1 order remain: %s', side)
		#现在有效的是买单
		if side == 'BUY':
			#如果买单无效，那么更新买单
			if cancelBuyOrder:
				cancelPendingBuyOrders()
				placeOrder(buyPrice, minAmount + buyAmountAdjust, 'BUY')
			#卖单无论如何都要更新
			placeOrder(sellPrice, minAmount + sellAmountAdjust, 'SELL')
		#现在有效的是卖单
		elif side == 'SELL':
			#如果卖单无效，那么更新卖单
			if cancelSellOrder:
				cancelPendingSellOrders()
				placeOrder(sellPrice, minAmount + sellAmountAdjust, 'SELL')
			#买单无论如何都要更新
			placeOrder(buyPrice, minAmount + buyAmountAdjust, 'BUY')
		else:
			print('unexpected side, exit')
			exit()
	#单数为0,无论如何都需要补单
	elif openingOrderCount == 0:
		placeOrder(buyPrice, minAmount + buyAmountAdjust, 'BUY')
		placeOrder(sellPrice, minAmount + sellAmountAdjust, 'SELL')
	####做市下单模块结束####
	return

###### TEST AREA
#exit()
###### INIT ######
#SETUP LOGGER
logger = setLogger('merTradeLog')
#CANCEL ALL ORDER
cancelPendingOrders()
#GET ACCOUNT INFO
updateAccount()
accountInfo = getAccountInfo()[0]
initBalance = currentBalance
print('initBalance:', initBalance)
tradeList = getTradeList(1);
tickCount = 0
startTime = time.time()
while True:
	#Telegram控制模块
	message = getNewMessage()
	if message == '!':
		cancelPendingOrders()
		updateAccount()
		sendBotMessage('Balance: '+str(currentBalance)+"\nPosition: "+str(currentPosition['size'])+"@"+str(currentPosition['entryPrice'])+"\nLiquidatePrice: "+str(currentPosition['liquidatePrice']) +"\nProfit: " + str(currentBalance - initBalance))
		sendBotMessage('STOP STRATEGY')
		exit()
	elif message == '1':
		updateAccount()
		sendBotMessage('Balance: '+str(currentBalance)+"\nPosition: "+str(currentPosition['size'])+"@"+str(currentPosition['entryPrice'])+"\nLiquidatePrice: "+str(currentPosition['liquidatePrice']) +"\nProfit: " + str(currentBalance - initBalance))
	elif message == '2':
		if totalBuyAmount != 0:
			sendBotMessage('Buy position: ' + str(totalBuyAmount) + '@' + str(totalBuyPosition/totalBuyAmount))
		if totalSellAmount != 0:
			sendBotMessage('Sell position: ' + str(totalSellAmount) + '@' + str(totalSellPosition/totalSellAmount))
		sendBotMessage('Buy/Sell Count: ' + str(totalBuyCount) +'/'+ str(totalSellCount));
	else:
		pass
	#策略逻辑
	onTick()
	#检测账户信息
	if tickCount % 15 == 0:
		updateAccount()
		if tickCount > 0:
			print ('Tick time: ', str((time.time() - startTime)/tickCount))
	#发送电报消息
	if tickCount % 100 == 0:
		sendBotMessage('Balance: '+str(currentBalance)+"\nPosition: "+str(currentPosition['size'])+"@"+str(currentPosition['entryPrice'])+"\nLiquidatePrice: "+str(currentPosition['liquidatePrice']) +"\nProfit: " + str(currentBalance - initBalance))
	#检测交易信息
	if tickCount % 15 == 0:
		lastTradeList = getTradeList(40)
		for index in range(0,len(lastTradeList) - 1):
			if tradeList[0]['id'] == lastTradeList[index]['id']:
				break
		if index == 0:
			pass
		else:
			# 有新交易记录
			tradeList = lastTradeList[:index] + tradeList
			for trade in lastTradeList[:index]:
				logger.info('NEW TRADE: %s,%s,%s',trade['side'],trade['price'],trade['size'])
				sendBotMessage('NEW TRADE - ' + str(trade['side']) + ' ' + str(trade['size']) + '@' + str(trade['price']))
				if trade['side'] == 'BUY':
					totalBuyCount += 1
					totalBuyPosition += trade['price'] * trade['size']
					totalBuyAmount += trade['size']
				elif trade['side'] == 'SELL':
					totalSellCount += 1
					totalSellPosition += trade['price'] * trade['size']
					totalSellAmount += trade['size']
			if totalBuyAmount != 0:
				print ('Buy position at', totalBuyPosition/totalBuyAmount, ' | ',totalBuyAmount)
			if totalSellAmount !=0:
				print ('Sell position at', totalSellPosition/totalSellAmount, ' | ',totalSellAmount)
			print ('Buy|Sell Count: ', totalBuyCount,'|',totalSellCount)
			logger.info('Buy|Sell Count: %s|%s',totalBuyCount,totalSellCount);
	tickCount += 1
	time.sleep(3)
```

> 策略出处

https://www.fmz.com/strategy/162413

> 更新时间

2019-08-16 15:53:47
