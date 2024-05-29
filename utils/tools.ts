const generatepName = (data: any) => {
    data.forEach((item: any) => {
        const paths = item.name.split("-")
        // 截取列表从第一个到倒数第二个
        const pName = paths.slice(0, paths.length - 1).join("-")
        item.pName = pName
    })
}

const generateChild = (root: any, list: any) => {
    list.forEach((item: any) => {
        if (item.pName === root.name) {
            if (root.children) {
                root.children.push(item)
            } else {
                root.children = [item]
            }
        }
    })
    if (root.children) {
        root.children.forEach((item: any) => {
            generateChild(item, list)
        })
    }
}

export const generateTreeData = (data: any) => {
    generatepName(data)
    const treeData = data.filter((item: any) => item.pName === "")
    treeData.forEach((item: any) => {
        generateChild(item, data)
    })
    return treeData
}