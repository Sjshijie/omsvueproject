// 事业部管理
<template>
    <div class="admin">
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
                                <el-form-item :label="$t('businessThead.code') + '：'">
                                    <el-input v-model="formInline.code" :placeholder="$t('common.pleaseEnter') + $t('businessThead.code')"
                                              :maxlength='20'></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item :label="$t('businessThead.name') + '：'">
                                    <el-input v-model="formInline.name" :placeholder="$t('common.pleaseEnter') + $t('businessThead.name')"
                                              :maxlength='100'></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item :label="$t('commonThead.status') + '：'">
                                    <el-select v-model="formInline.status" :placeholder="$t('common.pleaseChoose')">
                                        <el-option
                                                v-for="item in dict.status"
                                                :key="item.name"
                                                :label="item.des"
                                                :value="item.name">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="footer-but tar pad_r pad_t">
                            <el-button type="primary" @click="selectList">{{ $t('button.query') }}</el-button>
                            <el-button @click="resetForm('formInline')">{{ $t('button.reset') }}</el-button>
                        </div>
                    </el-form>
                </div>
            </div>
        </el-collapse-transition>

        <!--新增、删除-->
        <div class="add_move def-but">
            <el-button @click="handleAdd" v-if="permissions('base_cause_add')">{{ $t('button.add') }}</el-button>
            <el-button @click="handleEdit" :disabled="currentRow === null" v-if="permissions('base_cause_save')">{{ $t('button.save') }}</el-button>
            <el-button @click="cancelEdit" :disabled="currentRow === null" v-if="permissions('base_cause_cancel')">{{ $t('button.cancel') }}</el-button>
        </div>

        <!-- 列表 -->
        <div class="list_business list_operation">
            <el-table  highlight-current-row stripe :data="currentList" v-loading="listLoading" @cell-dblclick="handleDbl"
                      @selection-change="selChange"
                      style="width: 100%;" :fit="true" border align="center">
                <!-- <el-table-column type="selection" align="center" isEditing="true" width="55" @click="selChange(1)"></el-table-column> -->
                <el-table-column :label="$t('commonThead.index')" align="center" type="index" width="50"></el-table-column>
                <el-table-column width="120" :label="$t('businessThead.code')" prop="code" align="center" sortable show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="error-tip" v-show="scope.row.errorCode">
                            <i class="el-icon-caret-top"></i>
                            <em class="error">{{ scope.row.errorCodeText }}</em>
                        </div>
                        <el-input :class="{'is-error':scope.row.errorCode}" :disabled="inpDisabled" size="mini"
                                  @blur="handleBlur(scope.row, scope.column.property)" v-if="scope.row.isEditing"
                                  v-model="scope.row.code" :maxlength='10'></el-input>
                        <div slot="reference" v-if="!scope.row.isEditing">{{ scope.row.code }}</div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('businessThead.name')" prop="name" align="center" isEditing="true" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="error-tip" v-show="scope.row.errorName">
                            <i class="el-icon-caret-top"></i>
                            <em class="error">{{ scope.row.errorNameText }}</em>
                        </div>
                        <el-input :class="{'is-error':scope.row.errorName}" size="mini"
                                  @blur="handleBlur(scope.row, scope.column.property)" v-if="scope.row.isEditing"
                                  v-model="scope.row.name" :maxlength='50'></el-input>
                        <div slot="reference" v-if="!scope.row.isEditing">{{ scope.row.name }}</div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('commonThead.note')" prop="note" align="center" isEditing="true" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-input size="mini" @blur="handleBlur(scope.row, scope.column.property)"
                                  v-if="scope.row.isEditing" v-model="scope.row.note" :maxlength='250'></el-input>
                        <div slot="reference" v-if="!scope.row.isEditing">{{ scope.row.note }}</div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('commonThead.status')" prop="status" align="center" isEditing="true" show-overflow-tooltip
                                 :formatter="formatStatus" show-overflow-tooltip></el-table-column>
                <!-- <el-table-column label="创建人" prop="creater" align="center" isEditing="true"></el-table-column>
                <el-table-column label="创建时间" prop="createTime" align="center" isEditing="true" :formatter="formatCreateDate" show-overflow-tooltip></el-table-column> -->
                <el-table-column :label="$t('commonThead.updater')" prop="updater" align="center" isEditing="true"></el-table-column>
                <el-table-column :label="$t('commonThead.updateTime')" prop="updateTime" align="center" isEditing="true"
                                 :formatter="formatUpdateDate" show-overflow-tooltip></el-table-column>
                <el-table-column fixed="right" :label="$t('commonThead.operation')" align="center" width="120">
                    <template slot-scope="scope">
                        <div @click="handleStart(scope.row)"
                             v-if="scope.row.status === 'INEFFECTIVENESS' && scope.row.id">
                            <el-tooltip content="启用" placement="top" effect="light" v-if="permissions('base_cause_enable')">
                                <div class="operation_icon icon2"></div>
                            </el-tooltip>
                        </div>
                        <div @click="handleForbidden(scope.row)"
                             v-if="scope.row.status === 'AVAILABILITY'  && scope.row.id">
                            <el-tooltip content="禁用" placement="top" effect="light" v-if="permissions('base_cause_disable')">
                                <div class="operation_icon icon3"></div>
                            </el-tooltip>
                        </div>
                        <div v-if="scope.row.id">
                            <el-tooltip content="删除" placement="top" effect="light" v-if="permissions('base_cause_delete')">
                                <div @click="batchRemove(scope.row)" class="operation_icon icon4"></div>
                            </el-tooltip>
                        </div>
                        <!-- <el-button @click="handleStart(scope.row)">{{ $t('button.enable') }}</el-button>
                        <el-button @click="handleForbidden(scope.row)">{{ $t('button.disable') }}</el-button>
                        <el-button @click="batchRemove(scope.row)">{{ $t('button.delete') }}</el-button> -->
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


    </div>
</template>
<script>
    import util from '../../common/js/util';

    export default {
        data() {
            return {
                // 检索条件
                formInline: {
                    name: '',
                    code: '',
                    status: ''
                },
                // 分页
                pager: {
                    page: 1,
                    rows: 10,
                    total: 0
                },
                dict: '',
                listLoading: false,
                sel: [],
                currentList: [],
                currentRow: null,
                // 查询框折叠展开
                showSearch: true,
                // 当前是否存在正在编辑的数据
                isEditRow: false,
                // 双击修改数据只读项
                inpDisabled: true
            };
        },
        methods: {
            // 分页
            pageChange(currentPage) {
                this.pager.page = currentPage;
                this.selectList();
            },
            // 选择行数
            sizeChange(rows) {
                this.pager.rows = rows;
                this.selectList();
            },
            // 重置
            resetForm() {
                this.formInline.name = '';
                this.formInline.code = '';
                this.formInline.status = '';
            },
            // 勾选事件
            selChange: function (sel) {
                this.sel = sel;
            },
            // 事业部列表
            selectList(uprow) {
                let _this = this;
                _this.currentRow = null;
                _this.listLoading = true;
                util.publicpost(
                    '/businessDepartment/selectList',
                    {
                        name: _this.formInline.name,
                        code: _this.formInline.code,
                        status: _this.formInline.status,
                        page: _this.pager.page,
                        rows: _this.pager.rows
                    },
                    function (res) {
                        if (res.code === 0) {
                            _this.listLoading = false;
                            _this.pager.total = res.pager.totalCount || 0;
                            _this.currentList = res.result;
                        } else {
                            _this.listLoading = false;
                            _this.errorMsg('服务器繁忙！');
                        }
                        if (uprow) {
                            if (uprow.id) {
                                _this.letTrToEdit(uprow);
                            } else {
                                _this.isEditRow = false;
                            }
                        }
                        if (_this.isEditRow) {
                            _this.addNewData();
                        }
                        _this.dict = res.enumVal;
                    }
                );
            },
            // 新增
            handleAdd: function () {
                let _this = this;
                if (this.currentRow) {
                    if (this.currentRow.code === '') {
                        _this.showMsg('事业部编码不能为空');
                        return;
                    }
                    _this.isEditRow = true;
                    _this.handleEdit();
                    return;
                }
                this.addNewData();
            },
            // 双击编辑
            handleDbl: function (row) {
                let _this = this;
                // 是否已在编辑状态
                if (this.currentRow && this.currentRow.id !== row.id) {
                    // this.showMsg('请先保存上一条记录');
                    _this.isEditRow = false;
                    _this.handleEdit(row);
                    return;
                }
                this.letTrToEdit(row);
            },
            // 当前行处于编辑状态
            letTrToEdit(uprow) {
                let currentList = this.currentList.slice();
                let current = currentList.find(item => item.id === uprow.id);
                current.isEditing = !current.isEditing;
                this.currentList = currentList;
                // 获取当前编辑数据
                this.currentRow = Object.assign({}, uprow);
                this.inpDisabled = true;
            },
            // 判断是否有更改
            isUpdate: function () {
                let flag = false;
                if (this.currentRow) {
                    let item = this.currentList.find(
                        item => item.id === this.currentRow.id
                    );
                    for (let k in item) {
                        if (k !== 'isEditing' && item[k] !== this.currentRow[k]) {
                            flag = true;
                        }
                    }
                    if (flag) {
                        this.currentRow = Object.assign({}, item);
                    } else {
                        item.isEditing = false;
                        this.currentRow = null;
                    }
                }
                return flag;
            },
            // 保存
            handleEdit: function (dbrow) {
                let _this = this;
                let id = this.currentRow.id;
                if (id) {
                    if (!this.isUpdate()) {
                        if (dbrow) {
                            // 上一行未修改，双击另一行数据
                            _this.selectList(dbrow);
                        } else {
                            _this.selectList();
                        }
                        return;
                    }
                    util.publicpost(
                        '/businessDepartment/update',
                        {
                            id: id,
                            code: _this.currentRow.code,
                            name: _this.currentRow.name,
                            note: _this.currentRow.note
                        },
                        function (res) {
                            if (res.success) {
                                if (res.data === 0) {
                                    _this.errorMsg('服务器繁忙！');
                                } else {
                                    if (dbrow) {
                                        // 上一行未修改，双击另一行数据
                                        _this.selectList(dbrow);
                                    } else {
                                        _this.selectList();
                                    }
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
                } else {
                    let code = this.currentRow.code;
                    if (!util.isEmpty(code)) {
                        if (!util.numberLetter(code)) {
                            this.showMsg('事业部编码只能由20位字母或数字组成');
                            return;
                        }
                    }
                    util.publicpost(
                        '/businessDepartment/insert',
                        {
                            code: this.currentRow.code,
                            name: this.currentRow.name,
                            note: this.currentRow.note
                        },
                        function (res) {
                            if (res.success) {
                                if (res.data === 0) {
                                    _this.errorMsg('服务器繁忙！');
                                } else {
                                    if (dbrow) {
                                        // 上一行未修改，双击另一行数据
                                        _this.selectList(dbrow);
                                    } else {
                                        _this.selectList();
                                    }
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
                }
            },
            // 取消编辑
            cancelEdit() {
                this.isEditRow = false;
                if (this.currentRow.id) {
                    this.currentList = this.currentList.map(item => {
                        if (item.id === this.currentRow.id) {
                            item = Object.assign({}, this.currentRow);
                            item.isEditing = false;
                        }
                        return item;
                    });
                } else {
                    this.currentList.shift();
                }
                this.currentRow = null;
            },
            // 失去焦点
            handleBlur(row, property) {
                let name = row.name;
                let code = row.code;
                if (property === 'code') {
                    if (util.isEmpty(code)) {
                        row.errorCode = true;
                        row.errorCodeText = '编码不能为空';
                    } else if (!util.isEmpty(code) && !util.numberLetter(code)) {
                        row.errorCode = true;
                        row.errorCodeText = '编码只能由20位字母或数字组成';
                    } else {
                        row.errorCode = false;
                    }
                }
                if (property === 'name') {
                    if (util.isEmpty(name)) {
                        row.errorName = true;
                        row.errorNameText = '名称不能为空';
                    } else {
                        row.errorName = false;
                    }
                }
            },
            // 批量删除
            batchRemove: function (row) {
                if (this.currentRow) {
                    this.showMsg('请先保存上一条记录');
                    return;
                }
                let _this = this;
                let ids = row.id;
                let versions = row.version;
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        this.listLoading = true;
                        let para = {ids: ids, versions: versions};
                        util.publicpost('/businessDepartment/deleteBatch', para, function (
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
            // 禁用
            handleForbidden: function (row) {
                if (this.currentRow) {
                    this.showMsg('请先保存上一条记录');
                    return;
                }
                let _this = this;
                let ids = row.id;
                let versions = row.version;
                _this.listLoading = true;
                util.publicpost(
                    '/businessDepartment/stop',
                    {
                        ids: ids,
                        versions: versions
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
            handleStart: function (row) {
                if (this.currentRow) {
                    this.showMsg('请先保存上一条记录');
                    return;
                }
                let _this = this;
                let ids = row.id;
                let versions = row.version;
                _this.listLoading = true;
                util.publicpost(
                    '/businessDepartment/start',
                    {
                        ids: ids,
                        versions: versions
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
            // 修改时间转换
            formatUpdateDate(row, column) {
                return row.updateTime
                    ? util.formatDate.format(
                        new Date(row.updateTime),
                        'yyyy-MM-dd hh:mm:ss'
                    )
                    : '';
            },
            // 创建时间转换
            formatCreateDate(row, column) {
                return row.createTime
                    ? util.formatDate.format(
                        new Date(row.createTime),
                        'yyyy-MM-dd hh:mm:ss'
                    )
                    : '';
            },
            // 状态转换
            formatStatus(row, column) {
                var key = row.status;
                var json = this.dict.status;
                return util.formatDict(json, key);
            },
            // 事业部层级转换
            formatHierarchy(row, column) {
                var key = row.hierarchy;
                var json = this.dict.hierarchy;
                return util.formatDict(json, key);
            },
            // 新增数据
            addNewData() {
                let businessDepartment = {
                    isEditing: true,
                    code: '',
                    name: '',
                    note: '',
                    status: 'AVAILABILITY'
                };
                this.currentRow = businessDepartment;
                this.currentList.unshift(businessDepartment);
                this.inpDisabled = false;
            }
        },
        computed: {
            toggleDrop() {
                return this.showSearch ? 'el-icon-arrow-up' : 'el-icon-arrow-down';
            }
        },
        mounted() {
            this.pageChange(1);
            this.getButtonList();
        }
    };
</script>
<style>

</style>
