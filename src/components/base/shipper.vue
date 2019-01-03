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
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item :label="$t('shipperThead.shipperName') + '：'">
                                    <el-input v-model="formInline.shipperName" :placeholder="$t('common.pleaseEnter') + $t('shipperThead.shipperName')"
                                              :maxlength='100'></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item :label="$t('shipperThead.shipperCode') + '：'">
                                    <el-input v-model="formInline.shipperCode" :placeholder="$t('common.pleaseEnter') + $t('shipperThead.shipperCode')"
                                              :maxlength='50'></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item :label="$t('shipperThead.shipperType') + '：'">
                                    <el-select v-model="formInline.shipperType" :placeholder="$t('common.pleaseChoose')" clearable>
                                        <el-option
                                                v-for="item in this.dict.shipperTypeEnum"
                                                :key="item.name"
                                                :label="item.des"
                                                :value="item.name">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <!--<el-col :xs="24" :sm="8" :lg="6" :xl="6">-->
                            <!--<el-form-item label="联系人：">-->
                            <!--<el-input v-model="formInline.contactPerson" placeholder="请输入联系人" :maxlength='50'></el-input>-->
                            <!--</el-form-item>-->
                            <!--</el-col>-->
                            <!--<el-col :xs="24" :sm="8" :lg="6" :xl="6">-->
                            <!--<el-form-item label="联系电话：">-->
                            <!--<el-input v-model="formInline.telephone" placeholder="请输入联系电话" :maxlength='11'></el-input>-->
                            <!--</el-form-item>-->
                            <!--</el-col>-->
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item :label="$t('shipperThead.services') + '：'">
                                    <el-select v-model="formInline.services" :placeholder="$t('common.pleaseChoose')" clearable>
                                        <el-option
                                                v-for="item in this.dict.servicesEnum"
                                                :key="item.name"
                                                :label="item.des"
                                                :value="item.name">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item :label="$t('commonThead.status') + '：'">
                                    <el-select v-model="formInline.status" clearable :placeholder="$t('common.pleaseChoose')" class="select" clearable>
                                        <el-option v-for="item in dict.statusEnum" :key="item.name" :label="item.des"
                                                   :value="item.name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="footer-but tar pad_r pad_t">
                            <el-button type="primary" @click="getShipperTo()">{{ $t('button.query') }}</el-button>
                            <el-button @click="resetForm()">{{ $t('button.reset') }}</el-button>
                        </div>
                    </el-form>
                </div>
            </div>
        </el-collapse-transition>

        <!--新增、删除-->
        <div class="add_move def-but">
            <el-button @click="handleAdd" v-if="permissions('base_shipper_add')">{{ $t('button.add') }}</el-button>
            <!-- <el-button @click="handleEdit" :disabled="this.sels.length===0">{{ $t('button.update') }}</el-button> -->
            <!-- <el-button @click="handleView" :disabled="this.sels.length===0">{{ $t('button.view') }}</el-button> -->
            <!-- <el-button @click="handleStart" :disabled="this.sels.length===0">{{ $t('button.enable') }}</el-button>
      <el-button @click="handleForbidden" :disabled="this.sels.length===0">{{ $t('button.disable') }}</el-button>
      <el-button @click="batchRemove" :disabled="this.sels.length===0">{{ $t('button.delete') }}</el-button> -->
            <!-- <el-button @click="centerDialogVisible = true">{{ $t('button.importExcel') }}</el-button>
      <el-button @click="download">{{ $t('button.exportExcel') }}</el-button> -->
        </div>

        <!-- 列表 -->
        <div class="list shipperList list_operation">
            <el-table highlight-current-row :data="users" stripe v-loading="listLoading" @selection-change="selsChange" style="width: 100%;"
                      :fit="true" border align="center" @sort-change="sortChange">
                <!-- <el-table-column type="selection" align="center" isEditing="true" width="55" @click="selsChange()"></el-table-column> -->
                <el-table-column :label="$t('commonThead.index')" align="center" type="index" width="50"></el-table-column>
                <el-table-column :label="$t('shipperThead.shipperName')" prop="shipperName" align="center" isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column :label="$t('shipperThead.shipperCode')" prop="shipperCode" width="120" align="center" sortable="custom"
                                 isEditing="true" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="hand" v-if="permissions('base_shipper_detail')" @click="ClickshipperCode(scope.row)">{{scope.row.shipperCode}}</div>
                        <div class="hand" v-else>{{scope.row.shipperCode}}</div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('shipperThead.shortName')" prop="shortName" align="center" isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column :label="$t('shipperThead.shipperType')" prop="shipperType" align="center" isEditing="true"
                                 :formatter="formatterShipperType" show-overflow-tooltip></el-table-column>
                <el-table-column :label="$t('shipperThead.services')" prop="services" align="center" isEditing="true"
                                 :formatter="formatterServiceType" show-overflow-tooltip></el-table-column>
                <el-table-column :label="$t('shipperThead.businessType')" prop="businessType" align="center" isEditing="true"
                                 :formatter="businessServiceType" show-overflow-tooltip></el-table-column>
                <el-table-column :label="$t('shipperThead.onlineTime')" prop="onlineTime" align="center" isEditing="true"
                                 :formatter="formatterOnline" show-overflow-tooltip></el-table-column>
                <!--<el-table-column label="国家名称" prop="countryName" align="center" isEditing="true" show-overflow-tooltip></el-table-column>-->
                <!--<el-table-column label="省名称" prop="provinceName" align="center" isEditing="true" show-overflow-tooltip></el-table-column>-->
                <!--<el-table-column label="市名称" prop="cityName" align="center" isEditing="true" show-overflow-tooltip></el-table-column>-->
                <!--<el-table-column label="区县名称" prop="districtName" align="center" isEditing="true" show-overflow-tooltip></el-table-column>-->
                <!--<el-table-column label="街道名称" prop="streetName" align="center" isEditing="true" show-overflow-tooltip></el-table-column>-->
                <el-table-column :label="$t('commonThead.address')" prop="address" align="center" isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column :label="$t('commonThead.postcode')" prop="postcode" align="center" isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column :label="$t('commonThead.contactPerson')" prop="contactPerson" align="center" isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column :label="$t('commonThead.telephone')" prop="telephone" align="center" isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column :label="$t('shipperThead.parentName')" prop="parentName" width="130" align="center" isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column :label="$t('commonThead.status')" prop="status" width="130" align="center" isEditing="true"
                                 :formatter="formatStatus" show-overflow-tooltip></el-table-column>
                <!-- <el-table-column :label="创建人" prop="creater" align="center" isEditing="true"></el-table-column>
        <el-table-column :label="创建时间" prop="createTime" align="center" isEditing="true" :formatter="formatter" show-overflow-tooltip></el-table-column> -->
                <el-table-column :label="$t('commonThead.updater')" prop="updater" width="130" align="center" isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column :label="$t('commonThead.updateTime')" prop="updateTime" width="130" align="center" isEditing="true"
                                 :formatter="formatterUpdate" show-overflow-tooltip></el-table-column>
                <el-table-column fixed="right" :label="$t('commonThead.operation')" align="center" width="170">

                    <template slot-scope="scope">
                        <el-tooltip content="修改" placement="top" effect="light" v-if="permissions('base_shipper_update')">
                            <div @click="handleEdit(scope.row)" class="operation_icon icon1"></div>
                        </el-tooltip>
                        <div @click="handleStart(scope.row)" v-if="scope.row.status === 'INEFFECTIVENESS'">
                            <el-tooltip content="启用" placement="top" effect="light" v-if="permissions('base_shipper_enable')">
                                <div class="operation_icon icon2"></div>
                            </el-tooltip>
                        </div>
                        <div @click="handleForbidden(scope.row)" v-if="scope.row.status === 'AVAILABILITY'">
                            <el-tooltip content="禁用" placement="top" effect="light" v-if="permissions('base_shipper_disable')">
                                <div class="operation_icon icon3"></div>
                            </el-tooltip>
                        </div>
                        <el-tooltip content="删除" placement="top" effect="light" v-if="permissions('base_shipper_delete')">
                            <div @click="batchRemove(scope.row)" class="operation_icon icon4"></div>
                        </el-tooltip>
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
        <el-dialog title="文件上传" :visible.sync="centerDialogVisible" width="30%" center>
            <el-upload class="upload-demo" :auto-upload="false" ref="upload"
                       action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
                       :on-remove="handleRemove" :before-remove="beforeRemove"
                       multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
                <el-button size="small" type="primary" class="active">点击上传</el-button>
                <el-button size="small" type="primary" @click="download">下载模板</el-button>
                <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过500kb</div>
            </el-upload>
            <div slot="footer" class="dialog-footer-but">
                <el-button @click="centerDialogVisible = false">{{ $t('button.cancel') }}</el-button>
                <el-button type="primary" @click="submitUpload">{{ $t('button.confirm') }}</el-button>
            </div>
        </el-dialog>


        <!-- 编辑界面 -->
        <el-dialog :visible.sync="editFormVisible" ref='dom' id="popups" :close-on-click-modal="false"
                   @close='closeDialog("editForm")' class="wl-new user-dialog">
            <div class="form">
                <el-tabs v-model="activeName" @tab-click="handleTabs">
                    <el-tab-pane label="货主信息" name="first">
                        <el-form :model="editForm" label-width="110px" :rules="editFormRules" ref="editForm"
                                 size="mini">
                            <el-form-item label="id" style="display:none;">
                                <el-input v-model="editForm.id"></el-input>
                            </el-form-item>

                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="货主名称：" prop="shipperName">
                                        <el-tooltip content="最多输入100个字符" placement="right" effect="light"
                                                    :disabled="disabledTo">
                                            <el-input v-model="editForm.shipperName" :maxlength='100'
                                                      :disabled="disabledTo"></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="货主编码：" prop="shipperCode">
                                        <el-tooltip content="最多输入50个字符,输入内容由数字或字母组成" placement="right" effect="light"
                                                    :disabled="disabledTo">
                                            <el-input v-model="editForm.shipperCode" :maxlength='50'
                                                      :disabled=true></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>

                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="货主简称：" prop="shortName">
                                        <el-tooltip content="最多输入20个字符" placement="right" effect="light"
                                                    :disabled="disabledTo">
                                            <el-input v-model="editForm.shortName" :maxlength='20'
                                                      :disabled="disabledTo"></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="上线时间：" prop="onlineTime">
                                        <el-date-picker
                                                v-model="editForm.onlineTime"
                                                :editable=false
                                                type="date"
                                                placeholder="选择日期时间" :disabled="disabledTo" clearable>
                                        </el-date-picker>
                                    </el-form-item>
                                </div>
                            </el-col>

                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="FWMS的url：" prop="servicesUrl">
                                        <el-tooltip content="最多输入100个字符" placement="right" effect="light">
                                            <el-input v-model="editForm.servicesUrl" :disabled="disabledTo"
                                                      :maxlength='100'></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="地址信息：" prop="address">
                                        <el-tooltip content="最多输入200个字符" placement="right" effect="light"
                                                    :disabled="disabledTo">
                                            <el-input v-model="editForm.address" :maxlength='200'
                                                      :disabled="disabledTo"></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>

                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="邮政编码：" prop="postcode">
                                        <el-tooltip content="最多输入6个字符" placement="right" effect="light"
                                                    :disabled="disabledTo">
                                            <el-input v-model="editForm.postcode" :maxlength='6'
                                                      :disabled="disabledTo"></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="联系人：" prop="contactPerson">
                                        <el-tooltip content="最多输入50个字符" placement="right" effect="light"
                                                    :disabled="disabledTo">
                                            <el-input v-model="editForm.contactPerson" :maxlength='50'
                                                      :disabled="disabledTo"></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>

                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="联系电话：" prop="telephone">
                                        <el-tooltip content="最多输入11个字符" placement="right" effect="light"
                                                    :disabled="disabledTo">
                                            <el-input v-model="editForm.telephone" :maxlength='11'
                                                      :disabled="disabledTo"></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="服务类型：" prop="services">
                                        <el-select v-model="editForm.services" filterable placeholder="请选择"
                                                   :disabled="disabledTo" clearable>
                                            <el-option
                                                    v-for="item in this.dict.servicesEnum"
                                                    :key="item.name"
                                                    :label="item.des"
                                                    :value="item.name">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </el-col>

                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="上级编码：" prop="partentId">
                                        <!--<el-input v-model="addForm.partentId"></el-input>-->
                                        <el-tooltip content="最多输入50个字符" placement="right" effect="light"
                                                    :disabled="disabledTo" clearable>
                                            <el-select
                                                    v-model="editForm.parentId"
                                                    filterable
                                                    remote
                                                    reserve-keyword
                                                    placeholder="请输入关键词"
                                                    :remote-method="remoteMethod"
                                                    :maxlength='50'
                                                    :disabled=true

                                            >
                                                <el-option
                                                        v-for="(item, index) in parentList"
                                                        :key="item.value + '-' + index"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="货主类型：" prop="shipperType">
                                        <el-select v-model="editForm.shipperType" filterable placeholder="请选择"
                                                   :disabled="disabledTo" clearable>
                                            <el-option
                                                    v-for="item in this.dict.shipperTypeEnum"
                                                    :key="item.name"
                                                    :label="item.des"
                                                    :value="item.name"
                                            >
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </el-col>

                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="业务类型：" prop="businessType">
                                        <el-select v-model="editForm.businessType" filterable placeholder="请选择"
                                                   :disabled="disabledTo" clearable>
                                            <el-option
                                                    v-for="item in this.dict.businessTypeEnum"
                                                    :key="item.code"
                                                    :label="item.des"
                                                    :value="String( item.name)"
                                            >
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </el-col>


                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="国家名称：" prop="countryId">
                                        <el-select v-model="editForm.countryId"
                                                   @change="addressChange('addressed', editForm.countryId)" filterable
                                                   placeholder="请选择" :disabled="disabledTo" clearable>
                                            <el-option
                                                    v-for="item in address"
                                                    :key="item.id"
                                                    :label="item.fullName"
                                                    :value="item.id"
                                            >
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="省名称：" prop="provinceId">
                                        <el-select v-model="editForm.provinceId"
                                                   @change="addressChange('city', editForm.provinceId)" filterable
                                                   placeholder="请选择" :disabled="disabledTo" clearable>
                                            <el-option v-for="item in addressed"
                                                       :key="item.id"
                                                       :label="item.fullName"
                                                       :value="item.id"
                                            >
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </el-col>

                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="市名称：" prop="cityId">
                                        <el-select v-model="editForm.cityId"
                                                   @change="addressChange('county',editForm.cityId)" filterable
                                                   placeholder="请选择" :disabled="disabledTo" clearable>
                                            <el-option v-for="item in city"
                                                       :key="item.id"
                                                       :label="item.fullName"
                                                       :value="item.id"
                                            >
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="区县名称：" prop="districtId">
                                        <el-select v-model="editForm.districtId"
                                                   @change="addressChange('street',editForm.districtId)" filterable
                                                   placeholder="请选择" :disabled="disabledTo" clearable>
                                            <el-option v-for="item in county"
                                                       :key="item.id"
                                                       :label="item.fullName"
                                                       :value="item.id"
                                            >
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </el-col>

                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="街道名称：" prop="streetId">
                                        <el-select v-model="editForm.streetId" filterable placeholder="请选择"
                                                   :disabled="disabledTo" clearable>
                                            <el-option v-for="item in street"
                                                       :key="item.id"
                                                       :label="item.fullName"
                                                       :value="item.id"
                                            >
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </el-col>

                            <el-row class="btn">
                                <el-col :span="12">
                                    <!--<el-button @click.native="editFormVisible = false">{{ $t('button.cancel') }}</el-button>-->
                                    <el-button @click.native="off('editForm')">{{ $t('button.cancel') }}</el-button>
                                    <el-button @click.native="editSubmit('editForm')" :disabled="disabledTo" v-show="!disabledTo">{{
                                        $t('button.save') }}
                                    </el-button>
                                </el-col>
                            </el-row>
                        </el-form>
                    </el-tab-pane>

                    <el-tab-pane label="工厂" name="second">
                        <div class="list">
                            <el-table height="220" width="100%" :data="gteUserList" v-loading="loading" :fit="true"
                                      align="center">
                                <el-table-column label="序号" type="index" align="center"></el-table-column>
                                <el-table-column label="工厂编码" prop="factoryLogisticsCode" align="center"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column label="工厂名称" prop="factoryLogisticsName" align="center"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column label="库存地" prop="inventoryCode" align="center"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column prop="note" label="操作" align="center" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <el-button  size="small" @click.native="deleteFactory(scope.row)"
                                                   :disabled="disabledTo">{{ $t('button.delete') }}
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="block">
                                <el-pagination
                                        layout="total,prev, pager, next"
                                        @current-change="ChangePage"
                                        :current-page="this.UserPager.page"
                                        :page-size="this.UserPager.rows"
                                        :total="this.UserPager.total"
                                        :disabled="disabledTo"
                                        clearable
                                >
                                </el-pagination>
                            </div>
                            <el-form size="mini" label-width="140px" style="margin-top:20px;">
                                <!-- <el-row>
                              <el-col :span="12">
                                  <div class="grid-content">
                                      <el-form-item label="工厂名称：" prop="factoryLogisticsId">
                                          <el-input placeholder="根据名称模糊查询" v-model="factoryLogisticsId"></el-input>
                                      </el-form-item>
                                  </div>
                              </el-col>
                              <el-col :span="12">
                                  <div class="grid-content">
                                      <el-form-item label="库存地：" prop="inventoryCode">
                                          <el-input v-model="inventoryCode"></el-input>
                                      </el-form-item>
                                  </div>
                              </el-col>
                          </el-row> -->
                                <el-row class="plantInfo">
                                    <el-col :span="12">
                                        <div class="grid-content">
                                            <el-form-item label="工厂名称：" prop="factoryLogisticsId">
                                                <el-col :span="12">
                                                    <el-autocomplete
                                                            class="inline-input"
                                                            v-model="state"
                                                            :fetch-suggestions="querySearch"
                                                            placeholder="根据名称模糊查询"
                                                            @select="handleSelect"
                                                            :trigger-on-focus="false"
                                                            @blur="blur"
                                                            :disabled="disabledTo"
                                                            clearable
                                                    ></el-autocomplete>
                                                    <!-- <el-select v-model="factoryLogisticsId" filterable placeholder="根据名称模糊查询"  @change="querySearch">
                                            <el-option
                                              v-for="item in searchList"
                                              :key="item.value"
                                              :label="item.label"
                                              :value="item.value"
                                              >
                                            </el-option>
                                          </el-select> -->
                                                </el-col>


                                                <!-- <el-input placeholder="根据名称模糊查询" v-model="insertFactoryShipperRelation.factoryLogisticsId"></el-input> -->
                                            </el-form-item>
                                        </div>

                                    </el-col>

                                    <el-col :span="12">
                                        <div class="grid-content">
                                            <el-form-item label="库存地：" prop="inventoryCode">
                                                <el-input placeholder="请输入库存地编码" v-model="inventoryCode"
                                                          :disabled="disabledTo"></el-input>
                                            </el-form-item>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-form>
                            <el-row class="btn1">
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-button @click.native="bindingPlant" class="width200"
                                                   :disabled="this.disabledBindFactory">{{ $t('button.bindFactory') }}
                                        </el-button>
                                        <el-button @click.native="off">{{ $t('button.cancel') }}</el-button>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </el-tab-pane>

                    <el-tab-pane label="售达方" name="third">
                        <div class="list thirdList">
                            <div class="thirdType">
                                <div class="hintText lf">售达方管理</div>
                                <div class="thirdTo-type">
                                    <div class="hintText lf">查询售达方</div>
                                    <el-form size="mini" class="mar_tb search-mid-form">
                                        <el-row>
                                            <el-col :span="12">
                                                <div class="grid-content">
                                                    <el-form-item label="售达方名称：" prop="">
                                                        <el-input placeholder="根据售达方名称模糊查询" v-model="SoldDimText"
                                                                  :disabled="disabledTo" clearable></el-input>
                                                        <el-button @click.native="SoldDimSearch('sold')"
                                                                   :disabled="disabledTo">{{ $t('button.query') }}
                                                        </el-button>
                                                    </el-form-item>
                                                </div>
                                            </el-col>
                                            <!-- <el-col :span="12">
                                      <div class="grid-content">

                                      </div>
                                  </el-col> -->
                                        </el-row>
                                    </el-form>

                                </div>
                            </div>
                            <el-table height="220" width="100%" :fit="true" :data="SoldList" align="center"
                                      v-loading="loading" class="third_table lf no-margin-bottom" ref="tree">
                                <el-table-column label="序号" type="index" align="center"></el-table-column>
                                <el-table-column label="售达方编码" prop="soldCode" align="center"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column label="售达方" prop="soldName" align="center"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column prop="note" label="操作" align="center" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <el-button  size="small" @click.native="deleteSold(scope.row,'sold')"
                                                   :disabled="disabledTo">{{ $t('button.delete') }}
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-table height="220" width="100%" :fit="true" v-loading="loading1" :data="SoldDimList"
                                      align="center" class="third_table rf no-margin-bottom"
                                      @selection-change="selsChangeSoldList" ref="tree">
                                <el-table-column type="selection" align="center"></el-table-column>
                                <el-table-column label="序号" type="index" align="center"></el-table-column>
                                <el-table-column label="售达方编码" prop="soldCode" align="center"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column label="售达方" prop="soldName" align="center"
                                                 show-overflow-tooltip></el-table-column>
                            </el-table>
                            <div class="block1 TextLeft">
                                <el-pagination
                                        layout="total,prev, pager, next"
                                        @current-change="SoldPage"
                                        :current-page="this.SoldPager.page"
                                        :page-size="this.SoldPager.rows"
                                        :total="this.SoldPager.total"
                                        :disabled="disabledTo" clearable>
                                </el-pagination>
                            </div>
                            <div class="block1 TextRight">
                                <el-pagination
                                        layout="total,prev, pager, next"
                                        @current-change="SoldPageTo"
                                        :current-page="this.SoldPagerTo.page"
                                        :page-size="this.SoldPagerTo.rows"
                                        :total="this.SoldPagerTo.total"
                                        :disabled="disabledTo" clearable>
                                </el-pagination>
                            </div>
                            <el-row class="btn2">
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-button @click.native="bindingSold('sold')"
                                                   :disabled="this.selsSoldId === null || this.selsSoldId === ''"
                                                   class="width200">{{ $t('button.bindSold') }}
                                        </el-button>
                                        <el-button @click.native="off">{{ $t('button.cancel') }}</el-button>
                                    </div>
                                </el-col>
                            </el-row>

                        </div>
                    </el-tab-pane>

                    <el-tab-pane label="送达方" name="fourth">
                        <div class="list thirdList">
                            <div class="thirdType">
                                <div class="hintText lf">送达方管理</div>
                                <div class="thirdTo-type">
                                    <div class="hintText lf">查询送达方</div>
                                    <el-form size="mini" class="mar_tb search-mid-form">
                                        <el-row>
                                            <el-col :span="12">
                                                <div class="grid-content">
                                                    <el-form-item label="送达方名称：" prop="">
                                                        <el-input placeholder="根据送达方名称模糊查询" v-model="SoldDimText"
                                                                  :disabled="disabledTo" clearable></el-input>
                                                        <el-button @click.native="SoldDimSearch('delivery')"
                                                                   :disabled="disabledTo">{{ $t('button.query') }}
                                                        </el-button>
                                                    </el-form-item>
                                                </div>
                                            </el-col>
                                            <!-- <el-col :span="12">
                                    <div class="grid-content">

                                    </div>
                                </el-col> -->
                                        </el-row>
                                    </el-form>

                                </div>
                            </div>
                            <el-table height="220" width="100%" :fit="true" :data="SoldList" v-loading="loading2"
                                      align="center" class="no-margin-bottom lf" ref="tree">
                                <el-table-column label="序号" type="index" align="center"></el-table-column>
                                <el-table-column label="送达方编码" prop="deliveryCode" align="center"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column label="送达方" prop="deliveryName" align="center"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column prop="note" label="操作" align="center" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <!--  v-if="this.disabledTo" -->
                                        <el-button  size="small" :disabled="disabledTo"
                                                   @click.native="deleteSold(scope.row,'delivery')">{{ $t('button.delete') }}
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-table height="220" width="100%" :fit="true" :data="SoldDimList" v-loading="loading3"
                                      align="center" class="no-margin-bottom rf" @selection-change="selsChangedelivery"
                                      ref="tree">
                                <el-table-column type="selection" align="center"></el-table-column>
                                <el-table-column label="序号" type="index" align="center"></el-table-column>
                                <el-table-column label="送达方编码" prop="deliveryCode" align="center"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column label="送达方" prop="deliveryName" align="center"
                                                 show-overflow-tooltip></el-table-column>
                            </el-table>
                            <div class="block1 TextLeft">
                                <el-pagination
                                        layout="total,prev, pager, next"
                                        @current-change="DeliveryPage"
                                        :current-page="this.DeliveryPager.page"
                                        :page-size="this.DeliveryPager.rows"
                                        :total="this.DeliveryPager.total"
                                        :disabled="disabledTo" clearable>
                                </el-pagination>
                            </div>
                            <div class="block1 TextRight">
                                <el-pagination
                                        layout="total,prev, pager, next"
                                        @current-change="DeliveryPageTo"
                                        :current-page="this.DeliveryPagerTo.page"
                                        :page-size="this.DeliveryPagerTo.rows"
                                        :total="this.DeliveryPagerTo.total"
                                        :disabled="disabledTo" clearable>
                                </el-pagination>
                            </div>


                            <el-row class="btn3">
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-button @click.native="bindingSold('delivery')" class="width200"
                                                   :disabled="this.selsSoldId === null || this.selsSoldId === ''">{{ $t('button.bindDelivery') }}
                                        </el-button>
                                        <el-button @click.native="off">{{ $t('button.cancel') }}</el-button>
                                    </div>
                                </el-col>
                            </el-row>

                        </div>
                    </el-tab-pane>

                    <el-tab-pane label="物料" name="fifth">
                        <div class="list thirdList">
                            <div class="thirdType">
                                <div class="hintText lf">物料管理</div>
                                <div class="thirdTo-type">
                                    <div class="hintText lf">查询物料</div>
                                    <el-form size="mini" class="mar_tb search-mid-form">
                                        <el-row>
                                            <el-col :span="12">
                                                <div class="grid-content">
                                                    <el-form-item label="物料名称：" prop="">
                                                        <el-input placeholder="根据物料名称模糊查询" v-model="SoldDimText"
                                                                  :disabled="disabledTo" clearable></el-input>
                                                        <el-button @click.native="SoldDimSearch('material')"
                                                                   :disabled="disabledTo">{{ $t('button.query') }}
                                                        </el-button>
                                                    </el-form-item>
                                                </div>
                                            </el-col>
                                            <!-- <el-col :span="12">
                              <div class="grid-content">

                              </div>
                          </el-col> -->
                                        </el-row>
                                    </el-form>

                                </div>
                            </div>
                            <el-table height="220" width="100%" :fit="true" :data="MaterialList" align="center"
                                      v-loading="loading" class="third_table lf no-margin-bottom" ref="tree">
                                <el-table-column label="序号" type="index" align="center"></el-table-column>
                                <el-table-column label="物料编码" prop="materialCode" align="center"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column label="物料名称" prop="materialName" align="center"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column prop="note" label="操作" align="center" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <el-button  size="small"
                                                   @click.native="deleteSold(scope.row,'material')"
                                                   :disabled="disabledTo">{{ $t('button.delete') }}
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-table height="220" width="100%" :fit="true" v-loading="loading1" :data="SoldDimList"
                                      align="center" class="third_table rf no-margin-bottom"
                                      @selection-change="selsChangeMaterial" ref="tree">
                                <el-table-column type="selection" align="center"></el-table-column>
                                <el-table-column label="序号" type="index" align="center"></el-table-column>
                                <el-table-column label="物料编码" prop="materialCode" align="center"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column label="物料名称" prop="materialName" align="center"
                                                 show-overflow-tooltip></el-table-column>
                            </el-table>
                            <div class="block1 TextLeft">
                                <el-pagination
                                        layout="total,prev, pager, next"
                                        @current-change="MaterialPage"
                                        :current-page="this.MaterialPager.page"
                                        :page-size="this.MaterialPager.rows"
                                        :total="this.MaterialPager.total"
                                        :disabled="disabledTo" clearable>
                                </el-pagination>
                            </div>
                            <div class="block1 TextRight">
                                <el-pagination
                                        layout="total,prev, pager, next"
                                        @current-change="MaterialPageTo"
                                        :current-page="this.MaterialPagerTo.page"
                                        :page-size="this.MaterialPagerTo.rows"
                                        :total="this.MaterialPagerTo.total"
                                        :disabled="disabledTo" clearable>
                                </el-pagination>
                            </div>
                            <el-row class="btn2">
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-button @click.native="bindingSold('material')"
                                                   :disabled="this.selsSoldId === null || this.selsSoldId === ''"
                                                   class="width200">{{ $t('button.bindMateriel') }}
                                        </el-button>
                                        <el-button @click.native="off">{{ $t('button.cancel') }}</el-button>
                                    </div>
                                </el-col>
                            </el-row>

                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <!-- <div slot="footer" class="dialog-footer">
        <el-button @click.native="editSubmit">{{ $t('button.update') }}</el-button>
        <el-button @click.native="editFormVisible = false">{{ $t('button.cancel') }}</el-button>
      </div> -->
        </el-dialog>

        <!-- 新增界面 -->
        <el-dialog :visible.sync="addFormVisible" :close-on-click-modal="false" @close='closeDialog("addForm")'
                   class="wl-new user-dialog">
            <div class="form">
                <el-tabs v-model="activeName" @tab-click="handleTabs">
                    <el-tab-pane label="货主信息" name="first">
                        <el-form :model="addForm" label-width="110px" :rules="addFormRules" ref="addForm" size="mini">

                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="货主名称：" prop="shipperName">
                                        <el-tooltip content="最多输入100个字符" placement="right" effect="light">
                                            <el-input v-model="addForm.shipperName" :maxlength='100'></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="货主编码：" prop="shipperCode">
                                        <el-tooltip content="最多输入50个字符,输入内容由数字或字母组成" placement="right" effect="light">
                                            <el-input v-model="addForm.shipperCode" :maxlength='50'></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>


                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="货主简称：" prop="shortName">
                                        <el-tooltip content="最多输入20个字符" placement="right" effect="light">
                                            <el-input v-model="addForm.shortName" :maxlength='20'></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="上线时间：" prop="onlineTime">
                                        <el-date-picker style="width: 200px;"
                                                        v-model="addForm.onlineTime"
                                                        type="date"
                                                        :editable=false
                                                        placeholder="选择日期时间" clearable>
                                        </el-date-picker>
                                    </el-form-item>
                                </div>
                            </el-col>

                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="FWMS的url：" prop="servicesUrl">
                                        <el-tooltip content="最多输入100个字符" placement="right" effect="light">
                                            <el-input v-model="addForm.servicesUrl" :maxlength='100'></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="地址信息：" prop="address">
                                        <el-tooltip content="最多输入200个字符" placement="right" effect="light">
                                            <el-input v-model="addForm.address" :maxlength='200'></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>

                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="邮政编码：" prop="postcode">
                                        <el-tooltip content="最多输入6个字符" placement="right" effect="light">
                                            <el-input v-model="addForm.postcode" :maxlength='6'></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="联系人：" prop="contactPerson">
                                        <el-tooltip content="最多输入50个字符" placement="right" effect="light">
                                            <el-input v-model="addForm.contactPerson" :maxlength='50'></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>

                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="联系电话：" prop="telephone">
                                        <el-tooltip content="最多输入11个字符" placement="right" effect="light">
                                            <el-input v-model="addForm.telephone" :maxlength='11'></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="服务类型：" prop="services">
                                        <el-select v-model="addForm.services" filterable placeholder="请选择" clearable>
                                            <el-option
                                                    v-for="item in this.dict.servicesEnum"
                                                    :key="item.name"
                                                    :label="item.des"
                                                    :value="item.name" >
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </el-col>

                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="上级编码：" prop="partentId">
                                        <!--<el-input v-model="addForm.partentId"></el-input>-->
                                        <el-tooltip content="最多输入50个字符" placement="right" effect="light">
                                            <el-select
                                                    v-model="addForm.partentId"
                                                    filterable
                                                    remote
                                                    reserve-keyword
                                                    placeholder="请输入关键词"
                                                    :remote-method="remoteMethod"
                                                    @change="gitPartentId"
                                                    :maxlength='50'
                                                    clearable
                                            >
                                                <el-option
                                                        v-for="(item, index) in parentList"
                                                        :key="item.value + '-' + index"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="货主类型：" prop="shipperType">
                                        <el-select v-model="addForm.shipperType" filterable placeholder="请选择" clearable>
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
                                    <el-form-item label="业务类型：" prop="businessType">
                                        <el-select v-model="addForm.businessType" filterable placeholder="请选择" clearable>
                                            <el-option
                                                    v-for="item in this.dict.businessTypeEnum"
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
                                    <el-form-item label="国家名称：" prop="countryId">
                                        <el-select v-model="addForm.countryId"
                                                   @change="addressChange('addressed', addForm.countryId)"
                                                   filterable placeholder="请选择" clearable>
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
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="省名称：" prop="provinceId">
                                        <el-select v-model="addForm.provinceId"
                                                   @change="addressChange('city', addForm.provinceId)" filterable
                                                   placeholder="请选择" clearable>
                                            <el-option v-for="item in addressed"
                                                       :key="item.id"
                                                       :label="item.fullName"
                                                       :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </el-col>

                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="市名称：" prop="cityId">
                                        <el-select v-model="addForm.cityId"
                                                   @change="addressChange('county',addForm.cityId)" filterable
                                                   placeholder="请选择" clearable>
                                            <el-option v-for="item in city"
                                                       :key="item.id"
                                                       :label="item.fullName"
                                                       :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="区县名称：" prop="districtId">
                                        <el-select v-model="addForm.districtId"
                                                   @change="addressChange('street',addForm.districtId)" filterable
                                                   placeholder="请选择" clearable>
                                            <el-option v-for="item in county"
                                                       :key="item.id"
                                                       :label="item.fullName"
                                                       :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </el-col>

                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="街道名称：" prop="streetId">
                                        <el-select v-model="addForm.streetId" filterable placeholder="请选择" clearable>
                                            <el-option v-for="item in street"
                                                       :key="item.id"
                                                       :label="item.fullName"
                                                       :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </el-col>

                            <el-row class="btn">
                                <el-col :span="12">
                                    <el-button @click.native="off('addForm')">{{ $t('button.cancel') }}</el-button>
                                    <el-button @click.native="addSubmit('addForm')" :loading="addLoading">{{ $t('button.save') }}</el-button>
                                </el-col>
                            </el-row>
                        </el-form>

                    </el-tab-pane>

                    <el-tab-pane label="工厂" name="second">
                        <div class="list">
                            <el-table height="220" width="100%" :data="gteUserList" v-loading="loading" :fit="true"
                                      align="center">
                                <el-table-column label="序号" type="index" align="center"></el-table-column>
                                <el-table-column label="工厂编码" prop="factoryLogisticsCode" align="center"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column label="工厂名称" prop="factoryLogisticsName" align="center"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column label="库存地" prop="inventoryCode" align="center"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column prop="note" label="操作" align="center" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <el-button :disabled="visible.selDisableT"  size="small"
                                                   @click.native.prevent="deleteFactory(scope.row)">{{ $t('button.delete') }}
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="block">
                                <el-pagination
                                        layout="total,prev, pager, next"
                                        @current-change="ChangePage"
                                        :current-page="this.UserPager.page"
                                        :page-size="this.UserPager.rows"
                                        :total="this.UserPager.total"
                                        clearable
                                >
                                </el-pagination>
                            </div>

                            <el-form size="mini" label-width="140px" style="margin-top:20px;">
                                <el-row class="plantInfo">
                                    <el-col :span="12">
                                        <div class="grid-content">
                                            <el-form-item label="工厂名称：" prop="factoryLogisticsId">
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
                                                    <!-- <el-select v-model="factoryLogisticsId" filterable placeholder="根据名称模糊查询"  @change="querySearch">
                                            <el-option
                                              v-for="item in searchList"
                                              :key="item.value"
                                              :label="item.label"
                                              :value="item.value"
                                              >
                                            </el-option>
                                          </el-select> -->
                                                </el-col>


                                                <!-- <el-input placeholder="根据名称模糊查询" v-model="insertFactoryShipperRelation.factoryLogisticsId"></el-input> -->
                                            </el-form-item>
                                        </div>

                                    </el-col>

                                    <el-col :span="12">
                                        <div class="grid-content">
                                            <el-form-item label="库存地：" prop="inventoryCode">
                                                <el-input placeholder="请输入库存地编码" v-model="inventoryCode"></el-input>
                                            </el-form-item>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row class="btn1">
                                    <el-col :span="12">
                                        <div class="grid-content">
                                            <el-button @click.native="bindingPlant" class="width200">{{ $t('button.bindFactory') }}</el-button>
                                            <el-button @click.native="off">{{ $t('button.cancel') }}</el-button>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-form>

                        </div>
                    </el-tab-pane>

                    <el-tab-pane label="售达方" name="third">
                        <div class="list thirdList">
                            <div class="thirdType">
                                <div class="hintText lf">售达方管理</div>
                                <div class="thirdTo-type">
                                    <div class="hintText lf">查询售达方</div>
                                    <el-form size="mini" class="mar_tb search-mid-form">
                                        <el-row>
                                            <el-col :span="12">
                                                <div class="grid-content">
                                                    <el-form-item label="售达方名称：" prop="">
                                                        <el-input placeholder="根据售达方名称模糊查询"
                                                                  v-model="SoldDimText" clearable></el-input>
                                                        <el-button @click.native="SoldDimSearch('sold')">{{ $t('button.query') }}</el-button>
                                                    </el-form-item>
                                                </div>
                                            </el-col>
                                            <!-- <el-col :span="12">
                                        <div class="grid-content">

                                        </div>
                                    </el-col> -->
                                        </el-row>
                                    </el-form>
                                </div>
                            </div>
                            <el-table height="220" width="100%" :fit="true" :data="SoldList" v-loading="loading"
                                      align="center" class="third_table lf no-margin-bottom">
                                <el-table-column label="序号" type="index" align="center"></el-table-column>
                                <el-table-column label="售达方编码" prop="soldCode" align="center"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column label="售达方" prop="soldName" align="center"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column prop="note" label="操作" align="center" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <el-button :disabled="visible.selDisableT"  size="small"
                                                   @click.native.prevent="deleteSold(scope.row,'sold')">{{ $t('button.delete') }}
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>

                            <el-table height="220" width="100%" :fit="true" :data="SoldDimList" v-loading="loading1"
                                      align="center" class="third_table rf no-margin-bottom"
                                      @selection-change="selsChangeSoldList" ref="tree">
                                <el-table-column type="selection" align="center"></el-table-column>
                                <el-table-column label="序号" type="index" align="center"></el-table-column>
                                <el-table-column label="售达方编码" prop="soldCode" align="center"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column label="售达方" prop="soldName" align="center"
                                                 show-overflow-tooltip></el-table-column>
                            </el-table>
                            <div class="block1 TextLeft">
                                <el-pagination
                                        layout="total,prev, pager, next"
                                        @current-change="SoldPage"
                                        :current-page="this.SoldPager.page"
                                        :page-size="this.SoldPager.rows"
                                        :total="this.SoldPager.total" clearable>
                                </el-pagination>
                            </div>
                            <div class="block1 TextRight">
                                <el-pagination
                                        layout="total,prev, pager, next"
                                        @current-change="SoldPageTo"
                                        :current-page="this.SoldPagerTo.page"
                                        :page-size="this.SoldPagerTo.rows"
                                        :total="this.SoldPagerTo.total" clearable>
                                </el-pagination>
                            </div>


                            <el-row class="btn2">
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-button @click.native="bindingSold('sold')" class="width200"
                                                   :disabled="visible.selDisableT">{{ $t('button.bindSold') }}
                                        </el-button>
                                        <el-button @click.native="off">{{ $t('button.cancel') }}</el-button>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </el-tab-pane>

                    <el-tab-pane label="送达方" name="fourth">
                        <div class="list thirdList">
                            <div class="thirdType">
                                <div class="hintText lf">送达方管理</div>
                                <div class="thirdTo-type">
                                    <div class="hintText lf">查询送达方</div>
                                    <el-form size="mini" class="mar_tb search-mid-form">
                                        <el-row>
                                            <el-col :span="12">
                                                <div class="grid-content">
                                                    <el-form-item label="送达方名称：" prop="">
                                                        <el-input placeholder="根据送达方名称模糊查询"
                                                                  v-model="SoldDimText" clearable></el-input>
                                                        <el-button @click.native="SoldDimSearch('delivery')">{{ $t('button.query') }}
                                                        </el-button>
                                                    </el-form-item>
                                                </div>
                                            </el-col>
                                            <!-- <el-col :span="12">
                                      <div class="grid-content">

                                      </div>
                                  </el-col> -->
                                        </el-row>
                                    </el-form>

                                </div>
                            </div>
                            <el-table height="220" width="100%" :fit="true" :data="SoldList" v-loading="loading2"
                                      align="center" class="no-margin-bottom lf">
                                <el-table-column label="序号" type="index" align="center"></el-table-column>
                                <el-table-column label="送达方编码编码" prop="deliveryCode" align="center"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column label="送达方" prop="deliveryName" align="center"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column prop="note" label="操作" align="center" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <el-button :disabled="visible.selDisableT"  size="small"
                                                   @click.native.prevent="deleteSold(scope.row,'delivery')">{{ $t('button.delete') }}
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-table height="220" width="100%" :fit="true" :data="SoldDimList" v-loading="loading3"
                                      align="center" class="no-margin-bottom rf" @selection-change="selsChangedelivery"
                                      ref="tree">
                                <el-table-column type="selection" align="center"></el-table-column>
                                <el-table-column label="序号" type="index" align="center"></el-table-column>
                                <el-table-column label="送达方编码" prop="deliveryCode" align="center"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column label="送达方" prop="deliveryName" align="center"
                                                 show-overflow-tooltip></el-table-column>
                            </el-table>
                            <div class="block1 TextLeft">
                                <el-pagination
                                        layout="total,prev, pager, next"
                                        @current-change="DeliveryPage"
                                        :current-page="this.DeliveryPager.page"
                                        :page-size="this.DeliveryPager.rows"
                                        :total="this.DeliveryPager.total" clearable>
                                </el-pagination>
                            </div>
                            <div class="block1 TextRight">
                                <el-pagination
                                        layout="total,prev, pager, next"
                                        @current-change="DeliveryPageTo"
                                        :current-page="this.DeliveryPagerTo.page"
                                        :page-size="this.DeliveryPagerTo.rows"
                                        :total="this.DeliveryPagerTo.total" clearable>
                                </el-pagination>
                            </div>


                            <el-row class="btn3">
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-button @click.native="bindingSold('delivery')" class="width200"
                                                   :disabled="visible.selDisableT">{{ $t('button.bindDelivery') }}
                                        </el-button>
                                        <el-button @click.native="off">{{ $t('button.cancel') }}</el-button>
                                    </div>
                                </el-col>
                            </el-row>

                        </div>
                    </el-tab-pane>

                    <el-tab-pane label="物料" name="fifth">
                        <div class="list thirdList">
                            <div class="thirdType">
                                <div class="hintText lf">物料管理</div>
                                <div class="thirdTo-type">
                                    <div class="hintText lf">查询物料</div>
                                    <el-form size="mini" class="mar_tb search-mid-form">
                                        <el-row>
                                            <el-col :span="12">
                                                <div class="grid-content">
                                                    <el-form-item label="物料名称：" prop="">
                                                        <el-input placeholder="根据物料名称模糊查询"
                                                                  v-model="SoldDimText" clearable></el-input>
                                                        <el-button @click.native="SoldDimSearch('material')">{{ $t('button.query') }}
                                                        </el-button>
                                                    </el-form-item>
                                                </div>
                                            </el-col>
                                            <!-- <el-col :span="12">
                              <div class="grid-content">

                              </div>
                          </el-col> -->
                                        </el-row>
                                    </el-form>
                                </div>
                            </div>
                            <el-table height="220" width="100%" :fit="true" :data="MaterialList" v-loading="loading"
                                      align="center" class="third_table lf no-margin-bottom">
                                <el-table-column label="序号" type="index" align="center"></el-table-column>
                                <el-table-column label="物料编码" prop="materialCode" align="center"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column label="物料名称" prop="materialName" align="center"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column prop="note" label="操作" align="center" show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <el-button :disabled="visible.selDisableT"  size="small"
                                                   @click.native.prevent="deleteSold(scope.row,'material')">{{ $t('button.delete') }}
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>

                            <el-table height="220" width="100%" :fit="true" :data="SoldDimList" v-loading="loading1"
                                      align="center" class="third_table rf no-margin-bottom"
                                      @selection-change="selsChangeMaterial" ref="tree">
                                <el-table-column type="selection" align="center"></el-table-column>
                                <el-table-column label="序号" type="index" align="center"></el-table-column>
                                <el-table-column label="物料编码" prop="materialCode" align="center"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column label="物料名称" prop="materialName" align="center"
                                                 show-overflow-tooltip></el-table-column>
                            </el-table>
                            <div class="block1 TextLeft">
                                <el-pagination
                                        layout="total,prev, pager, next"
                                        @current-change="MaterialPage"
                                        :current-page="this.MaterialPager.page"
                                        :page-size="this.MaterialPager.rows"
                                        :total="this.MaterialPager.total" clearable>
                                </el-pagination>
                            </div>
                            <div class="block1 TextRight">
                                <el-pagination
                                        layout="total,prev, pager, next"
                                        @current-change="MaterialPageTo"
                                        :current-page="this.MaterialPagerTo.page"
                                        :page-size="this.MaterialPagerTo.rows"
                                        :total="this.MaterialPagerTo.total" clearable>
                                </el-pagination>
                            </div>


                            <el-row class="btn2">
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-button @click.native="bindingSold('material')" class="width200"
                                                   :disabled="visible.selDisableT">{{ $t('button.bindMateriel') }}
                                        </el-button>
                                        <el-button @click.native="off">{{ $t('button.cancel') }}</el-button>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>

        </el-dialog>
    </div>
</template>


<script>
    import util from '../../common/js/util';

    export default {
        data() {
            return {
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
                trigger: 'blur',
                editFormRules: {
                    shipperName: [
                        {required: true, message: '请输入货主名称', trigger: this.trigger},
                        {required: true, message: '', trigger: this.trigger, validator: this.stripscriptTo}
                    ],
                    shipperCode: [
                        {required: true, message: '请输入货主编码', trigger: this.trigger},
                        {required: true, message: '', trigger: this.trigger, validator: this.validCode}
                    ],
                    shortName: [
                        {required: true, message: '请输入货主简称', trigger: this.trigger},
                        {required: true, message: '', trigger: this.trigger, validator: this.stripscriptTo}
                    ],
                    address: [
                        {required: true, message: '请输入地址信息', trigger: this.trigger},
                        {required: true, message: '', trigger: this.trigger, validator: this.stripscriptTo}
                    ],
                    postcode: [
                        {required: true, message: '请输入邮编', trigger: this.trigger},
                        {required: true, message: '', trigger: this.trigger, validator: this.isPostalCodeTo}
                    ],
                    contactPerson: [
                        {required: true, message: '请输入联系人', trigger: this.trigger}
                        // { required: true, message: '', trigger: this.trigger, validator: this.isPostalCodeTo }
                    ],
                    telephone: [
                        {required: true, message: '请输入联系方式', trigger: this.trigger},
                        {required: true, message: '', trigger: this.trigger, validator: this.validPhone}
                    ],
                    services: [{required: true, message: '请选择服务', trigger: 'change'}],
                    countryId: [{required: true, message: '请选择国家名称', trigger: 'change'}],
                    provinceId: [{required: true, message: '请选择省名称', trigger: 'change'}],
                    cityId: [{required: true, message: '请选择市名称', trigger: 'change'}],
                    districtId: [{required: true, message: '请选择区县名称', trigger: 'change'}],
                    streetId: [{required: true, message: '请选择街道名称', trigger: 'change'}],
                    shipperType: [{required: true, message: '请选择货主类型', trigger: 'change'}],
                    businessType: [{required: true, message: '请选择业务类型', trigger: 'change'}],
                    createTime: [{type: 'date', required: true, message: '选择时间范围', trigger: 'change'}]
                    // servicesUrl: [{required: false, message: '', trigger: this.trigger, validator: this.IsURL}]
                },
                // 编辑界面数据
                editForm: {
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
                    countryId: '',
                    countryName: '',
                    provinceId: '',
                    provinceName: '',
                    cityId: '',
                    cityName: '',
                    districtId: '',
                    districtName: '',
                    streetId: '',
                    streetName: ''
                },
                addFormVisible: false, // 新增界面是否显示
                addLoading: false,
                addFormRules: {
                    shipperName: [
                        {required: true, message: '请输入货主名称', trigger: this.trigger},
                        {required: true, message: '', trigger: this.trigger, validator: this.stripscriptTo}
                    ],
                    shipperCode: [
                        {required: true, message: '请输入货主编码', trigger: this.trigger},
                        {required: true, message: '', trigger: this.trigger, validator: this.validCode}
                    ],
                    shortName: [
                        {required: true, message: '请输入货主简称', trigger: this.trigger},
                        {required: true, message: '', trigger: this.trigger, validator: this.stripscriptTo}
                    ],
                    address: [
                        {required: true, message: '请输入地址信息', trigger: this.trigger},
                        {required: true, message: '', trigger: this.trigger, validator: this.stripscriptTo}
                    ],
                    postcode: [
                        {required: true, message: '请输入邮编', trigger: this.trigger},
                        {required: true, message: '', trigger: this.trigger, validator: this.isPostalCodeTo}
                    ],
                    contactPerson: [
                        {required: true, message: '请输入联系人', trigger: this.trigger}
                        // { required: true, message: '', trigger: this.trigger, validator: this.isPostalCodeTo }
                    ],
                    telephone: [
                        {required: true, message: '请输入联系方式', trigger: this.trigger},
                        {required: true, message: '', trigger: this.trigger, validator: this.validPhone}
                    ],
                    services: [{required: true, message: '请选择服务', trigger: 'change'}],
                    countryId: [{required: true, message: '请选择国家名称', trigger: 'change'}],
                    provinceId: [{required: true, message: '请选择省名称', trigger: 'change'}],
                    cityId: [{required: true, message: '请选择市名称', trigger: 'change'}],
                    districtId: [{required: true, message: '请选择区县名称', trigger: 'change'}],
                    streetId: [{required: true, message: '请选择街道名称', trigger: 'change'}],
                    shipperType: [{required: true, message: '请选择货主类型', trigger: 'change'}],
                    businessType: [{required: true, message: '请选择业务类型', trigger: 'change'}]
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
                    businessType: '' // 0集团内 1集团外

                    // 工厂
                },
                centerDialogVisible: false,
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
                    isView: false
                },
                fileList: [
                    {
                        name: 'oms数据库',
                        url:
                            'https://zhx198600.github.io/myvue/oms%E6%95%B0%E6%8D%AE%E5%BA%93'
                    }
                ],
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
                business: false
            };
        },
        methods: {
            // 验证手机号
            validPhone(rule, value, callback) {
                util.isvalidPhone(rule, value, callback);
            },
            // 验证邮编
            isPostalCodeTo(rule, value, callback) {
                util.isPostalCode(rule, value, callback);
            },
            // 验证是否有特殊字符
            stripscriptTo(rule, value, callback) {
                util.stripscript(rule, value, callback);
            },
            validCode(rule, value, callback) {
                util.validCode(rule, value, callback);
            },
            IsURL(rule, value, callback) {
                util.IsURL(rule, value, callback);
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
            //
            sortChange: function (prop) {
                this.pager.order = util.dtopx(prop.order);
                this.pager.sort = util.dtotoLower(prop.prop);
                this.getShipper();
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
                this.getShipper();
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
                this.$refs[formRule].clearValidate();
            },
            off: function (formRule) {
                let that = this;
                that.addFormVisible = false;
                that.editFormVisible = false;
                that.lookFormVisible = false;
                that.shipperId = '';
                that.activeName = 'first';
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
            ClickshipperCode(rows) {
                this.disabledTo = true;
                this.handleEdit(rows);
            },
            getShipperTo() {
                let that = this;
                this.pager.page = 1;
                that.getShipper();
            },
            // 货主列表获取
            getShipper(sign) {
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
                        sort: _this.pager.sort
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
                                const lineNumber = item.lineNumber
                                    ? new Date(item.lineNumber)
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
                util.PyatyiLinkage(name, this, 'addEid');
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
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                // this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm('确定移除' + file.name + '?');
            },
            submitUpload() {
                this.$refs.upload.submit();
                this.centerDialogVisible = false;
            },
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
                let _this = this;
                let id = row.id;
                _this.address = [];
                _this.listLoading = true;
                _this.parentList = [];
                _this.state = '';
                _this.editForm = {
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
                    countryId: '',
                    countryName: '',
                    provinceId: '',
                    provinceName: '',
                    cityId: '',
                    cityName: '',
                    districtId: '',
                    districtName: '',
                    streetId: '',
                    streetName: '',
                    servicesUrl: ''
                };
                // util.publicpost(
                //   '/regionalAddress/selectCountryRegionalAddress',
                //   '',
                //   function(res) {
                //     if (res.code === 0) {
                //       _this.address = res.data;
                //     } else {
                //       this.$message({
                //         showClose: true,
                //         message: _this.$t('msg.error'),
                //         type: 'error'
                //       });
                //     }
                //     _this.editLoading = false;
                //   }
                // );
                util.publicpost('/shipper/selectShipperById', {id: id}, function (res) {
                    if (res.code === 0) {
                        _this.shipperId = res.data.id;
                        _this.listLoading = false;
                        _this.editFormVisible = true;
                        _this.editForm = res.data;
                        _this.editForm.countryId = res.data.countryId;
                        let map = {'id': res.data.parentId, 'label': res.data.parentName, 'value': res.data.parentId};
                        _this.parentList.push(map);
                        if (res.data.businessType === 'IN') {
                            _this.business = true;
                        } else {
                            _this.business = false;
                        }
                        // 赋值给省
                        // console.log(_this.editForm.countryId+'国家');
                        // console.log(_this.editForm.provinceId+'省');
                        // console.log(_this.editForm.cityId+'市');
                        // console.log(_this.editForm.districtId+'区');
                        util.addressChange('addressed', _this.editForm.countryId, _this);
                        util.addressChange('city', _this.editForm.provinceId, _this);
                        util.addressChange('county', _this.editForm.cityId, _this);
                        util.addressChange('street', _this.editForm.districtId, _this);
                        util.formatAddress(_this, 'address', _this.editForm.countryId, _this.editForm.countryName);
                        util.formatAddress(_this, 'addressed', _this.editForm.provinceId, _this.editForm.provinceName);
                        util.formatAddress(_this, 'city', _this.editForm.cityId, _this.editForm.cityName);
                        util.formatAddress(_this, 'county', _this.editForm.districtId, _this.editForm.districtName);
                        util.formatAddress(_this, 'street', _this.editForm.streetId, _this.editForm.streetName);
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
                });
            },
            // 根据名称模糊查询
            remoteMethod(query) {
                console.log(query);
                if (query !== '') {
                    let _this = this;
                    _this.loading = true;
                    util.publicpost(
                        '/shipper/selectShipperByName',
                        {name: query.toString()},
                        function (res) {
                            if (res.code === 0) {
                                _this.loading = false;
                                _this.parentList = res.data.map(item => {
                                    return {
                                        id: item.id,
                                        label: item.shipperName,
                                        value: item.id
                                    };
                                });
                                //    if(res.data){
                                //   for(let i of res.data){
                                //     i.value = i.partentName;
                                //     i.id = i.id;
                                //   }
                                //   list = res.data
                                //   callback(list);
                                // }
                            }
                        }
                    );
                }
            },
            // 显示新增界面
            handleAdd: function () {
                let _this = this;
                _this.gteUserList = [];
                _this.searchList = [];
                _this.SoldList = [];
                _this.SoldDimList = [];
                _this.addFormVisible = true;
                _this.address = [];
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
                    countryId: '',
                    countryName: '',
                    provinceId: '',
                    provinceName: '',
                    cityId: '',
                    cityName: '',
                    districtId: '',
                    districtName: '',
                    streetId: '',
                    streetName: '',
                    servicesUrl: ''
                };
                _this.addLoading = false;
                if (_this.addFormVisible === true) {
                    util.publicpost(
                        '/regionalAddress/selectCountryRegionalAddress',
                        '',
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
            // 新增
            addSubmit: function () {
                this.$refs.addForm.validate(valid => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            let _this = this;
                            _this.addLoading = true;
                            let districtid = this.addForm.districtId;
                            this.addForm.districtName = util.loadadds(districtid, this.county);
                            let countryid = this.addForm.countryId;
                            this.addForm.countryName = util.loadadds(countryid, this.address);
                            let provinceid = this.addForm.provinceId;
                            this.addForm.provinceName = util.loadadds(
                                provinceid,
                                this.addressed
                            );
                            let cityid = this.addForm.cityId;
                            this.addForm.cityName = util.loadadds(cityid, this.city);
                            let streeid = this.addForm.streetId;
                            this.addForm.streetName = util.loadadds(streeid, this.street);
                            let para = Object.assign({}, this.addForm);
                            console.log(para);
                            util.publicpost('/shipper/saveShipper', para, function (res) {
                                if (res.code === 0) {
                                    _this.getShipper();
                                    _this.shipperId = res.data; // 存Id
                                    _this.successMsg(_this.$t('msg.success'));
                                    // _this.addFormVisible = false;
                                    _this.parentList = [];
                                    if (para.businessType === 'IN') {
                                        _this.business = true;
                                    } else {
                                        _this.business = false;
                                    }
                                } else {
                                    _this.$message({
                                        message: _this.$t(res.msg),
                                        type: 'error'
                                    });
                                }
                                _this.addLoading = false;
                            });
                        });
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
                            let districtid = this.editForm.districtId;
                            this.editForm.districtName = util.loadadds(districtid, this.county);
                            let countryid = this.editForm.countryId;
                            this.editForm.countryName = util.loadadds(countryid, this.address);
                            let provinceid = this.editForm.provinceId;
                            this.editForm.provinceName = util.loadadds(
                                provinceid,
                                this.addressed
                            );
                            let cityid = this.editForm.cityId;
                            this.editForm.cityName = util.loadadds(cityid, this.city);
                            let streeid = this.editForm.streetId;
                            this.editForm.streetName = util.loadadds(streeid, this.street);
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
                if (row.onlineTime) {
                    return util.formatDate.format(
                        new Date(row.onlineTime),
                        'yyyy-MM-dd hh:mm:ss'
                    );
                }
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
                if (
                    that.activeName === 'second' ||
                    that.activeName === 'third' ||
                    that.activeName === 'fourth' ||
                    that.activeName === 'fifth'
                ) {
                    that.SoldDimList = [];
                    that.SoldDimText = '';
                    that.selsSoldId = '';
                    that.UserPager.total = 0;
                    that.SoldPager.total = 0;
                    that.SoldPagerTo.total = 0;
                    that.DeliveryPager.total = 0;
                    that.DeliveryPagerTo.total = 0;
                    that.MaterialPagerTo.total = 0;
                    if (that.shipperId) {
                    } else {
                        that.showMsg('请先保存货主信息');
                    }
                }
                if (that.activeName === 'second') {
                    that.getUserList();
                } else if (that.activeName === 'third') {
                    that.getSoldList();
                } else if (that.activeName === 'fourth') {
                    that.getDeliveryList();
                } else if (that.activeName === 'fifth') {
                    that.getMaterialList();
                }
            },
            // 工厂货主信息绑定
            bindingPlant() {
                let that = this;
                if (!that.factoryLogisticsId.id) {
                    that.$message({
                        message: '请选择工厂',
                        type: 'error'
                    });
                    return;
                }
                if (this.business) {
                    if (!that.inventoryCode) {
                        that.$message({
                            message: '请输入库存地',
                            type: 'error'
                        });
                        return;
                    }
                }
                let para = {
                    // shipperId:that.shipperId,
                    shipperId: that.shipperId,
                    inventoryCode: that.inventoryCode.toString(),
                    factoryLogisticsId: that.factoryLogisticsId.id.toString()
                };
                // that.confirm('确定绑定关系吗？', function() {
                util.publicpost(
                    '/factoryShipperRelation/insertFactoryShipperRelation',
                    para,
                    function (res) {
                        if (res.code === 0) {
                            that.$message({
                                message: that.$t('msg.success'),
                                type: 'success'
                            });
                            that.state = '';
                            that.factoryLogisticsId.id = [];
                            that.inventoryCode = '';
                            that.getUserList();
                        } else {
                            that.$message({
                                message: that.$t(res.msg),
                                type: 'error'
                            });
                        }
                    }
                );
                // });
            },
            // 自动获取输入框内容进行查询
            querySearch(queryString, callback) {
                // console.log(this.factoryLogisticsId);
                console.log(queryString);
                let that = this;
                let list = [];
                that.factoryLogisticsId = []; // 'shipperId':that.shipperId
                util.publicpost(
                    '/factorydc/selectByNameShipperId',
                    {name: queryString, shipperId: that.shipperId},
                    function (res) {
                        if (res.code === 0) {
                            if (res.data) {
                                for (let i of res.data) {
                                    i.value = i.name;
                                    i.id = i.id;
                                }
                                list = res.data;
                                callback(list);
                            }
                        } else {
                            console.log(1);
                            that.$message({
                                message: that.$t(res.msg),
                                type: 'error'
                            });
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
            SoldPage(val) {
                let that = this;
                that.SoldPager.page = val;
                that.getSoldList();
            },
            SoldPageTo(val) {
                let that = this;
                that.SoldPagerTo.page = val;
                that.SoldDimSearch('sold');
            },
            MaterialPage(val) {
                let that = this;
                that.MaterialPager.page = val;
                that.getMaterialList();
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
                // that.shipperId
                util.publicpost(
                    '/factoryShipperRelation/getFactoryShipperRelationByShipperId',
                    {
                        shipperId: that.shipperId,
                        page: that.UserPager.page,
                        rows: that.UserPager.rows
                    },
                    function (res) {
                        that.loading = false;
                        if (res.code == 0) {
                            that.gteUserList = res.result;
                            that.UserPager.total = res.pager.totalCount;
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
                console.log(time);
                that.factoryLogisticsId = time;
                that.disabledBindFactory = false;
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
                let that = this;
                // that.shipperId
                that.loading = true;
                util.publicpost(
                    '/shipperMaterialRelation/selectByShipperId',
                    {
                        shipperId: that.shipperId,
                        page: that.MaterialPager.page,
                        rows: that.MaterialPager.rows
                    },
                    function (res) {
                        that.loading = false;
                        if (res.code === 0) {
                            that.MaterialList = res.result;
                            that.MaterialPager.total = res.pager.totalCount;
                        }
                    }
                );
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
                                    //that.errorMsg('暂无查询信息');
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
                                    //that.errorMsg('暂无查询信息');
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
            }
        },
        computed: {
            toggleDrop() {
                return this.showSearch ? 'el-icon-arrow-up' : 'el-icon-arrow-down';
            }
        },
        mounted() {
            let that = this;
            that.getShipper();
            this.getButtonList();
        }
    };
</script>
<style>
    .thirdList .el-table__body {
        width: 100%;
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
</style>
