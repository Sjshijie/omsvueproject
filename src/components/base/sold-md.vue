// 售达方管理
<template>
    <div class="admin">
        <div class="query-top">
            <em name="" class="fl el-icon-search"></em>
            <h6 class="fl titleInfo">{{ $t('common.searchInfo') }}</h6>
            <el-button plain class="fr" :icon="toggleDrop" @click="showSearch = !showSearch"></el-button>
        </div>
        <!--筛选-->
        <el-collapse-transition>
            <div v-show="showSearch">
                <div class="query-content transDrop">
                    <el-form size="mini" :inline="true" label-width="120px" :model="formInline" class="demo-form-inline"
                             status-icon ref="formInline">
                        <el-row :gutter="10">
                            <!--售达方代码-->
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item :label="$t('soldThead.soldCode') + '：'">
                                    <el-input v-model="formInline.soldCode"
                                              :placeholder="$t('common.pleaseEnter')"
                                              :maxlength='30'></el-input>
                                </el-form-item>
                            </el-col>
                            <!--售达方全称-->
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item :label="$t('soldThead.soldName') + '：'">
                                    <el-input v-model="formInline.soldName"
                                              :placeholder="$t('common.pleaseEnter')"
                                              :maxlength='100'></el-input>
                                </el-form-item>
                            </el-col>
                            <!--SAP编码-->
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item label="SAP编码：">
                                    <el-input v-model="formInline.sapCode"
                                              :placeholder="$t('common.pleaseEnter')"
                                              :maxlength='100'></el-input>
                                </el-form-item>
                            </el-col>
                            <!--统一社会信用代码-->
                            <!--<el-col :xs="24" :sm="8" :lg="6" :xl="6">-->
                            <!--<el-form-item label="统一社会信用代码：">-->
                            <!--<el-input v-model="formInline.socialCreditCode"-->
                            <!--:placeholder="$t('common.pleaseEnter')+'统一社会信用代码'"-->
                            <!--:maxlength='100'></el-input>-->
                            <!--</el-form-item>-->
                            <!--</el-col>-->
                            <!--<el-col :xs="24" :sm="8" :lg="6" :xl="6">-->
                            <!--<el-form-item label="地址：">-->
                            <!--<el-input v-model="formInline.address" style="height: 30px;" placeholder="请输入地址"></el-input>-->
                            <!--</el-form-item>-->
                            <!--</el-col>-->
                            <!--<el-col :xs="24" :sm="8" :lg="6" :xl="6">-->
                            <!--<el-form-item label="联系人：">-->
                            <!--<el-input v-model="formInline.contactPerson" placeholder="请输入联系人" :maxlength='100'></el-input>-->
                            <!--</el-form-item>-->
                            <!--</el-col>-->
                            <!--<el-col :xs="24" :sm="8" :lg="6" :xl="6">-->
                            <!--<el-form-item label="联系人电话：" >-->
                            <!--<el-input v-model="formInline.telephone" placeholder="请输入联系人电话" :maxlength='11'></el-input>-->
                            <!--</el-form-item>-->
                            <!--</el-col>-->
                            <!--<el-col :xs="24" :sm="8" :lg="6" :xl="6">-->
                            <!--<el-form-item :label="$t('commonThead.status') + '：'">-->
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
                            <!--@click="export"-->
                            <el-button :disabled="this.exportBtnDisabled" @click="exportExcel"
                                       class="base_sold_export hide">导出
                            </el-button>
                            <!--<el-button :disabled="this.exportBtnDisabled" @click="exportExcel" v-if="permissions('base_sold_export')">导出</el-button>-->
                        </div>
                    </el-form>
                </div>
            </div>
        </el-collapse-transition>
        <!--新增、删除-->
        <div class="add_move def-but">
            <el-button @click="handleAdd" class="base_sold_add hide">{{ $t('button.add') }}</el-button>
            <el-button @click="importExcel" class="base_sold_import hide" :disabled="!(users && users.length > 0)">{{ $t('button.importExcel') }}</el-button>
            <!--<el-button @click="handleAdd" v-if="permissions('base_sold_add')">{{ $t('button.add') }}</el-button>-->
            <!--<el-button type="primary" @click="importExcel" v-if="permissions('base_sold_import')">{{ $t('button.importExcel') }}</el-button>-->
        </div>
        <!-- 列表 -->
        <div class="list_vendor list_operation">
            <el-table highlight-current-row stripe :data="users" v-loading="listLoading"
                      @selection-change="handleSelectionSold" :height="tableListHeight"
                      style="width: 100%;" border :fit="true" align="center">
                <!-- <el-table-column type="selection" align="center" isEditing="false" width="55" @click="handleSelectionSold(1)"></el-table-column> -->
                <!--序号-->
                <el-table-column :label="$t('commonThead.index')" align="center" type="index"
                                 width="50"></el-table-column>
                <!--售达方代码-->
                <el-table-column :label="$t('soldThead.soldCode')" width="120" prop="soldCode" align="center" sortable
                                 text-overflow="ellipsis" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-input @blur="handleBlur(scope.row)" v-if="scope.row.isEditing"
                                  v-model="scope.row.soldCode"></el-input>
                        <div slot="reference" @click="handleLook(scope.row)" class="name-wrapper hand">
                            {{ scope.row.soldCode }}
                        </div>
                    </template>
                </el-table-column>
                <!--售达方全称-->
                <el-table-column :label="$t('soldThead.soldName')" width="180" prop="soldName" align="center"
                                 text-overflow="ellipsis"
                                 show-overflow-tooltip>
                </el-table-column>
                <!--sap编码-->
                <el-table-column label="sap编码" width="140" prop="sapCode" align="center" text-overflow="ellipsis"
                                 show-overflow-tooltip>
                </el-table-column>
                <!--统一社会信用代码-->
                <!--<el-table-column label="统一社会信用代码" width="160" prop="socialCreditCode" align="center"-->
                <!--text-overflow="ellipsis"-->
                <!--show-overflow-tooltip>-->
                <!--</el-table-column>-->
                <!--售达方简称-->
                <!--<el-table-column :label="$t('soldThead.shortName')" width="100" prop="shortName" align="center" text-overflow="ellipsis"-->
                <!--show-overflow-tooltip>-->
                <!--<template slot-scope="scope">-->

                <!--<el-input @blur="handleBlur(scope.row)" v-if="scope.row.isEditing"-->
                <!--v-model="scope.row.shortName"></el-input>-->
                <!--<div slot="reference" class="name-wrapper" v-if="!scope.row.isEditing">-->
                <!--{{ scope.row.shortName }}-->
                <!--</div>-->
                <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column label="省名称" prop="provinceName" align="center" show-overflow-tooltip>-->
                <!--<template slot-scope="scope">-->
                <!--<el-input @blur="handleBlur(scope.row)" v-if="scope.row.isEditing" v-model="scope.row.provinceName"></el-input>-->
                <!--<div slot="reference" class="name-wrapper" v-if="!scope.row.isEditing">-->
                <!--{{ scope.row.provinceName }}-->
                <!--</div>-->
                <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column label="市名称" prop="cityName" align="center">-->
                <!--<template slot-scope="scope">-->
                <!--<el-input @blur="handleBlur(scope.row)" v-if="scope.row.isEditing" v-model="scope.row.cityName"></el-input>-->
                <!--<div slot="reference" class="name-wrapper" v-if="!scope.row.isEditing">-->
                <!--{{ scope.row.cityName }}-->
                <!--</div>-->
                <!--</template>-->
                <!--</el-table-column>-->
                <!--地址-->
                <el-table-column :label="$t('commonThead.address')" prop="address" align="center"
                                 text-overflow="ellipsis"
                                 show-overflow-tooltip>
                </el-table-column>
                <!--邮编-->
                <!--<el-table-column width="80" label="邮编" prop="postcode" align="center" text-overflow="ellipsis"-->
                <!--show-overflow-tooltip>-->
                <!--</el-table-column>-->
                <!--联系人-->
                <el-table-column width="120" :label="$t('commonThead.contactPerson')" prop="contactPerson"
                                 align="center" show-overflow-tooltip>
                </el-table-column>
                <!--联系电话-->
                <el-table-column width="120" :label="$t('commonThead.telephone')" prop="telephone" align="center"
                                 text-overflow="ellipsis"
                                 show-overflow-tooltip>
                </el-table-column>
                <!--状态-->
                <!--<el-table-column width="120" :label="$t('commonThead.status')" prop="status" align="center"-->
                <!--:formatter="formatStatus">-->
                <!--</el-table-column>-->

                <!-- <el-table-column label="创建人" prop="creater" align="center">
                  <template slot-scope="scope">
                    <el-input @blur="handleBlur(scope.row)" v-if="scope.row.isEditing" v-model="scope.row.creater"></el-input>
                    <div slot="reference" class="name-wrapper" v-if="!scope.row.isEditing">
                      {{ scope.row.creater }}
                </div>
                  </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="createTime" align="center" text-overflow="ellipsis" :formatter="formatter" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <el-input @blur="handleBlur(scope.row)" v-if="scope.row.isEditing" v-model="scope.row.createTime" :disabled="true"></el-input>
                    <div slot="reference" class="name-wrapper" v-if="!scope.row.isEditing">
                      {{ scope.row.showCreateTime }}
                </div>
                  </template>
                </el-table-column> -->
                <!--修改人-->
                <el-table-column :label="$t('commonThead.updater')" prop="updater" align="center">
                </el-table-column>
                <!--修改时间-->
                <!-- <el-table-column :label="$t('commonThead.updateTime')" prop="updateTime" :formatter="formatterUpdate"
                                  align="center"
                                  text-overflow="ellipsis" show-overflow-tooltip>
                 </el-table-column> -->
                <!--操作-->
                <el-table-column fixed="right" :label="$t('commonThead.operation')" align="center" width="70">
                    <template slot-scope="scope">
                        <div @click="handleEdit(scope.row)">
                            <el-tooltip content="修改" placement="top" effect="light"
                                        v-if="permissions('base_sold_update')">
                                <div class="operation_icon icon1"></div>
                            </el-tooltip>
                        </div>
                        <!--<div @click="handleStart(scope.row)" v-if="scope.row.status === 'INEFFECTIVENESS'">-->
                        <!--<el-tooltip content="启用" placement="top" effect="light" v-if="permissions('base_sold_enable')">-->
                        <!--<div class="operation_icon icon2"></div>-->
                        <!--</el-tooltip>-->
                        <!--</div>-->
                        <!--<div @click="handleForbidden(scope.row)" v-if="scope.row.status === 'AVAILABILITY'">-->
                        <!--<el-tooltip content="禁用" placement="top" effect="light" v-if="permissions('base_sold_disable')">-->
                        <!--<div class="operation_icon icon3"></div>-->
                        <!--</el-tooltip>-->
                        <!--</div>-->
                        <!--<el-tooltip content="删除" placement="top" effect="light" v-if="permissions('base_sold_delete')">-->
                        <!--<div @click="batchRemove(scope.row)" class="operation_icon icon4"></div>-->
                        <!--</el-tooltip>-->
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
        <el-dialog :visible.sync="addFormVisible" :close-on-click-modal="false" class="md-dialog"
                   style="line-height: 0;overflow: hidden;font-size: 12px;" @close="handleClose">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="售达方信息管理" name="first" class="solodInfoHeight">
                    <div class="form form-add " style="height: 130px;">
                        <el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm" size="mini">
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="售达方代码:" prop="soldCode">
                                        <el-tooltip content="最多输入20个字符" placement="right" effect="light"
                                                    :disabled="CheckStatus">
                                            <el-input v-model="addForm.soldCode" :maxlength='20'
                                                      :disabled="CheckStatus"
                                                      @keyup.native="addForm.soldCode=addForm.soldCode.replace(/\s+/g,'')"></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="售达方名称:" prop="soldName">
                                        <el-tooltip content="最多输入100个字符" placement="right" effect="light"
                                                    :disabled="CheckStatus">
                                            <el-input v-model="addForm.soldName" :maxlength='100'
                                                      :disabled="CheckStatus"></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="SAP编码:" prop="sapCode">
                                        <el-tooltip content="最多输入50个字符" placement="right" effect="light"
                                                    :disabled="CheckStatus">
                                            <el-input v-model="addForm.sapCode" :maxlength='50'
                                                      :disabled="CheckStatus"
                                                      @keyup.native="addForm.sapCode=addForm.sapCode.replace(/\s+/g,'')"></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <!--统一社会信用代码-->
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="统一社会信用代码:" prop="socialCreditCode">
                                        <el-tooltip content="最多输入18个字符" placement="right" effect="light"
                                                    :disabled="CheckStatus">
                                            <el-input v-model="addForm.socialCreditCode" :maxlength='18'
                                                      :disabled="CheckStatus"
                                                      @keyup.native="addForm.socialCreditCode=addForm.socialCreditCode.replace(/\s+/g,'')"></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <!--法人-->
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="法人:" prop="legalPerson">
                                        <el-tooltip content="最多输入50个字符" placement="right" effect="light"
                                                    :disabled="CheckStatus">
                                            <el-input v-model="addForm.legalPerson" :maxlength='50'
                                                      :disabled="CheckStatus"></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <!--营业期限-->
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <!--<el-form-item label="营业期限:" prop="businessTerm">-->
                                    <!--<el-tooltip content="最多输入100个字符" placement="right" effect="light" :disabled="CheckStatus">-->
                                    <!--<el-input v-model="addForm.businessTerm" :maxlength='100' :disabled="CheckStatus"></el-input>-->
                                    <!--</el-tooltip>-->
                                    <!--</el-form-item>-->
                                    <el-form-item prop="businessTerm" label="营业期限">
                                        <el-date-picker v-model="addForm.businessTerm" :disabled="CheckStatus" :editable="false"
                                                        type="date" placeholder="选择日期">
                                        </el-date-picker>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <!--银行账号-->
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="银行账号:" prop="bankAccount">
                                        <el-tooltip content="最多输入25个字符" placement="right" effect="light"
                                                    :disabled="CheckStatus">
                                            <el-input v-model="addForm.bankAccount" :maxlength='25'
                                                      :disabled="CheckStatus"></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <!--国家-->
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="国家名称:" prop="countryCode">
                                        <el-select v-model="addForm.countryCode"
                                                   @change="addressChange('addressed', addForm.countryCode)" filterable
                                                   placeholder="请选择" :disabled="CheckStatus">
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
                                                   placeholder="请选择" :disabled="CheckStatus">
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
                                    <el-form-item label="市名称:" prop="prefectureCityCode">
                                        <el-select v-model="addForm.prefectureCityCode"
                                                   @change="addressChange('county',addForm.prefectureCityCode)"
                                                   filterable placeholder="请选择" :disabled="CheckStatus">
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
                                    <el-form-item label="区县名称:" prop="countryCityCode">
                                        <el-select v-model="addForm.countryCityCode"
                                                   @change="addressChange('street',addForm.countryCityCode)" filterable
                                                   placeholder="请选择" :disabled="CheckStatus">
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
                                                   :disabled="CheckStatus">
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
                                        <el-tooltip content="最多输入200个字符" placement="right" effect="light">
                                            <el-input v-model="addForm.address" :maxlength='200'
                                                      :disabled="CheckStatus"></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <!--邮政编码-->
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="邮政编码:" prop="postcode">
                                        <el-tooltip content="最多输入6个字符" placement="right" effect="light">
                                            <el-input v-model="addForm.postcode" :maxlength='6'
                                                      :disabled="CheckStatus"></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <!--联系人-->
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="联系人:" prop="contactPerson">
                                        <el-tooltip content="最多输入50个字符" placement="right" effect="light">
                                            <el-input v-model="addForm.contactPerson" :maxlength='50'
                                                      :disabled="CheckStatus"></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <!--联系电话-->
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="联系电话:" prop="telephone">
                                        <el-tooltip content="最多输入13个字符" placement="right" effect="light">
                                            <el-input v-model="addForm.telephone" :maxlength='13'
                                                      :disabled="CheckStatus"></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <!--证明材料-->
                            <el-col :span="12">
                                <div class="grid-content bg-purple" v-show="visible.imgView">
                                    <el-form-item label="证明材料:" prop="evidence">
                                        <el-upload
                                                class="upload-demo"
                                                :class="{'upload-pic': CheckStatus}"
                                                :action="importFileUrl"
                                                :headers="upLoadData"
                                                name="files"
                                                :on-preview="handlePreview"
                                                :on-remove="handleRemove"
                                                :onSuccess="uploadSuccess"
                                                :file-list="fileList2"
                                                :before-upload="onPhotoBeforeUpload"
                                                :limit="3"
                                                :list-type="pictureFlag" :disabled="CheckStatus">
                                            <el-button size="mini" v-show="!CheckStatus">点击上传</el-button>
                                            <div slot="tip" v-show="!CheckStatus" class="el-upload__tip">只能上传jpg/jpeg/png图片，且不超过5MB</div>
                                        </el-upload>
                                    </el-form-item>
                                </div>
                            </el-col>
                            <!--经营范围-->
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <el-form-item label="经营范围:" prop="businessScope">
                                        <el-tooltip content="最多输入500个字符" placement="right" effect="light"
                                                    :disabled="CheckStatus">
                                            <el-input type="textarea" width="190" :rows="2"
                                                      v-model="addForm.businessScope" :maxlength='500'
                                                      :disabled="CheckStatus"></el-input>
                                        </el-tooltip>
                                    </el-form-item>
                                </div>
                            </el-col>
                        </el-form>
                        <div slot="footer" class="dialog-footer def-but addsolodBtn" v-if="viewStatus">
                            <el-button @click.native="addSubmit" v-if="!CheckStatus">{{ $t('button.save') }}
                            </el-button>
                            <el-button @click.native="handleClose">{{ $t('button.cancel') }}</el-button>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="售达方扩展信息" name="second" class="solodInfoHeight">
                    <el-table stripe :data="soldExt" ref="soldExtSel" @selection-change="handleSelectionSold"
                              v-loading="listLoading"
                              style="width: 100%;" border :fit="true" align="center" height="156">
                        <!--序号-->
                        <el-table-column :label="$t('commonThead.index')" align="center" type="selection"
                                         width="50" v-if="viewStatus"></el-table-column>
                        <!--售达方别称-->
                        <el-table-column :label="$t('soldThead.shortName')" width="140" prop="soldShortName"
                                         align="center" text-overflow="ellipsis"
                                         show-overflow-tooltip>
                            <template slot-scope="scope">
                                <el-input size="mini" v-model="scope.row.soldShortName"
                                          :disabled="!viewStatus" :maxlength="100"></el-input>
                            </template>
                        </el-table-column>
                        <!--仓储中心代码-->
                        <el-table-column label="仓储中心代码" width="120" prop="storageCenterCode" align="center"
                                         text-overflow="ellipsis" show-overflow-tooltip>
                        </el-table-column>
                        <!--仓储中心名称-->
                        <el-table-column label="仓储中心名称" width="200" prop="storageCenterName" align="center"
                                         text-overflow="ellipsis"
                                         show-overflow-tooltip>
                        </el-table-column>
                        <!--货主代码-->
                        <el-table-column label="货主代码" width="140" prop="shipperCode" align="center"
                                         text-overflow="ellipsis"
                                         show-overflow-tooltip>
                        </el-table-column>
                        <!--货主名称-->
                        <el-table-column label="货主名称" width="160" prop="shipperName" align="center"
                                         text-overflow="ellipsis"
                                         show-overflow-tooltip>
                        </el-table-column>
                        <!--操作-->
                        <el-table-column fixed="right" :label="$t('commonThead.operation')" align="center" width="80">
                            <template slot-scope="scope">
                                <el-button @click="handleDelete(scope.row)" :disabled="!viewStatus">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-form v-if="viewStatus" :model="addFormSold" label-width="120px" :rules="addFormSoldRules"
                             ref="addFormSold" size="mini" style="height: auto;" class="addSoldInfo">
                        <!--货主名称-->
                        <el-col :span="10">
                            <div class="grid-content bg-purple">
                                <el-form-item label="货主名称:" prop="shipperCode">
                                    <el-select v-model="addFormSold.shipperCode" filterable remote
                                               reserve-keyword placeholder="请输入关键词"
                                               :remote-method="searchShipper"
                                               @change="choiceShipper"
                                               :loading="visible.searchShipper" clearable>
                                        <el-option v-for="item in searchShipperList" :key="item.shipperCode"
                                                   :label="item.shipperName" :value="item.shipperCode"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                        <!--仓储中心名称-->
                        <el-col :span="10">
                            <div class="grid-content bg-purple">
                                <el-form-item label="仓储中心名称:" prop="storageCenterCode">
                                    <el-select v-model="addFormSold.storageCenterCode" filterable
                                               reserve-keyword placeholder="请输入关键词" clearable>
                                        <!--:remote-method="searchFactoryDc"
                                        :loading="visible.searchFactoryDc"-->
                                        <el-option v-for="item in searchFactoryDcList" :key="item.storageCenterCode"
                                                   :label="item.storageCenterName"
                                                   :value="item.storageCenterCode"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="4">
                            <el-button :disabled="!addBaseInfoStatus" @click="searchSoldToDc">{{ $t('button.add') }}
                            </el-button>
                        </el-col>
                    </el-form>

                    <div class="dialog-footer def-but addsolodBtn" v-if="viewStatus">
                        <el-button @click.native="bindSold">{{ $t('button.bind') }}</el-button>
                        <el-button @click.native="handleClose">{{ $t('button.cancel') }}</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="送达方关系" name="third" class="solodInfoHeight1">
                    <el-table stripe :data="soldDeliveryExt" v-loading="listLoading"
                              style="width: 100%;" border :fit="true" align="center" height="272">
                        <!--仓储中心代码-->
                        <el-table-column label="仓储中心代码" width="120" prop="storageCenterCode" align="center"
                                         text-overflow="ellipsis" show-overflow-tooltip>
                        </el-table-column>
                        <!--仓储中心名称-->
                        <el-table-column label="仓储中心名称" width="180" prop="storageCenterName" align="center"
                                         text-overflow="ellipsis"
                                         show-overflow-tooltip>
                        </el-table-column>
                        <!--货主代码-->
                        <el-table-column label="货主代码" width="140" prop="shipperCode" align="center"
                                         text-overflow="ellipsis"
                                         show-overflow-tooltip>
                        </el-table-column>
                        <!--货主名称-->
                        <el-table-column label="货主名称" width="160" prop="shipperName" align="center"
                                         text-overflow="ellipsis"
                                         show-overflow-tooltip>
                        </el-table-column>
                        <!--送达方代码-->
                        <el-table-column label="送达方代码" width="150" prop="deliveryShortName" align="center"
                                         text-overflow="ellipsis"
                                         show-overflow-tooltip>
                            <template slot-scope="scope">
                                <el-input size="mini" v-model="scope.row.deliveryCode"
                                          placeholder="输入代码以';'分割" :disabled="!viewStatus"></el-input>
                            </template>
                        </el-table-column>
                        <!--售达方别称-->
                        <!--<el-table-column label="售达方别称" width="100" prop="soldShortName" align="center"-->
                        <!--text-overflow="ellipsis"-->
                        <!--show-overflow-tooltip>-->
                        <!--</el-table-column>-->
                        <!--送达方名称-->
                        <el-table-column label="送达方名称" width="100" prop="deliveryShortName" align="center"
                                         text-overflow="ellipsis"
                                         show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                    <div class="dialog-footer def-but addsolodBtn">
                        <el-button @click.native="bindSoldToDelivery" v-if="viewStatus">{{ $t('button.bind') }}
                        </el-button>
                        <el-button @click.native="handleClose">{{ $t('button.cancel') }}</el-button>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>

        <!--导入-->
        <el-dialog title="导入售达方信息" :close-on-click-modal="false" :visible.sync="centerDialogVisible" width="30%" center
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
        <el-dialog :visible.sync="visible.previewPhoto">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<script>
    import util from '../../common/js/util';
    import cookieOperation from '../../common/js/cookieOperation';
    import config from '../../common/js/config';

    export default {
        data() {
            return {
                // 初始化页面参数
                init: 1,
                // 分页
                pager: {
                    page: 1,
                    rows: 20,
                    total: 0
                },
                // 导入
                excelList: [],
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
                dict: '',
                visible2: false,
                viewStatus: true,
                activeName: 'first',
                address: [],
                addressed: [],
                city: [],
                county: [],
                street: [],
                formInline: {
                    soldCode: '',
                    soldName: '',
                    sapCode: '',
                    socialCreditCode: ''
                },
                users: [],
                newUser: null,
                dates: [],
                total: 0,
                dblId: [],
                type: '',
                page: 1,
                listLoading: false,
                sels: [], // 列表选中列
                lookFormVisible: false, // 查看界面是否显示
                lookLoading: false,
                lookFormRules: {
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
                lookForm: {
                    soldCode: '',
                    soldName: '',
                    shortName: '',
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
                    legalPerson: '',
                    businessScope: '',
                    status: 'AVAILABILITY'
                },
                editFormVisible: false, // 编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    soldCode: [
                        {required: true, message: '请输入售达方代码', trigger: this.trigger}
                    ],
                    soldName: [
                        {required: true, message: '只能输入中文，英文，数字及._-@()', trigger: this.trigger, validator: this.stripscriptName}
                    ],
                    shortName: [
                        {required: true, message: '只能输入中文，英文，数字及._-@()', trigger: this.trigger, validator: this.stripscriptName}
                    ],
                    countryId: [
                        {required: true, message: '请输入国家名称', trigger: this.trigger}
                    ],
                    provinceId: [
                        {required: true, message: '请输入省名称', trigger: this.trigger}
                    ],
                    cityId: [
                        {required: true, message: '请输入市名称', trigger: this.trigger}
                    ],
                    districtId: [
                        {required: true, message: '请输入区县名称', trigger: this.trigger}
                    ],
                    streetId: [
                        {required: true, message: '请输入街道名称', trigger: this.trigger}
                    ],
                    postcode: [
                        {required: true, trigger: this.trigger, validator: this.isPostalCodeTo}
                    ],
                    contactPerson: [
                        {required: true, message: '请输入联系人', trigger: this.trigger}
                    ],
                    telephone: [{required: true, trigger: this.trigger, validator: this.validPhone}],
                    legalPerson: [{required: false, message: '请正确输入中文，英文，数字及._-@()', trigger: this.trigger, validator: this.stripscriptName}],
                    businessScope: [{required: false, message: '请正确输入中文，英文，数字及._-@()', trigger: this.trigger, validator: this.stripscriptName}],
                    // status: [
                    //   { required: true, message: '请选择状态', trigger: this.trigger }
                    // ],
                    // address: [
                    //   { required: true, message: '请输入地址', trigger: this.trigger }
                    // ],
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
                    soldCode: '',
                    soldName: '',
                    shortName: '',
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
                    legalPerson: '',
                    businessScope: '',
                    status: ''
                },
                addFormVisible: false, // 新增界面是否显示
                addLoading: false,
                trigger: 'blur',
                addFormRules: {
                    soldCode: [
                        {required: true, message: '请输入售达方代码', trigger: this.trigger},
                        {required: true, message: '', trigger: this.trigger, validator: this.validCode2}
                    ],
                    soldName: [
                        {required: true, message: '只能输入中文，英文，数字及._-@()', trigger: this.trigger, validator: this.stripscriptName}
                    ],
                    sapCode: [
                        {required: false, message: '只可输入英文，数字及 ._-@()', trigger: this.trigger, validator: this.validCode2}
                    ],
                    socialCreditCode: [
                        {required: false, message: '', trigger: this.trigger},
                        {required: false, message: '', trigger: this.trigger, validator: this.validNumber}
                    ],
                    legalPerson: [
                        {required: false, message: '', trigger: this.trigger, validator: this.stripscriptName}
                    ],
                  /*
                    businessTerm: [
                        {required: true, message: '请选择营业期限', trigger: 'change'}
                    ],*/
                    bankAccount: [
                        {required: false, message: '', trigger: this.trigger},
                        {required: false, message: '', trigger: this.trigger, validator: this.validNumber}
                    ],
                    countryCode: [
                        {required: true, message: '请输入国家名称', trigger: this.trigger},
                        {required: true, message: '', trigger: this.trigger, validator: this.validCode}
                    ],
                    provinceCode: [
                        {required: true, message: '请输入省名称', trigger: this.trigger},
                        {required: true, message: '', trigger: this.trigger, validator: this.validCode}
                    ],
                    prefectureCityCode: [
                        {required: true, message: '请输入市名称', trigger: this.trigger},
                        {required: true, message: '', trigger: this.trigger, validator: this.validCode}
                    ],
                    countryCityCode: [
                        {required: true, message: '请输入区县名称', trigger: this.trigger},
                        {required: true, message: '', trigger: this.trigger, validator: this.validCode}
                    ],
                    streetCode: [
                        {required: true, message: '请输入街道名称', trigger: this.trigger},
                        {required: true, message: '', trigger: this.trigger, validator: this.validCode}
                    ],
                    postcode: [
                        {required: false, message: '', trigger: this.trigger},
                        {required: false, message: '', trigger: this.trigger, validator: this.isPostalCodeTo}
                    ],
                    telephone: [
                        {required: false, message: '', trigger: this.trigger},
                        {required: false, message: '', trigger: this.trigger, validator: this.validNumber}
                    ],
                    contactPerson: [
                        {required: false, message: '', trigger: this.trigger, validator: this.stripscriptName}
                    ],
                    businessScope: [
                        {required: false, message: '', trigger: this.trigger, validator: this.stripscriptName}
                    ],
                    address: [
                        {required: true, message: '只能输入中文，英文，数字及._-@()', trigger: this.trigger, validator: this.stripscriptName}
                    ]
                    // evidence
                    // evidence: [
                    //     {required: true, message: '请上传证明材料', trigger: this.trigger}
                    // ]
                },
                addForm: {
                    // 新增界面数据
                    soldCode: '',
                    soldName: '',
                    shortName: '',
                    businessTerm: '',
                    countryCode: '',
                    countryName: '',
                    provinceCode: '',
                    provinceName: '',
                    prefectureCityCode: '',
                    cityName: '',
                    countryCityCode: '',
                    districtName: '',
                    streetCode: '',
                    streetName: '',
                    address: '',
                    postcode: '',
                    contactPerson: '',
                    telephone: '',
                    legalPerson: '',
                    businessScope: '',
                    status: 'AVAILABILITY',
                    evidence: []
                },
                // 售达方扩展关系
                addFormSold: {
                    soldShortName: '',
                    shipperCode: '',
                    shipperName: '',
                    storageCenterCode: '',
                    storageCenterName: ''
                },
                addFormSoldRules: {
                    shipperCode: [{required: true, message: '请选择货主名称', trigger: 'blur'}],
                    storageCenterCode: [{required: true, message: '请选择仓储中心名称', trigger: 'blur'}]
                },
                multipleSelection: [],
                currentPage1: 1,
                currentData: null,
                fileList: [
                    {
                        name: 'oms数据库',
                        url: ''
                    }
                ],
                fileList2: [],
                // 查询框折叠展开
                showSearch: true,
                // 售达方扩展信息
                soldExt: [],
                haveSoldExt: false,
                // 送达方售达方关系
                soldDeliveryExt: [],
                haveSoldDeliveryExt: false,
                //    修改禁止修改售达方代码
                //     disabledTo: false
                //    上传
                importFileUrl: config.base_service_ip + '/azure/upload',
                upLoadData: {
                    access_token: cookieOperation.cookie.get('access_token')
                    // access_token: '22c6ca84a41547eca27539597a69ae7e'
                },
                CheckStatus: false,
                updateStatus: false,
                searchShipperList: [], // 检索货主列表
                searchFactoryDcList: [], // 检索工厂列表
                visible: {
                    searchShipper: false,
                    searchFactoryDc: false,
                    previewPhoto: false,
                    imgView: true
                },
                // 售达方扩展信息勾选
                soldExtSel: [],
                // 标识是新增还是修改
                identify: true, // true为新增，false为修改
                // 新增售达方基础信息是否成功标识
                addBaseInfoStatus: false,
                previewPhotoTitle: '',
                previewPhotoUrls: [],
                // 预览大图
                dialogImageUrl: ''
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
                // let url = config.file_path_ip + '/album/mould/LOMS%E5%94%AE%E8%BE%BE%E6%96%B9%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx';
                let url = 'https://loms.wilmar.cn/temp/sold.xlsx';
                util.publicpost('/azure/urlSetKey', {url: url}, function (res) {
                    if (res.success) {
                        window.open(res.data);
                    }
                }, config.base_service_ip);
            },
            closeImportProgressDialog() {
                let _this = this;
                _this.importProgressVisible = false;
                _this.errorLogButtonVisible = false;
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
                return config.base_service_ip + '/sold/importExcel';
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
                        this.getUser();
                    }
                    // if (response.data == null || response.data == '') {
                    //   return;
                    // }
                }*/
            },
	        openImportProgress: function (progressId, intervalid1) {
		        let _this = this;
		        util.publicpost('/sold/progress', {id: progressId}, function (res) {
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

            //导出
            exportExcel() {
                let _this = this;
                // 判断是否是修改如果是修改加载列表不展示遮罩层
                let intervalid2;
                util.publicpost(
                    '/sold/export',
                    {
                        soldCode: _this.formInline.soldCode,
                        soldName: _this.formInline.soldName,
                        sapCode: _this.formInline.sapCode,
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
                util.publicpost('/sold/progress', {id: _this.exprotProgressIds[0]}, function (res) {
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
            validCode(rule, value, callback) {
                util.validCode(rule, value, callback);
            },
            validCode2(rule, value, callback) {
                util.validSpecialCode(rule, value, callback);
            },
            // 只能输入数字
            validNumber(rule, value, callback) {
                util.PositiveInteger(rule, value, callback);
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
            loadadds(item, data) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].code === item) {
                        return data[i].name;
                    }
                }
            },
            // 点击tab事件
            handleClick(tab, event) {
                let _this = this;
                _this.addFormSold = {
                    shipperCode: '',
                    shipperName: '',
                    storageCenterCode: '',
                    storageCenterName: ''
                };
                if (tab.name !== 'first') {
                    _this.getSoldExtList(tab.name);
                } else {
                    _this.soldExt = [];
                    _this.soldDeliveryExt = [];
                }
            },
            // 获取售达方扩展信息列表
            getSoldExtList(tabIndex, insertInfo) {
                console.log(this.addBaseInfoStatus);
                let _this = this;
                if (_this.soldExt || _this.soldDeliveryExt) {
                    _this.soldExt = [];
                    _this.soldDeliveryExt = [];
                }
                if (!_this.addBaseInfoStatus) {
                    _this.activeName = 'first';
                    _this.errorMsg('请保存售达方信息');
                    return;
                }
                _this.queryBySoldCode(tabIndex, insertInfo);
            },
            queryBySoldCode(tabIndex, insertInfo) {
                let _this = this;
                util.publicpost('/sold/queryBySoldCode', {
                    code: _this.addForm.soldCode
                }, function (res) {
                    if (res.success) {
                        if (res.data) {
                            if (res.data.soldExtList && res.data.soldDeliveryExtList) {
                                _this.haveSoldExt = true;
                                _this.haveSoldDeliveryExt = true;
                            } else {
                                _this.haveSoldExt = false;
                                _this.haveSoldDeliveryExt = false;
                            }
                        }
                        if (tabIndex === 'second' && res.data.soldExtList) {
                            _this.soldExt = res.data.soldExtList;
                        }
                        if (tabIndex === 'third') {
                            if (res.data.soldDeliveryExtList) {
                                // _this.soldDeliveryExt = res.data.soldExtList;
                                _this.soldDeliveryExt = res.data.soldDeliveryExtList;
                                // res.data.soldDeliveryExtList.map(itemDelivery => {
                                //     _this.soldDeliveryExt.map(itemSold => {
                                //         if (itemSold.shipperCode === itemDelivery.shipperCode && itemSold.storageCenterCode === itemDelivery.storageCenterCode) {
                                //             itemSold.deliveryCode = itemDelivery.deliveryCode;
                                //         }
                                //     });
                                // });
                            } else if (insertInfo) {
                                console.log(insertInfo);
                                insertInfo.map(item => {
                                    _this.soldDeliveryExt.push(item);
                                });
                            } else {
                                if (res.data.soldExtList) {
                                    _this.soldDeliveryExt = res.data.soldExtList;
                                }
                            }
                        }
                    } else {
                        _this.errorMsg(_this.$t(res.msg));
                    }
                });
            },
            // 绑定售达方、送达方、货主、仓储中心关系
            bindSoldToDelivery() {
                let _this = this;
                let tempSoldToDelivery = [];
                _this.soldDeliveryExt.map(item => {
                    if (item.deliveryCode !== '') {
                        tempSoldToDelivery.push(item);
                    }
                });
                if (tempSoldToDelivery.length === 0) {
                    _this.errorMsg('送达方代码不能全为空');
                    return;
                }
                util.publicpost('/sold/batchAddSoldDelExt', {
                    soldDelExtListJson: JSON.stringify(tempSoldToDelivery)
                }, function (res) {
                    if (res.success) {
                        _this.haveSoldDeliveryExt = true;
                        _this.successMsg(_this.$t('msg.success'));
                        _this.getSoldExtList('third');
                    } else {
                        if (res.code === -2) {
                            _this.$alert('<p style="color:#f56c6c;text-align: center">' + res.msg + '</p>', '提示', {dangerouslyUseHTMLString: true});
                        } else {
                            _this.$alert('<p style="color:#f56c6c;text-align: center">调用MD接口失败，扩展属性保存未成功，请重试！</p>', '提示', {dangerouslyUseHTMLString: true});
                        }
                    }
                });
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
            // 选择城市
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
            // 上传
            uploadProgress(event, file, fileList) {
                this.fileList2 = fileList;

            },
            handleRemove(file, fileList) {
                console.log(file);
                console.log(fileList.length);
                this.addForm.evidence = [];
                for (var k in fileList) {
                    this.addForm.evidence.push(fileList[k].response.msg);
                }
            },
            handlePreview(file) {
                console.log(file);
                this.previewPhotoUrls = [];
                this.previewPhotoTitle = file.name;

                var img = file.url;
                this.previewPhotoUrls.push(img);
                this.dialogImageUrl = file.url;
                this.visible.previewPhoto = true;
            },
            onPhotoBeforeUpload: function (file) {
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
            uploadSuccess(response, file, fileList) {
                this.fileList2 = fileList;
                this.addForm.evidence = [];
                for (var k in fileList) {
                    this.addForm.evidence.push(fileList[k].response.data);
                }
            },
            handleExceed(files, fileList) {
                // this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm('确定移除' + file.name + '？');
            },
            // 获取售达方列表
            getUser() {
                let _this = this;
                this.exportBtnDisabled = false;
                _this.users = [];
                _this.listLoading = true;
                util.publicpost(
                    '/sold/selectSoldList',
                    {
                        soldCode: _this.formInline.soldCode,
                        soldName: _this.formInline.soldName,
                        sapCode: _this.formInline.sapCode,
                        socialCreditCode: _this.formInline.socialCreditCode,
                        page: _this.pager.page,
                        rows: _this.pager.rows,
                        init: _this.init
                    },
                    function (res) {
                        console.log(res);
                        if (res.code === 0) {
                            _this.init = '';
                            _this.listLoading = false;
                            _this.pager.total = res.pager.totalCount || 0;
                            _this.users = res.data;
                            _this.dict = res.enumVal;
                        } else {
                            _this.listLoading = false;
                            _this.errorMsg('服务器繁忙！');
                        }
                    }
                );
            },

            // 状态转换
            formatStatus(row, column) {
                let key = row.status;
                let json = this.dict.status;
                return util.formatDict(json, key);
            },
            // 创建时间转换
            formatter(row, column) {
                return util.formatDate.format(
                    new Date(row.createTime),
                    'yyyy-MM-dd hh:mm:ss'
                );
            },
            // 添加
            handleAdd: function () {
                let _this = this;
                _this.haveSoldExt = false;
                _this.haveSoldDeliveryExt = false;
                _this.identify = true;
                _this.addFormVisible = true;
                _this.lookFormVisible = false;
                _this.viewStatus = true;
                _this.addBaseInfoStatus = false;
                _this.activeName = 'first';
                _this.fileList2 = [];
                _this.visible.imgView = true;
                _this.addForm = [];
                if (_this.$refs['addForm'] !== undefined) {
                    _this.$refs['addForm'].resetFields();
                }
                if (_this.addFormVisible === true) {
                    util.publicpost(
                        '/regionalAddress/selectAddress',
                        {type: 'COUNTRY'},
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
            // 显示查看界面
            handleLook: function (row) {
                let _this = this;
                _this.fileList2 = [];
                _this.haveSoldExt = false;
                _this.haveSoldDeliveryExt = false;
                _this.identify = false;
                _this.addFormVisible = true;
                _this.lookFormVisible = true;
                _this.addForm = row;
                _this.addForm.countryCode = row.countryName;
                _this.addForm.provinceCode = row.provinceName;
                _this.addForm.prefectureCityCode = row.cityName;
                _this.addForm.countryCityCode = row.districtName;
                _this.addForm.streetCode = row.streetName;
                _this.CheckStatus = true;
                _this.viewStatus = false;
                _this.addBaseInfoStatus = true;
                _this.activeName = 'first';
                // 清除校验
                if (_this.$refs['addFormRules'] !== undefined) {
                    _this.$refs['addFormRules'].resetFields();
                }
                if (_this.addForm.evidencePath1 != null && _this.addForm.evidencePath1 != '') {
                    _this.visible.imgView = true;
                    var fileName = _this.addForm.evidencePath1;
                    var imageFile = {name: '', url: config.azure_download_path + fileName};
                    _this.fileList2.push(imageFile);
                } else {
                    _this.visible.imgView = false;
                }
                if (_this.addForm.evidencePath2 != null && _this.addForm.evidencePath2 != '') {
                    var fileName = _this.addForm.evidencePath2;
                    var imageFile = {name: '', url: config.azure_download_path + fileName};
                    _this.fileList2.push(imageFile);
                }
                if (_this.addForm.evidencePath3 != null && _this.addForm.evidencePath3 != '') {
                    var fileName = _this.addForm.evidencePath3;
                    var imageFile = {name: '', url: config.azure_download_path + fileName};
                    _this.fileList2.push(imageFile);
                }
            },

            // 显示修改界面
            handleEdit: function (row) {
                let _this = this;
                _this.haveSoldExt = false;
                _this.haveSoldDeliveryExt = false;
                _this.identify = false;
                _this.addFormVisible = true;
                _this.lookFormVisible = false;
                _this.CheckStatus = true;
                _this.viewStatus = true;
                _this.addBaseInfoStatus = true;
                _this.activeName = 'first';
                _this.addForm.evidence = [];
                _this.addForm = row;
                _this.addForm.countryCode = row.countryName;
                _this.addForm.provinceCode = row.provinceName;
                _this.addForm.prefectureCityCode = row.cityName;
                _this.addForm.countryCityCode = row.districtName;
                _this.addForm.streetCode = row.streetName;
                _this.fileList2 = [];
                // _this.visible.imgView = true;
                // 清除校验
                if (_this.$refs['addFormRules'] !== undefined) {
                    _this.$refs['addFormRules'].resetFields();
                }
                if (_this.addForm.evidencePath1 != null && _this.addForm.evidencePath1 != '') {
                    _this.visible.imgView = true;
                    var fileName = _this.addForm.evidencePath1;
                    var imageFile = {name: '', url: config.azure_download_path + fileName};
                    _this.fileList2.push(imageFile);
                } else {
                    _this.visible.imgView = false;
                }
                if (_this.addForm.evidencePath2 != null && _this.addForm.evidencePath2 != '') {
                    var fileName = _this.addForm.evidencePath2;
                    var imageFile = {name: '', url: config.azure_download_path + fileName};
                    _this.fileList2.push(imageFile);
                }
                if (_this.addForm.evidencePath3 != null && _this.addForm.evidencePath3 != '') {
                    var fileName = _this.addForm.evidencePath3;
                    var imageFile = {name: '', url: config.azure_download_path + fileName};
                    _this.fileList2.push(imageFile);
                }
            },
            // 查询货主仓储中心
            searchSoldToDc() {
                let _this = this;
                let containFlag = false;
                _this.$refs.addFormSold.validate(valid => {
                    if (valid) {
                        _this.searchShipperList.map(item => {
                            if (item.shipperCode === _this.addFormSold.shipperCode) {
                                _this.addFormSold.shipperName = item.shipperName;
                            }
                        });
                        _this.searchFactoryDcList.map(item => {
                            if (item.storageCenterCode === _this.addFormSold.storageCenterCode) {
                                _this.addFormSold.storageCenterName = item.storageCenterName;
                            }
                        });
                        if (_this.soldExt.length > 0) {
                            _this.soldExt.map(item => {
                                if (item.shipperCode === _this.addFormSold.shipperCode && item.storageCenterCode === _this.addFormSold.storageCenterCode) {
                                    _this.errorMsg('该条数据已经存在');
                                    containFlag = true;
                                }
                            });
                        }
                        _this.addFormSold.isEditing = true;
                        !containFlag && _this.soldExt.push(_this.addFormSold);
                        _this.addFormSold = {
                            soldShortName: '',
                            shipperCode: '',
                            shipperName: '',
                            storageCenterCode: '',
                            storageCenterName: ''
                        };
                    } else {
                        return false;
                    }
                });
            },
            // 绑定售达方货主关系
            bindSold() {
                let _this = this;
                let insertFlag = false;
                let modifyFlag = false;
                let tempSel = _this.soldExtSel;
                _this.soldExtSel.map(item => {
                    item.soldCode = _this.addForm.soldCode;
                    if (item.sourceSystem) {
                        modifyFlag = true;
                        _this.identify = false;
                    } else {
                        insertFlag = true;
                        _this.identify = true;
                    }
                });
                if (modifyFlag && insertFlag) {
                    _this.errorMsg('请先只选中新增数据绑定成功后再进行其他操作');
                    return;
                } else if (_this.soldExtSel.length === 0) {
                    _this.errorMsg('请先勾选需要绑定的条目');
                    return;
                }
                if (_this.identify) {
                    // 新增
                    util.publicpost('/sold/batchAddSoldExt', {
                        soldExtListJson: JSON.stringify(_this.soldExtSel)
                    }, function (res) {
                        if (res.success) {
                            _this.haveSoldExt = true;
                            _this.activeName = 'third';
                            _this.soldDeliveryExt = _this.soldExtSel;
                            // _this.getSoldExtList('third', _this.soldExtSel);
                            _this.soldExtSel = [];
                        } else {
                            if (_this.haveSoldExt) {
                                _this.errorMsg(_this.$t(res.msg));
                            } else {
                                _this.$alert('<p style="color:#f56c6c;text-align: center">调用MD接口失败，扩展属性保存未成功，请重试！</p>', '提示', {dangerouslyUseHTMLString: true});
                            }
                        }
                    });
                } else {
                    // 修改
                    util.publicpost('/sold/batchModifySoldExt', {
                        soldExtListJson: JSON.stringify(_this.soldExtSel)
                    }, function (res) {
                        if (res.success) {
                            _this.successMsg(_this.$t('msg.success'));
                            _this.getSoldExtList('second');
                            _this.activeName = 'third';
                            util.publicpost('/sold/queryBySoldCode', {
                                code: _this.addForm.soldCode
                            }, function (res) {
                                if (res.success) {
                                    if (res.data.soldDeliveryExtList && res.data.soldDeliveryExtList.length > 0) {
                                        _this.soldDeliveryExt = res.data.soldDeliveryExtList;
                                        tempSel.map(item => {
                                            let tempCombinationCode = null;
                                            item.combinationCode = item.shipperCode + item.storageCenterCode;
                                            res.data.soldDeliveryExtList.map(resItem => {
                                                resItem.combinationCode = resItem.shipperCode + resItem.storageCenterCode;
                                                if (resItem.combinationCode !== item.combinationCode) {
                                                    tempCombinationCode = item.combinationCode;
                                                }
                                            });
                                            if (tempCombinationCode === item.combinationCode) {
                                                _this.soldDeliveryExt.push(item);
                                            }
                                        });
                                    } else {
                                        _this.soldDeliveryExt = tempSel;
                                    }
                                } else {
                                    _this.errorMsg(res.msg);
                                }
                            });
                            _this.soldExtSel = [];
                        } else {
                            _this.errorMsg(_this.$t(res.msg));
                        }
                    });
                }
            },
            // 删除售达方扩展信息
            handleDelete(row) {
                let _this = this;
                _this.$message({
                    type: 'error',
                    showClose: true,
                    dangerouslyUseHTMLString: true,
                    message: '<div style="width:310px;">删除扩展信息会影响下游系统生产数据的准确性，请联系管理员或运维人员</div>'
                });
                // _this.$alert('删除扩展信息会影响下游系统生产数据的准确性，请联系管理员或运维人员！', '提示');
                // 删除功能暂时注释掉
                /*this.$confirm('确认删除吗？', '提示', {}).then(() => {
                    util.publicpost('/sold/deleteSoldExt', {
                        soldShortName: row.soldShortName,
                        shipperCode: row.shipperCode,
                        shipperName: row.shipperName,
                        storageCenterCode: row.storageCenterCode,
                        storageCenterName: row.storageCenterName,
                        soldCode: row.soldCode,
                        soldName: row.soldName
                    }, function (res) {
                        if (res.success) {
                            _this.successMsg(_this.$t('msg.success'));
                            _this.getSoldExtList('second');
                        } else {
                            _this.errorMsg(_this.$t(res.msg));
                        }
                    });
                }).catch(_ => {
                });*/
            },
            // 修改
            editSubmit: function () {
                this.$refs.editForm.validate(valid => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            let _this = this;
                            _this.editLoading = true;
                            // let ids = _this.sels.map(item => item.id).toString();
                            let districtid = _this.editForm.districtId;
                            _this.editForm.districtName = _this.loadadds(
                                districtid,
                                _this.county
                            );
                            let countryid = _this.editForm.countryId;
                            _this.editForm.countryName = _this.loadadds(
                                countryid,
                                _this.address
                            );
                            let provinceid = _this.editForm.provinceId;
                            _this.editForm.provinceName = _this.loadadds(
                                provinceid,
                                _this.addressed
                            );
                            let cityid = _this.editForm.cityId;
                            _this.editForm.cityName = _this.loadadds(cityid, _this.city);
                            let streeid = _this.editForm.streetId;
                            _this.editForm.streetName = _this.loadadds(streeid, _this.street);
                            let para = Object.assign({}, this.editForm);
                            console.log(para);
                            let arr = [
                                'creater',
                                'status',
                                'createTime',
                                'updateTime',
                                'delStatus',
                                'updater'
                            ];
                            arr.map(function (item, index) {
                                delete para[item];
                            });
                            util.publicpost('/sold/updateSold', para, function (res) {
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
                });
            },
            handleClose() {
                if (!this.lookFormVisible && !this.haveSoldExt) {
                    /*this.$alert('<p style="color:#f56c6c;text-align: center">信息未保存！</p>', '提示', {dangerouslyUseHTMLString: true});
                    this.addFormVisible = true;
                    return;*/
                    this.$confirm('信息未保存,确定要关闭吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.addFormVisible = false;
                        this.CheckStatus = false;
                        this.updateStatus = false;
                        this.lookFormVisible = true;
                        this.haveSoldExt = true;
                        // 清除校验
                        if (this.$refs['addForm'] !== undefined) {
                            this.$refs['addForm'].resetFields();
                        }
                        this.getUser();
                    }).catch(() => {
                        this.addFormVisible = true;
                    });
                } else {
                    this.addFormVisible = false;
                    this.CheckStatus = false;
                    this.updateStatus = false;
                    this.lookFormVisible = true;
                    this.haveSoldExt = true;
                }
            },
            // 新增保存
            addSubmit: function () {
                console.log(this.addForm);
                let _this = this;
                this.$refs.addForm.validate(valid => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            _this.addLoading = true;
                            let countryCityCode = _this.addForm.countryCityCode;
                            _this.addForm.districtName = _this.loadadds(countryCityCode, _this.county);
                            let countryCode = _this.addForm.countryCode;
                            _this.addForm.countryName = _this.loadadds(countryCode, _this.address);
                            let provinceCode = _this.addForm.provinceCode;
                            _this.addForm.provinceName = _this.loadadds(provinceCode, _this.addressed);
                            let prefectureCityCode = _this.addForm.prefectureCityCode;
                            _this.addForm.cityName = _this.loadadds(prefectureCityCode, _this.city);
                            let streetCode = _this.addForm.streetCode;
                            _this.addForm.streetName = _this.loadadds(streetCode, _this.street);
                            // _this.addForm.evidence = _this.fileList2;
                            _this.addForm.evidencePath1 = '';
                            _this.addForm.evidencePath2 = '';
                            _this.addForm.evidencePath3 = '';
                            for (var k in _this.addForm.evidence) {
                                var _tmpIndex = parseInt(k) + 1;
                                _this.addForm['evidencePath' + _tmpIndex] = _this.addForm.evidence[k][0];
                            }
                            let para = Object.assign({}, _this.addForm);
                            util.publicpost('/sold/insertSoldSubject', para, function (res) {
                                if (res.code === 0) {
                                    _this.successMsg(_this.$t('msg.success'));
                                    _this.queryBySoldCode();
                                    // _this.$refs['addForm'].resetFields();
                                    _this.activeName = 'second';
                                    _this.addFormVisible = true;
                                    _this.addBaseInfoStatus = true;
                                    _this.getUser();
                                } else {
                                    _this.errorMsg(_this.$t(res.msg));
                                    _this.addBaseInfoStatus = false;
                                    // _this.listLoading = false;
                                }
                            });
                        });
                    } else {
                        return false;
                    }
                });
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
            // 重置
            resetForm() {
                this.formInline.soldCode = '';
                this.formInline.soldName = '';
                this.formInline.sapCode = '';
                this.formInline.socialCreditCode = '';
            },
            // 根据关键字检索货主信息
            searchShipper(key) {
                if (key !== '') {
                    let _this = this;
                    _this.visible.searchShipper = true;
                    util.publicpost(
                        '/shipper/selectShipperByName',
                        {
                            name: key
                        },
                        function (res) {
                            _this.visible.searchShipper = false;
                            if (res.success) {
                                _this.searchShipperList = res.data;
                                _this.addFormSold.storageCenterCode = '';
                            } else {
                                _this.searchShipperList = [];
                            }
                        }
                    );
                }
            },
            // 选择货主
            choiceShipper(val) {
                let _this = this;
                _this.visible.searchFactoryDc = true;
                util.publicpost(
                    '/factorydc/queryByShipperCode',
                    {
                        shipperCode: val
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
            handleSelectionSold(val) {
                if (this.soldExtSel) {
                    this.soldExtSel = [];
                }
                this.soldExtSel = val;
                console.log(this.soldExtSel);
            },
            // 批量删除
            batchRemove: function (row) {
                let _this = this;
                let ids = row.id;
                let versions = row.version;
                _this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    _this.listLoading = true;
                    let para = {ids: ids, versions: versions};
                    util.publicpost('/sold/deleteSold', para, function (res) {
                        if (res.code === 0) {
                            _this.listLoading = false;
                            _this.successMsg(_this.$t(res.msg));
                            _this.getUser();
                        } else {
                            _this.errorMsg(_this.$t(res.msg));
                        }
                    });
                })
                    .catch(() => {
                    });
            },

            formatterType(row, column) {
                var oldType = row.type;
                var json = this.type;
                for (var i = 0; i < json.length; i++) {
                    var name = json[i].name;
                    if (oldType === name) {
                        return json[i].des;
                    }
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
            }
        },
        // 上传证明材料
        handleChange(file, fileList) {
            // this.fileList2 = fileList;
        },
        computed: {
            toggleDrop() {
                return this.showSearch ? 'el-icon-arrow-up' : 'el-icon-arrow-down';
            },
            pictureFlag() {
                return this.CheckStatus ? 'picture-card' : 'picture';
            },
            tableListHeight() {
                let computedHeight = $(window).height() - $('.transDrop').height() -
                    $('.add_move').height() - 85;
                return (this.users && this.users.length > 0) ? computedHeight : '120';
            }
        },
        mounted() {
            this.getButtonList();
            this.getUser();
            this.exportBtnDisabled = true;
            window.vue = this;
        }
    };
</script>
<style>
    .addsolodBtn {
        float: right;
    }

    .el-dialog .solodHeight {
        height: 330px !important;
        overflow: auto;
    }

    .solodInfoHeight {
        overflow: auto;
        height: 330px;
    }

    .solodInfoHeight1 .el-table {
        /*height: 155px;*/
        overflow: auto;
        margin-bottom: 20px;
    }

    .addSoldInfo .el-col {
        margin-bottom: 20px;
    }
</style>
