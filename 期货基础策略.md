
> Name

期货基础策略

> Author

s2696922797c



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|contract|AP101|合约代码|
|direction|0|方向: 做多|做空|
|amount|true|数量|
|cost|false|成本|
|stopProfit|false|止盈|
|stopProfitPriceDifference|30|止盈差价|
|stopLoss|false|止损|
|stopLossPriceDifference|10|止损差价|
|advanced|false|显示高级设置|
|openRange|5|可开仓的价格区间|
|closeRange|5|可平仓的价格区间|
|openingTime|300000|开仓计时（ms）|
|endTime|180000|交易结束计时（ms）|
|lingerTime|300000|徘徊计时（ms）|
|lingerLossRatio|30|徘徊止损率（%）|
|lingerLossPriceDifference|5|徘徊止损差价|
|overnight|false|是否隔夜|
|whetherToCatchUp|false|是否追高|




|Button|Default|Description|
|----|----|----|
|stop|__button__|停止运行|
|changeStopProfit|false|更改止盈位|


> Source (javascript)

``` javascript
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function toFixed(value) {
  var fractionDigits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  return _N(value, fractionDigits);
}

function getLatestTime(timestamp, endTimestamp) {
  var latestTimestamp = Math.floor((endTimestamp || new Date().getTime()) / 1000);
  var differentTimestamp = latestTimestamp - timestamp;
  var yearDivisions = 60 * 60 * 24 * 365;
  var years = Math.floor(differentTimestamp / yearDivisions);
  var monthDivisions = 60 * 60 * 24 * 30;
  var months = Math.floor(differentTimestamp % yearDivisions / monthDivisions);
  var dayDivisions = 60 * 60 * 24;
  var days = Math.floor(differentTimestamp % monthDivisions / dayDivisions);
  var hourDivisions = 60 * 60;
  var hours = Math.floor(differentTimestamp % dayDivisions / hourDivisions);
  var minutes = Math.floor(differentTimestamp % hourDivisions / 60);
  var seconds = Math.floor(differentTimestamp % 60);
  return {
    years: years,
    months: months,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };
} // 0 -> 00


function addZero(value) {
  return ('00' + value).substr(-2);
}

function getDifferenceTime(timestamp) {
  var usedTime = getLatestTime(timestamp / 1000);
  var result = [];

  if (usedTime.years) {
    result.push("".concat(usedTime.years, " \u5E74"));
  }

  if (usedTime.months) {
    result.push("".concat(addZero(usedTime.months), " \u6708"));
  }

  if (usedTime.days) {
    result.push("".concat(addZero(usedTime.days), " \u65E5"));
  }

  result.push("".concat(addZero(usedTime.hours), " \u5C0F\u65F6 ").concat(addZero(usedTime.minutes), " \u5206\u949F ").concat(addZero(usedTime.seconds), " \u79D2"));
  return result.join(' ');
}

var Icons = {
  // 开仓
  // 开多
  BUY: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7klEQVQ4T2NkoBAwUqifYRAbULPtpTIDA/MckBf//2eY0OotshGbd7F6oWHVK54/3Ew7GRgYrCCaGN8xMjA6NHsLXUY3BKsBtVverPvPyBCIpvj0bzYm105XoY/I4hgG1Gx5M42BkSETa+wwMq5o8RKOxGlAzba3tQz//zfhi1pGBoaOZm+RSpgauAtqtr1NZfj/fxZR6YKRIavFS2Q6OHRARO2W18b/GRnPEKUZpujff8cWX9EDYAOqt76JZWRgWESiAY0tvqINYAPKNr7mZWNh3M/AwGBMlCGMjFf//2NIa/URPjaIkzJRXgEqAgBpXEARSuFtxgAAAABJRU5ErkJggg==)',
  // 开空
  SELL: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABOklEQVQ4T2NkoBAwUqifgToGVG95a8XI+P8oKa5h+fqPtyFM7AvYBTWbXzf8Z2TgbvURLSXGkJqtbyYw/v9/rdlHdBbMAAcGJsb9DIx/VVq8xO/iM6Rm+2t1hn9MKxn+/Sto8RU9AA+Dmq1vsv8zMOR8YnxvMNlL9Sc2Qxr2/+f58+3tPgYmxpktnsJzQWpQArFmy+seBkZG5RZvkUBsBtRsfXvk//+/21p9xNpg8hixULP1zVqG///vt/iIliAbUrvtzZ5//xmutnqL5COLYxjQsP69wB+2v/sYGBgXt3gL94MU1257s46BgeFPs5dIGLrLsKaDqq2vDJgYmPb9Z/yXyfCfyYiRkdHqB/Nvjx53ia9EGQBSVLf1jf8/BsZiRsb/L5j//a1o8BG/hy1cqJMSiUk8uNQMvAsAnnptEci17kgAAAAASUVORK5CYII=)',
  // 平空
  // 止损
  CLOSE_BUY_LOSS: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA8UlEQVQ4T2NkoBAwUqifYRAbIPtDR/kP0985IC8yMjFOeMZybSM272L1gugrLR5Wgf87GRgYrMCaGBneMf377/CE/cZldEOwGiD1U3MdAyNDILJiRob/p9lZf7neY7z3EVUczUipX5rTGBgYMnHEzopnbNcjcRog/Vuz9v9/hia8UfufseMZ+7VKmBq4FyR/aaQyMjDOIiZdMDIwZD1luz4dEjwMDAySvzSMGRkYzxCjGabm39//ji84bxyAGqAZy8jAsIgUAxj+/298xn6jAWyAyGt1XjZ+pv0MDAzGRBpylYHxf9oz1hvHBnFSJtIrDADWe0ARSpCCcQAAAABJRU5ErkJggg==)',
  // 止盈
  CLOSE_BUY_PROFIT: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA8UlEQVQ4T2NkoBAwUqifYRAbcFmWXZmV4d8ciBcZJ2g8/rURm3exeuGqKAMPMyfbTgYGBiuopnf//zE4aD75dRndEKwGXJdlW8fIyBCIpvg0K8svV+V7DB+RxTEMuCHPPo3h//9MbM79z8iwQvPhr0icBtyQZ6tl+M/QhC9q/zMwdGg++lUJUwN3wU051tT/DIyziEoX//9naTz+PR0cvCDiuhyrMSMD4xmiNEMV/f/3z1HzyZ8DYANuyrHG/mdgXESSAQwMjZqPfjWADbghwsDLwMW2n4GBwZgYQxgZGK7+Y/yXpvnwz7FBnJSJ8QpIDQCM40IR09WjKAAAAABJRU5ErkJggg==)',
  // 平多
  // 止损
  CLOSE_SELL_LOSS: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABPElEQVQ4T8WSP0vDUBTFz21sUv+BiyKvi6DQJFNx7OToJi5+B1FQUMHRyUnQVcHJyUFHJ4kO+gWKJgGrDmLa4uKgaF6aXDGgVBsl0oJ3fPe83zucdwhtDrV5H50BiEAvgen8L26CR+p/GLKfYgfC19cA9Hqau5IGkpfGVgS2q6q7EwOGX/SJjEInSqSM3eUurn+DiNdCARnaj0Is1rrd088MhDTmAJrvycpihSp+EmSQzT41iCwGbXuqs/uu+RKikPoGmEY9zZlOAghpnjHjqKrZ6x/7ll/I+8YBE996qrvcDBGBcQzmS091F5rPWwAjXByQgW8RsHevOptxyIFxCKDhZZ2Z784Se5CXZpHBFhizAMaRQSnsyk7WqfycChC/2jCnEPESCLUwbKzWc1c3Sbl0polpyvOT5v8dvAH+vGoRgOAa0AAAAABJRU5ErkJggg==)',
  // 止盈
  CLOSE_SELL_PROFIT: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABPElEQVQ4T8WSvy8DYRjHv8/b3nsEicXmrhWqdzFojJ2MNrH4H4SEBInRZJKwkphMBkaTlIHZVHdN/EjvDH4kJsJ7V32kFVJ6pNImnvF9vu8n33yfL6HJoSb/ozUAJxHPEouTv7h5fQ66hu7xWHXgmHKZGB2WHyw2AnFNbZ2BM9sLN98BvfFREuIwxjSQ8tXFbxC3T0+jxDvM5Tn7unT0mUEhoU8z80xMBpnUOVQU5K4HnQ/tMgfiDasYblU0X0IsGNoqC+q3isFEFMA19WNm3rf9YOVjX3cFx5C7AF/ZfrhQC3FN7QBA3vLC2dr3OsBpEt1tZZkTTNtpX61VMzLkHhFKlhdMfncW2YN8UsuIMuWYMSUIIwBllVJjw7d4aghQEbmGHAfRPMA3AmJp0Hu5jMqlNU1spDw/af7fwRvwGmgRmVhXuQAAAABJRU5ErkJggg==)',
  // 取消
  CANCELED: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAsElEQVQ4T2NkoBAwUqifYRAacEOOdR8zA2OO6qNf15C9d1uOTesvw/8pGo9+OyGLY3jhqgyrOTMT4xxmBoZwmCEgzf8YGFYxMTCEoRuMNQwgtjGsBBkCsg2XZpAczkCEGrKBkYGBkYmBwR/dZpg38Brwj4Fh4z8Ghv8sDAwBJBmA7GeQTX8YGFayIIUJ3kDEFmBQ76xgZmCIIBiIN2RZ9zMzMmaTHY2kJu1BmJRJ9QIAicZLEfZkk5wAAAAASUVORK5CYII=)',
  // 未成交
  PENDING: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA0UlEQVQ4T7WTPQrCUBCEZ8lNbIS8IY1i5Q1ESy9g5yXUS9h5AUvRG1iJNmEi2HiTEIkkkMSA0ZBXLrvfm9kfQ8tnLevRHSAIglkcx71Uoed5zzAMD3VqaxWQ3APoA7hnRT6Ah6R5FfIBIHkFcJS0LiaTXAGYShoW4yUAyQmAlaRRmkTyDclhJC8ANpJOOaQEcM4tzWwgaVEAJAAshZDcJUlyi6Jo2wjgnPPN7O27EaBqodqwrxYy2f83Mf+xMMZzFhs3HmMOabVIv9xHd7fQVMUL10xlEcsMYLsAAAAASUVORK5CYII=)'
};
/**
 * 记录订单，更新订单状态，输出订单
 */

var TradingOrder = /*#__PURE__*/function () {
  function TradingOrder() {
    _classCallCheck(this, TradingOrder);

    _defineProperty(this, "_orders", new Map());

    _defineProperty(this, "_orderIdStack", []);
  }

  _createClass(TradingOrder, [{
    key: "record",
    // 记录订单
    // 更新
    value: function record(id, data) {
      this._orders.set(id, data);

      if (this._orderIdStack.includes(id)) {
        return;
      }

      this._orderIdStack.unshift(id);
    } // 获取订单
    // 没有 ID 获取全部

  }, {
    key: "query",
    value: function query(id) {
      var _this = this;

      if (id) {
        return this._orders.get(id);
      }

      return this._orderIdStack.map(function (orderId) {
        return _this._orders.get(orderId);
      });
    }
  }]);

  return TradingOrder;
}();

var YuQue = /*#__PURE__*/function () {
  function YuQue() {
    _classCallCheck(this, YuQue);

    _defineProperty(this, "services", new $.YuQueService({
      token: 'QsfjcCLQE8Fida36QhCcBtjvSvaxGlYqlWL0RUzL',
      namespace: 'cfmw/tlb6s3'
    }));
  }

  _createClass(YuQue, [{
    key: "createDoc",
    value: function createDoc(title, body, context) {
      var markdown = new $.MarkDown({
        context: context
      });
      var data = {
        title: title,
        body: markdown.generate(body)
      };

      if (IsVirtual()) {
        return;
      }

      return this.services.createReposDocs(data);
    }
  }]);

  return YuQue;
}();

var Info = /*#__PURE__*/function () {
  function Info(strategy) {
    _classCallCheck(this, Info);

    _defineProperty(this, "chart", null);

    this.strategy = strategy;
  }

  _createClass(Info, [{
    key: "printTable",
    value: function printTable() {
      var _this2 = this;

      var positions = this.strategy.contract.getPositions();
      var tables = []; // 平仓之后

      if (this.strategy.isClosedPosition) {
        var label = _C(exchange.GetLabel);

        var account = _C(exchange.GetAccount);

        tables.push([[{
          '期货公司': label,
          '开仓前余额': toFixed(this.strategy.beforeBalance),
          '平仓后余额': toFixed(account.Balance),
          '单子盈亏': toFixed(account.Balance - this.strategy.beforeBalance)
        }], {
          title: '账户'
        }]);
        var _directionNames = ['多单', '空单'];
        var detail = this.strategy.contract.detail;
        var commission = $.Commission.query(detail.ProductID);
        var priceDifferenceFunctions = [this.strategy.averageClosingPrice - this.strategy.averageOpeningPrice, this.strategy.averageOpeningPrice - this.strategy.averageClosingPrice];
        var totalCommission = toFixed((commission.openCommission + commission.closeTodayCommission) * this.strategy.openedAmount);
        var profitAndLoss = toFixed(priceDifferenceFunctions[direction] * this.strategy.openedAmount * detail.VolumeMultiple);
        this.strategy.profitAndLoss = profitAndLoss;
        tables.push([[{
          '合约名称': contract,
          '多空': _directionNames[direction],
          '开仓均价': this.strategy.averageOpeningPrice,
          '平仓均价': this.strategy.averageClosingPrice,
          '盈亏': profitAndLoss,
          '手续费': totalCommission,
          '预估盈亏（去手续费）': toFixed(profitAndLoss - totalCommission)
        }], {
          title: '汇总'
        }]);
      }

      if (positions.length) {
        var _directionNames2 = ['多头', '空头', '昨日多头', '昨日空头'];
        tables.push([positions.map(function (position) {
          var priceDifferenceFunctions = [function () {
            return _this2.strategy.ticker.Last - position.Price;
          }, function () {
            return position.Price - _this2.strategy.ticker.Last;
          }, function () {
            return _this2.strategy.ticker.Last - position.Price;
          }, function () {
            return position.Price - _this2.strategy.ticker.Last;
          }];
          var priceDifference = priceDifferenceFunctions[position.Type]();
          var avgPrice = position.AvgPrice || position.Price;
          var totalPrice = avgPrice * position.Amount;
          return {
            '合约名称': position.ContractType,
            '多空': _directionNames2[position.Type],
            '可用/总仓': "".concat(position.Amount - position.FrozenAmount, "/").concat(position.Amount),
            '开仓均价': position.AvgPrice || position.Price,
            '浮动盈亏': position.Profit,
            '价差': priceDifference,
            '保证金': position.Margin,
            '盈亏比例': "".concat(toFixed(position.Profit / totalPrice) * 100, "%")
          };
        }), {
          title: '持仓'
        }]);
      }

      var directionNames = [['开多', '开空'], ['平空', '平多']];
      var statusNames = ['未完成', '已经完成', '已经取消', '其他状态'];
      tables.push([this.strategy.tradingOrder.query().map(function (order) {
        return {
          '合约名称': order.ContractType,
          '状态': statusNames[order.Status],
          '方向': directionNames[order.Offset][order.Type],
          '委托价': order.Price,
          '委托量': order.Amount,
          '已成交': order.DealAmount,
          '已撤单': order.Status === $.ContractTrade.OrderStatus.ORDER_STATE_CANCELED ? order.Amount - order.DealAmount : 0,
          '委托时间': _D(order.Time)
        };
      }), {
        title: '委托'
      }]);
      tables.push([this.strategy.messages.map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            timestamp = _ref2[0],
            message = _ref2[1];

        return {
          '时间': _D(timestamp),
          '消息': message
        };
      }), {
        title: '日志'
      }]);
      return this.strategy.console.tables(tables);
    }
  }, {
    key: "initChart",
    value: function initChart() {
      this.chart = this.strategy.console.chart({
        rangeSelector: {
          buttons: [],
          inputEnabled: false
        },
        title: {
          text: "".concat(contract, " [").concat(_D(+new Date()), "]")
        },
        tooltip: {
          split: false,
          shared: true
        },
        yAxis: [{
          labels: {
            align: 'right',
            x: -3
          },
          title: {
            text: '价格'
          },
          height: '65%',
          resize: {
            enabled: true
          },
          lineWidth: 2
        }, {
          labels: {
            align: 'right',
            x: -3
          },
          title: {
            text: '成交量'
          },
          top: '65%',
          height: '35%',
          offset: 0,
          lineWidth: 2
        }],
        plotOptions: {
          candlestick: {
            color: 'green',
            lineColor: 'green',
            upColor: 'red',
            upLineColor: 'red',
            tooltip: {
              pointFormat: "<span style=\"color:{point.color}\">\u25CF</span> <b> {series.name}</b><br/>" + '开盘: {point.open}<br/>' + '最高: {point.high}<br/>' + '最低: {point.low}<br/>' + '收盘: {point.close}<br/>'
            }
          }
        },
        series: [{
          type: 'candlestick',
          name: '价格',
          data: []
        }, {
          type: 'column',
          name: '成交量',
          data: [],
          yAxis: 1
        }, {
          name: '开仓',
          data: [],
          color: '#7cb5ec',
          lineWidth: 0,
          step: 'center',
          states: {
            hover: {
              enabled: false,
              lineWidth: 0,
              lineWidthPlus: 0
            }
          }
        }, {
          name: '止损位',
          data: [],
          color: 'green',
          lineWidth: 0,
          step: 'center',
          states: {
            hover: {
              enabled: false,
              lineWidth: 0,
              lineWidthPlus: 0
            }
          }
        }, {
          name: '止盈位',
          data: [],
          color: 'red',
          lineWidth: 0,
          step: 'center',
          states: {
            hover: {
              enabled: false,
              lineWidth: 0,
              lineWidthPlus: 0
            }
          }
        }, {
          type: 'scatter',
          name: '开仓点',
          data: [],
          zIndex: 9,
          tooltip: {
            pointFormat: '价格：{point.y}'
          },
          marker: {
            symbol: null
          }
        }, {
          type: 'scatter',
          name: '平仓点',
          data: [],
          zIndex: 9,
          tooltip: {
            pointFormat: '价格：{point.y}'
          },
          marker: {
            symbol: null
          }
        }, {
          type: 'scatter',
          name: '进行中',
          data: [],
          zIndex: 9,
          tooltip: {
            pointFormat: '价格：{point.y}'
          },
          marker: {
            symbol: Icons.PENDING
          }
        }, {
          type: 'scatter',
          name: '已取消',
          data: [],
          zIndex: 9,
          tooltip: {
            pointFormat: '价格：{point.y}'
          },
          marker: {
            symbol: Icons.CANCELED
          }
        }]
      });
    }
  }, {
    key: "printChart",
    value: function printChart() {
      var _this3 = this;

      var config = this.chart.getConfig();
      var averageOpeningPrice = this.strategy.averageOpeningPrice || this.strategy.cost;
      config.yAxis[0].plotBands = this.strategy.profitAndLoss ? [{
        from: averageOpeningPrice,
        to: this.strategy.closePrice,
        label: {
          text: "".concat(this.strategy.profitAndLoss > 0 ? '盈利' : '亏损', " ").concat(this.strategy.profitAndLoss)
        },
        color: this.strategy.profitAndLoss > 0 ? 'rgba(255, 0, 0, .1)' : 'rgba(0, 128, 3, .6)',
        borderWidth: 0
      }] : [];
      config.yAxis[0].plotLines = [{
        label: {
          text: "\u5F00\u4ED3 ".concat(averageOpeningPrice),
          align: 'right',
          style: {
            color: '#7cb5ec'
          },
          x: -50
        },
        color: '#7cb5ec',
        dashStyle: 'solid',
        value: averageOpeningPrice,
        width: 1
      }, {
        label: {
          text: "\u6B62\u76C8 ".concat(this.strategy.stopProfitPrice),
          align: 'right',
          style: {
            color: 'red'
          },
          x: -50
        },
        color: 'red',
        dashStyle: 'solid',
        value: this.strategy.stopProfitPrice,
        width: 1
      }, {
        label: {
          text: "\u6B62\u635F ".concat(this.strategy.stopLossPrice),
          align: 'right',
          style: {
            color: 'green'
          },
          x: -50
        },
        color: 'green',
        dashStyle: 'solid',
        value: this.strategy.stopLossPrice,
        width: 1
      }];

      var records = _toConsumableArray(_C(exchange.GetRecords, PERIOD_M1));

      var candlestick = [];
      var column = [];
      var opened = [];
      var profit = [];
      var loss = [];
      var startTime = records.length ? records[0].Time : null;
      var endTime = records.length ? records[records.length - 1].Time : null;

      if (startTime && endTime) {
        Array.from({
          length: 40
        }).forEach(function (_, index) {
          records.unshift({
            Time: startTime - (index + 1) * 1000 * 60
          });
          records.push({
            Time: endTime + (index + 1) * 1000 * 60
          });
        });
      }

      records.forEach(function (record) {
        opened.push([record.Time, averageOpeningPrice]);
        profit.push([record.Time, _this3.strategy.stopProfitPrice]);
        loss.push([record.Time, _this3.strategy.stopLossPrice]);
        candlestick.push([record.Time, record.Open, record.High, record.Low, record.Close]);
        column.push([record.Time, record.Volume]);
      });
      var openDot = [];
      var closeDot = [];
      var pendingDot = [];
      var canceledDot = [];
      var openDotSymbol = null;
      var closeDotSymbol = null;
      var dotSymbols = [[Icons.BUY, Icons.SELL], [[Icons.CLOSE_BUY_LOSS, Icons.CLOSE_SELL_LOSS], [Icons.CLOSE_BUY_PROFIT, Icons.CLOSE_SELL_PROFIT]]];
      this.strategy.tradingOrder.query().forEach(function (order) {
        var time = +new Date(_D(order.Time, 'yyyy-MM-dd hh:mm'));

        if (order.Status === $.ContractTrade.OrderStatus.ORDER_STATE_CANCELED) {
          canceledDot.push([time, order.Price]);
          return;
        }

        if (order.Status === $.ContractTrade.OrderStatus.ORDER_STATE_PENDING) {
          pendingDot.push([time, order.Price]);
          return;
        }

        if (order.Offset === 0) {
          openDot.push([time, order.Price]);
          openDotSymbol = dotSymbols[order.Offset][order.Type];
          return;
        }

        if (order.Offset === 1) {
          closeDot.push([time, order.Price]);
          closeDotSymbol = dotSymbols[order.Offset][_this3.strategy.profitAndLoss > 0 ? 1 : 0][order.Type];
          return;
        }
      });
      this.chart.changeData(0, candlestick);
      this.chart.changeData(1, column);
      this.chart.changeData(2, opened);
      this.chart.changeData(3, loss);
      this.chart.changeData(4, profit);
      this.chart.changeData(5, openDot);
      this.chart.changeData(6, closeDot);
      this.chart.changeData(7, pendingDot);
      this.chart.changeData(8, canceledDot);
      config.series[5].marker.symbol = openDotSymbol;
      config.series[6].marker.symbol = closeDotSymbol;
      this.chart.update(config);
    }
  }, {
    key: "print",
    value: function print() {
      this.printTable();
      this.printChart();
    }
  }]);

  return Info;
}();

var MyStrategy = /*#__PURE__*/function (_$$Strategy$SingleTra) {
  _inherits(MyStrategy, _$$Strategy$SingleTra);

  var _super = _createSuper(MyStrategy);

  function MyStrategy() {
    var _defineProperty2, _defineProperty3, _defineProperty4, _defineProperty5, _defineProperty6, _defineProperty7, _defineProperty8;

    var _this4;

    _classCallCheck(this, MyStrategy);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this4 = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this4), "contract", new $.Contract({
      contract: contract
    }));

    _defineProperty(_assertThisInitialized(_this4), "info", new Info(_assertThisInitialized(_this4)));

    _defineProperty(_assertThisInitialized(_this4), "tradingOrder", new TradingOrder());

    _defineProperty(_assertThisInitialized(_this4), "messages", []);

    _defineProperty(_assertThisInitialized(_this4), "yuque", new YuQue());

    _defineProperty(_assertThisInitialized(_this4), "directions", [$.ContractTrade.Direction.LONG, $.ContractTrade.Direction.SHORT]);

    _defineProperty(_assertThisInitialized(_this4), "openStatus", false);

    _defineProperty(_assertThisInitialized(_this4), "closeStatus", false);

    _defineProperty(_assertThisInitialized(_this4), "openAmount", amount);

    _defineProperty(_assertThisInitialized(_this4), "closeAmount", 0);

    _defineProperty(_assertThisInitialized(_this4), "openedAmount", 0);

    _defineProperty(_assertThisInitialized(_this4), "totalOpeningPrice", 0);

    _defineProperty(_assertThisInitialized(_this4), "totalClosingPrice", 0);

    _defineProperty(_assertThisInitialized(_this4), "averageOpeningPrice", 0);

    _defineProperty(_assertThisInitialized(_this4), "averageClosingPrice", 0);

    _defineProperty(_assertThisInitialized(_this4), "startTime", null);

    _defineProperty(_assertThisInitialized(_this4), "openTime", null);

    _defineProperty(_assertThisInitialized(_this4), "stopProfitPrice", null);

    _defineProperty(_assertThisInitialized(_this4), "stopLossPrice", null);

    _defineProperty(_assertThisInitialized(_this4), "closePrice", null);

    _defineProperty(_assertThisInitialized(_this4), "lingerTime", null);

    _defineProperty(_assertThisInitialized(_this4), "hasWholeFallBacked", false);

    _defineProperty(_assertThisInitialized(_this4), "hasFlatFallBacked", false);

    _defineProperty(_assertThisInitialized(_this4), "hasHalfFallBacked", false);

    _defineProperty(_assertThisInitialized(_this4), "lingerRecords", []);

    _defineProperty(_assertThisInitialized(_this4), "lingerNotTradingTime", null);

    _defineProperty(_assertThisInitialized(_this4), "lingerNotTradingTimestamp", 0);

    _defineProperty(_assertThisInitialized(_this4), "flatFallBackFunctions", (_defineProperty2 = {}, _defineProperty(_defineProperty2, $.ContractTrade.Direction.SHORT, function () {
      return _this4.ticker.Last <= toFixed(_this4.cost - _this4.lossDifferencePrice);
    }), _defineProperty(_defineProperty2, $.ContractTrade.Direction.LONG, function () {
      return _this4.ticker.Last >= toFixed(_this4.cost + _this4.lossDifferencePrice);
    }), _defineProperty2));

    _defineProperty(_assertThisInitialized(_this4), "halfFallBackFunctions", (_defineProperty3 = {}, _defineProperty(_defineProperty3, $.ContractTrade.Direction.SHORT, function () {
      if (_this4.ticker.Last <= toFixed(_this4.cost - (_this4.cost - _this4.stopProfitPrice) / 2)) {
        _this4.stopLossPrice = toFixed(_this4.cost - _this4.lossDifferencePrice);
        return true;
      }

      return false;
    }), _defineProperty(_defineProperty3, $.ContractTrade.Direction.LONG, function () {
      if (_this4.ticker.Last >= toFixed(_this4.cost + (_this4.stopProfitPrice - _this4.cost) / 2)) {
        _this4.stopLossPrice = toFixed(_this4.cost + _this4.lossDifferencePrice);
        return true;
      }

      return false;
    }), _defineProperty3));

    _defineProperty(_assertThisInitialized(_this4), "wholeFallBackFunctions", (_defineProperty4 = {}, _defineProperty(_defineProperty4, $.ContractTrade.Direction.SHORT, function () {
      if (_this4.ticker.Last <= _this4.stopProfitPrice) {
        if (!whetherToCatchUp) {
          _this4.console.warn('价格超过止盈位，准备平仓');

          return false;
        }

        _this4.cost = _this4.stopProfitPrice;
        _this4.stopLossPrice = toFixed(_this4.lossDifferencePrice + _this4.cost); // 达到止盈位后，按照盈亏比 1:1 开始追高

        _this4.stopProfitPrice = toFixed(_this4.cost - _this4.profitDifferencePrice);

        _this4.console.warn("\u4EF7\u683C\u8D85\u8FC7\u6B62\u76C8\u4F4D\uFF0C\u91CD\u65B0\u8BBE\u7F6E\u6B62\u635F\u4F4D\u4E3A ".concat(_this4.stopLossPrice, "\uFF0C\u6B62\u76C8\u4F4D\u4E3A ").concat(_this4.stopProfitPrice));

        return true;
      }

      return false;
    }), _defineProperty(_defineProperty4, $.ContractTrade.Direction.LONG, function () {
      if (_this4.ticker.Last >= _this4.stopProfitPrice) {
        if (!whetherToCatchUp) {
          _this4.console.warn('价格超过止盈位，准备平仓');

          return false;
        }

        _this4.cost = _this4.stopProfitPrice;
        _this4.stopLossPrice = toFixed(_this4.cost - _this4.lossDifferencePrice);
        _this4.stopProfitPrice = toFixed(_this4.cost + _this4.profitDifferencePrice);

        _this4.console.warn("\u4EF7\u683C\u8D85\u8FC7\u6B62\u76C8\u4F4D\uFF0C\u91CD\u65B0\u8BBE\u7F6E\u6B62\u635F\u4F4D\u4E3A ".concat(_this4.stopLossPrice, "\uFF0C\u6B62\u76C8\u4F4D\u4E3A ").concat(_this4.stopProfitPrice));

        return true;
      }

      return false;
    }), _defineProperty4));

    _defineProperty(_assertThisInitialized(_this4), "stopLossConditions", (_defineProperty5 = {}, _defineProperty(_defineProperty5, $.ContractTrade.Direction.SHORT, function () {
      return _this4.ticker.Last >= _this4.stopLossPrice;
    }), _defineProperty(_defineProperty5, $.ContractTrade.Direction.LONG, function () {
      return _this4.ticker.Last <= _this4.stopLossPrice;
    }), _defineProperty5));

    _defineProperty(_assertThisInitialized(_this4), "stopProfitConditions", (_defineProperty6 = {}, _defineProperty(_defineProperty6, $.ContractTrade.Direction.SHORT, function () {
      return _this4.ticker.Last <= _this4.stopProfitPrice;
    }), _defineProperty(_defineProperty6, $.ContractTrade.Direction.LONG, function () {
      return _this4.ticker.Last >= _this4.stopProfitPrice;
    }), _defineProperty6));

    _defineProperty(_assertThisInitialized(_this4), "lingerConditions", (_defineProperty7 = {}, _defineProperty(_defineProperty7, $.ContractTrade.Direction.SHORT, function () {
      return toFixed(_this4.cost - _this4.ticker.Last);
    }), _defineProperty(_defineProperty7, $.ContractTrade.Direction.LONG, function () {
      return toFixed(_this4.ticker.Last - _this4.cost);
    }), _defineProperty7));

    _defineProperty(_assertThisInitialized(_this4), "lingerPriceDifferences", (_defineProperty8 = {}, _defineProperty(_defineProperty8, $.ContractTrade.Direction.SHORT, function () {
      return toFixed(_this4.cost - lingerLossPriceDifference);
    }), _defineProperty(_defineProperty8, $.ContractTrade.Direction.LONG, function () {
      return toFixed(_this4.cost + lingerLossPriceDifference);
    }), _defineProperty8));

    _defineProperty(_assertThisInitialized(_this4), "fallBack", function () {
      if (!_this4.hasFlatFallBacked && _this4.flatFallBackFunctions[_this4.direction]()) {
        // 当达到盈亏比 1:1 时，已经重新设置了止损，因此关闭时间周期
        _this4.hasFlatFallBacked = true;
        _this4.lingerFinished = true; // 如果追高过，这个时候，保住成本不再是第一任务，止损位设置为目前止盈位

        _this4.stopLossPrice = _this4.hasWholeFallBacked ? _this4.cost : _this4.lingerPriceDifferences[_this4.direction]();

        _this4.console.warn("\u4EF7\u683C\u8D85\u8FC7\u76C8\u4E8F\u6BD4\uFF0C\u91CD\u65B0\u8BBE\u7F6E\u6B62\u635F\u4F4D\u4E3A ".concat(_this4.stopLossPrice));

        return false;
      }

      if (!_this4.hasHalfFallBacked && _this4.halfFallBackFunctions[_this4.direction]()) {
        // 止损价或者止盈价改变，重新设置成本徘徊周期
        _this4.hasHalfFallBacked = true;

        _this4.console.warn("\u4EF7\u683C\u8D85\u8FC7\u4E00\u534A\u76C8\u5229\uFF0C\u91CD\u65B0\u8BBE\u7F6E\u6B62\u635F\u4F4D\u4E3A ".concat(_this4.stopLossPrice));

        return false;
      }

      if (_this4.wholeFallBackFunctions[_this4.direction]()) {
        _this4.hasWholeFallBacked = true; // 防止价格攀升过快，直接超过止盈位

        _this4.ticker.Last = _this4.cost;

        _this4.resetParams();

        return false;
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_this4), "tiggerCloseInOpening", function () {
      _this4.console.warn("\u5F00\u4ED3\u8FC7\u7A0B\u4E2D\uFF0C\u89E6\u53D1\u6B62\u635F\uFF0C\u4E0D\u518D\u5F00\u4ED3\uFF0C\u5E76\u5F00\u59CB\u5E73\u4ED3\u3002\u5DF2\u5F00\u4ED3\u6570\u91CF ".concat(_this4.closeAmount));

      return true;
    });

    _defineProperty(_assertThisInitialized(_this4), "getCheckCloseStatus", function (opening) {
      return function () {
        // 不隔夜的单子，交易结束前必须平掉
        if (!overnight && _this4.contract.getDistanceClosedTimestamp(true) <= endTime) {
          _this4.closePrice = _this4.ticker.Last;

          _this4.console.error('在交易结束时间内，准备强制平仓');

          return true;
        }

        if (_this4.stopLossConditions[_this4.direction]()) {
          return true;
        }

        if (!opening && _this4.stopProfitConditions[_this4.direction]()) {
          _this4.closePrice = _this4.stopProfitPrice;
          return true;
        }

        return false;
      };
    });

    _defineProperty(_assertThisInitialized(_this4), "checkOverOpeningTime", function () {
      if (!_this4.startTime) {
        _this4.startTime = +new Date();
      }

      return +new Date() - _this4.startTime > openingTime;
    });

    _defineProperty(_assertThisInitialized(_this4), "overOpeningTime", function () {
      if (_this4.openAmount === amount) {
        _this4.console.error('超过开仓时间，未开仓，关闭单子', '@');

        _this4.callback(true);
      }

      _this4.console.warn("\u8D85\u8FC7\u5F00\u4ED3\u65F6\u95F4\uFF0C\u672A\u5168\u90E8\u5F00\u4ED3\uFF0C\u4E0D\u518D\u5F00\u4ED3\u3002\u5DF2\u5F00\u4ED3\u6570\u91CF ".concat(_this4.closeAmount));
    });

    _defineProperty(_assertThisInitialized(_this4), "checkPriceInOpenRange", function () {
      return Math.abs(_this4.ticker.Open - _this4.cost) <= openRange;
    });

    _defineProperty(_assertThisInitialized(_this4), "priceInOpenRange", function () {
      var order = _this4.contract.trade.openPosition(_this4.cost, _this4.openAmount); // 记录单子


      _this4.totalOpeningPrice += order.DealAmount * order.Price;

      if (!_this4.openTime) {
        _this4.openTime = +new Date();
      } // 如果实际开仓数量小于预期开仓数量，重新计算开仓数量


      if (order.DealAmount < _this4.openAmount) {
        _this4.openAmount = _this4.openAmount - order.DealAmount;

        _this4.setCloseAmount(amount - _this4.openAmount);

        _this4.console.error("\u672A\u5168\u90E8\u5F00\u4ED3\uFF0C\u91CD\u65B0\u5C1D\u8BD5\u3002\u5269\u4F59\u5F00\u4ED3\u6570\u91CF ".concat(_this4.openAmount));

        return false;
      }

      _this4.setCloseAmount(amount);

      _this4.console.success("\u5DF2\u5B8C\u6210\u5F00\u4ED3\uFF0C\u5F00\u4ED3\u65B9\u5411 -> ".concat(_this4.contract.direction, "\uFF0C\u5F00\u4ED3\u5747\u4EF7 -> ").concat(_this4.averageOpeningPrice, "\uFF0C\u5F00\u4ED3\u6570\u91CF -> ").concat(_this4.closeAmount), '@');

      return true;
    });

    _defineProperty(_assertThisInitialized(_this4), "closePosition", function () {
      if (!_this4.closeAmount) {
        return true;
      }

      _this4.isForceClose = true;

      var orders = _this4.contract.trade.closePosition(_this4.closePrice || _this4.stopLossPrice, _this4.closeAmount);

      var dealAmount = orders.reduce(function (result, order) {
        return result + order.DealAmount;
      }, 0);
      var totalPrice = orders.reduce(function (result, order) {
        return result + order.DealAmount * order.Price;
      }, 0);
      _this4.totalClosingPrice += totalPrice;

      if (dealAmount < _this4.closeAmount) {
        _this4.closeAmount = _this4.closeAmount - dealAmount;

        _this4.console.error("\u672A\u5168\u90E8\u5E73\u4ED3\uFF0C\u91CD\u65B0\u5C1D\u8BD5\u3002\u5269\u4F59\u5E73\u4ED3\u6570\u91CF ".concat(_this4.closeAmount));

        return false;
      }

      _this4.closeAmount = 0;
      _this4.averageClosingPrice = toFixed(_this4.totalClosingPrice / _this4.openedAmount);

      _this4.console.success("\u5DF2\u5B8C\u6210\u5E73\u4ED3\uFF0C\u5E73\u4ED3\u65B9\u5411 -> ".concat(_this4.contract.direction, "\uFF0C\u5E73\u4ED3\u5747\u4EF7 -> ").concat(_this4.averageClosingPrice, "\uFF0C \u603B\u8BA1\u7528\u65F6 -> ").concat(getDifferenceTime(_this4.openTime)), '@');

      _this4.info.print();

      return true;
    });

    _defineProperty(_assertThisInitialized(_this4), "checkStopCommand", function () {
      var cmd = GetCommand() || '';

      if (cmd === 'stop') {
        _this4.closePrice = _this4.ticker.Last;

        _this4.console.success('停止命令运行成功，准备关闭单子');

        return true;
      }

      var _cmd$split = cmd.split(':'),
          _cmd$split2 = _slicedToArray(_cmd$split, 2),
          command = _cmd$split2[0],
          value = _cmd$split2[1];

      if (command === 'changeStopProfit') {
        _this4.stopProfitPrice = toFixed(value);
        _this4.profitDifferencePrice = Math.abs(_this4.cost - _this4.stopProfitPrice);

        _this4.console.success("\u6B62\u76C8\u4F4D\u91CD\u65B0\u8BBE\u7F6E\u6210\u529F\uFF0C\u5F53\u524D\u6B62\u76C8\u4F4D\uFF1A".concat(_this4.stopProfitPrice));
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_this4), "checkLossRatio", function () {
      var now = +new Date();

      if (_this4.lingerStopPrice && Math.abs(_this4.ticker.Last - _this4.lingerStopPrice) <= closeRange) {
        _this4.closePrice = _this4.lingerStopPrice;
        return true;
      }

      if (_this4.lingerFinished) {
        return false;
      }

      if (!_this4.contract.isTrading() && !_this4.lingerNotTradingTime) {
        _this4.lingerNotTradingTime = now;

        _this4.console.info("\u5F98\u5F8A\u65F6\u95F4\u5468\u671F\u5185\uFF0C\u8FDB\u5165\u975E\u4EA4\u6613\u65F6\u95F4\uFF0C\u8BB0\u5F55\u5F53\u524D\u65F6\u95F4 -> ".concat(_D(now)));
      }

      if (_this4.lingerNotTradingTime && _this4.contract.isTrading()) {
        _this4.lingerNotTradingTimestamp += now - _this4.lingerNotTradingTime;
        _this4.lingerNotTradingTime = null;

        _this4.console.info("\u5F98\u5F8A\u65F6\u95F4\u5468\u671F\u5185\uFF0C\u4ECE\u975E\u4EA4\u6613\u65F6\u95F4\u8FDB\u5165\u4EA4\u6613\u65F6\u95F4\uFF0C\u8BA1\u7B97\u975E\u4EA4\u6613\u65F6\u95F4\uFF0C\u5F53\u524D\u975E\u4EA4\u6613\u65F6\u95F4\u7D2F\u8BA1 -> ".concat(_this4.lingerNotTradingTimestamp));
      } // TODO: 处理开仓亏损的情况


      if (!_this4.lingerTime) {
        _this4.lingerTime = now;
      }

      _this4.lingerRecords.push(_this4.lingerConditions[_this4.direction]());

      var differenceTime = now - _this4.lingerTime;

      if (_this4.lingerNotTradingTimestamp) {
        differenceTime -= _this4.lingerNotTradingTimestamp;
      }

      if (differenceTime >= lingerTime) {
        _this4.lingerFinished = true;
        var records = _this4.lingerRecords;
        var currentLingerLossRatio = toFixed(records.filter(function (record) {
          return record < 0;
        }).length / records.length * 100);

        if (currentLingerLossRatio >= lingerLossRatio) {
          _this4.lingerStopPrice = _this4.lingerPriceDifferences[_this4.direction]();

          _this4.console.warn("\u5728\u5F98\u5F8A\u65F6\u95F4\u4E4B\u540E\uFF0C\u5F53\u524D\u6B62\u635F\u7387 ".concat(currentLingerLossRatio, "% \u5927\u4E8E ").concat(lingerLossRatio, "%\uFF0C\u56E0\u6B64\u5728\u4EF7\u683C\u76C8\u5229\u65F6\uFF0C\u51C6\u5907\u5E73\u4ED3"));
        } else {
          _this4.console.warn("\u5728\u5F98\u5F8A\u65F6\u95F4\u4E4B\u540E\uFF0C\u5F53\u524D\u6B62\u635F\u7387 ".concat(currentLingerLossRatio, "%"));
        }
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_this4), "checkForceClose", function () {
      if (_this4.isForceClose) {
        // 如果平仓阶段撤销了平仓单子，那么强制退场
        _this4.closePrice = _this4.ticker.Last; // 如果价格就在成本周围徘徊，那么使用成本价

        if (Math.abs(_this4.cost - _this4.ticker.Last) <= lingerLossPriceDifference) {
          _this4.closePrice = _this4.cost;
        }

        return true;
      } // 未开仓，直接平掉


      if (_this4.openAmount && !_this4.closeAmount) {
        _this4.console.error('未开仓就触发止损，放弃单子', '@');

        _this4.callback(true);
      }

      return false;
    });

    return _this4;
  }

  _createClass(MyStrategy, [{
    key: "resetParams",
    // 重新设置参数
    value: function resetParams() {
      this.hasFlatFallBacked = false;
      this.hasHalfFallBacked = false;
      this.lingerStopPrice = null;
      this.lingerFinished = false;
      this.lingerTime = null;
      this.lingerNotTradingTime = null;
      this.lingerNotTradingTimestamp = 0;
    }
  }, {
    key: "setCloseAmount",
    value: function setCloseAmount(closeAmount) {
      this.closeAmount = closeAmount;
      this.openedAmount = closeAmount;
      this.averageOpeningPrice = toFixed(this.totalOpeningPrice / this.closeAmount);
    }
  }, {
    key: "checkStopProfitPrice",
    value: function checkStopProfitPrice() {
      var _this5 = this,
          _stopProfitConitions;

      var stopProfitConitions = (_stopProfitConitions = {}, _defineProperty(_stopProfitConitions, $.ContractTrade.Direction.SHORT, function () {
        return _this5.cost > _this5.stopProfitPrice;
      }), _defineProperty(_stopProfitConitions, $.ContractTrade.Direction.LONG, function () {
        return _this5.cost < _this5.stopProfitPrice;
      }), _stopProfitConitions);

      if (!stopProfitConitions[this.direction]()) {
        this.console.error('单子创建失败，止盈价必须在成本之上', '@');
        this.callback(true);
      }
    }
  }, {
    key: "checkStopLossPrice",
    value: function checkStopLossPrice() {
      var _this6 = this,
          _stopLossConitions;

      var stopLossConitions = (_stopLossConitions = {}, _defineProperty(_stopLossConitions, $.ContractTrade.Direction.SHORT, function () {
        return _this6.cost < _this6.stopLossPrice;
      }), _defineProperty(_stopLossConitions, $.ContractTrade.Direction.LONG, function () {
        return _this6.cost > _this6.stopLossPrice;
      }), _stopLossConitions);

      if (!stopLossConitions[this.direction]()) {
        this.console.error('单子创建失败，止损价必须在成本之下', '@');
        this.callback(true);
      }
    }
  }, {
    key: "setProcessers",
    value: function setProcessers() {
      // 开仓处理器
      // 开仓
      this.openProcesser.addProcesser(this.priceInOpenRange).addValidator(this.checkPriceInOpenRange); // 是否超出时间

      this.openProcesser.addProcesser(this.overOpeningTime).addValidator(this.checkOverOpeningTime); // 是否开仓过程中触发止损

      this.openProcesser.addProcesser(this.tiggerCloseInOpening).addValidators([this.checkStopCommand, this.getCheckCloseStatus(true)]); // 平仓处理器

      this.closeProcesser.addProcesser(this.closePosition).addValidators([this.checkForceClose, this.checkStopCommand, this.fallBack, this.getCheckCloseStatus(), this.checkLossRatio]);
    }
  }, {
    key: "subscribeOrderChange",
    value: function subscribeOrderChange() {
      var _this7 = this;

      this.contract.trade.subscribe(function (order) {
        _this7.tradingOrder.record(order.Id, order);

        _this7.info.printTable();
      });
    }
  }, {
    key: "subscribeConsole",
    value: function subscribeConsole() {
      var _this8 = this;

      this.console.subscribe(function (type) {
        if (type === 'table' || type === 'chart') {
          return;
        }

        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        _this8.messages.unshift([+new Date(), args.join(' ')]);
      });
    }
  }, {
    key: "createYuQueDoc",
    value: function createYuQueDoc() {
      // 单子平仓，才发送模板给语雀
      var tables = this.info.printTable();
      var text = "## \u76F8\u5173\u56FE\u8868\n\n## \u76F8\u5173\u4FE1\u606F\n{{\n  context.tables.map(item => {\n      return '### ' + item.title + '\\n' + table(item.rows, item.cols);\n  }).join('\\n')\n}}\n\n## \u4E3A\u4EC0\u4E48\u8FDB\u884C\u8FD9\u6B21\u4EA4\u6613\uFF1F\n\n## \u5BF9\u8FD9\u6B21\u4EA4\u6613\u6709\u4EC0\u4E48\u60F3\u6CD5\uFF1F\n\n\n";
      this.yuque.createDoc("".concat(_D(this.messages[this.messages.length - 1][0], 'yyyy年MM月dd日 hh:mm'), "-").concat(contract), text, {
        tables: tables
      });
    }
  }, {
    key: "init",
    value: function init() {
      var _stopProfitPrices, _stopLossPrices;

      this.contract.setDirection(this.direction);
      var ticker = this.contract.getTicker();

      var account = _C(exchange.GetAccount);

      this.beforeBalance = account.Balance;
      this.cost = cost || ticker.Open;
      this.info.initChart();
      var stopProfitPrices = (_stopProfitPrices = {}, _defineProperty(_stopProfitPrices, $.ContractTrade.Direction.SHORT, stopProfit || this.cost - stopProfitPriceDifference), _defineProperty(_stopProfitPrices, $.ContractTrade.Direction.LONG, stopProfit || this.cost + stopProfitPriceDifference), _stopProfitPrices);
      var stopLossPrices = (_stopLossPrices = {}, _defineProperty(_stopLossPrices, $.ContractTrade.Direction.SHORT, stopLoss || this.cost + stopLossPriceDifference), _defineProperty(_stopLossPrices, $.ContractTrade.Direction.LONG, stopLoss || this.cost - stopLossPriceDifference), _stopLossPrices);
      this.stopProfitPrice = stopProfitPrices[this.direction];
      this.checkStopProfitPrice();
      this.stopLossPrice = stopLossPrices[this.direction];
      this.checkStopLossPrice();
      this.profitDifferencePrice = Math.abs(this.cost - this.stopProfitPrice);
      this.lossDifferencePrice = Math.abs(this.cost - this.stopLossPrice);
      this.subscribeOrderChange();
      this.subscribeConsole();
      this.setProcessers();
    }
  }, {
    key: "body",
    value: function body() {
      this.ticker = this.contract.getTicker();
      this.info.print();
      return this.game.start();
    }
  }, {
    key: "complete",
    value: function complete() {
      if (!this.isClosedPosition) {
        return;
      }

      this.console.info('创建语雀交易记录');
      this.createYuQueDoc();
      this.console.success('创建语雀交易记录完成'); // this.console.info('开始打印后五分钟 K 线');
      // const endTime = +new Date() + 5 * 1000 * 60;
      // while (+new Date() < endTime) {
      //   this.info.printChart();
      //   this.console.success('正在打印 K 线中...');
      //   Sleep(1000);
      // }
      // this.console.success('打印成功');
    }
  }, {
    key: "isClosedPosition",
    get: function get() {
      return this.closeAmount === 0 && this.openedAmount !== 0;
    }
  }, {
    key: "direction",
    get: function get() {
      return this.directions[direction];
    }
  }]);

  return MyStrategy;
}($.Strategy.SingleTradeStrategy);

_defineProperty(MyStrategy, "name", '单次交易策略');

function main() {
  // 2020-11-18 09:00
  // 2020-11-18 09:59
  // 1 分钟
  var engine = new $.Engine();
  engine.addStrategy(new MyStrategy());
  engine.run();
}
```

> Detail

https://www.fmz.com/strategy/237682

> Last Modified

2020-12-22 10:50:33
