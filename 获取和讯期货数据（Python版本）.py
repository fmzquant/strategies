'''
策略出处: https://www.botvs.com/strategy/26017
策略名称: 获取和讯期货数据（Python版本）
策略作者: edwardgyw
策略描述:

数狂很早之前写了个js版本的第三方数据获取，我照着他的改写了个python版本的，可以下在云服务器上引入自己的包，这样研究时候也可以用。
update 12.01 和讯接口有变化多了60分钟和周线的信息，原版选择1440会获取60分钟的k线，这里fix了

'''

#coding: utf-8
import urllib2 as url
import json
import time

def hxRecords(instrument,timeFrame=1,size=1,includeLastBar=True,to_df=True):
    ##从和讯获取期货实时数据
    pInst=instrument.lower()
    if pInst[-4]!='1':
        pInst=pInst[:-3]+'1'+pInst[-3:]
    xchg=None
    for i in instList:
        if pInst[:-4] in i['inst']:
            xchg=i['xchg']
    if xchg is None:
        print ("获取K线时发生错误: 找不到合约")
        return None
    tfs=[1,5,15,30,60,'D','W']
    tf=None
    for i in range(len(tfs)):
        if timeFrame==tfs[i]:
            tf=i
    if tf is None:
        print("获取K线时发生错误: K线周期不正确")
        return None
    now=time.localtime()
    timestr=str(now.tm_year+1)+str(12)+str(31)+'000000'
    resp='http://webftcn.hermes.hexun.com/shf/kline?code=' + xchg + pInst + '&start=' + timestr + '&number=-' + str(size) + '&type=' + str(tf)
    try:
        resp=url.urlopen(resp)
        resp=resp.read()[1:-2]
        resp=json.loads(resp)['Data']
    except:
        print '获取K线时发生错误: 不完整的JSON数据'
        return None
    re=[]
    pw=float(resp[4])
    for i in resp[0]:
        res=dict(Time=time.mktime(time.strptime(str(i[0]),'%Y%m%d%H%M%S'))*1000,Open=i[2]/pw,High=i[4]/pw
                ,Low=i[5]/pw,Close=i[3]/pw,Volume=i[6])
        re.append(res)
    if to_df:
        re=pd.DataFrame(re)
        col=[]
        for i in re.columns:
            if i is 'Time':
                i='Date'
            col.append(i.lower())
        re.columns=col
        re['date']=re['date'].map(ts_dt64)
    return re
        

instList = [{
    "xchg": "SHFE",
    "inst": ["fu", "ru", "wr"]
}, {
    "xchg": "SHFE2",
    "inst": ["ag", "au"]
}, {
    "xchg": "SHFE3",
    "inst": ["al", "bu", "cu", "hc", "ni", "pb", "rb", "sn", "zn"]
}, {
    "xchg": "CZCE",
    "inst": ["cf", "fg", "lr", "ma", "oi", "pm", "ri", "rm", "rs", "sf", "sm", "sr", "ta", "wh", "zc"]
}, {
    "xchg": "DCE",
    "inst": ["a", "b", "bb", "c", "cs", "fb", "i", "j", "jd", "jm", "l", "m", "p", "pp", "v", "y"]
}]

def main():
    Log(exchange.GetAccount())

