import watermark from 'watermark-dom'
const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')

// arr：原数组；str：匹配字段；val：当前节点字段
const getAllParent = (arr, str, val) => {
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        if (item[str] === val) {
            return []
        } else {
            if (item.children) {
                let res = []
                if ((res = getAllParent(item.children, str, val)) !== false) {
                    res.push(item)
                    return res
                }
            }
        }
    }
    return false
}
// 设置水印
const setWaterMark = (opacity) => {
    watermark.init({
        watermark_x_space: 20,
        watermark_y_space: 30,
        watermark_width: 150,
        watermark_height: 60,
        watermark_fontsize: '14px',
        watermark_alpha: opacity,
        watermark_txt: `${userInfo.username || 'admin'} ${userInfo.phone || '15858194070'}`
    })
}

export { getAllParent, setWaterMark }
