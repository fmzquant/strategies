
> Name

TypeScript-演示

> Author

发明者量化

> Strategy Description

平台加入原生TypeScript支持, 只需要在源码开头加入 (策略语言类型还是选JavaScript)

```
// @ts-check
```

就可以自动识别为TypeScript




> Source (javascript)

``` javascript
// @ts-check

class Greeter {
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    greet() {
        return "Hello, " + this.greeting;
    }
}


function peopleName(firstName: string, ...restOfname: string[]) {
    return firstName + " " + restOfname.join(" ");
}


function main() {
    let greeter = new Greeter("world");
    Log(greeter.greet());

    
    Log(peopleName('xiaochuan', 'xiaoming', 'xiaohong'))
}


```

> Detail

https://www.fmz.com/strategy/405326

> Last Modified

2023-04-30 20:17:23
