// 物料信息
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
                    <el-form size="mini" :inline="true" label-width="80px" :model="query" class="demo-form-inline"
                             status-icon ref="query">
                        <el-row :gutter="10">
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item prop="code" :label="$t('materialThead.materialCode') + '：'">
                                    <el-input v-model="query.code"
                                              :placeholder="$t('common.pleaseEnter')"
                                              :maxlength='20'></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item prop="name" :label="$t('materialThead.materialName') + '：'">
                                    <el-input v-model="query.name"
                                              :placeholder="$t('common.pleaseEnter')"
                                              :maxlength='100'></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item prop="type" :label="$t('materialThead.type') + '：'">
                                    <el-select v-model="query.type" :placeholder="$t('common.pleaseChoose')">
                                        <el-option v-for="item in this.dict.materialType" :key="item.name"
                                                   :label="item.des" :value="item.name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item prop="shipperCode" :label="$t('materialMdThead.shipper') + '：'">
                                    <el-select v-model="query.shipperCode" filterable remote
                                               reserve-keyword placeholder="请输入关键词"
                                               :remote-method="searchShipper"
                                               :loading="visible.searchShipper">
                                        <el-option v-for="item in searchShipperList" :key="item.shipperCode"
                                                   :label="item.shipperName" :value="item.shipperCode"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item prop="barCode" :label="$t('commonThead.barCode') + '：'">
                                    <el-input v-model="query.barCode" style="height: 30px;"
                                              :placeholder="$t('common.pleaseEnter')"
                                              :maxlength='20'></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item prop="importationStatus" :label="$t('materialMdThead.inorout') + '：'">
                                    <el-select v-model="query.importationStatus"
                                               :placeholder="$t('common.pleaseChoose')">
                                        <el-option v-for="item in this.dict.importationStatus" :key="item.name"
                                                   :label="item.des" :value="item.name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <!-- <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item prop="status" :label="$t('commonThead.disableStatus') + '：'">
                                    <el-select v-model="query.status" clearable :placeholder="$t('common.pleaseChoose')"
                                               class="select">
                                        <el-option v-for="item in dict.status" :key="item.name" :label="item.des"
                                                   :value="item.name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col> -->
                        </el-row>
                        <div class="footer-but tar pad_r pad_t">
                            <el-button type="primary" @click="queryList">{{ $t('button.query') }}</el-button>
                            <el-button @click="resetForm('query')">{{ $t('button.reset') }}</el-button>
                            <el-button @click="exportData()" :disabled="this.exportBtnDisabled"
                                       class="base_materiel_export hide">{{
                                $t('button.exportExcel') }}
                            </el-button>
                            <!--<el-button @click="exportData()" :disabled="this.exportBtnDisabled" v-if="permissions('base_materiel_export')">{{
                                $t('button.exportExcel') }}
                            </el-button>-->
                        </div>
                    </el-form>
                </div>
            </div>
        </el-collapse-transition>

        <!--新增、删除-->
        <div class="add_move def-but">
            <el-button @click="handleAdd" class="base_materiel_add">{{ $t('button.add') }}</el-button>
            <el-button @click="importAddFile(0)" class="base_materiel_import hide" :disabled="!(currentList && currentList.length > 0)">{{ $t('button.importExcel') }}
            </el-button>
            <el-button @click="importAddFile(1)" class="base_materiel_moreimport hide">{{ $t('button.moreimport') }}
            </el-button>
            <!--<el-button @click="handleAdd" v-if="permissions('base_materiel_add')">{{ $t('button.add') }}</el-button>-->
            <!--<el-button @click="importAddFile(0)" v-if="permissions('base_materiel_import')">{{ $t('button.importExcel') }}</el-button>-->
            <!--<el-button @click="importAddFile(1)" v-if="permissions('base_materiel_moreimport')">{{ $t('button.moreimport') }}</el-button>-->
        </div>

        <!-- 列表 -->
        <div class="list_mater list_operation">
            <el-table highlight-current-row stripe :data="currentList" v-loading="visible.listLoading"
                      @selection-change="handleSelection" :height="tableListHeight" :default-sort = "{prop: 'materialCode', order: 'ascending'}"
                      style="width: 100%;" :fit="true" border align="center">
                <!-- <el-table-column width="55" align="center" type="selection"></el-table-column> -->
                <el-table-column :label="$t('commonThead.index')" align="center" type="index"
                                 width="50"></el-table-column>
                <el-table-column align="center" :label="$t('materialThead.materialName')" prop="materialName"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column align="center" :label="$t('materialThead.materialCode')" prop="materialCode" sortable
                                 show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="hand" @click="handleView(scope.row)">{{scope.row.materialCode}}</div>
                    </template>
                </el-table-column>
                <!--
                  <el-table-column align="center" :label="$t('materialThead.materialGroupName')" prop="materialGroupName" show-overflow-tooltip></el-table-column>
                  -->
                <el-table-column align="center" :label="$t('materialThead.importationStatus')" prop="importationStatus"
                                 :formatter="formatterImportationStatus" show-overflow-tooltip></el-table-column>
                <el-table-column align="center" :label="$t('commonThead.barCode')" prop="barCode" sortable
                                 show-overflow-tooltip></el-table-column>
                <el-table-column align="center" :label="$t('materialThead.type')" prop="materialType"
                                 :formatter="formatterType" show-overflow-tooltip></el-table-column>
                <el-table-column align="center" :label="$t('materialMdThead.expirationDate')" prop="expirationDate"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column align="center" :label="$t('materialMdThead.specification')" prop="specification"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column align="center" width="120" :label="$t('commonThead.updater')" prop="updater"
                                 show-overflow-tooltip></el-table-column>
                <!--<el-table-column align="center" width="170" :label="$t('commonThead.updateTime')" prop="updateTime"
                                 :formatter="formatterUpdateTime" show-overflow-tooltip></el-table-column>-->
                <el-table-column align="center" width="60" :label="$t('commonThead.operation')" fixed="right">
                    <template slot-scope="scope">
                        <el-tooltip content="修改" placement="top" effect="light"
                                    v-if="permissions('base_materiel_update')">
                            <div @click="handleMod(scope.row)" class="operation_icon icon1"></div>
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


        <!-- 导入弹出层 -->
        <el-dialog title="文件上传" :visible.sync="centerDialogVisible" width="30%" center>
            <el-upload class="upload-demo" :auto-upload="false" ref="upload" name="filename"
                       :action="UploadUrl()" :on-preview="handlePreview" :headers="upLoadData"
                       :data="uploadParam"
                       :on-remove="handleRemove" :before-remove="beforeRemove" :on-success="onUploadSuccess"
                       :before-upload="onFileBeforeUpload"
                       multiple :limit="1" :on-exceed="handleExceed" :file-list="fileList3">
                <el-button size="small" type="primary" class="active">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传xlsx文件，且不能超过2.5M</div>
            </el-upload>
            <div slot="footer" class="dialog-footer-but">
                <el-button size="small" type="primary" @click="download">下载模板</el-button>
                <el-button type="primary" @click="submitUpload">{{ $t('button.confirm') }}</el-button>
                <el-button @click="centerDialogVisible = false">{{ $t('button.cancel') }}</el-button>
            </div>
        </el-dialog>

        <!-- 编辑界面 -->
        <el-dialog :visible.sync="visible.editForm" class="wl-new user-dialog material-dialog"
                   :close-on-click-modal="false" @close="closeDialog('editForm')">
            <div class="form">
                <el-tabs v-model="visible.activeName" @tab-click="handleTabs">
                    <el-tab-pane label="物料信息" name="first">
                        <el-form size="mini" :model="editForm" :rules="FormRules" ref="editForm" label-width="100px"
                                 class="demo-ruleForm">
                            <el-row>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="物料名称：" prop="materialName">
                                            <el-tooltip content="最多输入100个字符" placement="right" effect="light">
                                                <el-input :disabled="visible.isView"
                                                          v-model.trim="editForm.materialName"
                                                          :maxlength='100'></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="物料编码：" prop="materialCode">
                                            <el-tooltip content="最多输入20个字符" placement="right" effect="light">
                                                <el-input :disabled="visible.isView"
                                                          v-model.trim="editForm.materialCode"
                                                          :maxlength='20'></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="69编码：" prop="barCode">
                                            <el-tooltip content="最多输入30个字符" placement="right" effect="light">
                                                <el-input :disabled="visible.isView" v-model.trim="editForm.barCode"
                                                          :maxlength='30'></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="是否进口：" prop="importationStatus">
                                            <el-select :disabled="visible.isView" v-model="editForm.importationStatus"
                                                       placeholder="请选择">
                                                <el-option v-for="item in dict.importationStatus" :key="item.name"
                                                           :label="item.des" :value="item.name"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="基本单位：" prop="baseUnit">
                                            <el-select :disabled="visible.isView" v-model="editForm.baseUnit"
                                                       placeholder="请选择">
                                                <el-option v-for="item in unitDict.mergeUnit" :key="item.code"
                                                           :label="item.name" :value="item.code"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="最小销售单位：" prop="minUnit">
                                            <el-select :disabled="visible.isView" v-model="editForm.minUnit"
                                                       placeholder="请选择">
                                                <el-option v-for="item in unitDict.mergeUnit" :key="item.code"
                                                           :label="item.name" :value="item.code"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="物料类型：" prop="materialType">
                                            <el-select :disabled="visible.isView" v-model="editForm.materialType"
                                                       placeholder="请选择">
                                                <el-option v-for="item in dict.materialType" :key="item.name"
                                                           :label="item.des" :value="item.name"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="是否纯运输：" prop="transportFlag">
                                            <el-select :disabled="visible.isView || transportFlagStatus"
                                                       @change="changeTransportFlag"
                                                       v-model="editForm.transportFlag" placeholder="请选择">
                                                <el-option v-for="item in dict.transportFlag" :key="item.name"
                                                           :label="item.des" :value="item.name"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="保质期：" prop="expirationDate">
                                            <el-tooltip content="最多输入10个字符" placement="right" effect="light">
                                                <el-input :disabled="visible.isView" v-model="editForm.expirationDate"
                                                          :maxlength='10'></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="包装规格：" prop="specification" :rules="[
                        {required: true, message: '请输入包装规格', trigger: 'blur'},
                        {required: true, message: '只能输入数字', trigger: 'blur', validator: this.mandatoryVerifyFigure}
                    ]">
                                            <el-tooltip content="最多输入10个字符" placement="right" effect="light">
                                                <el-input :disabled="visible.isView" v-model="editForm.specification"
                                                          :maxlength='10'></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple" v-show="visible.imgView">
                                        <el-form-item label="物料照片:" prop="materialImage">
                                            <el-upload class="upload-demo" :disabled="visible.isView"
                                                       :action="importFileUrl"
                                                       :class="{'upload-pic': visible.isView}"
                                                       name="files"
                                                       :headers="upLoadData"
                                                       :on-preview="handlePreview"
                                                       :on-remove="handleRemove"
                                                       :onSuccess="uploadSuccess"
                                                       :file-list="materialImage"
                                                       :before-upload="onImageBeforeUpload"
                                                       :limit="1"
                                                       :list-type="pictureFlag">
                                                <el-button size="small" type="primary" v-show="!visible.selDisableT">
                                                    点击上传
                                                </el-button>
                                                <!--<i class="el-icon-plus" :disabled="visible.selDisableT"></i>-->
                                                <div slot="tip" v-show="!visible.selDisableT" class="el-upload__tip">
                                                    只能上传jpg/jpeg/png图片，且不超过5MB
                                                </div>
                                            </el-upload>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="物料扩展信息" name="second">
                        <div class="list ownerInfo list_operation">

                            <!--

                                物料扩展头信息编辑域

                             -->
                            <el-row>
                                <el-col :span="1" v-if="visible.addExtButton"><i
                                        class="el-icon-circle-plus add-extension fr" title="新增"
                                        @click="handleAddExt"></i></el-col>
                                <el-col :span="materialExtTableWidth">
                                    <el-table max-height="220" @cell-dblclick="handleDbl" :data="currentExtList"
                                              v-loading="visible.shipperListLoading" style="width: 100%;line-height: 0;"
                                              :fit="true" align="center">
                                        <el-table-column width="120" label="货主名称" prop="shipperName" align="center"
                                                         show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <el-select v-if="scope.row.isEditing" size="mini"
                                                           @change="getShipperCode(scope.row)"
                                                           v-model="scope.row.shipperName" filterable remote
                                                           reserve-keyword placeholder="请输入关键词"
                                                           :remote-method="searchShipper"
                                                           :loading="visible.searchShipper">
                                                    <el-option v-for="item in searchShipperList" :key="item.shipperCode"
                                                               :label="item.shipperName"
                                                               :value="item.shipperName"></el-option>
                                                </el-select>
                                                <div slot="reference" v-else>{{ scope.row.shipperName }}</div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column width="120" label="货主代码" prop="shipperCode" align="center"
                                                         show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <el-input size="mini" :disabled="true" v-if="scope.row.isEditing"
                                                          v-model="scope.row.shipperCode"></el-input>
                                                <div slot="reference" v-else>{{ scope.row.shipperCode }}</div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column width="150" label="仓储中心名称" prop="storageCenterName"
                                                         align="center" show-overflow-tooltip class="logisticsCenter">
                                            <template slot-scope="scope">
                                                <!--<el-select v-if="scope.row.isEditing" size="mini" @change="getStorageCenterCode(scope.row)"-->
                                                <!--v-model="scope.row.storageCenterName" filterable remote reserve-keyword placeholder="请输入关键词"-->
                                                <!--:remote-method="searchFactoryDc" :loading="visible.searchFactoryDc">-->
                                                <!--<el-option v-for="item in searchFactoryDcList" :key="item.factoryLogisticsCode" :label="item.name" :value="item.name"></el-option>-->
                                                <!--</el-select>-->
                                                <el-select v-if="scope.row.isEditing" size="mini"
                                                           v-model="scope.row.storageCenterName" filterable
                                                           reserve-keyword @change="getStorageCenterCode(scope.row)"
                                                           placeholder="请选择">
                                                    <!--:remote-method="searchFactoryDc"
                                                    :loading="visible.searchFactoryDc"-->
                                                    <el-option v-for="item in searchFactoryDcList"
                                                               :key="item.storageCenterCode"
                                                               :label="item.storageCenterName"
                                                               :value="item.storageCenterName"></el-option>
                                                </el-select>
                                                <div slot="reference" v-else>{{ scope.row.storageCenterName }}</div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column width="150" label="仓储中心代码" prop="storageCenterCode"
                                                         align="center" show-overflow-tooltip class="logisticsCenter">
                                            <template slot-scope="scope">
                                                <el-input size="mini" :disabled="true" v-if="scope.row.isEditing"
                                                          v-model="scope.row.storageCenterCode"></el-input>
                                                <div slot="reference" v-else>{{ scope.row.storageCenterCode }}</div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column width="140" prop="note" label="操作" align="center"
                                                         show-overflow-tooltip>
                                            <template slot-scope="scope" v-if="visible.addExtButton">
                                                <!-- 保存 -->
                                                <el-button :disabled="!scope.row.isEditing" size="small"
                                                           @click.native.prevent="saveExtHead(scope.row)">
                                                    {{ $t('button.save') }}
                                                </el-button>
                                                <!-- 重置 -->
                                                <el-button v-if="scope.row.isEditing" :disabled="!scope.row.isEditing"
                                                           size="small"
                                                           @click.native.prevent="handleResetExt(scope.row)">{{
                                                    $t('button.reset') }}
                                                </el-button>
                                                <!--<div @click="toEnable(scope.row)" v-if="scope.row.status === 'INEFFECTIVENESS' && !visible.addExtButton">-->
                                                <!--<el-tooltip content="恢复" placement="top" effect="light">-->
                                                <!--<div class="operation_icon icon2"></div>-->
                                                <!--</el-tooltip>-->
                                                <!--</div>-->
                                                <!--<div @click="toDisable(scope.row)" v-if="!visible.addExtButton">-->
                                                <!--<el-tooltip content="暂停" placement="top" effect="light">-->
                                                <!--<div class="operation_icon icon3"></div>-->
                                                <!--</el-tooltip>-->
                                                <!--</div>-->
                                                <!-- 删除 -->
                                                <el-button v-if="!scope.row.isEditing" size="small"
                                                           @click.native.prevent="deleteExt(scope.row)">{{
                                                    $t('button.delete') }}
                                                </el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </el-col>
                            </el-row>

                            <!--

                                物料扩展详情编辑域

                             -->
                            <el-form v-show="visible.editExtDetailForm" class="cargoInfo" size="mini"
                                     :model="materialExtForm" ref="materialExtForm"
                                     :rules="shipperFormRules" label-width="140px" style="margin-top:20px;">
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="货主物料别称：" prop="shipperMaterialName">
                                            <el-input :maxlength="100" :disabled="visible.isExtView"
                                                      v-model="materialExtForm.shipperMaterialName"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="货主物料代码：" prop="shipperMaterialCode">
                                            <el-input :maxlength="20" :disabled="visible.isExtView"
                                                      v-model="materialExtForm.shipperMaterialCode"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="外箱码：" prop="cartonCode">
                                            <el-input :maxlength="30" :disabled="visible.isExtView"
                                                      v-model="materialExtForm.cartonCode"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="商品码1：" prop="goodsCodeOne">
                                            <el-input :maxlength="30" :disabled="visible.isExtView"
                                                      v-model="materialExtForm.goodsCodeOne"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="商品码2：" prop="goodsCodeTwo">
                                            <el-input :maxlength="30" :disabled="visible.isExtView"
                                                      v-model="materialExtForm.goodsCodeTwo"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="批次属性：" prop="batchAttr">
                                            <el-select :disabled="visible.isExtView" v-model="materialExtForm.batchAttr"
                                                       placeholder="请选择">
                                                <el-option v-for="item in dict.batchAttr" :key="item.name"
                                                           :label="item.des" :value="item.name"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="出库方式：" prop="outboundWay">
                                            <el-select :disabled="visible.isExtView"
                                                       v-model="materialExtForm.outboundWay" placeholder="请选择">
                                                <el-option v-for="item in dict.outboundWay" :key="item.name"
                                                           :label="item.des" :value="item.name"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="价格：" prop="price">
                                            <el-input :maxlength="10" :disabled="visible.isExtView"
                                                      v-model="materialExtForm.price"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12" :hidden="!visible.isAdd">
                                    <div class="grid-content">
                                        <el-form-item label="物料组：" prop="materialGroupCode">
                                            <!-- <el-input :maxlength="50" :disabled="visible.isExtView" v-model="materialExtForm.materialGroupCode"></el-input> -->
                                            <el-select :disabled="visible.isExtView"
                                                       v-model="materialExtForm.materialGroupCode" filterable remote
                                                       reserve-keyword placeholder="请输入关键词"
                                                       :remote-method="searchMaterialGroup"
                                                       :loading="visible.searchMaterialGroup">
                                                <el-option v-for="item in searchMaterialGroupList"
                                                           :key="item.materialGroupCode"
                                                           :label="item.materialGroupName"
                                                           :value="item.materialGroupCode"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="码盘规则：" prop="palletizingRule">
                                            <el-input :maxlength="10" :disabled="visible.isExtView"
                                                      v-model="materialExtForm.palletizingRule"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="长度：" prop="length">
                                            <el-input :maxlength="10" :disabled="visible.isExtView"
                                                      v-model="materialExtForm.length"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="长度单位：" prop="lengthUnit">
                                            <el-select :disabled="visible.isExtView"
                                                       v-model="materialExtForm.lengthUnit" placeholder="请选择">
                                                <el-option v-for="item in unitDict.lengthUnit" :key="item.code"
                                                           :label="item.name" :value="item.code"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="宽度：" prop="width">
                                            <el-input :maxlength="10" :disabled="visible.isExtView"
                                                      v-model="materialExtForm.width"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="宽度单位：" prop="widthUnit">
                                            <el-select :disabled="visible.isExtView" v-model="materialExtForm.widthUnit"
                                                       placeholder="请选择">
                                                <el-option v-for="item in unitDict.lengthUnit" :key="item.code"
                                                           :label="item.name" :value="item.code"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="高度：" prop="height">
                                            <el-input :maxlength="10" :disabled="visible.isExtView"
                                                      v-model="materialExtForm.height"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="高度单位：" prop="heightUnit">
                                            <el-select :disabled="visible.isExtView"
                                                       v-model="materialExtForm.heightUnit" placeholder="请选择">
                                                <el-option v-for="item in unitDict.lengthUnit" :key="item.code"
                                                           :label="item.name" :value="item.code"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="体积：" prop="volume">
                                            <el-input :maxlength="10" :disabled="visible.isExtView"
                                                      v-model="materialExtForm.volume"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="体积单位：" prop="volumeUnit">
                                            <el-select :disabled="visible.isExtView"
                                                       v-model="materialExtForm.volumeUnit" placeholder="请选择">
                                                <el-option v-for="item in unitDict.volumeUnit" :key="item.code"
                                                           :label="item.name" :value="item.code"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="毛重：" prop="grossWeight">
                                            <el-input :maxlength="10" :disabled="visible.isExtView"
                                                      v-model="materialExtForm.grossWeight"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="毛重单位：" prop="grossWeightUnit">
                                            <el-select :disabled="visible.isExtView"
                                                       v-model="materialExtForm.grossWeightUnit" placeholder="请选择">
                                                <el-option v-for="item in unitDict.weightUnit" :key="item.code"
                                                           :label="item.name" :value="item.code"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="净重：" prop="netWeight">
                                            <el-input :maxlength="10" :disabled="visible.isExtView"
                                                      v-model="materialExtForm.netWeight"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="净重单位：" prop="netWeightUnit">
                                            <el-select :disabled="visible.isExtView"
                                                       v-model="materialExtForm.netWeightUnit" placeholder="请选择">
                                                <el-option v-for="item in unitDict.weightUnit" :key="item.code"
                                                           :label="item.name" :value="item.code"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="熟化期：" prop="maturePeriod">
                                            <el-input :maxlength="10" :disabled="visible.isExtView"
                                                      v-model.number="materialExtForm.maturePeriod">
                                                <template slot="suffix">天</template>
                                            </el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="重抛货：" prop="heavyThrowGoods">
                                            <el-select :disabled="visible.isExtView"
                                                       v-model="materialExtForm.heavyThrowGoods" placeholder="请选择" clearable>
                                                <el-option v-for="item in dict.heavyThrowGoods" :key="item.name"
                                                           :label="item.des" :value="item.name"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="生鲜标识：" prop="freshFlag">
                                            <el-select :disabled="visible.isExtView" v-model="materialExtForm.freshFlag"
                                                       placeholder="请选择" clearable>
                                                <el-option v-for="item in dict.freshFlag" :key="item.name"
                                                           :label="item.des" :value="item.name"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="超期合格分母：" prop="denominator">
                                            <el-input :maxlength="10" :disabled="visible.isExtView"
                                                      v-model="materialExtForm.denominator"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="超期合格天数：" prop="numOfQualifiedProducts">
                                            <el-input :maxlength="10" :disabled="visible.isExtView"
                                                      v-model.number="materialExtForm.numOfQualifiedProducts">
                                                <template slot="suffix">天</template>
                                            </el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <!-- 保存物料扩展信息详情 -->
                                        <el-button @click.native="saveExtDetail('materialExtForm')"
                                                   :disabled="visible.isExtView">{{
                                            $t('button.save') }}
                                        </el-button>
                                        <!-- 取消保存物料扩展信息详情 -->
                                        <!--<el-button @click.native="resetExtForm" :disabled="visible.isExtView">-->
                                        <!--{{ $t('button.cancel') }}-->
                                        <!--</el-button>-->
                                        <!-- 重置物料扩展信息详情 -->
                                        <el-button @click.native="resetForm('materialExtForm')"
                                                   :disabled="visible.isExtView">
                                            {{ $t('button.reset') }}
                                        </el-button>
                                    </div>
                                </el-col>
                            </el-form>

                            <!--

                                保存物料扩展信息详情

                             -->

                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div slot="footer" class="dialog-footer-but" v-if="visible.closeForm">
                <el-button @click="closeDialog('editForm')">{{ $t('button.close') }}</el-button>
            </div>
            <div slot="footer" class="dialog-footer-but" v-else>
                <el-button @click="submitForm('editForm')" :disabled="visible.isView">{{ $t('button.save') }}
                </el-button>
                <el-button @click="closeDialog('editForm')">{{ $t('button.cancel') }}</el-button>
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
        <!--预览大图-->
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<script>
    import util from '../../common/js/util';
    import config from '../../common/js/config'
    import cookieOperation from '../../common/js/cookieOperation';

    export default {
        data() {
            return {
                // 初始化页面参数
                init: 1,
                // 查询字段
                query: {
                    name: '',
                    code: '',
                    type: '',
                    barCode: '',
                    importationStatus: '',
                    shipperCode: '',
                    status: ''
                },
                visible: {
                    update: false,
                    listLoading: false,
                    shipperListLoading: false,
                    groupListLoading: false,
                    searchShipper: false, // 加载货主样式
                    searchFactoryDc: false, // 加载仓储中心样式
                    searchMaterialGroup: false, // 加载物料组样式
                    activeName: 'first',
                    editForm: false,
                    closeForm: false,
                    onlyRead: false,
                    selDisable: false,
                    onlyReadT: false,
                    selDisableT: false,
                    isView: false,
                    isExtView: false,
                    editExtDetailForm: false,
                    addExtButton: false,
                    isAdd: false,
                    imgView: true
                },
                materialImage: [],
                exportBtnDisabled: true,
                currentList: [], // 物料列表
                currentExtList: [], // 物料扩展列表
                searchShipperList: [], // 检索货主列表
                searchFactoryDcList: [], // 检索工厂列表
                searchMaterialGroupList: [], // 检索物料组列表
                currentRow: null, // 当前编辑行
                currentExtRow: null, // 当前编辑扩展行
                // 分页
                pager: {
                    page: 1,
                    rows: 20,
                    total: 0
                },
                sel: {
                    material: []
                },
                // 编辑物料界面数据
                editForm: {
                    materialCode: '',
                    materialName: '',
                    transportFlag: '',
                    barCode: '',
                    materialType: '',
                    expirationDate: '',
                    specification: '',
                    baseUnit: '',
                    minUnit: '',
                    importationStatus: '',
                    materialImage: []
                },
                // 上传
                importFileUrl: config.base_service_ip + '/azure/upload',
                upLoadData: {
                    access_token: cookieOperation.cookie.get('access_token')
                    //access_token:'423d2b24062442689c5300257dbc2b4d'
                },
                // 编辑与货主关系
                materialExtForm: {
                    shipperName: '',
                    shipperCode: '',
                    storageCenterName: '',
                    storageCenterCode: '',
                    materialCode: '',
                    materialShortName: '',
                    shipperMaterialCode: '',
                    shipperMaterialName: '',
                    cartonCode: '',
                    goodsCodeOne: '',
                    goodsCodeTwo: '',
                    batchAttr: '',
                    outboundWay: '',
                    price: '',
                    materialGroupCode: '',
                    length: '',
                    lengthUnit: '',
                    width: '',
                    widthUnit: '',
                    height: '',
                    heightUnit: '',
                    volume: '',
                    volumeUnit: '',
                    grossWeight: '',
                    grossWeightUnit: '',
                    netWeight: '',
                    netWeightUnit: '',
                    palletizingRule: '',
                    numOfQualifiedProducts: '',
                    denominator: '',
                    maturePeriod: '',
                    heavyThrowGoods: '',
                    freshFlag: '',
                    coefficient: '',
                    warningThreshold: ''
                },
                editGroupForm: {
                    sourceSystem: '',
                    groupId: ''
                },
                dict: '',
                unitDict: '',
                centerDialogVisible: false,
                fileList3: [],
                // 临时物料扩展信息
                tempExtensionInfo: null,
                // 物料扩展信息表格宽度
                materialExtTableWidth: 23,
                // 查询框折叠展开
                showSearch: true,
                trigger: 'blur',
                FormRules: {
                    materialName: [
                        {required: true, message: '请输入物料名称', trigger: this.trigger},
                        {required: true, message: '', trigger: this.trigger, validator: this.validMaterialName}
                    ],
                    materialCode: [
                        {required: true, message: '请输入物料编码', trigger: this.trigger},
                        {required: true, message: '', trigger: this.trigger, validator: this.stripscriptTo}
                    ],
                    barCode: [
                        {required: true, message: '请输入69编码', trigger: this.trigger},
                        {
                            required: true,
                            message: '只能输入数字',
                            trigger: this.trigger,
                            validator: this.mandatoryVerifyFigure
                        }
                    ],
                    importationStatus: [
                        {required: true, message: '请选择是否进口', trigger: 'change'}
                    ],
                    goodsCodeOne: [
                      {required: false, message: '', trigger: this.trigger, validator: this.validMaterialName}
                    ],
                    goodsCodeTwo: [
                      {required: false, message: '', trigger: this.trigger, validator: this.validMaterialName}
                    ],
                    materialShortName: [
                      {required: false, message: '', trigger: this.trigger, validator: this.validMaterialName}
                    ],
                    cartonCode: [
                      {required: false, message: '', trigger: this.trigger, validator: this.validCode}
                    ],
                    shipperMaterialCode: [
                      {required: false, message: '', trigger: this.trigger, validator: this.validMaterialName}
                    ],
                    shipperMaterialName: [
                      {required: false, message: '', trigger: this.trigger, validator: this.validMaterialName}
                    ],
                    type: [
                        {required: true, message: '请选择物料类型', trigger: 'change'}
                    ],
                    netWeight: [
                        {required: true, message: '请填写净重数量'},
                        {required: true, message: '', trigger: 'blur', validator: this.mandatoryVerifyFigure}
                    ],
                    netWeightUnit: [
                        {required: true, message: '请选择净重单位', trigger: 'change'}
                    ],
                    expirationDate: [
                        {required: true, message: '请输入保质期', trigger: this.trigger},
                        {required: true, message: '只能输入整数', trigger: 'blur', validator: this.validInteger}
                    ],
                    specification: [
                        {required: true, message: '请输入包装规格', trigger: this.trigger},
                        {required: true, message: '只能输入整数', trigger: 'blur', validator: this.validInteger}
                    ],
                    baseUnit: [
                        {required: true, message: '请选择基本单位', trigger: 'change'}
                    ],
                    minUnit: [
                        {required: true, message: '请选择最小销售单位', trigger: 'change'}
                    ],
                    materialType: [
                        {required: true, message: '请选择物料类型', trigger: 'change'}
                    ],
                    transportFlag: [
                        {required: true, message: '请选择是否纯运输', trigger: 'change'}
                    ]
                },
                // 货主信息输入信息校验
                shipperFormRules: {
                    outboundWay: [
                        {required: true, message: '请选择出库方式', trigger: 'change'}
                    ],
                    materialGroupCode: [
                        {required: true, message: '请输入物料组', trigger: 'blur'}
                    ],
                    volume: [
                        {required: true, message: '请输入体积', trigger: 'blur'}
                    ],
                    volumeUnit: [
                        {required: true, message: '请选择体积单位', trigger: 'change'}
                    ],
                    grossWeight: [
                        {required: true, message: '请输入毛重', trigger: 'blur'}
                    ],
                    grossWeightUnit: [
                        {required: true, message: '请选择毛重单位', trigger: 'change'}
                    ],
                    netWeight: [
                        {required: true, message: '请输入净重', trigger: 'blur'}
                    ],
                    netWeightUnit: [
                        {required: true, message: '请选择净重单位', trigger: 'change'}
                    ],
                    palletizingRule: [
                        {required: true, message: '请输入码盘规则', trigger: 'blur'},
                        {required: true, message: '请输入数字', trigger: 'blur', validator: this.mandatoryVerifyFigure}
                    ],
                    shipperMaterialCode: [
                        {required: false, message: '只可输入英文，数字及 ._-@()', trigger: 'blur', validator: this.stripscriptTo}
                    ],
                    numOfQualifiedProducts: [
                        {required: true, message: '请输入超期合格品天数', trigger: 'blur'}
                    ],
                    denominator: [
                        {required: true, message: '请输入超期合格品分母', trigger: 'blur'},
                        {required: true, message: '超期合格品分母不能为0', trigger: 'blur', validator: this.verifyFigure}
                    ],
                    batchAttr: [
                        {required: true, message: '请输入批次属性', trigger: 'blur'}
                    ],
                    maturePeriod: [
                        {required: true, message: '请输入熟化期', trigger: 'blur'}
                    ]
                },
                baseServiceIp: config.baseMd_service_ip,
                exprotProgressIds: [],
                importProgressId: '',
                progressList: [], // 导出进度条
                importProgressList: [], // 导入进度条
                exportProgressVisible: false,
                importProgressVisible: false,
                errorLogButtonVisible: false,
                errorDocPath: '',
                uploadUrl: config.order_service_ip + '/transfers/upload',
                operType: 0,
                uploadParam: {
                    operType: 0
                },
                lookFormVisible: false,
                haveMaterialExt: false,
                dialogImageUrl: '',
                dialogVisible: false
            };
        },
        methods: {
            // 验证只能输入数字或字符
            validCode(rule, value, callback) {
                util.validCode(rule, value, callback);
            },
            stripscript(rule, value, callback) {
                util.stripscript(rule, value, callback);
            },
            // 验证是否有特殊字符
            stripscriptTo(rule, value, callback) {
                util.validSpecialCode(rule, value, callback);
            },
            // 物料名称
            validMaterialName(rule, value, callback) {
                util.stripscriptName(rule, value, callback);
            },
            // 验证只能输入数字 非必填
            verifyFigure(rule, value, callback) {
                util.verifyFigureTo(rule, value, callback);
            },
            // 验证只能输入数字 必填
            mandatoryVerifyFigure(rule, value, callback) {
                util.verifyFigure(rule, value, callback);
            },
            // 验证只能输入正整数
            validInteger(rule, value, callback) {
                util.PositiveInteger(rule, value, callback);
            },
            // 分页
            pageChange(page) {
                this.pager.page = page;
                this.selectList();
            },
            // 选择行数
            sizeChange(rows) {
                this.pager.rows = rows;
                this.selectList();
            },
            // 重置
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            // 检索查询
            queryList() {
                this.pager.page = 1;
                this.selectList();
            },
            // 关闭框
            /*closeDialog(formName) {
                this.close(formName);
            },*/
            // 勾选
            handleSelection(val) {
                this.sel.material = val;
            },
            closeDialog(formName) {
                if (!this.lookFormVisible && !this.haveMaterialExt) {
                    /*this.$alert('<p style="color:#f56c6c;text-align: center">信息未保存！</p>', '提示', {dangerouslyUseHTMLString: true});
                    this.visible.editForm = true;
                    return;*/
                    this.$confirm('信息未保存,确定要关闭吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.visible.editForm = false;
                        this.lookFormVisible = true;
                        this.haveMaterialExt = true;
                        this.editForm = {
                            materialCode: '',
                            materialName: '',
                            transportFlag: '',
                            barCode: '',
                            materialType: '',
                            expirationDate: '',
                            specification: '',
                            baseUnit: '',
                            minUnit: '',
                            importationStatus: '',
                            materialImage: []
                        };
                    }).catch(() => {
                        this.visible.editForm = true;
                    });
                } else {
                    this.visible.editForm = false;
                    this.lookFormVisible = true;
                    this.haveMaterialExt = true;
                    this.editForm = {
                        materialCode: '',
                        materialName: '',
                        transportFlag: '',
                        barCode: '',
                        materialType: '',
                        expirationDate: '',
                        specification: '',
                        baseUnit: '',
                        minUnit: '',
                        importationStatus: '',
                        materialImage: []
                    };
                }
            },
            // 切换tabs
            handleTabs() {
                this.selectExtList();
                // 查看状态下拦截
                if (this.visible.isView) {
                    this.visible.closeForm = true;
                    return;
                }
                if (this.visible.activeName === 'first') {
                    this.visible.closeForm = false;
                } else {
                    this.visible.closeForm = true;
                    this.visible.isExtView = false;
                }
                if (this.currentRow && this.currentRow.materialCode) {
                    // 修改模式
                    this.visible.isView = true;
                } else {
                    // 这是为新增模式
                    this.visible.isView = false;
                }
            },
            // 获取物料列表
            selectList() {
                let _this = this;
                this.exportBtnDisabled = false;
                _this.visible.listLoading = true;
                _this.currentList = [];
                util.publicpost('/material/list/pager', {
                    materialName: _this.query.name,
                    materialCode: _this.query.code,
                    materialType: _this.query.type,
                    barCode: _this.query.barCode,
                    importationStatus: _this.query.importationStatus,
                    shipperCode: _this.query.shipperCode,
                    status: _this.query.status,
                    page: _this.pager.page,
                    rows: _this.pager.rows,
                    init: _this.init
                }, function (res) {
                    if (res.code === 0) {
                        _this.init = '';
                        _this.visible.listLoading = false;
                        _this.pager.total = res.pager.totalCount || 0;
                        _this.currentList = res.result;
                    } else {
                        _this.visible.listLoading = false;
                        _this.pager.total = res.pager.totalCount || 0;
                        // BUG6608，查询不到数据，不需要提示
                        // _this.errorMsg(res.msg);
                    }
                    _this.dict = res.enumVal;
                });
            },
            // 显示新增界面
            handleAdd: function () {
                // 取消查看模式
                this.visible.isView = false;
                this.materialImage = [];
                this.currentExtList = [];
                // 清空字段
                this.editForm = {
                    materialCode: '',
                    materialName: '',
                    transportFlag: '',
                    barCode: '',
                    materialType: '',
                    expirationDate: '',
                    specification: '',
                    baseUnit: '',
                    minUnit: '',
                    importationStatus: '',
                    materialImage: []
                };
                if (this.$refs['materialExtForm'] !== undefined) {
                    this.$refs['materialExtForm'].resetFields();
                }
                // 清空正在编辑行
                this.currentRow = null;
                // 清除关系列表
                this.currentExtList = [];
                // 页面控制
                this.visible.activeName = 'first';
                this.visible.closeForm = false;
                this.visible.editForm = true;
                this.visible.selDisableT = false;
                this.visible.addExtButton = true;
                this.lookFormVisible = false;
                this.haveMaterialExt = false;
                // 隐藏扩展详情编辑域
                this.visible.editExtDetailForm = false;
                this.visible.imgView = true; // 展示上传图片
                if (this.$refs['editForm'] !== undefined) {
                    this.$refs['editForm'].clearValidate();
                }
            },
            // 查看
            handleView(row) {
                let _this = this;
                // 获取当前数据
                _this.currentRow = row;
                _this.materialImage = [];
                if (row.materialCode) {
                    util.publicpost('/material/queryByCode', {
                        code: row.materialCode
                    }, function (res) {
                        if (res.code === 0) {
                            _this.currentRow = res.data;
                            _this.editForm = {
                                materialCode: _this.currentRow.materialCode,
                                materialName: _this.currentRow.materialName,
                                transportFlag: _this.currentRow.transportFlag,
                                barCode: _this.currentRow.barCode,
                                materialType: _this.currentRow.materialType,
                                expirationDate: _this.currentRow.expirationDate,
                                specification: _this.currentRow.specification,
                                baseUnit: _this.currentRow.baseUnit,
                                minUnit: _this.currentRow.minUnit,
                                importationStatus: _this.currentRow.importationStatus
                            };
                            if (res.data.materialImage != null && res.data.materialImage !== '') {
                                _this.visible.imgView = true;
                                var fileName = res.data.materialImage;
                                var imageFile = {name: '', url: config.azure_download_path + fileName};
                                _this.materialImage.push(imageFile);
                            } else {
                                _this.visible.imgView = false;
                            }
                        } else {
                            _this.errorMsg(res.msg);
                        }
                        // 清除校验
                        if (_this.$refs['editForm'] !== undefined) {
                            _this.$refs['editForm'].resetFields();
                        }
                    });
                }
                // 查询物料扩展信息列表
                _this.selectExtList();
                // 清空扩展详情信息编辑框
                _this.resetExtForm();
                // _this.materialExtTableWidth = 24;
                _this.visible.activeName = 'first';
                _this.visible.addExtButton = false;
                _this.visible.closeForm = true;
                _this.visible.isView = true;
                _this.visible.isExtView = true;
                _this.visible.editForm = true;
                _this.visible.selDisableT = true;
                _this.lookFormVisible = true;
                _this.haveMaterialExt = true;
            },
            // 修改
            handleMod(row) {
                let _this = this;
                _this.materialImage = [];
                _this.lookFormVisible = false;
                _this.haveMaterialExt = false;
                if (row.materialCode) {
                    util.publicpost('/material/queryByCode', {
                        code: row.materialCode
                    }, function (res) {
                        if (res.code === 0) {
                            _this.currentRow = res.data;
                            _this.editForm = {
                                materialCode: _this.currentRow.materialCode,
                                materialName: _this.currentRow.materialName,
                                transportFlag: _this.currentRow.transportFlag,
                                barCode: _this.currentRow.barCode,
                                materialType: _this.currentRow.materialType,
                                expirationDate: _this.currentRow.expirationDate,
                                specification: _this.currentRow.specification,
                                baseUnit: _this.currentRow.baseUnit,
                                minUnit: _this.currentRow.minUnit,
                                importationStatus: _this.currentRow.importationStatus
                            };
                            if (res.data.materialImage != null && res.data.materialImage != '') {
                                _this.visible.imgView = true;
                                var fileName = res.data.materialImage;
                                var imageFile = {name: '', url: config.azure_download_path + fileName};
                                _this.materialImage.push(imageFile);
                            } else {
                                _this.visible.imgView = false;
                            }
                            // 加载物料扩展信息列表
                            _this.selectExtList();
                        } else {
                            _this.errorMsg(res.msg);
                        }
                        // 清除校验
                        if (_this.$refs['editForm'] !== undefined) {
                            _this.$refs['editForm'].resetFields();
                        }
                    });
                }
                // _this.materialExtTableWidth = 24;
                _this.visible.activeName = 'first';
                _this.visible.addExtButton = true;
                _this.visible.isView = true;
                _this.visible.closeForm = false;
                _this.visible.editForm = true;
                _this.visible.editExtDetailForm = false;
                _this.visible.selDisableT = true;
            },
            /**
             * 保存物料信息
             * 物料基础信息只允许新增
             */
            submitForm: function (formName) {
                let _this = this;
                let materialCode = _this.editForm.materialCode;
                let materialName = _this.editForm.materialName;
                let importationStatus = _this.editForm.importationStatus;
                let barCode = _this.editForm.barCode;
                let materialType = _this.editForm.materialType;
                let expirationDate = _this.editForm.expirationDate;
                let specification = _this.editForm.specification;
                let baseUnit = _this.editForm.baseUnit;
                let minUnit = _this.editForm.minUnit;
                let imgUrl = '';
                let materialImage = this.editForm.materialImage[0];
                let transportFlag = _this.editForm.transportFlag;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        util.publicpost('/material/add', {
                            materialCode: materialCode,
                            materialName: materialName,
                            materialType: materialType,
                            transportFlag: transportFlag,
                            importationStatus: importationStatus,
                            barCode: barCode,
                            expirationDate: expirationDate,
                            specification: specification,
                            baseUnit: baseUnit,
                            minUnit: minUnit,
                            materialImage: materialImage
                        }, function (res) {
                            if (res.success) {
                                _this.currentRow = res.data;
                                if (res.code === 4) {
                                    _this.selectExtList(); // 加载物料扩展信息列表
                                }
                                _this.successMsg(_this.$t('msg.success'));
                                _this.visible.activeName = 'second';
                                _this.selectList(); // 刷新物料页面
                            } else {
                                let message;
                                if (!util.isEmpty(res.msg)) {
                                    message = _this.$t('msg.error') + ',' + _this.$t(res.msg);
                                } else {
                                    message = _this.$t('msg.error');
                                }
                                _this.errorMsg(message);
                            }
                        });
                    } else {
                        return false;
                    }
                });
            },
            // 删除物料
            handleDel: function (row) {
                let _this = this;
                let versions = row.version;
                _this.listLoading = true;
                let ids = row.id;
                this.confirm('确认删除选中记录吗？', function () {
                    _this.visible.listLoading = true;
                    let para = {ids: ids, versions: versions};
                    util.publicpost('/material/delete', para, function (res) {
                        _this.visible.listLoading = false;
                        if (res.success) {
                            if (res.data === 0) {
                                _this.visible.listLoading = false;
                                _this.errorMsg('服务器繁忙！');
                            } else {
                                _this.visible.listLoading = false;
                                _this.successMsg(_this.$t('msg.success'));
                                _this.selectList();
                            }
                        } else {
                            _this.visible.listLoading = false;
                            _this.errorMsg(_this.$t(res.msg));
                        }
                    });
                });
            },
            // 加载物料扩展信息列表
            selectExtList() {
                let _this = this;
                util.publicpost('/material/ext/list', {
                    materialCode: _this.currentRow.materialCode
                }, function (res) {
                    if (res.success) {
                        if (res.data.length !== 0 && res.data[0].outboundWay) {
                            _this.haveMaterialExt = true;
                        } else {
                            _this.haveMaterialExt = false;
                        }
                        _this.currentExtList = res.data;
                    } else {
                        _this.currentExtList = [];
                    }
                });
            },
            /**
             * 双击扩展头事件
             */
            handleDbl(row) {
                let _this = this;
                _this.materialExtForm = [];
                if (row.isEditing) {
                    _this.errorMsg('请先保存该条数据');
                    return;
                }
                if (!_this.visible.addExtButton) {
                    _this.visible.isExtView = true;
                } else {
                    _this.visible.isExtView = false;
                }
                _this.visible.isAdd = false;
                _this.shipperFormRules.materialGroupCode = [
                    {required: false, message: '请输入物料组', trigger: 'blur'}
                ];
                this.materialExtForm = {
                    shipperName: row.shipperName,
                    shipperCode: row.shipperCode,
                    storageCenterName: row.storageCenterName,
                    storageCenterCode: row.storageCenterCode,
                    materialCode: row.materialCode,
                    materialShortName: row.materialShortName,
                    shipperMaterialCode: row.shipperMaterialCode,
                    shipperMaterialName: row.shipperMaterialName,
                    cartonCode: row.cartonCode,
                    goodsCodeOne: row.goodsCodeOne,
                    goodsCodeTwo: row.goodsCodeTwo,
                    batchAttr: row.batchAttr,
                    outboundWay: row.outboundWay,
                    price: row.price,
                    materialGroupCode: row.materialGroupCode,
                    length: row.length,
                    lengthUnit: row.lengthUnit,
                    width: row.width,
                    widthUnit: row.widthUnit,
                    height: row.height,
                    heightUnit: row.heightUnit,
                    volume: row.volume,
                    volumeUnit: row.volumeUnit,
                    grossWeight: row.grossWeight,
                    grossWeightUnit: row.grossWeightUnit,
                    netWeight: row.netWeight,
                    netWeightUnit: row.netWeightUnit,
                    palletizingRule: row.palletizingRule,
                    numOfQualifiedProducts: row.numOfQualifiedProducts,
                    denominator: row.denominator,
                    maturePeriod: row.maturePeriod,
                    heavyThrowGoods: row.heavyThrowGoods,
                    freshFlag: row.freshFlag,
                    coefficient: row.coefficient,
                    warningThreshold: row.warningThreshold
                };
                // _this.materialExtForm = row; // 当前编辑行
                _this.visible.editExtDetailForm = true; // 显示详情编辑域
                if (_this.$refs['materialExtForm'] !== undefined) {
                    _this.$refs['materialExtForm'].clearValidate();
                }
                // let currentExtList = this.currentExtList.slice();
                // let current = currentExtList.find(item => item.materialCode === row.materialCode);
                // _this.materialExtForm = {
                //     materialCode: current.materialCode,
                //     shipperName: current.shipperName,
                //     shipperCode: current.shipperCode,
                //     storageCenterCode: current.storageCenterCode,
                //     storageCenterName: current.storageCenterName,
                //     materialShortName: current.materialShortName,
                //     materialGroupCode: current.materialGroupCode,
                //     materialGroupName: current.materialGroupName,
                //     shipperMaterialCode: current.shipperMaterialCode,
                //     shipperMaterialName: current.shipperMaterialName,
                //     cartonCode: current.cartonCode,
                //     goodsCodeOne: current.goodsCodeOne,
                //     goodsCodeTwo: current.goodsCodeTwo,
                //     batchAttr: current.batchAttr,
                //     outboundWay: current.outboundWay,
                //     price: current.price,
                //     length: current.length,
                //     lengthUnit: current.lengthUnit,
                //     width: current.width,
                //     widthUnit: current.widthUnit,
                //     height: current.height,
                //     heightUnit: current.heightUnit,
                //     volume: current.volume,
                //     volumeUnit: current.volumeUnit,
                //     grossWeight: current.grossWeight,
                //     grossWeightUnit: current.grossWeightUnit,
                //     netWeight: current.netWeight,
                //     netWeightUnit: current.netWeightUnit,
                //     palletizingRule: current.palletizingRule,
                //     numOfQualifiedProducts: current.numOfQualifiedProducts,
                //     denominator: current.denominator,
                //     maturePeriod: current.maturePeriod,
                //     heavyThrowGoods: current.heavyThrowGoods,
                //     freshFlag: current.freshFlag,
                //     coefficient: current.coefficient,
                //     warningThreshold: current.warningThreshold
                // };
            },
            /**
             * 新增一条扩展信息事件
             */
            handleAddExt() {
                // 判断当前行是否处在编辑状态
                let isEditingFlag;
                if (this.currentExtList) {
                    this.currentExtList.map(item => {
                        if (item.isEditing) {
                            isEditingFlag = true;
                        }
                    });
                }
                /*if (this.visible.editExtDetailForm || isEditingFlag) {
                    this.errorMsg('请先保存上一条扩展信息');
                    return;
                }*/
                this.tempRow = {
                    isEditing: true,
                    shipperCode: '',
                    shipperName: '',
                    storageCenterName: '',
                    storageCenterCode: ''
                };
                this.currentExtList.unshift(this.tempRow);
            },
            /**
             * 新增物料扩展信息
             */
            saveExtHead(row) {
                let _this = this;
                if (_this.$refs['materialExtForm'] !== undefined) {
                    _this.$refs['materialExtForm'].resetFields();
                }
                if (util.isEmpty(row.shipperCode)) {
                    _this.errorMsg('请输入货主代码');
                } else if (util.isEmpty(row.shipperName)) {
                    _this.errorMsg('请输入货主名称');
                } else if (util.isEmpty(row.storageCenterCode)) {
                    _this.errorMsg('请输入仓储中心代码');
                } else if (util.isEmpty(row.storageCenterName)) {
                    _this.errorMsg('请输入仓储中心名称');
                } else if (_this.currentExtList) {
                    _this.currentExtList.map(item => {
                        if (!item.isEditing) {
                            console.log('5')
                            if (item.shipperCode === row.shipperCode && item.storageCenterCode === row.storageCenterCode) {
                                _this.errorMsg('不能插入重复的数据');
                                return;
                            }
                        }
                        console.log('6');
                    });
                }
                _this.materialExtForm.materialCode = _this.editForm.materialCode;
                _this.materialExtForm.shipperCode = row.shipperCode;
                _this.materialExtForm.shipperName = row.shipperName;
                _this.materialExtForm.storageCenterCode = row.storageCenterCode;
                _this.materialExtForm.storageCenterName = row.storageCenterName;
                util.publicpost('/material/ext/insert', _this.materialExtForm, function (res) {
                    if (res.success) {
                        // 刷新列表
                        _this.selectExtList();
                        row.isEditing = false; // 取消扩展头编辑模式
                        _this.visible.editExtDetailForm = true; // 展示扩展详情编辑模式
                        _this.visible.isExtView = false;
                        _this.visible.closeForm = true;
                        _this.visible.isAdd = true;
                        _this.shipperFormRules.materialGroupCode = [
                            {required: true, message: '请输入物料组', trigger: 'blur'}
                        ];
                        _this.$refs['materialExtForm'].resetFields();
                    } else {
                        row.isEditing = true;
                        _this.visible.editExtDetailForm = false;
                        _this.$alert('<p style="color:#f56c6c;text-align: center">调用MD接口失败，扩展属性保存未成功，请重试！</p>', '提示', {dangerouslyUseHTMLString: true});
                    }
                });
            },
            /**
             * 保存物料扩展详情
             */
            saveExtDetail(formName) {
                let _this = this;
                if (_this.materialExtForm.materialGroupCode && _this.searchMaterialGroupList) {
                    let groupName = _this.searchMaterialGroupList.find(item => item.materialGroupCode === _this.materialExtForm.materialGroupCode).materialGroupName;
                    _this.materialExtForm.materialGroupName = groupName;
                }
                _this.$refs[formName].validate((valid) => {
                    if (valid) {
                        util.publicpost('/material/ext/update', {
                            materialCode: _this.materialExtForm.materialCode,
                            shipperCode: _this.materialExtForm.shipperCode,
                            storageCenterCode: _this.materialExtForm.storageCenterCode,
                            batchAttr: _this.materialExtForm.batchAttr,
                            outboundWay: _this.materialExtForm.outboundWay,
                            materialGroupCode: _this.materialExtForm.materialGroupCode,
                            materialGroupName: _this.materialExtForm.materialGroupName,
                            palletizingRule: _this.materialExtForm.palletizingRule,
                            numOfQualifiedProducts: _this.materialExtForm.numOfQualifiedProducts,
                            denominator: _this.materialExtForm.denominator,
                            shipperMaterialCode: _this.materialExtForm.shipperMaterialCode,
                            shipperMaterialName: _this.materialExtForm.shipperMaterialName,
                            cartonCode: _this.materialExtForm.cartonCode,
                            goodsCodeOne: _this.materialExtForm.goodsCodeOne,
                            goodsCodeTwo: _this.materialExtForm.goodsCodeTwo,
                            price: _this.materialExtForm.price,
                            length: _this.materialExtForm.length,
                            lengthUnit: _this.materialExtForm.lengthUnit,
                            width: _this.materialExtForm.width,
                            widthUnit: _this.materialExtForm.widthUnit,
                            height: _this.materialExtForm.height,
                            heightUnit: _this.materialExtForm.heightUnit,
                            volume: _this.materialExtForm.volume,
                            volumeUnit: _this.materialExtForm.volumeUnit,
                            grossWeight: _this.materialExtForm.grossWeight,
                            grossWeightUnit: _this.materialExtForm.grossWeightUnit,
                            netWeight: _this.materialExtForm.netWeight,
                            netWeightUnit: _this.materialExtForm.netWeightUnit,
                            maturePeriod: _this.materialExtForm.maturePeriod,
                            heavyThrowGoods: _this.materialExtForm.heavyThrowGoods,
                            freshFlag: _this.materialExtForm.freshFlag,
                            coefficient: _this.materialExtForm.coefficient,
                            warningThreshold: _this.materialExtForm.warningThreshold,
                            validityPeriodRequirement: parseInt(_this.editForm.expirationDate / _this.materialExtForm.denominator) + _this.materialExtForm.numOfQualifiedProducts
                        }, function (res) {
                            if (res.success) {
                                _this.haveMaterialExt = true;
                                _this.selectExtList();
                                _this.resetExtForm();
                                _this.successMsg(_this.$t('msg.success'));
                            } else {
                                // _this.errorMsg(_this.$t(res.msg));
                                _this.$alert('<p style="color:#f56c6c;text-align: center">调用MD接口失败，扩展属性保存未成功，请重试！</p>', '提示', {dangerouslyUseHTMLString: true});
                            }
                        });
                    } else {
                        return false;
                    }
                });
            },
            /**
             * 取消保存物料扩展信息
             */
            resetExtForm() {
                this.materialExtForm = {
                    shipperName: '',
                    shipperCode: '',
                    storageCenterName: '',
                    storageCenterCode: '',
                    materialCode: '',
                    materialShortName: '',
                    shipperMaterialCode: '',
                    shipperMaterialName: '',
                    cartonCode: '',
                    goodsCodeOne: '',
                    goodsCodeTwo: '',
                    batchAttr: '',
                    outboundWay: '',
                    price: '',
                    materialGroupCode: '',
                    length: '',
                    lengthUnit: '',
                    width: '',
                    widthUnit: '',
                    height: '',
                    heightUnit: '',
                    volume: '',
                    volumeUnit: '',
                    grossWeight: '',
                    grossWeightUnit: '',
                    netWeight: '',
                    netWeightUnit: '',
                    palletizingRule: '',
                    numOfQualifiedProducts: '',
                    denominator: '',
                    maturePeriod: '',
                    heavyThrowGoods: '',
                    freshFlag: '',
                    coefficient: '',
                    warningThreshold: ''
                };
                this.searchShipperList = []; // 检索货主列表
                this.searchFactoryDcList = []; // 检索工厂列表
                this.visible.editExtDetailForm = false; // 隐藏
            },
            /**
             * 删除物料扩展信息
             */
            deleteExt(row) {
                let _this = this;
                _this.$message({
                    type: 'error',
                    showClose: true,
                    dangerouslyUseHTMLString: true,
                    message: '<div style="width:310px;">删除扩展信息会影响下游系统生产数据的准确性，请联系管理员或运维人员</div>'
                });
                // 删除功能暂时注销
                /*_this.currentRow = row;
                this.confirm('确定删除？', function () {
                    _this.visible.shipperListLoading = true;
                    util.publicpost('/material/ext/delete', {
                        storageCenterCode: row.storageCenterCode,
                        shipperCode: row.shipperCode,
                        materialCode: row.materialCode
                        // materialGroupCode: row.materialGroupCode
                    }, function (res) {
                        _this.visible.shipperListLoading = false;
                        if (res.success) {
                            _this.successMsg(_this.$t('msg.success'));
                            _this.selectExtList();
                        } else {
                            _this.errorMsg(_this.$t(res.msg));
                        }
                    });
                });*/
            },
            // 重置扩展信息表格
            handleResetExt(row) {
                row.shipperCode = '';
                row.shipperName = '';
                row.storageCenterCode = '';
                row.storageCenterName = '';
            },
            // 根据货主名称自动获取货主代码
            getShipperCode(row) {
                let _this = this;
                if (_this.searchShipperList && row.shipperName) {
                    _this.searchShipperList.map(item => {
                        if (item.shipperName === row.shipperName) {
                            row.shipperCode = item.shipperCode;
                        }
                    });
                }
                // console.log(row);
                util.publicpost(
                    '/factorydc/queryByShipperCode',
                    {
                        shipperCode: row.shipperCode
                    },
                    function (res) {
                        _this.visible.searchFactoryDc = false;
                        if (res.success) {
                            _this.searchFactoryDcList = res.data;
                        } else {
                            _this.searchFactoryDcList = [];
                        }
                    }
                );
            },
            // 根据仓储中心名称自动获取仓储中心代码
            getStorageCenterCode(row) {
                if (this.searchFactoryDcList && row.storageCenterName) {
                    this.searchFactoryDcList.map(item => {
                        if (item.storageCenterName === row.storageCenterName) {
                            row.storageCenterCode = item.storageCenterCode;
                        }
                    });
                }
            },
            // 启用
            toEnable(row) {
                let _this = this;
                // if (_this.sel.material.length === 0) {
                //   _this.showMsg('请先勾选一条数据');
                //   return;
                // }
                _this.visible.listLoading = true;
                let ids = row.id;
                let versions = row.version;
                util.publicpost(
                    '/material/enable',
                    {
                        ids: ids,
                        versions: versions
                    },
                    function (res) {
                        _this.visible.listLoading = false;
                        if (res.success) {
                            if (res.data === 0) {
                                _this.visible.listLoading = false;
                                _this.errorMsg('服务器繁忙！');
                            } else {
                                _this.visible.listLoading = false;
                                _this.successMsg(_this.$t('msg.success'));
                                _this.selectList();
                            }
                        } else {
                            _this.visible.listLoading = false;
                            _this.errorMsg(_this.$t(res.msg));
                        }
                    }
                );
            },
            // 禁用
            toDisable(row) {
                let _this = this;
                // if (_this.sel.material.length === 0) {
                //   _this.showMsg('请先勾选一条数据');
                //   return;
                // }
                _this.visible.listLoading = true;
                let ids = row.id;
                let versions = row.version;
                util.publicpost(
                    '/material/disable',
                    {
                        ids: ids,
                        versions: versions
                    },
                    function (res) {
                        _this.visible.listLoading = false;
                        if (res.success) {
                            if (res.data === 0) {
                                _this.visible.listLoading = false;
                                _this.errorMsg('服务器繁忙！');
                            } else {
                                _this.visible.listLoading = false;
                                _this.successMsg(_this.$t('msg.success'));
                                _this.selectList();
                            }
                        } else {
                            _this.visible.listLoading = false;
                            _this.errorMsg(_this.$t(res.msg));
                        }
                    }
                );
            },
            // 加载可选单位
            loadUnit() {
                let _this = this;
                this.unitDict = '';
                util.publicpost('/unit/selectMeasureUnit', {}, function (res) {
                    if (res.success) {
                        if (res.data) {
                            _this.unitDict = {
                                pieceUnit: res.data.pieceUnit,
                                volumeUnit: res.data.volumeUnit, // 体积单位
                                weightUnit: res.data.weightUnit, // 重量单位
                                lengthUnit: res.data.lengthUnit, // 长度单位
                                mergeUnit: _this.mergeUnit(
                                    res.data.volumeUnit,
                                    res.data.weightUnit,
                                    res.data.lengthUnit,
                                    res.data.pieceUnit
                                )
                            };
                        }
                    }
                });
            },
            // 合并单位
            mergeUnit(volumeUnit, weightUnit, lengthUnit, pieceUnit) {
                let mergeUnit = [];
                let index = 0;
                for (let i = 0; i < volumeUnit.length; i++) {
                    mergeUnit[index] = volumeUnit[i];
                    index++;
                }
                for (let i = 0; i < weightUnit.length; i++) {
                    mergeUnit[index] = weightUnit[i];
                    index++;
                }
                for (let i = 0; i < lengthUnit.length; i++) {
                    mergeUnit[index] = lengthUnit[i];
                    index++;
                }
                for (let i = 0; i < pieceUnit.length; i++) {
                    mergeUnit[index] = pieceUnit[i];
                    index++;
                }
                return mergeUnit;
            },
            /**
             * 根据关键字查询货主
             */
            searchShipper(key) {
                if (key !== '') {
                    let _this = this;
                    _this.visible.searchShipper = true;
                    util.publicpost('/shipper/selectShipperByName', {
                        name: key
                    }, function (res) {
                        _this.visible.searchShipper = false;
                        if (res.success) {
                            _this.searchShipperList = res.data;
                        } else {
                            _this.searchShipperList = [];
                        }
                    });
                }
            },
            /**
             * 根据关键字查询工厂/物流中心
             */
            searchFactoryDc(key, row) {
                if (key !== '') {
                    let _this = this;
                    _this.visible.searchFactoryDc = true;
                    util.publicpost('/factorydc/selectByName', {
                        name: key
                    }, function (res) {
                        _this.visible.searchFactoryDc = false;
                        if (res.success) {
                            _this.searchFactoryDcList = res.data;
                        } else {
                            _this.searchFactoryDcList = [];
                        }
                    });
                }
            },
            /**
             * 根据关键字查询物料组
             */
            searchMaterialGroup(key, row) {
                if (key !== '') {
                    let _this = this;
                    _this.visible.searchMaterialGroup = true;
                    util.publicpost('/material/ext/group/key', {
                        key: key
                    }, function (res) {
                        _this.visible.searchMaterialGroup = false;
                        if (res.success) {
                            _this.searchMaterialGroupList = res.data;
                        } else {
                            _this.searchMaterialGroupList = [];
                        }
                    });
                }
            },
            // 上传
            handleRemove(file, fileList) {
                console.log(file, fileList);
                // if (fileList.length === 0) {
                //     this.editForm.materialImage = [{ type: 'array', required: true, message: '请选择物料照片', trigger: 'change' }];
                // }
            },
            UploadUrl: function () {
                return config.base_service_ip + '/material/import';
            },
            // 上传成功后的回调
            uploadSuccess(response, file, fileList) {
                this.editForm.materialImage = fileList[0].response.data;
            },
            uploadProgress(event, file, fileList) {
                this.editForm.materialImage = fileList;
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
            onImageBeforeUpload: function (file) {
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
            handlePreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleExceed(files, fileList) {
                // this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return true;
            },
            onFileBeforeUpload: function (file) {
                console.log(file);
                var fileType = file.type;
                if (fileType !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                    this.$message({
                        showClose: true,
                        message: '文件格式不对',
                        type: 'error'
                    });
                    return false;
                }
                var fileSize = file.size;
                if (fileSize > 8 * 1024 * 1024) {
                    this.$message({
                        showClose: true,
                        message: '上传文件最大为8M',
                        type: 'error'
                    });
                    return false;
                }
                return true;
            },
            submitUpload() {
                this.$refs.upload.submit();
                this.centerDialogVisible = false;
            },
            onUploadSuccess: function (response, file, fileList) {
                let _this = this;
                let intervalid1;
                if (response.success) {
                    let progressId = response.data;
                    _this.importProgressVisible = true;
                    intervalid1 = setInterval(() => {
                        this.openImportProgress(progressId, intervalid1);
                    }, 2000);
                } else {
                    this.errorMsg(response.msg);
                }
            },
            openImportProgress: function (progressId, intervalid1) {
                let _this = this;
                util.publicpost('/material/progress', {id: progressId}, function (res) {
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

            downloadErrorLog() {
                let _this = this;
                let url = config.azure_download_path + _this.errorDocPath;
                _this.importProgressVisible = false;
                _this.errorLogButtonVisible = false;
                window.location.href = url;
            },
            download() {
                var templateUrl = '';
                if (this.operType == 0) {
                    templateUrl = 'https://loms.wilmar.cn/temp/material.xlsx';
                } else if (this.operType == 1) {
                    templateUrl = 'https://loms.wilmar.cn/temp/material_pl.xlsx';
                }
                util.publicpost('/azure/urlSetKey', {url: templateUrl}, function (res) {
                    if (res.success) {
                        window.open(res.data);
                    }
                }, config.base_service_ip);
            },
            exportData() {
                let _this = this;
                // 判断是否是修改如果是修改加载列表不展示遮罩层
                let intervalid2;
                util.publicpost(
                    '/material/export',
                    {
                        materialName: _this.query.name,
                        materialCode: _this.query.code,
                        materialType: _this.query.type,
                        barCode: _this.query.barCode,
                        importationStatus: _this.query.importationStatus,
                        shipperCode: _this.query.shipperCode,
                        status: _this.query.status
                    },
                    function (res) {
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
                util.publicpost('/material/progress', {id: _this.exprotProgressIds[0]}, function (res) {
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

            },
            calcNumOfQualifiedProducts: function (val) {
                this.materialExtForm.numOfQualifiedProducts = parseInt(this.editForm.expirationDate / this.materialExtForm.denominator);
            },
            importAddFile(operType) {
                this.operType = operType;
                this.uploadParam = {operType: operType};
                this.centerDialogVisible = true;
                this.fileList3 = [];
            },
            formatterCreateTime(row, column) {
                return util.formatDate.format(
                    new Date(row.createTime),
                    'yyyy-MM-dd hh:mm:ss'
                );
            },
            formatterUpdateTime(row, column) {
                if (row.updateTime) {
                    return util.formatDate.format(
                        new Date(row.updateTime),
                        'yyyy-MM-dd hh:mm:ss'
                    );
                }
            },
            formatterStatus(row, column) {
                var status = row.status;
                var json = this.dict.status;
                return util.formatDict(json, status);
            },
            formatterType(row, column) {
                var status = row.materialType;
                var json = this.dict.materialType;
                return util.formatDict(json, status);
            },
            formatterShipperType(row, column) {
                var status = row.shipper.shipperType;
                var json = this.dict.shipperType;
                return util.formatDict(json, status);
            },
            formatterImportationStatus(row, column) {
                var status = row.importationStatus;
                var json = this.dict.importationStatus;
                return util.formatDict(json, status);
            },
            formatterBaseUnit(row, column) {
                var status = row.baseUnit;
                var json = this.unitDict.mergeUnit.find(item => item.id === status);
                return json === undefined ? '' : json.name;
            },
            formatterMinUnit(row, column) {
                var status = row.minUnit;
                var json = this.unitDict.mergeUnit.find(item => item.id === status);
                return json === undefined ? '' : json.name;
            },
            // 是否纯运输字段变化
            changeTransportFlag() {
                if (this.editForm.transportFlag === 'NO' || this.editForm.transportFlag === '') {
                    this.FormRules = {
                        materialName: [
                            {required: true, message: '请输入物料名称', trigger: this.trigger},
                            {required: true, message: '', trigger: this.trigger, validator: this.validMaterialName}
                        ],
                        materialCode: [
                            {required: true, message: '请输入物料编码', trigger: this.trigger},
                            {required: true, message: '', trigger: this.trigger, validator: this.stripscriptTo}
                        ],
                        barCode: [
                            {required: true, message: '请输入69编码', trigger: this.trigger},
                            {
                                required: true,
                                message: '只能输入数字',
                                trigger: this.trigger,
                                validator: this.mandatoryVerifyFigure
                            }
                        ],
                        expirationDate: [
                            {required: true, message: '请输入保质期', trigger: this.trigger},
                            {required: true, message: '只能输入数字', trigger: 'blur', validator: this.mandatoryVerifyFigure}
                        ],
                        baseUnit: [
                            {required: true, message: '请选择基本单位', trigger: 'change'}
                        ],
                        minUnit: [
                            {required: true, message: '请选择最小销售单位', trigger: 'change'}
                        ],
                        materialType: [
                            {required: true, message: '请选择物料类型', trigger: 'change'}
                        ],
                        importationStatus: [
                            {required: true, message: '请选择是否进口', trigger: 'change'}
                        ],
                        transportFlag: [
                            {required: true, message: '请选择是否纯运输', trigger: 'change'}
                        ]
                    };
                } else {
                    this.FormRules = {
                        materialName: [
                            {required: true, message: '请输入物料名称', trigger: this.trigger},
                            {required: true, message: '', trigger: this.trigger, validator: this.validMaterialName}
                        ],
                        materialCode: [
                            {required: true, message: '请输入物料编码', trigger: this.trigger},
                            {required: true, message: '', trigger: this.trigger, validator: this.stripscriptTo}
                        ],
                        barCode: [
                            {required: false, message: '请输入69编码', trigger: this.trigger}
                        ],
                        expirationDate: [
                            {required: false, message: '请输入保质期', trigger: this.trigger}
                        ],
                        baseUnit: [
                            {required: false, message: '请选择基本单位', trigger: 'change'}
                        ],
                        minUnit: [
                            {required: false, message: '请选择最小销售单位', trigger: 'change'}
                        ],
                        materialType: [
                            {required: true, message: '请选择物料类型', trigger: 'change'}
                        ],
                        importationStatus: [
                            {required: false, message: '请选择是否进口', trigger: 'change'}
                        ],
                        transportFlag: [
                            {required: true, message: '请选择是否纯运输', trigger: 'change'}
                        ]
                    };
                }
            }
        },
        computed: {
            toggleDrop() {
                return this.showSearch ? 'el-icon-arrow-up' : 'el-icon-arrow-down';
            },
            transportFlagStatus() {
                console.log(this.editForm.materialType);
                if (this.editForm.materialType === 'IN') {
                    this.editForm.transportFlag = 'NO';
                    return true;
                } else {
                    this.editForm.transportFlag = '';
                    return false;
                }
            },
            pictureFlag() {
                return this.visible.selDisableT ? 'picture-card' : 'picture';
            },
            tableListHeight() {
                let computedHeight = $(window).height() - $('.transDrop').height() -
                    $('.add_move').height() - 85;
                return (this.currentList && this.currentList.length > 0) ? computedHeight : '120';
            }
        },
        mounted() {
            this.getButtonList();
            this.selectList();
            this.exportBtnDisabled = true;
            this.loadUnit();
        }
    };
</script>
<style>
    .list .cargoInfo {
        float: inherit;
    }

    /*弹出层“天”跑出输入框外面*/
    .cargoInfo .el-input__suffix {
        right: 15px;
    }

    .el-select-dropdown {
        width: 200px !important;
    }

    .ownerInfo .el-table__header {
        width: 100% !important;
    }

    .material-dialog .el-dialog__body {
        padding: 30px 20px 10px !important;
        background-color: #ffffff;
    }

    .material-dialog .el-dialog__footer {
        padding: 5px 15px 20px !important;
        background-color: #ffffff;
    }

    .add-extension {
        font-size: 18px;
        margin: 35px 10px;
        cursor: pointer;
    }

    .add-extension:hover {
        color: #dd6161;
    }

</style>
