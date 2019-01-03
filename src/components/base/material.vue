// 物料信息
<template>
    <div class="admin">数据不唯一
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
                                <el-form-item :label="$t('materialThead.materialName') + '：'">
                                    <el-input v-model="query.name" :placeholder="$t('common.pleaseEnter') + $t('materialThead.materialName')"
                                              :maxlength='100'></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item :label="$t('materialThead.materialCode') + '：'">
                                    <el-input v-model="query.code" :placeholder="$t('common.pleaseEnter') + $t('materialThead.materialCode')" :maxlength='20'></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item :label="$t('materialThead.type') + '：'">
                                    <el-select v-model="query.type" :placeholder="$t('common.pleaseChoose')">
                                        <el-option v-for="item in this.dict.materialType" :key="item.name"
                                                   :label="item.des" :value="item.name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item :label="$t('commonThead.barCode') + '：'">
                                    <el-input v-model="query.barCode" style="height: 30px;" :placeholder="$t('common.pleaseEnter') + $t('commonThead.barCode')"
                                              :maxlength='20'></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="footer-but tar pad_r pad_t">
                            <el-button type="primary" @click="selectList">{{ $t('button.query') }}</el-button>
                            <el-button @click="resetForm()">{{ $t('button.reset') }}</el-button>
                        </div>
                    </el-form>
                </div>
            </div>
        </el-collapse-transition>

        <!--新增、删除-->
        <div class="add_move def-but">
            <el-button @click="handleAdd" v-if="permissions('base_materiel_add')">{{ $t('button.add') }}</el-button>
            <!-- <el-button @click="centerDialogVisible = true">{{ $t('button.importExcel') }}</el-button>
            <el-button @click="download">{{ $t('button.exportExcel') }}</el-button> -->
        </div>

        <!-- 列表 -->
        <div class="list_mater list_operation">
            <el-table highlight-current-row stripe :data="currentList" v-loading="visible.listLoading" @selection-change="handleSelection"
                      style="width: 100%;" :fit="true" border align="center">
                <!-- <el-table-column width="55" align="center" type="selection"></el-table-column> -->
                <el-table-column :label="$t('commonThead.index')" align="center" type="index" width="50"></el-table-column>
                <el-table-column align="center" :label="$t('materialThead.materialName')" prop="materialName"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column align="center" :label="$t('materialThead.materialCode')" prop="materialCode" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="hand" v-if="permissions('base_materiel_detail')" @click="handleView(scope.row)">{{scope.row.materialCode}}</div>
                        <div class="hand" v-else>{{scope.row.materialCode}}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('materialThead.materialGroupName')" prop="materialGroupName" show-overflow-tooltip></el-table-column>
                <el-table-column align="center" :label="$t('materialThead.importationStatus')" prop="importationStatus"
                                 :formatter="formatterImportationStatus" show-overflow-tooltip></el-table-column>
                <el-table-column align="center" :label="$t('commonThead.barCode')" prop="barCode" show-overflow-tooltip></el-table-column>
                <el-table-column align="center" :label="$t('materialThead.type')" prop="type" :formatter="formatterType"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column align="center" :label="$t('commonThead.status')" prop="status" :formatter="formatterStatus"
                                 show-overflow-tooltip></el-table-column>
                <!-- <el-table-column width="120" align="center" label="创建人" prop="creater" show-overflow-tooltip></el-table-column>
                <el-table-column width="170" align="center" label="创建时间" prop="createTime" :formatter="formatterCreateTime" show-overflow-tooltip></el-table-column> -->
                <el-table-column width="120" align="center" :label="$t('commonThead.updater')" prop="updater"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column width="170" align="center" :label="$t('commonThead.updateTime')" prop="updateTime"
                                 :formatter="formatterUpdateTime" show-overflow-tooltip></el-table-column>
                <el-table-column fixed="right" :label="$t('commonThead.operation')" align="center" width="170">
                    <template slot-scope="scope">
                        <el-tooltip content="修改" placement="top" effect="light"  v-if="permissions('base_materiel_update')">
                            <div @click="handleMod(scope.row)" class="operation_icon icon1"></div>
                        </el-tooltip>
                        <div @click="toEnable(scope.row)" v-if="scope.row.status === 'INEFFECTIVENESS'">
                            <el-tooltip content="启用" placement="top" effect="light" v-if="permissions('base_materiel_enable')">
                                <div class="operation_icon icon2"></div>
                            </el-tooltip>
                        </div>
                        <div @click="toDisable(scope.row)" v-if="scope.row.status === 'AVAILABILITY'">
                            <el-tooltip content="禁用" placement="top" effect="light" v-if="permissions('base_materiel_disable')">
                                <div class="operation_icon icon3"></div>
                            </el-tooltip>
                        </div>
                        <el-tooltip content="删除" placement="top" effect="light" v-if="permissions('base_materiel_delete')">
                            <div @click="handleDel(scope.row)" class="operation_icon icon4"></div>
                        </el-tooltip>

                        <!-- <el-button @click="handleMod(scope.row)" >{{ $t('button.update') }}</el-button>
                        <el-button @click="handleView(scope.row)">{{ $t('button.view') }}</el-button>
                        <el-button @click="toEnable(scope.row)">{{ $t('button.enable') }}</el-button>
                        <el-button @click="toDisable(scope.row)">{{ $t('button.disable') }}</el-button>
                        <el-button @click="handleDel(scope.row)">{{ $t('button.delete') }}</el-button> -->
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
        <el-dialog :visible.sync="visible.editForm" class="wl-new user-dialog material-dialog" :close-on-click-modal="false"
                   @close='closeDialog("editForm")'>
            <div class="form">
                <el-tabs v-model="visible.activeName" @tab-click="handleTabs">
                    <el-tab-pane label="物料信息" name="first">
                        <el-form size="mini" :model="editForm" :rules="FormRules" ref="editForm" label-width="100px"
                                 class="demo-ruleForm">
                            <el-row>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="物料名称：" prop="materialName">
                                            <el-tooltip content="最多输入50个字符" placement="right" effect="light"
                                                        :disabled="disabled">
                                                <el-input :readonly="visible.onlyRead"
                                                          v-model.trim="editForm.materialName"
                                                          :maxlength='50'></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="物料编码：" prop="materialCode">
                                            <el-tooltip content="最多输入10个字符" placement="right" effect="light">
                                                <el-input :readonly="visible.onlyRead"
                                                          :disabled="disabledTo"
                                                          v-model.trim="editForm.materialCode"
                                                          :maxlength='10'></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="69编码：" prop="barCode">
                                            <el-tooltip content="最多输入10个字符" placement="right" effect="light"
                                                        :disabled="disabled">
                                                <el-input :readonly="visible.onlyRead" v-model.trim="editForm.barCode"
                                                          :maxlength='10'></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="是否进口：" prop="importationStatus">
                                            <el-select :disabled="visible.selDisable"
                                                       v-model="editForm.importationStatus" placeholder="请选择">
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
                                        <el-form-item label="净重：" prop="netWeight">
                                            <el-tooltip content="最多输入10个字符" placement="right" effect="light"
                                                        :disabled="disabled">
                                                <el-input :readonly="visible.onlyRead" v-model="editForm.netWeight"
                                                          :maxlength='10'></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="净重单位：" prop="netWeightUnit">
                                            <el-select :disabled="visible.selDisable" v-model="editForm.netWeightUnit"
                                                       placeholder="请选择">
                                                <el-option v-for="item in unitDict.weightUnit" :key="item.id"
                                                           :label="item.name" :value="item.id"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="毛重：" prop="grossWeight">
                                            <el-tooltip content="最多输入10个字符" placement="right" effect="light"
                                                        :disabled="disabled">
                                                <el-input :readonly="visible.onlyRead" v-model="editForm.grossWeight"
                                                          :maxlength='10'></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="毛重单位：" prop="grossWeightUnit">
                                            <el-select :disabled="visible.selDisable" v-model="editForm.grossWeightUnit"
                                                       placeholder="请选择">
                                                <el-option v-for="item in unitDict.weightUnit" :key="item.id"
                                                           :label="item.name" :value="item.id"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="体积：" prop="volume">
                                            <el-tooltip content="最多输入10个字符" placement="right" effect="light"
                                                        :disabled="disabled">
                                                <el-input :readonly="visible.onlyRead" v-model="editForm.volume"
                                                          :maxlength='10'></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="体积单位：" prop="volumeUnit">
                                            <el-select :disabled="visible.selDisable" v-model="editForm.volumeUnit"
                                                       placeholder="请选择">
                                                <el-option v-for="item in unitDict.volumeUnit" :key="item.id"
                                                           :label="item.name" :value="item.id"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="高度：" prop="length">
                                            <el-tooltip content="最多输入10个字符" placement="right" effect="light"
                                                        :disabled="disabled">
                                                <el-input :readonly="visible.onlyRead" v-model="editForm.length"
                                                          :maxlength='10'></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="高度单位：" prop="lengthUnit">
                                            <el-select :disabled="visible.selDisable" v-model="editForm.lengthUnit"
                                                       placeholder="请选择">
                                                <el-option v-for="item in unitDict.lengthUnit" :key="item.id"
                                                           :label="item.name" :value="item.id"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row style="height: 30px">
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="宽度：" prop="breadth">
                                            <el-tooltip content="最多输入10个字符" placement="right" effect="light"
                                                        :disabled="disabled">
                                                <el-input :readonly="visible.onlyRead" v-model="editForm.breadth"
                                                          :maxlength='10'></el-input>
                                            </el-tooltip>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="宽度单位：" prop="breadthUnit">
                                            <el-select :disabled="visible.selDisable" v-model="editForm.breadthUnit"
                                                       placeholder="请选择">
                                                <el-option v-for="item in unitDict.lengthUnit" :key="item.id"
                                                           :label="item.name" :value="item.id"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="物料类型：" prop="type">
                                            <el-select :disabled="visible.selDisable" v-model="editForm.type"
                                                       placeholder="请选择">
                                                <el-option v-for="item in dict.materialType" :key="item.name"
                                                           :label="item.des" :value="item.name"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-form>
                    </el-tab-pane>

                    <el-tab-pane label="货主信息" name="second">
                        <div class="list ownerInfo">
                            <el-table height="220" @cell-dblclick="handleDbl" :data="shipperRelationList"
                                      v-loading="visible.shipperListLoading" style="width: 100%;line-height: 0;"
                                      :fit="true" align="center">
                                    <el-table-column width="240" label="货主名称" prop="shipper.shipperName" align="center"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column width="150" label="工厂/物流中心" prop="factoryDcDTO.name"
                                                 align="center" show-overflow-tooltip
                                                 class="logisticsCenter"></el-table-column>
                                <el-table-column width="150" label="参考价格" prop="referencePrice" align="center"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column width="150" label="基本单位" prop="baseUnit" align="center"
                                                 :formatter="formatterBaseUnit" show-overflow-tooltip></el-table-column>
                                <el-table-column width="100" label="最小单位" prop="minUnit" align="center"
                                                 :formatter="formatterMinUnit" show-overflow-tooltip></el-table-column>
                                <el-table-column width="100" prop="note" label="操作" align="center"
                                                 show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <el-button :disabled="visible.selDisableT"  size="small"
                                                   @click.native.prevent="deleteShipper(scope.row)">{{ $t('button.delete') }}
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-form class="cargoInfo" size="mini" :model="editShipperForm" ref="editShipperForm"
                                     :rules="shipperFormRules" label-width="140px" style="margin-top:20px;">

                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="货主：" prop="shipperId">
                                            <el-select :disabled="visible.selDisableT"
                                            v-model="editShipperForm.shipperId" filterable remote
                                            reserve-keyword placeholder="请输入关键词"
                                            :remote-method="searchShipper"
                                            :loading="visible.searchShipper">
                                                <el-option v-for="item in searchShipperList" :key="item.id"
                                                :label="item.shipperName" :value="item.id"></el-option>
                                                </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="工厂/物流中心：" prop="fctoryLogisticsId">
                                            <el-select :disabled="visible.selDisableT"
                                                       v-model="editShipperForm.fctoryLogisticsId" filterable remote
                                                       reserve-keyword placeholder="请输入关键词"
                                                       :remote-method="searchFactoryDc"
                                                       :loading="visible.searchFactoryDc">
                                                <el-option v-for="item in searchFactoryDcList" :key="item.id"
                                                           :label="item.name" :value="item.id"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>

                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="超期合格品：" prop="beyondDate">
                                            <el-input :maxlength="5" :readonly="visible.onlyReadT"
                                                      v-model.number="editShipperForm.beyondDate">
                                                <template slot="suffix">天</template>
                                            </el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="出库方式：" prop="outboundWay">
                                            <el-select :disabled="visible.selDisableT"
                                                       v-model="editShipperForm.outboundWay" placeholder="请选择">
                                                <el-option v-for="item in dict.outboundWay" :key="item.name"
                                                           :label="item.des" :value="item.name"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>

                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="批次属性：" prop="batchAttribute">
                                            <el-select :disabled="visible.selDisableT"
                                                       v-model="editShipperForm.batchAttribute" placeholder="请选择">
                                                <el-option v-for="item in dict.batchAttribute" :key="item.name"
                                                           :label="item.des" :value="item.name"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="熟化期：" prop="maturationPeriod">
                                            <el-input :maxlength="5" :readonly="visible.onlyReadT" v-model.number="editShipperForm.maturationPeriod">
                                                <template slot="suffix">天</template>
                                            </el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="预警阈值：" prop="warningValue">
                                            <el-input :maxlength="10" :readonly="visible.onlyReadT"
                                                      v-model="editShipperForm.warningValue"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="商品描述：" prop="merchandiseDes">
                                            <el-input :maxlength="100" :readonly="visible.onlyReadT"
                                                      v-model="editShipperForm.merchandiseDes"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>

                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="参考价格：" prop="referencePrice">
                                            <el-input :maxlength="10" :readonly="visible.onlyReadT"
                                                      v-model.number="editShipperForm.referencePrice"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="基本单位：" prop="baseUnit">
                                            <el-select :disabled="visible.selDisableT"
                                                       v-model="editShipperForm.baseUnit" placeholder="请选择">
                                                <el-option v-for="item in unitDict.mergeUnit" :key="item.id"
                                                           :label="item.name" :value="item.id"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>

                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="最小单位：" prop="minUnit">
                                            <el-select :disabled="visible.selDisableT"
                                                       v-model="editShipperForm.minUnit" placeholder="请选择">
                                                <el-option v-for="item in unitDict.mergeUnit" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="单价类型：" prop="priceType">
                                            <el-select :disabled="visible.selDisableT"
                                                       v-model="editShipperForm.priceType" placeholder="请选择">
                                                <el-option v-for="item in dict.priceType" :key="item.name"
                                                           :label="item.des" :value="item.name"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="包装规格：" prop="specification">
                                            <el-input :maxlength="10" :readonly="visible.onlyReadT"
                                                      v-model="editShipperForm.specification"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>

                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="保质期：" prop="shelfLife">
                                            <el-input :maxlength="5" :readonly="visible.onlyReadT"
                                                      v-model.number="editShipperForm.shelfLife">
                                                <template slot="suffix">天</template>
                                            </el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="客户的商品名称：" prop="merchandiseName">
                                            <el-input :maxlength="50" :readonly="visible.onlyReadT"
                                                      v-model="editShipperForm.merchandiseName"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>

                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-form-item label="客户的商品码：" prop="merchandiseCode">
                                            <el-input :maxlength="10" :readonly="visible.onlyReadT"
                                                      v-model="editShipperForm.merchandiseCode"></el-input>
                                        </el-form-item>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content">
                                        <el-button @click="saveShipper"
                                                   :disabled="visible.selDisableT">{{ $t('button.save') }}
                                        </el-button>
                                        <el-button @click.native="cancelShipper" :disabled="visible.selDisableT">
                                            {{ $t('button.reset') }}
                                        </el-button>
                                    </div>
                                </el-col>
                            </el-form>
                        </div>
                    </el-tab-pane>

                    <el-tab-pane label="物料组" name="third">
                        <div class="list">
                            <el-table height="220" :data="groupRelationList" v-loading="visible.groupListLoading"
                                      style="width: 100%;line-height: 0;" :fit="true" align="center">
                                <el-table-column width="220" label="物料组编码" prop="materialGroup.code" align="center"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column width="220" label="物料组名称" prop="materialGroup.name" align="center"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column width="220" label="来源系统" prop="materialGroup.systemType" align="center"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column width="220" prop="note" label="操作" align="center"
                                                 show-overflow-tooltip>
                                    <template slot-scope="scope">
                                        <el-button :disabled="visible.selDisableT"  size="small"
                                                   @click.native.prevent="deleteGroup(scope.row)">{{ $t('button.delete') }}
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-form size="mini" :model="editGroupForm" label-width="100px" style="margin-top:20px;">
                                <el-row>
                                    <el-col :span="12">
                                        <div class="grid-content">
                                            <el-form-item label="来源系统：" prop="">
                                                <el-select :disabled="visible.selDisableT" @change="loadGroupList"
                                                           v-model="editGroupForm.sourceSystem" placeholder="请选择">
                                                    <el-option v-for="item in dict.sourceSystem" :key="item.name"
                                                               :label="item.des" :value="item.name"></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="grid-content">
                                            <el-form-item label="物料组：">
                                                <el-select :disabled="visible.selDisableT"
                                                           v-model="editGroupForm.groupId" placeholder="请选择">
                                                    <el-option v-for="item in materialGroupList" :key="item.id"
                                                               :label="item.name" :value="item.id"></el-option>
                                                </el-select>
                                            </el-form-item>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div class="grid-content">
                                            <el-button @click.native="saveGroup" :disabled="visible.selDisableT">{{
                                                $t('button.save') }}
                                            </el-button>
                                            <el-button @click.native="cancelGroup" :disabled="visible.selDisableT">{{ $t('button.reset') }}
                                            </el-button>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </div>
                    </el-tab-pane>

                </el-tabs>
            </div>
            <div slot="footer" class="dialog-footer-but" v-if="visible.closeForm">
                <el-button @click="close('editShipperForm')">{{ $t('button.cancel') }}</el-button>
            </div>
            <div slot="footer" class="dialog-footer-but" v-else>
                <el-button @click="submitForm('editForm')">{{ $t('button.save') }}</el-button>
                <el-button @click="close('editForm')">{{ $t('button.cancel') }}</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import util from '../../common/js/util';

    export default {
        data() {
            return {
                // 查询字段
                query: {
                    name: '',
                    code: '',
                    type: '',
                    barCode: ''
                },
                disabled: false,
                disabledTo: false,
                currentList: [], // 物料列表
                shipperRelationList: [], // 与货主关系列表
                groupRelationList: [], // 与物料组关系列表
                materialGroupList: [], // 可选物料组列表
                searchShipperList: [], // 检索货主列表
                searchFactoryDcList: [], // 检索工厂列表
                currentRow: {}, // 当前编辑行
                // 分页
                pager: {
                    page: 1,
                    rows: 10,
                    total: 0
                },
                sel: {
                    material: []
                },
                // 编辑物料界面数据
                editForm: {
                    materialCode: '',
                    materialName: '',
                    importationStatus: '',
                    barCode: '',
                    type: '',
                    netWeight: '',
                    netWeightUnit: '',
                    grossWeight: '',
                    grossWeightUnit: '',
                    volume: '',
                    volumeUnit: '',
                    length: '',
                    lengthUnit: '',
                    breadth: '',
                    breadthUnit: '',
                    version: ''
                },
                // 编辑与货主关系
                editShipperForm: {
                    id: '',
                    shipperId: '',
                    fctoryLogisticsId: '',
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
                    merchandiseCode: '',
                    version: '',
                    priceType: ''
                },
                editGroupForm: {
                    sourceSystem: '',
                    groupId: ''
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
                    isView: false
                },
                dict: '',
                unitDict: '',
                centerDialogVisible: false,
                fileList: [
                    {
                        name: 'oms数据库',
                        url:
                            'https://zhx198600.github.io/myvue/oms%E6%95%B0%E6%8D%AE%E5%BA%93'
                    }
                ],
                // 查询框折叠展开
                showSearch: true,
                trigger: 'blur',
                FormRules: {
                    materialName: [
                        {required: true, message: '请输入物料名称', trigger: this.trigger}
                        // {required: true, message: '', trigger: this.trigger, validator: this.stripscript}
                    ],
                    materialCode: [
                        {required: true, message: '请输入物料编码', trigger: this.trigger},
                        {required: true, message: '', trigger: this.trigger, validator: this.validCode}
                    ],
                    barCode: [
                        {required: true, message: '请输入69编码', trigger: this.trigger},
                        {required: true, message: '', trigger: this.trigger, validator: this.validCode}
                    ],
                    importationStatus: [
                        {required: true, message: '请选择是否进口', trigger: 'change'}
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
                    grossWeight: [
                        {required: true, message: '请填写毛重数量'},
                        {required: true, message: '', trigger: 'blur', validator: this.mandatoryVerifyFigure}
                    ],
                    grossWeightUnit: [
                        {required: true, message: '请选择毛重单位', trigger: 'change'}
                    ],
                    volume: [
                        {required: true, message: '请填写体积数量'},
                        {required: true, message: '', trigger: 'blur', validator: this.mandatoryVerifyFigure}
                    ],
                    volumeUnit: [
                        {required: true, message: '请选择体积单位', trigger: 'change'}
                    ],
                    length: [
                        {required: true, message: '请填写高度数量'},
                        {required: true, message: '', trigger: 'blur', validator: this.mandatoryVerifyFigure}
                    ],
                    lengthUnit: [
                        {required: true, message: '请选择高度单位', trigger: 'change'}
                    ],
                    breadth: [
                        {required: true, message: '请填写宽度数量'},
                        {required: true, message: '', trigger: 'blur', validator: this.mandatoryVerifyFigure}
                    ],
                    breadthUnit: [
                        {required: true, message: '请选择宽度单位', trigger: 'change'}
                    ]
                },
                // 货主信息输入信息校验
                shipperFormRules: {
                    fctoryLogisticsId: [
                        {required: true, message: '请输入工厂/物流中心', trigger: 'change'}
                    ],
                    beyondDate: [
                        {required: true, message: '请输入超期合格品', trigger: 'blur'},
                        {type: 'number', message: '请输入数字'}
                    ],
                    outboundWay: [
                        {required: true, message: '请选择出库方式', trigger: 'change'}
                    ],
                    batchAttribute: [
                        {required: true, message: '请选择批次属性', trigger: 'change'}
                    ],
                    referencePrice: [
                        {required: false, validator: this.verifyFigure, trigger: 'blur'}
                    ],
                    maturationPeriod: [
                        {required: false, validator: this.verifyFigure, trigger: 'blur'}
                    ],
                    specification: [
                        {required: false, validator: this.verifyFigure, trigger: 'change'}
                    ],
                    shelfLife: [
                        {required: false, validator: this.verifyFigure, trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            validCode(rule, value, callback) {
                util.validCode(rule, value, callback);
            },
            stripscript(rule, value, callback) {
                util.stripscript(rule, value, callback);
            },
            // 验证只能输入数字 非必填
            verifyFigure(rule, value, callback) {
                util.verifyFigureTo(rule, value, callback);
            },
            // 验证只能输入数字 必填
            mandatoryVerifyFigure(rule, value, callback) {
                util.verifyFigure(rule, value, callback);
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
            resetForm() {
                this.query.name = '';
                this.query.code = '';
                this.query.type = '';
                this.query.barCode = '';
            },
            // 检索查询
            queryList() {
                this.pager.page = 1;
                this.selectList();
            },
            // 关闭框
            closeDialog(formName) {
                this.close(formName);
            },
            close(formName) {
                console.log(formName);
                this.visible.editForm = false;
                this.visible.isView = false;
                this.editForm = {
                    materialCode: '',
                    materialName: '',
                    importationStatus: '',
                    barCode: '',
                    type: '',
                    netWeight: '',
                    netWeightUnit: '',
                    grossWeight: '',
                    grossWeightUnit: '',
                    volume: '',
                    volumeUnit: '',
                    length: '',
                    lengthUnit: '',
                    breadth: '',
                    breadthUnit: '',
                    version: ''
                };
                this.disabled = false;
                // this.currentRow = null;
                this.disabledTo = false;
                // this.selectList();
                this.$refs[formName].clearValidate();
            },
            // 获取物料列表
            selectList(type) {
                let _this = this;
                // 判断是否是修改如果是修改加载列表不展示遮罩层
                if (!type) {
                    _this.visible.listLoading = true;
                }
                _this.currentList = [];
                util.publicpost(
                    '/material/list',
                    {
                        materialName: _this.query.name,
                        materialCode: _this.query.code,
                        type: _this.query.type,
                        barCode: _this.query.barCode,
                        page: _this.pager.page,
                        rows: _this.pager.rows
                    },
                    function (res) {
                        if (res.code === 0) {
                            _this.visible.listLoading = false;
                            _this.pager.total = res.pager.totalCount || 0;
                            _this.currentList = res.result;
                        } else {
                            _this.visible.listLoading = false;
                            _this.errorMsg('服务器繁忙！');
                        }
                        _this.dict = res.enumVal;
                    }
                );
            },
            // 勾选
            handleSelection(val) {
                this.sel.material = val;
            },
            // 切换tabs
            handleTabs() {
                // 查看状态下拦截
                if (this.visible.isView) {
                    return;
                }
                if (this.visible.activeName === 'first') {
                    this.visible.closeForm = false;
                    return;
                }
                this.visible.closeForm = true;
                if (this.currentRow && this.currentRow.id) {
                    // 修改
                    this.visible.onlyReadT = false;
                    this.visible.selDisableT = false;
                } else {
                    // 新增
                    this.showMsg('请先保存物料信息');
                    this.visible.onlyReadT = true;
                    this.visible.selDisableT = true;
                }
            },
            // 显示新增界面
            handleAdd: function () {
                // 清空字段
                this.editForm = {
                    materialCode: '',
                    materialName: '',
                    importationStatus: '',
                    barCode: '',
                    type: '',
                    netWeight: '',
                    netWeightUnit: '',
                    grossWeight: '',
                    grossWeightUnit: '',
                    volume: '',
                    volumeUnit: '',
                    length: '',
                    lengthUnit: '',
                    breadth: '',
                    breadthUnit: '',
                    version: ''
                };
                // 清空正在编辑行
                // this.currentRow = null;
                this.disabledTo = false;
                // 清除关系列表
                this.shipperRelationList = [];
                this.groupRelationList = [];
                // 页面控制
                this.visible.activeName = 'first';
                this.visible.onlyRead = false;
                this.visible.selDisable = false;
                this.visible.onlyReadT = false;
                this.visible.selDisableT = false;
                this.visible.closeForm = false;
                this.visible.editForm = true;
            },
            // 查看
            handleView(row) {
                let _this = this;
                _this.disabled = true;
                // if (_this.sel.material.length === 0) {
                //   _this.showMsg('请先勾选一条数据');
                // } else if (_this.sel.material.length > 1) {
                //   _this.showMsg('最多勾选一条数据');
                // } else {
                // 获取当前数据
                _this.currentRow = row;
                _this.editForm = {
                    id: row.id,
                    materialCode: row.materialCode,
                    materialName: row.materialName,
                    importationStatus: row.importationStatus,
                    barCode: row.barCode,
                    type: row.type,
                    netWeight: row.netWeight,
                    netWeightUnit: row.netWeightUnit,
                    grossWeight: row.grossWeight,
                    grossWeightUnit: row.grossWeightUnit,
                    volume: row.volume,
                    volumeUnit: row.volumeUnit,
                    length: row.length,
                    lengthUnit: row.lengthUnit,
                    breadth: row.breadth,
                    breadthUnit: row.breadthUnit,
                    version: row.version
                };
                // 加载与物料组关系
                _this.loadGroupRelation();
                // 加载与工厂、物流中心关系
                _this.loadShipperRelation();
                _this.visible.activeName = 'first';
                _this.visible.onlyRead = true;
                _this.visible.selDisable = true;
                _this.visible.onlyReadT = true;
                _this.visible.selDisableT = true;
                _this.visible.closeForm = true;
                _this.visible.isView = true;
                _this.visible.editForm = true;
                _this.cancelShipper();
                _this.cancelGroup();
                // }
            },
            // 修改
            handleMod(row) {
                let _this = this;
                console.log(row);
                _this.disabledTo = true;
                _this.currentRow = row;
                _this.editForm = {
                    id: row.id,
                    materialCode: row.materialCode,
                    materialName: row.materialName,
                    importationStatus: row.importationStatus,
                    barCode: row.barCode,
                    type: row.type,
                    netWeight: row.netWeight,
                    netWeightUnit: row.netWeightUnit,
                    grossWeight: row.grossWeight,
                    grossWeightUnit: row.grossWeightUnit,
                    volume: row.volume,
                    volumeUnit: row.volumeUnit,
                    length: row.length,
                    lengthUnit: row.lengthUnit,
                    breadth: row.breadth,
                    breadthUnit: row.breadthUnit,
                    version: row.version
                };
                // 加载与物料组关系
                this.loadGroupRelation();
                // 加载与工厂、物流中心关系
                this.loadShipperRelation();
                _this.visible.activeName = 'first';
                _this.visible.onlyRead = false;
                _this.visible.selDisable = false;
                _this.visible.onlyReadT = false;
                _this.visible.selDisableT = false;
                _this.visible.closeForm = false;
                _this.visible.editForm = true;
                this.cancelShipper();
                this.cancelGroup();
            },
            // 编辑物料信息
            submitForm: function (formName) {
                let _this = this;
                let materialCode = this.editForm.materialCode;
                let materialName = this.editForm.materialName;
                let importationStatus = this.editForm.importationStatus;
                let barCode = this.editForm.barCode;
                let type = this.editForm.type;
                let netWeight = this.editForm.netWeight;
                let netWeightUnit = this.editForm.netWeightUnit;
                let grossWeight = this.editForm.grossWeight;
                let grossWeightUnit = this.editForm.grossWeightUnit;
                let volume = this.editForm.volume;
                let volumeUnit = this.editForm.volumeUnit;
                let length = this.editForm.length;
                let lengthUnit = this.editForm.lengthUnit;
                let breadth = this.editForm.breadth;
                let breadthUnit = this.editForm.breadthUnit;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (_this.currentRow && _this.currentRow.id) {
                            // 修改
                            util.publicpost(
                                '/material/update',
                                {
                                    id: _this.currentRow.id,
                                    materialCode: materialCode,
                                    materialName: materialName,
                                    importationStatus: importationStatus,
                                    barCode: barCode,
                                    type: type,
                                    netWeight: netWeight,
                                    netWeightUnit: netWeightUnit,
                                    grossWeight: grossWeight,
                                    grossWeightUnit: grossWeightUnit,
                                    volume: volume,
                                    volumeUnit: volumeUnit,
                                    length: length,
                                    lengthUnit: lengthUnit,
                                    breadth: breadth,
                                    breadthUnit: breadthUnit,
                                    version: _this.currentRow.version
                                },
                                function (res) {
                                   // if (res.success) {
                                  if(res.code === 0){

                                        _this.successMsg(_this.$t('msg.success'));
                                        _this.visible.activeName = 'second';
                                        _this.handleTabs();
                                        _this.selectList('update');
                                        _this.currentRow.version++;
                                    }else if(res.code === -1){
                                    _this.errorMsg(_this.$t(res.msg));
                                    } else {
                                        let message;
                                        if (!util.isEmpty(res.msg)) {
                                            message = _this.$t('msg.error') + ',' +_this.$t(res.msg);
                                        } else {
                                            message = _this.$t('msg.error');
                                        }
                                        _this.errorMsg(message);
                                    }
                                }
                            );
                        } else {
                            // 新增
                            util.publicpost('/material/add', {
                                materialCode: materialCode,
                                materialName: materialName,
                                importationStatus: importationStatus,
                                barCode: barCode,
                                type: type,
                                netWeight: netWeight,
                                netWeightUnit: netWeightUnit,
                                grossWeight: grossWeight,
                                grossWeightUnit: grossWeightUnit,
                                volume: volume,
                                volumeUnit: volumeUnit,
                                length: length,
                                lengthUnit: lengthUnit,
                                breadth: breadth,
                                breadthUnit: breadthUnit
                            }, function (res) {
                     //           if (res.success) {
                              if(res.code === 0){
                                _this.successMsg(_this.$t('msg.success'));
                                _this.currentRow = res.data;
                                _this.selectList('add');
                              }else if(res.code === -1){
                                _this.errorMsg(_this.$t(res.msg));
                              }else{
                                    let message;
                                    if (!util.isEmpty(res.msg)) {
                                        message = _this.$t('msg.error') + ',' +_this.$t(res.msg);
                                    } else {
                                        message = _this.$t('msg.error');
                                    }
                                    _this.errorMsg(message);
                              }

                                // } else {
                                //     let message;
                                //     if (!util.isEmpty(res.msg)) {
                                //         message = _this.$t('msg.error') + ',' + _this.$t(res.msg);
                                //     } else {
                                //         message = _this.$t('msg.error');
                                //     }
                                //     _this.errorMsg(message);
                                // }
                            });
                        }
                    } else {
                        // _this.errorMsg(_this.$t('msg.error'));
                        return false;
                    }
                });
            },
            // 删除物料
            handleDel: function (row) {
                let _this = this;
                let versions = row.version;
                // if (_this.sel.material.length === 0) {
                //   _this.showMsg('请先勾选一条数据');
                //   return;
                // }
                _this.listLoading = true;
                let ids = row.id;
                this.confirm('确认删除选中记录吗？', function () {
                    _this.visible.listLoading = true;
                    let para = {ids: ids, versions: versions};
                    util.publicpost('/material/delete', para, function (res) {
                        _this.visible.listLoading = false;
                      //  if (res.success) {
                            if (res.code === 0) {
                              _this.visible.listLoading = false;
                              _this.successMsg(_this.$t('msg.success'));
                              _this.selectList();

                            }else if(res.code === -1) {
                              _this.errorMsg(_this.$t(res.msg));
                            }else {
                              _this.visible.listLoading = false;
                              _this.errorMsg('服务器繁忙！');
                            }
                       // } else {
                       //      _this.visible.listLoading = false;
                       //      _this.errorMsg(_this.$t(res.msg));
                       // }
                    });
                });
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
                        //if (res.success) {
                            if (res.code === 0) {
                              _this.visible.listLoading = false;
                              _this.successMsg(_this.$t('msg.success'));
                              _this.selectList();
                            } else if(res.code === -1){
                              _this.errorMsg(_this.$t(res.msg));
                            } else {
                              _this.visible.listLoading = false;
                              _this.errorMsg('服务器繁忙！');
                            }
                        // } else {
                        //     _this.visible.listLoading = false;
                        //     _this.errorMsg(_this.$t(res.msg));
                        // }
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
                        //if (res.success) {
                            if (res.code === 0) {
                              _this.visible.listLoading = false;
                              _this.successMsg(_this.$t('msg.success'));
                              _this.selectList();
                            } else if(res.code === -1){
                              _this.errorMsg(_this.$t(res.msg));
                            } else {
                              _this.visible.listLoading = false;
                              _this.errorMsg('服务器繁忙！');
                            }
                        // } else {
                        //     _this.visible.listLoading = false;
                        //     _this.errorMsg(_this.$t(res.msg));
                        // }
                    }
                );
            },
            // 加载可选物料组
            loadGroupList() {
                let _this = this;
                this.editGroupForm.groupId = '';
                _this.materialGroupList = [];
                util.publicpost(
                    '/material/group/list',
                    {
                        systemType: _this.editGroupForm.sourceSystem
                    },
                    function (res) {
                        if (res.success) {
                            _this.materialGroupList = res.data;
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
            // 加载与货主、工厂/物流中心关系
            loadShipperRelation() {
                let _this = this;
                // 加载与货主、工厂/物流中心关系
                util.publicpost(
                    '/shipper/material/list',
                    {
                        materialId: _this.currentRow.id
                    },
                    function (res) {
                        if (res.success) {
                            _this.shipperRelationList = res.data;
                        } else {
                            _this.shipperRelationList = [];
                        }
                    }
                );
            },
            handleDbl(row) {
                // 将当前行置为编辑状态
                let that = this;
                // that.editShipperForm = {};
                that.searchFactoryDcList.fctoryLogisticsId = '';
                that.searchShipperList = [];
                let shipperRelationList = this.shipperRelationList.slice();
                let current = shipperRelationList.find(item => item.id === row.id);
                that.editShipperForm = {
                    id: current.id,
                    shipperId: current.shipperId,
                    fctoryLogisticsId: current.factoryLogisticsId,
                    beyondDate: current.beyondDate,
                    outboundWay: current.outboundWay,
                    batchAttribute: current.batchAttribute,
                    maturationPeriod: current.maturationPeriod,
                    warningValue: current.warningValue,
                    merchandiseDes: current.merchandiseDes,
                    referencePrice: current.referencePrice,
                    baseUnit: current.baseUnit,
                    minUnit: current.minUnit,
                    specification: current.specification,
                    shelfLife: current.shelfLife,
                    merchandiseName: current.merchandiseName,
                    merchandiseCode: current.merchandiseCode,
                    version: current.version,
                    priceType: current.priceType
                };

                if (current.factoryDcDTO.id && current.factoryDcDTO) {
                    that.searchFactoryDcList = [{
                        id: that.editShipperForm.fctoryLogisticsId,
                        name: current.factoryDcDTO.name
                    }];
                }
                if (current.shipper && current.shipper.id) {
                    that.searchShipperList = [{
                        id: that.editShipperForm.shipperId,
                        shipperName: current.shipper.shipperName
                    }];
                }
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
                let priceType = _this.editShipperForm.priceType;
                let url = '';
                if (util.isEmpty(id)) {
                    url = '/shipper/material/add';
                } else {
                    url = '/shipper/material/update';
                }
                _this.$refs.editShipperForm.validate((valid) => {
                    if (valid) {
                        _this.visible.shipperListLoading = true;
                        util.publicpost(url, {
                                id: id,
                                materialId: materialId,
                                shipperId: shipperId,
                                factoryLogisticsId: factoryLogisticsId,
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
                                version: version,
                                priceType: priceType
                            }, function (res) {
                                _this.visible.shipperListLoading = false;
                                // if (res.success) {
                                    if (res.code === 0) {
                                      _this.cancelShipper();
                                      _this.successMsg(_this.$t('msg.success'));
                                      _this.loadShipperRelation();
                                    }else if(res.code === -1){
                                      _this.errorMsg(_this.$t(res.msg));
                                    } else {
                                      _this.errorMsg('服务器繁忙！');
                                    }
                                // } else {
                                //     _this.errorMsg(_this.$t(res.msg));
                                // }
                            }
                        );
                    }
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
                    merchandiseCode: '',
                    priceType: ''
                };
                this.searchShipperList = []; // 检索货主列表
                this.searchFactoryDcList = []; // 检索工厂列表
            },
            // 删除货主
            deleteShipper(row) {
                let _this = this;
                this.confirm('确定删除？', function () {
                    _this.visible.shipperListLoading = true;
                    util.publicpost(
                        '/shipper/material/delete',
                        {
                            ids: row.id,
                            versions: row.version
                        },
                        function (res) {
                            _this.visible.shipperListLoading = false;
                            //if (res.success) {
                                if (res.code === 0) {
                                  _this.successMsg(_this.$t('msg.success'));
                                  _this.loadShipperRelation();
                                } else if(res.code === -1){
                                  _this.errorMsg(_this.$t(res.msg));
                                } else {
                                  _this.errorMsg('服务器繁忙！');
                                }
                            // } else {
                            //     _this.errorMsg(_this.$t(res.msg));
                            // }
                        }
                    );
                });
            },
            // 加载与物料组关系
            loadGroupRelation() {
                let _this = this;
                // 加载与物料组关系
                util.publicpost(
                    '/material/group/listByMaterial',
                    {
                        materialId: _this.currentRow.id
                    },
                    function (res) {
                        if (res.success) {
                            _this.groupRelationList = res.data;
                        } else {
                            _this.groupRelationList = [];
                        }
                    }
                );
            },
            // 保存物料组
            saveGroup() {
                let _this = this;
                let materialId = _this.currentRow.id;
                let sourceSystem = _this.editGroupForm.sourceSystem;
                let groupId = _this.editGroupForm.groupId;
                if (util.isEmpty(materialId)) {
                    _this.showMsg('请先保存物料信息');
                } else if (util.isEmpty(sourceSystem)) {
                    _this.showMsg('请选择来源系统');
                } else if (util.isEmpty(groupId)) {
                    _this.showMsg('请选择物料组');
                } else {
                    _this.visible.groupListLoading = true;
                    let groupName = this.materialGroupList.find(item => item.id.toString() === groupId.toString()).name;
                    util.publicpost(
                        '/material/group/relation/add',
                        {
                            materialID: materialId,
                            materialGroupIDs: groupId,
                            materialGroupName: groupName
                        },
                        function (res) {
                            _this.visible.groupListLoading = false;
                           // if (res.success) {
                                if (res.code === 0) {
                                  _this.successMsg(_this.$t('msg.success'));
                                  _this.cancelGroup();
                                  _this.loadGroupRelation();

                                }else if(res.code === -1){
                                  _this.errorMsg(_this.$t(res.msg));
                                } else {
                                  _this.errorMsg('服务器繁忙！');
                                }
                            // } else {
                            //     _this.errorMsg(_this.$t(res.msg));
                            // }
                        }
                    );
                }
            },
            // 清空物料组
            cancelGroup() {
                this.editGroupForm.sourceSystem = '';
                this.editGroupForm.groupId = '';
                this.materialGroupList = [];
            },
            // 删除物料组
            deleteGroup(row) {
                let _this = this;
                this.confirm('确定删除？', function () {
                    _this.visible.groupListLoading = true;
                    util.publicpost(
                        '/material/group/relation/deleteByRelation',
                        {
                            materialGroupId: row.materialGroupId, // 物料组ID
                            materialId: row.materialId,
                            versions: row.version
                        },
                        function (res) {
                            _this.visible.groupListLoading = false;
                            //if (res.success) {
                                if (res.code === 0) {
                                  _this.successMsg(_this.$t('msg.success'));
                                  _this.loadGroupRelation();

                                }else if(res.code === -1){
                                  _this.errorMsg(_this.$t(res.msg));
                                } else {
                                  _this.errorMsg('服务器繁忙！');
                                }
                            // } else {
                            //     _this.errorMsg(_this.$t(res.msg));
                            // }
                        }
                    );
                });
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
                            } else {
                                _this.searchShipperList = [];
                            }
                        }
                    );
                }
            },
            // 根据关键字检索货主信息
            searchFactoryDc(key) {
                if (key !== '') {
                    let _this = this;
                    _this.visible.searchFactoryDc = true;
                    util.publicpost(
                        '/factorydc/selectByName',
                        {
                            name: key
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
                }
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
                var status = row.type;
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
            }
        },
        computed: {
            toggleDrop() {
                return this.showSearch ? 'el-icon-arrow-up' : 'el-icon-arrow-down';
            }
        },
        mounted() {
            this.selectList();
            this.loadUnit();
            this.getButtonList();
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
    .material-dialog .el-dialog__body{
        padding: 30px 20px 10px !important;
        background-color: #ffffff;
    }
    .material-dialog .el-dialog__footer{
        padding: 5px 15px 20px !important;
        background-color: #ffffff;
    }
</style>
