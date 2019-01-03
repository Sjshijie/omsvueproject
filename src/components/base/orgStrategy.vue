// 组织分仓策略管理
<template>
    <div class="admin">
        <!-- 查询模块 -->
        <div class="query-top">
            <em name="" class="fl el-icon-search"></em>
            <h6 class="fl titleInfo">{{ $t('common.searchInfo') }}</h6>
            <el-button plain class="fr" :icon="toggleDrop" @click="showSearch = !showSearch"></el-button>
        </div>
        <el-collapse-transition>
            <div v-show="showSearch">
                <div class="query-content transDrop">
                    <el-form size="mini" :inline="true" label-width="80px" :model="formInline" class="demo-form-inline"
                             status-icon ref="formInline">
                        <el-row :gutter="10">
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item label="组织名称：">
                                    <el-input v-model="formInline.orgName" placeholder="请输入组织名称"
                                              :maxlength="50"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="18" :lg="18" :xl="18">
                                <el-form-item label="策略类型：" class="strategy_font">
                                    <el-checkbox-group v-model="checkedCities" @change="changeTypeQuery"
                                                       style="width:400px;">
                                        <el-checkbox v-for="item in this.dict.type" :key="item.des"
                                                     :label="item.name" :value="item.des">{{item.des}}
                                        </el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="footer-but tar pad_r pad_t">
                            <el-button type="primary" @click="selectList">{{ $t('button.query') }}</el-button>
                            <el-button @click="resetForm">{{ $t('button.reset') }}</el-button>
                        </div>
                    </el-form>
                </div>
            </div>
        </el-collapse-transition>

        <!--新增、删除-->
        <div class="add_move def-but">
            <el-button @click="handleAdd" v-if="permissions('base_orgStrategy_add')">{{ $t('button.add') }}</el-button>
        </div>

        <!-- 列表 -->
        <div class="list_region list_operation orgStrategy_list">
            <el-table highlight-current-row stripe :data="orgStrategyList" v-loading="listLoading" @selection-change="selChange"
                      style="width: 100%;" border :fit="true" align="center">
                <!--<el-table-column type="selection" align="center" isEditing="false" width="55"></el-table-column>-->
                <el-table-column label="组织名称" prop="orgName" align="center" sortable text-overflow="ellipsis"
                                 show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="组织编码" prop="orgCode" align="center" sortable text-overflow="ellipsis"
                                 show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="策略类型" prop="type"
                                 :formatter="formatterOrgStrategyType" align="center" text-overflow="ellipsis"
                                 show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="状态" isEditing="true" prop="status"
                                 :formatter="formatterOrgStrategyStatus" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="最后修改人" prop="updater" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="最后修改时间" prop="updateTime" align="center"
                                 :formatter="formatterOrgStrategyUpdate" text-overflow="ellipsis" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作" align="center" width="180">
                    <template slot-scope="scope">
                        <el-tooltip content="修改" placement="top" effect="light" v-if="permissions('base_orgStrategy_update')">
                            <div @click="updateMethod(scope.row)" class="operation_icon icon1"></div>
                        </el-tooltip>
                        <div @click="enableMethod(scope.row)" v-if="scope.row.status === 'INEFFECTIVENESS'">
                            <el-tooltip content="启用" placement="top" effect="light" v-if="permissions('base_orgStrategy_enable')">
                                <div class="operation_icon icon2"></div>
                            </el-tooltip>
                        </div>
                        <div @click="disableMethod(scope.row)" v-if="scope.row.status === 'AVAILABILITY'">
                            <el-tooltip content="禁用" placement="top" effect="light" v-if="permissions('base_orgStrategy_disable')">
                                <div class="operation_icon icon3"></div>
                            </el-tooltip>
                        </div>
                        <el-tooltip content="删除" placement="top" effect="light" v-if="permissions('base_orgStrategy_delete')">
                            <div @click="deleteMethod(scope.row)" class="operation_icon icon4"></div>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 工具条 -->
            <el-col :span="24" class="toolbar">
                <em class="el-icon-refresh fr mar_lr table-refresh"></em>
                <div class="block fr">
                    <el-pagination @size-change="sizeChange" @current-change="pageChange"
                                   :current-page="this.pager.page"
                                   :page-sizes="[5, 10, 20, 50]" :page-size="this.pager.rows"
                                   layout="total,sizes, prev, pager, next, jumper"
                                   :total="this.pager.total"></el-pagination>
                </div>
            </el-col>
        </div>


        <!-- 新增界面 -->
        <el-dialog :visible.sync="addFormVisible" :close-on-click-modal="false"
                   style="line-height: 0;overflow: hidden;font-size: 12px;" class="def-but default-dialog " ref="addForm"
                   :title="titles" :before-close="handleClose">
            <div class="form form-add" style="height: 80px;">
                <el-form label-width="100px" size="mini">
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="组织名称：" prop="orgName">
                                <!--<el-tooltip content="最多输入50个字符" placement="right" effect="light">
                                  <el-input v-model="addForm.orgName" :maxlength="50" placeholder="根据组织名称和编码查询"></el-input>
                                </el-tooltip>-->
                                <el-cascader :options="orgList" change-on-select v-model="addForm.orgNames"
                                             :props="{value:'orgID',label:'orgName'}" @change="orgChoiceMethod" :disabled="orgCasFlag" v-if="hideoOrgFlag"></el-cascader>
                                <el-input v-model="addForm.orgName" :maxlength="50" placeholder="根据组织名称和编码查询" v-if="hideoOrgFlagImpt" :disabled="true"></el-input>
                               <!-- <el-autocomplete
                                        class="inline-input"
                                        v-model="addForm.orgName"
                                        :fetch-suggestions="orgSelectMethod"
                                        placeholder="根据组织名称和编码查询"
                                        @select="orgChoiceMethod"
                                        :trigger-on-focus="false"
                                        @blur="blur"
                                        :disabled="this.disabledTo"
                                ></el-autocomplete>-->
                            </el-form-item>
                        </div>
                    </el-col>
                    <!--<el-col :span="12">-->
                        <!--<div class="grid-content bg-purple">-->
                            <!--<el-form-item label="策略优先级：" prop="rank">-->
                                <!--<el-input v-model="addForm.rank" :maxlength="50" @change="rankCheck"-->
                                          <!--placeholder="请输入策略优先级"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</div>-->
                    <!--</el-col>-->
                    <el-col :span="24">
                        <div class="grid-content bg-purple">
                            <el-form-item label="策略类型：">
                                <el-checkbox-group v-model="addCheckedCities" @change="changeType" style="width:400px;">
                                    <el-checkbox v-for="item in this.dict.type" :key="item.des"
                                                 :label="item.name" :value="item.des">{{item.des}}
                                    </el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="submitAdd">{{ $t('button.save') }}</el-button>
                <el-button @click="cancelAdd">{{ $t('button.cancel') }}</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import util from '../../common/js/util';

    export default {
        data() {
            return {
                currencyPanelName: '',
                loading: false,
                formInline: {
                    orgName: '',
                    pageTypes: []
                },
                addForm: {
                    orgName: '',
                    orgNames: [],
                    orgCode: '',
                    rank: '1',
                    type: '',
                    id: '',
                    version: '',
                    pageTypes: [],
                    typsAll: []
                },
                pager: {
                    page: 1,
                    rows: 10,
                    total: 0
                },
                disabledTo: false,
                soldList: [],
                dict: [],
                shipperList: [],
                materialList: '',
                warehouseList: '',
                orgStrategyList: [],
                listLoading: false,
                lookFormVisible: false, // 查看界面是否显示
                lookFormRules: {},
                sel: [], // 列表选中列
                currentList: null,
                editFormVisible: false, // 编辑界面是否显示
                editLoading: false,
                addFormVisible: false,
                // 查询框折叠展开
                showSearch: true,
                titles: '',
                checkedCities: [],
                addCheckedCities: [],
                orgList: [],
                orgCasFlag : false,
                hideoOrgFlag : false,
                hideoOrgFlagImpt : true,
                idVserions : []
            };
        },
        methods: {
            // 选择行数
            sizeChange(rows) {
                this.pager.rows = rows;
                this.selectList();
            },
            // 勾选
            selChange: function (sel) {
                this.sel = sel;
            },
            // 分页
            pageChange(currentPage) {
                this.pager.page = currentPage;
                this.selectList();
            },
            // 添加
            handleAdd: function () {
                this.orgCasFlag = false;
                this.addFormVisible = true;
                this.hideoOrgFlag = true;
                this.hideoOrgFlagImpt = false;
                this.currencyPanelName = 'add';
                this.titles = '添加数据';
                let that = this;
                util.publicpost('/orgRelationship/orgRelationshipOrgTree', {}, function (res) {
                    if (res.code === 0) {
                        that.orgList = res.data;
                    } else {
                        that.errorMsg(that.$t(res.msg));
                    }
                });
            },
            // 取消
            cancelAdd: function () {
                let that = this;
                that.addForm.orgCode = '';
                that.addForm.orgName = '';
                that.addForm.type = '';
                that.addForm.rank = '';
                that.addForm.id = '';
                that.addForm.version = '';
                that.addCheckedCities = [];
                that.addFormVisible = false;
	            that.addForm.orgNames = [];
                // that.selectList();
            },
            handleClose: function() {
                let that = this;
                that.cancelAdd();
            },
            // 提交
            submitAdd: function () {
                for (let i = 0; i < this.dict.type.length; i++) {
                    this.addForm.typsAll.push(this.dict.type[i].name);
                }
                let that = this;
                if (that.currencyPanelName === 'add') {
                    let data = {
                        orgCode: that.addForm.orgCode,
                        orgName: that.addForm.orgName,
                        /* type: that.addForm.type, */
                        rank: that.addForm.rank,
                        pageTypes: that.addForm.pageTypes,
                        typeAll: that.addForm.typsAll
                    };
	                that.addForm.typsAll = [];
                    that.confirm('确定要新增组织分仓策略吗？', function () {
                        util.publicpost(
                            '/orgStrategy/insertOrgStrategy',
                            data,
                            function (res) {
                                if (res.code === 0) {
                                    that.cancelAdd();
                                    that.successMsg(that.$t(res.msg));
                                    that.selectList();
                                } else {
                                    that.errorMsg(that.$t(res.msg));
                                }
                            }
                        );
                    });
                } else {
                    let data = {
                        orgCode: that.addForm.orgCode,
                        orgName: that.addForm.orgName,
                        type: that.addForm.type,
                        rank: that.addForm.rank,
                        pageTypes: that.addForm.pageTypes,
                        typeAll: that.addForm.typsAll,
                        idVserions: that.idVserions
                    };
                    that.confirm('确定要更新组织分仓策略吗？', function () {
                        util.publicpost(
                            '/orgStrategy/updateOrgStrategy',
                            data,
                            function (res) {
                                if (res.code === 0) {
                                    that.cancelAdd();
                                    that.successMsg(that.$t(res.msg));
                                    that.selectList();
                                } else {
                                    that.errorMsg(that.$t(res.msg));
                                }
                            }
                        );
                    });
                }
            },
            // 重置
            resetForm() {
                this.formInline.orgName = '';
                this.checkedCities = [];
                /* this.selectList(); */
            },
            // 策略优先级校验
            rankCheck(value) {
                let _this = this;
                let reg = /^[1-9]\d*$/;
                if (value) {
                    if (!RegExp(reg).test(value)) {
                        _this.addForm.rank = '';
                    }
                }
            },
            // 选择复选框
            changeType(val) {
                let _this = this;
                /* _this.addForm.type = val[0]; */
                _this.addForm.pageTypes = val;
            },
            // 查询条件复选框
            changeTypeQuery(val) {
                this.formInline.pageTypes = val;
            },
            // 查询数据列表
            selectList() {
                let _this = this;
                _this.listLoading = true;
                _this.orgStrategyList = [];
                util.publicpost(
                    '/orgStrategy/selectOrgStrategyList',
                    {
                        orgName: this.formInline.orgName,
                        page: this.pager.page,
                        rows: this.pager.rows,
                        pageTypes: this.checkedCities
                    },
                    function (res) {
                        if (res.code === 0) {
                            _this.listLoading = false;
                            _this.pager.total = res.pager.totalCount || 0;
                            res.result.forEach(item => {
                                const createTime = item.createTime
                                    ? new Date(item.createTime)
                                    : '';
                                const updateTime = item.updateTime
                                    ? new Date(item.updateTime)
                                    : '';
                                item.showCreateTime = createTime
                                    ? createTime.getFullYear() +
                                    '-' +
                                    (createTime.getMonth() + 1) +
                                    '-' +
                                    createTime.getDate()
                                    : '';
                                item.showUpdateTime = updateTime
                                    ? updateTime.getFullYear() +
                                    '-' +
                                    (updateTime.getMonth() + 1) +
                                    '-' +
                                    updateTime.getDate()
                                    : '';
                                item.isEditing = false;
                                console.log(item.showCreateTime, item.showUpdateTime);
                            });
                            _this.orgStrategyList = res.result;
                        } else {
                            _this.listLoading = false;
                            _this.errorMsg('服务器繁忙！');
                        }
                        _this.dict = res.enumVal;
                    }
                );
            },
            error: function (text) {
                this.$message({
                    showClose: true,
                    message: text,
                    type: 'error'
                });
            },
            // 策略类型转换
            formatterOrgStrategyType(row, column) {
                let key = row.type;
                let json = this.dict.type;
                return util.formatDict(json, key);
            },
            // 状态转换
            formatterOrgStrategyStatus(row, column) {
                let key = row.status;
                let json = this.dict.status;
                return util.formatDict(json, key);
            },
            // 修改时间转换
            formatterOrgStrategyUpdate(row, column) {
                return row.updateTime
                    ? util.formatDate.format(
                        new Date(row.updateTime),
                        'yyyy-MM-dd hh:mm:ss'
                    )
                    : '';
            },
            // 修改
            updateMethod: function (row) {
                this.orgCasFlag = true;
                this.titles = '修改数据';
                this.addFormVisible = true;
                this.hideoOrgFlagImpt = true;
                this.hideoOrgFlag = false;
                this.currencyPanelName = 'upa';
                this.addForm.orgName = row.orgName;
                this.addForm.orgCode = row.orgCode;
                this.addForm.rank = row.rank;
                this.addForm.id = row.id;
                this.addForm.version = row.version;
                /* this.addForm.type = row.type; */
                let that = this;
                that.addCheckedCities = [];
                that.idVserions = [];
                util.publicpost('/orgStrategy/selectByOrg', {orgCode : row.orgCode}, function (res) {
                    if (res.code === 0) {
                        for (let i = 0; i < res.data.length; i++) {
                            if (res.data[i].delStatus === 'NO') {
                                that.addCheckedCities.push(res.data[i].type);
                            }
                            that.idVserions.push(res.data[i].id + '-' + res.data[i].version + '-' + res.data[i].type);
                        }
                    } else {
                        that.errorMsg(that.$t(res.msg));
                    }
                });
            },
            // 禁用
            disableMethod: function (row) {
                let _this = this;
                let pageId = row.id;
                let pageVersion = row.version;
                _this.listLoading = true;
                util.publicpost(
                    '/orgStrategy/disableStatus',
                    {
                        id: pageId,
                        version: pageVersion
                    },
                    function (res) {
                        _this.listLoading = false;
                        if (res.success) {
                            if (res.data === 0) {
                                _this.errorMsg('服务器繁忙！');
                            } else {
                                _this.successMsg(_this.$t('msg.success'));
                                _this.selectList();
                            }
                        } else {
                            let msg = '';
                            if (!util.isEmpty(res.msg)) {
                                msg = ',' + _this.$t(res.msg);
                            }
                            _this.errorMsg(_this.$t('msg.error') + msg);
                        }
                    }
                );
            },
            // 启用
            enableMethod: function (row) {
                let _this = this;
                let pageId = row.id;
                let pageVersion = row.version;
                _this.listLoading = true;
                util.publicpost(
                    '/orgStrategy/enableStatus',
                    {
                        id: pageId,
                        version: pageVersion
                    },
                    function (res) {
                        _this.listLoading = false;
                        if (res.success) {
                            if (res.data === 0) {
                                _this.errorMsg('服务器繁忙！');
                            } else {
                                _this.successMsg(_this.$t('msg.success'));
                                _this.selectList();
                            }
                        } else {
                            let msg = '';
                            if (!util.isEmpty(res.msg)) {
                                msg = ',' + _this.$t(res.msg);
                            }
                            _this.errorMsg(_this.$t('msg.error') + msg);
                        }
                    }
                );
            },
            // 删除
            deleteMethod: function (row) {
                let _this = this;
                console.log(row.id);
                console.log(row);
                let ids = row.id;
                let versions = row.version;
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        this.listLoading = true;
                        let para = {orgStrategyId: ids, version: versions};
                        util.publicpost('/orgStrategy/deleteOrgStrategy', para, function (
                            res
                        ) {
                            _this.listLoading = false;
                            if (res.success) {
                                if (res.data === 0) {
                                    _this.errorMsg('服务器繁忙！');
                                } else {
                                    _this.successMsg(_this.$t('msg.success'));
                                    _this.selectList();
                                }
                            } else {
                                let msg = '';
                                if (!util.isEmpty(res.msg)) {
                                    msg = ',' + _this.$t(res.msg);
                                }
                                _this.errorMsg(_this.$t('msg.error') + msg);
                            }
                        });
                    })
                    .catch(error => console.log(error));
            },
            // 查询组织
            orgSelectMethod(queryOrgName, callback) {
                let list = [];
                let _this = this;
                _this.orgList = [];
                _this.loading = true;
                util.publicpost('/orgStrategy/queryListByOrgName', {orgName: queryOrgName}, function (
                    res
                ) {
                    if (res.code === 0) {
                        _this.loading = false;
                        if (res.data) {
                            for (let i of res.data) {
                                i.value = i.orgName;
                                i.id = i.orgCode;
                            }
                            list = res.data;
                            callback(list);
                        }
                    } else {
                        _this.$message({
                            message: _this.$t(res.msg),
                            type: 'error'
                        });
                    }
                });
            },
            orgChoiceMethod(time) {
                let that = this;
                let orgID = time[time.length - 1];
                that.addForm.orgCode = orgID;
                console.log(that.addForm.orgNames);
                /* that.addForm.orgName = obj.orgName;
                that.addForm.orgCode = obj.orgCode; */
                /* that.orgList = time;
                that.addForm.orgName = time.orgName;
                that.addForm.orgCode = time.orgCode; */
            },
            // 失去焦点
            blur() {
                let that = this;
                if (that.orgList.length === 0) {
                    that.addForm.orgName = '';
                    that.addForm.orgCode = '';
                }
            }
        },
        computed: {
            toggleDrop() {
                return this.showSearch ? 'el-icon-arrow-up' : 'el-icon-arrow-down';
            }
        },
        mounted() {
            this.selectList();
            this.getButtonList();

        }
    };
</script>
<style>
.bg-purple .el-checkbox__label,.strategy_font .el-checkbox__label{
    font-size: 12px;
}
    .orgStrategy_list .el-table__body-wrapper{
        overflow: hidden;
    }
</style>
