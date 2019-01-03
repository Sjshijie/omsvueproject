// 物料组管理
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
                    <el-form size="mini" :inline="true" label-width="100px" :model="query" class="demo-form-inline"
                             status-icon ref="query">
                        <el-row :gutter="0">
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item prop="name" :label="$t('materialGroupThead.name') + '：'">
                                    <el-input v-model="query.name" :placeholder="$t('common.pleaseEnter') + $t('materialGroupThead.name')" :maxlength="50"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item prop="code" :label="$t('materialGroupThead.code') + '：'">
                                    <el-input v-model="query.code" :placeholder="$t('common.pleaseEnter') + $t('materialGroupThead.code')" :maxlength="30"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item prop="common" :label="$t('commonThead.status') + '：'">
                                    <el-select v-model="query.common" clearable :placeholder="$t('common.pleaseChoose')" class="select">
                                        <el-option v-for="item in dict.common" :key="item.name" :label="item.des"
                                                   :value="item.name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item prop="sourceSystem" :label="$t('materialGroupThead.systemType') + '：'">
                                    <el-select v-model="query.sourceSystem" clearable :placeholder="$t('common.pleaseChoose')" class="select">
                                        <el-option v-for="item in dict.sourceSystem" :key="item.name" :label="item.des"
                                                   :value="item.name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="footer-but tar pad_r pad_t">
                            <el-button type="primary" @click="selectList">{{ $t('button.query') }}</el-button>
                            <el-button @click="resetForm('query')">{{ $t('button.reset') }}</el-button>
                        </div>
                    </el-form>
                </div>
            </div>
        </el-collapse-transition>

        <!-- 功能区 -->
        <div class="add_move def-but">
            <el-button @click="handleAdd" v-if="permissions('base_materielAdmin_add')">{{ $t('button.add') }}</el-button>
            <el-button @click="handleEdit" :disabled="currentRow === null" v-if="permissions('base_materielAdmin_save')">{{ $t('button.save') }}</el-button>
            <el-button @click="cancelEdit" :disabled="currentRow === null" v-if="permissions('base_materielAdmin_cancel')">{{ $t('button.cancel') }}</el-button>

        </div>

        <!-- 列表 -->
        <div class="list_materil list_operation">
            <el-table highlight-current-row stripe :data="currentList" @cell-dblclick="handleDbl" v-loading="listLoading"
                      @selection-change="selChange" style="width: 100%;" border :fit="true" align="center">
                <!-- <el-table-column type="selection" align="center" isEditing="true" width="55" @click="selChange(1)"></el-table-column> -->
                <el-table-column :label="$t('commonThead.index')" align="center" type="index" width="50"></el-table-column>
                <el-table-column :label="$t('materialGroupThead.name')" width="130" prop="name" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div :class="{'error-tip': errorName.errorText}" v-show="scope.row.isEditing && !errorName.status">
                            <i class="el-icon-caret-top"></i>
                            <em class="error">{{ errorName.errorText }}</em>
                        </div>
                        <el-input size="mini"
                                  @blur="handleBlur(scope.row, scope.column.property)" placeholder="请输入名称"
                                  v-if="scope.row.isEditing" v-model="scope.row.name" :maxlength="25"
                                  :class="{'is-error':!errorName.status}"></el-input>
                        <div slot="reference" v-if="!scope.row.isEditing">{{ scope.row.name }}</div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('materialGroupThead.code')" width="100" prop="code" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div  :class="{'error-tip': errorCode.errorText}" v-show="scope.row.isEditing && !errorCode.status">
                            <i class="el-icon-caret-top"></i>
                            <em class="error">{{ errorCode.errorText }}</em>
                        </div>
                        <el-input size="mini"
                                  :disabled="inpDisabled" @blur="handleBlur(scope.row, scope.column.property)"
                                  v-if="scope.row.isEditing" v-model="scope.row.code" :maxlength="15"
                                  :class="{'is-error':!errorCode.status}"></el-input>
                        <div slot="reference" v-if="!scope.row.isEditing">{{ scope.row.code }}</div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('materialGroupThead.hierarchy')" width="100" prop="hierarchy" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-select size="mini" @blur="handleBlur(scope.row, scope.column.property)"
                                   v-if="scope.row.isEditing" v-model="scope.row.hierarchy">
                            <el-option v-for="item in dict.hierarchy" :key="item.name" :label="item.des"
                                       :value="item.name"></el-option>
                        </el-select>
                        <div v-if="!scope.row.isEditing">{{formatHierarchy(scope.row)}}</div>
                    </template>
                </el-table-column>
                <el-table-column width="120" :label="$t('materialGroupThead.systemType')" prop="systemType" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-select size="mini" @blur="handleBlur(scope.row, scope.column.property)"
                                   v-if="scope.row.isEditing" v-model="scope.row.systemType">
                            <el-option v-for="item in dict.sourceSystem" :key="item.name" :label="item.des"
                                       :value="item.name"></el-option>
                        </el-select>
                        <div v-if="!scope.row.isEditing">{{ scope.row.systemType }}</div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('commonThead.description')" prop="description" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div  :class="{'error-tip': errorDescription.errorText}" v-show="scope.row.isEditing && !errorDescription.status">
                            <i class="el-icon-caret-top"></i>
                            <em class="error">{{ errorDescription.errorText }}</em>
                        </div>
                        <el-input size="mini" :class="{'is-error':!errorDescription.status}"
                                  @blur="handleBlur(scope.row, scope.column.property)" v-if="scope.row.isEditing"
                                  v-model="scope.row.description" :maxlength="100"></el-input>
                        <div slot="reference" v-if="!scope.row.isEditing">{{ scope.row.description }}</div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('commonThead.status')" prop="status" align="center" isEditing="true" :formatter="formatStatus"
                                 show-overflow-tooltip></el-table-column>
                <!-- <el-table-column label="创建人" prop="creater" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column label="创建时间" prop="createTime" align="center" :formatter="formatCreateDate" show-overflow-tooltip></el-table-column> -->
                <el-table-column :label="$t('commonThead.updater')" width="130" prop="updater" align="center"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column :label="$t('commonThead.updateTime')" width="300" prop="updateTime" align="center"
                                 :formatter="formatUpdateDate" show-overflow-tooltip></el-table-column>
                <el-table-column fixed="right" :label="$t('commonThead.operation')" align="center" width="120">
                    <template slot-scope="scope">
                        <div @click="handleStart(scope.row)" v-if="scope.row.id && scope.row.status === 'INEFFECTIVENESS'">
                            <el-tooltip content="启用" placement="top" effect="light" v-if="permissions('base_materielAdmin_enable')">
                                <div class="operation_icon icon2"></div>
                            </el-tooltip>
                        </div>
                        <div @click="handleForbidden(scope.row)" v-if="scope.row.id && scope.row.status === 'AVAILABILITY'">
                            <el-tooltip content="禁用" placement="top" effect="light" v-if="permissions('base_materielAdmin_disable')">
                                <div class="operation_icon icon3"></div>
                            </el-tooltip>
                        </div>
                        <div v-if="scope.row.id">
                          <el-tooltip content="删除" placement="top" effect="light" v-if="permissions('base_materielAdmin_delete')">
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
                query: {
                    name: '',
                    code: '',
                    systemType: '',
                    hierarchy: ''
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
            // 选择行数
            sizeChange(rows) {
                this.pager.rows = rows;
                this.selectList();
            },
            // 分页
            pageChange(page) {
                this.pager.page = page;
                this.selectList();
            },
            // 重置
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            // 勾选事件
            selChange(sel) {
                this.sel = sel;
            },
            // 物料组 列表
            selectList(uprow) {
                let _this = this;
                _this.listLoading = true;
                util.publicpost(
                    '/material/group/listPager',
                    {
                        name: _this.query.name,
                        code: _this.query.code,
                        systemType: _this.query.sourceSystem,
                        status: _this.query.common,
                        page: _this.pager.page,
                        rows: _this.pager.rows
                    },
                    function (res) {
                        if (res.code === 0) {
                            _this.listLoading = false;
                            _this.pager.total = res.pager.totalCount || 0;
                            _this.currentList = res.data;
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
                _this.currentRow = null;
            },
            // 新增
            handleAdd() {
                let _this = this;
                if (this.currentRow) {
                    _this.isEditRow = true;
                    _this.handleEdit();
                    return;
                }
                this.addNewData();
            },
            // 双击编辑
            handleDbl(row) {
                let _this = this;
                // 是否已在编辑状态
                if (this.currentRow && this.currentRow.id !== row.id) {
                    _this.isEditRow = false;
                    _this.handleEdit(row);
                    return;
                }
                this.letTrToEdit(row);
            },
            // 判断是否有更改
            isUpdate() {
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
                    if (this.currentRow.name === item.name) {
                        flag = true;
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
            handleEdit(dbrow) {
                let _this = this;
                if (this.currentRow && !this.currentRow.id) {
                    if (util.isEmpty(this.currentRow.name)) {
                        _this.errorMsg('请输入物料组名称');
                        return;
                    } else if (util.isEmpty(this.currentRow.code)) {
                        _this.errorMsg('请输入物料组编码');
                        return;
                    } else if (!util.isEmpty(this.currentRow.code) && !util.numberLetter(this.currentRow.code)) {
                        _this.errorMsg('物料组编码校验不通过');
                        return;
                    } else if (util.isEmpty(this.currentRow.description)) {
                        _this.errorMsg('请输入描述');
                        return;
                    }
                }
                let id = this.currentRow.id;
                // _this.currentRow.sourceSystem = 'SAP';
                if (id) {
                    if (!this.isUpdate()) {
                        if (dbrow) {
                            _this.selectList(dbrow);
                        } else {
                            _this.selectList();
                        }
                        return;
                    }
                    util.publicpost(
                        '/material/group/update',
                        {
                            id: id,
                            code: this.currentRow.code,
                            name: this.currentRow.name,
                            systemType: this.currentRow.systemType,
                            hierarchy: this.currentRow.hierarchy,
                            description: this.currentRow.description,
                            version: this.currentRow.version
                        },
                        function (res) {
                            if (res.success) {
                                if (res.data === 0) {
                                    _this.errorMsg('服务器繁忙！');
                                } else {
                                    if (dbrow) {
                                        if (!dbrow.id) {
                                            _this.successMsg(_this.$t('msg.success'));
                                        }
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
                    util.publicpost(
                        '/material/group/add',
                        {
                            code: this.currentRow.code,
                            name: this.currentRow.name,
                            systemType: this.currentRow.systemType,
                            hierarchy: this.currentRow.hierarchy,
                            description: this.currentRow.description
                        },
                        function (res) {
                            if (res.success) {
                                if (res.data === 0) {
                                    _this.errorMsg('服务器繁忙！');
                                } else {
                                    if (dbrow) {
                                        _this.successMsg(_this.$t('msg.success'));
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
                this.currentRow.checkFlag = false;
                this.currentRow = null;
            },
            // 失去焦点
            handleBlur(row, property) {
            },
            // 批量删除
            batchRemove(row) {
                let _this = this;
                let ids = row.id;
                let versions = row.version;
                this.confirm('确认删除选中记录吗？', function () {
                    _this.listLoading = true;
                    let para = {ids: ids, versions: versions};
                    util.publicpost('/material/group/delete', para, function (res) {
                        _this.listLoading = false;
                        if (res.success) {
                            if (res.code === 0) {
                                _this.successMsg(_this.$t('msg.success'));
                                _this.selectList();
                            } else {
                                _this.errorMsg('服务器繁忙！');
                            }
                        } else {
                            let msg = '';
                            if (!util.isEmpty(res.msg)) {
                                msg = ',' + _this.$t(res.msg);
                            }
                            _this.errorMsg(_this.$t('msg.error') + msg);
                        }
                    });
                });
            },
            // 禁用
            handleForbidden(row) {
                let _this = this;
                let ids = row.id;
                let versions = row.version;
                _this.listLoading = true;
                util.publicpost(
                    '/material/group/disable',
                    {
                        ids: ids,
                        versions: versions
                    },
                    function (res) {
                        _this.listLoading = false;
                        if (res.success) {
                            if (res.code === 0) {
                                _this.successMsg(_this.$t('msg.success'));
                                _this.selectList();
                            } else {
                                _this.errorMsg('服务器繁忙！');
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
            handleStart(row) {
                let _this = this;
                let ids = row.id;
                let versions = row.version;
                _this.listLoading = true;
                util.publicpost(
                    '/material/group/enable',
                    {
                        ids: ids,
                        versions: versions
                    },
                    function (res) {
                        _this.listLoading = false;
                        if (res.success) {
                            if (res.code === 0) {
                                _this.successMsg(_this.$t('msg.success'));
                                _this.selectList();
                            } else {
                                _this.errorMsg('服务器繁忙！');
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
                var json = this.dict.common;
                return util.formatDict(json, key);
            },
            // 来源系统转换
            formatSourceSystem(row, column) {
                var key = row.sourceSystem;
                var json = this.dict.sourceSystem;
                return util.formatDict(json, key);
            },
            // 物料组层级转换
            formatHierarchy(row, column) {
                var key = row.hierarchy;
                var json = this.dict.hierarchy;
                return util.formatDict(json, key);
            },
            // 当前行处于编辑状态
            letTrToEdit(uprow) {
                // 新增一行时双击该行禁止保存操作
                if (this.currentRow && !this.currentRow.id) {
                    return;
                }
                // 是否已在编辑状态
                if (this.currentRow && this.currentRow.id === uprow.id) {
                    return;
                }
                let currentList = this.currentList.slice();
                let current = currentList.find(item => item.id === uprow.id);
                current.isEditing = !current.isEditing;
                this.currentList = currentList;
                // 获取当前编辑数据
                this.currentRow = Object.assign({}, uprow);
                this.inpDisabled = true;
            },
            // 新增数据
            addNewData() {
                let materialGroup = {
                    isEditing: true,
                    code: '',
                    name: '',
                    systemType: this.dict.sourceSystem[0].name,
                    hierarchy: this.dict.hierarchy[0].name,
                    description: '',
                    status: this.dict.common[0].name
                };
                this.currentRow = materialGroup;
                this.currentList.unshift(materialGroup);
                this.inpDisabled = false;
            }
        },
        computed: {
            toggleDrop() {
                return this.showSearch ? 'el-icon-arrow-up' : 'el-icon-arrow-down';
            },
            // 名称校验
            errorName() {
                let errorText;
                let status;
                if (this.currentRow) {
                    // if (util.stripscriptrow(this.currentRow.name)) {
                    //     status = false;
                    //     errorText = '不能输入特殊字符';
                    // }
                    if (util.isEmpty(this.currentRow.name)) {
                        status = false;
                        errorText = '请输入物料组名称';
                    } else {
                        status = true;
                        errorText = '';
                    }
                    if (!this.currentRow.nameFlag) {
                        status = true;
                        errorText = '';
                        this.currentRow.nameFlag = true;
                    }
                    return {
                        errorText,
                        status
                    };
                } else {
                    return {
                        errorText,
                        status
                    };
                }
            },
            // 编码校验
            errorCode() {
                let errorText;
                let status;
                if (this.currentRow) {
                    if (util.isEmpty(this.currentRow.code)) {
                        status = false;
                        errorText = '请输入物料组编码';
                    } else if (!util.isEmpty(this.currentRow.code) && !util.numberLetter(this.currentRow.code)) {
                        status = false;
                        errorText = '只能输入数字或字母';
                    } else {
                        status = true;
                        errorText = '';
                    }
                    if (!this.currentRow.codeFlag) {
                        status = true;
                        errorText = '';
                        this.currentRow.codeFlag = true;
                    }
                    return {
                        errorText,
                        status
                    };
                } else {
                    return {
                        errorText,
                        status
                    };
                }
            },
            // 描述校验
            errorDescription() {
                let errorText;
                let status;
                if (this.currentRow) {
                    if (util.isEmpty(this.currentRow.description)) {
                        status = false;
                        errorText = '请输入描述信息';
                    } else {
                        status = true;
                        errorText = '';
                    }
                    if (!this.currentRow.descriptionFlag) {
                        status = true;
                        errorText = '';
                        this.currentRow.descriptionFlag = true;
                    }
                    return {
                        errorText,
                        status
                    };
                } else {
                    return {
                        errorText,
                        status
                    };
                }
            }
        },
        mounted() {
            this.selectList();
            this.getButtonList();
        }
    };
</script>
<style>
</style>
