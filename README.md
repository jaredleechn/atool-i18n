# intl-translate

Working with plugin like `babel-plugin-react-intl`

- collect intl messages from source code

- send to translate center

- fetch latest translte result

- fill into local locale files


![](https://zos.alipayobjects.com/rmsportal/NonKfMkbIXVSGKo.png)


## Middleware

`intl-translate` middlewares will execute one by one, with three parameters:

```
plugins.reduce((a, b) => {
  if (a instanceof Promise) {
    return a.then(result => b.plugin(result, b.query, context));
  }
  return b.plugin(a, b.query, context);
}, Promise.resolve());
```

- result: return value of previous middleware
- query: parameters passed to current middleware, parse from `option.config(default is intl.config.js)`
- context: intl-translate context

#### Life cycle

Middlewares contains three stage, each stage share the same data structure

|middleware stage|default|description|
|:---:|:---:|:---:|
|pre|summary|collect origin data generated from `babel-plugin-react-intl` or something else|
|process|google, pick|loading translation from cloud or translate center and fill into result with key of language|
|emit|save|emit into locales resource|

#### Built-in middlewares

`summary`: collect origin data generated from `babel-plugin-react-intl`

returns:
```
[{
  id: 'totalPrice',
  description: '展示订单总额',
  defaultMessage: '订单全额'
}, {
  id: 'count',
  description: '显示订单中商品数量',
  defaultMessage: '数量'
}]
```

|parameter|default|description|
|:---:|:---:|:---:|
|cwd|context.cwd||
|source|'i18n-messages'|where is the messages folder|
|patten|'**/*.json'|patten of json files|


`google`: add translate result for each language from google

returns: 
```
[{
  id: 'totalPrice',
  description: '展示订单总额',
  defaultMessage: '订单全额',
  cn: ['订单总价', '订单全额', '订单价格'],
  en: ['totalPrices', 'totalPrice']
}, {
  id: 'count',
  description: '显示订单中商品数量',
  defaultMessage: '数量',
  cn: ['数量', '数目'],
  en: 'count'
}]
```

|parameter|default|description|
|:---:|:---:|:---:|
|langs|[]|languages you need to translate|


`educe`: pick the best translation of each id in terminal

returns:

```
[{
  id: 'totalPrice',
  description: '展示订单总额',
  defaultMessage: '订单全额',
  cn: '订单总价',
  en: 'totalPrice'
}, {
  id: 'count',
  description: '显示订单中商品数量',
  defaultMessage: '数量',
  cn: '数目',
  en: 'count'
}]
```

|parameter|default|description|
|:---:|:---:|:---:|
|local|'locales'|add local files into suggestion|

`save`: save into json

returns: true || false

|parameter|default|description|
|:---:|:---:|:---:|
|dest|'locales'|save to where|