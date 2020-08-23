
export const updateTreeData=(list, key, children)=> {
    return list.map(node => {
      if (node.key === key) {
        return { ...node, children };
      }
      if (node.children) {
        return { ...node, children: updateTreeData(node.children, key, children) };
      }
      return node;
    });
  }

  export const getRandomArray = function (arr, num) {
    let out = []
    let n = arr.length > num ? num : arr.length
    while (out.length < n) {
      let temp = parseInt(Math.random() * arr.length)
      out = [...out, ...arr.splice(temp, 1)]
    }
    return out
  }