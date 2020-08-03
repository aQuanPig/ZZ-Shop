// 同时发送异步代码的次数
let ajaxTimes = 0
export const request = (params) => {
  ajaxTimes++
  // 显示加载中效果
  wx.showLoading({
    title: "加载中，请稍后~",
    mask: true
  });
  //定义公共的URL
  const baseURL = "https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseURL + params.url,
      success: result => {
        resolve(result.data.message)
      },
      fail: err => {
        reject(err)
      },
      complete: () => {
        ajaxTimes--;
        //关闭加载
        ajaxTimes === 0 && wx.hideLoading();

      }
    });
  })
}