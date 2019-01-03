// 工厂/物流中心管理

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
                                <el-form-item class='el-from-mater' :label="$t('factoryDcThead.factoryLogisticsCode') + '：'">
                                    <el-input v-model="formInline.user" :placeholder="$t('common.pleaseEnter') + $t('factoryDcThead.factoryLogisticsCode')"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item :label="$t('commonThead.name') + '：'">
                                    <el-input v-model="formInline.name" :placeholder="$t('common.pleaseEnter') + $t('commonThead.name')"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item :label="$t('commonThead.type') + '：'">
                                    <el-select v-model="formInline.type" clearable :placeholder="$t('common.pleaseChoose')" class="select">
                                        <el-option v-for="item in dict.type" :key="item.name" :label="item.des"
                                                   :value="item.name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <!--<el-col :xs="24" :sm="8" :lg="6" :xl="6">-->
                            <!--<el-form-item label="地址：">-->
                            <!--<el-input v-model="formInline.address" placeholder="请输入名称地址"></el-input>-->
                            <!--</el-form-item>-->
                            <!--</el-col>-->
                            <!--<el-col :xs="24" :sm="8" :lg="6" :xl="6">-->
                            <!--<el-form-item label="联系电话：">-->
                            <!--<el-input v-model="formInline.telephone" placeholder="请输入联系电话"></el-input>-->
                            <!--</el-form-item>-->
                            <!--</el-col>-->
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item :label="$t('commonThead.status') + '：'">
                                    <el-select v-model="formInline.status" clearable :placeholder="$t('common.pleaseChoose')" class="select">
                                        <el-option v-for="item in dict.status" :key="item.name" :label="item.des"
                                                   :value="item.name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item :label="$t('factoryDcThead.orgName') + '：'">
                                    <el-cascader :options="orgList" v-model="selectedOptionsTwo"
                                                 :props="{value:'orgID',label:'orgName'}"></el-cascader>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="footer-but tar pad_r pad_t">
                            <el-button type="primary" @click="getUser()">{{ $t('button.query') }}</el-button>
                            <el-button @click="resetForm()">{{ $t('button.reset') }}</el-button>
                        </div>
                    </el-form>
                </div>
            </div>
        </el-collapse-transition>

        <!--新增、删除-->
        <div class="add_move def-but">
            <el-button @click="handleAdd" v-if="permissions('base_factorydc_add')">{{ $t('button.add') }}</el-button>
            <el-button @click="handleEdit" :disabled="currentData === null" v-if="permissions('base_factorydc_save')">{{ $t('button.save') }}</el-button>
            <el-button @click="cancelEdit" :disabled="currentData === null" v-if="permissions('base_factorydc_cancel')">{{ $t('button.cancel') }}</el-button>
        </div>

        <!-- 列表 -->
        <div class="list list_operation">
            <el-table highlight-current-row stripe :data="users" @cell-dblclick="handleDbl" @selection-change="selsChange"
                      style="width: 100%;" border :fit="true" align="center"
                      @sort-change="sortChange" v-loading="listLoading">
                <el-table-column :label="$t('commonThead.index')" align="center" type="index" width="50"></el-table-column>
                <el-table-column width="170" :label="$t('factoryDcThead.factoryLogisticsCode')" text-overflow="ellipsis" prop="factoryLogisticsCode"
                                 align="center" sortable="custom" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="error-tip" v-show="scope.row.errorFactoryLogisticsCode">
                            <i class="el-icon-caret-top"></i>
                            <em class="error">{{ scope.row.errorFactoryLogisticsCodeText }}</em>
                        </div>
                        <el-input :class="{'is-error':scope.row.errorFactoryLogisticsCode}" size="mini"
                                  :disabled="inpDisabled" @blur="handleBlur(scope.row, scope.column.property)"
                                  v-if="scope.row.isEditing"
                                  v-model="scope.row.factoryLogisticsCode" :maxlength="10"></el-input>
                        <div slot="reference" v-if="!scope.row.isEditing">
                            {{ scope.row.factoryLogisticsCode }}

                        </div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('commonThead.name')" prop="name" align="center" text-overflow="ellipsis"
                                 show-overflow-tooltip>
                    <template slot-scope="scope">

                        <el-input :class="{'is-error':scope.row.errorName}" :maxlength="100" size="mini"
                                  @blur="handleBlur(scope.row, scope.column.property)" v-if="scope.row.isEditing"
                                  v-model="scope.row.name"></el-input>
                        <div slot="reference" v-if="!scope.row.isEditing">
                            {{ scope.row.name }}
                        </div>
                    </template>
                </el-table-column>

                <el-table-column prop="orgName" :label="$t('factoryDcThead.orgName')" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-cascader :class="{'is-error':scope.row.errorOrgId}" size="mini" v-if="scope.row.isEditing"
                                     :options="orgList" v-model="selectedOptions"
                                     :props="{value:'orgID',label:'orgName'}"></el-cascader>
                        <div slot="reference" v-if="!scope.row.isEditing">{{ scope.row.orgName }}</div>
                    </template>
                </el-table-column>

                <el-table-column :label="$t('commonThead.shortName')" prop="shortName" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-input :class="{'is-error':scope.row.errorShortName}" size="mini" :maxlength="100"
                                  @blur="handleBlur(scope.row, scope.column.property)" v-if="scope.row.isEditing"
                                  v-model="scope.row.shortName"></el-input>
                        <div slot="reference" v-if="!scope.row.isEditing">
                            {{ scope.row.shortName }}

                        </div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('commonThead.postcode')" prop="postcode" text-overflow="ellipsis" align="center"
                                 show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-input size="mini" :class="{'is-error':scope.row.errorPostcode}" :maxlength="6"
                                  @blur="handleBlur(scope.row, scope.column.property)" v-if="scope.row.isEditing"
                                  v-model="scope.row.postcode"></el-input>
                        <div slot="reference" v-if="!scope.row.isEditing">
                            {{ scope.row.postcode }}

                        </div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('commonThead.address')" prop="address" text-overflow="ellipsis" align="center"
                                 show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-input size="mini" :class="{'is-error':scope.row.errorAddress}" :maxlength="100"
                                  @blur="handleBlur(scope.row, scope.column.property)" v-if="scope.row.isEditing"
                                  v-model="scope.row.address"></el-input>
                        <div slot="reference" v-if="!scope.row.isEditing">
                            {{ scope.row.address }}

                        </div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('commonThead.telephone')" prop="telephone" align="center" text-overflow="ellipsis"
                                 show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-input size="mini" :class="{'is-error':scope.row.errorTelephone}" :maxlength="11"
                                  @blur="handleBlur(scope.row, scope.column.property)" v-if="scope.row.isEditing"
                                  v-model="scope.row.telephone"></el-input>
                        <div slot="reference" v-if="!scope.row.isEditing">
                            {{ scope.row.telephone }}

                        </div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('commonThead.type')" prop="type" align="center">
                    <template slot-scope="scope">
                        <el-select size="mini" v-if="scope.row.isEditing" v-model="scope.row.type" clearable
                                   placeholder="请选择" class="select">
                            <el-option v-for="item in dict.type" :key="item.name" :label="item.des"
                                       :value="item.name"></el-option>
                        </el-select>
                        <div v-if="!scope.row.isEditing">
                            {{formatType(scope.row)}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('commonThead.status')" isEditing="true" :formatter="formatStatus" prop="status" align="center"
                                 show-overflow-tooltip>
                </el-table-column>
                <!-- <el-table-column label="创建人" width="100" prop="creater" align="center" text-overflow="ellipsis">
                  <template slot-scope="scope">
                    <el-input size="mini" @blur="handleBlur(scope.row, scope.column.property)" v-if="scope.row.isEditing" v-model="scope.row.creater"></el-input>
                    <div slot="reference" v-if="!scope.row.isEditing">
                      {{ scope.row.creater }}

                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="创建时间" width="100" prop="createTime" text-overflow="ellipsis" align="center"
                                 :formatter="formatter" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input size="mini" @blur="handleBlur(scope.row, scope.column.property)" v-if="scope.row.isEditing"
                              v-model="scope.row.showCreateTime"></el-input>
                    <div slot="reference" v-if="!scope.row.isEditing">
                      {{scope.row.showCreateTime}}

                    </div>
                  </template>
                </el-table-column> -->
                <el-table-column :label="$t('commonThead.updater')" prop="updater" align="center" text-overflow="ellipsis">
                </el-table-column>
                <el-table-column :label="$t('commonThead.updateTime')" prop="updateTime" text-overflow="ellipsis" align="center"
                                 :formatter="formatterUpdate" show-overflow-tooltip>
                </el-table-column>
                <el-table-column fixed="right" :label="$t('commonThead.operation')" align="center" width="120">
                    <template slot-scope="scope">
                        <div @click="handleStart(scope.row)"
                             v-if="scope.row.status === 'INEFFECTIVENESS' && scope.row.id">
                            <el-tooltip content="启用" placement="top" effect="light" v-if="permissions('base_factorydc_enable')">
                                <div class="operation_icon icon2"></div>
                            </el-tooltip>
                        </div>
                        <div @click="handleForbidden(scope.row)"
                             v-if="scope.row.status === 'AVAILABILITY' && scope.row.id">
                            <el-tooltip content="禁用" placement="top" effect="light" v-if="permissions('base_factorydc_disable')">
                                <div class="operation_icon icon3"></div>
                            </el-tooltip>
                        </div>
                        <div v-if="scope.row.id">
                            <el-tooltip content="删除" placement="top" effect="light" v-if="permissions('base_factorydc_delete')">
                                <div @click="batchRemove(scope.row)" class="operation_icon icon4"></div>
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

        <!--@blur="scope.row.isEditing = !scope.row.isEditing"-->


    </div>
</template>
<script>
    import util from '../../common/js/util';
    import config from '../../common/js/config';

    export default {
        data() {
            return {
                // 分页
                pager: {
                    page: 1,
                    rows: 10,
                    total: 0
                },
                dict: '',
                activeName: 'first',
                formInline: {
                    user: '',
                    name: '',
                    type: '',
                    address: '',
                    status: '',
                    telephone: ''
                },
                options: [
                    {
                        value: '1',
                        label: 'OUT'
                    },
                    {
                        value: '2',
                        label: 'IN'
                    }
                ],
                users: [],
                orgList: [],
                newUser: null,
                dates: [],
                total: 0,
                dblId: [],
                type: '',
                page: 1,
                listLoading: false,
                sels: [], // 列表选中列
                editFormVisible: false, // 编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
                    createTime: [
                        {
                            type: 'date',
                            required: true,
                            message: '选择时间范围',
                            trigger: 'change'
                        }
                    ]
                },
                editForm: {
                    id: '',
                    name: '',
                    type: '',
                    createTime: new Date('2017-11-1 00:00:00')
                },
                addFormVisible: false, // 新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [{required: true, message: '请输入姓名', trigger: 'blur'}]
                },
                addForm: {
                    id: '',
                    name: '',
                    type: '',
                    createTime: new Date('2017-11-1 00:00:00')
                },
                multipleSelection: [],
                currentPage1: 1,
                currentData: null,
                // 查询框折叠展开
                showSearch: true,
                // 当前是否存在正在编辑的数据
                isEditRow: false,
                // 双击修改数据只读项
                inpDisabled: true,
                // 组织
                selectedOptions: [],
                selectedOptionsTwo: []
            };
        },
        methods: {
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
            // 状态转换
            formatStatus(row, column) {
                let key = row.status;
                let json = this.dict.status;
                return util.formatDict(json, key);
            },
            // 类型转换
            formatType(row, column) {
                let key = row.type;
                let json = this.dict.type;
                return util.formatDict(json, key);
            },
            handleChange(val) {
                console.log(val.pop());
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

            // 失去焦点
            handleBlur(row, property) {
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
            // 查询机构列表
            selectOrgList() {
                let _this = this;
                util.publicpost('/org/orgTree', {}, function (res) {
                    if (res.code === 0) {
                        _this.orgList = res.data;
                    }
                }, config.auth_service_ip);
            },
            // 工厂物流中心 列表
            getUser(uprow) {
                let _this = this;
                _this.listLoading = true;
                _this.users = [];
                util.publicpost(
                    '/factorydc/selectFactoryDcList',
                    {
                        factoryLogisticsCode: _this.formInline.user,
                        name: _this.formInline.name,
                        type: _this.formInline.type,
                        address: _this.formInline.address,
                        orgId: _this.selectedOptionsTwo[_this.selectedOptionsTwo.length - 1],
                        status: _this.formInline.status,
                        telephone: _this.formInline.telephone,
                        version: _this.version,
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
                            console.log(_this.users);
                            _this.dict = res.enumVal;
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
                        // _this.users.forEach(item => {
                        //   item.isEditing = false;
                        // });
                    }
                );
                _this.currentData = null;
            },

            //
            sortChange: function (prop) {
                console.log(prop);
                // let _this = this;
                util.publicpost(
                    '/factorydc/selectFactoryDcList',
                    {prop: prop.prop, order: prop.order},
                    function (res) {
                        if (res.code === 0) {
                            console.log(123);
                        }
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

            // 双击编辑
            handleDbl: function (row) {
                let _this = this;
                if (this.currentData && this.currentData.id !== row.id) {
                    _this.isEditRow = false;
                    _this.handleEdit(row);
                    return;
                }
                this.letTrToEdit(row);
            },
            // 当前行处于编辑状态
            letTrToEdit(uprow) {
                this.editFormVisible = true;
                let users = this.users.slice();
                let current = users.find(item => item.id === uprow.id);
                this.currentData = Object.assign({}, uprow);
                current.isEditing = !current.isEditing;
                this.inpDisabled = true;
                // this.users = users;
            },
            // letTrToEdit(uprow) {
            //   let users = this.users.slice();
            //   let current = this.users.find(item => item.roleID === uprow.roleID);
            //   current.isEditing = !current.isEditing;
            //   this.currentList = currentList;
            //   // 获取当前编辑数据
            //   this.currentRow = Object.assign({}, uprow);
            //   this.inpDisabled = true;
            // },
            // 添加
            handleAdd: function () {
                let _this = this;
                if (this.currentData) {
                    _this.isEditRow = true;
                    _this.handleEdit();
                    return;
                }
                _this.editFormVisible = true;
                _this.addNewData();
            },
            // 新增数据
            addNewData() {
                let u = {
                    isEditing: true,
                    createTime: '',
                    name: '',
                    address: '',
                    type: 'FACTORY',
                    status: 'AVAILABILITY',
                    telphone: '',
                    factoryLogisticsCode: '',
                    shortName: '',
                    orgId: '',
                    postcode: '',
                    creater: '',
                    updater: '',
                    updateTime: ''
                };

                this.currentData = u;
                this.users.unshift(u);
                this.inpDisabled = false;
            },
            // 判断是否有更改
            isUpdate() {
                let flag = false;
                if (this.currentData) {
                    let item = this.users.find(item => item.id === this.currentData.id);
                    for (let k in item) {
                        if (k !== 'isEditing' && item[k] !== this.currentData[k]) {
                            flag = true;
                        }
                    }
                    if (flag) {
                        this.currentData = Object.assign({}, item);
                    } else {
                        item.isEditing = false;
                        this.currentData = null;
                    }
                }
                return flag;
            },
            // 保存
            handleEdit: function (dbrow) {
                console.log('这是点击保存按钮的打印:');
                console.log(dbrow);
                let _this = this;
                if (!this.currentData.id) {
                    _this.currentData.orgId = _this.selectedOptions[_this.selectedOptions.length - 1];
                    const {
                        factoryLogisticsCode,
                        name,
                        shortName,
                        address,
                        postcode,
                        orgId,
                        telephone,
                        type,
                        version
                    } = this.currentData;
                    // this.currentData.orgId = _this.selectedOptions.pop();
                    // console.log(_this.selectedOptions)
                    // let factoryLogisticsCode = row.factoryLogisticsCode;
                    // let name = row.name;
                    // let shortName = row.shortName;
                    // // let address = row.address;
                    // let postcode = row.postcode;
                    // // let telephone = row.telephone;
                    // // 编码校验
                    if (util.isEmpty(this.currentData.factoryLogisticsCode)) {
                        _this.errorMsg('编码不能为空');
                        return;
                    } else if (!util.isEmpty(this.currentData.factoryLogisticsCode) && !util.numberLetter(this.currentData.factoryLogisticsCode)) {
                        _this.errorMsg('编码只能由20位字母或数字组成');
                        return;
                    }
                    // 全称校验
                    if (util.isEmpty(this.currentData.name)) {
                        _this.errorMsg('全称不能为空');
                        return;
                    }
                    // 简称校验
                    if (util.isEmpty(this.currentData.shortName)) {
                        _this.errorMsg('简称不能为空');
                        return;
                    }
                    // 邮编校验
                    if (util.isEmpty(this.currentData.postcode)) {
                        _this.errorMsg('邮编不能为空');
                        return;
                    } else if (!util.isEmpty(this.currentData.postcode) && !util.isPostalCodeTo(this.currentData.postcode)) {
                        _this.errorMsg('邮编格式不对');
                        return;
                    }
                    if (util.isEmpty(this.currentData.telephone)) {
                        _this.errorMsg('联系电话不能为空');
                        return;
                    } else if (!util.isEmpty(this.currentData.telephone) && !util.isvalidPhoneTo(this.currentData.telephone)) {
                        _this.errorMsg('联系电话格式不对');
                        return;
                    }
                    util.publicpost(
                        '/factorydc/insertFactoryDc',
                        {
                            factoryLogisticsCode,
                            name,
                            shortName,
                            address,
                            postcode,
                            orgId,
                            telephone,
                            type,
                            version
                        },
                        function (res) {
                            if (res.success) {
                                if (res.data === 0) {
                                    _this.errorMsg('服务器繁忙！');
                                } else {
                                    _this.successMsg(_this.$t('msg.success'));
                                    if (dbrow) {
                                        _this.getUser(dbrow);
                                    } else {
                                        _this.getUser();
                                    }
                                }
                            } else {
                                if (util.isEmpty(res.msg)) {
                                    _this.errorMsg(_this.$t('msg.error'));
                                } else {
                                    _this.errorMsg(_this.$t('msg.error') + ',' + _this.$t(res.msg));
                                }
                            }
                        }
                    );
                } else {
                    /* if (!this.isUpdate()) {
                        if (dbrow) {
                            _this.getUser(dbrow);
                        } else {
                            _this.getUser();
                        }
                        return;
                    } */
                    _this.currentData.orgId = _this.selectedOptions[_this.selectedOptions.length - 1];
                    console.log('这是组织ID：' + _this.currentData.orgId);
                    const {
                        id,
                        factoryLogisticsCode,
                        name,
                        shortName,
                        address,
                        orgId,
                        postcode,
                        telephone,
                        type,
                        version
                    } = this.currentData;
                    util.publicpost(
                        '/factorydc/updateFactoryDc',
                        {
                            id,
                            factoryLogisticsCode,
                            name,
                            shortName,
                            address,
                            orgId,
                            postcode,
                            telephone,
                            type,
                            version
                        },
                        function (res) {
                            if (res.code === 0) {
                                _this.successMsg(_this.$t('msg.success'));
                                if (dbrow) {
                                    _this.getUser(dbrow);
                                } else {
                                    _this.getUser();
                                }
                                // this.currentData = null;
                                // this.getUser();
                            } else {
                                if (util.isEmpty(res.msg)) {
                                    _this.errorMsg(_this.$t('msg.error'));
                                } else {
                                    _this.errorMsg(_this.$t('msg.error') + ',' + _this.$t(res.msg));
                                }
                            }
                        }
                    );
                }
            },
            // 取消编辑
            cancelEdit: function () {
                this.isEditRow = false;
                if (this.currentData.id) {
                    this.users = this.users.map(item => {
                        if (item.id === this.currentData.id) {
                            item = Object.assign({}, this.currentData);
                            item.isEditing = false;
                        }
                        return item;
                    });
                } else {
                    this.users.shift();
                }
                this.currentData = null;
                // this.newUser = Object.assign({}, row);
                // this.getUser();
            },

            // 禁用
            handleForbidden: function (row) {
                let _this = this;
                let ids = row.id;
                let versions = row.version;
                _this.listLoading = true;
                util.publicpost(
                    '/factorydc/updateIneffectivenessStatus',
                    {ids: ids, versions: versions},
                    function (res) {
                        if (res.code === 0) {
                            _this.listLoading = false;
                            _this.$message({
                                showClose: true,
                                message: _this.$t('msg.success'),
                                type: 'success'
                            });
                            _this.getUser();
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
            // 启用 and 禁用
            handleStart: function (row) {
                let _this = this;
                let ids = row.id;
                let versions = row.version;
                _this.listLoading = true;
                util.publicpost(
                    '/factorydc/updateAvailabilityStatus',
                    {ids: ids, versions: versions},
                    function (res) {
                        if (res.code === 0) {
                            _this.listLoading = false;
                            _this.$message({
                                showClose: true,
                                message: _this.$t('msg.success'),
                                type: 'success'
                            });
                            _this.getUser();
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

            handleCurrentChange(val) {
                this.page = val;
                this.getUsers();
            },
            // 重置
            resetForm() {
                this.formInline.user = '';
                this.formInline.name = '';
                this.formInline.type = '';
                this.formInline.status = '';
                this.selectedOptionsTwo = [];
                this.formInline.address = '';
                this.formInline.telephone = '';
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
                        let para = {ids: ids, versions: versions};
                        util.publicpost('/factorydc/deleteFactoryDc', para, function (res) {
                            if (res.code === 0) {
                                _this.listLoading = false;
                                _this.$message({
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
                        });
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
            this.selectOrgList();
            this.getButtonList();
        }
    };
</script>
<style>

</style>
