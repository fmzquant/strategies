'''
策略出处: https://www.botvs.com/strategy/40045
策略名称: 测试
策略作者: 程序员
策略描述:

我的第一个botvs策略，测试

'''

import time
def main():
    while True:
        Log(exchange.GetAccount())
        time.sleep(60)
