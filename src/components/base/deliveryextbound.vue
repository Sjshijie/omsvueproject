// 送达方绑定
<template >
    <div class="admin">
        <div class="query-top">
            <em name="" class="fl el-icon-search"></em>
            <h6 class="fl titleInfo">{{ $t('common.searchInfo') }}</h6>
            <el-button plain class="fr" :icon="toggleDrop" @click="showSearch = !showSearch"></el-button>
        </div>
        <el-collapse-transition>
            <div v-show="showSearch">
                <div class="query-content transDrop">
                    <el-form size="mini" :inline="true" label-width="120px" :model="query" class="demo-form-inline"
                             status-icon ref="query">
                        <el-row :gutter="10">
                            <!--仓储中心-->
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item prop="storageCenterCode" label="仓储中心">
                                    <el-select
                                            v-model="query.storageCenterCode"
                                            reserve-keyword @change="getShipper()"
                                            placeholder="请选择">
                                        <el-option v-for="item in searchFactoryDcList"
                                                   :key="item.factoryLogisticsCode"
                                                   :label="item.name"
                                                   :value="item.factoryLogisticsCode"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <!--货主-->
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item prop="shipperCode" label="货主">
                                    <el-select
                                            v-model="query.shipperCode"
                                            reserve-keyword @change="getChange()"
                                            placeholder="请选择">
                                        <el-option v-for="item in searchShipperList"
                                                   :key="item.shipperCode"
                                                   :label="item.shipperName"
                                                   :value="item.shipperCode"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <!--送达方编码-->
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item prop="deliveryCode" label="送达方编码">
                                    <el-input v-model="query.deliveryCode" @blur="getChange()"
                                              :placeholder="$t('common.pleaseEnter')"
                                              :maxlength="50"></el-input>
                                </el-form-item>
                            </el-col>
                            <!--送达方全称-->
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item prop="deliveryName" label="送达方全称">
                                    <el-input v-model="query.deliveryName" @blur="getChange()"
                                              :placeholder="$t('common.pleaseEnter')"
                                              :maxlength="100"></el-input>
                                </el-form-item>
                            </el-col>
                            <!--来源系统-->
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item label="来源系统：" prop="sourceSystem">
                                    <el-select
                                            v-model="query.sourceSystem" placeholder="请选择" @blur="getChange()">
                                        <el-option v-for="item in dict.sourceSystem" :key="item.name"
                                                   :label="item.des" :value="item.name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="footer-but tar pad_r pad_t">
                            <el-button type="primary" @click="queryList">{{ $t('button.query') }}</el-button>
                            <el-button @click="resetForm('query')">{{ $t('button.reset') }}</el-button>
                        </div>
                    </el-form>
                </div>
            </div>
        </el-collapse-transition>

        <!-- 列表 -->
        <div class="list_delivery list_operation" v-loading="visible.listLoading">
            <el-table stripe :data="currentList"
                      style="width: 100%;" :fit="true" border align="center">
                <el-table-column align="center" label="送达方编码" prop="deliveryCode"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column align="center" label="送达方全称" prop="deliveryName"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column align="center" label="国家名称" prop="countryName"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column align="center" label="省名称" prop="provinceName"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column align="center" label="市名称" prop="prefectureCityName"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column align="center" label="区县名称" prop="countryCityName"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column align="center" label="乡镇街道名称" prop="streetName"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column align="center" label="详细地址" prop="address"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column align="center" label="邮编" prop="zipCode"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column align="center" label="联系人" prop="contact"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column align="center" label="联系电话" prop="phone"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column align="center" label="来源系统" prop="sourceSystem" :formatter="formatSourceSystem"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column align="center" label="提交人" prop="createrName"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column width="200" label="提交时间" prop="createTime" align="center" :formatter="formatCreateTime"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column align="center" label="操作"
                                 show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div @click="handleEdit(scope.row)" class="operation_icon icon1"></div>
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
        <!-- 操作界面 -->
        <el-dialog :visible.sync="addFormVisible" :close-on-click-modal="false" @close="off('addFormRules')"
                   style="line-height: 0;overflow: hidden;font-size: 12px;" title="" class="md-dialog" v-loading="addLoading">
            <div class="form" >
                <el-tabs v-model="visible.activeName">
                    <el-tab-pane label="送达方信息" name="first" class="deliveryInfoHeight">
                        <div class="form form-add soldforme-add" style="height: 200px;">
                            <el-form :model="addForm" label-width="120px"
                                     size="mini">
                                <!--送达方编码-->
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="送达方编码:" prop="deliveryCode">
                                            <el-tooltip content="最多输入10个字符" placement="right" effect="light"
                                                        :disabled="isShow">
                                                <el-input v-model="addForm.deliveryCode" :maxlength="10"
                                                          :disabled="isShow"></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <!--送达方全称-->
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="送达方全称:" prop="deliveryName">
                                            <el-tooltip content="最多输入30个字符" placement="right" effect="light"
                                                        :disabled="isShow">
                                                <el-input v-model="addForm.deliveryName" :maxlength="30"
                                                          :disabled="isShow"></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <!--SAP送达方编码-->
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="SAP编码:" prop="sapCode">
                                            <el-tooltip content="最多输入10个字符" placement="right" effect="light"
                                                        :disabled="isShow">
                                                <el-input v-model="addForm.sapCode" :maxlength="10"
                                                          :disabled="isShow"></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <!--统一社会信用代码-->
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="统一社会信用代码:" prop="socialCreditCode">
                                            <el-tooltip content="最多输入18个字符" placement="right" effect="light"
                                                        :disabled="isShow">
                                                <el-input v-model="addForm.socialCreditCode" :maxlength="18"
                                                          :disabled="isShow"></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <!--法人-->
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="法人:" prop="legalPerson">
                                            <el-tooltip content="最多输入20个字符" placement="right" effect="light"
                                                        :disabled="isShow">
                                                <el-input v-model="addForm.legalPerson" :maxlength="20"
                                                          :disabled="isShow"></el-input>
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
                                                        placeholder="选择日期" :disabled="isShow">
                                                </el-date-picker>
                                            </div>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <!--国家名称-->
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="国家名称:" prop="countryName">
                                            <el-tooltip placement="right" effect="light"
                                                        :disabled="isShow">
                                                <el-input v-model="addForm.countryName"
                                                          :disabled="isShow"></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <!--省名称-->
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="省名称:" prop="provinceName">
                                            <el-tooltip placement="right" effect="light"
                                                        :disabled="isShow">
                                                <el-input v-model="addForm.provinceName"
                                                          :disabled="isShow"></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <!--市名称-->
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="市名称:" prop="prefectureCityName">
                                            <el-tooltip placement="right" effect="light"
                                                        :disabled="isShow">
                                                <el-input v-model="addForm.prefectureCityName"
                                                          :disabled="isShow"></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <!--区县名称-->
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="区县名称:" prop="countryCityName">
                                            <el-tooltip placement="right" effect="light"
                                                        :disabled="isShow">
                                                <el-input v-model="addForm.countryCityName"
                                                          :disabled="isShow"></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <!--街道名称-->
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="乡镇街道名称:" prop="streetName">
                                            <el-tooltip placement="right" effect="light"
                                                        :disabled="isShow">
                                                <el-input v-model="addForm.streetName"
                                                          :disabled="isShow"></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <!--详细地址-->
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="详细地址:" prop="address">
                                            <el-tooltip content="最多输入100个字符" placement="right" effect="light"
                                                        :disabled="isShow">
                                                <el-input v-model="addForm.address" :maxlength="100"
                                                          :disabled="isShow"></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <!--邮政编码-->
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="邮政编码:" prop="zipCode">
                                            <el-tooltip content="最多输入6个字符" placement="right" effect="light"
                                                        :disabled="isShow">
                                                <el-input v-model="addForm.zipCode" :maxlength="6"
                                                          :disabled="isShow"></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <!--联系人-->
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="联系人:" prop="contact">
                                            <el-tooltip content="最多输入20个字符" placement="right" effect="light"
                                                        :disabled="isShow">
                                                <el-input v-model="addForm.contact" :maxlength="20"
                                                          :disabled="isShow"></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <!--联系电话-->
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="联系电话:" prop="phone">
                                            <el-tooltip content="最多输入13个字符" placement="right" effect="light"
                                                        :disabled="isShow">
                                                <el-input v-model="addForm.phone" :maxlength="13"
                                                          :disabled="isShow"></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <!--经营范围-->
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <el-form-item label="经营范围:" prop="businessScope">
                                            <el-tooltip content="最多输入500个字符" placement="right" effect="light"
                                                        :disabled="isShow">
                                                <el-input type="textarea" width="190" :rows="2"
                                                          v-model="addForm.businessScope" :maxlength='500'
                                                          :disabled="isShow"></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-form>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="关系信息" name="second">
                        <div class="list ownerInfo list_operation">
                            <el-form class="cargoInfo" size="mini"
                                     :model="relationForm" ref="relationForm"
                                     :rules="relationFormRules" label-width="140px" style="margin-top:20px;">
                                <el-col :span="12">
                                    <el-input v-model="relationForm.deliveryCode" prop="deliveryCode"
                                              v-show="false"></el-input>
                                    <div class="grid-content">
                                        <el-form-item label="送达方简称：" prop="shortName">
                                            <el-input content="最多输入30个字符" :maxlength="30"
                                                      v-model="relationForm.shortName"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="仓储中心代码：" prop="storageCenterCode">
                                            <el-input content="最多输入30个字符" :maxlength="30"
                                                      v-model="relationForm.storageCenterCode"
                                                      :disabled="isShow"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="货主代码：" prop="shipperCode">
                                            <el-input :maxlength="50"
                                                      v-model="relationForm.shipperCode" :disabled="isShow"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="效期要求：" prop="validityPeriodRequirement">
                                            <el-input :maxlength="10" type="number" v-model="relationForm.validityPeriodRequirement" ></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="销售渠道：" prop="saleChannel">
                                            <el-select v-model="relationForm.saleChannel"
                                                       placeholder="请选择">
                                                <el-option v-for="item in dict.saleChannel" :key="item.code"
                                                           :label="item.des" :value="item.code"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="线路：" prop="line">
                                            <el-input content="最多输入100个字符" :maxlength="100"
                                                      v-model="relationForm.line"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <div class="dialog-footer def-but addDelveryBtn">
                                    <el-button @click.native="boundRelation">绑定</el-button>
                                    <el-button @click.native="off">取消</el-button>
                                </div>
                            </el-form>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="物料关系" name="third" class="deliveryInfoHeight" >
                        <template>
                            <el-tabs v-model="activeNameTo" @tab-click="handleClickTo">
                                <el-tab-pane label="已绑定" name="IsBinding">
                                    <el-form :model="isBindingForm" size="mini"
                                             style="height: auto;" class="adddeliveryInfo">
                                        <el-col :span="15" style="margin-left: 6px">
                                            <div class="grid-content bg-purple">
                                                <el-form-item label="物料代码:" prop="materialCode">
                                                    <el-tooltip content="最多输入25个字符" placement="right"
                                                                effect="light">
                                                        <el-input v-model="isBindingForm.materialCode"
                                                                  :maxlength='25'></el-input>

                                                    </el-tooltip>
                                                </el-form-item>
                                            </div>
                                        </el-col>
                                        <!--物料代码-->
                                        <el-col :span="3" class="TheQuery">
                                            <el-button @click="isBindingQuery">查询
                                            </el-button>
                                        </el-col>
                                    </el-form>
                                    <el-table stripe :data="bindingList" v-loading="listLoading"
                                              @selection-change="BindingChange"
                                              style="width: 100%;" border :fit="true" align="center" height="186">
                                        <!--全选-->
                                        <el-table-column align="center" type="selection"></el-table-column>
                                        <el-table-column label="仓储中心代码" prop="storageCenterCode" align="center"
                                                         text-overflow="ellipsis"
                                                         show-overflow-tooltip  v-show="false"></el-table-column>
                                        <el-table-column label="货主代码" prop="shipperCode" align="center"
                                                         text-overflow="ellipsis"
                                                         show-overflow-tooltip  v-show="false"></el-table-column>
                                        <!--物料代码-->
                                        <el-table-column label="物料代码" prop="materialCode"
                                                         align="center"
                                                         text-overflow="ellipsis" show-overflow-tooltip>
                                        </el-table-column>
                                        <!--物料名称-->
                                        <el-table-column label="物料名称" prop="materialName" align="center"
                                                         text-overflow="ellipsis"
                                                         show-overflow-tooltip>
                                        </el-table-column>
                                        <!--效期要求-->
                                        <el-table-column label="效期要求" prop="validityPeriodRequirement"
                                                         align="center" text-overflow="ellipsis"
                                                         show-overflow-tooltip>
                                        </el-table-column>
                                    </el-table>

                                    <div class="dialog-footer def-but addDelveryBtn">
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
                                                    <el-tooltip content="最多输入50个字符" placement="right" effect="light"
                                                    >
                                                        <el-input v-model="isNoBindingForm.materialName"
                                                                  :maxlength='50'></el-input>
                                                    </el-tooltip>
                                                </el-form-item>
                                            </div>
                                        </el-col>
                                        <!--物料代码-->
                                        <el-col :span="10" style="margin-left: 6px">
                                            <div class="grid-content bg-purple">
                                                <el-form-item label="物料代码:" prop="materialCode">
                                                    <el-tooltip content="最多输入25个字符" placement="right"
                                                                effect="light">
                                                        <el-input v-model="isNoBindingForm.materialCode"
                                                                  :maxlength='25'></el-input>

                                                    </el-tooltip>
                                                </el-form-item>
                                            </div>
                                        </el-col>
                                        <!--物料代码-->
                                        <el-col :span="3" class="TheQuery">
                                            <el-button @click="noBindingQuery()">查询
                                            </el-button>
                                        </el-col>
                                    </el-form>
                                    <el-table stripe :data="noBindingList" v-loading="listLoading"
                                              @selection-change="noselsChange"
                                              style="width: 100%;" border :fit="true" align="center" height="186">
                                        <!--全选-->
                                        <el-table-column align="center" type="selection"></el-table-column>
                                        <el-table-column label="仓储中心代码" prop="storageCenterCode" align="center"
                                                         text-overflow="ellipsis"
                                                         show-overflow-tooltip v-show="false"></el-table-column>
                                        <el-table-column label="货主代码" prop="shipperCode" align="center"
                                                         text-overflow="ellipsis"
                                                         show-overflow-tooltip v-show="false"></el-table-column>
                                        <!--物料代码-->
                                        <el-table-column label="物料代码" prop="materialCode"
                                                         align="center"
                                                         text-overflow="ellipsis" show-overflow-tooltip>
                                        </el-table-column>
                                        <!--物料名称-->
                                        <el-table-column label="物料名称" prop="materialName" align="center"
                                                         text-overflow="ellipsis"
                                                         show-overflow-tooltip>
                                        </el-table-column>
                                        <!--效期要求-->
                                        <el-table-column width="140px" label="效期要求" prop="validityPeriodRequirement"
                                                         align="center" text-overflow="ellipsis"
                                                         show-overflow-tooltip>
                                            <template slot-scope="scope">
                                                <el-input size="mini" v-model="scope.row.validityPeriodRequirement"
                                                          placeholder="只能输入数字" :maxlength='10'
                                                          @keyup.native="scope.row.validityPeriodRequirement=scope.row.validityPeriodRequirement.replace(/[^\d]/g,'')"></el-input>
                                            </template>
                                        </el-table-column>
                                    </el-table>

                                    <div class="dialog-footer def-but addDelveryBtn">
                                        <el-button @click="gobundling">绑定</el-button>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                        </template>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div slot="footer" class="dialog-footer-but" v-if="visible.closeForm">
                <el-button @click="closeDialog('editForm')">{{ $t('button.close') }}</el-button>
            </div>
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
            var validName = (rule, value, callback) => {
                const reg = /^[\u4E00-\u9FA5_0-9a-zA-Z/\.\-_@\-\-\(\)\（\）]*$/g;
                if (!reg.test(value)) {
                    callback(new Error('请输入中文,数字,字母或.@-_()（）'));
                } else if (value === '') {
                    callback(new Error('不能为空'));
                } else {
                    callback();
                }
            };
            var validShortName = (rule, value, callback) => {
              const reg = /^[\u4E00-\u9FA5_0-9a-zA-Z/\.\-_@\-\-\(\)\（\）]*$/g;
              if (!reg.test(value)) {
                callback(new Error('请输入中文,数字,字母或.@-_()（）'));
              } else {
                callback();
              }
            };
            return {
                // 初始化页面参数
                init: 1,
                isShow: true,
                // 查询字段
                query: {
                    storageCenterCode: '',
                    shipperCode: '',
                    deliveryCode: '',
                    deliveryName: '',
                    sourceSystem: ''
                },
                addForm: {
                    deliveryCode: '',
                    deliveryName: '',
                    sapCode: '',
                    socialCreditCode: '',
                    legalPerson: '',
                    operatingPeriod: '',
                    countryName: '',
                    provinceName: '',
                    prefectureCityName: '',
                    countryCityName: '',
                    streetName: '',
                    address: '',
                    zipCode: '',
                    contact: '',
                    phone: '',
                    businessScope: ''

                },
                relationForm: {
                    shortName: '',
                    storageCenterCode: '',
                    shipperCode: '',
                    validityPeriodRequirement: '',
                    validityPeriodRequirementStr: '',
                    saleChannel: '',
                    line: '',
                    deliveryCode: ''

                },
                relationFormRules: {
                    shortName: [
                        {required: false, trigger: this.trigger, validator: validShortName}
                    ],
                    line: [
                        {required: false, validator: validName, trigger: this.trigger}
                    ]
                },
                addFormVisible: false, // 新增界面是否显示
                isShow: true,
                listLoading: false,
                addLoading: false,
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
                    isAdd: false
                },
                activeNameTo: 'IsBinding',
                currentList: [], // 列表
                bindingList: [], // 已绑定
                noBindingList: [], // 未绑定
                isBindingSels: [], // 已绑定勾选
                noBindingSels: [], // 未绑定勾选
                isBindingForm: {
                    materialCode: ''
                }, // 绑定查询form
                isNoBindingForm: {
                    materialCode: '',
                    materialName: ''
                }, // 绑定查询form
                searchShipperList: [], // 检索货主列表
                searchFactoryDcList: [], // 检索工厂列表
                // 分页
                pager: {
                    page: 1,
                    rows: 20,
                    total: 0
                },
                dict: '',
                // 查询框折叠展开
                showSearch: true
            };
        },
        methods: {

            // tab点击切换(物料关系)
            handleClickTo(tab, event) {
                // console.log(tab.$el.childNodes[2].childNodes[1]);
                tab.$el.childNodes[2].childNodes[1].childNodes[0].style.width = '100%';
            },

            // 重置
            resetForm(formName) {
                this.searchShipperList = [];
                this.$refs[formName].resetFields();
            },
            // 关闭框
            closeDialog(formName) {
                this.close(formName);
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
            // 已绑定选中进行绑定
            BindingChange(val) {
                this.isBindingSels = val;
            },
            // 未绑定选中进行绑定
            noselsChange(val) {
                this.noBindingSels = val;
            },
            // 已绑定-查询
            isBindingQuery() {
                let _this = this;
                util.publicpost('/delivery/material/ext/list', {
                    deliveryCode: _this.relationForm.deliveryCode,
                    shipperCode: _this.relationForm.shipperCode,
                    storageCenterCode: _this.relationForm.storageCenterCode,
                    materialCode: _this.isBindingForm.materialCode
                }, function (res) {
                    _this.addLoading = false;
                    if (res.code === 0) {
                        _this.bindingList = res.data;
                    } else {
                        _this.addLoading = false;
                        _this.errorMsg(_this.$t(res.msg));
                    }
                });
            },
            // 未绑定-查询
            noBindingQuery() {
                debugger;
                let _this = this;
                util.publicpost('/deliveryExtBound/queryUnBindMaterialExtByCondtion', {
                    deliveryCode: _this.relationForm.deliveryCode,
                    shipperCode: _this.relationForm.shipperCode,
                    storageCenterCode: _this.relationForm.storageCenterCode,
                    materialCode: _this.isNoBindingForm.materialCode,
                    materialName: _this.isNoBindingForm.materialName
                }, function (res) {
                    _this.addLoading = false;
                    if (res.code === 0) {
                        _this.noBindingList = res.data;
                    } else {
                        _this.addLoading = false;
                        _this.errorMsg(_this.$t(res.msg));
                    }
                });
            },

            // 解绑
            unbundling() {
                let _this = this;
                _this.addLoading = true;
                if (_this.isBindingSels.length < 1) {
                    _this.showMsg('最少勾选一条需要解绑的数据');
                } else {
                    for (let i = 0; i < _this.isBindingSels.length; i++) {
                        _this.isBindingSels[i].deliveryCode = _this.addForm.deliveryCode;
                    }
                    util.publicpost('/delivery/material/ext/delete/batch', {
                        jsonStr: JSON.stringify(_this.isBindingSels)
                    }, function (res) {
                        _this.addLoading = false;
                        if (res.code === 0) {
                            _this.isBindingSels = [];
                            _this.noBindingQuery();
                            _this.isBindingQuery();
                            _this.$message({
                                showClose: true,
                                message: '解绑成功',
                                type: 'success'
                            });
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
            gobundling() {
                let _this = this;
                _this.addLoading = true;
                if (_this.noBindingSels.length < 1) {
                    _this.showMsg('最少勾选一条需要绑定的数据');
                } else {
                    for (let i = 0; i < _this.noBindingSels.length; i++) {
                        _this.noBindingSels[i].deliveryCode = _this.addForm.deliveryCode;
                    }
                    util.publicpost('/delivery/material/ext/insert/batch', {
                        jsonStr: JSON.stringify(_this.noBindingSels)
                    }, function (res) {
                        _this.addLoading = false;
                        if (res.code === 0) {
                            _this.noBindingSels = [];
                            _this.noBindingQuery();
                            _this.isBindingQuery();
                            _this.$message({
                                showClose: true,
                                message: '绑定成功',
                                type: 'success'
                            });
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
            boundRelation() {
                let _this = this;
                _this.addLoading = true;
                let saleChannelCode = this.formatSaleChannelCode(_this.relationForm.saleChannel);
                util.publicpost('/deliveryExtBound/addDeliveryApiDTOList', {
                    shortName: _this.relationForm.shortName,
                    storageCenterCode: _this.relationForm.storageCenterCode,
                    shipperCode: _this.relationForm.shipperCode,
                    validityPeriodRequirement: _this.relationForm.validityPeriodRequirement,
                    saleChannel: _this.relationForm.saleChannel,
                    line: _this.relationForm.line,
                    deliveryCode: _this.relationForm.deliveryCode
                }, function (res) {
                    if (res.code === 0) {
                        _this.addLoading = false;
                        _this.$message({
                            showClose: true,
                            message: '绑定成功',
                            type: 'info'
                        });
                    } else {
                        _this.addLoading = false;
                        _this.$message({
                            showClose: true,
                            message: '绑定失败',
                            type: 'error'
                        });
                    }
                });
            },
            // 检索查询
            queryList() {
                this.pager.page = 1;
                this.selectList();
            },
            // 获取列表
            selectList() {
                if ((util.isEmpty(this.query.storageCenterCode) || util.isEmpty(this.query.shipperCode))) {
                    this.errorMsg('仓储中心和货主不能为空');
                    return;
                }
                let _this = this;
                this.exportBtnDisabled = false;
                _this.visible.listLoading = true;
                _this.currentList = [];
                console.log('sourceSystem:' + _this.query.sourceSystem);
                let sourceSystemCode = this.formatSourceSystemCode(_this.query.sourceSystem);
                util.publicpost('/deliveryExtBound/queryListPage', {
                    storageCenterCode: _this.query.storageCenterCode,
                    shipperCode: _this.query.shipperCode,
                    deliveryCode: _this.query.deliveryCode,
                    deliveryName: _this.query.deliveryName,
                    sourceSystem: sourceSystemCode,
                    page: _this.pager.page,
                    rows: _this.pager.rows
                }, function (res) {
                    if (res.code === 0) {
                        _this.init = '';
                        _this.visible.listLoading = false;
                        _this.pager.total = res.pager.totalCount || 0;
                        _this.currentList = res.result;
                    } else {
                        _this.visible.listLoading = false;
                        // BUG6608，查询不到数据，不需要提示
                        // _this.errorMsg(res.msg);
                    }
                });
            },
            // 显示操作界面
            handleEdit: function (row) {
                let _this = this;
                _this.visible.listLoading = true;
                _this.bindingList = [], // 已绑定
                _this.noBindingList = [], // 未绑定
                _this.addForm.deliveryCode = row.deliveryCode;
                _this.addForm.deliveryName = row.deliveryName;
                _this.addForm.sapCode = row.sapCode;
                _this.addForm.socialCreditCode = row.socialCreditCode;
                _this.addForm.legalPerson = row.legalPerson;
                _this.addForm.operatingPeriod = row.operatingPeriod;
                _this.addForm.countryName = row.countryName;
                _this.addForm.provinceName = row.provinceName;
                _this.addForm.prefectureCityName = row.prefectureCityName;
                _this.addForm.countryCityName = row.countryCityName;
                _this.addForm.streetName = row.streetName;
                _this.addForm.address = row.address;
                _this.addForm.zipCode = row.zipCode;
                _this.addForm.contact = row.contact;
                _this.addForm.phone = row.phone;
                _this.addForm.businessScope = row.businessScope;
                _this.relationForm.shortName = row.shortName;
                _this.relationForm.storageCenterCode = _this.query.storageCenterCode;
                _this.relationForm.shipperCode = _this.query.shipperCode;
                _this.relationForm.deliveryCode = row.deliveryCode;
                _this.relationForm.validityPeriodRequirement = row.validityPeriodRequirement;
                _this.relationForm.validityPeriodRequirementStr = row.validityPeriodRequirementStr;
                _this.relationForm.saleChannel = row.saleChannel;
                _this.relationForm.line = row.line;
                this.isBindingQuery();
                this.noBindingQuery();
                _this.visible.activeName = 'first';
                _this.addFormVisible = true;
                _this.visible.listLoading = false;
            },
            getFactoryLogistics() {
                let _this = this;
                util.publicpost('/material/bind/getFactoryLogistics', {}, function (res) {
                    if (res.success) {
                        _this.searchFactoryDcList = res.data;
                    } else {
                        _this.searchFactoryDcList = [];
                    }
                });
            },
            getChange() {
                this.currentList = [];
                this.pager.page = 1;
            },
            getShipper() {
                let _this = this;
                this.getChange();
                _this.query.shipperCode = '';
                _this.searchShipperList = [];
                util.publicpost('/material/bind/getShipper', {
                    storageCenterCode: _this.query.storageCenterCode
                }, function (res) {
                    if (res.success) {
                        _this.searchShipperList = res.data;
                    }
                });
            },
            initEnumVal() {
                let _this = this;
                util.publicpost('/deliveryExtBound/init', {}, function (res) {
                    if (res.success) {
                        _this.dict = res.enumVal;
                    }
                });
            },

            // 修改时间转换
            formatCreateTime(row, column) {
                return row.createTime ? util.formatDate.format(new Date(row.createTime), 'yyyy-MM-dd hh:mm:ss') : '';
            },
            // 来源系统转换
            formatSourceSystem(row, column) {
                var key = row.sourceSystem;
                var json = this.dict.sourceSystem;
                for (let i = 0; i < json.length; i++) {
                    let code = json[i].code;
                    if (key === code) {
                        return json[i].des;
                    }
                }
            },
            // 获取来源系统编码
            formatSourceSystemCode(obj) {
                var json = this.dict.sourceSystem;
                for (let i = 0; i < json.length; i++) {
                    let name = json[i].name;
                    if (obj === name) {
                        return json[i].code;
                    }
                }
            },
            // 获取销售渠道编码
            formatSaleChannelCode(obj) {
                var json = this.dict.saleChannel;
                for (let i = 0; i < json.length; i++) {
                    let name = json[i].name;
                    if (obj === name) {
                        return json[i].code;
                    }
                }
            },
            formatOperatingPeriod(row, column) {
                return row.operatingPeriod
                    ? util.formatDate.format(
                        new Date(row.operatingPeriod),
                        'yyyy年MM月dd日'
                    )
                    : '';
            },
            // 取消
            off: function (addFormRules) {
                if (addFormRules) {
                    if (this.$refs[addFormRules]) {
                        this.$refs[addFormRules].resetFields();
                    }
                }
                this.addFormVisible = false;
                this.selectList();
            }
        },
        computed: {
            toggleDrop() {
                return this.showSearch ? 'el-icon-arrow-up' : 'el-icon-arrow-down';
            },
            con() {
                console.log(1);
            }
        },
        mounted() {
            //    this.getButtonList();
            window.vue = this;
            this.initEnumVal();
            this.getFactoryLogistics();
        }
    };
</script>
<!--
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
        width: 100%;
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

    .deliveryInfoHeight .el-tabs__header{
      margin-top: 0px;
    }

    .deliveryInfoHeight .el-tabs__content .el-table__header {
      width: 100%;
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
</style> -->
