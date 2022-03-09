
> 策略名称

使用富途证券SDK条件选股范例

> 策略作者

雨幕

> 策略描述

相关文章：https://www.fmz.cn/bbs-topic/8903



> 源码 (python)

``` python
from futu import *   # 导入富途的SDK软件开发包
import time          # 导入time包用于时间控制
import json          # 导入json包用于JSON字符串的处理

def stockFilter():
    SetErrorFilter("[0-9]{4}")      # 设置错误过滤，过滤掉没必要显示的报错信息
    try:
        quote_ctx = OpenQuoteContext(host='127.0.0.1', port=11111)   # 创建和Futu OpenD软件的连接
        
        # ROA过滤器，构造根据ROA选股的条件结构，注意ROA仅支持年度数据，所以使用FinancialFilter()函数构造
        filter_roa = FinancialFilter()
        filter_roa.filter_min = 0.3       # 设置符合条件的最小ROA
        filter_roa.stock_field = StockField.ROA_TTM   # 设置筛选的数据，这里设置ROA_TTM即针对股票的ROA基本面指标进行筛选
        filter_roa.is_no_filter = False
        filter_roa.quarter = FinancialQuarter.ANNUAL  # 设置为年度数据
    
        # CUR_PRICE过滤器，构造根据当前价格作为选股条件的结构
        filter_curPrice = SimpleFilter()
        filter_curPrice.filter_min = 10     # 设置价格最小
        filter_curPrice.filter_max = 1000   # 设置价格最大
        filter_curPrice.stock_field = StockField.CUR_PRICE   # 设置筛选的数据，这里设置根据当前最新价格筛选
        filter_curPrice.is_no_filter = False
            
        nBegin = 0   # 设置数据起始点
        last_page = False
        ret_list = list()
        # 初始化空的表格结构，用于当前函数返回
        tbl = {
            "type" : "table", 
            "title" : "roa",
            "cols" : ["股票代码", "股票名称", "ROA", "当前价格"],
            "rows" : []
        }
        while not last_page:
            nBegin += len(ret_list)
            # 根据上面构造的 filter_roa 条件、filter_curPrice 条件进行选股，注意market=Market.HK指定市场为港股市场
            ret, ls = quote_ctx.get_stock_filter(market=Market.HK, filter_list=[filter_roa, filter_curPrice], begin=nBegin)  # 根据条件筛选            
            if ret == RET_OK:
                last_page, all_count, ret_list = ls
                for item in ret_list:
                    # 将筛选出来的股票写入tbl结构
                    tbl["rows"].append([item.stock_code, item.stock_name, item[filter_roa], item[filter_curPrice]])
            else :
                Log("error:", ls)
            time.sleep(3)
            
        quote_ctx.close()  # 结束后记得关闭当条连接，防止连接条数用尽
        return tbl        # 返回结果
    except Exception as e:
        Log(e)
    Log("exit")
    
def main():
    # 调用筛选函数
    tbl = stockFilter()
    
    # 将筛选出的股票信息以表格形式显示出来
    LogStatus("`" + json.dumps(tbl) + "`")
```

> 策略出处

https://www.fmz.cn/strategy/343918

> 更新时间

2022-02-07 14:46:52
