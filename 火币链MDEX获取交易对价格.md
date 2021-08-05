
> 策略名称

火币链MDEX获取交易对价格

> 策略作者

chao

> 策略描述

托管者服务器需要安装web3

注意:返回的价格是没有除于代币小数位数的,所以得到返回数量后需要自行除小数位数得到最终的数量
    
    后续根据需要再去支持BSC
    
    补充:这个模板需要配合合约使用,需要提供对应的合约方法,有需要请留言联系

> 策略参数



|参数|默认值|描述|
|----|----|----|
|contract_first|0xaaaaaa|出售币种的代币合约地址|
|contract_last|0xaaaaaa|兑换得到的币种代币合约地址|
|decimal|18|出售币种的代币小数位数|
|amount|10|出售的数量|


> 源码 (python)

``` python
from web3 import Web3,HTTPProvider
import json

SETTING = {
    "MAINNET_URL": "你的节点地址(火币链)",
    "CONTRACT_ADDRESS": "你的合约地址",
    "TIME_SPAN": 12
}

web3 = Web3(Web3.HTTPProvider(SETTING["MAINNET_URL"]))
multiSenderAddr = web3.toChecksumAddress(SETTING["CONTRACT_ADDRESS"])
multiSenderAbi = '你的ABI'

#定义智能合约对象
multi_sender = web3.eth.contract(address=multiSenderAddr, abi=multiSenderAbi)
address_list = [web3.toChecksumAddress(contract_first), web3.toChecksumAddress(contract_last)]

def as_num(x):
    y='{:2f}'.format(x) # 5f表示保留5位小数点的float型
    return(y)

def getPrice():
    #查询两个币种的储备量
    txn = multi_sender.functions.getReserves("这里定义factory", 
        web3.toChecksumAddress(contract_first), 
        web3.toChecksumAddress(contract_last), 
        '这里要定义initCode').call()
    decimal_amount = 1
    i = 0
    while(i < decimal):
        decimal_amount = decimal_amount * 10
        i = i+1
    total = amount * decimal_amount
    amountOut = multi_sender.functions.getAmountOut(total, txn[0], txn[1]).call()
    amountOut = as_num(amountOut)
    return amountOut

ext.getPrice = getPrice


```

> 策略出处

https://www.fmz.com/strategy/289489

> 更新时间

2021-07-05 11:33:51
