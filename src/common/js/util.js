import axios from 'axios/index';
import config from './config.js';
import cookieOperation from './cookieOperation.js';
import Vue from 'vue';

export default {
    /**
     * 公共HTTP POST 请求
     * @param url
     * @param param
     * @param callback
     */
    publicpost: function (url, param, callback, ip) {
        axios.defaults.timeout = 60000;
        if (ip === undefined || ip === '') {
            ip = config.base_service_ip;
        }
        // 设置document.domain
        // let accessToken = cookieOperation.cookie.get('access_token');
        let accessToken = '3c253482edf04d5d88895c8641bf1740';
        if (accessToken) {
            axios.post(ip + url, param, {
                headers: {
                    'access_token': accessToken
                }
            }).then(res => {
                if (res.data.code === 401) {
                    cookieOperation.cookie.delete('access_token');
                    // cookieOperation.cookie.delete('permission');
                    setTimeout(function () {
                        let res = {
                            success: false,
                            msg: '本次操作失败，需重新登录'
                        };
                        callback(res);
                    }, 2000);
                    setTimeout(function () {
                        top.location.href = config.login_ip;
                    }, 4000);
                } else {
                    callback(res.data);
                }
            }, err => {
                if (err.status === 200) {
                    if (err.data.code === 401) {
                        cookieOperation.cookie.delete('access_token');
                        // cookieOperation.cookie.delete('permission');
                        setTimeout(function () {
                            let res = {
                                success: false,
                                msg: '本次操作失败，需重新登录'
                            };
                            callback(res);
                        }, 2000);
                        setTimeout(function () {
                            top.location.href = config.login_ip;
                        }, 4000);
                    } else {
                        callback(err.data);
                    }
                } else {
                    if (err.message === 'Network Error') {
                        let res = {
                            success: false,
                            msg: '网络连接异常，请检查网络连接！'
                        };
                        callback(res);
                    } else {
                        let res = {
                            success: false,
                            msg: '登录超时，请重新登录！'
                        };
                        callback(res);
                    }
                }
            });
        } else {
            top.location.href = config.login_ip;
        }
    },
    /**
     * 转换字典
     * @param json 字典
     * @param key 需要转换的值
     * @returns {*}
     */
    formatDict: function (json, key) {
        for (let i = 0; i < json.length; i++) {
            let name = json[i].name;
            if (key === name) {
                return json[i].des;
            }
        }
        return '';
    },
    /**
     * 是否为空
     * @param text
     * @returns {boolean}
     */
    isEmpty: function (text) {
        if (text === undefined || text === null || text === '') {
            return true;
        }
        return false;
    },
    /**
     * 根据编码展示地址名称
     * @param item
     * @param data
     * @returns {*}
     */
    loadadds: function (item, data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].code === item) {
                // console.log(data[i].fullName);
                return data[i].name;
            }
        }
    },
    getQueryStringByName: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        var context = '';
        if (r != null) {
            context = r[2];
        }
        reg = null;
        r = null;
        return context == null || context === '' || context === 'undefined' ? '' : context;
    },
    formatDate: {
        format: function (date, pattern) {
            pattern = pattern || DEFAULT_PATTERN;
            return pattern.replace(SIGN_REGEXP, function ($0) {
                switch ($0.charAt(0)) {
                    case 'y':
                        return padding(date.getFullYear(), $0.length);
                    case 'M':
                        return padding(date.getMonth() + 1, $0.length);
                    case 'd':
                        return padding(date.getDate(), $0.length);
                    case 'w':
                        return date.getDay() + 1;
                    case 'h':
                        return padding(date.getHours(), $0.length);
                    case 'm':
                        return padding(date.getMinutes(), $0.length);
                    case 's':
                        return padding(date.getSeconds(), $0.length);
                }
            });
        },
        parse: function (dateString, pattern) {
            var matchs1 = pattern.match(SIGN_REGEXP);
            var matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length === matchs2.length) {
                var _date = new Date(1970, 0, 1);
                for (var i = 0; i < matchs1.length; i++) {
                    var _int = parseInt(matchs2[i]);
                    var sign = matchs1[i];
                    switch (sign.charAt(0)) {
                        case 'y':
                            _date.setFullYear(_int);
                            break;
                        case 'M':
                            _date.setMonth(_int - 1);
                            break;
                        case 'd':
                            _date.setDate(_int);
                            break;
                        case 'h':
                            _date.setHours(_int);
                            break;
                        case 'm':
                            _date.setMinutes(_int);
                            break;
                        case 's':
                            _date.setSeconds(_int);
                            break;
                    }
                }
                return _date;
            }
            return null;
        }
    },
    /**
     * 省,市,县,街道 四级联动
     * @param name
     * @param key
     * @param _this
     */
    addressChange: function (name, key, _this) {
        // console.log(name)
        // console.log(key)
        // console.log(_this)
        if (key === null || key === '') {
            return;
        }
        let type = '';
        if (name === 'addressed') {
            type = 'COUNTRY';
        } else if (name === 'city') {
            type = 'PROVINCE';
        } else if (name === 'county') {
            type = 'CITY';
        } else if (name === 'street') {
            type = 'COUNTY';
        }
        this.publicpost('/regionalAddress/selectAddress', {
            code: key,
            type: type
        }, function (res) {
            if (res.code === 0) {
                _this[name] = res.data;
            } else {
                _this.$message({
                    showClose: true,
                    message: '获取失败',
                    type: 'error'
                });
            }
            _this.editLoading = false;
        });
    },

    /**
     * 区划信息回写
     * @param _this
     * @param name
     * @param id
     * @param fullName
     */
    formatAddress: function (_this, name, id, fullName) {
        if (id === null || id === '') {
            return;
        }
        if (name === null || name === '') {
            return;
        }
        const list = _this[name];
        let flag = 'true';
        list.forEach(function (item) {
            if (id === item.id) {
                flag = 'false';
            }
        });
        if (flag === 'true') {
            let map = {'id': id, 'fullName': fullName};
            _this[name].push(map);
        }
    },
    /**
     * 将字段的大写字母转换成下划线加小写字母
     * @param str
     * @returns {*}
     * @constructor
     */
    dtotoLower: function (str) {
        str = str.replace(/[A-Z]/g, function (ch) {
            return '_' + String.fromCharCode(ch.charCodeAt(0) | 32);
        });
        return str;
    },
    /**
     * 截取asc或desc
     * @param str
     * @returns {string}
     */
    dtopx: function (str) {
        if (str.startsWith('a')) {
            return str.substring(0, 3);
        } else {
            return str.substring(0, 4);
        }
    },
    /**
     * 验证手机号
     */
    isvalidPhone: function (rule, value, callback, whether) {
        const reg = /^[0-9]{1,13}$/;
        if (whether === 'required') {
            if (!value) {
                callback(new Error('请输入电话号码'));
            } else if (!(reg.test(value))) {
                callback(new Error('请输入正确的电话号码'));
            } else {
                callback();
            }
        } else {
            if (!value) {
                callback();
            } else if (!(reg.test(value))) {
                callback(new Error('请输入正确的电话号码'));
            } else {
                callback();
            }
        }
    },
    /**
     * 验证手机号
     */
    isvalidPhoneTo: function (letter) {
        const reg = /^[1][0-9][0-9]{9}$/;
        return reg.test(letter);
    },
    /**
     * 验证只能输入数字
     */
    numberLetterTo: function (letter) {
        const reg = /^[0-9]*$/g;
        return reg.test(letter);
    },
    /**
     * 是否有特殊字符
     */
    stripscript: function (rule, value, callback) {
        let regEn = /[`~!#$%^&*+<>?:"{},\/;'[\]]/im;
        let regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
        // let reg = /^[0-9a-zA-Z]*$/g;
        if (regEn.test(value) || regCn.test(value)) {
            callback(new Error('您输入的信息不匹配！'));
        } else {
            callback();
        }
        // return rs;
    },
    /**
     * 验证只能输入中文，英文，数字及._-@()
     */
    stripscriptName: function (rule, value, callback) {
        let regEn = /[`~!#$^&<>?:"{},;'[\]]/im;
        let regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
        // let reg = /^[0-9a-zA-Z]*$/g;
        if (regEn.test(value) || regCn.test(value)) {
            callback(new Error('只能输入中文，英文，数字及._-@()'));
        } else {
            callback();
        }
        // return rs;
    },
    // 行内编辑——是否含有特殊字符
    stripscriptrow: function (value) {
        let regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
        let regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
        if (regEn.test(value) || regCn.test(value)) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 验证url
     */
    IsURL: function (rule, value, callback) {
        let strRegex = '\\b(([\\w-]+://?|www[.])[^\\s()<>]+(?:\\([\\w\\d]+\\)|([^[:punct:]\\s]|/)))';
        let re = new RegExp(strRegex);
        if (!value) {
        } else if (!re.test(value)) {
            callback(new Error('您输入的url不匹配'));
        } else {
            callback();
        }
    },
    // 邮箱
    isEmail: function (rule, value, callback, whether) {
        const reg = /^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@([a-zA-Z0-9]+[-a-zA-Z0-9]*[a-zA-Z0-9]+.){1,63}[a-zA-Z0-9]+$/;
        if (whether === 'required') {
            if (!value) {
                callback(new Error('请输入邮箱'));
            } else if (!reg.test(value)) {
                callback(new Error('请输入正确的邮箱'));
            } else {
                callback();
            }
        } else {
            if (!value) {
                callback();
            } else if (!reg.test(value)) {
                callback(new Error('请输入正确的邮箱'));
            } else {
                callback();
            }
        }
    },
    /**
     * 验证身份证
     */
    identityCard: function (identityCard) {
        const reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
        return reg.test(identityCard);
    },
    /**
     * 验证只能输入数字，字母，或者数字字母组合
     */
    numberLetter: function (rule, value, callback) {
        const reg = /^[0-9a-zA-Z]*$/g;
        if (!value) {
        } else if (!reg.test(value)) {
            callback(new Error('您输入的格式有误'));
        } else {
            callback();
        }
        // return reg.test(letter);
    },
    /**
     * 验证只能输入文字
     */
    verificationChinese: function (chinesestr) {
        const reg = /^[\u2E80-\u9FFF]+$/;
        return reg.test(chinesestr);
    },
    /**
     *  校验邮编,不带提示信息
     * @param chinesestr
     * @returns {boolean}
     */
    validPostcode: function (chinesestr) {
        const reg = /^[0-9][0-9]{5}$/;
        return reg.test(chinesestr);
    },
    /**
     * 验证邮编
     */
    isPostalCode: function (rule, value, callback, whether) {
        const reg = /^[0-9][0-9]{5}$/;
        if (!value) {
            // callback(new Error('请输入邮编号码'));
            callback();
        } else if (value && !reg.test(value)) {
            callback(new Error('请输入正确的6位邮编号码'));
        } else {
            callback();
        }
        // return reg.test(text);
    },

    validMDName: function (rule, value, callback) {
        const reg = /^[\u4E00-\u9FA5_0-9a-zA-Z/\.\-_@\-\-\(\)\（\）]*$/g;
        if (!reg.test(value)) {
            callback(new Error('您输入的信息不匹配！'));
        } else {
            callback();
        }
    },

    validPrice: function (rule, value, callback) {
        const reg = /^[\u4E00-\u9FA5_0-9a-zA-Z/\.\-]*$/g;
        if (!reg.test(value)) {
            callback(new Error('您输入的信息不匹配！'));
        } else {
            callback();
        }
    },
    /*
    * 验证只能输入数字或字符
    * */
    validCode: function (rule, value, callback) {
        // let reg = /^[0-9a-zA-Z]*$/g;
        let regTo = /^[0-9a-zA-Z\.\*\-\(\)/]+$/g;
        // let regEn = /[`~!@#$%^&*()_+<>?:"{},\/;'[\]]/im;
        // let regCn = /[·！#￥（）：；“”‘、，|《。》？、【】[\]]/im;
        if (!regTo.test(value)) {
            callback(new Error('只能输入数字或字母'));
        } else {
            callback();
        }
    },
    /*
    * 验证只能输入英文，数字及 ._-@()
    * */
    validSpecialCode: function (rule, value, callback) {
        let regTo = /^[0-9a-zA-Z\_\-\.\@\(\)/]+$/g;
        if (!value) {
            callback();
        } else if (!regTo.test(value)) {
            callback(new Error('只可输入英文，数字及 ._-@()'));
        } else {
            callback();
        }
    },
    /**
     * 验证只邮箱行内的编辑
     */
    isPostalCodeTo: function (letter) {
        const reg = /^[0-9][0-9]{5}$/;
        return reg.test(letter);
    },
    /**
     * 验证只能输入数字并且是>0的数字
     */
    verifyFigure: function (rule, figure, callback) {
        let reg = /^[0-9]\d*(\.\d+)?$/;
        // return reg.test(figure);
        if (!figure) {
            // callback(new Error('请输入数字值'));
        } else if (figure && !reg.test(figure)) {
            callback(new Error('请输入正确的数字值'));
        } else {
            callback();
        }
    },
    /**
     * 验证只能输入数字并且是>0的数字 非必填文本
     */
    verifyFigureTo: function (rule, value, callback) {
        const reg = /^[1-9]\d*(\.\d+)?$/;
        // return reg.test(figure);
        if (!value) {
            callback();
        } else if (!reg.test(value)) {
            callback(new Error('请输入正确的数字值'));
        } else {
            callback();
        }
    },
    /**
     * 验证只能输入正整数字
     */
    PositiveInteger: function (rule, value, callback) {
        const reg = /^[0-9]{1,20}$/;
        if (!value) {
            callback();
        } else if (!reg.test(value)) {
            callback(new Error('请输入正确的数字值'));
        } else {
            callback();
        }
    },
    /**
     * 五级联动 选择清空
     */
    PyatyiLinkage: function (name, _this, Form) {
        if (Form === 'add') {
            if (name === 'addressed') {
                _this.addForm.provinceId = '';
                _this.addForm.cityId = '';
                _this.addForm.districtId = '';
                _this.addForm.streetId = '';

                _this.addForm.provinceName = '';
                _this.addForm.cityName = '';
                _this.addForm.districtName = '';
                _this.addForm.streetName = '';

                _this.addressed = [];
                _this.city = [];
                _this.county = [];
                _this.street = [];
            } else if (name === 'city') {
                _this.addForm.cityId = '';
                _this.addForm.districtId = '';
                _this.addForm.streetId = '';
                _this.addForm.cityName = '';
                _this.addForm.districtName = '';
                _this.addForm.streetName = '';

                _this.city = [];
                _this.county = [];
                _this.street = [];
            } else if (name === 'county') {
                _this.addForm.districtId = '';
                _this.addForm.streetId = '';
                _this.addForm.districtName = '';
                _this.addForm.streetName = '';
                _this.county = [];
                _this.street = [];
            } else {
                _this.addForm.streetId = '';
                _this.addForm.streetName = '';

                _this.street = [];
            }
        } else {
            if (name === 'addressed') {
                _this.addForm.provinceId = '';
                _this.addForm.cityId = '';
                _this.addForm.districtId = '';
                _this.addForm.streetId = '';

                _this.addForm.provinceName = '';
                _this.addForm.cityName = '';
                _this.addForm.districtName = '';
                _this.addForm.streetName = '';

                _this.editForm.provinceId = '';
                _this.editForm.cityId = '';
                _this.editForm.districtId = '';
                _this.editForm.streetId = '';

                _this.editForm.provinceName = '';
                _this.editForm.cityName = '';
                _this.editForm.districtName = '';
                _this.editForm.streetName = '';

                _this.addressed = [];
                _this.city = [];
                _this.county = [];
                _this.street = [];
            } else if (name === 'city') {
                _this.addForm.cityId = '';
                _this.addForm.districtId = '';
                _this.addForm.streetId = '';
                _this.addForm.cityName = '';
                _this.addForm.districtName = '';
                _this.addForm.streetName = '';

                _this.editForm.cityId = '';
                _this.editForm.districtId = '';
                _this.editForm.streetId = '';
                _this.editForm.cityName = '';
                _this.editForm.districtName = '';
                _this.editForm.streetName = '';
                _this.city = [];
                _this.county = [];
                _this.street = [];
            } else if (name === 'county') {
                _this.addForm.districtId = '';
                _this.addForm.streetId = '';
                _this.addForm.districtName = '';
                _this.addForm.streetName = '';

                _this.editForm.districtId = '';
                _this.editForm.streetId = '';
                _this.editForm.districtName = '';
                _this.editForm.streetName = '';
                _this.county = [];
                _this.street = [];
            } else {
                _this.addForm.streetId = '';
                _this.addForm.streetName = '';

                _this.editForm.streetId = '';
                _this.editForm.streetName = '';
                _this.street = [];
            }
        }
    }
};

var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';

function padding(s, len) {
    var leng = len - (s + '').length;
    for (var i = 0; i < leng; i++) {
        s = '0' + s;
    }
    return s;
}
