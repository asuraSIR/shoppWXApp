let ajaxTime = 0;
export const request=(params)=>{
    ajaxTime++
    //开启加载提示
    wx.showLoading({
        title: "加载中",
        mask: true,
    });
    //定义公共url
    const baseUrl="https://api-hmugo-web.itheima.net/api/public/v1";
    return new Promise ((resolve,reject)=>{
        wx.request({
            ...params,
            url:baseUrl+params.url,
            success:(result)=>{
                resolve(result);
            },
            fail:(reject)=>{
                reject(err);
            },
            complete:()=>{
                ajaxTime--
                if (ajaxTime===0) {
                    //关闭加载提示
                    wx.hideLoading();
                }
               
            }
        });
    })
}