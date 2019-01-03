// 单位管理
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
                                <el-form-item :label="$t('unitThead.type') + '：'">
                                    <el-select v-model="formInline.type" clearable :placeholder="$t('common.pleaseChoose')" class="select">
                                        <el-option v-for="item in dict.type" :key="item.name" :label="item.des"
                                                   :value="item.name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item :label="$t('unitThead.name') + '：'">
                                    <el-input v-model="formInline.name" :placeholder="$t('common.pleaseEnter') + $t('unitThead.name')"
                                              :maxlength='25'></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item :label="$t('commonThead.status') + '：'">
                                    <el-select v-model="formInline.status" clearable :placeholder="$t('common.pleaseChoose')" class="select">
                                        <el-option v-for="item in dict.common" :key="item.name" :label="item.des"
                                                   :value="item.name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="footer-but tar pad_r pad_t">
                            <el-button type="primary" @click="selectUnitList">{{ $t('button.query') }}</el-button>
                            <el-button @click="resetForm">{{ $t('button.reset') }}</el-button>
                        </div>
                    </el-form>
                </div>
            </div>
        </el-collapse-transition>

        <!--新增、删除-->
        <div class="unit_move def-but">
            <el-button @click="handleAdd" v-if="permissions('base_unit_add')">{{ $t('button.add') }}</el-button>
            <el-button @click="saveOrUpdate" :disabled="currentRow === null" v-if="permissions('base_unit_save')">{{ $t('button.save') }}</el-button>
            <el-button @click="cancelEdit" :disabled="currentRow === null" v-if="permissions('base_unit_cancel')">{{ $t('button.cancel') }}</el-button>

        </div>

        <!-- 列表 -->
        <div class="list_unit list_operation">
            <el-table highlight-current-row stripe :data="unitList" v-loading="listLoading" @cell-dblclick="handleDbl"
                      @selection-change="selsChange"
                      style="width: 100%;" :fit="true" border align="center">
                <el-table-column :label="$t('commonThead.index')" align="center" type="index" width="50"></el-table-column>
                <el-table-column :label="$t('unitThead.code')" width="130" prop="code" align="center" sortable show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div :class="{'error-tip': errorCode.errorText}"
                             v-show="scope.row.isEditing && !errorCode.status">
                            <i class="el-icon-caret-top"></i>
                            <em class="error">{{ errorCode.errorText }}</em>
                        </div>
                        <el-input :class="{'is-error':!errorCode.status}" :disabled="inpDisabled" size="mini"
                                  @blur="handleBlur(scope.row, scope.column.property)" v-if="scope.row.isEditing"
                                  v-model="scope.row.code" :maxlength='20'></el-input>
                        <div slot="reference" v-if="!scope.row.isEditing">{{ scope.row.code }}</div>
                    </template>
                </el-table-column>

                <el-table-column :label="$t('unitThead.name')" prop="name" align="center" isEditing="true" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div :class="{'error-tip': errorName.errorText}"
                             v-show="scope.row.isEditing && !errorName.status">
                            <i class="el-icon-caret-top"></i>
                            <em class="error">{{ errorName.errorText }}</em>
                        </div>
                        <el-input :class="{'is-error':!errorName.status}" size="mini"
                                  @blur="handleBlur(scope.row, scope.column.property)" v-if="scope.row.isEditing"
                                  v-model="scope.row.name" :maxlength='25' show-overflow-tooltip></el-input>
                        <div slot="reference" v-if="!scope.row.isEditing">{{ scope.row.name }}</div>
                    </template>
                </el-table-column>

                <el-table-column width="120" :label="$t('unitThead.type')" prop="type" align="center" isEditing="true"
                                 show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-select size="mini" @blur="handleBlur(scope.row, scope.column.property)"
                                   v-if="scope.row.isEditing" v-model="scope.row.type">
                            <el-option v-for="item in dict.type" :key="item.name" :label="item.des"
                                       :value="item.name"></el-option>
                        </el-select>
                        <div v-if="!scope.row.isEditing">{{formatterType(scope.row)}}</div>
                    </template>
                </el-table-column>

                <el-table-column :label="$t('unitThead.defaults')" prop="defaults" align="center" isEditing="true" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-select size="mini" @blur="handleBlur(scope.row, scope.column.property)"
                                   v-if="scope.row.isEditing" v-model="scope.row.defaults">
                            <el-option v-for="item in dict.default" :key="item.name" :label="item.des"
                                       :value="item.name"></el-option>
                        </el-select>
                        <div v-if="!scope.row.isEditing">{{formatterdefalut(scope.row)}}</div>
                    </template>
                </el-table-column>

                <el-table-column :label="$t('commonThead.description')" prop="description" align="center" isEditing="true" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div :class="{'error-tip': errorDescription.errorText}"
                             v-show="scope.row.isEditing && !errorDescription.status">
                            <i class="el-icon-caret-top"></i>
                            <em class="error">{{ errorDescription.errorText }}</em>
                        </div>
                        <el-input size="mini" :class="{'is-error':!errorDescription.status}"
                                  @blur="handleBlur(scope.row, scope.column.property)" v-if="scope.row.isEditing"
                                  v-model="scope.row.description" :maxlength='50'></el-input>
                        <div slot="reference" v-if="!scope.row.isEditing">{{ scope.row.description }}</div>
                    </template>
                </el-table-column>

                <el-table-column :label="$t('commonThead.status')" prop="status" align="center" isEditing="true" :formatter="formatterstatus"
                                 show-overflow-tooltip></el-table-column>
                <!-- <el-table-column label="创建人" prop="creater" align="center" isEditing="true" show-overflow-tooltip></el-table-column>
                <el-table-column label="创建时间" prop="createTime" align="center" isEditing="true" :formatter="formatCreateDate" show-overflow-tooltip></el-table-column> -->
                <el-table-column :label="$t('commonThead.updater')" width="160" prop="updater" align="center" isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column :label="$t('commonThead.updateTime')" width="300" prop="updateTime" align="center" isEditing="true"
                                 :formatter="formatUpdateDate" show-overflow-tooltip></el-table-column>
                <el-table-column fixed="right" :label="$t('commonThead.operation')" align="center" width="120">
                    <template slot-scope="scope">
                        <div @click="enableMeasureUnit(scope.row)"
                             v-if="scope.row.status === 'INEFFECTIVENESS' && scope.row.id">
                            <el-tooltip content="启用" placement="top" effect="light" v-if="permissions('base_unit_enable')">
                                <div class="operation_icon icon2"></div>
                            </el-tooltip>
                        </div>
                        <div @click="disableMeasureUnit(scope.row)"
                             v-if="scope.row.status === 'AVAILABILITY' && scope.row.id">
                            <el-tooltip content="禁用" placement="top" effect="light" v-if="permissions('base_unit_disable')">
                                <div class="operation_icon icon3"></div>
                            </el-tooltip>
                        </div>
                        <div v-if="scope.row.id" @click="batchRemove(scope.row)" >
                            <el-tooltip content="删除" placement="top" effect="light" v-if="permissions('base_unit_delete')">
                                <div class="operation_icon icon4"></div>
                            </el-tooltip>
                        </div>
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
    // import NProgress from 'nprogress'
    // import {getUserListPage, removeUser, batchRemoveUser, editUser, addUser} from '../../api/api';
    // import ElOption from "element-ui/packages/select/src/option";
    // let base = 'http://139.219.228.112:8082';
    export default {
        // components: {ElOption},
        data() {
            return {
                // 条件检索
                formInline: {
                    name: '',
                    type: '',
                    common: ''
                },
                // 分页
                pager: {
                    page: 1,
                    rows: 10,
                    total: 0
                },
                dict: '', // 枚举集合
                listLoading: false,
                sels: [],
                unitList: [], // 单位列表
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
                this.page = currentPage;
                this.selectUnitList();
            },
            // 选择行数
            sizeChange(rows) {
                this.pager.rows = rows;
                this.selectUnitList();
            },
            // 重置
            resetForm() {
                this.formInline.name = '';
                this.formInline.type = '';
                this.formInline.status = '';
            },
            // 获取列表
            selectUnitList(uprow) {
                let _this = this;
                _this.listLoading = true;
                util.publicpost(
                    '/unit/selectMeasureUnitListPage',
                    {
                        name: _this.formInline.name,
                        type: _this.formInline.type,
                        status: _this.formInline.status,
                        page: _this.page,
                        rows: _this.pager.rows
                    },
                    function (res) {
                        if (res.code === 0) {
                            _this.listLoading = false;
                            _this.pager.total = res.pager.totalCount || 0;
                            _this.unitList = res.result;
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
                        _this.dict = res.enumVal;
                    }
                );
                _this.currentRow = null;
            },
            // 双击编辑
            handleDbl: function (row) {
                let _this = this;
                // 是否已在编辑状态
                if (this.currentRow && this.currentRow.id !== row.id) {
                    _this.isEditRow = false;
                    _this.saveOrUpdate(row);
                    return;
                }
                this.letTrToEdit(row);
            },
            // 当前行处于编辑状态
            letTrToEdit(uprow) {
                // 新增一行时双击该行禁止保存操作
                if (this.currentRow && !this.currentRow.id) {
                    return;
                }
                // 将当前行置为编辑状态
                let unitList = this.unitList.slice();
                let current = unitList.find(item => item.id === uprow.id);
                current.isEditing = !current.isEditing;
                this.unitList = unitList;
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
                    defaults: 'NO',
                    type: 'WEIGHT',
                    description: '',
                    status: 'AVAILABILITY'
                };
                this.currentRow = materialGroup;
                this.unitList.unshift(materialGroup);
                this.inpDisabled = false;
            },

            // 失去焦点
            handleBlur(row, property) {
            },
            // 判断是否有更改
            isUpdate: function () {
                let flag = false;
                if (this.currentRow) {
                    let item = this.unitList.find(item => item.id === this.currentRow.id);
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
            // 添加一条空白记录
            handleAdd() {
                let _this = this;
                if (this.currentRow) {
                    if (this.currentRow.code === '') {
                        _this.showMsg('单位代码不能为空');
                        return;
                    }
                    _this.isEditRow = true;
                    _this.saveOrUpdate();
                    return;
                }
                _this.addNewData();
            },
            // 修改编辑保存
            saveOrUpdate: function (dbrow) {
                let _this = this;
                let id = this.currentRow.id;
                if (this.currentRow && !this.currentRow.id) {
                    if (util.isEmpty(this.currentRow.name)) {
                        _this.errorMsg('请输入单位名称');
                        return;
                    } else if (util.isEmpty(this.currentRow.code)) {
                        _this.errorMsg('请输入单位代码');
                        return;
                    } else if (!util.isEmpty(this.currentRow.code) && !util.numberLetter(this.currentRow.code)) {
                        _this.errorMsg('单位代码校验不通过');
                        return;
                    } else if (util.isEmpty(this.currentRow.description)) {
                        _this.errorMsg('请输入单位描述');
                        return;
                    }
                }
                if (id) {
                    // 修改操作
                    if (!this.isUpdate()) {
                        if (dbrow) {
                            // 上一行未修改，双击另一行数据
                            _this.selectUnitList(dbrow);
                        } else {
                            _this.selectUnitList();
                        }
                        return;
                    }
                    util.publicpost(
                        '/unit/updateMeasureUnitById',
                        {
                            id: id,
                            code: this.currentRow.code,
                            name: this.currentRow.name,
                            defaults: this.currentRow.defaults,
                            type: this.currentRow.type,
                            description: this.currentRow.description,
                            version: this.currentRow.version
                        },
                        function (res) {
                            if (res.success) {
                                if (res.data === 0) {
                                    _this.errorMsg('服务器繁忙！');
                                } else {
                                    if (dbrow) {
                                        // 上一行未修改，双击另一行数据
                                        if (!dbrow.id) {
                                            _this.successMsg(_this.$t('msg.success'));
                                        }
                                        _this.selectUnitList(dbrow);
                                    } else {
                                        _this.selectUnitList();
                                    }
                                }
                            } else {
                                _this.errorMsg(_this.$t('msg.error') + ':' + _this.$t(res.msg));
                            }
                        }
                    );
                } else {
                    // 新增
                    if (!util.isEmpty(this.currentRow.code)) {
                        if (!util.numberLetter(this.currentRow.code)) {
                            this.showMsg('单位代码只能由20位字母或数字组成');
                            return false;
                        }
                    }
                    util.publicpost(
                        '/unit/saveMeasureUnit',
                        {
                            code: this.currentRow.code,
                            name: this.currentRow.name,
                            defaults: this.currentRow.defaults,
                            type: this.currentRow.type,
                            description: this.currentRow.description
                        },
                        function (res) {
                            if (res.success) {
                                if (res.data === 0) {
                                    _this.errorMsg('服务器繁忙！');
                                } else {
                                    if (dbrow) {
                                        // 上一行未修改，双击另一行数据
                                        _this.successMsg(_this.$t('msg.success'));
                                        _this.selectUnitList(dbrow);
                                    } else {
                                        _this.selectUnitList();
                                    }
                                }
                            } else {
                                _this.errorMsg(_this.$t('msg.error') + ':' + _this.$t(res.msg));
                            }
                        }
                    );
                }
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            // 取消编辑
            cancelEdit() {
                this.isEditRow = false;
                if (this.currentRow.id) {
                    this.unitList = this.unitList.map(item => {
                        if (item.id === this.currentRow.id) {
                            item = Object.assign({}, this.currentRow);
                            item.isEditing = false;
                        }
                        return item;
                    });
                } else {
                    this.unitList.shift();
                }
                this.currentRow = null;
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
                this.confirm('确认删除选中记录吗？', function () {
                    _this.listLoading = true;
                    let para = {ids: ids, versions: versions};
                    util.publicpost('/unit/removeMeasureUnitBatch', para, function (res) {
                        _this.listLoading = false;
                        if (res.success) {
                            if (res.data === 0) {
                                _this.errorMsg('服务器繁忙！');
                            } else {
                                _this.successMsg(_this.$t('msg.success'));
                                _this.selectUnitList();
                            }
                        } else {
                            _this.errorMsg(_this.$t('msg.error'));
                        }
                    });
                });
            },

            // 禁用
            disableMeasureUnit(row) {
                if (this.currentRow) {
                    this.showMsg('请先保存上一条记录');
                    return;
                }
                let _this = this;
                let ids = row.id;
                let versions = row.version;
                _this.listLoading = true;
                // 是否选中新增的空白行
                util.publicpost(
                    '/unit/disableMeasureUnit',
                    {
                        ids: ids,
                        status: 'INEFFECTIVENESS',
                        versions: versions
                    },
                    function (res) {
                        _this.listLoading = false;
                        if (res.success) {
                            if (res.data === 0) {
                                _this.errorMsg('服务器繁忙！');
                            } else {
                                _this.successMsg(_this.$t('msg.success'));
                                _this.selectUnitList();
                            }
                        } else {
                            _this.errorMsg(_this.$t('msg.error'));
                        }
                    }
                );
            },

            // 启用
            enableMeasureUnit(row) {
                if (this.currentRow) {
                    this.showMsg('请先保存上一条记录');
                    return;
                }
                let _this = this;
                let ids = row.id;
                let versions = row.version;
                _this.listLoading = true;
                // 是否选中新增的空白行
                util.publicpost(
                    '/unit/enableMeasureUnit',
                    {
                        ids: ids,
                        status: 'AVAILABILITY',
                        versions: versions
                    },
                    function (res) {
                        _this.listLoading = false;
                        if (res.success) {
                            if (res.data === 0) {
                                _this.errorMsg('服务器繁忙！');
                            } else {
                                _this.successMsg(_this.$t('msg.success'));
                                _this.selectUnitList();
                            }
                        } else {
                            _this.errorMsg(_this.$t('msg.error'));
                        }
                    }
                );
            },
            // 格式化是否默认
            formatterdefalut(row, column) {
                var key = row.defaults;
                var json = this.dict.default;
                return util.formatDict(json, key);
            },
            // 格式化重量单位
            formatterType(row, column) {
                var key = row.type;
                var json = this.dict.type;
                return util.formatDict(json, key);
            },
            // 格式化是否启用
            formatterstatus(row, column) {
                var key = row.status;
                var json = this.dict.common;
                return util.formatDict(json, key);
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
                    if (util.isEmpty(this.currentRow.name)) {
                        status = false;
                        errorText = '请输入单位名称';
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
                        errorText = '请输入单位代码';
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
                        errorText = '请输入单位描述';
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
            this.selectUnitList();
            this.getButtonList();

        }
    };
</script>
<style>

</style>
