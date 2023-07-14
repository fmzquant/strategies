
> Name

可变图表示例

> Author

FawkesPan





> Source (python)

``` python
PS = ext.PersistentStorage()
ALPHA = 0.0008
class GraphManager:

    diffs_chart = {
        '__isStock': False,
        'extension': {
            'layout': 'single',
            'height': 300,
            'col': 6
        },
        'chart': {
            'zoomType': 'x'
        },
        'title': {
            'text': '各币种价格与指数的偏离值'
        },
        'subtitle': {
            'text': 'Alpha: %s' % ALPHA
        },
        'xAxis': {
            'type': 'datetime'
        },
        'series': []
    }
    index_chart = {
        '__isStock': False,
        'extension': {
            'layout': 'single',
            'height': 300,
            'col': 6
        },
        'chart': {
            'zoomType': 'x'
        },
        'title': {
            'text': '基准指数值'
        },
        'xAxis': {
            'type': 'datetime'
        },
        'series': [{
            'type': 'line',
            'name': 'INDEX',
            'data': []
        }]
    }
    pos_chart = {
        '__isStock': False,
        'extension': {
            'layout': 'single',
            'height': 300,
            'col': 6
        },
        'chart': {
            'zoomType': 'x'
        },
        'title': {
            'text': '各币种当前持仓价值'
        },
        'subtitle': {
            'text': '以USDT计算'
        },
        'xAxis': {
            'type': 'datetime'
        },
        'series': []
    }
    upnl_chart = {
        '__isStock': False,
        'extension': {
            'layout': 'single',
            'height': 300,
            'col': 6
        },
        'chart': {
            'zoomType': 'x'
        },
        'title': {
            'text': '各币种当前未实现盈亏'
        },
        'subtitle': {
            'text': '以USDT计算'
        },
        'xAxis': {
            'type': 'datetime'
        },
        'series': []
    }

    def __init__(self, reset: bool):
        self.indices = {}
        self.diffs_data = {}
        self.pos_data = {}
        self.upnl_data = {}
        self.index = 1
        self.not_manual_reset = True
        if PS['symbols'] is None or reset:
            echo('图表管理器第一次初始化')
            if reset:
                PS['symbols'] = None
                self.not_manual_reset = False

    def initialize(self, symbols):
        self.symbols = symbols
        self.create_chart()
        if self.symbols != PS['symbols']:
            if self.not_manual_reset:
                echo('币种出现更改，图表重新初始化')
            self.reset_graph()
        PS['symbols'] = self.symbols

    def reset_graph(self):
        self.chart.reset(0)

    def create_chart(self):
        i = 0
        for symbol in self.symbols:
            # DIFF Chart
            self.diffs_chart['series'].append({
                'type': 'line',
                'name': symbol,
                'data': []
            })
            self.indices[symbol+'_diff'] = i
            i+=1
        # INDEX Chart
        self.indices['INDEX_CHART'] = i
        i+=1
        for symbol in self.symbols:
            # POS Chart
            self.pos_chart['series'].append({
                'type': 'line',
                'name': symbol,
                'data': []
            })
            self.indices[symbol+'_pos'] = i
            i+=1
        for symbol in self.symbols:
            # UPNL Chart
            self.upnl_chart['series'].append({
                'type': 'line',
                'name': symbol,
                'data': []
            })
            self.indices[symbol+'_upnl'] = i
            i+=1
        self.chart = Chart([self.diffs_chart, self.index_chart, self.pos_chart, self.upnl_chart])

    def add_diff_data(self, symbol, diff):
        self.diffs_data[symbol] = diff

    def add_pos_data(self, symbol, pos):
        self.pos_data[symbol] = pos

    def add_upnl_data(self, symbol, upnl):
        self.upnl_data[symbol] = upnl

    def add_index_data(self, index):
        self.index = index

    def update_chart(self, timestamp):
        for symbol in self.diffs_data.keys():
            index = self.indices[symbol+'_diff']
            data = self.diffs_data[symbol]
            self.chart.add(index, [timestamp, data])

        for symbol in self.pos_data.keys():
            index = self.indices[symbol+'_pos']
            data = self.pos_data[symbol]
            self.chart.add(index, [timestamp, data])

        for symbol in self.upnl_data.keys():
            index = self.indices[symbol+'_upnl']
            data = self.upnl_data[symbol]
            self.chart.add(index, [timestamp, data])

        index = self.indices['INDEX_CHART']
        self.chart.add(index, [timestamp, self.index])
        self.chart.update([self.diffs_chart, self.index_chart, self.pos_chart, self.upnl_chart])

```

> Detail

https://www.fmz.com/strategy/214723

> Last Modified

2020-06-17 11:27:43
