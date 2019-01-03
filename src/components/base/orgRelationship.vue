// 组织关系管理
<template>
    <div class="admin">
        <!-- 查询模块 -->
        <div class="query-top">
            <em name="" class="fl el-icon-search"></em>
            <h6 class="fl titleInfo">{{ $t('common.searchInfo') }}</h6>
            <el-button plain class="fr" :icon="toggleDrop" @click="showSearch = !showSearch"></el-button>
        </div>
        <el-collapse-transition>
            <div v-show="showSearch">
                <div class="query-content transDrop">
                    <el-form size="mini" :inline="true" label-width="80px" :model="orgRelationshipQuery" class="demo-form-inline"
                             status-icon ref="orgRelationshipQuery">
                        <el-row :gutter="10">
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item prop="name" label="组织名称：">
                                    <el-input v-model="orgRelationshipQuery.orgName" placeholder="请输入组织名称"
                                              :maxlength="50"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item prop="name" label="仓储中心：">
                                    <el-input v-model="orgRelationshipQuery.factoryName" placeholder="请输入仓储中心"
                                              :maxlength="50"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item prop="name" label="仓库名称：">
                                    <el-input v-model="orgRelationshipQuery.warehouseName" placeholder="请输入仓库名称"
                                              :maxlength="50"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item prop="name" label="货主名称：">
                                    <el-input v-model="orgRelationshipQuery.shipperName" placeholder="请输入货主名称"
                                              :maxlength="50"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item prop="name" label="货主编码：">
                                    <el-input v-model="orgRelationshipQuery.shipperCode" placeholder="请输入货主编码"
                                              :maxlength="50"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item prop="name" label="物料名称：">
                                    <el-input v-model="orgRelationshipQuery.materialName" placeholder="请输入物料名称"
                                              :maxlength="50"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item prop="name" label="物料编码：">
                                    <el-input v-model="orgRelationshipQuery.materialCode" placeholder="请输入物料编码"
                                              :maxlength="50"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="footer-but tar pad_r pad_t">
                            <el-button type="primary" @click="selectOrgRelationshipList">{{ $t('button.query') }}</el-button>
                            <el-button @click="resetOrgRelationship">{{ $t('button.reset') }}</el-button>
                        </div>
                    </el-form>
                </div>
            </div>
        </el-collapse-transition>

        <!--新增、删除-->
        <div class="add_move def-but">
            <el-button @click="handleAdd" v-if="permissions('base_orgRelationship_add')">{{ $t('button.add') }}</el-button>
        </div>

        <!-- 列表 -->
        <div class="list_region list_operation">
            <el-table highlight-current-row stripe style="width: 100%;" :data="currentList" :fit="true" v-loading="listLoading" border align="center">
                <el-table-column type="selection" align="center" isEditing="false" width="55"></el-table-column>
                <el-table-column label="组织名称" prop="orgName" align="center" text-overflow="ellipsis"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column width="160" label="仓储中心" prop="factoryName" align="center" text-overflow="ellipsis"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column label="仓库名称" prop="warehouseName" align="center" text-overflow="ellipsis"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column label="货主编码" prop="shipperCode" align="center"></el-table-column>
                <el-table-column label="货主名称" prop="shipperName" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column label="物料编码" prop="materialCode" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column width="160" label="物料名称" prop="materialName" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column width="130" label="是否默认" prop="defaults" align="center" show-overflow-tooltip :formatter="formatterOrgStrategyDefaults"></el-table-column>
                <el-table-column width="130" label="阈值开始值" prop="thresholdStart" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column width="130" label="阈值结束值" prop="thresholdEnd" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column width="130" label="阈值优先级" prop="tsrank" align="center" show-overflow-tooltip></el-table-column>
                <!--<el-table-column width="120" label="时间优先级" prop="rank" align="center"-->
                                 <!--show-overflow-tooltip></el-table-column>-->
                <el-table-column width="120" label="修改人" prop="updater" align="center"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column width="120" label="修改时间" prop="updateTime" :formatter="formatterOrgRelationshipUpdate" align="center" text-overflow="ellipsis"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" align="center" width="120">
                    <template slot-scope="scope">
                        <el-tooltip content="修改" placement="top" effect="light" v-if="permissions('base_orgRelationship_update')">
                            <div class="operation_icon icon1" @click="updateOrgRelationship(scope.row)"></div>
                        </el-tooltip>
                        <el-tooltip content="删除" placement="top" effect="light" v-if="permissions('base_orgRelationship_delete')">
                            <div class="operation_icon icon4" @click="deleteOrgRelationship(scope.row)"></div>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 工具条 -->
            <el-col :span="24" class="toolbar">
              <em class="el-icon-refresh fr mar_lr table-refresh"></em>
              <div class="block fr">
                <el-pagination @size-change="sizeChange" @current-change="pageChange" :current-page="this.pager.page"
                               :page-sizes="[5, 10, 20, 50]" :page-size="this.pager.rows" layout="total,sizes, prev, pager, next, jumper" :total="this.pager.total"></el-pagination>
              </div>
            </el-col>
        </div>

        <!-- 新增界面 -->
        <el-dialog :visible.sync="addFormVisible" :close-on-click-modal="false"
                   class="def-but default-dialog relation-dialog orgRelatbox" ref="addForm" title="组织关系信息">
            <div class="form form-add" style="height: 300px;">
                <el-form label-width="120px" size="mini">
                    <div class="fr right-tree mar_l">
                        <el-tree
                                :data="shipperMateriaList"
                                show-checkbox
                                default-expand-all
                                node-key="fieldId"
                                @check-change="selectShipperMateriaNode"
                                ref="shipperTree"
                                :props="{value:'fieldId',label:'name',code:'code'}">
                        </el-tree>
                    </div>
                    <div class="fl left-tree">
                      <el-cascader :options="orgList" change-on-select v-model="orgRelationshipAdd.orgIds"
                                   :props="{value:'orgID',label:'orgName'}" @change="orgRelationshipAddOrg"></el-cascader>
                        <el-tree
                                :data="factoryDcList"
                                show-checkbox
                                default-expand-all
                                node-key="fieldId"
                                @check-change="selectFactoryDcNode"
                                ref="dcTree"
                                :props="{value:'fieldId',label:'name',code:'code'}">
                        </el-tree>
                    </div>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="阈值开始值：">
                                <el-input v-model="addForm.thresholdStart" :maxlength="50" placeholder="请输入阈值开始值" @change="thresholdStartCheck"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="阈值结束值：">
                                <el-input v-model="addForm.thresholdEnd" :maxlength="50" placeholder="请输入阈值结束值" @change="thresholdEndCheck"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="阈值优先级：">
                                <el-select v-model="addForm.rank" clearable placeholder="请选择">
                                    <el-option
                                            v-for="item in priority"
                                            :key="item.value"
                                            :label="item.value"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="默认优先级：">
                                <el-select v-model="addForm.swsRank" clearable placeholder="请选择">
                                    <el-option
                                            v-for="item in priority"
                                            :key="item.value"
                                            :label="item.value"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="grid-content bg-purple">
                            <el-form-item label="默认仓库：">
                                <el-checkbox-group v-model="checkList" style="width:400px;" @change="changeDefaults">
                                    <el-checkbox label="'YES'" :value="'YES'" :key="'YES'">默认</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="submitOrgRelationshipAdd">{{ $t('button.save') }}</el-button>
                <el-button @click="cancelOrgRelationshipAdd">{{ $t('button.cancel') }}</el-button>
            </div>
        </el-dialog>

        <!-- 编辑界面 -->
        <el-dialog :visible.sync="editFormVisible" :close-on-click-modal="false" class="wl-new user-dialog default-dialog orgRelatbox"
                   ref="addForm" title="组织关系">
            <div class="form">
                <el-tabs v-model="activeName">
                    <el-form label-width="100px" size="mini">
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="组织名称：" prop="name">
                                    <el-select v-model="updateForm.orgName" filterable placeholder="请选择" ref="pageOrgData"  value-key="orgCode" value-label="orgName"  @change="onChangeOrg" :disabled="this.disabledTo">
                                        <el-option
                                                v-for="item in orgDatas"
                                                :key="item.orgCode"
                                                :label="item.orgName"
                                                :value="item"
                                                >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="组织编码：" prop="name">
                                    <el-input v-model="updateForm.orgCode" :maxlength="50" :disabled="true"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="仓储中心名称：" prop="name">
                                    <el-select v-model="updateForm.factoryName" filterable placeholder="请选择"  ref="pageFactoryData" value-key="factoryLogisticsCode" value-label="name" @change="onChangeFactory" :disabled="this.disabledTo">
                                        <el-option
                                                v-for="item in factoryDcDatas"
                                                :key="item.factoryLogisticsCode"
                                                :label="item.name"
                                                :value="item">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="仓储中心编码：" prop="name">
                                    <el-input v-model="updateForm.factoryCode" :maxlength="50" :disabled="true"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="仓库名称：" prop="name">
                                    <el-select v-model="updateForm.warehouseName" filterable placeholder="请选择" ref="pageWarehouseData" value-key="warehouseCode" value-label="warehouseName"  @change="onChangeWarehouse" :disabled="this.disabledTo">
                                        <el-option
                                                v-for="item in warehouseDatas"
                                                :key="item.warehouseCode"
                                                :label="item.warehouseName"
                                                :value="item">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="仓库编码：" prop="name">
                                    <el-input v-model="updateForm.warehouseCode" :maxlength="50" :disabled="true"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="货主名称：" prop="name">
                                    <el-select v-model="updateForm.shipperName" filterable placeholder="请选择" ref="pageShipperData" value-key="shipperCode" value-label="shipperName" @change="onChangeShipper" :disabled="this.disabledTo">
                                        <el-option
                                                v-for="item in shipperDatas"
                                                :key="item.shipperCode"
                                                :label="item.shipperName"
                                                :value="item">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="货主编码：" prop="name">
                                    <el-input v-model="updateForm.shipperCode" :maxlength="50" :disabled="true"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="物料名称：" prop="name">
                                    <el-select v-model="updateForm.materialName" filterable placeholder="请选择" ref="pageMaterialData" value-key="materialCode" value-label="materialName" @change="onChangeMaterial" :disabled="this.disabledTo">
                                        <el-option
                                                v-for="item in materialDatas"
                                                :key="item.materialCode"
                                                :label="item.materialName"
                                                :value="item">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="物料编码：" prop="name">
                                    <el-input v-model="updateForm.materialCode" :maxlength="50" :disabled="true"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="默认优先级：" prop="name">
                                    <el-select v-model="updateForm.rank" clearable placeholder="请选择">
                                        <el-option
                                                v-for="item in priority"
                                                :key="item.value"
                                                :label="item.value"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple" style="height: 30px;">
                                <el-form-item label="" prop="name">
                                    <el-checkbox v-model="defaultsDatas" label="'YES'" :value="'YES'" :key="'YES'" @change="changeDefaultsUpdate">默认</el-checkbox>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="阈值开始值：" prop="name">
                                    <el-tooltip content="最多输入50个字符" placement="right" effect="light">
                                        <el-input v-model="updateForm.thresholdStart" :maxlength="50" @change="thresholdStartCheckUpdate"></el-input>
                                    </el-tooltip>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="阈值结束值：" prop="name">
                                    <el-tooltip content="最多输入50个字符" placement="right" effect="light">
                                        <el-input v-model="updateForm.thresholdEnd" :maxlength="50" @change="thresholdEndCheckUpdate"></el-input>
                                    </el-tooltip>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-form-item label="阈值优先级：" prop="name">
                                    <el-select v-model="updateForm.tsrank" clearable placeholder="请选择">
                                        <el-option
                                                v-for="item in priority"
                                                :key="item.value"
                                                :label="item.value"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-form>
                </el-tabs>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="submitOrgRelationshipUpdate">{{ $t('button.save') }}</el-button>
                <el-button @click="cancelOrgRelationshipUpdate">{{ $t('button.cancel') }}</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
	/* eslint-disable no-mixed-spaces-and-tabs */
	import util from '../../common/js/util';
    export default {
        data() {
            return {
                listLoading: false,
                currentList: [],
                dict: [],
                orgRelationshipQuery: {
                  orgName: '',
                  shipperName: '',
                  shipperCode: '',
                  warehouseName: '',
                  materialName: '',
                  materialCode: '',
                  factoryName: ''
                },
                orgList: [],
                orgRelationshipAdd: {
                  orgIds: []
                },
                priority: [{value: '1'}, {value: '2'}, {value: '3'}, {value: '4'}, {value: '5'}, {value: '6'}, {value: '7'}, {value: '8'}, {value: '9'}, {value: '10'}],
                factoryDcList: [],
                shipperMateriaList: [],
                selectFactoryDcList: [],
                selectShipperMateriaList: [],
                pageOrgId: '',
                checkList: [],
                orgDatas: [],
	            factoryDcDatas: [],
	            warehouseDatas: [],
	            shipperDatas: [],
	            materialDatas: [],
	            defaultsDatas: '',
                // 分页
                pager: {
                    page: 1,
                    rows: 10,
                    total: 0
                },
                addForm: {
                    thresholdStart: '',
                    thresholdEnd: '',
                    rank: '',
                    swsRank: '',
                    defaults: ''
                },
                updateForm: {
	                swsId: '',
                    orgCode: '',
                    orgName: '',
	                orgID: '',
                    factoryCode: '',
                    factoryName: '',
                    warehouseCode: '',
                    warehouseName: '',
                    shipperCode: '',
	                shipperName: '',
	                shipperID: '',
	                materialCode: '',
	                materialName: '',
	                materialID: '',
	                defaults: '',
	                rank: '',
	                orgDataName: '',
	                factoryDataName: '',
	                factoryID: '',
	                warehouseDataName: '',
	                shipperDataName: '',
	                materialDataName: '',
	                thresholdStart: '',
	                thresholdEnd: '',
                    tsrank: '',
                    tsId: ''
                },
	            disabledTo: false,
                checked: false,
                addFormVisible: false,
                editFormVisible: false,
                // 查询框折叠展开
                showSearch: true,
                titles: '',
                activeName: 'first'
            };
        },
        methods: {
            // 选择行数
            sizeChange(rows) {
              this.pager.rows = rows;
              this.selectOrgRelationshipList();
            },
            // 分页
            pageChange(currentPage) {
              this.pager.page = currentPage;
              this.selectOrgRelationshipList();
            },
            // 分页查询
            selectOrgRelationshipList: function() {
              let that = this;
              that.listLoading = true;
              util.publicpost(
                '/orgRelationship/selectOrgRelationshipList',
                {
                  page: that.pager.page,
                  rows: that.pager.rows,
                  orgName: that.orgRelationshipQuery.orgName,
                  shipperName: that.orgRelationshipQuery.shipperName,
                  shipperCode: that.orgRelationshipQuery.shipperCode,
                  warehouseName: that.orgRelationshipQuery.warehouseName,
                  materialName: that.orgRelationshipQuery.materialName,
                  materialCode: that.orgRelationshipQuery.materialCode,
                  factoryName: that.orgRelationshipQuery.factoryName
                },
                function(res) {
                  if (res.code === 0) {
                    that.currentList = res.result;
                    that.pager.total = res.pager.totalCount || 0;
                  } else {
                    that.error('服务器繁忙！');
                  }
                  that.listLoading = false;
                  that.dict = res.enumVal;
                });
            },
            // 删除
            deleteOrgRelationship: function(row) {
              let that = this;
              let ids = row.id;
              let versions = row.version;
              this.$confirm('确认删除选中记录吗？', '提示', {
                type: 'warning'
              })
                .then(() => {
                  this.listLoading = true;
                  let para = {orgRelationshipId: ids, version: versions};
                  util.publicpost('/orgRelationship/deleteOrgRelationship', para, function(
                    res
                  ) {
                    that.listLoading = false;
                    if (res.success) {
                      if (res.data === 0) {
                        that.errorMsg('服务器繁忙！');
                      } else {
                        that.successMsg(that.$t('msg.success'));
                        that.selectOrgRelationshipList();
                      }
                    } else {
                      let msg = '';
                      if (!util.isEmpty(res.msg)) {
                        msg = ',' + that.$t(res.msg);
                      }
                      that.errorMsg(that.$t('msg.error') + msg);
                    }
                  });
                })
                .catch(error => console.log(error));
            },
            // 格式化时间
            formatterOrgRelationshipUpdate: function(row, column) {
              return row.updateTime
                ? util.formatDate.format(
                  new Date(row.updateTime),
                  'yyyy-MM-dd hh:mm:ss'
                )
                : '';
            },
            // 格式化默认
            formatterOrgStrategyDefaults(row, column) {
              let key = row.defaults;
              let json = this.dict.defaults;
              return util.formatDict(json, key);
            },
            // 重置
            resetOrgRelationship: function() {
              let that = this;
              that.orgRelationshipQuery.orgName = '';
              that.orgRelationshipQuery.shipperName = '';
              that.orgRelationshipQuery.shipperCode = '';
              that.orgRelationshipQuery.warehouseName = '';
              that.orgRelationshipQuery.materialName = '';
              that.orgRelationshipQuery.materialCode = '';
              that.orgRelationshipQuery.factoryName = '';
            },
            // 错误信息提示
            error: function(text) {
              this.$message({
                showClose: true,
                message: text,
                type: 'error'
              });
            },
            // 添加
            handleAdd: function () {
                this.addFormVisible = true;
                let that = this;
                util.publicpost('/orgRelationship/orgRelationshipOrgTree', {}, function (res) {
                  if (res.code === 0) {
                    that.orgList = res.data;
                  } else {
	                  that.errorMsg(that.$t(res.msg));
                  }
                });
                util.publicpost('/orgRelationship/selectShipperMaterialThree', {}, function (res) {
                if (res.code === 0) {
                  that.shipperMateriaList = res.data;
                } else {
	                that.errorMsg(that.$t(res.msg));
                }
              });
            },
            // 选择组织
            orgRelationshipAddOrg: function(val) {
                let that = this;
                let pageOrgId = '';
                if (val) {
                  pageOrgId = val[val.length - 1];
                }
                that.pageOrgId = pageOrgId;
                let para = { 'pageQueryId': pageOrgId };
                util.publicpost('/orgRelationship/selectByOrgIDDCThree', para, function (res) {
                  if (res.code === 0) {
                    that.factoryDcList = res.data === null ? [] : res.data;
                  } else {
	                  that.errorMsg(that.$t(res.msg));
                  }
                });
            },
            // 选择仓储中心
            selectFactoryDcNode: function(val) {
                let that = this;

                // console.log(111111 + that.$refs.dcTree.getCheckedKeys());
                that.selectFactoryDcList = that.$refs.dcTree.getCheckedKeys();
                // for (let i = 0; i < that.$refs.dcTree.getCheckedKeys().length; i++) {
                //     let arr = {};
                //     // that.selectFactoryDcList.push(that.$refs.dcTree.getCheckedKeys()[i]);
                //     arr[i] = that.$refs.dcTree.getCheckedKeys()[i]
                //     console.log(arr);
                //     that.selectFactoryDcList.push(arr);
                // }
            },
            // 选择货主物料
            selectShipperMateriaNode: function() {
                let that = this;
                that.selectShipperMateriaList = that.$refs.shipperTree.getCheckedKeys();
            },
            // 选择默认
            changeDefaults: function(val) {
                let that = this;
                that.addForm.defaults = val;
            },
            // 取消
            cancelOrgRelationshipAdd: function() {
                let that = this;
	            that.checkList = [];
                that.orgRelationshipAdd.orgIds = [];
                that.factoryDcList = [];
                that.shipperMateriaList = [];
                that.orgList = [];
                that.addForm.thresholdStart = '';
                that.addForm.thresholdEnd = '';
                that.addForm.rank = '';
                that.addForm.swsRank = '';
                that.addForm.defaults = '';
                that.selectFactoryDcList = [];
                that.selectShipperMateriaList = [];
                that.addFormVisible = false;
            },
            // 新增
            submitOrgRelationshipAdd: function() {
                let that = this;
                if (that.addForm.thresholdStart.length > 9) {
	                that.errorMsg(that.$t('阈值开始值长度过长'));
	                return;
                }
                if (that.addForm.thresholdEnd.length > 9) {
	                that.errorMsg(that.$t('阈值结束值长度过长'));
	                return;
                }
                let defls = '';
                if (that.addForm.defaults[0]) {
                    defls = that.addForm.defaults[0].replace(/'/g, '');
                } else {
                    defls = 'NO';
                }
                let data = {
                    factoryDcTreeListStr: JSON.stringify(that.factoryDcList),
                    shipperMateriaListStr: JSON.stringify(that.shipperMateriaList),
                    choiceFactoryDcTreeStr: that.selectFactoryDcList,
                    choiceShipperMateriaTreeStr: that.selectShipperMateriaList,
                    thresholdStart: that.addForm.thresholdStart,
                    thresholdEnd: that.addForm.thresholdEnd,
                    rank: that.addForm.rank,
                    swsRank: that.addForm.swsRank,
                    defaults: defls,
                    orgId: that.pageOrgId
                };
              /* that.confirm('确定要新增组织关系管理吗？', function () { */
                util.publicpost(
                  '/orgRelationship/insertOrgRelationship',
                  data,
                  function (res) {
                    if (res.code === 0) {
                      that.cancelOrgRelationshipAdd();
                      that.successMsg(that.$t(res.msg));
                      that.selectOrgRelationshipList();
                    } else {
                      that.errorMsg(that.$t(res.msg));
                    }
                  }
                );
              /* }); */
            },
            // 校验
            thresholdStartCheck: function(value) {
              let that = this;
              let reg = /^[1-9]\d*$/;
              if (value) {
                if (!RegExp(reg).test(value)) {
                  that.addForm.thresholdStart = '';
                }
              }
            },
            // 校验
	        thresholdStartCheckUpdate: function(value) {
              let that = this;
              let reg = /^[1-9]\d*$/;
              if (value) {
                if (!RegExp(reg).test(value)) {
	                that.updateForm.thresholdStart = '';
                }
              }
            },
            // 校验
	        thresholdEndCheckUpdate: function(value) {
              let that = this;
              let reg = /^[1-9]\d*$/;
              if (value) {
                if (!RegExp(reg).test(value)) {
                  that.updateForm.thresholdEnd = '';
                }
              }
            },
            // 校验
            thresholdEndCheck: function(value) {
              let that = this;
              let reg = /^[1-9]\d*$/;
              if (value) {
                if (!RegExp(reg).test(value)) {
                  that.addForm.thresholdEnd = '';
                }
              }
            },
            // 编辑
            updateOrgRelationship: function (row) {
                let that = this;
                that.updateForm.orgCode = row.orgCode;
                that.updateForm.orgName = row.orgName;
                that.updateForm.orgDataName = row.orgName;
                that.updateForm.factoryCode = row.factoryCode;
                that.updateForm.factoryName = row.factoryName;
                that.updateForm.factoryDataName = row.factoryName;
                that.updateForm.warehouseCode = row.warehouseCode;
                that.updateForm.warehouseName = row.warehouseName;
                that.updateForm.warehouseDataName = row.warehouseName;
                that.updateForm.shipperCode = row.shipperCode;
                that.updateForm.shipperName = row.shipperName;
                that.updateForm.shipperDataName = row.shipperName;
                that.updateForm.materialCode = row.materialCode;
                that.updateForm.materialName = row.materialName;
                that.updateForm.materialDataName = row.materialName;
                that.updateForm.defaults = row.defaults;
                that.updateForm.rank = row.rank;
                that.updateForm.swsId = row.id;
                if (that.updateForm.defaults === 'YES') {
	                that.defaultsDatas = true;
                } else {
	                that.defaultsDatas = false;
                }
	            util.publicpost('/orgRelationship/selectOrgInfo', {}, function (res) {
                    if (res.code === 0) {
                        that.orgDatas = res.data;
                    } else {
	                    that.errorMsg(that.$t(res.msg));
                    }
	            });
	            util.publicpost('/orgRelationship/selectDCInfo', {}, function (res) {
                    if (res.code === 0) {
                        that.factoryDcDatas = res.data;
                    } else {
	                    that.errorMsg(that.$t(res.msg));
                    }
	            });
	            util.publicpost('/orgRelationship/selectWarehouseInfo', {}, function (res) {
                    if (res.code === 0) {
                        that.warehouseDatas = res.data;
                    } else {
	                    that.errorMsg(that.$t(res.msg));
                    }
	            });
	            util.publicpost('/orgRelationship/selectShipperInfo', {}, function (res) {
                    if (res.code === 0) {
                        that.shipperDatas = res.data;
                    } else {
	                    that.errorMsg(that.$t(res.msg));
                    }
	            });
	            util.publicpost('/orgRelationship/selectMaterialInfo', {}, function (res) {
                    if (res.code === 0) {
                        that.materialDatas = res.data;
                    } else {
	                    that.errorMsg(that.$t(res.msg));
                    }
	            });
	            util.publicpost('/orgRelationship/selectTSDById', {shipperWarehouseStrategyId: that.updateForm.swsId}, function (res) {
                    if (res.code === 0) {
	                    if (res.data) {
                            that.updateForm.tsrank = res.data.rank;
                            that.updateForm.thresholdStart = res.data.thresholdStart;
                            that.updateForm.thresholdEnd = res.data.thresholdEnd;
                            that.updateForm.tsId = res.data.id;
                        }
                    } else {
	                    that.errorMsg(that.$t(res.msg));
                    }
	            });
                this.editFormVisible = true;
            },
            // 选择组织
	        onChangeOrg: function (val) {
                /* let obj = {};
                obj = this.$refs.pageOrgData.options.find((item) => {
                    return item.value === val;
                });
                this.updateForm.orgCode = val;
                this.updateForm.orgDataName = obj.label; */
                this.updateForm.orgCode = val.orgCode;
                this.updateForm.orgDataName = val.orgDataName;
                this.updateForm.orgID = val.orgID;
	        },
            // 选择工厂
	        onChangeFactory: function (val) {
                /* let obj = {};
                obj = this.$refs.pageFactoryData.options.find((item) => {
                    return item.value === val;
                });
                this.updateForm.factoryCode = val;
                this.updateForm.factoryDataName = obj.label; */
                this.updateForm.factoryCode = val.factoryLogisticsCode;
                this.updateForm.factoryDataName = val.name;
                this.updateForm.factoryID = val.id;
            },
            // 选择仓库
	        onChangeWarehouse: function (val) {
                /* let obj = {};
                obj = this.$refs.pageWarehouseData.options.find((item) => {
                    return item.value === val;
                });
                this.updateForm.warehouseCode = val;
                this.updateForm.warehouseDataName = obj.label; */
                this.updateForm.warehouseCode = val.warehouseCode;
                this.updateForm.warehouseDataName = val.warehouseName;
                this.updateForm.warehouseID = val.id;
	        },
            // 选择货主
	        onChangeShipper: function (val) {
                /* let obj = {};
                obj = this.$refs.pageShipperData.options.find((item) => {
                    return item.value === val;
                });
                this.updateForm.shipperCode = val;
                this.updateForm.shipperDataName = obj.label; */
                this.updateForm.shipperCode = val.shipperCode;
                this.updateForm.shipperDataName = val.shipperName;
                this.updateForm.shipperID = val.id;
	        },
            // 选择物料
	        onChangeMaterial: function (val) {
                /* let obj = {};
                obj = this.$refs.pageMaterialData.options.find((item) => {
                    return item.value === val;
                });
                this.updateForm.materialCode = val;
                this.updateForm.materialDataName = obj.label; */
                this.updateForm.materialID = val.id;
                this.updateForm.materialCode = val.materialCode;
                this.updateForm.materialDataName = val.materialName;
	        },
            // 选择框
	        changeDefaultsUpdate: function (val) {
                let that = this;
                if (val === true) {
	                that.updateForm.defaults = 'YES';
                } else {
	                that.updateForm.defaults = 'NO';
                }
            },
            // 修改提交
	        submitOrgRelationshipUpdate: function () {
                let that = this;
                let data = {
	                id: that.updateForm.tsId,
	                shipperWarehouseStrategyId: that.updateForm.swsId,
	                orgCode: that.updateForm.orgCode,
	                orgId: that.updateForm.orgID,
	                orgName: that.updateForm.orgDataName,
	                shipperCode: that.updateForm.shipperCode,
	                shipperName: that.updateForm.shipperDataName,
	                shipperId: that.updateForm.shipperID,
	                factoryCode: that.updateForm.factoryCode,
	                factoryName: that.updateForm.factoryDataName,
	                factoryId: that.updateForm.factoryID,
	                warehouseCode: that.updateForm.warehouseCode,
	                warehouseId: that.updateForm.warehouseID,
	                warehouseName: that.updateForm.warehouseDataName,
	                materialCode: that.updateForm.materialCode,
	                materialId: that.updateForm.materialID,
	                materialName: that.updateForm.materialDataName,
	                thresholdStart: that.updateForm.thresholdStart,
	                thresholdEnd: that.updateForm.thresholdEnd,
	                tsrank: that.updateForm.tsrank,
	                rank: that.updateForm.rank,
	                defaults: that.updateForm.defaults
                };
                that.confirm('确定要更新组织关系管理吗？', function () {
                    util.publicpost(
                        '/orgRelationship/updateOrgRelationship',
                        data,
                        function (res) {
                            if (res.code === 0) {
                                that.cancelOrgRelationshipUpdate();
                                that.successMsg(that.$t(res.msg));
                                that.selectOrgRelationshipList();
                            } else {
                                that.errorMsg(that.$t(res.msg));
                            }
                        }
                    );
                });
	        },
            // 取消修改
	        cancelOrgRelationshipUpdate: function () {
                let that = this;
                that.updateForm.orgCode = '';
                that.updateForm.orgName = '';
                that.updateForm.orgDataName = '';
                that.updateForm.factoryCode = '';
                that.updateForm.factoryName = '';
                that.updateForm.factoryDataName = '';
                that.updateForm.warehouseCode = '';
                that.updateForm.warehouseName = '';
                that.updateForm.warehouseDataName = '';
                that.updateForm.shipperCode = '';
                that.updateForm.shipperName = '';
                that.updateForm.shipperDataName = '';
                that.updateForm.materialCode = '';
                that.updateForm.materialName = '';
                that.updateForm.materialDataName = '';
                that.updateForm.defaults = '';
                that.updateForm.rank = '';
                that.updateForm.swsId = '';
                that.orgDatas = [];
                that.factoryDcDatas = [];
                that.warehouseDatas = [];
                that.shipperDatas = [];
                that.materialDatas = [];
                that.updateForm.tsrank = '';
                that.updateForm.thresholdStart = '';
                that.updateForm.thresholdEnd = '';
                that.updateForm.tsId = '';
                this.editFormVisible = false;
	        }
        },
        computed: {
            toggleDrop() {
                return this.showSearch ? 'el-icon-arrow-up' : 'el-icon-arrow-down';
            }
        },
        mounted() {
            this.selectOrgRelationshipList();
            this.getButtonList();
        }
    };
</script>
<style>
    .orgRelationshipList .el-table__body-wrapper{
        overflow: hidden;
    }
    .orgRelatbox .el-dialog__footer{
        background: #fff;
    }
</style>
