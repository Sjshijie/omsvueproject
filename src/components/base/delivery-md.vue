// 送达方管理
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
                    <el-form size="mini" :inline="true" label-width="120px" :model="formInline" class="demo-form-inline"
                             status-icon ref="formInline">
                        <el-row :gutter="10">
                            <!--送达方编码-->
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item prop="deliveryCode" :label="$t('deliveryThead.deliveryCode') + '：'">
                                    <el-input v-model="formInline.deliveryCode" style="height: 30px;line-height: 30px;"
                                              :placeholder="$t('common.pleaseEnter')"
                                              :maxlength="60"></el-input>
                                </el-form-item>
                            </el-col>
                            <!--送达方全称-->
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item prop="deliveryName" :label="$t('deliveryThead.deliveryName') + '：'">
                                    <el-input v-model="formInline.deliveryName"
                                              :placeholder="$t('common.pleaseEnter')"
                                              :maxlength="100"></el-input>
                                </el-form-item>
                            </el-col>
                            <!--SAP编码-->
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item prop="sapCode" :label="$t('deliveryThead.sapCode') + '：'">
                                    <el-input v-model="formInline.sapCode"
                                              :placeholder="$t('common.pleaseEnter')"
                                              :maxlength="100"></el-input>
                                </el-form-item>
                            </el-col>
                            <!--统一社会信用代码-->
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item label="统一社会信用代码：">
                                    <el-input v-model="formInline.socialCreditCode"
                                              :placeholder="$t('common.pleaseEnter')"
                                              :maxlength='100'></el-input>
                                </el-form-item>
                            </el-col>
                            <!--售达方全称-->
                            <!--<el-col :xs="24" :sm="8" :lg="6" :xl="6">-->
                            <!--<el-form-item prop="soldName" :label="$t('soldThead.soldName') + '：'">-->
                            <!--<el-input v-model="formInline.soldName" :placeholder="$t('common.pleaseEnter') + $t('soldThead.soldName')"-->
                            <!--:maxlength="50"></el-input>-->
                            <!--</el-form-item>-->
                            <!--</el-col>-->
                            <!--销售渠道-->
                            <!--<el-col :xs="24" :sm="8" :lg="6" :xl="6">-->
                            <!--<el-form-item prop="salesChannel" :label="$t('deliveryThead.salesChannel') + '：'">-->
                            <!--<el-select v-model="formInline.salesChannel" clearable :placeholder="$t('common.pleaseChoose')"-->
                            <!--class="select">-->
                            <!--<el-option v-for="item in dict.salesChannel" :key="item.name" :label="item.des"-->
                            <!--:value="item.name"></el-option>-->
                            <!--</el-select>-->
                            <!--</el-form-item>-->
                            <!--</el-col>-->
                            <!--<el-col :xs="24" :sm="8" :lg="6" :xl="6">-->
                            <!--<el-form-item prop="line" label="所属线路：">-->
                            <!--<el-input v-model="formInline.line" placeholder="请输入所属线路" :maxlength="100"></el-input>-->
                            <!--</el-form-item>-->
                            <!--</el-col>-->

                            <!--<el-col :xs="24" :sm="8" :lg="6" :xl="6">-->
                            <!--<el-form-item prop="contactPerson" label="联系人：">-->
                            <!--<el-input v-model="formInline.contactPerson" placeholder="请输入联系人" :maxlength="50"></el-input>-->
                            <!--</el-form-item>-->
                            <!--</el-col>-->
                            <!--<el-col :xs="24" :sm="8" :lg="6" :xl="6">-->
                            <!--<el-form-item prop="telephone" label="联系电话：">-->
                            <!--<el-input v-model="formInline.telephone" placeholder="请输入联系电话" :maxlength="11"></el-input>-->
                            <!--</el-form-item>-->
                            <!--</el-col>-->
                            <!--状态-->
                            <!--<el-col :xs="24" :sm="8" :lg="6" :xl="6">-->
                            <!--<el-form-item prop="status" :label="$t('commonThead.status') + '：'">-->
                            <!--<el-select v-model="formInline.status" clearable :placeholder="$t('common.pleaseChoose')" class="select">-->
                            <!--<el-option v-for="item in dict.status" :key="item.name" :label="item.des"-->
                            <!--:value="item.name"></el-option>-->
                            <!--</el-select>-->
                            <!--</el-form-item>-->
                            <!--</el-col>-->
                        </el-row>
                        <div class="footer-but tar pad_r pad_t">
                            <el-button type="primary" @click="getUser">{{ $t('button.query') }}</el-button>
                            <el-button @click="resetForm('formInline')">{{ $t('button.reset') }}</el-button>
                            <el-button :disabled="this.exportBtnDisabled" @click="exportExcel"
                                       class="base_delivery_export hide">导出
                            </el-button>
                            <!--<el-button :disabled="this.exportBtnDisabled" @click="exportExcel" v-if="permissions('base_delivery_export')">导出</el-button>-->
                        </div>
                    </el-form>
                </div>
            </div>
        </el-collapse-transition>

        <!--新增、删除-->
        <div class="add_move def-but">
            <el-button @click="handleAdd('addFormRules')" class="base_delivery_add hide">{{ $t('button.add') }}
            </el-button>
            <el-button type="primary" @click="importExcel" class="base_delivery_import hide" :disabled="!(users && users.length > 0)">{{ $t('button.importExcel')
                }}
            </el-button>
            <!--<el-button @click="handleAdd('addFormRules')" v-if="permissions('base_delivery_add')">{{ $t('button.add') }}</el-button>-->
            <!--<el-button type="primary" @click="importExcel" v-if="permissions('base_delivery_import')">{{ $t('button.importExcel') }}</el-button>-->
        </div>

        <!-- 列表 -->
        <div class="list_delivery list_operation">
            <el-table highlight-current-row stripe :data="users" v-loading="listLoading" @selection-change="selsChange"
                      style="width: 100%;" :fit="true" border align="center" :empty-text="emptyText" :height="tableListHeight">
                <!--序号-->
                <el-table-column :label="$t('commonThead.index')" align="center" type="index"
                                 width="50"></el-table-column>
                <!--送达方编码-->
                <!--v-else-if="permissions('base_delivery_detail')"-->
                <el-table-column :label="$t('deliveryThead.deliveryCode')" prop="deliveryCode" align="center" sortable
                                 text-overflow="ellipsis" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div slot="reference" @click="handleLook(scope.row)" class="name-wrapper hand">
                            {{ scope.row.deliveryCode }}
                        </div>
                        <!--<div slot="reference" v-else class="name-wrapper hand">-->
                        <!--{{ scope.row.deliveryCode }}-->
                        <!--</div>-->
                    </template>
                </el-table-column>
                <!--送达方全称-->
                <el-table-column :label="$t('deliveryThead.deliveryName')" prop="deliveryName" align="center"
                                 text-overflow="ellipsis" show-overflow-tooltip>
                </el-table-column>
                <!--送达方简称-->
                <el-table-column :label="$t('deliveryThead.shortName')" prop="shortName" align="center"
                                 text-overflow="ellipsis" show-overflow-tooltip>
                </el-table-column>
                <!--sap编码-->
                <el-table-column :label="$t('deliveryThead.sapCode')" prop="sapCode" align="center"
                                 text-overflow="ellipsis" show-overflow-tooltip>
                </el-table-column>
                <!--统一社会信用代码-->
                <el-table-column :label="$t('deliveryThead.socialCreditCode')" prop="socialCreditCode" align="center"
                                 text-overflow="ellipsis" show-overflow-tooltip></el-table-column>
                <!--修改人-->
                <el-table-column :label="$t('commonThead.updater')" prop="updaterName" align="center"
                                 width="120"></el-table-column>
                <!--修改时间-->
                <!--<el-table-column :label="$t('commonThead.updateTime')" prop="updateTime" :formatter="formatterUpdate"
                                 align="center" text-overflow="ellipsis" show-overflow-tooltip></el-table-column>-->
                <!--操作-->
                <!--v-if="permissions('base_delivery_update')"-->
                <el-table-column fixed="right" :label="$t('commonThead.operation')" align="center" width="70">
                    <template slot-scope="scope">
                        <el-tooltip content="修改" placement="top" effect="light"
                                    v-if="permissions('base_delivery_update')">
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
                                   :current-page="this.pager.page"
                                   :page-sizes="[5, 10, 20, 50]" :page-size="this.pager.rows"
                                   layout="total,sizes, prev, pager, next, jumper"
                                   :total="this.pager.total"></el-pagination>
                </div>
            </el-col>
        </div>


        <!-- 新增界面 -->
        <el-dialog :visible.sync="addFormVisible" :close-on-click-modal="false" @close="off('addFormRules')"
                   style="line-height: 0;overflow: hidden;font-size: 12px;" title="" class="md-dialog">
            <template>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="送达方信息" name="first" class="deliveryInfoHeight">
                        <div class="form form-add soldforme-add" style="height: 200px;">
                            <el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addFormRules"
                                     size="mini">
                                <!--送达方编码-->
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="送达方编码:" prop="deliveryCode">
                                            <el-tooltip content="最多输入20个字符" placement="right" effect="light"
                                                        :disabled="updateStatus">
                                                <el-input v-model.trim="addForm.deliveryCode" :maxlength="20"
                                                          :disabled="updateStatus"></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <!--送达方全称-->
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="送达方全称:" prop="deliveryName">
                                            <el-tooltip content="最多输入100个字符" placement="right" effect="light"
                                                        :disabled="updateStatus">
                                                <el-input v-model="addForm.deliveryName" :maxlength="100"
                                                          :disabled="updateStatus"></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <!--SAP送达方编码-->
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="SAP编码:" prop="sapCode">
                                            <el-tooltip content="最多输入50个字符" placement="right" effect="light"
                                                        :disabled="updateStatus">
                                                <el-input v-model="addForm.sapCode" :maxlength="50"
                                                          :disabled="updateStatus"></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <!--统一社会信用代码-->
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="统一社会信用代码:" prop="socialCreditCode">
                                            <el-tooltip content="最多输入18个字符" placement="right" effect="light"
                                                        :disabled="updateStatus">
                                                <el-input v-model="addForm.socialCreditCode" :maxlength="18"
                                                          :disabled="updateStatus"></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <!--法人-->
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="法人:" prop="legalPerson">
                                            <el-tooltip content="最多输入50个字符" placement="right" effect="light"
                                                        :disabled="updateStatus">
                                                <el-input v-model="addForm.legalPerson" :maxlength="50"
                                                          :disabled="updateStatus"></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <!--营业截至日期-->
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="营业截至日期:" prop="operatingPeriod">
                                            <div class="block">
                                                <el-date-picker
                                                        v-model="addForm.operatingPeriod"
                                                        type="date"
                                                        :editable=false
                                                        placeholder="选择日期" :disabled="updateStatus">
                                                </el-date-picker>
                                            </div>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <!--售达方编码-->
                                <!--<el-col :span="12">-->
                                <!--<div class="grid-content bg-purple">-->
                                <!--<el-form-item label="售达方编码:" prop="sapCode">-->
                                <!--<el-tooltip content="最多输入50个字符" placement="right" effect="light" :disabled="CheckStatus">-->
                                <!--<el-input v-model="addForm.sapCode" :maxlength="50" :disabled="CheckStatus"></el-input>-->
                                <!--</el-tooltip>-->
                                <!--</el-form-item>-->
                                <!--</div>-->
                                <!--</el-col>-->
                                <!--送达方简称-->
                                <!--<el-col :span="12">-->
                                <!--<div class="grid-content bg-purple">-->
                                <!--<el-form-item label="送达方简称:" prop="shortName">-->
                                <!--<el-tooltip content="最多输入100个字符" placement="right" effect="light">-->
                                <!--<el-input v-model="addForm.shortName" :maxlength="100"></el-input>-->
                                <!--</el-tooltip>-->
                                <!--</el-form-item>-->
                                <!--</div>-->
                                <!--</el-col>-->
                                <!--售达方名称-->
                                <!--<el-col :span="12">-->
                                <!--<div class="grid-content bg-purple">-->
                                <!--<el-form-item label="售达方名称:" prop="soldId">-->
                                <!--<el-select-->
                                <!--v-model="addForm.soldId"-->
                                <!--filterable-->
                                <!--remote-->
                                <!--reserve-keyword-->
                                <!--placeholder="请输入关键词"-->
                                <!--:remote-method="remoteMethod"-->
                                <!--:loading="loading" :disabled="CheckStatus">-->
                                <!--<el-option-->
                                <!--v-for="(item, index) in soldList"-->
                                <!--:key="item.value + '-' + index"-->
                                <!--:label="item.label"-->
                                <!--:value="item.value">-->
                                <!--</el-option>-->
                                <!--</el-select>-->
                                <!--&lt;!&ndash;<el-input v-model="addForm.soldId"></el-input>&ndash;&gt;-->
                                <!--</el-form-item>-->
                                <!--</div>-->
                                <!--</el-col>-->
                                <!--银行账号-->
                                <!--<el-col :span="12">-->
                                <!--<div class="grid-content bg-purple">-->
                                <!--<el-form-item label="银行账号:" prop="sapCode">-->
                                <!--<el-tooltip content="最多输入50个字符" placement="right" effect="light" :disabled="CheckStatus">-->
                                <!--<el-input v-model="addForm.sapCode" :maxlength="50" :disabled="CheckStatus"></el-input>-->
                                <!--</el-tooltip>-->
                                <!--</el-form-item>-->
                                <!--</div>-->
                                <!-- </el-col> -->
                                <!-- 销售渠道 -->
                                <!-- <el-col :span="12">-->
                                <!--<div class="grid-content bg-purple">-->
                                <!--<el-form-item label="销售渠道:" prop="salesChannel">-->
                                <!--<el-select v-model="addForm.salesChannel" clearable placeholder="请选择"-->
                                <!--class="select">-->
                                <!--<el-option v-for="item in dict.salesChannel" :key="item.name" :label="item.des"-->
                                <!--:value="item.name"></el-option>-->
                                <!--</el-select>-->
                                <!--</el-form-item>-->
                                <!--</div>-->
                                <!--</el-col>-->
                                <!--所属路线-->
                                <!--<el-col :span="12">-->
                                <!--<div class="grid-content bg-purple">-->
                                <!--<el-form-item label="所属路线:" prop="line">-->
                                <!--<el-input v-model="addForm.line" :maxlength="100"></el-input>-->
                                <!--</el-form-item>-->
                                <!--</div>-->
                                <!--</el-col>-->
                                <!--国家名称-->
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="国家名称:" prop="countryCode">
                                            <el-select v-model="addForm.countryCode"
                                                       @change="addressChange('addressed', addForm.countryCode)"
                                                       filterable
                                                       placeholder="请选择" :disabled="updateStatus">
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
                                <!--省名称-->
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="省名称:" prop="provinceCode">
                                            <el-select v-model="addForm.provinceCode"
                                                       @change="addressChange('city', addForm.provinceCode)" filterable
                                                       placeholder="请选择" :disabled="updateStatus">
                                                <el-option v-for="item in addressed"
                                                           :key="item.id"
                                                           :label="item.name"
                                                           :value="item.code">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <!--市名称-->
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="市名称:" prop="cityCode">
                                            <el-select v-model="addForm.cityCode"
                                                       @change="addressChange('county',addForm.cityCode)"
                                                       filterable placeholder="请选择" :disabled="updateStatus">
                                                <el-option v-for="item in city"
                                                           :key="item.id"
                                                           :label="item.name"
                                                           :value="item.code">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <!--区县名称-->
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="区县名称:" prop="districtCode">
                                            <el-select v-model="addForm.districtCode"
                                                       @change="addressChange('street',addForm.districtCode)" filterable
                                                       placeholder="请选择" :disabled="updateStatus">
                                                <el-option v-for="item in county"
                                                           :key="item.id"
                                                           :label="item.name"
                                                           :value="item.code">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <!--街道名称-->
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="街道名称:" prop="streetCode">
                                            <el-select v-model="addForm.streetCode" filterable placeholder="请选择"
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
                                <!--详细地址-->
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="详细地址:" prop="address">
                                            <el-tooltip content="最多输入200个字符" placement="right" effect="light"
                                                        :disabled="updateStatus">
                                                <el-input v-model="addForm.address" :maxlength="200"
                                                          :disabled="updateStatus"></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <!--邮政编码-->
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="邮政编码:" prop="postcode">
                                            <el-tooltip content="最多输入6个字符" placement="right" effect="light"
                                                        :disabled="updateStatus">
                                                <el-input v-model="addForm.postcode" :maxlength="6"
                                                          :disabled="updateStatus"></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <!--联系人-->
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="联系人:" prop="contactPerson">
                                            <el-tooltip content="最多输入50个字符" placement="right" effect="light"
                                                        :disabled="updateStatus">
                                                <el-input v-model="addForm.contactPerson" :maxlength="50"
                                                          :disabled="updateStatus"></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <!--联系电话-->
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="联系电话:" prop="telephone">
                                            <el-tooltip content="最多输入13个字符" placement="right" effect="light"
                                                        :disabled="updateStatus">
                                                <el-input v-model="addForm.telephone" :maxlength="13"
                                                          :disabled="updateStatus"></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <!--经营范围-->
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="经营范围:" prop="businessScope">
                                            <el-tooltip content="最多输入500个字符" placement="right" effect="light"
                                                        :disabled="updateStatus">
                                                <el-input type="textarea" width="190" :rows="2"
                                                          v-model="addForm.businessScope" :maxlength='500'
                                                          :disabled="updateStatus"></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <!--证明材料-->
                                <el-col :span="12" class="rf imgWidth">
                                    <div class="grid-content bg-purple" v-show="visible.imgView">
                                        <el-form-item label="证明材料:" prop="contacts">
                                            <el-upload
                                                    class="upload-demo"
                                                    :class="{'upload-pic': updateStatus}"
                                                    name="files"
                                                    :action="importFileUrl"
                                                    :headers="upLoadData"
                                                    :on-preview="handlePreviewContacts"
                                                    :on-remove="handleRemoveContacts"
                                                    :onSuccess="uploadSuccessContacts"
                                                    :file-list="fileListContacts"
                                                    :onProgress="uploadProgressContacts"
                                                    :before-upload="beforeUploadContacts"
                                                    :limit="3"
                                                    :list-type="pictureFlag" :disabled="updateStatus">
                                                <el-button size="mini" v-show="!updateStatus">点击上传</el-button>
                                                <div slot="tip" v-show="!updateStatus" class="el-upload__tip">只能上传jpg/jpeg/png图片，且不超过5MB</div>
                                            </el-upload>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <!--送达方照片-->
                                <el-col :span="12" class="lf imgWidth">
                                    <div class="grid-content bg-purple" v-show="visible.imgViewTo">
                                        <el-form-item label="送达方照片:" prop="photoPath">
                                            <!-- :onSuccess="uploadSuccess"-->
                                            <el-upload
                                                    class="upload-demo"
                                                    :class="{'upload-pic': updateStatus}"
                                                    name="files"
                                                    :action="importFileUrl"
                                                    :headers="upLoadData"
                                                    :on-preview="handlePreview"
                                                    :on-remove="handleRemove"
                                                    :onSuccess="uploadSuccess"
                                                    :onProgress="uploadProgress"
                                                    :before-upload="beforeUpload"
                                                    :limit="1"
                                                    :file-list="photoPath"
                                                    :list-type="pictureFlag" :disabled="updateStatus">
                                                <el-button size="mini" v-show="!updateStatus">点击上传</el-button>
                                                <div slot="tip" v-show="!updateStatus" class="el-upload__tip">只能上传jpg/jpeg/png图片，且不超过5MB</div>
                                            </el-upload>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <!--经纬度-->
                                <!--<el-col :span="12">-->
                                <!--<div class="grid-content bg-purple">-->
                                <!--<el-form-item label="经纬度:" prop="lngLat">-->
                                <!--<el-tooltip content="最多输入20个字符" placement="right" effect="light">-->
                                <!--<el-input v-model="addForm.lngLat" :maxlength="20"></el-input>-->
                                <!--</el-tooltip>-->
                                <!--</el-form-item>-->
                                <!--</div>-->
                                <!--</el-col>-->
                                <!--电子围栏-->
                                <!--<el-col :span="12">-->
                                <!--<div class="grid-content bg-purple">-->
                                <!--<el-form-item label="电子围栏:" prop="electronFence">-->
                                <!--<el-tooltip content="最多输入18个字符" placement="right" effect="light">-->
                                <!--<el-input v-model="addForm.electronFence" :maxlength="18"></el-input>-->
                                <!--</el-tooltip>-->
                                <!--</el-form-item>-->
                                <!--</div>-->
                                <!--</el-col>-->
                            </el-form>
                        </div>
                        <div class="dialog-footer def-but deliveryRf">
                            <el-button @click.native="addSubmit('addFormRules')" :loading="addLoading"
                                       :disabled="updateStatus" v-if="!updateStatus">{{ $t('button.save') }}
                            </el-button>
                            <el-button @click.native="off('addFormRules')">{{ $t('button.cancel') }}</el-button>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="关系信息" name="second" class="deliveryInfoHeight">
                        <el-table stripe :data="deliveryList" v-loading="listLoading" @selection-change="selsChange"
                                  class="relation-table"
                                  style="width: 100%;" border :fit="true" align="center" height="160"
                                  @row-dblclick="deliveryEditor">
                            <!--全选-->
                            <el-table-column align="center" type="selection" v-if="!CheckStatus"></el-table-column>
                            <!--序号-->
                            <el-table-column :label="$t('commonThead.index')" align="center" type="index"
                                             width="50"></el-table-column>
                            <el-table-column label="送达方简称" width="140" prop="shortName" align="center"
                                             text-overflow="ellipsis"
                                             show-overflow-tooltip>
                                <!--<template>-->
                                <!--{{this.addForm.shortName}}-->
                                <!--</template>-->
                                <template slot-scope="scope">
                                    <el-input size="mini" :maxlength="100" v-if="scope.row.isEditing"
                                              v-model="scope.row.shortName"></el-input>
                                    <div slot="reference" v-if="!scope.row.isEditing">
                                        {{ scope.row.shortName }}
                                    </div>
                                </template>
                            </el-table-column>
                            <!--仓储中心编码-->
                            <el-table-column label="仓储中心编码" width="140" prop="storageCenterCode" align="center"
                                             text-overflow="ellipsis"
                                             show-overflow-tooltip>
                            </el-table-column>
                            <!--仓储中心名称-->
                            <el-table-column label="仓储中心名称" width="120" prop="storageCenterName" align="center"
                                             text-overflow="ellipsis" show-overflow-tooltip>
                            </el-table-column>
                            <!--货主编码-->
                            <el-table-column label="货主编码" width="200" prop="shipperCode" align="center"
                                             text-overflow="ellipsis"
                                             show-overflow-tooltip>
                            </el-table-column>
                            <!--货主名称-->
                            <el-table-column label="货主名称" width="160" prop="shipperName" align="center"
                                             text-overflow="ellipsis"
                                             show-overflow-tooltip>
                            </el-table-column>
                            <!--销售线路-->
                            <el-table-column label="销售渠道" width="140" prop="saleChannel" align="center"
                                             text-overflow="ellipsis"
                                             show-overflow-tooltip class="editColumn">
                                <template slot-scope="scope">
                                    <!--<el-input  size="mini" :maxlength="160" v-if="scope.row.isEditing"-->
                                    <!--v-model="scope.row.saleChannel"></el-input>-->
                                    <el-select size="mini" v-if="scope.row.isEditing" :maxlength="140"
                                               v-model="scope.row.saleChannel" clearable
                                               placeholder="请选择" class="select">
                                        <el-option v-for="item in dict.salesChannel" :key="item.name" :label="item.des"
                                                   :value="item.name"></el-option>
                                    </el-select>
                                    <div slot="reference" v-if="!scope.row.isEditing">
                                        {{saleChanneltype(scope.row)}}
                                    </div>
                                </template>
                            </el-table-column>
                            <!--线路-->
                            <el-table-column label="线路" width="140" prop="line" align="center" text-overflow="ellipsis"
                                             show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <el-input size="mini" :maxlength="20" v-if="scope.row.isEditing"
                                              v-model="scope.row.line"></el-input>
                                    <div slot="reference" v-if="!scope.row.isEditing">
                                        {{ scope.row.line }}
                                    </div>
                                </template>
                            </el-table-column>
                            <!--效期要求-->
                            <el-table-column label="效期要求" width="140" prop="validityPeriodRequirement" align="center"
                                             text-overflow="ellipsis"
                                             show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <el-input size="mini" v-if="scope.row.isEditing"
                                              v-model="scope.row.validityPeriodRequirement" placeholder="只能输入数字"
                                              :maxlength='10'
                                              @keyup.native="scope.row.validityPeriodRequirement=scope.row.validityPeriodRequirement.replace(/[^\d]/g,'')"></el-input>
                                    <div slot="reference" v-if="!scope.row.isEditing">
                                        {{ scope.row.validityPeriodRequirement }}
                                    </div>
                                </template>
                            </el-table-column>
                            <!--操作-->
                            <el-table-column fixed="right" :label="$t('commonThead.operation')" align="center"
                                             :width="operationWidth">
                                <template slot-scope="scope">
                                    <!--<el-button v-if="!scope.row.isEditing" @click="deliveryEditor(scope.row)">编辑</el-button>-->
                                    <!--<el-button v-if="scope.row.isEditing" @click="deliveryTheBinding(scope.row)">保存</el-button>-->
                                    <el-button @click="deliveryDelete(scope.row)" :disabled="CheckStatus">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!--<el-pagination-->
                        <!--@size-change="handleSizeChange"-->
                        <!--@current-change="handleCurrentChange"-->
                        <!--:current-page.sync="currentPage1"-->
                        <!--:page-size="this.deliveryPager.page"-->
                        <!--layout="total, prev, pager, next"-->
                        <!--:total="this.deliveryPager.total">-->
                        <!--</el-pagination>-->
                        <el-form :model="addForm" label-width="120px" size="mini" style="height: auto;"
                                 class="addSoldInfo deliveryMdTop" v-if="!CheckStatus">
                            <!--货主名称-->
                            <el-col :span="10">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="货主名称:" prop="shipperName">
                                        <el-col :span="12">
                                            <el-autocomplete
                                                    class="inline-input"
                                                    v-model="state"
                                                    :fetch-suggestions="querySearch"
                                                    placeholder="根据名称模糊查询"
                                                    @select="handleSelect"
                                                    :trigger-on-focus="false"
                                                    clearable
                                            ></el-autocomplete>
                                        </el-col>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <!--仓储中心名称-->
                            <el-col :span="10">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="仓储中心名称:" prop="factoryLogisticsCode">
                                        <el-col :span="12">
                                            <el-select v-model="valueName" placeholder="请选择"
                                                       @change="storageCenterCodeclick" clearable>
                                                <el-option
                                                        v-for="item in options"
                                                        :key="item.storageCenterName"
                                                        :label="item.storageCenterName"
                                                        :value="item.storageCenterCode">
                                                </el-option>
                                            </el-select>
                                        </el-col>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="4">
                                <el-button :disabled="CheckStatus" @click="deliverAdd">增加</el-button>
                            </el-col>
                        </el-form>
                        <div class="dialog-footer def-but addsolodBtn" v-if="!CheckStatus">
                            <el-button @click.native="addSubmitTo" :disabled="CheckStatus">绑定</el-button>
                            <el-button @click.native="off">{{ $t('button.cancel') }}</el-button>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="物料关系" name="third" class="deliveryInfoHeight">
                        <div class="deliveryLf">
                            <el-table stripe :data="materialList" v-loading="listLoading" ref="multipleTable"
                                      @selection-change="BindingBelsChange" class="material-ext"
                                      style="width: 100%;" border :fit="true" align="center" height="280">
                                <!--全选-->
                                <el-table-column align="center" type="selection" ref="material-ext"></el-table-column>
                                <!--货主名称-->
                                <el-table-column label="货主名称" width="140" prop="shipperName" align="center"
                                                 text-overflow="ellipsis"
                                                 show-overflow-tooltip>
                                </el-table-column>
                                <!--货主代码-->
                                <el-table-column label="货主代码" width="140" prop="shipperCode" align="center"
                                                 text-overflow="ellipsis" show-overflow-tooltip>
                                </el-table-column>
                                <!--仓储中心名称-->
                                <el-table-column label="仓储中心名称" width="140" prop="storageCenterName" align="center"
                                                 text-overflow="ellipsis"
                                                 show-overflow-tooltip>
                                </el-table-column>
                                <!--仓储中心代码-->
                                <el-table-column label="仓储中心代码" width="140" prop="storageCenterCode" align="center"
                                                 text-overflow="ellipsis"
                                                 show-overflow-tooltip>
                                </el-table-column>
                            </el-table>
                            <div class="dialog-footer def-but addDelveryBtn" v-if="!CheckStatus">
                                <!--<el-button @click.native="addSubmit">确定</el-button>-->
                                <el-button @click.native="off">{{ $t('button.cancel') }}</el-button>
                            </div>
                        </div>
                        <div class="deliveryRfTo">
                            <template>
                                <el-tabs v-model="activeNameTo" @tab-click="handleClickTo">
                                    <el-tab-pane label="已绑定" name="IsBinding">
                                        <el-form :model="isBindingForm" :rules="addFormRules" ref="addForm" size="mini"
                                                 style="height: auto;" class="adddeliveryInfo">
                                            <!--物料名称-->
                                            <!--<el-col :span="10">-->
                                            <!--<div class="grid-content bg-purple">-->
                                            <!--<el-form-item label="物料名称:" prop="soldCode">-->
                                            <!--<el-tooltip content="最多输入50个字符" placement="right" effect="light"-->
                                            <!--:disabled="CheckStatus">-->
                                            <!--<el-input v-model="isBindingForm.materialName"-->
                                            <!--:maxlength='50'-->
                                            <!--:disabled="CheckStatus"></el-input>-->
                                            <!--</el-tooltip>-->
                                            <!--</el-form-item>-->
                                            <!--</div>-->
                                            <!--</el-col>-->
                                            <!--物料代码-->
                                            <el-col :span="15" style="margin-left: 6px">
                                                <div class="grid-content bg-purple">
                                                    <el-form-item label="物料代码:" prop="soldName">
                                                        <el-tooltip content="最多输入20个字符" placement="right"
                                                                    effect="light" :disabled="CheckStatus">
                                                            <el-input v-model="isBindingForm.materialCode"
                                                                      :maxlength='20'
                                                                      :disabled="CheckStatus"></el-input>
                                                        </el-tooltip>
                                                    </el-form-item>
                                                </div>
                                            </el-col>
                                            <!--物料代码-->
                                            <el-col :span="3" class="TheQuery">
                                                <el-button @click="IsBinding('yes')" :disabled="CheckStatus">查询
                                                </el-button>
                                            </el-col>
                                        </el-form>
                                        <el-table stripe :data="BindingList" v-loading="listLoading"
                                                  @selection-change="BindingChange"
                                                  style="width: 100%;" border :fit="true" align="center" height="186">
                                            <!--全选-->
                                            <el-table-column align="center" type="selection"
                                                             v-if="!CheckStatus"></el-table-column>
                                            <!--物料名称-->
                                            <el-table-column width="140px" label="物料名称" prop="materialName"
                                                             align="center"
                                                             text-overflow="ellipsis"
                                                             show-overflow-tooltip>
                                            </el-table-column>
                                            <!--物料代码-->
                                            <el-table-column width="140px" label="物料代码" prop="materialCode"
                                                             align="center"
                                                             text-overflow="ellipsis" show-overflow-tooltip>
                                            </el-table-column>
                                            <!--效期要求-->
                                            <el-table-column label="效期要求" prop="validityPeriodRequirement"
                                                             align="center" text-overflow="ellipsis"
                                                             show-overflow-tooltip>
                                            </el-table-column>
                                        </el-table>

                                        <div class="dialog-footer def-but addDelveryBtn" v-if="!CheckStatus">
                                            <el-button @click="unbundling">解绑</el-button>
                                        </div>
                                    </el-tab-pane>
                                    <el-tab-pane label="未绑定" name="NoBinding">
                                        <el-form :model="isBindingForm" size="mini" style="height: auto;"
                                                 class="adddeliveryInfo">
                                            <!--物料名称-->
                                            <el-col :span="10">
                                                <div class="grid-content bg-purple">
                                                    <el-form-item label="物料名称:" prop="soldCode">
                                                        <el-tooltip content="最多输入100个字符" placement="right" effect="light"
                                                                    :disabled="CheckStatus">
                                                            <el-input v-model="isBindingForm.materialName"
                                                                      :maxlength='100'
                                                                      :disabled="CheckStatus"></el-input>
                                                        </el-tooltip>
                                                    </el-form-item>
                                                </div>
                                            </el-col>
                                            <!--物料代码-->
                                            <el-col :span="10" style="margin-left: 6px">
                                                <div class="grid-content bg-purple">
                                                    <el-form-item label="物料代码:" prop="soldName">
                                                        <el-tooltip content="最多输入20个字符" placement="right"
                                                                    effect="light" :disabled="CheckStatus">
                                                            <el-input v-model="isBindingForm.materialCode"
                                                                      :maxlength='20'
                                                                      :disabled="CheckStatus"></el-input>
                                                        </el-tooltip>
                                                    </el-form-item>
                                                </div>
                                            </el-col>
                                            <!--物料代码-->
                                            <el-col :span="3" class="TheQuery" style="margin-top: 30px;">
                                                <el-button @click="IsBinding('no')" :disabled="CheckStatus">查询
                                                </el-button>
                                            </el-col>
                                        </el-form>
                                        <el-table stripe :data="noBindingList" v-loading="listLoading"
                                                  @selection-change="noselsChange"
                                                  style="width: 100%;" border :fit="true" align="center" height="186">
                                            <!--全选-->
                                            <el-table-column align="center" type="selection"
                                                             v-if="!CheckStatus"></el-table-column>
                                            <!--物料名称-->
                                            <el-table-column width="140px" label="物料名称" prop="materialName"
                                                             align="center"
                                                             text-overflow="ellipsis"
                                                             show-overflow-tooltip>
                                            </el-table-column>
                                            <!--物料代码-->
                                            <el-table-column width="140px" label="物料代码" prop="materialCode"
                                                             align="center"
                                                             text-overflow="ellipsis" show-overflow-tooltip>
                                            </el-table-column>
                                            <!--效期要求-->
                                            <el-table-column label="效期要求" prop="validityPeriodRequirement"
                                                             align="center" text-overflow="ellipsis"
                                                             show-overflow-tooltip>
                                                <template slot-scope="scope">
                                                    <el-input size="mini" v-model="scope.row.validityPeriodRequirement"
                                                              placeholder="只能输入数字" :maxlength='10'
                                                              @keyup.native="scope.row.validityPeriodRequirement=scope.row.validityPeriodRequirement.replace(/[^\d]/g,'')"></el-input>
                                                </template>
                                            </el-table-column>
                                        </el-table>

                                        <div class="dialog-footer def-but addDelveryBtn" v-if="!CheckStatus">
                                            <el-button @click="gobundling">绑定</el-button>
                                        </div>
                                    </el-tab-pane>
                                </el-tabs>
                            </template>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </template>
        </el-dialog>

        <!--导入-->
        <el-dialog title="导入送达方信息" :close-on-click-modal="false" :visible.sync="centerDialogVisible" width="30%" center
                   @close='closeCenterDialogVisible()'>
            <el-upload class="upload-demo" :auto-upload="false" ref="upload"
                       :action="UploadUrl()" name="filename" :headers="upLoadData"
                       multiple :limit="1" :on-change="uploadChange" :on-success="handleSuccess" :file-list="fileList">
                <el-button size="small" type="primary" class="active">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传xlsx文件,且不能超过2.5M</div>
            </el-upload>
            <div slot="footer" class="dialog-footer-but">
                <el-button type="primary" @click="exportModeTemplate">下载模板</el-button>
                <el-button @click="cancleUpload">取消</el-button>
                <el-button type="primary" @click="submitUpload">确定</el-button>
            </div>
        </el-dialog>
        <!--<el-dialog :visible.sync="errorDialogVisible" title="导入失败" @close="closeErrorLog" width="30%" center>
            <div>文件导入失败，请点击按钮查看错误日志</div>
            <el-button type="primary" @click="downloadErrorLog()">错误日志</el-button>
        </el-dialog>-->
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
        <!--预览大图-->
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-dialog :visible.sync="contactDialogVisible">
            <img width="100%" :src="contactDialogImageUrl" alt="">
        </el-dialog>

    </div>
</template>
<script>
    import util from '../../common/js/util';
    import config from '../../common/js/config';
    import cookieOperation from '../../common/js/cookieOperation';
    import axios from 'axios/index';

    export default {
        data() {
            return {
                // 初始化页面参数
                init: 1,
                valueName: '',
                options: [],
                // 导入
                fileList: [],
                centerDialogVisible: false,
                errorDialogVisible: false,
	            importProgressVisible: false,
	            errorLogButtonVisible: false,
	            importProgressList: [], // 导入进度条
                //导出
                exportBtnDisabled: true,
                progressList: [], // 导出进度条
                exportProgressVisible: false,
                exprotProgressIds: [],
                // 分页
                pager: {
                    page: 1,
                    rows: 20,
                    total: 0
                },
                errorLogPath: '',
                dict: '',
                soldList: [],
                list: [],
                loading: false,
                activeName: 'first',
                activeNameTo: 'IsBinding',
                address: [],
                addressed: [],
                city: [],
                county: [],
                street: [],
                sold: [],
                formInline: {
                    deliveryCode: '',
                    deliveryName: '',
                    socialCreditCode: '',
                    salesChannel: '',
                    line: '',
                    sapCode: '',
                    contactPerson: '',
                    telephone: '',
                    status: ''
                },
                users: [],
                newUser: null,
                dates: [],
                dblId: [],
                soldId: '',
                type: '',
                listLoading: false,
                sels: [], // 列表选中列
                lookFormVisible: false, // 查看界面是否显示
                lookLoading: false,
                lookFormRules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: this.trigger}
                    ],
                    createTime: [
                        {
                            type: 'date',
                            required: true,
                            message: '选择时间范围',
                            trigger: 'change'
                        }
                    ]
                },
                lookForm: {
                    deliveryCode: '',
                    deliveryName: '',
                    shortName: '',
                    status: '',
                    soldId: '',
                    salesChannel: '',
                    line: '',
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
                    address: '',
                    postcode: '',
                    contactPerson: '',
                    telephone: '',
                    sapCode: '',
                    version: '',
                    lngLat: '',
                    electronFence: ''
                },
                editFormVisible: false, // 编辑界面是否显示
                editLoading: false,
                trigger: 'blur',
                visible: {
                    imgView: true,
                    imgViewTo: true
                },
                editFormRules: {
                    deliveryCode: [
                        {required: true, message: '请输入送达方编码', trigger: this.trigger},
                        {required: true, message: '', trigger: this.trigger, validator: this.validCode}
                    ],
                    deliveryName: [
                        {required: true, message: '请添加送达方全称', trigger: this.trigger}
                    ],
                    shortName: [
                        {required: true, message: '请添加送达方简称', trigger: this.trigger}
                    ],
                    soldName: [
                        {required: true, message: '请选择售达方全称', trigger: 'change'}
                    ],
                    salesChannel: [
                        {required: true, message: '请添加销售渠道', trigger: this.trigger}
                    ],
                    // line: [
                    //   { required: true, message: '请添加所属路线', trigger: this.trigger }
                    // ],
                    countryId: [
                        {required: true, message: '请选择国家名称', trigger: 'change'}
                    ],
                    provinceId: [
                        {required: true, message: '请选择省名称', trigger: 'change'}
                    ],
                    cityId: [
                        {required: true, message: '请选择市名称', trigger: 'change'}
                    ],
                    districtId: [
                        {required: true, message: '请选择区县名称', trigger: 'change'}
                    ],
                    streetId: [
                        {required: true, message: '请选择街道名称', trigger: 'change'}
                    ],
                    postcode: [
                        {trigger: this.trigger, validator: this.isPostalCodeTo}
                    ],
                    contactPerson: [
                        {required: true, message: '请添加联系人', trigger: this.trigger}
                    ],
                    telephone: [
                        {required: true, trigger: this.trigger, validator: this.validPhone} // 这里需要用到全局变量 电话
                    ],
                    status: [
                        {required: true, message: '请选择状态', trigger: 'change'}
                    ],
                    lngLat: [
                        {required: true, message: '请输入经纬度', trigger: this.trigger}
                    ],
                    // sapCode: [
                    //   {
                    //     required: true,
                    //     message: '请添加SAP送达方编码',
                    //     trigger: this.trigger
                    //   }
                    // ],
                    address: [
                        {required: true, message: '请添加地址', trigger: this.trigger}
                    ],
                    electronFence: [
                        {required: true, message: '请添加电子围栏', trigger: this.trigger}
                    ]
                    // createTime: [
                    //   {
                    //     type: 'date',
                    //     required: true,
                    //     message: '选择时间范围',
                    //     trigger: 'change'
                    //   }
                    // ]
                },
                editForm: {
                    deliveryCode: '',
                    deliveryName: '',
                    shortName: '',
                    status: '',
                    soldId: '',
                    salesChannel: '',
                    line: '',
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
                    address: '',
                    postcode: '',
                    contactPerson: '',
                    telephone: '',
                    sapCode: '',
                    version: '',
                    lngLat: '',
                    electronFence: ''
                },
                addFormVisible: false, // 新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: this.trigger}
                    ],
                    deliveryCode: [
                        {required: true, message: '请输入送达方编码', trigger: this.trigger},
                        {required: true, message: '', trigger: this.trigger, validator: this.validCode}
                    ],
                    deliveryName: [
                        {required: true, message: '只能输入中文，英文，数字及._-@()', trigger: this.trigger, validator: this.stripscriptName}
                    ],
                    shortName: [
                        {required: true, message: '只能输入中文，英文，数字及._-@()', trigger: this.trigger, validator: this.stripscriptName}
                    ],
                    soldId: [
                        {required: true, message: '请选择售达方全称', trigger: 'change'}
                    ],
                    salesChannel: [
                        {required: true, message: '请输入销售渠道', trigger: this.trigger}
                    ],
                    // line: [
                    //   { required: true, message: '请输入所属路线', trigger: this.trigger }
                    // ],
                    countryCode: [
                        {required: true, message: '请选择国家名称', trigger: this.trigger}
                    ],
                    provinceCode: [
                        {required: true, message: '请选择省名称', trigger: this.trigger}
                    ],
                    cityCode: [
                        {required: true, message: '请选择市名称', trigger: this.trigger}
                    ],
                    districtCode: [
                        {required: true, message: '请选择区县名称', trigger: this.trigger}
                    ],
                    streetCode: [
                        {required: true, message: '请选择街道名称', trigger: this.trigger}
                    ],
                    postcode: [
                        {required: false, message: '', trigger: this.trigger},
                        {required: false, message: '', trigger: this.trigger, validator: this.isPostalCodeTo}
                    ],
                    contactPerson: [
                        {required: true, message: '只能输入中文，英文，数字及._-@()', trigger: this.trigger, validator: this.stripscriptName}
                    ],
                    telephone: [
                        {required: true, trigger: this.trigger, validator: this.validPhone} // 这里需要用到全局变量
                    ],
                    status: [
                        {required: true, message: '请选择状态', trigger: this.trigger}
                    ],
                    lngLat: [
                        {required: true, message: '请输入经纬度', trigger: this.trigger}
                    ],
                    sapCode: [
                        {required: false, message: '只可输入英文，数字及 ._-@()', trigger: this.trigger, validator: this.validCode}
                    ],
                    socialCreditCode: [
                        {required: false, message: '', trigger: this.trigger, validator: this.validNumber}
                    ],
                    legalPerson: [
                        {required: false, message: '', trigger: this.trigger, validator: this.stripscriptName}
                    ],
                    /*operatingPeriod: [
                        { message: '请选择营业截至日期', trigger: 'change'}
                    ],*/
                    businessScope: [
                        {required: false, message: '', trigger: this.trigger, validator: this.stripscriptName}
                    ],
                    address: [
                        {required: true, message: '只能输入中文，英文，数字及._-@()', trigger: this.trigger, validator: this.stripscriptName}
                    ],
                    electronFence: [
                        {required: true, message: '请输入电子围栏', trigger: this.trigger}
                    ]

                },
                addForm: {
                    // 新增界面数据
                    shortName: '',
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
                    postcode: '',
                    contactPerson: '',
                    telephone: '',
                    address: '',
                    deliveryCode: '',
                    deliveryName: '',
                    soldId: '',
                    salesChannel: '',
                    line: '',
                    status: '',
                    sapCode: '',
                    lngLat: '',
                    electronFence: ''
                },
                multipleSelection: [],
                currentPage1: 1,
                currentData: null,
                // 查询框折叠展开
                showSearch: true,
                value1: '',
                // 售达方扩展信息
                materialList: [],
                // 上传
                importFileUrl: config.base_service_ip + '/azure/upload',
                upLoadData: {
                    access_token: cookieOperation.cookie.get('access_token')
                    // access_token:'bcb4b923d85445cd804d8871ca75b609'
                },
                fileListContacts: [], // 证明材料照片
                photoPath: [], // 送到方照片
                deliveryList: [], // 送达方扩展关系
                state: '', // 货主名称
                state1: '', // 仓储中心
                deliveryCode: '', // 送达方编码
                deliveryName: '', // 送达方名称
                shipperInfo: {}, // 货主信息
                warehousingInfo: {}, // 仓储中心
                identify: true, // true为新增，false为修改
                CheckStatus: false,
                updateStatus: false,
                isBindingForm: {}, // 绑定查询form
                BindingList: [], // 已绑定
                noBindingList: [], // 未绑定
                deliveryListInfo: {}, // 修改时储存送达方列表信息
                BindingSels: [], // 物料关系左右勾选
                isBindingSels: [], // 已绑定勾选
                noBindingSels: [], // 未绑定勾选
                operationWidth: 70,
                addStatus: false,
                deliveryPager: { // 分页
                    page: 1,
                    rows: 10,
                    total: 0
                },
                emptyText: '暂无数据',
                // 判断扩展关系标识
                haveDeliveryExt: false,
                // 图片预览
                dialogImageUrl: '',
                contactDialogImageUrl: '',
                dialogVisible: false,
                contactDialogVisible: false
            };
        },
        methods: {
            /*
           * 送达方md
           * */
            //导入
            //导入按钮
            importExcel() {
                let _this = this;
                _this.centerDialogVisible = true;
                this.fileList = [];
            },
            //导入弹出层
            exportModeTemplate() {
                let url = 'https://loms.wilmar.cn/temp/delivery.xlsx';
                util.publicpost('/azure/urlSetKey', {url: url}, function (res) {
                    if (res.success) {
                        window.open(res.data);
                    }
                }, config.base_service_ip);
            },
            downloadErrorLog() {
                /*let _this = this;
                let url = config.azure_download_path + _this.errorLogPath;
                window.location.href = url;*/
	            let _this = this;
	            let url = config.azure_download_path + _this.errorDocPath;
	            _this.importProgressVisible = false;
	            _this.errorLogButtonVisible = false;
	            window.location.href = url;
            },
            closeErrorLog() {
                let _this = this;
                _this.errorDialogVisible = false;
            },
            UploadUrl: function () {
                return config.base_service_ip + '/delivery/importExcel';
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
                /*if (!response.success) {
                    this.errorDialogVisible = true;
                    this.errorLogPath = response.msg;
                    _this.errorMsg('导入失败！');
                } else {
                    if (response.code === 3) {
                        _this.errorMsg('导入文件为空');
                    }
                    else {
                        _this.successMsg('导入成功！');
                        this.getShipper();
                    }
                    // if (response.data == null || response.data == '') {
                    //   return;
                    // }
                }*/
            },
	        openImportProgress: function (progressId, intervalid1) {
		        let _this = this;
		        util.publicpost('/delivery/progress', {id: progressId}, function (res) {
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
	        closeImportProgressDialog() {
		        let _this = this;
		        _this.importProgressVisible = false;
		        _this.errorLogButtonVisible = false;
	        },

            //导出
            exportExcel() {
                let _this = this;
                let intervalid2;
                util.publicpost('/delivery/export', {
                        deliveryCode: _this.formInline.deliveryCode,
                        deliveryName: _this.formInline.deliveryName,
                        sapCode: _this.formInline.sapCode,
                        socialCreditCode: _this.formInline.socialCreditCode,
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
                util.publicpost('/delivery/progress', {id: _this.exprotProgressIds[0]}, function (res) {
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
            // 上传
            handleRemoveContacts(file, fileList) {
                this.addForm.evidence = [];
                for (var k in fileList) {
                    this.addForm.evidence.push(fileList[k].response.data);
                }
            },
            handlePreviewContacts(file, fileList) {
                this.contactDialogImageUrl = file.url;
                this.contactDialogVisible = true;
            },
            // 上传成功后的回调
            uploadSuccessContacts(response, file, fileList) {
                this.fileListContacts = fileList;
                this.addForm.evidence = [];
                for (var k in fileList) {
                    this.addForm.evidence.push(fileList[k].response.data);
                }
            },
            uploadProgressContacts(event, file, fileList) {

            },
            beforeUploadContacts(file) {
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
            // 上传
            handleRemove(file, fileList) {
                console.log(file, fileList);
                console.log(fileList.length);
                // _this.addUserRules.adID = [{required: true, message: '请输入AD唯一标识', trigger: 'change'}];
            },
            uploadSuccess(response, file, fileList) {
                this.photoPath = fileList;
                this.addForm.photo = [];
                for (var k in fileList) {
                    this.addForm.photo.push(fileList[k].response.data);
                }
            },
            handlePreview(file, fileList) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
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
            uploadProgress(event, file, fileList) {
            },
            uploadProgressPhotoPath(event, file, fileList) {
            },
            saleChanneltype(row, column) {
                let saleChannelto = row.saleChannel;
                if (saleChannelto) {
                    let json = this.dict.salesChannel;
                    return util.formatDict(json, saleChannelto);
                }
            },
            validCode(rule, value, callback) {
                util.validSpecialCode(rule, value, callback);

            },
            // 自动获取输入框内容进行查询 模糊查询货主
            querySearch(queryString, callback) {
                let that = this;
                let list = [];
                if (queryString) {
                    util.publicpost(
                        '/shipper/selectShipperByName',
                        {'name': queryString},
                        function (res) {
                            if (res.code === 0) {
                                if (res.data) {
                                    for (let i of res.data) {
                                        i.value = i.shipperName;
                                        i.id = i.shipperCode;
                                    }
                                    list = res.data;
                                    callback(list);
                                }
                            } else {
                                that.$message({
                                    message: that.$t(res.msg),
                                    type: 'error'
                                });
                            }
                        }
                    );
                }
            },
            storageCenterCodeclick(val) {
                console.log(val);
            },
            // 模糊查询货主信息
            handleSelect(time) {
                console.log(time);
                let that = this;
                that.shipperInfo = time;
                that.valueName = '';
                this.warehousingQuerySearch(time.shipperCode);
            },
            // 自动获取输入框内容进行查询 模糊查询仓储中心
            warehousingQuerySearch(queryString) {
                let that = this;
                if (!that.shipperInfo.shipperCode) {
                    that.showMsg('请先选择货主名称');
                } else {
                    if (queryString) {
                        util.publicpost('/factorydc/queryByShipperCode', {
                                'shipperCode': queryString
                            }, function (res) {
                                if (res.code === 0) {
                                    if (res.data) {
                                        that.options = res.data;
                                    }
                                } else {
                                    that.$message({
                                        message: that.$t(res.msg),
                                        type: 'error'
                                    });
                                }
                            }
                        );
                    }
                }
            },
            // 模糊查询仓储中心信息
            warehousingHandleSelect(time) {
                console.log(time);
                let that = this;
                that.warehousingInfo = time;
                // let that = this;
                // that.gteUserListPush = that.gteUserList;
                // util.publicpost(
                //     '/shipper/ext/selectStorageByCode',
                //     {
                //         storageCenterCode: time.storageCenterCode
                //     },
                //     function (res) {
                //         that.loading = false;
                //         if (res.code === 0) {
                //             // let gteUserListArr = [];
                //             let gteUserList = {};
                //             let ispush = true;
                //             for (let i = 0; i < that.gteUserListPush.length; i++) {
                //                 if (that.gteUserListPush[i].storageCenterCode === res.data.storageCenterCode) {
                //                     ispush = false;
                //                 }
                //             }
                //             if (ispush) {
                //                 gteUserList = res.data;
                //                 gteUserList.isEditing = true;
                //                 // gteUserListArr.push(gteUserList);
                //                 that.gteUserListPush.push(gteUserList);
                //             }
                //             console.log(that.gteUserListPush);
                //             that.gteUserList = that.gteUserListPush;
                //             that.MaterialPager.total = res.pager.totalCount;
                //         }
                //     }, config.baseMd_service_ip
                // );
            },
            deliverAdd(formName) {
                let that = this;
                for (let i = 0; i < that.options.length; i++) {
                    if (that.options[i].storageCenterCode === that.valueName) {
                        that.warehousingInfo = that.options[i];
                    }
                }
                if (!that.shipperInfo.shipperCode) {
                    that.showMsg('请先选择货主名称跟仓储中心名称');
                    return;
                }
                let deliveryList = {
                    shipperCode: that.shipperInfo.shipperCode,
                    shipperName: that.shipperInfo.shipperName,
                    storageCenterCode: that.warehousingInfo.storageCenterCode,
                    storageCenterName: that.warehousingInfo.storageCenterName,
                    validityPeriodRequirement: '',
                    saleChannel: '',
                    line: '',
                    isEditing: true
                };
                let ispush = false;
                if (that.deliveryList.length !== 0) {
                    for (let i = 0; i < that.deliveryList.length; i++) {
                        if (that.deliveryList[i].shipperCode === deliveryList.shipperCode && that.deliveryList[i].storageCenterCode === deliveryList.storageCenterCode) {
                            ispush = true;
                        }
                    }
                }
                if (ispush) {
                    that.showMsg('请勿重复添加！');
                    return;
                }
                // 关系插入数据库
                util.publicpost('/delivery/ext/insert', {
                    deliveryCode: that.addForm.deliveryCode,
                    deliveryName: that.addForm.deliveryName,
                    storageCenterCode: that.warehousingInfo.storageCenterCode,
                    storageCenterName: that.warehousingInfo.storageCenterName,
                    shipperCode: that.shipperInfo.shipperCode,
                    shipperName: that.shipperInfo.shipperName
                }, function (res) {
                    if (res.code === 0) {
                        that.deliveryList.push(deliveryList);
                        that.state = '';
                        that.state1 = '';
                        that.valueName = '';
                    }
                });
            },
            // 新增送达方信息
            addSubmit: function (addFormRules) {
                let that = this;
                that.$refs[addFormRules].validate(valid => {
                    /*if (that.addForm.deliveryCode === that.addForm.deliveryName) {
                        that.$message.error('送达方编码与送达方名称不能相同!');
                        return;
                    }*/
                    if (valid) {
                        that.$confirm('确认提交吗？', '提示', {}).then(() => {
                            that.addLoading = true;
                            let _this = this;
                            // let ids = this.sels.map(item => item.id).toString();
                            let districtCode = _this.addForm.districtCode;
                            _this.addForm.districtName = _this.loadadds(
                                districtCode,
                                _this.county
                            );
                            let countryCode = _this.addForm.countryCode;
                            _this.addForm.countryName = _this.loadadds(
                                countryCode,
                                _this.address
                            );
                            let provinceCode = _this.addForm.provinceCode;
                            _this.addForm.provinceName = _this.loadadds(
                                provinceCode,
                                _this.addressed
                            );
                            let cityCode = _this.addForm.cityCode;
                            _this.addForm.cityName = _this.loadadds(cityCode, _this.city);
                            let streetCode = _this.addForm.streetCode;
                            _this.addForm.streetName = _this.loadadds(streetCode, _this.street);

                            for (var k in _this.addForm.evidence) {
                                var _tmpIndex = parseInt(k) + 1;
                                _this.addForm['evidencePath' + _tmpIndex] = _this.addForm.evidence[k][0];
                            }
                            for (var k in _this.addForm.photo) {
                                _this.addForm.photoPath = _this.addForm.photo[0][0];
                            }
                            let para = Object.assign({}, _this.addForm);
                            util.publicpost('/delivery/insert', para, function (res) {
                                _this.addLoading = false;
                                if (res.code === 0) {
                                    _this.$message({
                                        showClose: true,
                                        message: _this.$t('msg.success'),
                                        type: 'success'
                                    });
                                    _this.deliveryCode = _this.addForm.deliveryCode;
                                    _this.deliveryName = _this.addForm.deliveryName;
                                    _this.activeName = 'second';
                                    _this.deliveryListPager();
                                    if (_this.$refs['addFormRules'] !== undefined) {
                                        _this.$refs['addFormRules'].clearValidate();
                                    }
                                    // _this.addFormVisible = false;
                                    // _this.addLoading = false;
                                    // _this.addForm = null;
                                    _this.getUser();
                                } else {
                                    _this.addLoading = false;
                                    let message;
                                    if (!util.isEmpty(res.msg)) {
                                        message = _this.$t('msg.error') + ',' + _this.$t(res.msg);
                                    } else {
                                        message = _this.$t('msg.error');
                                    }
                                    console.log(message);
                                    message = message.length > 100 ? '操作失败' : message;
                                    _this.$message({
                                        showClose: true,
                                        message: message,
                                        type: 'error'
                                    });

                                }
                            });
                        });
                    }
                });
            },
            // 新增的绑定
            addSubmitTo: function () {
                let _this = this;
                if (_this.sels.length < 1) {
                    _this.showMsg('最少勾选一条需要绑定的数据');
                } else {
                    for (let i = 0; i < _this.sels.length; i++) {
                        _this.sels[i].deliveryCode = _this.deliveryCode;
                        _this.sels[i].deliveryName = _this.deliveryName;
                        if (_this.sels[i].saleChannel === '') {
                            _this.errorMsg('销售渠道不能为空');
                            return;
                        }
                    }
                    ;
                    let para = {
                        jsonStr: JSON.stringify(_this.sels)
                    };
                    util.publicpost('/delivery/ext/update/batch', para, function (res) {
                        _this.addLoading = false;
                        if (res.code === 0) {
                            _this.$message({
                                showClose: true,
                                message: _this.$t('msg.success'),
                                type: 'success'
                            });
                            _this.deliveryListPager();
                        } else {
                            _this.addLoading = false;
                            _this.$alert('<p style="color:#f56c6c;text-align: center">调用MD接口失败，扩展属性保存未成功，请重试！</p>', '提示', {dangerouslyUseHTMLString: true});
                        }
                    });
                    // }
                }
            },
            // 送达方扩展-分页查询
            deliveryListPager(name) {
                let _this = this;
                if (_this.deliveryCode) {
                    util.publicpost('/delivery/ext/list', {
                        deliveryCode: _this.deliveryCode,
                        // deliveryCode: '11111',
                        page: _this.deliveryPager.page,
                        rows: _this.deliveryPager.rows
                    }, function (res) {
                        _this.addLoading = false;
                        if (res.code === 0) {
                            if (res.data) {
                                if (res.data) {
                                    _this.haveDeliveryExt = true;
                                } else {
                                    _this.haveDeliveryExt = false;
                                }
                                for (let i = 0; i < res.data.length; i++) {
                                    res.data[i].isEditing = false;
                                }
                            }
                            if (name) {
                                _this.materialList = res.data;
                                // _this.material.total = res.data.length || 0;
                            } else {
                                _this.deliveryList = res.data;
                                _this.deliveryPager.total = res.data.length || 0;
                            }
                        } else {
                            _this.addLoading = false;
                            let message;
                            if (!util.isEmpty(res.msg)) {
                                message = _this.$t('msg.error') + ',' + _this.$t(res.msg);
                            } else {
                                message = _this.$t('msg.error');
                            }
                            _this.$message({
                                showClose: true,
                                message: message,
                                type: 'error'
                            });
                        }
                    });
                }
            },
            // tab点击切换
            handleClick(tab, event) {
                this.options = [];
                this.valueName = '';
                if (this.$refs['material-ext']) {
                    this.$refs['material-ext'].owner.$el.childNodes[1].childNodes[0].childNodes[1].children[0].cells[0].childNodes[0].childNodes[0].style.display = 'none';
                }
                if (this.activeName === 'second' && !this.identify) {
                    if (this.deliveryCode) {
                        this.deliveryListPager();
                    }
                } else if (this.activeName === 'second') {
                    if (!this.addForm.deliveryCode) {
                        this.showMsg('请先保存送达方信息');
                    }
                } else if (this.activeName === 'third' && !this.identify) {
                    console.log(this.deliveryCode);
                    if (this.addForm.deliveryCode) {
                        this.deliveryListPager('third');
                    }
                } else if (this.activeName === 'third') {
                    if (!this.addForm.deliveryCode) {
                        this.showMsg('请先保存送达方信息');
                    } else {
                        this.deliveryListPager('third');
                    }
                }
            },
            // 送达方扩展-选择行数
            handleSizeChange(rows) {
                this.deliveryPager.rows = rows;
            },
            // 送达方扩展-分页
            handleCurrentChange(page) {
                this.deliveryPager.page = page;
                this.deliveryListPager();
            },
            // 修改点击编辑
            deliveryEditor(row) {
                let that = this;
                if (that.CheckStatus) {
                    return;
                }
                for (let i = 0; i < that.deliveryList.length; i++) {
                    if (that.deliveryList[i].deliveryCode === row.deliveryCode && that.deliveryList[i].shipperCode === row.shipperCode) {
                        that.deliveryList[i].isEditing = true;
                    }
                }
            },
            // 扩展关心点击删除
            deliveryDelete(row) {
                let _this = this;
                _this.$message({
                    type: 'error',
                    showClose: true,
                    dangerouslyUseHTMLString: true,
                    message: '<div style="width:310px;">删除扩展信息会影响下游系统生产数据的准确性，请联系管理员或运维人员</div>'
                });
                // 删除功能暂时注销
                /*util.publicpost('/delivery/ext/delete', {
                    deliveryCode: _this.deliveryCode,
                    shipperCode: row.shipperCode,
                    storageCenterCode: row.storageCenterCode
                }, function (res) {
                    _this.addLoading = false;
                    if (res.code === 0) {
                        _this.$message({
                            showClose: true,
                            message: _this.$t('msg.success'),
                            type: 'success'
                        });
                        _this.deliveryListPager();
                    } else {
                        _this.addLoading = false;
                        let message;
                        if (!util.isEmpty(res.msg)) {
                            message = _this.$t('msg.error') + ',' + _this.$t(res.msg);
                        } else {
                            message = _this.$t('msg.error');
                        }
                        _this.$message({
                            showClose: true,
                            message: message,
                            type: 'error'
                        });
                    }
                });*/
            },
            // 已绑定-查询
            IsBinding(name) {
                let _this = this;
                if (_this.BindingSels.length < 1) {
                    _this.showMsg('请勾选一条需要查询的数据');
                } else if (_this.BindingSels.length > 1) {
                    _this.showMsg('最多只能勾选一条需要查询的数据');
                } else {
                    if (name === 'yes') {
                        util.publicpost('/delivery/material/ext/list', {
                            deliveryCode: _this.deliveryCode,
                            shipperCode: _this.BindingSels[0].shipperCode,
                            storageCenterCode: _this.BindingSels[0].storageCenterCode,
                            materialCode: _this.isBindingForm.materialCode,
                            materialName: _this.isBindingForm.materialName
                        }, function (res) {
                            _this.addLoading = false;
                            if (res.code === 0) {

                                _this.BindingList = res.data;
                            } else {
                                _this.addLoading = false;
                                _this.errorMsg(_this.$t(res.msg));
                            }
                        });
                    } else {
                        util.publicpost('/material/ext/list/not/delivery', {
                            deliveryCode: _this.deliveryCode,
                            shipperCode: _this.BindingSels[0].shipperCode,
                            storageCenterCode: _this.BindingSels[0].storageCenterCode,
                            materialCode: _this.isBindingForm.materialCode,
                            materialName: _this.isBindingForm.materialName
                        }, function (res) {
                            _this.addLoading = false;
                            if (res.code === 0) {
                                _this.noBindingList = res.data;
                            } else {
                                _this.addLoading = false;
                                _this.errorMsg(_this.$t(res.msg));
                            }
                        });
                    }
                }
            },
            // 绑定 - 左侧选中进行查询
            BindingBelsChange(val) {
                if (val.length > 1) {
                    val.map(row => {
                        this.$refs.multipleTable.toggleRowSelection(row, false);
                    });
                    this.BindingSels = val[val.length - 1];
                } else {
                    this.BindingSels = val;
                }
                this.$refs.multipleTable.toggleRowSelection(val[val.length - 1], true);
                this.BindingSels = val;
	            this.BindingList = [];
	            this.noBindingList = [];
                // 查询
                if (this.BindingSels.length > 0) this.IsBinding('yes');
            },
            // 已绑定选中进行绑定
            BindingChange(val) {
                this.isBindingSels = val;
            },
            // 进行解绑
            unbundling() {
                let _this = this;
                _this.$message({
                    type: 'error',
                    showClose: true,
                    dangerouslyUseHTMLString: true,
                    message: '<div style="width:310px;">解绑扩展信息会影响下游系统生产数据的准确性，请联系管理员或运维人员</div>'
                });
                // 解绑功能暂时注销
                /*if (_this.isBindingSels.length < 1) {
                    _this.showMsg('最少勾选一条需要解绑的数据');
                } else {
                    util.publicpost('/delivery/material/ext/delete/batch', {
                        jsonStr: JSON.stringify(_this.isBindingSels)
                    }, function (res) {
                        _this.addLoading = false;
                        if (res.code === 0) {
                            _this.$message({
                                showClose: true,
                                message: _this.$t('msg.success'),
                                type: 'success'
                            });
                            _this.BindingList = [];
                            _this.isBindingForm = {};
                        } else {
                            _this.addLoading = false;
                            let message;
                            if (!util.isEmpty(res.msg)) {
                                message = _this.$t('msg.error') + ',' + _this.$t(res.msg);
                            } else {
                                message = _this.$t('msg.error');
                            }
                            _this.$message({
                                showClose: true,
                                message: message,
                                type: 'error'
                            });
                        }
                    });
                }*/
            },
            // 未绑定选中进行绑定
            noselsChange(val) {
                this.noBindingSels = val;
            },
            // 进行绑定
            gobundling() {
                let _this = this;
                for (let i = 0; i < _this.noBindingSels.length; i++) {
                    _this.noBindingSels[i].deliveryCode = _this.deliveryCode;
                    _this.noBindingSels[i].deliveryName = _this.deliveryName;
                    _this.noBindingSels[i].storageCenterName = _this.BindingSels[0].storageCenterName;
                }
                ;
                if (_this.noBindingSels.length < 1) {
                    _this.showMsg('最少勾选一条需要解绑的数据');
                } else {
                    util.publicpost('/delivery/material/ext/insert/batch', {
                        jsonStr: JSON.stringify(_this.noBindingSels)
                    }, function (res) {
                        _this.addLoading = false;
                        if (res.code === 0) {
                            _this.$message({
                                showClose: true,
                                message: _this.$t('msg.success'),
                                type: 'success'
                            });
                            _this.noBindingList = [];
                            _this.isBindingForm = {};
                        } else {
                            _this.addLoading = false;
                            let message;
                            if (!util.isEmpty(res.msg)) {
                                message = _this.$t('msg.error') + ',' + _this.$t(res.msg);
                            } else {
                                message = _this.$t('msg.error');
                            }
                            _this.$message({
                                showClose: true,
                                message: message,
                                type: 'error'
                            });
                        }
                    });
                }
            },
            /*
           * 送达方loms
           * */
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
            loadadds(item, data) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].code === item) {
                        return data[i].name;
                    }
                }
            },
            // 鼠标失去焦点
            handleBlur: function (row) {
                //        return;
                //        this.currentData = Object.assign({}, row);
                //        console.log(this.currentData);
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
            // 验证手机号
            validPhone(rule, value, callback) {
                util.isvalidPhone(rule, value, callback, 'required');
            },
            // 验证中文、简称
            stripscriptName(rule, value, callback) {
              util.stripscriptName(rule, value, callback);
            },
            // 验证邮编
            isPostalCodeTo(rule, value, callback) {
                util.isPostalCode(rule, value, callback);
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

            addressChange(name, key) {
                util.PyatyiLinkage(name, this);
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

            // 获取售达方列表
            getUser() {
                let _this = this;
                this.exportBtnDisabled = false;
                _this.listLoading = true;
                _this.users = [];
                util.publicpost(
                    '/delivery/list/pager',
                    {
                        deliveryCode: _this.formInline.deliveryCode,
                        deliveryName: _this.formInline.deliveryName,
                        salesChannel: _this.formInline.salesChannel,
                        socialCreditCode: _this.formInline.socialCreditCode,
                        line: _this.formInline.line,
                        sapCode: _this.formInline.sapCode,
                        status: _this.formInline.status,
                        soldName: _this.formInline.soldName,
                        contactPerson: _this.formInline.contactPerson,
                        telephone: _this.formInline.telephone,
                        page: _this.pager.page,
                        rows: _this.pager.rows,
                        init: _this.init
                    },
                    function (res) {
                        if (res.code === 0) {
                            _this.init = '';
                            _this.listLoading = false;
                            _this.pager.total = res.pager.totalCount || 0;
                            if (_this.pager.total == 0) {
                                _this.emptyText = '查询无结果';
                            }
                            if (res.result) {
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
                                    //              console.log(item.showCreateTime, item.showUpdateTime);
                                });
                            }
                            _this.users = res.result;
                            //            console.log(_this.users);
                            _this.dict = res.enumVal;
                        } else {
                            _this.listLoading = false;
                            _this.errorMsg('服务器繁忙！');
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
            // 状态转换
            formatStatus(row, column) {
                let key = row.status;
                let json = this.dict.status;
                return util.formatDict(json, key);
            },
            // 销售渠道转换
            formatSourceSystem(row, column) {
                let key = row.salesChannel;
                let json = this.dict.salesChannel;
                return util.formatDict(json, key);
            },

            // tab点击切换(物料关系)
            handleClickTo(tab, event) {
                // console.log(tab, event);
                this.IsBinding('yes');
            },
            // 添加
            handleAdd: function () {
                this.fileListContacts = [];
                this.photoPath = [];
                this.bindingList = [];
                this.noBindingList = [];
                this.addFormVisible = true;
                this.lookFormVisible = false;
                this.haveDeliveryExt = false;
                this.activeName = 'first';
                this.identify = true;
                this.state = '';
                this.state1 = '';
                this.deliveryList = [];
                this.materialList = [];
                this.visible.imgView = true;
                this.visible.imgViewTo = true;
                if (this.$refs['addForm'] !== undefined) {
                    this.$refs['addForm'].resetFields();
                }
                this.updateStatus = false;
                this.CheckStatus = false;
                this.addStatus = true;
                this.operationWidth = 70;
                if (this.addFormVisible === true) {
                    let _this = this;
                    util.publicpost('/regionalAddress/selectAddress',
                        {
                            type: 'COUNTRY' // 国家
                        },
                        function (res) {
                            if (res.code === 0) {
                                _this.address = res.data;
                            } else {
                                _this.$message({
                                    showClose: true,
                                    message: _this.$t('msg.success'),
                                    type: 'error'
                                });
                            }
                            _this.editLoading = false;
                        }
                    );
                }
            },

            // 根据名称模糊查询
            remoteMethod(query) {
                if (query !== '') {
                    let _this = this;
                    _this.loading = true;
                    util.publicpost('/sold/selectSoldByName', {soldName: query}, function (
                        res
                    ) {
                        if (res.code === 0) {
                            _this.loading = false;
                            _this.soldList = res.data.map(item => {
                                return {
                                    id: item.id,
                                    label: item.soldName,
                                    value: item.id
                                };
                            });
                        } else {
                        }
                    });
                }
            },

            // 显示修改界面
            handleEdit: function (row) {
                let _this = this;
                _this.deliveryListInfo = row;
                _this.activeName = 'first';
                _this.haveDeliveryExt = false;
                _this.lookFormVisible = false;
                _this.identify = false;
                _this.state = '';
                _this.state1 = '';
                // let id = row.id.toString();
                _this.listLoading = true;
                _this.updateStatus = true;
                _this.CheckStatus = false;
                _this.operationWidth = 70;
                _this.deliveryCode = row.deliveryCode; // 送达方编码
                _this.deliveryName = row.deliveryName; // 送达方名称
                _this.addForm = [];
                _this.bindingList = [];
                _this.noBindingList = [];
                _this.addFormVisible = true;
                _this.listLoading = false;
                util.publicpost(
                    '/regionalAddress/selectAddress',
                    {type: 'COUNTRY'}, // 国家
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
                util.publicpost(
                    '/delivery/selectByCode',
                    {deliveryCode: row.deliveryCode},
                    function (res) {
                        if (res.code === 0) {
                            _this.addForm = res.data;
                            _this.addForm.countryCode = res.data.countryName;
                            _this.addForm.provinceCode = res.data.provinceName;
                            _this.addForm.cityCode = res.data.cityName;
                            _this.addForm.districtCode = res.data.districtName;
                            _this.addForm.streetCode = res.data.streetName;
                            _this.addForm.contactPerson = res.data.contactPerson;
                            _this.addForm.telephone = res.data.telephone;
                            _this.photoPath = [];
                            _this.fileListContacts = [];
                            if (res.data.evidencePath1 != null && res.data.evidencePath1 != '') {
                                _this.visible.imgView = true;
                                _this.visible.imgViewTo = true;
                                var fileName = res.data.evidencePath1;
                                var imageFile = {name: '', url: config.azure_download_path + fileName};
                                _this.fileListContacts.push(imageFile);
                            } else {
                                _this.visible.imgView = false;
                                _this.visible.imgViewTo = false;
                            }
                            if (res.data.evidencePath2 != null && res.data.evidencePath2 != '') {
                                var fileName = res.data.evidencePath2;
                                var imageFile = {name: '', url: config.azure_download_path + fileName};
                                _this.fileListContacts.push(imageFile);
                            }
                            if (res.data.evidencePath3 != null && res.data.evidencePath3 != '') {
                                var fileName = res.data.evidencePath3;
                                var imageFile = {name: '', url: config.azure_download_path + fileName};
                                _this.fileListContacts.push(imageFile);
                            }
                            if (res.data.photoPath != null && res.data.photoPath != '') {
                                var fileName = res.data.photoPath;
                                var imageFile = {name: '', url: config.azure_download_path + fileName};
                                _this.photoPath.push(imageFile);
                            }
                        } else {
                            _this.errorMsg(res.msg);
                        }
                        _this.editLoading = false;
                        // 清除校验
                        if (_this.$refs['addFormRules'] !== undefined) {
                            _this.$refs['addFormRules'].resetFields();
                        }
                    }
                );
            },

            // 显示查看界面
            handleLook: function (row) {
                // let ids = row.id;
                let _this = this;
                _this.lookFormVisible = true;
                _this.haveDeliveryExt = true;
                _this.CheckStatus = true;
                _this.updateStatus = true;
                _this.identify = false;
                _this.activeName = 'first';
                _this.bindingList = [];
                _this.noBindingList = [];
                _this.addFormVisible = true;
                _this.deliveryCode = row.deliveryCode; // 送达方编码
                _this.deliveryName = row.deliveryName; // 送达方名称
                _this.addForm = [];
                util.publicpost(
                    '/regionalAddress/selectAddress',
                    {type: 'COUNTRY'}, // 国家
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
                util.publicpost(
                    '/delivery/selectByCode',
                    {deliveryCode: row.deliveryCode},
                    function (res) {
                        if (res.code === 0) {
                            _this.addForm = res.data;
                            _this.addForm.countryCode = res.data.countryName;
                            _this.addForm.provinceCode = res.data.provinceName;
                            _this.addForm.cityCode = res.data.cityName;
                            _this.addForm.districtCode = res.data.districtName;
                            _this.addForm.streetCode = res.data.streetName;
                            _this.addForm.contactPerson = res.data.contactPerson;
                            _this.addForm.telephone = res.data.telephone;
                            _this.photoPath = [];
                            _this.fileListContacts = [];
                            if (res.data.evidencePath1 != null && res.data.evidencePath1 != '') {
                                _this.visible.imgView = true;
                                _this.visible.imgViewTo = true;
                                var fileName = res.data.evidencePath1;
                                var imageFile = {name: '', url: config.azure_download_path + fileName};
                                _this.fileListContacts.push(imageFile);
                            } else {
                                _this.visible.imgView = false;
                                _this.visible.imgViewTo = false;
                            }
                            if (res.data.evidencePath2 != null && res.data.evidencePath2 != '') {
                                var fileName = res.data.evidencePath2;
                                var imageFile = {name: '', url: config.azure_download_path + fileName};
                                _this.fileListContacts.push(imageFile);
                            }
                            if (res.data.evidencePath3 != null && res.data.evidencePath3 != '') {
                                var fileName = res.data.evidencePath3;
                                var imageFile = {name: '', url: config.azure_download_path + fileName};
                                _this.fileListContacts.push(imageFile);
                            }
                            if (res.data.photoPath != null && res.data.photoPath != '') {
                                var fileName = res.data.photoPath;
                                var imageFile = {name: '', url: config.azure_download_path + fileName};
                                _this.photoPath.push(imageFile);
                            }
                        } else {
                            _this.errorMsg(res.msg);
                        }
                        _this.editLoading = false;
                        // 清除校验
                        if (_this.$refs['addFormRules'] !== undefined) {
                            _this.$refs['addFormRules'].resetFields();
                        }
                    }
                );
            },

            // 修改的保存
            editSubmit: function () {
                this.$refs.editForm.validate(valid => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            let _this = this;
                            // let ids = this.sels.map(item => item.id).toString();
                            let districtCode = _this.editForm.districtCode;
                            _this.editForm.districtName = _this.loadadds(
                                districtCode,
                                _this.county
                            );
                            let countryCode = _this.editForm.countryCode;
                            _this.editForm.countryName = _this.loadadds(
                                countryCode,
                                _this.address
                            );
                            let provinceCode = _this.editForm.provinceCode;
                            _this.editForm.provinceName = _this.loadadds(
                                provinceCode,
                                _this.addressed
                            );
                            let cityCode = _this.editForm.cityCode;
                            _this.editForm.cityName = _this.loadadds(cityCode, _this.city);
                            let streetCode = _this.editForm.streetCode;
                            _this.editForm.streetName = _this.loadadds(streetCode, _this.street);
                            let para = Object.assign({}, _this.editForm);
                            // let arr = [
                            //   'creater',
                            //   'status',
                            //   'createTime',
                            //   'updateTime',
                            //   'delStatus'
                            // ];
                            // arr.map(function(item, index) {
                            //   delete para[item];
                            // });
                            util.publicpost('/delivery/updateDelivery', para, function (
                                res
                            ) {
                                if (res.code === 0) {
                                    _this.editLoading = false;
                                    _this.$message({
                                        message: _this.$t('msg.success'),
                                        type: 'success'
                                    });
                                    _this.$refs['editForm'].resetFields();
                                    _this.editFormVisible = false;
                                    _this.getUser();
                                } else {
                                    _this.editFormVisible = false;
                                    let message;
                                    if (!util.isEmpty(res.msg)) {
                                        message = _this.$t('msg.error') + ',' + _this.$t(res.msg);
                                    } else {
                                        message = _this.$t('msg.error');
                                    }
                                    _this.$message({
                                        showClose: true,
                                        message: message,
                                        type: 'error'
                                    });
                                }
                            });
                        });
                    }
                });
            },

            // 取消
            off: function (addFormRules) {
                this.options = [];
                this.valueName = '';
                if (addFormRules) {
                    if (this.$refs[addFormRules]) {
                        this.$refs[addFormRules].resetFields();
                    }
                }
                if (!this.lookFormVisible && !this.haveDeliveryExt) {
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
                        this.haveDeliveryExt = true;
                    }).catch(() => {
                        this.addFormVisible = true;
                    });
                } else {
                    this.addFormVisible = false;
                    this.editFormVisible = false;
                    this.lookFormVisible = true;
                    this.haveDeliveryExt = true;
                }
            },

            cancelEdit: function () {
                if (this.newUser) {
                    this.newUser = null;
                    this.users.shift();
                } else if (this.currentData) {
                    console.log(this.users, this.currentData);
                    this.users = this.users.map(item => {
                        if (item.id === this.currentData.id) {
                            item = Object.assign({}, this.currentData);
                            item.isEditing = false;
                        }
                        return item;
                    });
                    this.currentData = null;
                }
                // this.newUser = Object.assign({}, row);
                // this.getUser();
            },

            // 禁用
            handleForbidden: function (row) {
                let _this = this;
                let ids = row.id;
                let versions = row.version;
                _this.listLoading = true;
                // if (ids === '') {
                //   this.$message({
                //     showClose: true,
                //     message: '请先勾选数据',
                //     type: 'warning'
                //   });
                // } else {
                if (status === 'INEFFECTIVENESS') {
                    return '无效';
                }

                util.publicpost(
                    '/delivery/updateIneffectivenessStatus',
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
                        }
                    }
                );
                // }
            },
            // 启用
            handleStart: function (row) {
                let _this = this;
                let ids = row.id;
                let versions = row.version;
                _this.listLoading = true;
                // if (ids === '') {
                //   this.$message({
                //     showClose: true,
                //     message: '请先勾选数据',
                //     type: 'warning'
                //   });
                // } else {
                if (status === 'AVAILABILITY') {
                    return '有效';
                }

                util.publicpost(
                    '/delivery/updateAvailabilityStatus',
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
                        }
                    }
                );
                // }
            },
            // 重置
            resetForm(formName) {
                this.formInline = {
                    deliveryCode: '',
                    deliveryName: '',
                    socialCreditCode: '',
                    salesChannel: '',
                    line: '',
                    sapCode: '',
                    contactPerson: '',
                    telephone: '',
                    status: ''
                };
                this.$refs[formName].resetFields();
            },

            selsChange: function (sels) {
                this.sels = sels;
            },
            // 批量删除
            batchRemove: function (row) {
                let _this = this;
                let ids = row.id;
                let versions = row.version;
                _this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        _this.listLoading = true;
                        let para = {ids: ids, versions: versions};
                        util.publicpost('/delivery/deleteDelivery', para, function (res) {
                            if (res.code === 0) {
                                console.log(res);
                                _this.listLoading = false;
                                _this.$message({
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
                        });
                    });
            }
        }
        ,
        computed: {
            toggleDrop() {
                return this.showSearch ? 'el-icon-arrow-up' : 'el-icon-arrow-down';
            },
            pictureFlag() {
                return this.updateStatus ? 'picture-card' : 'picture';
            },
            tableListHeight() {
                let computedHeight = $(window).height() - $('.transDrop').height() -
                    $('.add_move').height() - 85;
                return (this.users && this.users.length > 0) ? computedHeight : '120';
            }
        }
        ,
        mounted() {
            this.getButtonList();
            this.getUser();
            this.exportBtnDisabled = true;
            window.vue = this;
        }
    }
    ;
</script>
<style>
    .deliveryMdTop {
        margin-top: 50px;
    }

    .TheQuery {
        margin-left: 6px;
        margin-top: 2px;
    }

    .soldforme-add .block {
        float: left;
    }

    .adddeliveryInfo {
        margin-bottom: 18px;
        overflow: hidden;
    }

    .adddeliveryInfo .el-input {
        width: 100px !important;
    }

    .adddeliveryInfo .el-input__inner {
        width: 100% !important;
    }

    .deliveryLf {
        float: left;
        width: 48%;
    }

    .deliveryRfTo {
        width: 48%;
        float: right;
    }

    .deliveryRfTo .el-tabs--top {
        margin-top: 24px;
    }

    .addDelveryBtn {
        float: right;
        margin-top: 14px;
    }

    .addsolodBtn {
        float: right;
    }

    .solodInfoHeight1 .el-table {
        /*height: 155px;*/
        overflow: auto;
        margin-bottom: 20px;
    }

    .addSoldInfo .el-col {
        margin-bottom: 20px;
    }

    .deliveryInfoHeight {
        height: 330px;
        overflow: auto;
    }

    .deliveryInfoHeight .el-table {
        margin-bottom: 0;
    }

    .deliveryInfoHeight .el-pagination {
        margin: 10px 0;
        text-align: right;
    }

    .deliveryRf {
        float: right;
    }

    .imgWidth .el-form-item__content {
        width: 215px;
    }

    .editColumn .el-dialog .el-input__inner {
        width: 100% !important;
    }
</style>
