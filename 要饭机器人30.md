
> Name

要饭机器人30

> Author

量化多杰

> Strategy Description

思路:
1. 平时网格。
2. 下跌平仓避险。
3. 在避险时，虚拟一个盘，盈利足够了再出来实盘。

（该思路回测下**无法避过大灾大难**，所以开源出来给大家嘲笑嘲笑。）
万一你改改就可以赚钱了呢。

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|UI_AttackRatio|true|金额使用比例|
|UI_NodeCount|20|网格数量|
|UI_AttackThreshold|50|进攻阈值|
|UI_DefenceThreshold|3|防御阈值|


> Source (python)

``` python

#!,encrypt
'''backtest
start: 2022-01-01 00:00:00
end: 2022-01-31 23:59:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"OKX","currency":"ETH_USDT","balance":1000,"stocks":0,"fee":[0.08,0.1]}]
'''

from datetime import datetime, timedelta, timezone
import json

Is_Debug = False
manager = None
debug = None
log = None

def main():
    Log('开始要饭了')
    EnableLog(Is_Debug)
    OnInit()
    while True:
        Sleep(1000)
        manager.LoadData()
        OnCommand()
        manager.OnTick()
        manager.SaveData()
    Log('要饭结束了')

#如果曾经没有数据，则初始化所有数据。
def OnInit():
    #设置重试时间间隔
    _CDelay(600000)
    #过滤网络错误日志
    global Is_Debug
    if Is_Debug == False:
        SetErrorFilter("400:|503:|429:|504:")
    
    global manager
    manager = Manager()

    return

#处理来自UI的交互响应
def OnCommand():
    pass


class Manager:
    Account = None
    Tick = None
    State = ""
    Node_List = []

    BuyPrice = 0
    SellPrice = 0
    Balance = 0
    Stocks = 0
    TickTime = 0
    FrozenBalance = 0
    FrozenStocks = 0

    #防守模式中的盈利次数
    DefenceProfitCount = 0

    ClearOrder = 0

    def Ins():
        global manager
        if manager == None:
            manager = Manager()
        return manager

    def GetInfo(self):
        self.Tick = _C(exchange.GetTicker)
        if self.Tick == None:
            return False
        
        self.Account = _C(exchange.GetAccount)
        if self.Account == None:
            return False
        
        self.SellPrice = self.Tick["Sell"]
        self.BuyPrice = self.Tick["Buy"]
        self.Balance = self.Account["Balance"]
        self.Stocks = self.Account['Stocks']
        self.TickTime = self.Tick['Time']
        self.FrozenBalance = self.Account['FrozenBalance']
        self.FrozenStocks = self.Account['FrozenStocks']
        return True

    def OnTick(self):
        if self.GetInfo() == False:
            return

        if self.State == "":
            #第一次运行
            MyLog.Ins().StartTime = self.TickTime
            MyLog.Ins().StartMoney = self.TotalMoney()
            self.ToAttack()
        else:
            MyLog.Ins().PrintLog()

        if self.State == "平仓":
            self.ClearTick()
            return

        if self.State == '防守':
            if self.DefenceProfitCount >= UI_AttackThreshold:
                MyLog.Write("防守计分足够，进入进攻模式。")
                self.ToAttack()
                return

        if len(self.Node_List) == 0:
            #仓位空，原地买
            node = Node.Buy(self.SellPrice, self.GetBuyNumber())
            if node != None:
                self.Node_List.append(node)
                last_node = Node.Buy(Node.MinLeftPrice(), self.GetBuyNumber())
                if last_node != None:
                    self.Node_List.insert(0, last_node)
            return

        if Node.CenterNode() != None:
            #我在节点中间
            if self.NodeCheck(Node.CenterNode()):
                #检查自己
                return
            
            index = Manager.Ins().Node_List.index(Node.CenterNode())
            if index > 0:
                #说明左边有节点
                left = self.Node_List[index-1]
                #问问节点
                if self.NodeCheck(left):
                    return
                #问问买单
                if Node.CenterNode()['buy_order'] == 0:
                    self.NodeBuy(Node.CenterNode())
                    MyLog.AddBuyBuyTimes()
                    return
            else:
                #说明左边没节点
                if len(self.Node_List) < UI_NodeCount:
                    #那就建一个节点
                    left_node = Node.Buy(Node.CenterNode()['buy_price'] * 0.995, self.GetBuyNumber())
                    if left_node != None:
                        self.Node_List.insert(0, left_node)
                    MyLog.AddBuyBuyTimes()
                    return

            #再看看右边有没有
            if index < len(self.Node_List) - 1:
                right = self.Node_List[index + 1]
                if self.NodeCheck(right):
                    return
                #右边的，不用下买单，不然会亏

        if self.SellPrice < Node.MinPrice():
            #重新检查自己是不是在所有节点左边
            if len(self.Node_List) >= UI_NodeCount:
                #看看高位有没有垃圾仓
                if Node.HasSell(Node.MaxNode()) == False:
                    #再看看买单是不是成功了，以防万一
                    if Node.CheckBuy(Node.MaxNode()) == False:
                        #这是个垃圾单，可以删除
                        Node.NodeClear(Node.MaxNode())
                        self.Node_List.remove(Node.MaxSellPrice)
                        return
                #平仓
                MyLog.Write("节点在最左边，并且仓位满了，平仓" + "当前价格：" + str(self.SellPrice))
                self.ToClear()
                return
            else:
                #贴边买一个
                MyLog.Write("节点在最左边，仓位没好，买一单" + "当前价格：" + str(self.SellPrice))
                new_node = Node.Buy(Node.MinLeftPrice(),self.GetBuyNumber())
                if new_node != None:
                    self.Node_List.insert(0,new_node)
                MyLog.AddBuyBuyTimes()
                return

        if self.SellPrice > Node.MaxSellPrice():
            #我在所有节点的右边
            #看看满了没，没满就下单，满了就减仓
            if len(self.Node_List) >= UI_NodeCount:
                #满了，减仓
                if Node.HasSell(Node.MinNode()) == False:
                    if Node.HasBuy(Node.MinNode()) == False or Node.CheckBuy(Node.MinNode()) == False:
                        MyLog.Write("突然暴涨，单还满了，减个仓" + "。当前价格：" + str(self.SellPrice))
                        Node.NodeClear(Node.MinNode())
                        self.Node_List.remove(Node.MinNode())
                        return
                self.NodeCheck(Node.MinNode())
            else:
                #下单，贴
                MyLog.Write("突然暴涨，单没满，从下往上补仓位" + "当前价格：" + str(self.SellPrice))
                new_node = Node.Buy(Node.MaxSellPrice(), self.GetBuyNumber())
                if new_node != None:
                    self.Node_List.append(new_node)


    def NodeBuy(self,_node):
        node = Node.Buy(_node['buy_price'], self.GetBuyNumber())
        if node == None:
            return None
        _node['buy_order'] = node['buy_order']
        _node['state'] = node['state']
        _node['number'] = 0
        
        return _node

    def NodeCheck(self,_node):
        if Node.HasSell(_node):
            #我有卖单,检查卖单
            if Node.CheckSell(_node):
                MyLog.Write("我所处的节点卖好了。" + "当前价格：" + str(self.SellPrice))
                MyLog.Ins().WriteProfit(Node.GetProfit(_node))
                Node.Reset_Node(_node)
                MyLog.Ins().BuyBuy_Count = 0#重新计数
                return True
        else:
            if Node.HasBuy(_node):
                if Node.CheckBuy(_node):
                    Node.Sell(_node)
                    return True
        return False

    def DelEmptyNode(self,_node):
        self.Node_List.remove(_node)
        Node.NodeClear(_node)
        return

    #处理卖掉的节点。
    def DelSellNode(self,_node):
        self.Node_List.remove(_node)
        MyLog.Ins().WriteProfit(Node.GetProfit(_node))
        return


    #平仓
    def ClearTick(self):
        #收集清单，逐一取消
        MyLog.Write("平仓运行中")
        orders = exchange.GetOrders()
        if len(orders) > 0:
            MyLog.Write("未处理订单大于0，取消订单")
            for _o in orders:
                Node.CancelOrder(_o['Id'])
            return
        self.Node_List.clear()
        #统计仓位，统一售卖
        if self.Stocks + self.FrozenStocks > 50 / self.BuyPrice:
            MyLog.Write("有持仓，卖掉")
            if self.ClearOrder == 0:
                #售卖
                MyLog.Write("有持仓，数量：" + str(_N(self.Stocks,4)) + "。 卖价：" + str(_N(self.BuyPrice * 0.999,4)))
                order_id = exchange.Sell(self.BuyPrice * 0.999, self.Stocks)
                if order_id == None:
                    MyLog.Write("奇怪的错误产生了，160行左右。")
                    return
                self.ClearOrder = order_id
                Sleep(100000)
                return
            else:
                order = _C(exchange.GetOrder,self.ClearOrder)
                if order['Status'] != 1:
                    MyLog.Write("订单没有卖掉，重新换价格")
                    Node.CancelOrder(self.ClearOrder)
                    self.ClearOrder = 0
                    return
                elif order['Status'] == 1:
                    MyLog.Write("订单卖掉了，退出平仓模式")
                    self.ClearOrder = 0

                #无限循环，直到卖完币
        
        #当清单为0，仓位为0，则进入防守模式。
        self.ToDefence()

    #转移到防守阶段
    def ToDefence(self):
        MyLog.Write('进入防守')
        if self.State == "平仓":
            MyLog.Ins().Defence_Count += 1
        MyLog.Ins().StateWrite("防守",self.State)
        self.State = "防守"
        self.DefenceProfitCount = 0
    
    #转移到进攻阶段
    def ToAttack(self):
        MyLog.Write('进入进攻模式')
        MyLog.Ins().StateWrite("进攻",self.State)
        MyLog.Ins().Attack_Count += 1
        self.State = "进攻"
        self.Node_List.clear()

    #转移到平仓阶段
    def ToClear(self):
        MyLog.Write('开始平仓')
        if self.State == "防守":#如果来自于防守模式，不用平仓，直接重新进入防守模式。
            self.Node_List.clear()
            self.ToDefence()
            return
        MyLog.Ins().StateWrite("平仓",self.State)
        self.State = "平仓"
        self.ClearOrder = 0

    def LoadData(self):
        MyLog.Ins().LoadData()
        if MyLog.Ins().StartTime == None:
            #第一次运行，不加载后续数据了
            return
        self.Node_List = json.loads(_G('Node_List'))
        self.State = _G("State")
        self.DefenceProfitCount = _G('DefenceProfitCount')
        self.ClearOrder = _G('ClearOrder')

    def SaveData(self):
        MyLog.Ins().SaveData()
        _G("Node_List",json.dumps(self.Node_List))
        _G("State",self.State)
        _G("DefenceProfitCount",self.DefenceProfitCount)
        _G("ClearOrder",self.ClearOrder)
    
    def TotalMoney(self):
        return self.Balance + self.FrozenBalance + (self.Stocks + self.FrozenStocks) * self.BuyPrice

    def GetBuyNumber(self):
        number = self.TotalMoney() * UI_AttackRatio / UI_NodeCount / self.SellPrice
        #去掉太多的精度
        return _N(number,4)

class Node:

    #创建一个数据并返回
    def CreateNodeData(_state):
        data = {}
        data['state'] = _state
        data['buy_price'] = 0
        data['sell_price'] = 0
        data['buy_order'] = 0
        data['sell_order']=0
        data['number'] = 0
        return data

    #Node还要用，重置下
    def Reset_Node(_node):
        _node['number'] = 0
        _node['buy_order'] = 0
        _node['sell_order'] = 0


    def Buy(_price,_number):
        MyLog.Write('买单，价格：' + str(_price) + '. 数量：' + str(_number) + "。 价值：" + str(_N(_number * _price,2)))
        if Manager.Ins().State == "进攻":
            buy_id = exchange.Buy(_price, _number)
            if buy_id == None:
                return None
        else:
            buy_id = 1
        node = Node.CreateNodeData(Manager.Ins().State)
        node['state'] = Manager.Ins().State
        node['buy_price'] = _price
        node['sell_price'] = _price * 1.005
        node['buy_order'] = buy_id
        node['number'] = 0

        return node

    def HasBuy(_node):
        return _node['buy_order'] != 0

    def HasSell(_node):
        return _node['sell_order'] != 0
    
    #查看这个节点是不是右边的节点
    def IsRight(_node):
        right_price = Manager.Ins().SellPrice * 1.005
        if right_price > _node['buy_price'] and right_price < _node['sell_price']:
            return True
        return False

    def IsLeft(_node):
        right_price = Manager.Ins().SellPrice * 0.995
        if right_price > _node['buy_price'] and right_price < _node['sell_price']:
            return True
        return False

    def CenterNode():
        for node in Manager.Ins().Node_List:
            if Manager.Ins().SellPrice > node['buy_price'] and Manager.Ins().SellPrice < node['sell_price']:
                return node
        return None

    def MaxNode():
        return Manager.Ins().Node_List[-1]

    def MaxBuyPrice():
        return Node.MaxNode()['buy_price']

    def MaxSellPrice():
        return Node.MaxNode()['sell_price']

    def MaxHasSell():
        return Node.MaxNode()['sell_order'] != 0

    def MinNode():
        return Manager.Ins().Node_List[0]

    def MinPrice():
        return Manager.Ins().Node_List[0]['buy_price']

    def MinLeftPrice():
        return _N(Node.MinPrice() * 0.995,4)

    #检查买单是否OK
    def CheckBuy(_node):
        if _node['state'] == "防守":
            _node['number'] = 1
            return True
        order = _C(exchange.GetOrder,_node['buy_order'])
        if order['Status'] == 1:
            _node['number'] = order['DealAmount']
            return True
        return  False

    def MinSellPrice():
        return Manager.Ins().Node_List[0]['sell_price']

    def MinHasSell():
        return Manager.Ins().Node_List[0]['sell_order'] != 0
    
    def Sell(_node):
        MyLog.Write('卖单，价格：' + str(_node['sell_price']))
        if _node['state'] == "防守":
            _node['sell_order'] = 1
            return True
        # 仓位判断，容差
        # if Manager.Ins().Stocks < _node['number']:
        #     _node['number'] = Manager.Ins().Stocks
        
        order_id = exchange.Sell(_node['sell_price'], _node['number'])
        if order_id == None:
            return False
        _node['sell_order'] = order_id
        return True

    def CheckSell(_node):
        if _node['state'] == "防守":
            if Manager.Ins().BuyPrice > _node['sell_price']:
                return True
            return False
        
        order = _C(exchange.GetOrder,_node['sell_order'])
        #再次精准仓位
        if order['Status'] == 1:
            return True
        return False

    def GetProfit(_node):
        value = (_node['sell_price'] - _node['buy_price']) * _node['number']
        return _N(value,2)
    
    def NodeClear(_node):
        if _node['state'] == "防守":
            return

        if _node['sell_order'] != 0:
            Node.CancelOrder(_node['sell_order'])
        if _node['buy_order'] != 0:
            Node.CancelOrder(_node['buy_order'])

    #确保订单取消成功
    def CancelOrder(_id):
        MyLog.Write('取消订单:' + str(_id))
        while True:
            order = _C(exchange.GetOrder,_id)
            if order['Status'] == 1:
                return True
            if order['Status'] != 2:
                result = exchange.CancelOrder(_id)
                if result == True:
                    return True
                Sleep(1000)
            elif order['Status'] == 2:
                return True


class MyLog:
    #第一次运行的时间
    StartTime = 0
    StartMoney = 0
    Profit_List = []
    State_List = []
    Log_Tables = []

    Attack_Count = 0
    Defence_Count = 0
    Exchange_Count = 0

    #当期网格收益
    StateProfit = 0

    #连续购买计数
    BuyBuy_Count = 0
    BuyBuyClear_Count = 0

    def Ins():
        global log
        if log == None:
            log = MyLog()
        
        return log
    
    def LoadData(self):
        self.Log_Tables = []
        self.StartTime = _G("StartTime")
        if self.StartTime == None:
            return
        
        self.StartMoney = _G("StartMoney")
        self.Profit_List = json.loads(_G("Profit_List"))
        self.State_List = json.loads(_G("State_List"))
        self.Attack_Count = _G("Attack_Count")
        self.Defence_Count = _G("Defence_Count")
        self.Exchange_Count = _G("Exchange_Count")
        self.StateProfit = _G("StateProfit")
        self.BuyBuy_Count = _G("BuyBuy_Count")
        self.BuyBuyClear_Count = _G("BuyBuyClear_Count")

    def SaveData(self):
        _G("StartTime",self.StartTime)
        _G("StartMoney",self.StartMoney)
        _G("Profit_List",json.dumps(self.Profit_List))
        _G("State_List",json.dumps(self.State_List))
        _G("Attack_Count",self.Attack_Count)
        _G("Defence_Count",self.Defence_Count)
        _G("Exchange_Count",self.Exchange_Count)
        _G("StateProfit",self.StateProfit)
        _G("BuyBuy_Count", self.BuyBuy_Count)
        _G("BuyBuyClear_Count", self.BuyBuyClear_Count)

    def WriteProfit(self,_value):
        if Manager.Ins().State == "防守":
            #Log("防守计分一次")
            Manager.Ins().DefenceProfitCount += 1
            return

        #Log("感谢好心人，给了我" + str(_value) + "USDT。")
        self.StateProfit += _value
        self.Exchange_Count += 1
        data = []
        #日期，利润，当前浮亏,当前币价
        data.append(self.GetTimeStr(Manager.Ins().TickTime))
        data.append(_value)
        data.append(_N(Manager.Ins().TotalMoney() - self.StartMoney,2))
        data.append(_N(Manager.Ins().BuyPrice,2))
        if len(self.Profit_List) > 10:
            self.Profit_List.pop()
        self.Profit_List.insert(0,data)
        #利润日志
        LogProfit(_N(Manager.Ins().TotalMoney() - self.StartMoney,2))

    def AddBuyBuyTimes():
        MyLog.Ins().BuyBuy_Count += 1
        if MyLog.Ins().BuyBuy_Count >= UI_DefenceThreshold and Manager.Ins().State == "进攻":
            MyLog.Write("达到了连续购买阈值，进入防守模式")
            if Manager.Ins().State == "进攻":
                MyLog.Ins().BuyBuyClear_Count += 1
            Manager.Ins().ToClear()


    def GetTimeStr(self,_time):
        utc_dt = datetime.utcfromtimestamp(_time/1000)
        cn_dt = utc_dt.astimezone(timezone(timedelta(hours=8)))
        d = cn_dt.strftime('%Y-%m-%d %H:%M:%S')
        return d
    
    def GetRunDays(self):
        now_date = datetime.utcfromtimestamp(Manager.Ins().TickTime/1000)
        start_date = datetime.utcfromtimestamp(self.StartTime/1000)
        span = now_date - start_date
        run_time = span.days
        if run_time < 1:
            run_time = 1
        return run_time

    def GetToTalProfit(self):
        return Manager.Ins().TotalMoney() - self.StartMoney

    def GetAnnualized(self):
        a = self.GetToTalProfit() / self.GetRunDays() * 365 / self.StartMoney * 100
        return _N(a,2)

    def PrintLog(self):
        #基础信息表
        rows = []
        rows.append(["当期启动时间：",self.GetTimeStr(self.StartTime)])
        rows.append(["当期初始资金：", self.StartMoney])
        rows.append(["当前总仓：", _N(Manager.Ins().TotalMoney(),4)])
        rows.append(["当前利润：",_N(self.GetToTalProfit(),4)])
        rows.append(["当前年化：",str(self.GetAnnualized()) + "%"])
        rows.append(["当前持币:",_N(Manager.Ins().Stocks,4)])
        rows.append(["当前锁币：", _N(Manager.Ins().FrozenStocks,4)])
        rows.append(["钱包剩余：", _N(Manager.Ins().Balance,4)])
        rows.append(["钱包冻结：", _N(Manager.Ins().FrozenBalance,4)])
        rows.append(['当前状态：',Manager.Ins().State])
        rows.append(["防御次数：", self.Defence_Count])
        rows.append(["强平次数：", self.BuyBuyClear_Count])
        self.Add_Log_Table("基础信息",["项目","内容"], rows)
        #Log(json.dumps(rows))
        #构建并添加仓位表
        n_list = []
        for _node in Manager.Ins().Node_List:
            n = []
            n.append(_node['buy_price'])
            n.append(_node['buy_order'])
            n.append(_node['sell_price'])
            n.append(_node['sell_order'])
            n.append(_node['number'])
            n_list.append(n)
        global Is_Debug
        if Is_Debug:
            self.Add_Log_Table("仓位信息",['买价','买单',"卖价","卖单","仓位数量"],n_list)
        #添加利润表
        self.Add_Log_Table("收益记录",["时间","利润","当前浮亏","当前币价"], self.Profit_List)
        #添加状态表
        self.Add_Log_Table("状态表",["时间","进入状态","上一个状态","当前币价","当前盈利","上期网格收益","上期成交数"],self.State_List)
        #调参日志
        
        LogStatus('`' + json.dumps(self.Log_Tables) + '`')
    
    def StateWrite(self,_name,_lastname):
        #时间，状态，上一个状态，此时市场价，此时盈利
        data = [self.GetTimeStr(Manager.Ins().TickTime), _name, _lastname, _N(Manager.Ins().SellPrice,2), _N(self.GetToTalProfit(),2),_N(self.StateProfit,2),self.Exchange_Count]
        self.State_List.insert(0, data)

        if len(self.State_List) >= 100:
            self.State_List.pop()
        
        self.StateProfit = 0
        self.Exchange_Count = 0
        self.BuyBuy_Count = 0

    def Add_Log_Table(self, _title, _cols, _rows):
        table = {
            "type" : "table", 
            "title" : _title, 
            "cols" : _cols, 
            "rows" : _rows
        }
        self.Log_Tables.append(table)

    def Write(_str):
        global Is_Debug
        if Is_Debug:
            Log(str(_str))
```

> Detail

https://www.fmz.com/strategy/377408

> Last Modified

2022-10-06 14:58:03
