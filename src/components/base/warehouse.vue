// 仓库管理
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
                                <el-form-item :label="$t('warehouseThead.warehouseCode') + '：'">
                                    <el-input v-model="formInline.warehouseCode" :placeholder="$t('common.pleaseEnter') + $t('warehouseThead.warehouseCode')"
                                              :maxlength='60'></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item :label="$t('warehouseThead.warehouseName') + '：'">
                                    <el-input v-model="formInline.warehouseName" :placeholder="$t('common.pleaseEnter') + $t('warehouseThead.warehouseName')"
                                              :maxlength='100'></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item :label="$t('factoryDcThead.factoryLogisticsName') + '：'">
                                    <el-input v-model="formInline.factoryDcName" :placeholder="$t('common.pleaseEnter') + $t('factoryDcThead.factoryLogisticsName')"
                                              :maxlength='100'></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item :label="$t('commonThead.status') + '：'">
                                    <el-select v-model="formInline.status" clearable :placeholder="$t('common.pleaseChoose')" class="select">
                                        <el-option v-for="item in dict.status" :key="item.name" :label="item.des"
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
            <el-button @click="handleAdd('add')" v-if="permissions('base_warehouse_add')">{{ $t('button.add') }}</el-button>
            <!-- <el-button @click="handleEdit" :disabled="this.sels.length===0">{{ $t('button.update') }}</el-button> -->
        </div>

        <!-- 列表 -->
        <div class="list_materil list_operation">
            <el-table highlight-current-row stripe :data="users" v-loading="listLoading" @selection-change="selsChange"
                      style="width: 100%;" :fit="true" border align="center">

                <el-table-column :label="$t('commonThead.index')" align="center" type="index" width="50"></el-table-column>
                <el-table-column :label="$t('warehouseThead.warehouseCode')" width="130" prop="warehouseCode" align="center" sortable
                                 show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="hand" v-if="permissions('base_warehouse_query')" @click="ClickshipperCode(scope.row)">{{scope.row.warehouseCode}}</div>
                        <div class="hand" v-else>{{scope.row.warehouseCode}}</div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('warehouseThead.warehouseName')" prop="warehouseName" align="center" isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column :label="$t('factoryDcThead.factoryLogisticsName')" width="150" prop="factoryDcName" align="center" isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column :label="$t('commonThead.length')" prop="length" align="center" isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column :label="$t('commonThead.width')" prop="breadth" align="center" isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column :label="$t('commonThead.height')" prop="height" align="center" isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column :label="$t('commonThead.volume')" prop="volume" align="center" isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column :label="$t('commonThead.area')" prop="area" align="center" isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column :label="$t('warehouseThead.warehouseAddres')" prop="warehouseAddres" align="center" isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column :label="$t('commonThead.contactPerson')" prop="contactPerson" align="center" isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column :label="$t('commonThead.telephone')" prop="telephone" align="center" isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column :label="$t('commonThead.updater')" prop="updater" align="center" isEditing="true"></el-table-column>
                <el-table-column :label="$t('commonThead.updateTime')" prop="updateTime" align="center" isEditing="true"
                                 :formatter="formatterUpdate" show-overflow-tooltip></el-table-column>
                <el-table-column :label="$t('commonThead.status')" width="120" prop="status" align="center" isEditing="true"
                                 :formatter="formatStatus" show-overflow-tooltip></el-table-column>
                <el-table-column :label="$t('commonThead.note')" prop="note" align="center" isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column fixed="right" :label="$t('commonThead.operation')" align="center" width="170">
                    <template slot-scope="scope">
                        <div @click="edit(scope.row)" >
                            <el-tooltip content="修改" placement="top" effect="light" v-if="permissions('base_warehouse_update')">
                                <div class="operation_icon icon1"></div>
                            </el-tooltip>
                        </div>
                        <div @click="handleStart(scope.row)" v-if="scope.row.status === 'INEFFECTIVENESS'">
                            <el-tooltip content="启用" placement="top" effect="light" v-if="permissions('base_warehouse_enable')">
                                <div class="operation_icon icon2"></div>
                            </el-tooltip>
                        </div>
                        <div @click="handleStop(scope.row)" v-if="scope.row.status === 'AVAILABILITY'">
                            <el-tooltip content="禁用" placement="top" effect="light" v-if="permissions('base_warehouse_disable')">
                                <div class="operation_icon icon3"></div>
                            </el-tooltip>
                        </div>
                        <el-tooltip content="删除" placement="top" effect="light" v-if="permissions('base_warehouse_delete')">
                            <div @click="batchRemove(scope.row)" class="operation_icon icon4"></div>
                        </el-tooltip>

                        <!-- <el-button @click="handleEdit(scope.row,'modification')">{{ $t('button.update') }}</el-button>
                        <el-button @click="handleStart(scope.row)">{{ $t('button.enable') }}</el-button>
                        <el-button @click="handleStop(scope.row)">{{ $t('button.disable') }}</el-button>
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

        <!-- 新增/修改/查看界面 -->
        <el-dialog :visible.sync="addFormVisible" :close-on-click-modal="false"
                   style="line-height: 0;overflow: hidden;font-size: 12px;" :title="this.titles" class="default-dialog"
                   @close='closeDialog'>
            <div class="form form-add">
                <el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm" size="mini">
                    <el-input v-model="addForm.id" v-show="false"></el-input>
                    <el-input v-model="addForm.version" v-show="false"></el-input>
                    <el-row style="text-align: center">
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="仓库编码:" prop="warehouseCode">
                                    <el-tooltip content="最多输入20个字符" placement="right" effect="light"
                                                :disabled="this.disabledTo">
                                        <el-input v-model="addForm.warehouseCode" placeholder="请输入仓库编码" :maxlength='20'
                                                  :disabled="this.disabledToCode"></el-input>
                                    </el-tooltip>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="仓库名称:" prop="warehouseName">
                                    <el-tooltip content="最多输入50个字符" placement="right" effect="light"
                                                :disabled="this.disabledTo">
                                        <el-input v-model="addForm.warehouseName" placeholder="请输入仓库名称" :maxlength='50'
                                                  :disabled="this.disabledTo"></el-input>
                                    </el-tooltip>
                                </el-form-item>
                            </div>
                        </el-col>

                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="工厂物流中心:" prop="factoryLogisticsId">
                                    <el-select
                                            v-model="addForm.factoryLogisticsId"
                                            filterable
                                            remote
                                            reserve-keyword
                                            placeholder="请输入关键词"
                                            :remote-method="remoteMethod"
                                            :loading="loading"
                                            :disabled="this.disabledTo"
                                            clearable
                                    >
                                        <el-option
                                                v-for="(item, index) in soldList"
                                                :key="item.value + '-' + index"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>

                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="国家名称:" prop="countryId">
                                    <el-select v-model="addForm.countryId"
                                               @change="addressChange('addressed', addForm.countryId)" filterable
                                               placeholder="请选择国家名称" :disabled="this.disabledTo" clearable>
                                        <el-option
                                                v-for="item in address"
                                                :key="item.id"
                                                :label="item.fullName"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="省名称:" prop="provinceId">
                                    <el-select v-model="addForm.provinceId"
                                               @change="addressChange('city', addForm.provinceId)" filterable
                                               placeholder="请选择省名称" :disabled="this.disabledTo" clearable>
                                        <el-option v-for="item in addressed"
                                                   :key="item.id"
                                                   :label="item.fullName"
                                                   :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="市名称:" prop="cityId">
                                    <el-select v-model="addForm.cityId" @change="addressChange('county',addForm.cityId)"
                                               filterable placeholder="请选择市名称" :disabled="this.disabledTo" clearable>
                                        <el-option v-for="item in city"
                                                   :key="item.id"
                                                   :label="item.fullName"
                                                   :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="区县名称:" prop="districtId">
                                    <el-select v-model="addForm.districtId"
                                               @change="addressChange('street',addForm.districtId)" filterable
                                               placeholder="请选择区县名称" :disabled="this.disabledTo" clearable>
                                        <el-option v-for="item in county"
                                                   :key="item.id"
                                                   :label="item.fullName"
                                                   :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="街道名称:" prop="streetId">
                                    <el-select v-model="addForm.streetId" filterable placeholder="请选择街道名称"
                                               :disabled="this.disabledTo" clearable>
                                        <el-option v-for="item in street"
                                                   :key="item.id"
                                                   :label="item.fullName"
                                                   :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="地址:" prop="warehouseAddres">
                                    <el-tooltip content="最多输入250个字符" placement="right" effect="light"
                                                :disabled="this.disabledTo">
                                        <el-input v-model="addForm.warehouseAddres" placeholder="请输入地址" :maxlength='250'
                                                  :disabled="this.disabledTo"></el-input>
                                    </el-tooltip>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="联系人:" prop="contactPerson">
                                    <el-tooltip content="最多输入50个字符" placement="right" effect="light"
                                                :disabled="this.disabledTo">
                                        <el-input v-model="addForm.contactPerson" placeholder="请输入联系人" :maxlength='50'
                                                  :disabled="this.disabledTo"></el-input>
                                    </el-tooltip>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="联系电话:" prop="telephone">
                                    <el-tooltip content="最多输入11个字符" placement="right" effect="light"
                                                :disabled="this.disabledTo">
                                        <el-input v-model="addForm.telephone" placeholder="请输入联系电话" :maxlength='11'
                                                  :disabled="this.disabledTo"></el-input>
                                    </el-tooltip>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="备注:" prop="note">
                                    <el-tooltip content="最多输入100个字符" placement="right" effect="light"
                                                :disabled="this.disabledTo">
                                        <el-input v-model="addForm.note" placeholder="请输入备注" :maxlength='100'
                                                  :disabled="this.disabledTo"></el-input>
                                    </el-tooltip>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="长度:" prop="length">
                                    <el-tooltip content="最多输入8个字符" placement="right" effect="light"
                                                :disabled="this.disabledTo">
                                        <el-input v-model="addForm.length" placeholder="请输入长度" :maxlength='8'
                                                  :disabled="this.disabledTo"></el-input>
                                    </el-tooltip>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="宽度:" prop="breadth">
                                    <el-tooltip content="最多输入8个字符" placement="right" effect="light"
                                                :disabled="this.disabledTo">
                                        <el-input v-model="addForm.breadth" placeholder="请输入宽度" :maxlength='8'
                                                  :disabled="this.disabledTo"></el-input>
                                    </el-tooltip>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="高度:" prop="height">
                                    <el-tooltip content="最多输入8个字符" placement="right" effect="light"
                                                :disabled="this.disabledTo">
                                        <el-input v-model="addForm.height" placeholder="请输入高度" :maxlength='8'
                                                  :disabled="this.disabledTo"></el-input>
                                    </el-tooltip>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="面积:" prop="area">
                                    <el-tooltip content="最多输入8个字符" placement="right" effect="light"
                                                :disabled="this.disabledTo">
                                        <el-input v-model="addForm.area" placeholder="请输入面积" :maxlength='8'
                                                  :disabled="this.disabledTo"></el-input>
                                    </el-tooltip>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="体积:" prop="volume">
                                    <el-tooltip content="最多输入8个字符" placement="right" effect="light"
                                                :disabled="this.disabledTo">
                                        <el-input v-model="addForm.volume" placeholder="请输入体积" :maxlength='8'
                                                  :disabled="this.disabledTo"></el-input>
                                    </el-tooltip>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer def-but">
                <el-button @click.native="addSubmit('addForm')" v-show="this.addSubmitVisible"
                           :disabled="this.disabledTo">{{ $t('button.save') }}
                </el-button>
                <el-button @click.native="off('addForm')">{{ $t('button.cancel') }}</el-button>
            </div>
        </el-dialog>


    </div>
</template>
<script>
    import util from '../../common/js/util';

    export default {
        // components: {ElOption},
        data() {
            var validCode = (rule, value, callback) => {
                const reg = /^[0-9a-zA-Z]*$/g;
                if (!reg.test(value)) {
                    callback(new Error('只能输入数字或字母'));
                } else if (value === '') {
                    callback(new Error('不能为空'));
                } else {
                    callback();
                }
            };
            return {
                // 分页
                pager: {
                    page: 1,
                    rows: 10,
                    total: 0
                },
                disabledTo: false,
                disabledToCode: false,
                addSubmitVisible: true,
                dict: '',
                soldList: [],
                visible2: false,
                activeName: 'first',
                address: [],
                addressed: [],
                city: [],
                county: [],
                street: [],
                loading: false,
                formInline: {
                    user: '',
                    users: '',
                    warehouseCode: '',
                    warehouseName: '',
                    length: '',
                    breadth: '',
                    height: '',
                    warehouseAddres: '',
                    countryName: '',
                    provinceName: '',
                    cityName: '',
                    districtName: '',
                    streetName: '',
                    contactPerson: '',
                    telephone: '',
                    volume: '',
                    note: '',
                    area: '',
                    ownWarehouse: '',
                    factoryLogisticsId: '',
                    factoryDcName: ''
                },
                filters: {
                    name: ''
                },
                trigger: 'blur',
                users: [],
                type: '',
                listLoading: false,
                sels: [], // 列表选中列
                addFormVisible: false, // 新增界面是否显示
                titles: '',
                addLoading: false,
                addFormRules: {
                    warehouseCode: [{required: true, trigger: this.trigger, validator: validCode}],
                    warehouseName: [{required: true, message: '请输入仓库名称', trigger: this.trigger}],
                    factoryLogisticsId: [{required: true, message: '请输入关键词', trigger: 'change'}],
                    countryId: [{required: true, message: '请选择国家名称', trigger: 'change'}],
                    provinceId: [{required: true, message: '请选择省名称', trigger: 'change'}],
                    cityId: [{required: true, message: '请选择市名称', trigger: 'change'}],
                    districtId: [{required: true, message: '请选择区县名称', trigger: 'change'}],
                    streetId: [{required: true, message: '请选择街道名称', trigger: 'change'}],
                    contactPerson: [{required: true, message: '请输入联系人', trigger: this.trigger}],
                    length: [{required: true, message: '请输入长度', trigger: this.trigger}],
                    breadth: [{required: true, message: '请输入宽度', trigger: this.trigger}],
                    height: [{required: true, message: '请输入高度', trigger: this.trigger}],
                    warehouseAddres: [{required: true, message: '请输入地址', trigger: this.trigger}],
                    telephone: [{required: true, validator: this.validPhone}] // 这里需要用到全局变量
                },
                // 新增界面数据
                addForm: {
                    id: '',
                    warehouseCode: '',
                    warehouseName: '',
                    length: '',
                    breadth: '',
                    height: '',
                    warehouseAddres: '',
                    countryId: '',
                    provinceId: '',
                    cityId: '',
                    districtId: '',
                    streetId: '',
                    contactPerson: '',
                    telephone: '',
                    volume: '',
                    note: '',
                    area: '',
                    ownWarehouse: '',
                    factoryLogisticsId: '',
                    version: ''
                },
                multipleSelection: [],
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                // 查询框折叠展开
                showSearch: true,
                is_page: ''
            };
        },
        methods: {
            // 修改时间转换
            formatterUpdate(row, column) {
                return row.updateTime
                    ? util.formatDate.format(
                        new Date(row.updateTime),
                        'yyyy-MM-dd hh:mm:ss'
                    )
                    : '';
            },

            // 验证手机号
            validPhone(rule, value, callback) {
                util.isvalidPhone(rule, value, callback, 'required');
            },
            // 验证数字
            validNum(rule, value, callback) {
                if (!value) {
                    return;
                }
                if (!util.verifyFigure(value)) {
                    callback(new Error('请输入正数'));
                } else {
                    callback();
                }
            },
            // 校验代码
            validCode(rule, value, callback) {
                if (!value) {
                    return;
                }
                if (!util.numberLetter(value)) {
                    callback(new Error('请输入包含字母或数字的代码'));
                } else {
                    callback();
                }
            },
            closeDialog() {
                this.disabledTo = false;
                this.addFormVisible = false;
                this.editFormVisible = false;
                this.lookFormVisible = false;
                this.disabledToCode = false;
            },
            // 取消
            off: function (formName) {
                this.addFormVisible = false;
                this.editFormVisible = false;
                this.lookFormVisible = false;
                this.disabledTo = false;
                this.disabledToCode = false;
                this.$refs[formName].clearValidate();
            },
            ClickshipperCode: function (rows) {
                let _this = this;
                _this.titles = '查看数据';
                _this.addSubmitVisible = false;
                _this.showWarehouse(rows);
                _this.disabledTo = true;
                _this.disabledToCode = true;
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
            // 行数
            sizeChange(rows) {
                this.pager.rows = rows;
                this.getUser();
            },
            // 状态转换
            formatStatus(row, column) {
                let key = row.status;
                let json = this.dict.status;
                return util.formatDict(json, key);
            },
            // 根据id获取工厂物流中心
            formatFactory(row, column) {
                let key = row.factoryLogisticsId;
                console.log(key);
                let _this = this;
                util.publicpost(
                    '/factorydc/getFactoryDcById',
                    {factoryDcId: key},
                    function (res) {
                        if (res.code === 0) {
                            _this.loading = false;
                            _this.factoryName = res.data.name;
                        }
                    }
                );
            },
            // 分页
            pageChange(page) {
                this.pager.page = page;
                this.getUser();
            },
            loadadds(item, data) {
                for (let i = 0; i < data.length; i++) {
                    console.log(data[i]);
                    if (data[i].id === item) {
                        return data[i].fullName;
                    }
                }
            },
            // 根据名称模糊查询工厂物流中心
            remoteMethod(query) {
                if (query !== '') {
                    let _this = this;
                    _this.loading = true;
                    util.publicpost('/factorydc/selectByName', {name: query}, function (
                        res
                    ) {
                        if (res.code === 0) {
                            _this.loading = false;
                            _this.soldList = res.data.map(item => {
                                return {
                                    id: item.id,
                                    label: item.name,
                                    value: item.id
                                };
                            });
                        } else {
                        }
                    });
                }
            },
            // 添加
            handleAdd: function (name) {
                let _this = this;
                _this.is_page = name;
                _this.addFormVisible = true;
                _this.addSubmitVisible = true;
                _this.addForm = {
                    id: '',
                    warehouseCode: '',
                    warehouseName: '',
                    length: '',
                    breadth: '',
                    height: '',
                    warehouseAddres: '',
                    countryId: '',
                    provinceId: '',
                    cityId: '',
                    districtId: '',
                    streetId: '',
                    contactPerson: '',
                    telephone: '',
                    volume: '',
                    note: '',
                    area: '',
                    ownWarehouse: '',
                    factoryLogisticsId: '',
                    version: ''
                };
                _this.titles = '新增数据';
                if (_this.addFormVisible === true) {
                    _this.searchCountry();
                }
            },
            // 加载国家
            searchCountry() {
                let that = this;
                util.publicpost(
                '/regionalAddress/selectCountryRegionalAddress',
                    '',
                    function (res) {
                        if (res.code === 0) {
                            that.address = res.data;
                        } else {
                            that.$message({
                                showClose: true,
                                message: that.$t('msg.success'),
                                type: 'error'
                            });
                        }
                        // that.editLoading = false;
                    }
                );
            },
            edit: function (row, name) {
                console.log(row);
                let _this = this;
                _this.addSubmitVisible = true;
                _this.titles = '修改数据';
                _this.disabledToCode = true;
                _this.showWarehouse(row, name);
                _this.searchCountry();
            },
            // 显示修改界面
            showWarehouse: function (row, name) {
                console.log(row);
                console.log(name);
                let _this = this;
                _this.is_page = name;
                let ids = row.id;
                console.log(ids);
                _this.addForm = {
                    id: '',
                    warehouseCode: '',
                    warehouseName: '',
                    length: '',
                    breadth: '',
                    height: '',
                    warehouseAddres: '',
                    countryId: '',
                    provinceId: '',
                    cityId: '',
                    districtId: '',
                    streetId: '',
                    contactPerson: '',
                    telephone: '',
                    volume: '',
                    note: '',
                    area: '',
                    ownWarehouse: '',
                    factoryLogisticsId: '',
                    version: ''
                };
                _this.soldList = [{
                    id: row.factoryLogisticsId,
                    label: row.factoryDcName,
                    value: row.factoryLogisticsId
                }];
                _this.listLoading = true;
                util.publicpost('/warehouse/id', {id: ids}, function (res) {
                    if (res.code === 0 && res.data != null) {
                        _this.listLoading = false;
                        _this.addForm = res.data;
                        _this.addFormVisible = true;
                        // 赋值给省
                        util.addressChange('addressed', _this.addForm.countryId, _this);
                        util.addressChange('city', _this.addForm.provinceId, _this);
                        util.addressChange('county', _this.addForm.cityId, _this);
                        util.addressChange('street', _this.addForm.districtId, _this);

                        // _this.addForm.countryId = res.data.countryName;
                        // _this.addForm.provinceId = res.data.provinceName;
                        // _this.addForm.cityId = res.data.cityName;
                        // _this.addForm.districtId = res.data.districtName;
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
                });
            },

            addressChange(name, key) {
                util.PyatyiLinkage(name, this, 'add');
                util.addressChange(name, key, this);
            },
            // 启用
            handleStart: function (row) {
                let _this = this;
                let ids = row.id;
                _this.listLoading = true;
                let versions = row.version;
                util.publicpost(
                    '/warehouse/start',
                    {
                        ids: ids,
                        versions: versions
                    },
                    function (res) {
                        _this.listLoading = false;
                        if (res.success) {
                            if (res.code === 0) {
                                _this.listLoading = false;
                                _this.getUser();
                                _this.$message({
                                    message: _this.$t('msg.success'),
                                    type: 'success'
                                });
                            } else {
                                _this.errorMsg('服务器繁忙！');
                            }
                        } else {
                            _this.listLoading = false;
                            _this.errorMsg(_this.$t(res.msg));
                        }
                    }
                );
            },

            // 禁用
            handleStop: function (row) {
                let _this = this;
                let ids = row.id;
                _this.listLoading = true;
                let versions = row.version;
                util.publicpost(
                    '/warehouse/stop',
                    {
                        ids: ids,
                        versions: versions
                    },
                    function (res) {
                        _this.listLoading = false;
                        if (res.success) {
                            if (res.code === 0) {
                                _this.listLoading = false;
                                _this.getUser();
                                _this.$message({
                                    message: _this.$t('msg.success'),
                                    type: 'success'
                                });
                            } else {
                                _this.errorMsg('服务器繁忙！');
                            }
                        } else {
                            _this.listLoading = false;
                            _this.errorMsg(_this.$t(res.msg));
                        }
                    }
                );
            },
            // 获取用户列表
            getUser() {
                let _this = this;
                _this.currentRow = null;
                _this.listLoading = true;
                _this.users = [];
                util.publicpost(
                    '/warehouse/selectList',
                    {
                        warehouseCode: _this.formInline.warehouseCode,
                        warehouseName: _this.formInline.warehouseName,
                        status: _this.formInline.status,
                        factoryDcName: _this.formInline.factoryDcName,
                        page: _this.pager.page,
                        rows: _this.pager.rows
                    },
                    function (res) {
                        if (res.code == 0) {
                            _this.listLoading = false;
                            _this.pager.total = res.pager.totalCount || 0;
                            _this.users = res.result;
                            _this.dict = res.enumVal;
                            // console.log(res.result);
                        } else {
                            _this.listLoading = false;
                            _this.errorMsg('服务器繁忙！');
                        }
                    }
                );
                _this.users.forEach(item => {
                    item.isEditing = false;
                });
            },

            // 重置
            resetForm() {
                this.formInline.warehouseCode = '';
                this.formInline.warehouseName = '';
                this.formInline.factoryDcName = '';
                this.formInline.status = '';
            },

            // 新增的保存
            addSubmit: function (formName) {
                let that = this;

                that.addLoading = true;
                // let ids = this.sels.map(item => item.id).toString();
                let districtid = that.addForm.districtId;
                that.addForm.districtName = that.loadadds(districtid, that.county);

                let countryid = that.addForm.countryId;
                console.log(that.addForm.countryId);
                that.addForm.countryName = that.loadadds(countryid, that.address);

                let provinceid = that.addForm.provinceId;
                that.addForm.provinceName = that.loadadds(provinceid, that.addressed);

                let cityid = that.addForm.cityId;
                that.addForm.cityName = that.loadadds(cityid, that.city);

                let streeid = that.addForm.streetId;
                that.addForm.streetName = that.loadadds(streeid, that.street);

                let para = Object.assign({}, that.addForm);
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (util.isEmpty(that.addForm.id)) {
                            util.publicpost('/warehouse/insert', para, function (res) {
                                that.addLoading = false;
                                that.disabledToCode = false;
                                if (res.code === 0) {
                                    that.$message({
                                        showClose: true,
                                        message: that.$t('msg.success'),
                                        type: 'success'
                                    });
                                    that.$refs['addForm'].resetFields();
                                    that.addFormVisible = false;
                                    that.getUser();
                                } else {
                                    that.$message({
                                        showClose: true,
                                        message: that.$t(res.msg),
                                        type: 'error'
                                    });
                                }
                            });
                        } else {
                            util.publicpost('/warehouse/update', para, function (res) {
                                that.addLoading = false;
                                that.disabledToCode = false;
                                if (res.code === 0) {
                                    that.$message({
                                        message: that.$t('msg.success'),
                                        type: 'success'
                                    });
                                    that.$refs['addForm'].resetFields();
                                    that.addFormVisible = false;
                                    that.getUser();
                                } else {
                                    that.$message({
                                        showClose: true,
                                        message: that.$t(res.msg),
                                        type: 'error'
                                    });
                                }
                            });
                        }
                        // that.$confirm('确认提交吗？', '提示', {}).then(() => {

                        //     });
                        // this.$refs.addForm.validate(valid => {
                        //   console.log(valid)
                        //   if (valid) {

                        //   }
                        // });
                    } else {
                        // this.errorMsg(that.$t('msg.error'));
                        return false;
                    }
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            // 删除
            batchRemove: function (row) {
                let _this = this;
                let ids = row.id;
                // _this.listLoading = true;
                let versions = row.version;
                _this
                    .$confirm('确认删除选中记录吗？', '提示', {
                        type: 'warning'
                    })
                    .then(() => {
                        _this.listLoading = true;
                        let para = {ids: ids, versions: versions};
                        util.publicpost('/warehouse/deleteBatch', para, function (res) {
                            if (res.success) {
                                if (res.code === 0) {
                                    _this.listLoading = false;
                                    _this.getUser();
                                    _this.$message({
                                        message: _this.$t('msg.success'),
                                        type: 'success'
                                    });
                                } else {
                                    _this.errorMsg('服务器繁忙！');
                                }
                            } else {
                                _this.listLoading = false;
                                _this.errorMsg(_this.$t(res.msg));
                            }
                        });
                    })
                    .catch(error => console.log(error));
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
