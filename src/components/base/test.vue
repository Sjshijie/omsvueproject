// 测试画面
<template>
    <div class="main">
        <!-- 查询模块 -->
        <div class="query-top">
            <em class="fl el-icon-search"></em>
            <p class="fl titleInfo">{{ $t('common.searchInfo') }}</p>
            <el-button class="fr" :icon="toggleDrop" @click="showSearch = !showSearch"></el-button>
        </div>

        <!-- 查询条件+折叠效果 -->
        <el-collapse-transition>
            <div v-show="showSearch">
                <div class="query-content transDrop">
                    <el-form size="mini" :inline="true" label-width="80px" :model="formInline" class="demo-form-inline" status-icon ref="formInline">
                        <!-- 第一行 -->
                        <el-row :gutter="10">
                            <!--货主编码-->
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item :label="$t('shipperThead.shipperCode') + '：'">
                                    <el-input v-model="formInline.shipperCode" :placeholder="$t('common.pleaseEnter')" :maxlength='50'></el-input>
                                </el-form-item>
                            </el-col>
                            <!--货主名称-->
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item :label="$t('shipperThead.shipperName') + '：'">
                                    <el-input v-model="formInline.shipperName" :placeholder="$t('common.pleaseEnter')" :maxlength='50'></el-input>
                                </el-form-item>
                            </el-col>
                            <!--货主类型-->
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item :label="$t('shipperThead.shipperType') + '：'">
                                    
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!-- 第二行 -->
                        <div class="footer-but tar pad_r pad_t">
                            <el-button type="primary" @click="getShipperTo()">{{ $t('button.query') }}</el-button>
                            <el-button @click="resetForm()">{{ $t('button.reset') }}</el-button>
                            <el-button :disabled="this.exportBtnDisabled" @click="exportExcel" class="base_shipper_export">导出</el-button>
                        </div>
                    </el-form>
                </div>
            </div>
        </el-collapse-transition>

        <!-- 列表 -->
        <!--新增、删除按钮-->
        <div class="add_move def-but">
            <el-button @click="handleAdd" class="base_shipper_add">{{ $t('button.add') }}</el-button>
            <el-button @click="centerDialogVisible = true" class="base_shipper_import">{{ $t('button.importExcel') }}
            </el-button>
        </div>
        <!-- 表格 -->
        <div class="list shipperList list_operation">
             <el-table highlight-current-row :data="users" stripe v-loading="listLoading" @selection-change="selsChange" style="width: 100%;"
                      :fit="true" border align="center" @sort-change="sortChange" :height="tableListHeight">
                 <!--序号-->
                <el-table-column :label="$t('commonThead.index')" align="center" type="index" width="50"></el-table-column>
                <!--货主名称-->
                <el-table-column :label="$t('shipperThead.shipperName')" prop="shipperName" align="center"
                                 isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <!--货主编码-->
                <el-table-column :label="$t('shipperThead.shipperCode')" prop="shipperCode" align="center"
                                 sortable
                                 text-overflow="ellipsis" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div slot="reference" @click="clickshipperCode(scope.row)" class="name-wrapper hand">
                            {{ scope.row.shipperCode }}
                        </div>
                    </template>
                </el-table-column>
                <!--货主简称-->
                <el-table-column :label="$t('shipperThead.shortName')" prop="shortName" align="center" isEditing="true"
                                 show-overflow-tooltip>
                </el-table-column>
                <!--货主类型-->
                <el-table-column :label="$t('shipperThead.shipperType')" prop="shipperType" align="center"
                                 isEditing="true"
                                 :formatter="formatterShipperType" show-overflow-tooltip></el-table-column>
                <!-- 操作 -->
                <el-table-column fixed="right" label="操作" align="center" width="100">
                    <template slot-scope="scope">
                        <el-tooltip content="修改" placement="top" effect="light"
                                    v-if="ifShowEdit">
                            <div @click="handleEdit(scope.row)" class="operation_icon icon1"></div>
                        </el-tooltip>
                    </template>
                </el-table-column>
             </el-table>
             <!-- 工具条 -->
            <el-col :span="24" class="toolbar">
                <em class="el-icon-refresh fr mar_lr table-refresh"></em>
                <div class="block fr">
                    <el-pagination @size-change="sizeChange" @current-change="pageChange"
                                   :current-page="1" :page-sizes="[5, 10, 20, 50]"
                                   :page-size="21" layout="total,sizes, prev, pager, next, jumper"
                                   :total="3"></el-pagination>
                </div>
            </el-col>   
        </div>

        <!-- 新增界面 -->
        <el-dialog :visible.sync="addFormVisible" :close-on-click-modal="false" @close="off('addForm')"
            class="wl-new user-dialog" style="height:380px">
            <div class="form">
                <el-tabs v-model="activeName" @tab-click="handleTabs" class="shipperMd_show">
                    <el-tab-pane label="货主信息" name="first">
                        <el-form style="height:320px;overflow-y: auto;margin-bottom: 10px;" :model="addForm"
                                 label-width="130px" :rules="addFormRules" ref="addForm" size="mini">
                            <!-- 新增第一行 -->
                            <el-row>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="货主名称：" prop="shipperName">
                                            <el-tooltip content="最多输入50个字符" placement="right" effect="light">
                                                <el-input v-model="addForm.shipperName" :maxlength='50'
                                                        :disabled="updateStatus"></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="货主编码：" prop="shipperCode">
                                            <el-tooltip content="最多输入50个字符" placement="right" effect="light">
                                                <el-input v-model="addForm.shipperCode" :maxlength='50'
                                                        :disabled="updateStatus"></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>
                            <!-- 新增第二行 -->
                            <el-row>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="经营期限：" prop="operatingPeriod">
                                            <el-date-picker
                                                    v-model="addForm.operatingPeriod"
                                                    :editable=false
                                                    type="date"
                                                    format="yyyy-MM-dd"
                                                    placeholder="选择日期时间" clearable :disabled="updateStatus">
                                            </el-date-picker>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="是否一级货主：" prop="whetherLevelOne">
                                            <el-select v-model="addForm.whetherLevelOne" placeholder="请选择"
                                                    :disabled="updateStatus" @change="whetherLevelOne">
                                                <el-option
                                                    v-for="item in defaultEnum"
                                                    :key="item.code"
                                                    :label="item.name"
                                                    :value="item.name">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row class="btn" style="clear: both;">
                                <el-col :span="24">
                                    <el-button @click.native="off('addForm')">{{ $t('button.cancel') }}</el-button>
                                    <el-button @click.native="addSubmit('addForm')" :loading="addLoading"
                                            :disabled="updateStatus">{{ $t('button.save') }}
                                    </el-button>
                                </el-col>
                            </el-row>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="仓储中心" name="second">
                        <el-form style="height:320px;overflow-y: auto;margin-bottom: 10px;" :model="addForm"
                                 label-width="130px" :rules="addFormRules" ref="addForm" size="mini">
                            <!-- 新增第一行 -->
                            <el-row>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="货主名称1：" prop="shipperName">
                                            <el-tooltip content="最多输入50个字符" placement="right" effect="light">
                                                <el-input v-model="addForm.shipperName" :maxlength='50'
                                                        :disabled="updateStatus"></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="货主编码1：" prop="shipperCode">
                                            <el-tooltip content="最多输入50个字符" placement="right" effect="light">
                                                <el-input v-model="addForm.shipperCode" :maxlength='50'
                                                        :disabled="updateStatus"></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>
                            <!-- 新增第二行 -->
                            <el-row>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="经营期限1：" prop="operatingPeriod">
                                            <el-date-picker
                                                    v-model="addForm.operatingPeriod"
                                                    :editable=false
                                                    type="date"
                                                    format="yyyy-MM-dd"
                                                    placeholder="选择日期时间" clearable :disabled="updateStatus">
                                            </el-date-picker>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="是否一级货主1：" prop="whetherLevelOne">
                                            <el-select v-model="addForm.whetherLevelOne" placeholder="请选择"
                                                    :disabled="updateStatus" @change="whetherLevelOne">
                                                <el-option
                                                    v-for="item in defaultEnum"
                                                    :key="item.code"
                                                    :label="item.name"
                                                    :value="item.name">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import util from '../../common/js/util';
    import config from '../../common/js/config';
    import cookieOperation from '../../common/js/cookieOperation';

    export default {
        data() {
            return {
                //查询框折叠展开
                showSearch : true,
                //导出按钮默认不可编辑
                exportBtnDisabled : true,
                //列表加载等待
                listLoading : false,
                //删除按钮初始化
                buttonVisible : false,
                //编辑按钮初始化
                ifShowEdit : true,
                // 新增界面是否显示
                addFormVisible : false, 
                //定位到哪个tab
                activeName : 'first',
                //字段是否为更新
                updateStatus: false,
                //必填，失去焦点
                trigger : 'blur',
                //保存loading初始化
                addLoading : false,
                //查询条件值初始化
                formInline : {
                    shipperCode : '',
                    shipperName : '',
                    shipperType : ''
                },
                dict: '',
                users : [{
                    shipperName : 'a1',
                    shipperCode : 'b1',
                    shortName : 'c1',
                    shipperType : 'd1'
                },{
                    shipperName : 'a2',
                    shipperCode : 'b2',
                    shortName : 'c2',
                    shipperType : 'd2'
                }],
                defaultEnum : [{
                    code : 0,
                    name : '否'
                },{
                    code : 1,
                    name : '是'
                }],
                // 新增界面数据
                addForm: {
                    shipperName : '',
                    shipperCode : '',
                    operatingPeriod : '',
                    whetherLevelOne : ''
                },
                // 新增必填字段
                addFormRules: {
                   shipperName: [
                        {required: true, message: '请输入货主名称', trigger: this.trigger}
                    ],
                    shipperCode: [
                        {required: true, message: '请输入货主编码', trigger: this.trigger},
                        {required: true, message: '', trigger: this.trigger, validator: this.stripscriptTo}
                    ],
                    operatingPeriod: [
                        {required: true, message: '请输入经营日期', trigger: this.trigger}
                    ],
                    whetherLevelOne: [
                        {required: true, message: '请选择是否为一级货主', trigger: 'change'}
                    ]
                }
            }
        },
        computed:{
            toggleDrop() {
                return this.showSearch ? 'el-icon-arrow-up' : 'el-icon-arrow-down';
            },
            tableListHeight() {
                let computedHeight = $(window).height() - $('.transDrop').height() - $('.add_move').height() - 85;
                return (this.users && this.users.length > 0) ? computedHeight : '120';
            }
        },
        // 初始化页面完成后
        mounted(){
            this.getShipper();
            this.exportBtnDisabled = true;
        },
        methods:{
            // 查询点击事件
            getShipperTo() {
                let _this = this;
                _this.getShipper();
            },
            // 查询条件重置事件
            resetForm(){
                alert(2);
            },
            // 导出数据事件
            exportExcel(){
                alert(3);
            },
            // 货主列表获取
            getShipper(sign) {
                 this.exportBtnDisabled = false;
            },
            //添加事件
            handleAdd(){
                let _this = this;
                _this.addFormVisible = true;
            },
            //导入事件  
            centerDialogVisible(){
                alert("导入");
            },
             // 查看页面
            clickshipperCode(rows) {
                alert("点击编码，查看当前行数据");
            },
            // 显示编辑界面
            handleEdit: function (row) {
                alert(row.shipperName);
            },
             // 页码改变的时候
            pageChange(currentPage) {
                alert("页码改变");
                this.pager.page = currentPage;
                this.getShipper();
            },
            // 每页数量大小改变的时候
            sizeChange(currentRows) {
                alert("数量大小改变");
                this.pager.rows = currentRows;
                this.getShipper();
            },
            //tab切换事件
            handleTabs(tab,event){
                alert(1);
            },
            // 验证是否有特殊字符
            stripscriptTo(rule, value, callback) {
                util.validSpecialCode(rule, value, callback);
            },
            // 校验新增货主信息
            addSubmit: function (formName) {
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert("success");
                    }else{
                        alert(1);
                        return false;
                    }
                });
            },
            //取消按钮事件
            off: function(formName){
                let _this=this;
                _this.$confirm('信息未保存,确定要关闭吗?', '提示', {
                        cancelButtonText: '取消',
                        confirmButtonText: '确定',
                        type: 'warning'
                }).then(() => {
                    _this.addFormVisible = false;
                    _this.activeName = 'first';
                    // this.editFormVisible = false;
                    // this.lookFormVisible = true;
                    // this.haveShipperExt = true;
                    // this.addForm.whetherLevelOne = 'NO';
                    // this.shipperId = '';
                    // this.UserPager.total = 0;
                    // this.SoldPager.total = 0;
                    // this.SoldPagerTo.total = 0;
                    // this.DeliveryPager.total = 0;
                    // this.DeliveryPagerTo.total = 0;
                    // this.disabledTo = false;
                    // this.parentList = [];
                }).catch(() => {
                    _this.addFormVisible = true;
                });
            },
            // 点击右上角关闭按钮 清空货主ID
            closeDialog(formRule) {
                alert(formRule);
            },
            //勾选事件
            selsChange: function (sels) {
                alert("selsChange");
            },
            //排序
            sortChange: function (prop) {
                // this.pager.order = util.dtopx(prop.order);
                // this.pager.sort = util.dtotoLower(prop.prop);
                // this.getShipper();
            },
            // 货主类型转换
            formatterShipperType(row, column) {
                // let key = row.shipperType;
                // let json = this.dict.shipperTypeEnum;
                // return util.formatDict(json, key);
            },
             whetherLevelOne(val) {
                // if (val !== 'YES') {
                //     this.whetherLevelOneTo = true;
                //     this.superShipperStatus = true;
                // } else {
                //     this.whetherLevelOneTo = false;
                //     this.superShipperStatus = false;
                // }
                // if (this.$refs['addForm'] !== undefined) {
                //     this.$refs['addForm'].clearValidate();
                // }
            }
        }
    }
</script>

<style>
    
</style>


