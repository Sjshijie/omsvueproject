import axios from 'axios';
import qs from 'qs';

let base = 'http://10.227.114.235:8081';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/order/selectOrderList`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/order/updateOrder`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/order/insertOrder`, { params: params }); };

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://139.219.228.112:8084';

// POST传参序列化
axios.interceptors.request.use((config) => {
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    return config;
}, (error) => {
     // _.toast("错误的传参", 'fail');
    return Promise.reject(error);
});

// 返回状态判断
axios.interceptors.response.use((res) => {
    if (!res.data.success) {
        // _.toast(res.data.msg);
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    // _.toast("网络异常", 'fail');
    return Promise.reject(error);
});

export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
            .catch((error) => {
               reject(error);
            });
    });
}

export default {
    /**
     * 菜单管理
     */
    getBaseResource (params) {
        return fetch('/resource/list', {params: params});
    },
    /**
     * 弹出菜单列表
     */
    getListTree (params) {
        return fetch('/resource/listTree', {params: params});
    },
    /**
     * 角色管理
     */
    getBaseRole (params) {
        return fetch('/role/listPager', {params: params});
    },
    getBaseRoleNoPage (params) {
        return fetch('/role/list', {params: params});
    },
    getRoleOfRes (params) {
        return fetch('/resource/role/list', {params: params});
    },
    getBaseDisableUser (params) {
      return fetch('/user/disable', {params: params});
    },
    getBaseEnableUser (params) {
      console.log(params);
      return fetch('/user/enable', params);
    },
    /**
     * 组织机构管理
     */
    getBaseOrg (params) {
        return fetch('/org/listPager', {params: params});
    },
    getBaseOrgNoPage (params) {
        return fetch('/org/list', {params: params});
    },
    /**
     * 用户管理
     */
    getBaseUser (params) {
        return fetch('/user/listPager', {params: params});
    },
    userofrole (params) {
        return fetch('/user/role/list', {params: params});
    },
    useroforg (params) {
        return fetch('/user/org/list', {params: params});
    },
    /**
     * 订单管理
     */
    getBaseSalesOrderList (params) {
        return fetch('/salesOrderList', {params: params});
    },
    getBaseBuyOrderList (params) {
        return fetch('/buyOrderList', {params: params});
    },
    getBaseMoveOrderList (params) {
        return fetch('/moveOrderList', {params: params});
    }
};
