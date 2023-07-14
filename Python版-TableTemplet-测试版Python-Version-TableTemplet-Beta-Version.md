
> Name

Python版-TableTemplet-测试版Python-Version-TableTemplet-Beta-Version

> Author

小小梦





> Source (python)

``` python
# TableTemplet
import json
listener = {}

class Table():
    """docstring for Table"""
    def __init__(self):
        self.tb = {
            "type" : "table",
            "title" : "Table",
            "cols" : [],
            "rows" : []
        }

    def SetColRow(self, col_index, row_index, row):
        if (type(col_index) is int) and (type(row_index) is int) :
            if (col_index > len(self.tb["cols"])) or (row_index > len(self.tb["rows"])) :
                Log("索引超出范围！col_index:", col_index, "row_index:", row_index)
            else :
                self.tb["rows"][row_index - 1][col_index - 1] = row
        else :
            Log("col_index:", col_index, "row_index:", row_index)
            raise "SetColRow 参数错误!"

    def SetBtn(self, col_index, row_index, cmd, name, callback):
        global listener
        if (type(col_index) is int) and (type(row_index) is int) :
            if (col_index > len(self.tb["cols"])) or (row_index > len(self.tb["rows"])) :
                Log("索引超出范围！col_index:", col_index, "row_index:", row_index)
            else :
                self.tb["rows"][row_index - 1][col_index - 1] = {"type" : "button", "cmd" : cmd, "name" : name}
                listener[cmd] = callback
        else :
            Log("col_index:", col_index, "row_index:", row_index)
            raise "SetColRow 参数错误!"
    
    def SetRows(self, row_index, Rows):
        pass

    def SetCols(self, Cols):
        self.tb["cols"] = Cols

    def GetRows(self, row_index):
        if (type(row_index) is int) and (row_index < len(self.tb["rows"])) :
            return self.tb["rows"][row_index - 1]
        else :
            Log("参数错误！ 或者 参数索引超出范围！")

    def Init(self, title, col_length, row_length):  
        self.tb["title"] = title
        for i in range(1, row_length + 1) :
            if i == 1 :
                for n in range(1, col_length + 1) :
                    self.tb["cols"].append(n)
            self.tb["rows"].append([])
            for m in range(1, col_length + 1) :
                self.tb["rows"][i - 1].append(str(i) + "/" + str(m))


class CreateTableManager():
    """docstring for CreateTableManager"""
    def __init__(self):        # CreateTableManager 构造函数
        self.tables = []       # 用于储存 table 对象
    
    def GetTable(self, index):
        if type(index) is int :
            return self.tables[index]
        elif type(index) is str :
            for i in range(len(self.tables)) :
                if self.tables[i]["title"] == index:
                    return self.tables[i]
        else :
            Log("GetTable参数:", index)
            raise "GetTable 参数错误！"
    
    def AddTable(self, title, col_length, row_length):    # cols, rows
        tb = Table()
        tb.Init(title, col_length, row_length)
        self.tables.append(tb.tb)
        return tb

    def UpdateCMD(self):
        global listener
        cmd = GetCommand()
        if cmd :
            cmdList = cmd.split(":")
            if len(cmdList) == 2 :                                         # 增加了 对于 主策略 交互的 冲突 检测。
                Log("接收到 TableTemplet 模板以外的 交互命令！", cmdList)     
                return
            if listener[cmd] :
                listener[cmd](cmd)
            else :
                Log("TableTemplet 模板中找不到名为：" + cmd + "的命令")
    
    def LogStatus(self, before, end):
        self.UpdateCMD()
        LogStatus(before + '\n`' + json.dumps(self.tables) + '`\n' + end)

# 导出函数
ext.CreateTableManager = CreateTableManager

# 测试代码

def test1(cmd):        # 用作函数回调
    Log(_D(), cmd)

def main():
    account = exchange.GetAccount()
    array1 = ["aa", "bb", "cc"]
    array2 = [1, 2, 4, 55]

    TbM = ext.CreateTableManager()
    tb1 = TbM.AddTable("tb1", 6, 7)
    
    tb1.SetColRow(3, 4, "hello")
    tb1.SetColRow(3, 5, 12)
    tb1.SetColRow(3, 6, account)
    tb1.SetColRow(3, 7, array1)
    tb1.SetColRow(3, 2, array2)
    tb1.SetBtn(3, 1, "Cover", "平仓", test1)    # 由于 python 没有多行 匿名函数（如JS 的 function(){...}）所以可以声明普通函数传入。
    tb_1 = TbM.GetTable(0)
    tb_2 = TbM.GetTable("tb1")
    Log(tb_1)
    Log(tb_2, "#FF0000")
    tb1_row1 = tb1.GetRows(1)
    Log(tb1_row1)
    tb1_row1[0] = "修改"
    x = 0
    
    # tb2
    tb2 = TbM.AddTable("tb2", 4, 4)

    while True :
        x = x + 1
        tb1_row1[0] = _D()
        tb1.SetCols([x + 1, x + 2, x + 3, x + 4, x + 5, x + 6])
        TbM.LogStatus("begin", "end")
        Sleep(1000)













```

> Detail

https://www.fmz.com/strategy/46031

> Last Modified

2022-03-09 14:03:32
