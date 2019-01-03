// 货主管理
<template>
    <div class="admin owner">
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
                            <!--货主编码-->
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item :label="$t('shipperThead.shipperCode') + '：'">
                                    <el-input v-model="formInline.shipperCode"
                                              :placeholder="$t('common.pleaseEnter')"
                                              :maxlength='50'></el-input>
                                </el-form-item>
                            </el-col>
                            <!--货主名称-->
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item :label="$t('shipperThead.shipperName') + '：'">
                                    <el-input v-model="formInline.shipperName"
                                              :placeholder="$t('common.pleaseEnter')"
                                              :maxlength='50'></el-input>
                                </el-form-item>
                            </el-col>
                            <!--货主类型-->
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item :label="$t('shipperThead.shipperType') + '：'">
                                    <el-select v-model="formInline.shipperType" :placeholder="$t('common.pleaseChoose')"
                                               clearable>
                                        <el-option
                                                v-for="item in this.dict.shipperTypeEnum"
                                                :key="item.name"
                                                :label="item.des"
                                                :value="item.name">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <!--服务类型-->
                            <!--<el-col :xs="24" :sm="8" :lg="6" :xl="6">-->
                            <!--<el-form-item :label="$t('shipperThead.services') + '：'">-->
                            <!--<el-select v-model="formInline.services" :placeholder="$t('common.pleaseChoose')" clearable>-->
                            <!--<el-option-->
                            <!--v-for="item in this.dict.servicesEnum"-->
                            <!--:key="item.name"-->
                            <!--:label="item.des"-->
                            <!--:value="item.name">-->
                            <!--</el-option>-->
                            <!--</el-select>-->
                            <!--</el-form-item>-->
                            <!--</el-col>-->
                            <!--启禁用状态-->
                            <!--<el-col :xs="24" :sm="8" :lg="6" :xl="6">-->
                            <!--<el-form-item :label="$t('commonThead.disableStatus') + '：'">-->
                            <!--<el-select v-model="formInline.status" clearable :placeholder="$t('common.pleaseChoose')" class="select" clearable>-->
                            <!--<el-option v-for="item in dict.statusEnum" :key="item.name" :label="item.des"-->
                            <!--:value="item.name"></el-option>-->
                            <!--</el-select>-->
                            <!--</el-form-item>-->
                            <!--</el-col>-->
                        </el-row>
                        <div class="footer-but tar pad_r pad_t">
                            <el-button type="primary" @click="getShipperTo()">{{ $t('button.query') }}</el-button>
                            <el-button @click="resetForm()">{{ $t('button.reset') }}</el-button>
                            <el-button :disabled="exportBtnDisabled" @click="exportExcel"
                                       class="base_shipper_export hide">导出
                            </el-button>
                            <!--<el-button :disabled="this.exportBtnDisabled" @click="exportExcel" v-if="permissions('base_shipper_export')">导出</el-button>-->
                        </div>
                    </el-form>
                </div>
            </div>
        </el-collapse-transition>

        <!--新增、删除-->
        <div class="add_move def-but">
            <el-button @click="handleAdd" class="base_shipper_add hide">{{ $t('button.add') }}</el-button>
            <el-button @click="centerDialogVisible = true" class="base_shipper_import hide" :disabled="!(users && users.length > 0)">{{ $t('button.importExcel')
                }}
            </el-button>
            <!--<el-button @click="handleAdd" v-if="permissions('base_shipper_add')">{{ $t('button.add') }}</el-button>-->
            <!--<el-button @click="centerDialogVisible = true" v-if="permissions('base_shipper_import')">{{ $t('button.importExcel') }}</el-button>-->
            <!-- <el-button @click="handleEdit" :disabled="this.sels.length===0">{{ $t('button.update') }}</el-button> -->
            <!-- <el-button @click="handleView" :disabled="this.sels.length===0">{{ $t('button.view') }}</el-button> -->
            <!-- <el-button @click="handleStart" :disabled="this.sels.length===0">{{ $t('button.enable') }}</el-button>
            <el-button @click="handleForbidden" :disabled="this.sels.length===0">{{ $t('button.disable') }}</el-button>
            <el-button @click="batchRemove" :disabled="this.sels.length===0">{{ $t('button.delete') }}</el-button> -->
            <!--<el-button @click="download">{{ $t('button.exportExcel') }}</el-button>-->
        </div>

        <!-- 列表 -->
        <div class="list shipperList list_operation">
            <el-table highlight-current-row :data="users" stripe v-loading="listLoading" @selection-change="selsChange"
                      style="width: 100%;" :default-sort = "{prop: 'shipperCode', order: 'ascending'}"
                      :fit="true" border align="center" @sort-change="sortChange" :height="tableListHeight">
                <!-- <el-table-column type="selection" align="center" isEditing="true" width="55" @click="selsChange()"></el-table-column> -->
                <!--序号-->
                <el-table-column :label="$t('commonThead.index')" align="center" type="index"
                                 width="50"></el-table-column>
                <!--货主名称-->
                <el-table-column width="120" :label="$t('shipperThead.shipperName')" prop="shipperName" align="center"
                                 isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <!--货主编码-->
                <el-table-column width="120" :label="$t('shipperThead.shipperCode')" prop="shipperCode" align="center"
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
                                 show-overflow-tooltip></el-table-column>
                <!--货主类型-->
                <el-table-column :label="$t('shipperThead.shipperType')" prop="shipperType" align="center"
                                 isEditing="true"
                                 :formatter="formatterShipperType" show-overflow-tooltip></el-table-column>
                <!--服务类型-->
                <!--<el-table-column width="130" :label="$t('shipperThead.services')" prop="services" align="center" isEditing="true"-->
                <!--:formatter="formatterServiceType" show-overflow-tooltip></el-table-column>-->
                <!--业务类型-->
                <!--<el-table-column :label="$t('shipperThead.businessType')" prop="businessType" align="center" isEditing="true"-->
                <!--:formatter="businessServiceType" show-overflow-tooltip></el-table-column>-->
                <!--上线时间-->
                <el-table-column width="140" :label="$t('shipperThead.operatingPeriod')" prop="operatingPeriod"
                                 align="center" isEditing="true"
                                 :formatter="formatterOnline" show-overflow-tooltip></el-table-column>
                <!--<el-table-column label="国家名称" prop="countryName" align="center" isEditing="true" show-overflow-tooltip></el-table-column>-->
                <!--<el-table-column label="省名称" prop="provinceName" align="center" isEditing="true" show-overflow-tooltip></el-table-column>-->
                <!--<el-table-column label="市名称" prop="cityName" align="center" isEditing="true" show-overflow-tooltip></el-table-column>-->
                <!--<el-table-column label="区县名称" prop="districtName" align="center" isEditing="true" show-overflow-tooltip></el-table-column>-->
                <!--<el-table-column label="街道名称" prop="streetName" align="center" isEditing="true" show-overflow-tooltip></el-table-column>-->
                <!--地址-->
                <el-table-column width="140" :label="$t('commonThead.address')" prop="address" align="center"
                                 isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <!--邮编-->
                <el-table-column :label="$t('commonThead.postcode')" prop="postcode" align="center" isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <!--联系人-->
                <el-table-column width="100" :label="$t('commonThead.contactPerson')" prop="contactPerson"
                                 align="center" isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <!--联系电话-->
                <el-table-column width="100" :label="$t('commonThead.telephone')" prop="telephone" align="center"
                                 isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <!--启禁用状态-->
                <el-table-column width="100" :label="$t('commonThead.disableStatus')" prop="status" align="center"
                                 isEditing="true"
                                 :formatter="formatStatus" show-overflow-tooltip></el-table-column>
                <!-- <el-table-column :label="创建人" prop="creater" align="center" isEditing="true"></el-table-column>
        <el-table-column :label="创建时间" prop="createTime" align="center" isEditing="true" :formatter="formatter" show-overflow-tooltip></el-table-column> -->
                <!--修改人-->
                <el-table-column :label="$t('commonThead.updater')" prop="updater" width="100" align="center"
                                 isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <!--修改时间-->
                <!--<el-table-column :label="$t('commonThead.updateTime')" prop="updateTime" width="140" align="center"
                                 isEditing="true"
                                 :formatter="formatterUpdate" show-overflow-tooltip></el-table-column>-->
                <!--v-if="permissions('base_shipper_update')"-->
                <!--c操作-->
                <el-table-column fixed="right" :label="$t('commonThead.operation')" align="center" width="70">
                    <template slot-scope="scope">
                        <el-tooltip content="修改" placement="top" effect="light"
                                    v-if="permissions('base_shipper_update')">
                            <div @click="handleEdit(scope.row)" class="operation_icon icon1"></div>
                        </el-tooltip>
                        <!--<div @click="handleStart(scope.row)" v-if="scope.row.status === 'INEFFECTIVENESS'">-->
                        <!--<el-tooltip content="启用" placement="top" effect="light" v-if="permissions('base_shipper_enable')">-->
                        <!--<div class="operation_icon icon2"></div>-->
                        <!--</el-tooltip>-->
                        <!--</div>-->
                        <!--<div @click="handleForbidden(scope.row)" v-if="scope.row.status === 'AVAILABILITY'">-->
                        <!--<el-tooltip content="禁用" placement="top" effect="light" v-if="permissions('base_shipper_disable')">-->
                        <!--<div class="operation_icon icon3"></div>-->
                        <!--</el-tooltip>-->
                        <!--</div>-->
                        <!--<el-tooltip content="删除" placement="top" effect="light" v-if="permissions('base_shipper_delete')">-->
                        <!--<div @click="batchRemove(scope.row)" class="operation_icon icon4"></div>-->
                        <!--</el-tooltip>-->
                        <!-- <el-button >{{ $t('button.enable') }}</el-button>
            <el-button >{{ $t('button.disable') }}</el-button>
            <el-button >{{ $t('button.delete') }}</el-button> -->
                    </template>
                </el-table-column>

            </el-table>
            <!-- 工具条 -->
            <el-col :span="24" class="toolbar">
                <em class="el-icon-refresh fr mar_lr table-refresh"></em>
                <div class="block fr">
                    <el-pagination @size-change="sizeChange" @current-change="pageChange"
                                   :current-page="this.pager.page" :page-sizes="[5, 10, 20, 50]"
                                   :page-size="this.pager.rows" layout="total,sizes, prev, pager, next, jumper"
                                   :total="this.pager.total"></el-pagination>
                </div>
            </el-col>
        </div>

        <!-- 导入弹出层 -->
        <!-- <el-dialog title="文件上传" :visible.sync="centerDialogVisible" width="30%" center>
             <el-upload class="upload-demo" :auto-upload="false" ref="upload"
                        action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
                        :on-remove="handleRemove" :before-remove="beforeRemove"
                        multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
                 <el-button size="small" type="primary" class="active">点击上传</el-button>
                 <el-button size="small" type="primary" @click="download">下载模板</el-button>
                 <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过500kb</div>
             </el-upload>
             <div slot="footer" class="dialog-footer-but">
                 <el-button type="primary" @click="submitUpload">{{ $t('button.confirm') }}</el-button>
                 <el-button @click="centerDialogVisible = false">{{ $t('button.cancel') }}</el-button>
             </div>
         </el-dialog>-->


        <!-- 新增界面 -->
        <el-dialog :visible.sync="addFormVisible" :close-on-click-modal="false" @close="off('addForm')"
                   class="wl-new user-dialog">
            <div class="form">
                <el-tabs v-model="activeName" @tab-click="handleTabs" class="shipperMd_show">
                    <el-tab-pane label="货主信息" name="first">
                        <el-form style="height:320px;overflow-y: auto;margin-bottom: 10px;" :model="addForm"
                                 label-width="130px" :rules="addFormRules" ref="addForm" size="mini">
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="货主名称：" prop="shipperName">
                                        <el-tooltip content="最多输入100个字符" placement="right" effect="light">
                                            <el-input v-model.trim="addForm.shipperName" :maxlength='100'
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
                            <!--货主简称 接口api暂无字段-->
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="货主简称：" prop="shortName">
                                        <el-tooltip content="最多输入50个字符" placement="right" effect="light">
                                            <el-input v-model.trim="addForm.shortName" :maxlength='50'
                                                      :disabled="updateStatus"></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="货主类型：" prop="shipperType">
                                        <el-select v-model="addForm.shipperType" filterable placeholder="请选择" clearable
                                                   :disabled="updateStatus" @change="changeShipperType">
                                            <el-option
                                                    v-for="item in this.dict.shipperTypeEnum"
                                                    :key="item.code"
                                                    :label="item.des"
                                                    :value="String( item.name)">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="统一社会信用代码：" prop="socialCreditCode">
                                        <el-tooltip content="最多输入18个字符,输入内容由数字或字母组成" placement="right" effect="light"
                                                    :disabled="updateStatus">
                                            <el-input v-model="addForm.socialCreditCode" :maxlength='18'
                                                      :disabled="updateStatus"></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="SAP编码：" prop="sapCode">
                                        <el-tooltip content="最多输入50个字符" placement="right" effect="light"
                                                    :disabled="updateStatus">
                                            <el-input v-model="addForm.sapCode" :maxlength='50'
                                                      :disabled="updateStatus"></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="是否一级货主：" prop="whetherLevelOne">
                                        <el-select v-model="addForm.whetherLevelOne" placeholder="请选择"
                                                   :disabled="updateStatus" @change="whetherLevelOne">
                                            <el-option
                                                    v-for="item in this.dict.defaultEnum"
                                                    :key="item.code"
                                                    :label="item.des"
                                                    :value="String( item.name)">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12" v-if="superShipperStatus && identify">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="上级货主:" prop="superShipperCode">
                                        <el-select :disabled="visible.DisabledTo" :maxlength="50"
                                                   v-model="addForm.superShipperCode" filterable remote
                                                   reserve-keyword placeholder="请输入关键词"
                                                   :remote-method="searchShipper" clearable>
                                            <el-option v-for="item in superShipperList" :label="item.shipperName"
                                                       :value="item.shipperCode"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="邮政编码：" prop="postcode" :rules="[
                                                      {required: addForm.whetherLevelOne == 'YES', message: '请输入邮编', trigger: this.trigger},
                                                      {required: addForm.whetherLevelOne == 'YES', message: '', trigger: this.trigger, validator: this.isPostcodeTo}
                                                      ]">
                                        <el-tooltip content="最多输入6个字符" placement="right" effect="light"
                                                    :disabled="updateStatus">
                                            <el-input v-model="addForm.postcode" :maxlength='6'
                                                      :disabled="updateStatus"></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <!--业务类型 接口api暂无字段-->
                            <!--<el-col :span="12">-->
                            <!--<div class="grid-content bg-purple">-->
                            <!--<el-form-item label="业务类型：" prop="businessType">-->
                            <!--<el-select v-model="addForm.businessType" filterable placeholder="请选择" clearable :disabled="updateStatus">-->
                            <!--<el-option-->
                            <!--v-for="item in this.dict.businessTypeEnum"-->
                            <!--:key="item.code"-->
                            <!--:label="item.des"-->
                            <!--:value="String( item.name)"-->
                            <!--&gt;-->
                            <!--</el-option>-->
                            <!--</el-select>-->
                            <!--</el-form-item>-->
                            <!--</div>-->
                            <!--</el-col>-->
                            <!--经营期限 字段不清-->
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="经营期限：" prop="operatingPeriod" :rules="[
                                    {required: this.addForm.whetherLevelOne == 'YES', message: '请选择经营期限', trigger: this.trigger}
                                    ]">
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
                                    <el-form-item label="法人：" prop="legalPerson" :rules="[
                                    {required: this.addForm.whetherLevelOne == 'YES', message: '请输入法人', trigger: this.trigger}
                                    ]">
                                        <el-tooltip content="最多输入50个字符" placement="right" effect="light"
                                                    :disabled="updateStatus">
                                            <el-input v-model="addForm.legalPerson"
                                                      :maxlength='50' :disabled="updateStatus"></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="国家名称：" prop="countryCode" :rules="[
                                    {required: this.addForm.whetherLevelOne == 'YES', message: '请选择国家名称', trigger: 'change'}
                                    ]">
                                        <el-select v-model="addForm.countryCode"
                                                   @change="addressChange('addressed', addForm.countryCode)"
                                                   filterable placeholder="请选择" clearable :disabled="updateStatus">
                                            <el-option
                                                    v-for="item in address"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item.code">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="省名称：" prop="provinceCode" :rules="[
                                    {required: this.addForm.whetherLevelOne == 'YES', message: '请选择省名称', trigger: 'change'}
                                    ]">
                                        <el-select v-model="addForm.provinceCode"
                                                   @change="addressChange('city', addForm.provinceCode)" filterable
                                                   placeholder="请选择" clearable :disabled="updateStatus">
                                            <el-option v-for="item in addressed"
                                                       :key="item.id"
                                                       :label="item.name"
                                                       :value="item.code">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </el-col>

                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="市名称：" prop="cityCode" :rules="[
                                    {required: this.addForm.whetherLevelOne == 'YES', message: '请选择市名称', trigger: 'change'}
                                    ]">
                                        <el-select v-model="addForm.cityCode"
                                                   @change="addressChange('county',addForm.cityCode)" filterable
                                                   placeholder="请选择" clearable :disabled="updateStatus">
                                            <el-option v-for="item in city"
                                                       :key="item.id"
                                                       :label="item.name"
                                                       :value="item.code">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="区县名称：" prop="districtCode" :rules="[
                                    {required: this.addForm.whetherLevelOne == 'YES', message: '请选择区县名称', trigger: 'change'}
                                    ]">
                                        <el-select v-model="addForm.districtCode"
                                                   @change="addressChange('street',addForm.districtCode)" filterable
                                                   placeholder="请选择" clearable :disabled="updateStatus">
                                            <el-option v-for="item in county"
                                                       :key="item.id"
                                                       :label="item.name"
                                                       :value="item.code">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </el-col>

                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="街道名称：" prop="streetCode" :rules="[
                                    {required: this.addForm.whetherLevelOne == 'YES', message: '请选择街道名称', trigger: 'change'}
                                    ]">
                                        <el-select v-model="addForm.streetCode" filterable placeholder="请选择" clearable
                                                   :disabled="updateStatus">
                                            <el-option v-for="item in street"
                                                       :key="item.id"
                                                       :label="item.name"
                                                       :value="item.code">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="详细地址：" prop="address" :rules="[
                                    {required: this.addForm.whetherLevelOne == 'YES', message: '请选择详细地址', trigger: 'blur'}
                                    ]">
                                        <el-tooltip content="最多输入200个字符" placement="right" effect="light"
                                                    :disabled="updateStatus">
                                            <el-input v-model="addForm.address" :maxlength='200'
                                                      :disabled="updateStatus"></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <!--经营范围 接口api暂无字段-->
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="经营范围：" prop="businessScope">
                                        <el-tooltip content="最多输入500个字符" placement="right" effect="light"
                                                    :disabled="updateStatus">
                                            <el-input v-model="addForm.businessScope" :maxlength='500'
                                                      :disabled="updateStatus"></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="银行账号：" prop="bankAccount" :rules="[
                                    {required: this.addForm.whetherLevelOne == 'YES', message: '请输入银行账号', trigger: this.trigger}
                                    ]">
                                        <el-tooltip content="最多输入25个字符" placement="right" effect="light"
                                                    :disabled="updateStatus">
                                            <el-input v-model="addForm.bankAccount" :maxlength='25'
                                                      :disabled="updateStatus"></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="联系人：" prop="contactPerson" :rules="[
                                    {required: this.addForm.whetherLevelOne == 'YES', message: '请选择联系人', trigger: 'blur'}
                                    ]">
                                        <el-tooltip content="最多输入50个字符" placement="right" effect="light"
                                                    :disabled="updateStatus">
                                            <el-input v-model="addForm.contactPerson" :maxlength='50'
                                                      :disabled="updateStatus"></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="联系电话：" prop="telephone" :rules="[
                                    {required: this.addForm.whetherLevelOne == 'YES', message: '请选择联系电话', trigger: 'blur'}
                                    ]">
                                        <el-tooltip content="最多输入13个字符" placement="right" effect="light"
                                                    :disabled="updateStatus">
                                            <el-input v-model="addForm.telephone" :maxlength='13'
                                                      :disabled="updateStatus"></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="联系邮箱：" prop="email">
                                        <el-tooltip content="最多输入50个字符" placement="right" effect="light"
                                                    :disabled="updateStatus">
                                            <el-input v-model="addForm.email" :maxlength='50'
                                                      :disabled="updateStatus"></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple" v-show="visible.imgView">
                                    <el-form-item label="证明材料:" prop="evidence">
                                        <el-upload
                                                class="upload-demo"
                                                :class="{'upload-pic': updateStatus}"
                                                :action="importFileUrl"
                                                :headers="upLoadData"
                                                :on-preview="handlePreview"
                                                :on-remove="handleRemove"
                                                :onSuccess="uploadSuccess"
                                                :file-list="fileList2"
                                                :onProgress="uploadProgress"
                                                :before-upload="beforeUpload"
                                                :limit="3"
                                                name="files"
                                                :list-type="pictureFlag" :disabled="updateStatus">
                                            <el-button size="small" type="primary" v-show="!updateStatus">点击上传
                                            </el-button>
                                            <!--<i class="el-icon-plus" :disabled="updateStatus"></i>-->
                                            <div slot="tip" v-show="!updateStatus" class="el-upload__tip">
                                                只能上传jpg/jpeg/png图片，且不超过5MB
                                            </div>
                                        </el-upload>
                                    </el-form-item>
                                </div>
                            </el-col>
                        </el-form>
                        <el-row class="btn" style="clear: both;">
                            <el-col :span="24">
                                <el-button @click.native="off('addForm')">{{ $t('button.cancel') }}</el-button>
                                <el-button @click.native="addSubmit('addForm')" :loading="addLoading"
                                           :disabled="updateStatus">{{ $t('button.save') }}
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="仓储中心" name="second" :disabled="whetherLevelOneTo">
                        <div class="list">
                            <el-table height="241" :data="gteUserList" v-loading="loading" :fit="true"
                                      align="center" @selection-change="selChange" @row-dblclick="TheEditor" border>
                                <el-table-column :selectable="selectAbleFun" label="" type="selection"
                                                 align="center"></el-table-column>
                                <el-table-column label="仓储中心名称" width="120" prop="storageCenterName" align="center"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column label="仓储中心编码" width="120" prop="storageCenterCode" align="center"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column label="上级货主编码" v-if="addForm.whetherLevelOne === 'NO'" width="120"
                                                 prop="superShipperCode" align="center"
                                                 show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <el-input size="mini" :maxlength="140" v-if="scope.row.isEditing"
                                                  v-model="scope.row.superShipperCode"></el-input>
                                        <div slot="reference" v-if="!scope.row.isEditing">
                                            {{ scope.row.superShipperCode }}
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="服务地址URL" width="160" prop="serviceUrl" align="center"
                                                 show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <el-input size="mini" :maxlength="200" v-if="scope.row.isEditing"
                                                  v-model="scope.row.serviceUrl"></el-input>
                                        <div slot="reference" v-if="!scope.row.isEditing">
                                            {{ scope.row.serviceUrl }}
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="上线时间" prop="timeOnline" align="center"
                                                 show-overflow-tooltip width="240">
                                    <template slot-scope="scope">
                                        <el-date-picker
                                                size="mini"
                                                :maxlength="240"
                                                v-if="scope.row.isEditing"
                                                :editable='false'
                                                v-model="scope.row.timeOnline"
                                                type="date"
                                                placeholder="选择日期时间">
                                        </el-date-picker>
                                        <div slot="reference" v-if="!scope.row.isEditing">
                                            {{ bindingTime(scope.row) }}
                                        </div>
                                    </template>
                                </el-table-column>
                                <!--<el-table-column label="服务类型" prop="serviceType" align="center"-->
                                <!--show-overflow-tooltip width="140">-->
                                <!--<template slot-scope="scope">-->
                                <!--<el-select size="mini" v-if="scope.row.isEditing" :maxlength="140" v-model="scope.row.serviceType" clearable-->
                                <!--placeholder="请选择" class="select">-->
                                <!--<el-option v-for="item in dict.servicesEnum" :key="item.name" :label="item.des"-->
                                <!--:value="item.name"></el-option>-->
                                <!--</el-select>-->
                                <!--<div v-if="!scope.row.isEditing">-->
                                <!--{{serviceType(scope.row)}}-->
                                <!--</div>-->
                                <!--</template>-->
                                <!--</el-table-column>-->
                                <el-table-column label="服务类型" width="140" prop="serviceType" align="center"
                                                 show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <el-select size="mini" v-if="scope.row.isEditing" :maxlength="140"
                                                   v-model="scope.row.serviceType" clearable
                                                   placeholder="请选择" class="select">
                                            <el-option v-for="item in dict.servicesEnum" :key="item.name"
                                                       :label="item.des"
                                                       :value="item.name"></el-option>
                                        </el-select>
                                        <div v-if="!scope.row.isEditing">
                                            {{whetherServiceType(scope.row)}}
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="是否为生产企业" width="140" prop="whetherProductCompany" align="center"
                                                 show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <el-select size="mini" v-if="scope.row.isEditing" :maxlength="140"
                                                   v-model="scope.row.whetherProductCompany" clearable
                                                   placeholder="请选择" class="select">
                                            <el-option v-for="item in dict.defaultEnum" :key="item.name"
                                                       :label="item.des"
                                                       :value="item.name"></el-option>
                                        </el-select>
                                        <div v-if="!scope.row.isEditing">
                                            {{whetherProductCompany(scope.row)}}
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="是否打印出库单" width="140" prop="whetherPrintOutbound" align="center"
                                                 show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <el-select size="mini" v-if="scope.row.isEditing" :maxlength="140"
                                                   v-model="scope.row.whetherPrintOutbound" clearable
                                                   placeholder="请选择" class="select">
                                            <el-option v-for="item in dict.defaultEnum" :key="item.name"
                                                       :label="item.des"
                                                       :value="item.name"></el-option>
                                        </el-select>
                                        <div v-if="!scope.row.isEditing">
                                            {{whetherPrintOutbound(scope.row)}}
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="质押方式" width="140" prop="pledgeMethod" align="center"
                                                 show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <el-select size="mini" v-if="scope.row.isEditing" :maxlength="140"
                                                   v-model="scope.row.pledgeMethod" clearable
                                                   placeholder="请选择" class="select">
                                            <el-option v-for="item in dict.pledgeEnum" :key="item.name"
                                                       :label="item.des"
                                                       :value="item.name"></el-option>
                                        </el-select>
                                        <div v-if="!scope.row.isEditing">
                                            {{pledgeMethod(scope.row)}}
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="质押阈值" prop="pledgeThreshold" align="center"
                                                 show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <el-input size="mini" :maxlength="10"
                                                  v-if="scope.row.isEditing"
                                                  v-model="scope.row.pledgeThreshold"></el-input>
                                        <div slot="reference" v-if="!scope.row.isEditing">
                                            {{ scope.row.pledgeThreshold }}
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column fixed="right" label="操作" align="center" width="100">
                                    <template slot-scope="scope">
                                        <el-button @click="removeBind(scope.row)" class="shipper_MD_btn"
                                                   :disabled="buttonVisible" size="small">删除
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!--<div class="block">
                                <el-pagination
                                        layout="total,prev, pager, next"
                                        @current-change="MaterialPage"
                                        :current-page="this.pagerExt.page"
                                        :page-size="this.pagerExt.rows"
                                        :total="this.pagerExt.total"
                                        clearable
                                >
                                </el-pagination>
                            </div>-->
                            <el-form size="mini" label-width="140px" style="margin-top:20px;">
                                <el-row class="plantInfo" v-if="!buttonVisible">
                                    <!--<el-col :span="12">-->
                                    <!--<div class="grid-content">-->
                                    <!--<el-form-item label="仓储中心编码：" prop="inventoryCode">-->
                                    <!--<el-input placeholder="请输入仓储中心编码" v-model="storageCenterCode"></el-input>-->
                                    <!--</el-form-item>-->
                                    <!--</div>-->
                                    <!--</el-col>-->
                                    <el-col :span="12" class="paddingbtm">
                                        <div class="grid-content">
                                            <el-form-item label="仓储中心：" prop="factoryLogisticsId">
                                                <!--<el-input placeholder="请输入仓储中心名称" v-model="storageCenterName"></el-input>-->
                                                <el-col :span="12">
                                                    <el-autocomplete
                                                            class="inline-input"
                                                            v-model="state"
                                                            :fetch-suggestions="querySearch"
                                                            placeholder="根据名称模糊查询"
                                                            @select="handleSelect"
                                                            :trigger-on-focus="false"
                                                            @blur="blur"
                                                            clearable
                                                    ></el-autocomplete>
                                                </el-col>
                                            </el-form-item>
                                        </div>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-button @click="addlist">{{ $t('button.add') }}
                                        </el-button>
                                    </el-col>
                                </el-row>
                                <el-row class="btn1">
                                    <el-col :span="12">
                                        <div class="grid-content">
                                            <!--查询-->
                                            <!--<el-button @click.native="bindingPlant">{{ $t('button.query') }}</el-button>-->
                                            <!--绑定-->
                                            <!--<el-button @click.native="TheBinding" v-if="identify">绑定</el-button>-->
                                            <el-button @click.native="TheBinding" :disabled="buttonVisible">绑定
                                            </el-button>
                                            <!--取消-->
                                            <el-button @click.native="off('addForm')">{{ $t('button.cancel') }}
                                            </el-button>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-form>

                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-dialog>
        <!--预览大图-->
        <el-dialog :visible.sync="visible.previewPhoto">
            <img width="100%" :src="previewPhotoUrls" alt="">
        </el-dialog>
        <!--导入-->
        <el-dialog title="导入货主信息" :close-on-click-modal="false" :visible.sync="centerDialogVisible" width="30%" center
                   @close='closeCenterDialogVisible()'>
            <el-upload class="upload-demo" :auto-upload="false" ref="upload"
                       :action="UploadUrl()" name="filename" :headers="upLoadData"
                       multiple :limit="1" :on-change="uploadChange" :on-success="handleSuccess" :file-list="excelList">
                <el-button size="small" type="primary" class="active">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传xlsx文件,且不能超过2.5M</div>
            </el-upload>
            <div slot="footer" class="dialog-footer-but">
                <el-button type="primary" @click="exportModeTemplate">下载模板</el-button>
                <el-button @click="cancleUpload">取消</el-button>
                <el-button type="primary" @click="submitUpload">确定</el-button>
            </div>
        </el-dialog>

        <el-dialog :visible.sync="importProgressVisible" :modal-append-to-body="false"
                   @close="closeImportProgressDialog"
                   class="wl-new user-dialog">
            <div>
                <el-progress
                        v-for="(domain, index) in importProgressList"
                        :percentage="domain.progress"
                        :status="domain.status"
                        :text-inside="true" :stroke-width="20"
                >
                </el-progress>
                <el-button type="primary" v-if="errorLogButtonVisible" @click.native="downloadErrorLog()">错误日志
                </el-button>
            </div>
        </el-dialog>

        <!--导出进度条-->
        <el-dialog :visible.sync="this.exportProgressVisible" :modal-append-to-body="false"
                   @close='closeExportProgressDialog()'
                   class="wl-new user-dialog">
            <div>
                <el-progress
                        v-for="(domain, index) in progressList"
                        :percentage="domain.progress"
                        :status="domain.status"
                        :text-inside="true" :stroke-width="20"
                >
                </el-progress>
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
                // 初始化页面参数
                init: 1,
                // 关键字查询超时
                timeout: null,
                // 导入
                excelList: [],
                importProgressList: [], // 导入进度条
                centerDialogVisible: false,
                errorDialogVisible: false,
                importProgressVisible: false,
                errorLogButtonVisible: false,
                // 导出
                exportBtnDisabled: true,
                progressList: [], // 导出进度条
                exportProgressVisible: false,
                exprotProgressIds: [],
                parentList: [],
                MaterialList: [],
                disabledTo: false,
                disabledBindFactory: true,
                disabledBindSold: true,
                disabledBindDelivery: true,
                disabledBindMaterial: true,
                formInline: {
                    shipperCode: '',
                    shipperName: '',
                    shipperType: '',
                    contactPerson: '',
                    telephone: '',
                    services: '',
                    status: ''
                },
                users: [],
                address: [],
                addressed: [],
                city: [],
                county: [],
                street: [],
                pager: {
                    page: 1,
                    rows: 20,
                    total: 0,
                    order: 'desc',
                    sort: 'id'
                },
                pagerExt: {
                    page: 1,
                    rows: 10,
                    total: 0,
                    order: 'desc',
                    sort: 'id'
                },
                type: '',
                listLoading: false,
                disabled: false,
                sels: [], // 列表选中列
                dict: '',
                editFormVisible: false, // 编辑界面是否显示
                editLoading: false,
                buttonVisible: false,
                trigger: 'blur',
                addFormVisible: false, // 新增界面是否显示
                addLoading: false,
                // 上级货主展示标识
                superShipperStatus: true,
                // 新增必填字段
                addFormRules: {
                    shipperName: [
                        {required: true, message: '请输入货主名称', trigger: this.trigger},
                        {required: true, message: '', trigger: this.trigger, validator: this.validName}
                    ],
                    shipperCode: [
                        {required: true, message: '请输入货主编码', trigger: this.trigger},
                        {required: true, message: '', trigger: this.trigger, validator: this.stripscriptTo}
                    ],
                    sapCode: [
                        {
                            required: false,
                            message: '只可输入英文，数字及 ._-@()',
                            trigger: this.trigger,
                            validator: this.stripscriptTo
                        }
                    ],
                    shortName: [
                        {required: true, message: '请输入货主简称', trigger: this.trigger},
                        {required: true, message: '', trigger: this.trigger, validator: this.validName}
                    ],
                    address: [
                        {required: true, message: '请输入地址信息', trigger: this.trigger},
                        {required: true, message: '', trigger: this.trigger, validator: this.stripscriptTo}
                    ],
                    contactPerson: [
                        {required: true, message: '请输入联系人', trigger: this.trigger}
                        // { required: true, message: '', trigger: this.trigger, validator: this.isPostalCodeTo }
                    ],
                    telephone: [
                        {required: true, message: '请输入联系方式', trigger: this.trigger},
                        {required: true, message: '', trigger: this.trigger, validator: this.validPhone}
                    ],
                    socialCreditCode: [
                        {required: true, message: '请输入统一社会信用代码', trigger: this.trigger},
                        {required: true, message: '', trigger: this.trigger, validator: this.validationNumberLetter}
                    ],
                    services: [{required: true, message: '请选择服务', trigger: 'change'}],
                    shipperType: [{required: true, message: '请选择货主类型', trigger: 'change'}],
                    // businessType: [{required: true, message: '请选择业务类型', trigger: 'change'}],
                    whetherLevelOne: [{required: true, message: '请选是否一级货主', trigger: 'change'}],
                    superShipperCode: [{required: true, message: '请选择上级货主', trigger: 'change'}]
                    // servicesUrl: [{required: false, message: '您输入的url不匹配', trigger: this.trigger, validator: this.IsURL}]
                },
                // 新增界面数据
                addForm: {
                    shipperName: '',
                    shipperCode: '',
                    shortName: '',
                    onlineTime: '',
                    streetName: '',
                    address: '',
                    postcode: '',
                    contactPerson: '',
                    telephone: '',
                    services: '',
                    parentId: '',
                    shipperType: '',
                    // businessType: '' // 0集团内 1集团外

                    // 工厂
                    evidencePath1: '',
                    evidencePath2: '',
                    evidencePath3: '',
                    evidence: [],
                    contacts: '',
                    contacts2: '',
                    contacts3: '',
                    superShipperCode: ''
                },
                visible: {
                    listLoading: false,
                    shipperListLoading: false,
                    groupListLoading: false,
                    searchShipper: false,
                    searchFactoryDc: false,
                    activeName: 'first',
                    editForm: false,
                    closeForm: false,
                    onlyRead: false,
                    selDisable: false,
                    onlyReadT: false,
                    selDisableT: false,
                    isView: false,
                    previewPhoto: false,
                    imgView: true
                },
                fileList: [
                    {
                        name: 'oms数据库',
                        url:
                            'https://zhx198600.github.io/myvue/oms%E6%95%B0%E6%8D%AE%E5%BA%93'
                    }
                ],
                contacts: [],
                fileList2: [],
                // 查询框折叠展开
                showSearch: true,
                // 工厂 售达方 送达方 与 货主关系
                shipperId: '', // 用户id;
                inventoryCode: '', // 库存地编码
                factoryLogisticsId: [], // 工厂id,
                gteUserList: [],
                searchList: [],
                state: '',
                UserPager: {
                    // 工厂
                    page: 1,
                    rows: 15,
                    total: 0
                },
                SoldPager: {
                    // 售达方
                    page: 1,
                    rows: 15,
                    total: 0
                },
                SoldPagerTo: {
                    // 售达方 查询
                    page: 1,
                    rows: 15,
                    total: 0
                },
                DeliveryPager: {
                    // 售达方 查询
                    page: 1,
                    rows: 15,
                    total: 0
                },
                DeliveryPagerTo: {
                    // 售达方 查询
                    page: 1,
                    rows: 15,
                    total: 0
                },
                MaterialPager: {
                    // 售达方 查询
                    page: 1,
                    rows: 15,
                    total: 0
                },
                MaterialPagerTo: {
                    // 售达方 查询
                    page: 1,
                    rows: 15,
                    total: 0
                },
                // 售达方
                SoldList: [],
                SoldDimList: [],
                SoldDimText: '',
                selsSoldId: '',
                activeName: 'first',
                loading: false,
                loading1: false,
                loading2: false,
                loading3: false,
                business: false,
                //    上传
                importFileUrl: config.base_service_ip + '/azure/upload',
                upLoadData: {
                    access_token: cookieOperation.cookie.get('access_token')
                    // access_token:'bcb4b923d85445cd804d8871ca75b609'
                },
                updateStatus: false,
                // 在原有基础上增加
                storageCenterName: '',
                storageCenterCode: '',
                // isEditing: true, // 是否为可编辑状态 true：可编辑 ， false：不可编辑
                //  标识是新增还是修改
                identify: true, // true为新增，false为修改
                // 勾选需要绑定的列
                multipleSelection: [],
                shipperCode: '',
                gteUserListPush: [],
                whetherLevelOneTo: false,
                lookFormVisible: false,
                haveShipperExt: false,
                previewPhotoTitle: '',
                previewPhotoUrls: [],
                superShipperList: [] // 一级货主
            };
        },
        methods: {
            // 导入
            // 导入按钮
            importExcel() {
                let _this = this;
                _this.centerDialogVisible = true;
                this.excelList = [];
            },
            // 导入弹出层
            exportModeTemplate() {
                // let url = config.download_path + '/template/MD_DELIVERY.xlsx';
                let url = 'https://loms.wilmar.cn/temp/shipper.xlsx';
                util.publicpost('/azure/urlSetKey', {url: url}, function (res) {
                    if (res.success) {
                        window.open(res.data);
                    }
                }, config.base_service_ip);
            },
            downloadErrorLog() {
                let _this = this;
                let url = config.azure_download_path + _this.errorDocPath;
                _this.importProgressVisible = false;
                _this.errorLogButtonVisible = false;
                window.location.href = url;
                // window.open(this.errorLogPath);
                /*let _this = this;
                let url = _this.errorDocPath;
                _this.importProgressVisible = false;
                _this.errorLogButtonVisible = false;
                //window.open(url);
                var form = document.createElement('form');
                form.action = url;
                form.target = '_blank';
                form.method = 'GET';
                document.body.appendChild(form);
                form.submit();*/
            },
            closeErrorLog() {
                let _this = this;
                _this.errorDialogVisible = false;
            },
            UploadUrl: function () {
                return config.base_service_ip + '/shipper/importExcel';
            },
            uploadChange(file, fileList) {
                let _this = this;
                var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1);
                const extension2 = testmsg === 'xlsx';
                const isLt2M = file.size / 1024 / 1024 < 2.5;
                if (!extension2) {
                    this.$message({
                        message: '上传文件只能是.xlsx格式!',
                        type: 'warning'
                    });
                    _this.$refs.upload.clearFiles();
                    return;
                }
                if (!isLt2M) {
                    this.$message({
                        message: '上传文件大小不能超过2.5MB!',
                        type: 'warning'
                    });
                    _this.$refs.upload.clearFiles();
                }
            },
            handleSuccess(response, file, fileList) {
                let _this = this;
                let intervalid1;
                _this.$refs.upload.clearFiles();
                console.log(response);
                if (response.success) {
                    let progressId = response.data;
                    _this.importProgressVisible = true;
                    intervalid1 = setInterval(() => {
                        this.openImportProgress(progressId, intervalid1);
                    }, 2000);
                } else {
                    this.errorMsg(response.msg);
                }
                // if (response.data == null || response.data == '') {
                //   return;
                // }
            },
            openImportProgress: function (progressId, intervalid1) {
                let _this = this;
                util.publicpost('/shipper/progress', {id: progressId}, function (res) {
                    if (!res.success) {
                        clearInterval(intervalid1);
                        _this.disabledTo = false;
                        _this.$message({
                            showClose: true,
                            message: '查询导入进度失败',
                            type: 'error'
                        });
                        _this.importProgressVisible = false;
                        return;
                    }
                    res.data.forEach(function (item) {
                        if (item.status == '-1') { // 导入失败，将进度条的状态也随之置为失败
                            item.status = '-1';
                        }
                        if (item.status == '1') { // 导入成功，将进度条的状态也随之置为成功
                            item.status = '1';

                        }
                        item.progress = parseInt(item.progress);
                        if (_this.importProgressList == null || _this.importProgressList.length === 0) {
                            _this.importProgressList = res.data;
                        }
                        _this.importProgressList.forEach(function (pro) {
                            pro.progress = item.progress;
                            pro.status = item.status;
                            if (pro.status == '-1') {
                                clearInterval(intervalid1);
                                _this.disabledTo = false;
                                _this.$message({
                                    showClose: true,
                                    message: '导入失败',
                                    type: 'error'
                                });
                                if (item.errorDocPath != null && item.errorDocPath !== '') {
                                    _this.errorDocPath = item.errorDocPath
                                    _this.errorLogButtonVisible = true;
                                    //_this.getShipperTo();
                                    return;
                                }
                                _this.importProgressVisible = false;
                                return;
                            }
                            if (pro.status == '1') {
                                clearInterval(intervalid1);
                                _this.disabledTo = false;
                                _this.$message({
                                    showClose: true,
                                    message: '导入成功',
                                    type: 'info'
                                });
                                if (item.errorDocPath != null && item.errorDocPath !== '') {
                                    _this.errorDocPath = item.errorDocPath
                                    _this.errorLogButtonVisible = true;
                                    //_this.getShipperTo();
                                    return;
                                }
                                _this.importProgressVisible = false;
                                pro.progress = 0;
                                //导入成功加载列表
                                //_this.getShipperTo();
                            }
                        });
                    });
                });
            },
            closeImportProgressDialog() {
                let _this = this;
                _this.importProgressVisible = false;
                _this.errorLogButtonVisible = false;
            },
            cancleUpload() {
                let _this = this;
                _this.centerDialogVisible = false;
            },
            closeCenterDialogVisible() {
                let _this = this;
                _this.centerDialogVisible = false;
            },
            submitUpload() {
                if (this.$refs.upload.uploadFiles == null || this.$refs.upload.uploadFiles.length == 0) {
                    this.$message({
                        showClose: true,
                        message: '请选择导入文件',
                        type: 'error'
                    });
                    return;
                }
                this.disabledTo = true;
                console.log(this.$refs.upload);
                this.$refs.upload.submit();
                // let formData = new window.FormData();
                // formData.append('filename', this.$refs.upload.uploadFiles);
                // axios.post(config.base_service_ip + '/delivery/importExcel', formData, {
                //   headers: {
                //     'Content-Type': 'multipart/form-data'
                //   }}).then(res => {
                //     console.log(res.data.msg);
                // })
                this.centerDialogVisible = false;
            },

            //导出
            exportExcel() {
                let _this = this;
                let intervalid2;
                util.publicpost('/shipper/export', {
                        shipperCode: _this.formInline.shipperCode,
                        shipperName: _this.formInline.shipperName,
                        shipperType: _this.formInline.shipperType,
                    }, function (res) {
                        if (res.success === true) {
                            _this.exprotProgressIds.push(res.data);
                            _this.exportProgressVisible = true;
                        } else {
                            _this.errorMsg(_this.$t(res.msg));
                        }
                        intervalid2 = setInterval(() => {
                            _this.openExportProgress(intervalid2);
                        }, 1000);
                    }
                );
            },
            openExportProgress: function (intervalid2) {
                let _this = this;
                let existFlag = false;// 进度是否已经存在标识
                let tempProgressList = [];// 临时存放进度数组
                // 情况一:没有任何进度时
                if (_this.exprotProgressIds == null || _this.exprotProgressIds.length === 0) {
                    _this.progressList = [];
                    _this.exportProgressVisible = false;
                    clearInterval(intervalid2);
                    return;
                }
                // 以下为有进度时
                util.publicpost('/shipper/progress', {id: _this.exprotProgressIds[0]}, function (res) {
                    if (!res.success) {
                        return;
                    }
                    tempProgressList = res.data;
                    if (tempProgressList.length === 0) {
                        return;
                    }
                    _this.exprotProgressIds = [];
                    // 页面第一次使用导出时，控制进度条进度集合没有数据情况
                    if (_this.progressList.length === 0) {
                        tempProgressList.forEach(function (item) {
                            if (item.status == '-1') { // 导出失败，将进度条的状态也随之置为失败
                                _this.$message({
                                    showClose: true,
                                    message: '导出失败',
                                    type: 'error'
                                });
                                item.status = '-1';
                                return;
                            }
                            if (item.status == '1') { // 导出成功，将进度条的状态也随之置为成功，且从FTP目录下载文件
                                item.status = '1';
                                let url = config.azure_download_path + item.exportDocPath;
                                window.location.href = url;
                            }
                            if (item.status == '0') { // 导出进度还在进行中时，将该进度列为下次继续刷新进度的数组中。
                                _this.exprotProgressIds.push(item.id);
                            }
                            item.progress = item.progress;
                        });
                        _this.progressList = tempProgressList;
                    } else {
                        _this.progressList.forEach(function (pro) {
                            if (pro.status == '1') {
                                _this.progressList.splice(pro);// 如果进度为已成功，将它剔除，下一次就不会显示
                            }
                        });
                        tempProgressList.forEach(function (item) {
                            if (item.status == '-1') {
                                item.status = '-1';
                            }
                            if (item.status == '1') {
                                item.status = '1';
                                let url = config.azure_download_path + item.exportDocPath;
                                window.location.href = url;
                            }
                            if (item.status == '0') {
                                _this.exprotProgressIds.push(item.id);
                            }
                            item.progress = parseInt(item.progress);
                            _this.progressList.forEach(function (pro) {
                                if (item.id === pro.id) {
                                    pro.progress = item.progress;
                                    pro.status = item.status;
                                    existFlag = true;// 进度已经存在
                                }
                            });
                            if (!existFlag) { // 进度不存在,则追加到进度列表中
                                _this.progressList.push(item);
                            }
                            existFlag = true;
                        });
                    }
                });
            },
            closeExportProgressDialog() {
                this.exportProgressVisible = false;
            },
            // 验证手机号
            validPhone(rule, value, callback) {
                util.isvalidPhone(rule, value, callback);
            },
            // 验证邮编
            isPostcodeTo(rule, value, callback) {
                util.isPostalCode(rule, value, callback);
            },
            // 验证是否有特殊字符
            stripscriptTo(rule, value, callback) {
                util.validSpecialCode(rule, value, callback);
            },
            validCode(rule, value, callback) {
                util.validCode(rule, value, callback);
            },
            // 验证只能输入中文，英文，数字及 ._-@()
            validName(rule, value, callback) {
                util.stripscriptName(rule, value, callback);
            },
            // 验证邮箱
            validEmail(rule, value, callback) {
                util.isEmail(rule, value, callback);
            },
            // 验证数字-字母-数字字母组合
            validationNumberLetter(rule, value, callback) {
                util.numberLetter(rule, value, callback);
            },
            // 页码改变的时候
            pageChange(currentPage) {
                this.pager.page = currentPage;
                this.getShipper();
            },
            // 每页数量大小改变的时候
            sizeChange(currentRows) {
                this.pager.rows = currentRows;
                this.getShipper();
            },
            // 类型转换
            serviceType(row, column) {
                let serviceType = row.serviceType;
                if (serviceType) {
                    let json = this.dict.servicesEnum;
                    return util.formatDict(json, serviceType);
                }
            },
            whetherProductCompany(row, column) {
                let whetherProductCompany = row.whetherProductCompany;
                if (whetherProductCompany) {
                    let json = this.dict.defaultEnum;
                    return util.formatDict(json, whetherProductCompany);
                }
            },
            whetherServiceType(row, column) {
                let serviceType = row.serviceType;
                if (serviceType) {
                    let json = this.dict.servicesEnum;
                    return util.formatDict(json, serviceType);
                }
            },
            whetherPrintOutbound(row, column) {
                let whetherPrintOutbound = row.whetherPrintOutbound;
                if (whetherPrintOutbound) {
                    let json = this.dict.defaultEnum;
                    return util.formatDict(json, whetherPrintOutbound);
                }
            },
            pledgeMethod(row, column) {
                let pledgeMethod = row.pledgeMethod;
                if (pledgeMethod) {
                    let json = this.dict.pledgeEnum;
                    return util.formatDict(json, pledgeMethod);
                }
            },
            //
            sortChange: function (prop) {
                this.pager.order = util.dtopx(prop.order);
                this.pager.sort = util.dtotoLower(prop.prop);
                this.getShipper();
            },
            whetherLevelOne(val) {
                if (val !== 'YES') {
                    this.whetherLevelOneTo = true;
                    this.superShipperStatus = true;
                } else {
                    this.whetherLevelOneTo = false;
                    this.superShipperStatus = false;
                }
                if (this.$refs['addForm'] !== undefined) {
                    this.$refs['addForm'].clearValidate();
                }
            },
            // 获取选中的数据
            selChange(val) {
                console.log(val);
                this.multipleSelection = val;
            },
            selectAbleFun() {
                return this.buttonVisible ? false : true;
            },
            // 重置
            resetForm() {
                this.formInline.shipperCode = '';
                this.formInline.shipperName = '';
                this.formInline.shipperType = '';
                this.formInline.contactPerson = '';
                this.formInline.services = '';
                this.formInline.telephone = '';
                this.formInline.status = '';
                // this.getShipper();
            },
            // 点击右上角关闭按钮 清空货主ID
            closeDialog(formRule) {
                let that = this;
                that.activeName = 'first';
                that.shipperId = '';
                that.UserPager.total = 0;
                that.SoldPager.total = 0;
                that.SoldPagerTo.total = 0;
                that.DeliveryPager.total = 0;
                that.DeliveryPagerTo.total = 0;
                that.disabledTo = false;
                that.parentList = [];
                if (formRule) {
                    this.$refs[formRule].clearValidate();
                }
            },
            off: function (formRule) {
                if ((!this.lookFormVisible && !this.haveShipperExt) && this.addForm.whetherLevelOne !== 'NO') {
                    /*this.$alert('<p style="color:#f56c6c;text-align: center">信息未保存！</p>', '提示', {dangerouslyUseHTMLString: true});
                    this.addFormVisible = true;
                    return;*/
                    this.$confirm('信息未保存,确定要关闭吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.addFormVisible = false;
                        this.editFormVisible = false;
                        this.lookFormVisible = true;
                        this.haveShipperExt = true;
                        this.addForm.whetherLevelOne = 'NO';
                        this.shipperId = '';
                        this.activeName = 'first';
                        this.UserPager.total = 0;
                        this.SoldPager.total = 0;
                        this.SoldPagerTo.total = 0;
                        this.DeliveryPager.total = 0;
                        this.DeliveryPagerTo.total = 0;
                        this.disabledTo = false;
                        this.parentList = [];
                    }).catch(() => {
                        this.addFormVisible = true;
                    });
                } else {
                    this.addFormVisible = false;
                    this.editFormVisible = false;
                    this.lookFormVisible = true;
                    this.haveShipperExt = true;
                    this.addForm.whetherLevelOne = 'NO';
                    this.shipperId = '';
                    this.activeName = 'first';
                    this.UserPager.total = 0;
                    this.SoldPager.total = 0;
                    this.SoldPagerTo.total = 0;
                    this.DeliveryPager.total = 0;
                    this.DeliveryPagerTo.total = 0;
                    this.disabledTo = false;
                    this.parentList = [];
                    if (this.$refs[formRule] !== undefined) {
                        this.$refs[formRule].resetFields();
                    }
                }
            },
            // 查看页面
            clickshipperCode(rows) {
                this.handleShow(rows);
                this.disabledTo = true;
                this.buttonVisible = true; // 隐藏按钮
                this.identify = false;
                this.whetherLevelOneTo = false;
                this.lookFormVisible = true;
                this.haveShipperExt = true;
                // this.getUserList(); // 加载
            },
            // 显示编辑界面
            handleShow: function (row) {
                console.log(row);
                let _this = this;
                let code = row.shipperCode;
                _this.isEditing = false; // 修改时为不可编辑状态
                _this.buttonVisible = false; // 展示按钮
                _this.lookFormVisible = false;
                _this.haveShipperExt = false;
                _this.updateStatus = true;
                _this.address = [];
                _this.listLoading = true;
                _this.parentList = [];
                _this.state = '';
                _this.whetherLevelOne(row.whetherLevelOne);
                if (_this.$refs['addForm'] !== undefined) {
                    _this.$refs['addForm'].resetFields();
                }
                util.publicpost('/shipper/selectShipperByShipperCode',
                    {
                        shipperCode: code
                    }, function (res) {
                        if (res.code === 0) {
                            _this.shipperId = res.data.id;
                            _this.listLoading = false;
                            _this.shipperCode = res.data.shipperCode; // 储存shipperCode
                            _this.addFormVisible = true;
                            _this.addForm = res.data;
                            _this.addForm.countryCode = res.data.countryCode;
                            _this.fileList2 = [];
                            if (res.data.contacts1 != null && res.data.contacts1 != '') {
                                // 展示图片
                                _this.visible.imgView = true;
                                var fileName = res.data.contacts1;
                                var imageFile = {name: '', url: config.azure_download_path + fileName};
                                _this.fileList2.push(imageFile);
                            } else {
                                // 隐藏图片
                                _this.visible.imgView = false;
                            }
                            if (res.data.contacts2 != null && res.data.contacts2 != '') {
                                var fileName = res.data.contacts2;
                                var imageFile = {name: '', url: config.azure_download_path + fileName};
                                _this.fileList2.push(imageFile);
                            }
                            if (res.data.contacts3 != null && res.data.contacts3 != '') {
                                var fileName = res.data.contacts3;
                                var imageFile = {name: '', url: config.azure_download_path + fileName};
                                _this.fileList2.push(imageFile);
                            }
                            let map = {
                                'id': res.data.parentId,
                                'label': res.data.parentName,
                                'value': res.data.parentId
                            };
                            _this.parentList.push(map);
                            if (res.data.businessType === 'IN') {
                                _this.business = true;
                            } else {
                                _this.business = false;
                            }
                            // 赋值给省
                            util.addressChange('addressed', _this.addForm.countryCode, _this);
                            util.addressChange('city', _this.addForm.provinceCode, _this);
                            util.addressChange('county', _this.addForm.cityCode, _this);
                            util.addressChange('street', _this.addForm.districtCode, _this);
                            util.formatAddress(_this, 'address', _this.addForm.countryCode, _this.addForm.countryName);
                            util.formatAddress(_this, 'addressed', _this.addForm.provinceCode, _this.addForm.provinceName);
                            util.formatAddress(_this, 'city', _this.addForm.cityCode, _this.addForm.cityName);
                            util.formatAddress(_this, 'county', _this.addForm.districtCode, _this.addForm.districtName);
                            util.formatAddress(_this, 'street', _this.addForm.streetCode, _this.addForm.streetName);
                            _this.addForm.countryCode = res.data.countryName;
                            _this.addForm.provinceCode = res.data.provinceName;
                            _this.addForm.cityCode = res.data.cityName;
                            _this.addForm.districtCode = res.data.districtName;
                            _this.addForm.streetCode = res.data.streetName;
                        } else {
                            _this.listLoading = false;
                            let msg = '';
                            if (!util.isEmpty(res.msg)) {
                                msg = ',' + _this.$t(res.msg);
                            }
                            _this.$message({
                                message: _this.$t('msg.error') + msg,
                                type: 'error'
                            });
                        }
                        // 清除校验
                        if (_this.$refs['addFormRules'] !== undefined) {
                            _this.$refs['addFormRules'].resetFields();
                        }
                    });
            },
            getShipperTo() {
                let that = this;
                this.pager.page = 1;
                that.getShipper();
            },
            // 绑定
            TheBinding(row) {
                let _this = this;
                let isTheBinding = true;
                if (!_this.shipperCode) {
                    _this.showMsg('请先保存货主信息');
                    return;
                }
                for (let i = 0; i < _this.multipleSelection.length; i++) {
                    _this.multipleSelection[i].shipperCode = _this.shipperCode;
                    if (_this.multipleSelection[i].pledgeThreshold && !util.numberLetterTo(_this.multipleSelection[i].pledgeThreshold)) {
                        isTheBinding = false;
                    }
                }
                console.log(isTheBinding)
                if (!isTheBinding) {
                    _this.$message.error('质押阈值必须填写数值');
                    return;
                }
                if (_this.identify) {
                    let multipleSelection = JSON.stringify(_this.multipleSelection);
                    if (_this.multipleSelection.length < 1) {
                        _this.$message({
                            message: '至少勾选一条进行绑定',
                            type: 'warning'
                        });
                    } else {
                        row.shipperCode = _this.shipperCode;
                        util.publicpost(
                            '/shipper/ext/insert',
                            {
                                extlist: multipleSelection
                            },
                            function (res) {
                                if (res.code === 0) {
                                    _this.listLoading = false;
                                    _this.$message({
                                        message: '绑定成功',
                                        type: 'success'
                                    });
                                    _this.getUserList();
                                } else {
                                    _this.listLoading = false;
                                    _this.$alert('<p style="color:#f56c6c;text-align: center">调用MD接口失败，扩展属性保存未成功，请重试！</p>', '提示', {dangerouslyUseHTMLString: true});
                                }
                            }
                        );
                    }
                } else {
                    row.shipperCode = _this.shipperCode;
                    for (let i = 0; i < _this.multipleSelection.length; i++) {
                        _this.multipleSelection[i].shipperCode = _this.shipperCode;
                    }
                    let multipleSelection = JSON.stringify(_this.multipleSelection);
                    if (_this.multipleSelection.length < 1) {
                        _this.$message({
                            message: '至少勾选一条进行绑定',
                            type: 'warning'
                        });
                    } else {
                        // let multipleSelection = JSON.stringify(row);
                        util.publicpost('/shipper/ext/update',
                            {
                                extlist: multipleSelection
                            },
                            function (res) {
                                if (res.code === 0) {
                                    _this.listLoading = false;
                                    _this.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    });
                                    _this.getUserList();
                                } else if (res.code === -1){
                                  _this.listLoading = false;
                                  _this.errorMsg(res.msg);
                                } else {
                                    _this.listLoading = false;
                                    _this.errorMsg('服务器繁忙！');
                                }
                            }
                        );
                    }
                }
            },
            // 操作编辑
            TheEditor(row) {
                if (this.addForm.whetherLevelOne === 'NO') {
                    return;
                } else {
                    for (let i = 0; i < this.gteUserList.length; i++) {
                        if (this.gteUserList[i].shipperCode === row.shipperCode && this.gteUserList[i].storageCenterCode === row.storageCenterCode && !this.buttonVisible) {
                            this.gteUserList[i].isEditing = true;
                        }
                    }
                }
            },
            // 删除绑定关系
            removeBind(row) {
                let that = this;
                that.$message({
                    type: 'error',
                    showClose: true,
                    dangerouslyUseHTMLString: true,
                    message: '<div style="width:310px;">删除扩展信息会影响下游系统生产数据的准确性，请联系管理员或运维人员</div>'
                });
                // 删除功能暂时注销
                /*util.publicpost(
                    '/shipper/ext/delete',
                    {
                        storageCenterCode: row.storageCenterCode,
                        shipperCode: row.shipperCode
                    },
                    function (res) {
                        if (res.code === 0) {
                            that.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            that.getUserList();
                        } else {
                            that.listLoading = false;
                            that.errorMsg('服务器繁忙！');
                        }
                    }
                );*/
            },
            // 货主列表获取
            getShipper(sign) {
                // this.exportBtnDisabled = false;
                let _this = this;
                // if (this.formInline.shipperCode || this.formInline.shipperCode || this.formInline.shipperCode || this.formInline.shipperCode || this.formInline.status) {
                //   _this.pager.page = 1;
                // }
                _this.users = [];
                if (!sign) {
                    _this.listLoading = true;
                }

                util.publicpost(
                    '/shipper/selectShipperListPage',
                    {
                        shipperCode: _this.formInline.shipperCode,
                        shipperName: _this.formInline.shipperName,
                        shipperType: _this.formInline.shipperType,
                        contactPerson: _this.formInline.contactPerson,
                        telephone: _this.formInline.telephone,
                        services: _this.formInline.services,
                        status: _this.formInline.status,
                        page: _this.pager.page,
                        rows: _this.pager.rows,
                        order: _this.pager.order,
                        sort: _this.pager.sort,
                        init: _this.init
                    },
                    function (res) {
                        if (res.code === 0) {
                            _this.init = '';
                            _this.listLoading = false;
                            _this.pager.total = res.pager.totalCount || 0;
                            if (res.result && res.result.length > 0) {
                                _this.exportBtnDisabled = false;
                                res.result.forEach(item => {
                                    const createTime = item.createTime
                                        ? new Date(item.createTime)
                                        : '';
                                    const updateTime = item.updateTime
                                        ? new Date(item.updateTime)
                                        : '';
                                    // const lineNumber = item.lineNumber
                                    //     ? new Date(item.lineNumber)
                                    //     : '';
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
                            }
                            _this.users = res.result;
                        } else {
                            _this.listLoading = false;
                            _this.errorMsg('服务器繁忙！');
                        }
                        _this.users.forEach(item => {
                            item.isEditing = false;
                        });
                        // 将多有的枚举值放到 dict变量里面
                        _this.dict = res.enumVal;
                    }
                );
            },

            // 禁用
            handleForbidden: function (row) {
                let ids = row.id;
                let _this = this;
                let versions = row.version;
                _this.listLoading = true;
                util.publicpost(
                    '/shipper/disableShipper',
                    {
                        ids: ids,
                        versions: versions
                    },
                    function (res) {
                        if (res.code === 0) {
                            _this.$message({
                                showClose: true,
                                message: _this.$t('msg.success'),
                                type: 'success'
                            });
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
                        _this.listLoading = false;
                        _this.getShipper();
                    }
                );
            },
            // 启用
            handleStart: function (row) {
                let ids = row.id;
                let _this = this;
                let versions = row.version;
                _this.listLoading = true;
                util.publicpost(
                    '/shipper/enableShipper',
                    {
                        ids: ids,
                        versions: versions
                    },
                    function (res) {
                        if (res.code === 0) {
                            _this.$message({
                                showClose: true,
                                message: _this.$t('msg.success'),
                                type: 'success'
                            });
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
                        _this.listLoading = false;
                        _this.getShipper();
                    }
                );
            },

            // 选择城市
            addressChange(name, key) {
                this.pyatyiLinkageNo(name, this, 'addEid');
                util.addressChange(name, key, this);
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
            handleCurrentChange(val) {
                this.page = val;
                this.getUsers();
            },
            // 上传
            handleRemove(file, fileList) {
                this.addForm.evidence = [];
                for (var k in fileList) {
                    this.addForm.evidence.push(fileList[k].response.data);
                }
            },
            handlePreview(file, fileList) {
                this.previewPhotoUrls = file.url;
                this.visible.previewPhoto = true;
            },
            // 上传成功后的回调
            uploadSuccess(response, file, fileList) {
                this.fileList2 = fileList;
                this.addForm.evidence = [];
                for (var k in fileList) {
                    this.addForm.evidence.push(fileList[k].response.data);
                }
            },
            uploadProgress(event, file, fileList) {

            },
            beforeUpload(file) {
                let fileType = file.type;
                let fileSize = file.size;
                if (!(fileType === 'image/jpg' || fileType === 'image/jpeg' || fileType === 'image/png')) {
                    this.errorMsg('文件格式不对！');
                    return false;
                }
                if (fileSize > 5 * 1024 * 1024) {
                    this.errorMsg('图片大小超出5M,请压缩后重新上传！');
                    return false;
                }
                return true;
            },
            handleExceed(files, fileList) {
                // this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm('确定移除' + file.name + '?');
            },
            // submitUpload() {
            //     this.$refs.upload.submit();
            //     this.centerDialogVisible = false;
            // },
            download() {
                var fileObj;
                fileObj = window.open(
                    'https://zhx198600.github.io/myvue/oms数据库.xlsx',
                    '_blank'
                );
                fileObj.document.execCommand('saveas');
            },
            // 显示编辑界面
            handleEdit: function (row) {
                console.log(row);
                let _this = this;
                let code = row.shipperCode;
                _this.identify = false; // 为修改状态
                _this.isEditing = false; // 修改时为不可编辑状态
                _this.buttonVisible = false; // 展示按钮
                _this.updateStatus = true;
                _this.haveShipperExt = false;
                _this.lookFormVisible = false;
                _this.whetherLevelOneTo = false;
                _this.address = [];
                _this.listLoading = true;
                _this.parentList = [];
                _this.state = '';
                _this.whetherLevelOne(row.whetherLevelOne);
                if (_this.$refs['addForm'] !== undefined) {
                    _this.$refs['addForm'].resetFields();
                }
                util.publicpost('/shipper/selectShipperByShipperCode',
                    {
                        shipperCode: code
                    }, function (res) {
                        if (res.code === 0) {
                            // _this.shipperId = res.data.id;
                            _this.listLoading = false;
                            _this.shipperCode = res.data.shipperCode; // 储存shipperCode
                            _this.addFormVisible = true;
                            _this.addForm = res.data;
                            _this.addForm.evidence = [];
                            _this.addForm.countryCode = res.data.countryCode;
                            _this.fileList2 = [];
                            var _fileList = [];
                            // for (var i = 1; i < 4; i++) {
                            //     var _tmpIndex = i;
                            //     if (i === 1) {
                            //         _tmpIndex = '';
                            //     }
                            //     if (res.data['contacts' + _tmpIndex]) {
                            //         var name = '证明材料' + i;
                            //         _this.addForm.evidence.push(res.data['contacts' + _tmpIndex]);
                            //         _fileList.push({
                            //             name: name,
                            //             url: res.data['contacts' + _tmpIndex],
                            //             response: {msg: res.data['contacts' + _tmpIndex]}
                            //         });
                            //     }
                            // }
                            if (res.data.contacts1 != null && res.data.contacts1 != '') {
                                var fileName = res.data.contacts1;
                                var imageFile = {name: '', url: config.azure_download_path + fileName};
                                _this.fileList2.push(imageFile);
                            }
                            if (res.data.contacts2 != null && res.data.contacts2 != '') {
                                _this.visible.imgView = true;
                                var fileName = res.data.contacts2;
                                var imageFile = {name: '', url: config.azure_download_path + fileName};
                                _this.fileList2.push(imageFile);
                            } else {
                                _this.visible.imgView = false;
                            }
                            if (res.data.contacts3 != null && res.data.contacts3 != '') {
                                var fileName = res.data.contacts3;
                                var imageFile = {name: '', url: config.azure_download_path + fileName};
                                _this.fileList2.push(imageFile);
                            }
                            // _this.fileList2 = _fileList;
                            let map = {
                                'id': res.data.parentId,
                                'label': res.data.parentName,
                                'value': res.data.parentId
                            };
                            _this.parentList.push(map);
                            if (res.data.businessType === 'IN') {
                                _this.business = true;
                            } else {
                                _this.business = false;
                            }
                            // 赋值给省
                            util.addressChange('addressed', _this.addForm.countryCode, _this);
                            util.addressChange('city', _this.addForm.provinceCode, _this);
                            util.addressChange('county', _this.addForm.cityCode, _this);
                            util.addressChange('street', _this.addForm.districtCode, _this);
                            // util.formatAddress(_this, 'address', _this.addForm.countryCode, _this.addForm.countryName);
                            // util.formatAddress(_this, 'addressed', _this.addForm.provinceCode, _this.addForm.provinceName);
                            // util.formatAddress(_this, 'city', _this.addForm.cityCode, _this.addForm.cityName);
                            // util.formatAddress(_this, 'county', _this.addForm.districtCode, _this.addForm.districtName);
                            // util.formatAddress(_this, 'street', _this.addForm.streetCode, _this.addForm.streetName);
                            _this.addForm.countryCode = res.data.countryName;
                            _this.addForm.provinceCode = res.data.provinceName;
                            _this.addForm.cityCode = res.data.cityName;
                            _this.addForm.districtCode = res.data.districtName;
                            _this.addForm.streetCode = res.data.streetName;
                        } else {
                            _this.listLoading = false;
                            let msg = '';
                            if (!util.isEmpty(res.msg)) {
                                msg = ',' + _this.$t(res.msg);
                            }
                            _this.$message({
                                message: _this.$t('msg.error') + msg,
                                type: 'error'
                            });
                        }
                        // 清除校验
                        if (_this.$refs['addFormRules'] !== undefined) {
                            _this.$refs['addFormRules'].resetFields();
                        }
                    });
            },
            // 根据名称模糊查询
            remoteMethod(query) {
                console.log(query);
                if (query !== '') {
                    let _this = this;
                    _this.loading = true;
                    util.publicpost('/shipper/selectShipperByName', {name: query.toString()}, function (res) {
                        if (res.code === 0) {
                            _this.loading = false;
                            _this.parentList = res.data.map(item => {
                                return {
                                    id: item.id,
                                    label: item.shipperName,
                                    value: item.id
                                };
                            });
                        }
                    });
                }
            },
            // 显示新增界面
            handleAdd: function () {
                let _this = this;
                _this.fileList2 = [];
                _this.identify = true; // 为新增状态
                _this.buttonVisible = false; // 展示按钮
                _this.superShipperStatus = false;
                _this.updateStatus = false;
                _this.gteUserList = [];
                _this.searchList = [];
                _this.SoldList = [];
                _this.SoldDimList = [];
                _this.addFormVisible = true;
                _this.lookFormVisible = false;
                _this.haveShipperExt = false;
                _this.visible.imgView = true;
                _this.address = [];
                _this.shipperCode = '';
                _this.addForm = {
                    shipperName: '',
                    shipperCode: '',
                    shortName: '',
                    onlineTime: '',
                    address: '',
                    postcode: '',
                    contactPerson: '',
                    telephone: '',
                    services: '',
                    parentId: '',
                    shipperType: '',
                    countryCode: '',
                    countryName: '',
                    provinceCode: '',
                    provinceName: '',
                    cityCode: '',
                    cityName: '',
                    districtCode: '',
                    districtName: '',
                    streetCode: '',
                    streetName: '',
                    servicesUrl: '',
                    whetherLevelOne: 'YES'
                };
                _this.whetherLevelOneTo = false;
                if (_this.$refs['addForm'] !== undefined) {
                    _this.$refs['addForm'].resetFields();
                }
                _this.addLoading = false;
                if (_this.addFormVisible === true) {
                    util.publicpost('/regionalAddress/selectAddress',
                        {
                            type: 'COUNTRY' // 国家
                        },
                        function (res) {
                            if (res.code === 0) {
                                _this.address = res.data;
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
                            _this.editLoading = false;
                        }
                    );
                }
            },
            gitPartentId(time) {
                this.addForm.parentId = time;
            },
            changeShipperType() {
                /*if (this.addForm.shipperType === 'EXTERNAL') {
                    this.addFormRules.sapCode = [
                        {required: false, message: '请输入SAP编码', trigger: 'blur'},
                        {required: false, message: '请输入SAP编码', trigger: this.trigger, validator: this.validCode}
                    ];
                } else {
                    this.addFormRules.sapCode = [
                        {required: true, message: '请输入SAP编码', trigger: 'blur'},
                        {required: true, message: '请输入SAP编码', trigger: this.trigger, validator: this.validCode}
                    ];
                }*/
            },
            // 校验新增货主信息
            addSubmit: function (formName) {
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        util.publicpost('/shipper/selectShipperByShipperCode',
                            {
                                shipperCode: _this.addForm.shipperCode
                            },
                            function (res) {
                                if (res.code !== 0) {
                                    _this.$message({
                                        message: _this.$t(res.msg),
                                        type: 'error'
                                    });
                                    return;
                                }
                                if (res.data) {
                                    console.log(_this.whetherLevelOneTo);
                                    if (_this.whetherLevelOneTo) {
                                        _this.shipperCode = _this.addForm.shipperCode; // 存货主code
                                        _this.parentList = [];
                                    } else {
                                        if (res.data.whetherLevelOne === 'YES') {
                                            _this.shipperCode = _this.addForm.shipperCode; // 存货主code
                                            _this.parentList = [];
                                            _this.activeName = 'second'; // 切换选项卡
                                            _this.getUserList(); // 加载
                                            // _this.$refs[formName].resetFields(); // 清空校验
                                        }
                                        if (res.data.whetherLevelOne === 'NO') {
                                            _this.$message({
                                                message: _this.$t('货主编码已存在,且不是一级货主'),
                                                type: 'error'
                                            });
                                        }
                                    }
                                } else {
                                    _this.addSubmitShipp(formName);
                                }
                            });
                    } else {
                        return false;
                    }
                });
            },
            // 新增
            addSubmitShipp: function (formName) {
                let _this = this;
                _this.$refs.addForm.validate(valid => {
                    if (valid) {
                        _this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            _this.addLoading = true;
                            let districtCode = this.addForm.districtCode;
                            this.addForm.districtName = util.loadadds(districtCode, this.county);
                            let countryCode = this.addForm.countryCode;
                            this.addForm.countryName = util.loadadds(countryCode, this.address);
                            let provinceCode = this.addForm.provinceCode;
                            this.addForm.provinceName = util.loadadds(
                                provinceCode,
                                this.addressed
                            );
                            let cityCode = this.addForm.cityCode;
                            this.addForm.cityName = util.loadadds(cityCode, this.city);
                            let streeCode = this.addForm.streetCode;
                            this.addForm.contacts = _this.contacts;
                            this.addForm.streetName = util.loadadds(streeCode, this.street);
                            _this.addForm.evidencePath1 = '';
                            _this.addForm.evidencePath2 = '';
                            _this.addForm.evidencePath3 = '';
                            for (var k in _this.addForm.evidence) {
                                var _tmpIndex = parseInt(k) + 1;
                                _this.addForm['contacts' + _tmpIndex] = _this.addForm.evidence[k][0];
                            }
                            let para = Object.assign({}, this.addForm);
                            util.publicpost('/shipper/saveShipper', para, function (res) {
                                if (res.code === 0) {
                                    _this.getShipper();
                                    _this.shipperCode = _this.addForm.shipperCode; // 存货主code
                                    _this.successMsg(_this.$t('msg.success'));
                                    // _this.addFormVisible = false;
                                    _this.parentList = [];
                                    if (para.businessType === 'IN') {
                                        _this.business = true;
                                    } else {
                                        _this.business = false;
                                    }
                                    _this.isEditing = false; // 界面不可编辑
                                    // 如果是一级货主
                                    if (_this.addForm.whetherLevelOne === 'YES') {
                                        _this.activeName = 'second'; // 切换选项卡
                                    }
                                    // _this.$refs[formName].resetFields();
                                } else {
                                    _this.$message({
                                        message: _this.$t(res.msg),
                                        type: 'error'
                                    });
                                }
                                _this.addLoading = false;
                            });
                        });
                    } else {
                    }
                });
            },
            // 修改
            editSubmit: function () {
                this.$refs.editForm.validate(valid => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            let _this = this;
                            _this.addLoading = true;
                            let districtCode = this.editForm.districtCode;
                            this.editForm.districtName = util.loadadds(districtCode, this.county);
                            let countryCode = this.editForm.countryCode;
                            this.editForm.countryName = util.loadadds(countryCode, this.address);
                            let provinceCode = this.editForm.provinceCode;
                            this.editForm.provinceName = util.loadadds(
                                provinceCode,
                                this.addressed
                            );
                            let cityCode = this.editForm.cityCode;
                            this.editForm.cityName = util.loadadds(cityCode, this.city);
                            let streeCode = this.editForm.streetCode;
                            this.editForm.streetName = util.loadadds(streeCode, this.street);
                            let para = Object.assign({}, this.editForm);
                            console.log(para);
                            util.publicpost('/shipper/updateShipperById', para, function (res) {
                                _this.shipperId = para.id;
                                if (res.code === 0) {
                                    _this.$message({
                                        message: _this.$t('msg.success'),
                                        type: 'success'
                                    });
                                    _this.getShipper('sign');
                                    // _this.off();
                                    // _this.getShipper();
                                } else {
                                    let msg = '';
                                    if (!util.isEmpty(res.msg)) {
                                        msg = ',' + _this.$t(res.msg);
                                    }
                                    _this.$message({
                                        message: _this.$t('msg.error') + msg,
                                        type: 'error'
                                    });
                                }
                                // _this.addLoading = false;
                            });
                        });
                    }
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            // 批量删除
            batchRemove: function (row) {
                let ids = row.id;
                let versions = row.version;
                this.$confirm('确认删除本条记录吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        this.listLoading = true;
                        let _this = this;
                        _this.listLoading = true;
                        util.publicpost(
                            '/shipper/removeShipperBatch',
                            {
                                ids: ids,
                                versions: versions
                            },
                            function (res) {
                                if (res.code === 0) {
                                    _this.$message({
                                        showClose: true,
                                        message: _this.$t('msg.success'),
                                        type: 'success'
                                    });
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
                                _this.listLoading = false;
                                _this.getShipper();
                            }
                        );
                    })
                    .catch(error => console.log(error));
            },
            // 创建时间转换
            formatter(row, column) {
                return util.formatDate.format(
                    new Date(row.createTime),
                    'yyyy-MM-dd hh:mm:ss'
                );
            },
            formatterOnline(row, column) {
                if (row.operatingPeriod) {
                    return util.formatDate.format(
                        new Date(row.operatingPeriod),
                        'yyyy-MM-dd'
                    );
                }
            },
            // 修改时间转换
            bindingTime(row, column) {
                return row.timeOnline
                    ? util.formatDate.format(
                        new Date(row.timeOnline),
                        'yyyy-MM-dd'
                    )
                    : '';
            },
            arraySpanMethod({row, column, rowIndex, columnIndex}) {
                if (rowIndex % 2 === 0) {
                    if (columnIndex === 0) {
                        return [1, 2];
                    } else if (columnIndex === 1) {
                        return [0, 0];
                    }
                }
            },
            objectSpanMethod({row, column, rowIndex, columnIndex}) {
                if (columnIndex === 0) {
                    if (rowIndex % 2 === 0) {
                        return {
                            rowspan: 2,
                            colspan: 1
                        };
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }
                }
            },
            // 货主类型转换
            formatterShipperType(row, column) {
                let key = row.shipperType;
                let json = this.dict.shipperTypeEnum;
                return util.formatDict(json, key);
            },
            // 服务类型转化
            formatterServiceType(row, column) {
                let key = row.services;
                let json = this.dict.servicesEnum;
                return util.formatDict(json, key);
            },
            // 业务类型转化
            businessServiceType(row, column) {
                let key = row.businessType;
                let json = this.dict.businessTypeEnum;
                return util.formatDict(json, key);
            },
            // 状态转换
            formatStatus(row, column) {
                var key = row.status;
                var json = this.dict.statusEnum;
                return util.formatDict(json, key);
            },
            // 删除货主
            deleteShipper(row) {
                let _this = this;
                this.confirm('确定删除？', function () {
                    _this.visible.shipperListLoading = true;
                    util.publicpost(
                        '/shipper/material/delete',
                        {
                            ids: row.id
                        },
                        function (res) {
                            _this.visible.shipperListLoading = false;
                            if (res.success) {
                                if (res.data === 0) {
                                    _this.errorMsg('服务器繁忙！');
                                } else {
                                    _this.successMsg(_this.$t('msg.success'));
                                    _this.loadShipperRelation();
                                }
                            } else {
                                _this.errorMsg(_this.$t(res.msg));
                            }
                        }
                    );
                });
            },
            // 取消保存与货主关系
            cancelShipper() {
                this.editShipperForm = {
                    id: '',
                    version: '',
                    shipperCode: '',
                    shipperName: '',
                    beyondDate: '',
                    outboundWay: '',
                    batchAttribute: '',
                    maturationPeriod: '',
                    warningValue: '',
                    merchandiseDes: '',
                    referencePrice: '',
                    baseUnit: '',
                    minUnit: '',
                    specification: '',
                    shelfLife: '',
                    merchandiseName: '',
                    merchandiseCode: ''
                };
                this.searchShipperList = []; // 检索货主列表
                this.searchFactoryDcList = []; // 检索工厂列表
            },
            // 保存于货主、工厂/物流中心关系
            saveShipper() {
                let _this = this;
                let id = _this.editShipperForm.id;
                let version = _this.editShipperForm.version;
                let materialId = _this.currentRow.id;
                let shipperId = _this.editShipperForm.shipperId;
                let factoryLogisticsId = _this.editShipperForm.fctoryLogisticsId;
                let beyondDate = _this.editShipperForm.beyondDate;
                let outboundWay = _this.editShipperForm.outboundWay;
                let batchAttribute = _this.editShipperForm.batchAttribute;
                let maturationPeriod = _this.editShipperForm.maturationPeriod;
                let warningValue = _this.editShipperForm.warningValue;
                let merchandiseDes = _this.editShipperForm.merchandiseDes;
                let referencePrice = _this.editShipperForm.referencePrice;
                let baseUnit = _this.editShipperForm.baseUnit;
                let minUnit = _this.editShipperForm.minUnit;
                let specification = _this.editShipperForm.specification;
                let shelfLife = _this.editShipperForm.shelfLife;
                let merchandiseName = _this.editShipperForm.merchandiseName;
                let merchandiseCode = _this.editShipperForm.merchandiseCode;
                if (util.isEmpty(materialId)) {
                    _this.showMsg('请先保存物料信息');
                } else if (util.isEmpty(shipperId) && util.isEmpty(factoryLogisticsId)) {
                    _this.showMsg('货主与工厂/物流中心必须选择一个');
                } else {
                    let url = '';
                    if (util.isEmpty(id)) {
                        url = '/shipper/material/add';
                    } else {
                        url = '/shipper/material/update';
                    }
                    _this.visible.shipperListLoading = true;
                    util.publicpost(
                        url,
                        {
                            id: id,
                            materialId: materialId,
                            shipperId: shipperId,
                            fctoryLogisticsId: factoryLogisticsId,
                            beyondDate: beyondDate,
                            outboundWay: outboundWay,
                            batchAttribute: batchAttribute,
                            maturationPeriod: maturationPeriod,
                            warningValue: warningValue,
                            merchandiseDes: merchandiseDes,
                            referencePrice: referencePrice,
                            baseUnit: baseUnit,
                            minUnit: minUnit,
                            specification: specification,
                            shelfLife: shelfLife,
                            merchandiseName: merchandiseName,
                            merchandiseCode: merchandiseCode,
                            version: version
                        },
                        function (res) {
                            _this.visible.shipperListLoading = false;
                            if (res.success) {
                                if (res.data === 0) {
                                    _this.errorMsg('服务器繁忙！');
                                } else {
                                    _this.cancelShipper();
                                    _this.successMsg(_this.$t('msg.success'));
                                    _this.loadShipperRelation();
                                }
                            } else {
                                _this.errorMsg(_this.$t(res.msg));
                            }
                        }
                    );
                }
            },

            // 工厂 售达方 送达方 与 货主关系
            // 切换tabs
            handleTabs(tab, event) {
                let that = this;
                that.state = '';
                if (
                    that.activeName === 'second' ||
                    that.activeName === 'fifth'
                ) {
                    if (that.shipperCode) {
                    } else {
                        that.showMsg('请先保存货主信息');
                    }
                }
                if (that.activeName === 'second' && !that.identify) {
                    that.getUserList();
                }
            },
            // 工厂货主信息绑定
            // bindingPlant() {
            //     let that = this;
            //     // if (!that.factoryLogisticsId.id) {
            //     //     that.$message({
            //     //         message: '请选择工厂',
            //     //         type: 'error'
            //     //     });
            //     //     return;
            //     // }
            //     // if (this.business) {
            //     //     if (!that.inventoryCode) {
            //     //         that.$message({
            //     //             message: '请输入库存地',
            //     //             type: 'error'
            //     //         });
            //     //         return;
            //     //     }
            //     // }
            //     let para = {
            //         // shipperId:that.shipperId,
            //         storageCenterCode: that.storageCenterCode,
            //         storageCenterName: that.storageCenterName
            //     };
            //     // that.confirm('确定绑定关系吗？', function() {
            //     util.publicpost(
            //         '/shipper/ext/selectStorageCenter',
            //         para,
            //         function (res) {
            //             if (res.code === 0) {
            //                 that.$message({
            //                     message: that.$t('msg.success'),
            //                     type: 'success'
            //                 });
            //                 that.storageCenterCode = '';
            //                 that.storageCenterName = '';
            //                 for (let i = 0; i < res.data.length; i++) {
            //                     res.data[i].isEditing = true;
            //                 }
            //                 that.gteUserList = res.data;
            //                 that.MaterialPager.total = res.pager.totalCount || 0;
            //                 // that.getUserList();
            //             } else {
            //                 that.$message({
            //                     message: that.$t(res.msg),
            //                     type: 'error'
            //                 });
            //             }
            //         }, config.baseMd_service_ip
            //     );
            //     // });
            // },
            // 自动获取输入框内容进行查询
            querySearch(queryString, callback) {
                // console.log(this.factoryLogisticsId);
                console.log(queryString);
                console.log(this.shipperCode);
                let that = this;
                let list = [];
                that.factoryLogisticsId = []; // 'shipperId':that.shipperId
                util.publicpost('/shipper/ext/selectStorageCenter',
                    {
                        storageCenterCode: queryString,
                        storageCenterName: queryString,
                        shipperCode: this.shipperCode
                    },
                    function (res) {
                        if (res.code === 0) {
                            if (res.data) {
                                for (let i of res.data) {
                                    i.value = i.storageCenterName;
                                    i.id = i.storageCenterCode;
                                }
                                list = res.data;
                                callback(list);
                            }
                        } else if (res.code === -1) {
                          // 解决bug 10242
                          that.errorMsg(res.msg);
                        } else {
                            // 跟肖总确认查询没有结果不返回提示信息
                            // that.errorMsg(res.msg);
                          that.errorMsg(" 查询仓储中心失败，请联系MD ");
                        }
                    }
                );
            },
            // 失去焦点
            blur() {
                let that = this;
                // console.log(1);
                console.log(that.factoryLogisticsId);
                if (that.factoryLogisticsId.length === 0) {
                    that.state = '';
                }
            },
            // 工厂分页 售达方分页 送达方分页
            ChangePage(val) {
                let that = this;
                that.UserPager.page = val;
                that.getUserList();
            },

            // SoldPage(val) {
            //     let that = this;
            //     that.SoldPager.page = val;
            //     that.getSoldList();
            // },
            // SoldPageTo(val) {
            //     let that = this;
            //     that.SoldPagerTo.page = val;
            //     that.SoldDimSearch('sold');
            // },
            // 增加绑定页面分页
            MaterialPage(val) {
                let that = this;
                that.MaterialPager.page = val;
                that.pagerExt.page = val;
                that.getUserList();
                // that.getMaterialList();
            },
            MaterialPageTo(val) {
                let that = this;
                that.MaterialPagerTo.page = val;
                that.SoldDimSearch('material');
            },
            DeliveryPage(val) {
                let that = this;
                that.DeliveryPager.page = val;
                that.getDeliveryList();
            },
            DeliveryPageTo(val) {
                let that = this;
                that.DeliveryPagerTo.page = val;
                that.SoldDimSearch('delivery');
            },
            // 获取工厂货主列表
            getUserList() {
                let that = this;
                that.loading = true;
                util.publicpost(
                    '/shipper/ext/selectPage',
                    {
                        shipperCode: that.shipperCode,
                        page: that.pagerExt.page,
                        rows: that.pagerExt.rows,
                        order: that.pagerExt.order,
                        sort: that.pagerExt.sort
                    },
                    function (res) {
                        that.loading = false;
                        that.gteUserList = [];
                        if (res.data.length !== 0) {
                            that.haveShipperExt = true;
                        } else {
                            that.haveShipperExt = false;
                        }
                        if (res.code === 0) {
                            for (let i = 0; i < res.data.length; i++) {
                                res.data[i].isEditing = false;
                            }
                            that.gteUserList = res.data;
                            that.pagerExt.total = res.pager.totalCount;
                        }
                    }
                );
            },
            // 删除工厂列表
            deleteFactory(row) {
                let that = this;
                console.log(row);
                let ids = row.id.toString();
                let versions = row.version;
                this.confirm('确定删除？', function () {
                    util.publicpost(
                        '/factoryShipperRelation/deleteFactoryShipperRelationBatch',
                        {ids: ids, versions: versions},
                        // versions: versions
                        function (res) {
                            if (res.code === 0) {
                                that.successMsg(that.$t(res.msg));
                                that.getUserList();
                            } else {
                                let msg = '';
                                if (!util.isEmpty(res.msg)) {
                                    msg = ',' + that.$t(res.msg);
                                }
                                that.errorMsg(that.$t('msg.error') + msg);
                            }
                        }
                    );
                });
            },
            // 模糊查询
            handleSelect(time) {
                let that = this;
                that.gteUserListPush = that.gteUserList;
                util.publicpost(
                    '/shipper/ext/selectStorageByCode',
                    {
                        storageCenterCode: time.storageCenterCode
                    },
                    function (res) {
                        that.loading = false;
                        if (res.code === 0) {
                            // let gteUserListArr = [];
                            that.addList = res.data;
                            let gteUserList = {};
                            let ispush = true;
                            for (let i = 0; i < that.gteUserListPush.length; i++) {
                                if (that.gteUserListPush[i].storageCenterCode === res.data.storageCenterCode) {
                                    ispush = false;
                                }
                            }
                            if (ispush) {
                                gteUserList = res.data;
                                gteUserList.isEditing = true;
                                // gteUserListArr.push(gteUserList);
                                // that.gteUserListPush.push(gteUserList);
                            }
                            console.log(that.gteUserListPush);
                            that.gteUserList = that.gteUserListPush;
                            // that.pagerExt.total = res.pager.totalCount;
                        }
                    }
                );
            },
            // 点击按钮增加仓储中心
            addlist() {
                let that = this;
                that.gteUserListPush = that.gteUserList;
                let gteUserList = {};
                let ispush = true;
                for (let i = 0; i < that.gteUserListPush.length; i++) {
                    if (that.gteUserListPush[i].storageCenterCode === that.addList.storageCenterCode) {
                        ispush = false;
                    }
                }
                if (ispush) {
                    gteUserList = that.addList;
                    gteUserList.isEditing = true;
                    // gteUserListArr.push(gteUserList);
                    that.gteUserListPush.push(gteUserList);
                }
                that.state = '';
            },
            // 售达方
            getSoldList() {
                let that = this;
                // that.shipperId
                that.loading = true;
                util.publicpost(
                    '/shipperSoldRelation/selectShipperSoldRelationByShipperId',
                    {
                        shipperId: that.shipperId,
                        page: that.SoldPager.page,
                        rows: that.SoldPager.rows
                    },
                    function (res) {
                        that.loading = false;
                        if (res.code === 0) {
                            that.SoldList = res.result;
                            that.SoldPager.total = res.pager.totalCount;
                        }
                    }
                );
            },
            // 物料
            getMaterialList() {
                // let that = this;
                // that.loading = true;
                // util.publicpost(
                //     '/shipper/ext/selectPage',
                //     {
                //         shipperCode: that.shipperCode,
                //         page: that.pagerExt.page,
                //         rows: that.pagerExt.rows,
                //         order: that.pagerExt.order,
                //         sort: that.pagerExt.sort
                //     },
                //     function (res) {
                //         that.loading = false;
                //         if (res.code === 0) {
                //             that.gteUserList = res.data;
                //             that.pagerExt.total = res.pager.totalCount;
                //         }
                //     }
                // );
            },
            // 删除售达方 and 送达方 and 物料
            deleteSold(row, name) {
                let that = this;
                console.log(name);
                if (name === 'sold') {
                    that.confirm('确定删除？', function () {
                        util.publicpost(
                            '/shipperSoldRelation/deleteShipperSoldRelationBatch',
                            {ids: row.id.toString(), versions: row.version},

                            function (res) {
                                if (res.code === 0) {
                                    that.successMsg(that.$t(res.msg));
                                    that.getSoldList();
                                    that.SoldDimSearch('sold');
                                } else {
                                    let msg = '';
                                    if (!util.isEmpty(res.msg)) {
                                        msg = ',' + that.$t(res.msg);
                                    }
                                    that.errorMsg(that.$t('msg.error') + msg);
                                }
                            }
                        );
                    });
                } else if (name === 'material') {
                    that.confirm('确定删除？', function () {
                        util.publicpost(
                            '/shipperMaterialRelation/delete',
                            {ids: row.id.toString(), versions: row.version},
                            function (res) {
                                if (res.code === 0) {
                                    that.successMsg(that.$t(res.msg));
                                    that.getMaterialList();
                                    that.SoldDimSearch('material');
                                } else {
                                    let msg = '';
                                    if (!util.isEmpty(res.msg)) {
                                        msg = ',' + that.$t(res.msg);
                                    }
                                    that.errorMsg(that.$t('msg.error') + msg);
                                }
                            }
                        );
                    });
                } else {
                    that.confirm('确定删除？', function () {
                        util.publicpost(
                            '/shipperDeliveryRelation/deleteShipperDeliveryRelationBatch',
                            {ids: row.id.toString(), versions: row.version},
                            function (res) {
                                if (res.code === 0) {
                                    that.successMsg(that.$t(res.msg));
                                    that.getDeliveryList();
                                    that.SoldDimSearch('delivery');
                                } else {
                                    let msg = '';
                                    if (!util.isEmpty(res.msg)) {
                                        msg = ',' + that.$t(res.msg);
                                    }
                                    that.errorMsg(that.$t('msg.error') + msg);
                                }
                            }
                        );
                    });
                }
            },
            // 根据关键字检索一级货主信息
            searchShipper(key) {
                if (key !== '') {
                    let _this = this;
                    _this.visible.searchShipper = true;
                    util.publicpost('/shipper/selectListByshipperName', {
                        shipperName: key
                    }, function (res) {
                        if (res.success) {
                            _this.superShipperList = res.data;
                        } else {
                            _this.superShipperList = [];
                        }
                    }, config.base_service_ip);
                }
            },
            // 售达方模糊查询 and 送达方
            SoldDimSearch(name) {
                let that = this;
                // console.log(name);
                if (!that.SoldDimText) {
                    // that.errorMsg('请填写正确的查询信息');
                    return;
                }
                if (name === 'sold') {
                    that.loading1 = true;
                    that.SoldDimList = [];
                    util.publicpost(
                        '/sold/selectSoldByNamePager',
                        {
                            soldName: that.SoldDimText.toString(),
                            shipperId: that.shipperId,
                            page: that.SoldPagerTo.page,
                            rows: that.SoldPagerTo.rows
                        },
                        function (res) {
                            if (res.code === 0) {
                                that.loading1 = false;
                                that.SoldDimList = res.result;
                                that.SoldPagerTo.total = res.pager.totalCount;
                            } else {
                                // that.errorMsg(res.msg);
                                that.loading1 = false;
                            }
                        }
                    );
                } else if (name === 'delivery') {
                    that.SoldDimList = [];
                    util.publicpost(
                        '/delivery/selectDeliveryByNamePager',
                        {
                            deliveryName: that.SoldDimText.toString(),
                            shipperId: that.shipperId,
                            page: that.DeliveryPagerTo.page,
                            rows: that.DeliveryPagerTo.rows
                        },
                        function (res) {
                            if (res.code === 0) {
                                that.loading = false;
                                that.SoldDimList = res.result;
                                that.DeliveryPagerTo.total = res.pager.totalCount;
                                if (res.result.length === 0) {
                                    // that.errorMsg('暂无查询信息');
                                    return;
                                }
                            } else {
                                that.loading = false;
                                // that.errorMsg(res.msg);
                            }
                        }
                    );
                } else if (name === 'material') {
                    that.SoldDimList = [];
                    util.publicpost(
                        '/material/selectMaterialByNamePager',
                        {
                            materialName: that.SoldDimText.toString(),
                            shipperId: that.shipperId,
                            page: that.MaterialPagerTo.page,
                            rows: that.MaterialPagerTo.rows
                        },
                        function (res) {
                            if (res.code === 0) {
                                that.loading = false;
                                // that.successMsg(that.$t(res.msg));
                                that.SoldDimList = res.result;
                                that.MaterialPagerTo.total = res.pager.totalCount;
                                if (res.result.length === 0) {
                                    // that.errorMsg('暂无查询信息');
                                    return;
                                }
                            } else {
                                that.loading = false;
                                that.errorMsg(that.$t(res.msg));
                            }
                        }
                    );
                }
            },
            selsChangeSoldList(val) {
                // console.log(val);
                let that = this;
                let selsArr = [];
                for (let i = 0; i < val.length; i++) {
                    selsArr.push(val[i].id);
                }
                that.selsSoldId = selsArr.join(',').toString();
            },
            selsChangeMaterial(val) {
                let that = this;
                let selsArr = [];
                for (let i = 0; i < val.length; i++) {
                    selsArr.push(val[i].id);
                }
                that.selsSoldId = selsArr.join(',').toString();
            },
            selsChangedelivery(val) {
                let that = this;
                let selsArr = [];
                for (let i = 0; i < val.length; i++) {
                    selsArr.push(val[i].id);
                }
                that.selsSoldId = selsArr.join(',').toString();
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
            bindingSold(name) {
                let that = this;
                if (name === 'sold') {
                    let data = {
                        // shipperId:that.shipperId.toString(),
                        shipperId: that.shipperId,
                        soldIds: that.selsSoldId
                    };
                    that.confirm('确定绑定关系吗？', function () {
                        util.publicpost(
                            '/shipperSoldRelation/insertShipperSoldRelationPatch',
                            data,
                            function (res) {
                                if (res.code === 0) {
                                    that.$refs.tree.clearSelection();
                                    that.successMsg(that.$t(res.msg));
                                    that.getSoldList();
                                    that.SoldDimSearch('sold');
                                } else {
                                    that.errorMsg(that.$t(res.msg));
                                }
                            }
                        );
                    });
                } else if (name === 'delivery') {
                    let data = {
                        // shipperId:that.shipperId.toString(),
                        shipperId: that.shipperId,
                        deliveryIds: that.selsSoldId
                    };
                    that.confirm('确定绑定关系吗？', function () {
                        util.publicpost(
                            '/shipperDeliveryRelation/insertShipperDeliveryRelationPatch',
                            data,
                            function (res) {
                                if (res.code === 0) {
                                    that.$refs.tree.clearSelection();
                                    that.successMsg(that.$t(res.msg));
                                    that.getDeliveryList();
                                    that.SoldDimSearch('delivery');
                                } else {
                                    that.errorMsg(that.$t(res.msg));
                                }
                            }
                        );
                    });
                } else if (name === 'material') {
                    let data = {
                        // shipperId:that.shipperId.toString(),
                        shipperId: that.shipperId,
                        materialIds: that.selsSoldId
                    };
                    that.confirm('确定绑定关系吗？', function () {
                        util.publicpost(
                            '/shipperMaterialRelation/insert',
                            data,
                            function (res) {
                                if (res.code === 0) {
                                    that.$refs.tree.clearSelection();
                                    that.successMsg(that.$t(res.msg));
                                    that.getMaterialList();
                                    that.SoldDimSearch('material');
                                } else {
                                    that.errorMsg(that.$t(res.msg));
                                }
                            }
                        );
                    });
                }
            },
            // 送达方
            getDeliveryList() {
                let that = this;
                that.loading2 = true;
                // that.shipperId
                util.publicpost(
                    '/shipperDeliveryRelation/selectShipperDeliveryRelationByShipperId',
                    {
                        shipperId: that.shipperId,
                        page: that.DeliveryPager.page,
                        rows: that.DeliveryPager.rows
                    },
                    function (res) {
                        that.loading2 = false;
                        if (res.code === 0) {
                            that.SoldList = res.result;
                            that.DeliveryPager.total = res.pager.totalCount;
                        }
                    }
                );
            },
            /**
             * 五级联动 选择清空
             */
            pyatyiLinkageNo: function (name, _this, Form) {
                if (Form === 'add') {
                    if (name === 'addressed') {
                        _this.addForm.provinceCode = '';
                        _this.addForm.cityCode = '';
                        _this.addForm.districtCode = '';
                        _this.addForm.streetCode = '';

                        _this.addForm.provinceName = '';
                        _this.addForm.cityName = '';
                        _this.addForm.districtName = '';
                        _this.addForm.streetName = '';

                        _this.addressed = [];
                        _this.city = [];
                        _this.county = [];
                        _this.street = [];
                    } else if (name === 'city') {
                        _this.addForm.cityCode = '';
                        _this.addForm.districtCode = '';
                        _this.addForm.streetCode = '';
                        _this.addForm.cityName = '';
                        _this.addForm.districtName = '';
                        _this.addForm.streetName = '';

                        _this.city = [];
                        _this.county = [];
                        _this.street = [];
                    } else if (name === 'county') {
                        _this.addForm.districtCode = '';
                        _this.addForm.streetCode = '';
                        _this.addForm.districtName = '';
                        _this.addForm.streetName = '';
                        _this.county = [];
                        _this.street = [];
                    } else {
                        _this.addForm.streetCode = '';
                        _this.addForm.streetName = '';

                        _this.street = [];
                    }
                } else {
                    if (name === 'addressed') {
                        _this.addForm.provinceCode = '';
                        _this.addForm.cityCode = '';
                        _this.addForm.districtCode = '';
                        _this.addForm.streetCode = '';

                        _this.addForm.provinceName = '';
                        _this.addForm.cityName = '';
                        _this.addForm.districtName = '';
                        _this.addForm.streetName = '';

                        _this.addressed = [];
                        _this.city = [];
                        _this.county = [];
                        _this.street = [];
                    } else if (name === 'city') {
                        _this.addForm.cityCode = '';
                        _this.addForm.districtCode = '';
                        _this.addForm.streetCode = '';
                        _this.addForm.cityName = '';
                        _this.addForm.districtName = '';
                        _this.addForm.streetName = '';

                        _this.city = [];
                        _this.county = [];
                        _this.street = [];
                    } else if (name === 'county') {
                        _this.addForm.districtCode = '';
                        _this.addForm.streetCode = '';
                        _this.addForm.districtName = '';
                        _this.addForm.streetName = '';

                        _this.county = [];
                        _this.street = [];
                    } else {
                        _this.addForm.streetCode = '';
                        _this.addForm.streetName = '';
                        _this.street = [];
                    }
                }
            }
        },
        computed: {
            toggleDrop() {
                return this.showSearch ? 'el-icon-arrow-up' : 'el-icon-arrow-down';
            },
            pictureFlag() {
                return this.updateStatus ? 'picture-card' : 'picture';
            },
            tableListHeight() {
                let computedHeight = $(window).height() - $('.transDrop').height() - $('.add_move').height() - 85;
                return (this.users && this.users.length > 0) ? computedHeight : '120';
            }
        },
        mounted() {
            this.getButtonList();
            this.getShipper();
            window.vue = this;
        }
    };
</script>
<style>
    .shipper_MD_btn {
        width: 100%;
        cursor: pointer;
    }

    .shipperMd_show .show {
        display: none;
    }

    .shipperMd_show .hind {
        display: block;
    }

    .thirdList .el-table__body {
        width: 100%;
    }

    .paddingbtm {
        padding-bottom: 0px !important;
    }

    .hintText {
        border-left: 2px solid #409eff;
        padding-left: 5px;
        height: 20px;
        line-height: 20px;
        margin-top: 6px;
    }

    .shipperList .el-table_1_column_3 .hand {
        cursor: pointer;
    }

    .thirdTo-type {

    }

    .thirdList .mar_tb {
        float: right;
        width: 78%;
        margin: -24px 0 0 0;
    }

    .mar_tb .el-form-item__content {
        float: left;
    }

    .mar_tb .el-input {
        width: 75% !important;

    }

    .mar_tb .el-button {
        float: right;
    }

    .mar_tb .el-form-item__content {
        width: 74%;
    }

    .mar_tb .form .el-form-item {
        width: 100% !important;
    }

    .mar_tb .form .el-form-item--mini {
        width: 100% !important;
    }

    .grid-content .el-form-item--mini {
        width: 100% !important;
    }

    .plantInfo .el-col-12 {
        float: left;
        width: 38%;
    }

    .material_carousel {
        overflow: hidden;
        height: 380px;
    }

    .material_carousel .el-carousel__container {
        height: 380px;
    }

    .material_carousel .image1 {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 380px;
        width: auto;
    }
</style>
