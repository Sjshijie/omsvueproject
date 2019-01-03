// 地址信息管理
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
                                <el-form-item :label="$t('regionThead.name') + '：'">
                                    <el-input v-model="formInline.name" :placeholder="$t('common.pleaseEnter') + $t('regionThead.name')"
                                              :maxlength="50"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item :label="$t('regionThead.code') + '：'">
                                    <el-input v-model="formInline.code" :placeholder="$t('common.pleaseEnter') + $t('regionThead.name')"
                                              :maxlength="50"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item :label="$t('regionThead.type') + '：'">
                                    <el-select v-model="formInline.type" clearable :placeholder="$t('common.pleaseChoose')" class="select">
                                        <el-option v-for="item in dict.regionLevelEnum" :key="item.name"
                                                   :label="item.des" :value="item.name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <!--<el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item label="地址：">
                                  <el-input v-model="formInline.fullName" style="height: 30px;" placeholder="请输入地址"></el-input>
                                </el-form-item>
                            </el-col>-->
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item :label="$t('commonThead.name') + '：'">
                                    <el-select v-model="formInline.status" clearable :placeholder="$t('common.pleaseChoose')" class="select">
                                        <el-option v-for="item in dict.statusEnum" :key="item.name" :label="item.des"
                                                   :value="item.name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="footer-but tar pad_r pad_t">
                            <el-button type="primary" @click="getUser">{{ $t('button.query') }}</el-button>
                            <el-button @click="resetForm('formInline')">{{ $t('button.reset') }}</el-button>
                        </div>
                    </el-form>
                </div>
            </div>
        </el-collapse-transition>

        <!--新增、删除-->
        <div class="add_move def-but">
            <el-button @click="handleAdd" v-if="permissions('base_addressAdmin_add')">{{ $t('button.add') }}</el-button>

            <!-- <el-button @click="handleEdit" :disabled="this.sels.length===0">{{ $t('button.update') }}</el-button> -->
            <!-- <el-button @click="">{{ $t('button.importExcel') }}</el-button>
            <el-button @click="">{{ $t('button.exportExcel') }}</el-button> -->
        </div>

        <!-- 列表 -->
        <div class="list_region list_operation">
            <el-table highlight-current-row stripe :data="users" v-loading="listLoading" @selection-change="selsChange"
                      style="width: 100%;" :fit="true" border align="center">
                <!-- <el-table-column type="selection" align="center" isEditing="false" width="55" @click="selsChange(1)"></el-table-column> -->
                <el-table-column width="50" :label="$t('commonThead.index')" type="index" align="center"></el-table-column>
                <el-table-column :label="$t('regionThead.name')" prop="name" align="center" sortable text-overflow="ellipsis"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column :label="$t('regionThead.code')" prop="code" align="center" text-overflow="ellipsis" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="hand" v-if="permissions('base_addressAdmin_detail')" @click="examine(scope.row)">{{scope.row.code}}</div>
                        <div class="hand" v-else>{{scope.row.code}}</div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('regionThead.type')" prop="type" align="center" text-overflow="ellipsis" show-overflow-tooltip
                                 :formatter="formatType"></el-table-column>
                <!--<el-table-column label="地址全称" prop="fullName" align="center" show-overflow-tooltip></el-table-column>-->
                <el-table-column :label="$t('commonThead.postcode')" prop="postcode" align="center"></el-table-column>
                <!-- <el-table-column width="100" label="创建人" prop="creater" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column width="160" label="创建时间" prop="createTime" align="center" text-overflow="ellipsis" :formatter="formatter" show-overflow-tooltip></el-table-column> -->
                <el-table-column :label="$t('commonThead.updater')" prop="updater" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column :label="$t('commonThead.updateTime')" prop="updateTime" align="center" text-overflow="ellipsis"
                                 :formatter="formatterUpdate" show-overflow-tooltip></el-table-column>
                <el-table-column :label="$t('commonThead.status')" prop="status" :formatter="formatterStatus" align="center"
                                 text-overflow="ellipsis" show-overflow-tooltip></el-table-column>

                <el-table-column fixed="right" :label="$t('commonThead.operation')" align="center" width="170">
                    <template slot-scope="scope">
                        <el-tooltip content="修改" placement="top" effect="light" v-if="permissions('base_addressAdmin_update')">
                            <div @click="handleEdit(scope.row)" class="operation_icon icon1"></div>
                        </el-tooltip>
                        <div @click="toEnable(scope.row)" v-if="scope.row.status === 'INEFFECTIVENESS'">
                            <el-tooltip content="启用" placement="top" effect="light" v-if="permissions('base_addressAdmin_enable')">
                                <div class="operation_icon icon2"></div>
                            </el-tooltip>
                        </div>
                        <div @click="toDisable(scope.row)" v-if="scope.row.status === 'AVAILABILITY'">
                            <el-tooltip content="禁用" placement="top" effect="light" v-if="permissions('base_addressAdmin_disable')">
                                <div class="operation_icon icon3"></div>
                            </el-tooltip>
                        </div>
                        <el-tooltip content="删除" placement="top" effect="light" v-if="permissions('base_addressAdmin_delete')">
                            <div @click="batchRemove(scope.row)" class="operation_icon icon4"></div>
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
                   style="line-height: 0;overflow: hidden;font-size: 12px;" class="def-but default-dialog" ref="addForm"
                   :title="titles" :before-close="closeChangeMachie">
            <div class="form form-add" style="height: 80px;">
                <el-form :model="addForm" ref="addForm" :rules="addFormRules" label-width="80px" size="mini">
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="区划名称:" prop="name">
                                <el-tooltip content="最多输入50个字符" placement="right" effect="light"
                                            :disabled="this.disabledTo">
                                    <el-input v-model="addForm.name" :maxlength="50"
                                              :disabled="this.disabledTo"></el-input>
                                </el-tooltip>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="区划编码:" prop="code">
                                <el-tooltip content="最多输入50个字符" placement="right" effect="light"
                                            :disabled="this.disabledTo">
                                    <el-input v-model="addForm.code" :maxlength="50"
                                              :disabled="this.disabledTo"></el-input>
                                </el-tooltip>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="区划类型:" prop="type">
                                <el-select v-model="addForm.type" clearable placeholder="请选择"
                                           @change="changeType('add')" class="select" :disabled="this.disabledTo">
                                    <el-option v-for="item in dict.regionLevelEnum" :key="item.name" :label="item.des"
                                               :value="item.name"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="上级名称:" prop="partentId">
                                <el-select
                                        v-model="addForm.partentId"
                                        filterable
                                        remote
                                        reserve-keyword
                                        placeholder="请输入关键词"
                                        clearable
                                        :remote-method="partentRegionalAddress"
                                        :disabled="addParentRegionFlag">
                                    <el-option
                                            v-for="item in regionalAddressList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <!--<el-col :span="12"><div class="grid-content bg-purple">
                      <el-form-item label="地址全称:" prop="fullName">
                        <el-input v-model="addForm.fullName"></el-input>
                      </el-form-item>
                    </div></el-col>-->
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="邮编:" prop="postcode">
                                <el-tooltip content="最多输入6个字符" placement="right" effect="light"
                                            :disabled="this.disabledTo">
                                    <el-input v-model="addForm.postcode" :maxlength="6"
                                              :disabled="this.disabledTo"></el-input>
                                </el-tooltip>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addSubmit"  v-show="!disabledTo" :disabled="disabledTo">{{ $t('button.save') }}</el-button>
                <el-button @click.native="off('addForm')">{{ $t('button.cancel') }}</el-button>
            </div>
        </el-dialog>
        <!-- 修改界面 -->
        <el-dialog :visible.sync="editFormVisible" :close-on-click-modal="false"
                   style="line-height: 0;overflow: hidden;font-size: 12px;" class="def-but default-dialog" title="修改数据">
            <div class="form form-add" style="height: 80px;">
                <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm" size="mini">
                    <el-input v-model="editForm.id" v-show="false"></el-input>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="上级名称:" prop="partentId">
                                <!--<el-input v-model="editForm.partentId"></el-input>-->
                                <el-select
                                        v-model="editForm.partentName"
                                        @change='partentId'
                                        filterable
                                        remote
                                        reserve-keyword
                                        placeholder="请输入关键词"
                                        :remote-method="partentRegionalAddress"
                                        :disabled="this.editForm.type==='COUNTRY'">
                                    <!--<el-option-->
                                    <!--:key="editForm.partentId"-->
                                    <!--:label="editForm.partentName"-->
                                    <!--:value="editForm.partentId">-->
                                    <!--</el-option>-->
                                    <el-option
                                            v-for="item in regionalAddressList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="区划名称:" prop="name">
                                <el-tooltip content="最多输入50个字符" placement="right" effect="light">
                                    <el-input v-model="editForm.name" :disabled=true :maxlength="50"></el-input>
                                </el-tooltip>
                            </el-form-item>
                        </div>
                    </el-col>

                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="区划编码:" prop="code">
                                <el-tooltip content="最多输入50个字符" placement="right" effect="light">
                                    <el-input v-model="editForm.code" :disabled=true :maxlength="50"></el-input>
                                </el-tooltip>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="区划类型:" prop="type">
                                <el-select v-model="editForm.type" clearable placeholder="请选择" class="select"
                                           :disabled=true>
                                    <el-option v-for="item in dict.regionLevelEnum" :key="item.name" :label="item.des"
                                               :value="item.name"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>

                    <!--<el-col :span="12"><div class="grid-content bg-purple">
                      <el-form-item label="地址全称:" prop="fullName">
                        <el-input v-model="editForm.fullName"></el-input>
                      </el-form-item>
                    </div></el-col>-->
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="邮编:" prop="postcode">
                                <el-tooltip content="最多输入6个字符" placement="right" effect="light">
                                    <el-input v-model="editForm.postcode" :maxlength="6"></el-input>
                                </el-tooltip>
                            </el-form-item>
                        </div>
                    </el-col>

                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editSubmit">{{ $t('button.save') }}</el-button>
                <el-button @click.native="off('editForm')">{{ $t('button.cancel') }}</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import util from '../../common/js/util';

    export default {
        data() {
            return {
                regionalAddressList: [],
                disabledTo: false,
                // 分页
                pager: {
                    page: 1,
                    rows: 10,
                    total: 0
                },
                parentList: [],
                loading: false,
                dict: '',
                addParentRegionFlag: true,
                activeName: 'first',
                formInline: {
                    name: '',
                    code: '',
                    type: ''
                    // ,fullName: ''
                },
                users: [],
                newUser: null,
                dates: [],
                total: 0,
                dblId: [],
                type: '',
                status: '',
                page: 1,
                listLoading: false,
                sels: [], // 列表选中列
                editFormVisible: false, // 编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    postcode: [{validator: this.isPostalCodeTo}]
                },
                editForm: {
                    id: '',
                    name: '',
                    code: '',
                    type: '',
                    // fullName: '',
                    partentId: '',
                    postcode: '',
                    editformbox: ''
                },
                addFormVisible: false, // 新增界面是否显示
                addLoading: false,
                trigger: 'blur',
                addFormRules: {
                    name: [
                        {required: true, message: '请输入区划名称', trigger: this.trigger}
                    ],
                    code: [
                        {required: true, message: '请输区划编码', trigger: this.trigger}
                    ],
                    type: [
                        {required: true, message: '请选择区划类型', trigger: this.trigger}
                    ],
                    postcode: [{validator: this.isPostalCodeTo}]
                },
                addForm: {
                    name: '',
                    code: '',
                    type: '',
                    // fullName: '',
                    partentId: '',
                    postcode: ''
                },
                multipleSelection: [],
                currentPage1: 1,
                currentData: null,
                // 查询框折叠展开
                showSearch: true,
                titles: ''
            };
        },
        methods: {
            // 验证编码
            // validCode(rule, value, callback) {
            //     if (!value) {
            //         callback(new Error('请输入区划编码'));
            //     }
            //     if (!util.numberLetter(value)) {
            //         callback(new Error('区划编码只能输入数字，字母,或者数字字母组合'));
            //     } else {
            //         callback();
            //     }
            // },
            // 验证邮编
            isPostalCodeTo(rule, value, callback) {
                if (value) {
                    if (!util.validPostcode(value)) {
                        callback(new Error('请输入正确的6位邮编号码'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            },
            // 选择行数
            sizeChange(rows) {
                this.pager.rows = rows;
                this.getUser();
            },
            // 分页
            pageChange(page) {
                this.pager.page = page;
                this.getUser();
            },
            // 类型转换
            formatType(row, column) {
                let key = row.type;
                let json = this.dict.regionLevelEnum;
                return util.formatDict(json, key);
            },
            // 显示状态
            formatterStatus(row, column) {
                var status = row.status;
                var json = this.dict.statusEnum;
                return util.formatDict(json, status);
            },
            // 启用
            toEnable(row) {
                let _this = this;
                _this.listLoading = true;
                let ids = row.id;
                let versions = row.version;
                util.publicpost(
                    '/regionalAddress/enableRegionalAddress',
                    {
                        ids: ids,
                        versions: versions
                    },
                    function (res) {
                        _this.listLoading = false;
                        if (res.success) {
                            if (res.data === 0) {
                                _this.listLoading = false;
                                _this.errorMsg('服务器繁忙！');
                            } else {
                                _this.listLoading = false;
                                _this.successMsg(_this.$t('msg.success'));
                                _this.getUser();
                            }
                        } else {
                            _this.listLoading = false;
                            _this.errorMsg(_this.$t(res.msg));
                        }
                    }
                );
            },
            // 禁用
            toDisable(row) {
                let _this = this;
                _this.listLoading = true;
                let ids = row.id;
                let versions = row.version;
                util.publicpost(
                    '/regionalAddress/disableRegionalAddress',
                    {
                        ids: ids,
                        versions: versions
                    },
                    function (res) {
                        _this.listLoading = false;
                        if (res.success) {
                            if (res.data === 0) {
                                _this.listLoading = false;
                                _this.errorMsg('服务器繁忙！');
                            } else {
                                _this.listLoading = false;
                                _this.successMsg(_this.$t('msg.success'));
                                _this.getUser();
                            }
                        } else {
                            _this.listLoading = false;
                            _this.errorMsg(_this.$t(res.msg));
                        }
                    }
                );
            },
            // 鼠标失去焦点
            handleBlur: function (row) {
                // return;
                //        this.currentData = Object.assign({}, row);
                //        if (this.currentData) {
                //          let flag;
                //          for (let k in row) {
                //            if (k !== 'isEditing' && row[k] !== this.currentData[k]) {
                //              flag = true;
                //            }
                //          }
                //          this.currentData = flag ? Object.assign({}, row) : null;
                //          console.log(this.currentData);
                //        }
                // row.isEditing = !row.isEditing;
            },

            // 列表左右拉动
            arraySpanMethod({row, column, rowIndex, columnIndex}) {
                if (rowIndex % 2 === 0) {
                    if (columnIndex === 0) {
                        return [1, 2];
                    } else if (columnIndex === 1) {
                        return [0, 0];
                    }
                }
            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            // 点击编码查看
            examine(row) {
                let that = this;
                that.handleEdit(row, 'examine');
            },
            // 区划类型下拉列表框change事件
            changeType(form) {
                if (form === 'add') {
                    if (this.addForm.type === null || this.addForm.type === 'COUNTRY') {
                        this.addParentRegionFlag = true;
                    } else {
                        this.addParentRegionFlag = false;
                    }
                    this.addForm.partentId = '';
                } else if (form === 'edit') {
                    if (this.editForm.type === null || this.editForm.type === 'COUNTRY') {
                        this.addParentRegionFlag = true;
                    } else {
                        this.addParentRegionFlag = false;
                    }
                    this.editForm.partentId = '';
                }
            },
            partentId(val) {
                let that = this;
                that.editForm.partentId = val;
            },
            // 获取上一级地址列表
            partentRegionalAddress(query) {
                console.log(query);
                let _this = this;
                let type = '';
                _this.regionalAddressList = [];
                if (_this.editFormVisible) {
                    type = _this.editForm.type;
                } else {
                    type = _this.addForm.type;
                }
                if (query !== '') {
                    _this.loading = true;
                    util.publicpost(
                        '/regionalAddress/selectPartentRegionalAddressList',
                        {type: type, name: query},
                        function (res) {
                            if (res.code === 0) {
                                _this.loading = false;
                                _this.regionalAddressList = res.data.map(item => {
                                    console.log(item);
                                    // return item;
                                    return {
                                        id: item.id,
                                        name: item.name,
                                        value: item.id
                                    };
                                });
                            } else {
                                _this.errorMsg(_this.$t(res.msg));
                            }
                        }
                    );
                }
            },

            // 显示修改界面
            handleEdit: function (row, name) {
                let _this = this;
                let id = row.id;
                _this.listLoading = true;
                util.publicpost(
                    '/regionalAddress/selectRegionalAddressById',
                    {id: id},
                    function (res) {
                        if (res.code === 0) {
                            _this.listLoading = false;
                            if (name) {
                                _this.titles = '查看信息';
                                _this.addForm = res.data;
                                if (res.data.partentId !== null || res.data.partentId !== '') {
                                    util.publicpost(
                                        '/regionalAddress/selectRegionalAddressById',
                                        {id: res.data.partentId},
                                        function (response) {
                                            if (response.code === 0) {
                                                _this.addForm.partentId = response.data.name;
                                            }
                                        }
                                    );
                                }
                                _this.addFormVisible = true;
                                _this.disabledTo = true;
                            } else {
                                _this.editForm = res.data;
                                _this.editFormVisible = true;
                                _this.disabledTo = false;
                            }
                        } else {
                            _this.listLoading = false;
                            let msg = '';
                            if (!util.isEmpty(res.msg)) {
                                msg = ',' + _this.$t(res.msg);
                            }
                            _this.$message({
                                showClose: true,
                                message: _this.$t('msg.error') + msg,
                                type: 'error'
                            });
                        }
                    }
                );
            },

            // 修改的保存
            editSubmit: function () {
                let _this = this;
                _this.$refs.editForm.validate(valid => {
                    if (valid) {
                        _this.editLoading = true;
                        let para = Object.assign({}, _this.editForm);
                        util.publicpost(
                            '/regionalAddress/updateRegionalAddressById',
                            para,
                            function (res) {
                                if (res.code === 0) {
                                    _this.editLoading = false;
                                    _this.$refs['editForm'].clearValidate();
                                    _this.editFormVisible = false;
                                    _this.getUser();
                                    _this.successMsg(_this.$t('msg.success'));
                                } else {
                                    _this.editFormVisible = false;
                                    _this.errorMsg(_this.$t(res.msg));
                                }
                            }
                        );
                    }
                });
            },

            open4() {
                const h = this.$createElement;
                this.$msgbox({
                    title: '消息',
                    message: h('p', null, [
                        h('span', null, '内容可以是 '),
                        h('i', {style: 'color: teal'}, 'VNode')
                    ]),
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '执行中...';
                            setTimeout(() => {
                                done();
                                setTimeout(() => {
                                    instance.confirmButtonLoading = false;
                                }, 300);
                            }, 3000);
                        } else {
                            done();
                        }
                    }
                }).then(action => {
                    this.$message({
                        type: 'info',
                        message: 'action: ' + action
                    });
                });
            },

            // 获取地址信息列表
            getUser() {
                let _this = this;
                _this.users = [];
                _this.listLoading = true;
                util.publicpost(
                    '/regionalAddress/selectRegionalAddressListPage',
                    {
                        name: _this.formInline.name,
                        code: _this.formInline.code,
                        type: _this.formInline.type,
                        status: _this.formInline.status,
                        // fullName: _this.formInline.fullName,
                        page: _this.pager.page,
                        rows: _this.pager.rows
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
                            });
                            _this.users = res.result;
                            _this.dict = res.enumVal;
                            console.log(_this.users);
                        } else {
                            let msg = '';
                            if (!util.isEmpty(res.msg)) {
                                msg = ',' + _this.$t(res.msg);
                            }
                            _this.$message({
                                showClose: true,
                                message: _this.$t('msg.error') + msg,
                                type: 'error'
                            });
                        }
                        _this.users.forEach(item => {
                            item.isEditing = false;
                        });
                    }
                );
            },
            // 创建时间转换
            formatter(row, column) {
                return util.formatDate.format(
                    new Date(row.createTime),
                    'yyyy-MM-dd hh:mm:ss'
                );
            },
            // 修改时间转换
            formatterUpdate(row, column) {
                return row.updateTime
                    ? util.formatDate.format(
                        new Date(row.updateTime),
                        'yyyy-MM-dd hh:mm:ss'
                    )
                    : '';
            },

            // 添加
            handleAdd: function () {
                this.regionalAddressList = [];
                this.addForm = {
                    name: '',
                    code: '',
                    type: '',
                    // fullName: '',
                    partentId: '',
                    postcode: ''
                };
                let ids = this.sels.map(item => item.id).toString();
                if (ids === '') {
                    this.titles = '添加数据';
                    this.addFormVisible = true;
                } else {
                    this.addFormVisible = false;
                }
                this.addFormVisible = true;
            },
            // 新增的保存
            addSubmit: function () {
                let _this = this;
                _this.$refs.addForm.validate(valid => {
                    if (valid) {
                        _this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            _this.addLoading = true;
                            let para = Object.assign({}, this.addForm);
                            util.publicpost(
                                '/regionalAddress/saveRegionalAddress',
                                para,
                                function (res) {
                                    if (res.code === 0) {
                                        _this.$message({
                                            showClose: true,
                                            message: _this.$t('msg.success'),
                                            type: 'success'
                                        });
                                        _this.$refs['addForm'].resetFields();
                                        _this.addFormVisible = false;
                                        _this.getUser();
                                    } else {
                                        _this.addLoading = false;
                                        _this.errorMsg(_this.$t(res.msg));
                                    }
                                }
                            );
                        });
                    }
                });
            },
            // 取消
            off: function (formRule) {
                let that = this;
                that.addFormVisible = false;
                that.editFormVisible = false;
                that.disabledTo = false;
                that.$refs[formRule].resetFields();
                that.addForm = {
                    name: '',
                    code: '',
                    type: '',
                    // fullName: '',
                    partentId: '',
                    postcode: ''
                };
                that.regionalAddressList = [];
                that.addParentRegionFlag = true;
            },
            // 关闭弹层
            closeChangeMachie(done) {
                this.addFormVisible = false;
                this.editFormVisible = false;
                this.disabledTo = false;
                this.addForm = {
                    name: '',
                    code: '',
                    type: '',
                    // fullName: '',
                    partentId: '',
                    postcode: ''
                };
                this.addParentRegionFlag = true;
            },
            // 禁用
            handleForbidden: function () {
                let _this = this;
                let ids = _this.sels.map(item => item.id).toString();
                _this.listLoading = true;
                // let para = {ids: ids};
                if (status === 'INEFFECTIVENESS') {
                    return '无效';
                }
                util.publicpost(
                    'http://10.227.113.184:8081/sold/updateStatus',
                    {ids: ids},
                    function (res) {
                        if (res.code === 0) {
                            _this.$message({
                                showClose: true,
                                message: _this.$t('msg.success'),
                                type: 'success'
                            });
                            _this.getUser();
                        } else {
                            let msg = '';
                            if (!util.isEmpty(res.msg)) {
                                msg = ',' + _this.$t(res.msg);
                            }
                            _this.$message({
                                showClose: true,
                                message: _this.$t('msg.error') + msg,
                                type: 'error'
                            });
                        }
                    }
                );
            },
            // 启用
            handleStart: function () {
                let _this = this;
                let ids = _this.sels.map(item => item.id).toString();
                _this.listLoading = true;
                let para = {ids: ids};
                if (status === 'AVAILABILITY') {
                    return '有效';
                }
                util.publicpost(
                    'http://10.227.113.184:8081/sold/updateStatus',
                    para,
                    function (res) {
                        if (res.code === 0) {
                            _this.$message({
                                showClose: true,
                                message: _this.$t('msg.success'),
                                type: 'success'
                            });
                            this.getUser();
                        } else {
                            _this.$message({
                                showClose: true,
                                message: _this.$t('msg.success'),
                                type: 'success'
                            });
                        }
                    }
                );
            },

            // 重置
            resetForm() {
                this.formInline.name = '';
                this.formInline.code = '';
                this.formInline.type = '';
                this.formInline.status = '';
            },

            selsChange: function (sels) {
                this.sels = sels;
            },
            // 批量删除
            batchRemove: function (row) {
                let _this = this;
                let ids = row.id;
                let versions = row.version;
                _this
                    .$confirm('确认删除选中记录吗？', '提示', {
                        type: 'warning'
                    })
                    .then(() => {
                        _this.listLoading = true;
                        let para = {id: ids, version: versions};
                        util.publicpost(
                            '/regionalAddress/removeRegionalAddressBatch',
                            para,
                            function (res) {
                                if (res.code === 0) {
                                    console.log(res);
                                    _this.listLoading = false;
                                    _this.$message({
                                        message: _this.$t('msg.success'),
                                        type: 'success'
                                    });
                                    _this.getUser();
                                    console.log(_this);
                                } else {
                                    let msg = '';
                                    if (!util.isEmpty(res.msg)) {
                                        msg = ',' + _this.$t(res.msg);
                                    }
                                    _this.$message({
                                        showClose: true,
                                        message: _this.$t('msg.error') + msg,
                                        type: 'success'
                                    });
                                }
                            }
                        );
                    });
            }
        },
        computed: {
            toggleDrop() {
                return this.showSearch ? 'el-icon-arrow-up' : 'el-icon-arrow-down';
            }
        },
        mounted() {
            this.getUser();
            this.getButtonList();
        }
    };
</script>
<style>

</style>
