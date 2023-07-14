
> Name

幽灵趋势跟踪策略

> Author

陈皮



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|leverage|true|杠杆|
|tickInterval|3000|轮巡间隔时间(毫秒)|
|orderValue|50|下单价值（%）|
|bfCount|168|节点数|
|isFlag|false|反转信号|
|stopSurplus|3|百分比减仓|
|stopSurplusCount|50|减仓量(%)|




|Button|Default|Description|
|----|----|----|
|一键清仓|__button__|一键清仓|
|现货==》合约|10|从现货账户划转USDT到合约账户|
|合约==》现货|10|从合约账户划转USDT到现货账户|


> Source (python)

``` python
import json
import traceback
#SYMBOLS = ['1INCH_USDT','ADA_USDT','ALGO_USDT','ATOM_USDT','AVAX_USDT','AAVE_USDT','AXS_USDT',
#           'BAND_USDT','BCH_USDT','BTC_USDT','COMP_USDT','CHZ_USDT','CRV_USDT','CVC_USDT','DOGE_USDT'
#           ,'DOT_USDT','DYDX_USDT','DASH_USDT','EGLD_USDT','ENJ_USDT','ENS_USDT','EOS_USDT','ETH_USDT',
#           'ETC_USDT','FIL_USDT','FTM_USDT','GALA_USDT','GRT_USDT','IOTA_USDT','ICP_USDT','KSM_USDT',
#           'LINK_USDT','LRC_USDT','LTC_USDT','MANA_USDT','MATIC_USDT','NEAR_USDT','OMG_USDT','SAND_USDT',
 #          'SC_USDT','1000SHIB_USDT','SOL_USDT','SRM_USDT','STORJ_USDT','SUSHI_USDT','THETA_USDT','TRX_USDT',
  #         'UNI_USDT','XRP_USDT','XLM_USDT','XMR_USDT','XTZ_USDT','YFI_USDT','ZEC_USDT','PEOPLE_USDT',
  #         'APE_USDT','GMT_USDT','ZIL_USDT','KNC_USDT']
SYMBOLS = ['1INCH_USDT','ALGO_USDT','ATOM_USDT','AVAX_USDT','AAVE_USDT','AXS_USDT',
           'BAND_USDT','BCH_USDT','BTC_USDT','COMP_USDT','CVC_USDT','DOGE_USDT'
           ,'DOT_USDT','DYDX_USDT','DASH_USDT','EGLD_USDT','ENJ_USDT','ENS_USDT','EOS_USDT','ETH_USDT',
           'ETC_USDT','FTM_USDT','GALA_USDT','GRT_USDT','IOTA_USDT','KSM_USDT',
           'LINK_USDT','LRC_USDT','LTC_USDT','MANA_USDT','MATIC_USDT','NEAR_USDT','OMG_USDT','SAND_USDT',
           'SC_USDT','SOL_USDT','SRM_USDT','SUSHI_USDT','THETA_USDT','TRX_USDT',
           'UNI_USDT','XRP_USDT','XLM_USDT','XMR_USDT','XTZ_USDT','YFI_USDT','ZEC_USDT','PEOPLE_USDT',
           'APE_USDT','ZIL_USDT','KNC_USDT']
#主函数
def main():
    try:
        while True:
            flage = ext.GetStopService()
            if flage == 1:
                break
            #策略交互
            ext.GetCommandService()
            #选币功能
            ext.GetSymbolService()
            #下单信号 
            ext.FirstSignalService()
            #减仓信号
            ext.StopSurplusService()
            #展示数据
            ext.UpdateLogStatusService()
            Sleep(tickInterval)
    except Exception as e:
        Log(traceback.format_exc())
        Log("策略已停止，请及时查看@")
    
#初始化函数        
def init():
    Log("策略开始")
    #设置合约永续
    if len(exchanges) != 2:
        Log("需要设置两组交易对")
        return
    symbolRecord = _G("symbolRecord")
    Log("symbolRecord:",symbolRecord)
    if symbolRecord is not None:
        symbol = symbolRecord['symbol']
        exchange.SetCurrency(symbol) 
    _G("symbolRecord",None)
    exchange.SetContractType("swap")
    exchange.SetMarginLevel(leverage)
    exchanges[1].SetContractType("swap")
    exchanges[1].SetMarginLevel(leverage)
    _G("orderValue",orderValue)
    _G("leverage",leverage)
    _G("bfCount",bfCount)
    _G("symbols",SYMBOLS)
    _G("isFlag",isFlag)
    _G("isUpdate",0)
    _G("stopSurplus",stopSurplus)
    _G("stopSurplusCount",stopSurplusCount)
    Log("所有交易标的：",SYMBOLS)
    if _G("initialTotalMarginBalance") is None:
        info = exchange.GetAccount().Info
        if info is None or info == {}:
            Log("获取不到期货数据，无法运行")
            return
        _G("initialTotalMarginBalance", round(float(info.totalMarginBalance),2))#初始金额
    if _G("drawIn") is None:
        _G("drawIn",0)
    if _G("drawOut") is None:
        _G("drawOut",0)
    ext.ClearAllService()
    
    
#扫尾函数   
def onexit():
     #平仓
    #ext.ClearanceService()
    ext.UpdateLogStatusService()
    #Log("已全部平仓")
    Log("策略已停止")    
    
```

> Detail

https://www.fmz.com/strategy/363409

> Last Modified

2022-10-01 01:51:21
