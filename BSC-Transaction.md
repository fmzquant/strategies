
> Name

BSC-Transaction

> Author

扁豆子

> Strategy Description

就...
最近研究打新, 自动链上转帐...
就... 也没啥, 大家随便玩儿玩儿~
在此公开一哈~
祝大家发财!!

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|my_address|1|my_address|
|to_address|1|to_address|
|contract_coin|BNB|transaction coin|
|contract_address|0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee|transaction coin address|
|transaction_time|1615997422|transaction time|
|private_key|1|private_key|
|send|0.001|amount|
|gas|10|gas|


> Source (python)

``` python

from web3 import Web3
import json
import time
import urllib.request

def transaction(my_address, to_address, contract_address, private_key, send, gas):
    Log("start trans " + contract_coin)
    bsc = "https://bsc-dataseed.binance.org/"
    web3 = Web3(Web3.HTTPProvider(bsc))

    Log(web3.isConnected())

    balance = web3.eth.get_balance(my_address)
    humanReadalbe = web3.fromWei(balance, 'ether')
    Log(humanReadalbe)

    abi = json.loads('[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeSub","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeDiv","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeMul","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeAdd","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}]')

    nonce = web3.eth.getTransactionCount(my_address)

    contract_address = web3.toChecksumAddress(contract_address)
    contract = web3.eth.contract(address=contract_address, abi=abi)

    amount = web3.toWei(send, 'ether')
    Log(amount)

    token_tx = contract.functions.transfer(to_address, amount).buildTransaction({
        'chainId':56, 'gas': 150000,'gasPrice': web3.toWei(gas,'gwei'), 'nonce':nonce
    })
    sign_txn = web3.eth.account.signTransaction(token_tx, private_key=private_key)
    web3.eth.sendRawTransaction(sign_txn.rawTransaction)
    Log("Transaction has been sent to " + to_address)

def transaction_bnb(my_address, to_address, private_key, send, gas):
    Log("start trans " + contract_coin)
    bsc = "https://bsc-dataseed.binance.org/"
    web3 = Web3(Web3.HTTPProvider(bsc))

    Log(web3.isConnected())

    balance = web3.eth.get_balance(my_address)
    humanReadalbe = web3.fromWei(balance, 'ether')
    Log(humanReadalbe)

    nonce = web3.eth.getTransactionCount(my_address)

    tx = {
        'nonce': nonce,
        'to': to_address,
        'value': web3.toWei(send, 'ether'),
        'gas': 150000,
        'gasPrice': web3.toWei(gas, 'gwei')
    }

    try:
        signed_tx = web3.eth.account.signTransaction(tx, private_key)
        tx_hash = web3.eth.sendRawTransaction(signed_tx.rawTransaction)
        trans = web3.toHex(tx_hash)
        Log(trans)
        transaction = web3.eth.get_transaction(trans)
        Log("get " + trans + " status!!")
    except IOError:
        Sleep(100)
        signed_tx = web3.eth.account.signTransaction(tx, private_key)
        tx_hash = web3.eth.sendRawTransaction(signed_tx.rawTransaction)
        trans = web3.toHex(tx_hash)
        Log("get hash error retry!!")
        transaction = web3.eth.get_transaction(trans)
        Log("get " + trans + " status!!")
    else:
        trans_reslut = web3.eth.waitForTransactionReceipt(tx_hash, timeout=30, poll_latency=0.1)
        trans_reslut = web3.toJSON(trans_reslut)
        Log(trans_reslut)
        trans_reslut_status = json.loads(trans_reslut)['status']
        Log(trans_reslut_status)
        if trans_reslut_status == 0:
            Log("trans failed retry!!")
            transaction_bnb(my_address, to_address, private_key, send, gas)


def doAction():
    Log("Start trasaction!!!")
    if contract_coin != 'BNB':
        transaction(my_address, to_address, contract_address, private_key, send, gas)
    else:
        transaction_bnb(my_address, to_address, private_key, send, gas)
    pass
    Log("trasaction Done!!!")

def main():
    LogReset()
    while 1:
        if time.time() > transaction_time:
            Log("Is time to gogogo !!!")
            Log(_D(time.time()))
            doAction()
            exit("End!!!")
        pass


    

```

> Detail

https://www.fmz.com/strategy/263596

> Last Modified

2021-03-23 14:45:49
