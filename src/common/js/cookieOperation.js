export default {
    /**
     * cookie操作
     * 增 删 获取
     */
    cookie: {
        set: function (key, value) {
            document.cookie = key + '=' + value;
        },
        get: function (key) {
            // cookie 里获取 access_token
            let strCookie = document.cookie;
            // 将多cookie切割为多个名/值对
            let arrCookie = strCookie.split(';');
            let accessToken;
            // 遍历cookie数组，处理每个cookie对
            arrCookie.map(item => {
                // 防止有多个cookie时登录失败
                if (item.indexOf(key) !== -1) {
                    let arr = item.split('=');
                    // 找到名称为access_token的cookie，并返回它的值
                    if (key.trim().toString() === arr[0].trim().toString()) {
                        accessToken = arr[1];
                    }
                }
            });
            return accessToken;
        },
        delete: function (key) {
            let myDate = new Date();
            myDate.setTime(-1000); // 设置时间
            document.cookie = key + "=''; expires=" + myDate.toGMTString();
        }
    }
};
