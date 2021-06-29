export function buildTreeSelect(data) {
  const idMapping = data.reduce((acc, el, i) => {
    acc[el._id] = i;
    return acc;
  }, {});
  let classification = [];
  data.forEach((el) => {
    // 判断根节点
    if (!el.parent) {
      // 保存没有父类的元素，为最后要获得的数据
      classification.push(el);
    } else {
      // 用映射表找到父元素this.classification
      const parentEl = data[idMapping[el.parent._id]];
      // 把当前元素添加到父元素的`children`数组中,因为数组为引用类型，会更改原数组
      parentEl.children = [...(parentEl.children || []), el];
    }
  });
  return classification;
}
