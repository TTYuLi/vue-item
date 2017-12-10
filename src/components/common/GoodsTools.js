let obj = {}
let store = window.localStorage

obj.addOrUpdate = function (newGoods) {
  //取出
  let goodsObj = this.getGoods()
  //如果有则追加，没有则创建
  if (goodsObj[newGoods.id]) {
    goodsObj[newGoods.id] += newGoods.num
  }else{
    goodsObj[newGoods.id] = newGoods.num
  }

  //保存
  this.saveGoods(goodsObj)
}
//存储商品数据信息
obj.saveGoods = function (obj) {
  store.setItem('goods',JSON.stringify(obj))
}
//获取存储商品数据
obj.getGoods = function () {
  return JSON.parse(store.getItem('goods')||'{}')
}

// 总数获取
obj.getTotalCount = function () {
  //先取出
  let goodsList = this.getGoods()
  let sum = 0
  //取所有value
  let arr = object.values(goodsList)
  //遍历，累加
  arr.forEach(ele => sum +=ele)

  return num
}
//导出
export default obj