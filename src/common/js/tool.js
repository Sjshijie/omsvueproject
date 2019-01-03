import Vue from 'vue';
import util from '../../common/js/util';
import config from '../../common/js/config';

var tool = {
    watch: {
        '$route.params'() {
            this.$i18n.locale = this.$route.params.lang;
        }
    },
    methods: {
        showMsg(text) {
            return this.$message({
                showClose: true,
                message: text,
                type: 'warning'
            });
        },
        successMsg(text) {
            return this.$message({
                showClose: true,
                message: text,
                type: 'success'
            });
        },
        errorMsg(text) {
            return this.$message({
                showClose: true,
                message: text,
                type: 'error'
            });
        },
        confirm(text, callback) {
            this.$confirm(text, '提示', {
                type: 'warning'
            }).then(() => {
                callback();
            }).catch(error => console.log(error));
        },
        // 获取按钮信息列表
        getButtonList(key) {
            let _this = this;
            util.publicpost(
                '/resource/button',
                {parentID: key},
                function (res) {
                    if (res.success) {
                        _this.resButton = res.data;
                        _this.resButton.map((item, index) => {
                            if ($('.' + item)) {
                                $('.' + item).show();
                            }
                        });
                    } else {
                        _this.errorMsg(_this.$t(res.msg));
                    }
                }, config.auth_service_ip);
        },
        // 权限判断是否显示
        permissions(key) {
            return $.inArray(key, this.resButton) !== -1;
        }
        // permissions(key) {
        //     let _this = this;
        //     if (!_this.resButton) {
        //         _this.resButton = util.cookie.get('permission');
        //         return $.inArray(key, _this.resButton) !== -1;
        //     } else {
        //         return $.inArray(key, _this.resButton) !== -1;
        //     }
        // }
    }
};

Vue.mixin(tool);
