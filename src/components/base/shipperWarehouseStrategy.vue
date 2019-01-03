// 分仓策略管理
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
                                <el-form-item label="策略名称：">
                                    <el-input v-model="formInline.name" style="height: 30px;line-height: 30px;"
                                              placeholder="请输入分仓策略名称" :maxlength='50'></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item label="货主名称：">
                                    <el-input v-model="formInline.shipperName" placeholder="请输入货主名称"
                                              :maxlength='100'></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item label="仓库名称：">
                                    <el-input v-model="formInline.warehouseName" placeholder="请输入仓库名称"
                                              :maxlength='100'></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item label="物料名称：">
                                    <el-input v-model="formInline.materialName" style="height: 30px;"
                                              placeholder="请输入物料名称" :maxlength='100'></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item label="策略类型：">
                                    <el-select v-model="formInline.rankType" clearable placeholder="请选择" class="select">
                                        <el-option v-for="item in dict.rankType" :key="item.name" :label="item.des"
                                                   :value="item.name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item label="状态：">
                                    <el-select v-model="formInline.status" clearable placeholder="请选择" class="select">
                                        <el-option v-for="item in dict.status" :key="item.name" :label="item.des"
                                                   :value="item.name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="footer-but tar pad_r pad_t">
                            <el-button type="primary" @click="selectList">查询</el-button>
                            <el-button @click="resetForm">重置</el-button>
                        </div>
                    </el-form>
                </div>
            </div>
        </el-collapse-transition>

        <!--新增、删除-->
        <div class="add_move def-but">
            <el-button @click="handleAdd" v-if="permissions('base_shipperWarehouse_add')">{{ $t('button.add') }}</el-button>

        </div>

        <!-- 列表 -->
        <div class="list_shipper list_operation">
            <el-table highlight-current-row stripe :data="shipperWarehouseStrategyList" v-loading="listLoading" @selection-change="selChange"
                      style="width: 100%;" border :fit="true" align="center">
                <!-- <el-table-column type="selection" align="center" isEditing="false" width="55" @click="selChange(1)"></el-table-column> -->
                <el-table-column label="序号" align="center" type="index" width="50"></el-table-column>
                <el-table-column label="分仓策略名称" width="120" prop="name" align="center" text-overflow="ellipsis"
                                 show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-input @blur="handleBlur(scope.row)" v-if="scope.row.isEditing"
                                  v-model="scope.row.name"></el-input>
                        <div slot="reference" class="name-wrapper hand" @click="handleLook(scope.row)"
                             v-if="!scope.row.isEditing">
                            {{ scope.row.name }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="货主名称" width="100" prop="shipperName" align="center" text-overflow="ellipsis"
                                 show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-input @blur="handleBlur(scope.row)" v-if="scope.row.isEditing"
                                  v-model="scope.row.shipperName"></el-input>
                        <div slot="reference" class="name-wrapper" v-if="!scope.row.isEditing">
                            {{ scope.row.shipperName }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="仓库名称" width="300" prop="warehouseName" align="center" text-overflow="ellipsis"
                                 show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-input @blur="handleBlur(scope.row)" v-if="scope.row.isEditing"
                                  v-model="scope.row.warehouseName"></el-input>
                        <div slot="reference" class="name-wrapper" v-if="!scope.row.isEditing">
                            {{ scope.row.warehouseName }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="物料名称" prop="materialName" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-input @blur="handleBlur(scope.row)" v-if="scope.row.isEditing"
                                  v-model="scope.row.materialName"></el-input>
                        <div slot="reference" class="name-wrapper" v-if="!scope.row.isEditing">
                            {{ scope.row.materialName }}

                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="分仓策略类型" width="120" prop="rankType" align="center">
                    <template slot-scope="scope">
                        <el-select v-if="scope.row.isEditing" v-model="scope.row.rankType">
                            <el-option label="指定仓库" value="DESIGNATEDWAREHOUSE">指定仓库</el-option>
                            <el-option label="先进先出" value="FIRSTINFIRSTOUT">先进先出</el-option>
                        </el-select>
                        <div v-if="!scope.row.isEditing">
                            {{
                            scope.row.rankType === 'DESIGNATEDWAREHOUSE' ? '指定仓库' : '先进先出'
                            }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="优先级别" prop="rank" align="center" text-overflow="ellipsis" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-input @blur="handleBlur(scope.row)" v-if="scope.row.isEditing"
                                  v-model="scope.row.rank"></el-input>
                        <div slot="reference" class="name-wrapper" v-if="!scope.row.isEditing">
                            {{ scope.row.rank }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="状态" isEditing="true" :formatter="formatStatus" prop="status" align="center"
                                 show-overflow-tooltip>
                </el-table-column>
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
                <el-table-column label="修改人" prop="updater" align="center">
                    <template slot-scope="scope">
                        <el-input @blur="handleBlur(scope.row)" v-if="scope.row.isEditing"
                                  v-model="scope.row.updater"></el-input>
                        <div slot="reference" class="name-wrapper" v-if="!scope.row.isEditing">
                            {{ scope.row.updater }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="修改时间" prop="updateTime" align="center" text-overflow="ellipsis"
                                 :formatter="formatterUpdate" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-input @blur="handleBlur(scope.row)" v-if="scope.row.isEditing"
                                  v-model="scope.row.updateTime" :disabled="true"></el-input>
                        <div slot="reference" class="name-wrapper" v-if="!scope.row.isEditing">
                            {{ scope.row.showUpdateTime }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center" width="215">
                    <template slot-scope="scope">
                        <el-tooltip content="修改" placement="top" effect="light" v-if="permissions('base_shipperWarehouse_update')">
                            <div @click="handleEdit(scope.row)" class="operation_icon icon1"></div>
                        </el-tooltip>
                        <div @click="handleStart(scope.row)" v-if="scope.row.status === 'INEFFECTIVENESS'">
                            <el-tooltip content="启用" placement="top" effect="light" v-if="permissions('base_shipperWarehouse_enable')">
                                <div class="operation_icon icon2"></div>
                            </el-tooltip>
                        </div>
                        <div @click="handleForbidden(scope.row)" v-if="scope.row.status === 'AVAILABILITY'">
                            <el-tooltip content="禁用" placement="top" effect="light" v-if="permissions('base_shipperWarehouse_disable')">
                                <div class="operation_icon icon3"></div>
                            </el-tooltip>
                        </div>
                        <el-tooltip content="删除" placement="top" effect="light" v-if="permissions('base_shipperWarehouse_delete')">
                            <div @click="batchRemove(scope.row)" class="operation_icon icon4"></div>
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


        <!-- 修改界面 -->
        <el-dialog :visible.sync="editFormVisible" :close-on-click-modal="false"
                   style="line-height: 0;overflow: hidden;font-size: 12px;" title="修改数据" class="default-dialog">
            <div class="form form-add" style="height: 80px;">
                <el-form :model="editForm" label-width="110px" :rules="editFormRules" ref="editForm" size="mini">
                    <el-row style="text-align: center">
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="分仓策略名称:" prop="name">
                                    <el-tooltip content="最多输入50个字符" placement="right" effect="light">
                                        <el-input v-model="editForm.name" :maxlength='50'></el-input>
                                    </el-tooltip>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="货主名称:" prop="shipperName">
                                    <el-select
                                            v-model="editForm.shipperId"
                                            @change="handleChange('materialList', editForm.shipperId)"
                                            filterable
                                            remote
                                            reserve-keyword
                                            placeholder="请输入关键词"
                                            :remote-method="remoteShipperMethod"
                                            :loading="loading">
                                        <el-option
                                                v-for="(item, index) in shipperList"
                                                :key="item.value + '-' + index"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="仓库名称:" prop="warehouseName">
                                    <el-select
                                            v-model="editForm.warehouseId"
                                            filterable
                                            remote
                                            reserve-keyword
                                            placeholder="请输入关键词"
                                            :remote-method="remoteWarehouseMethod"
                                            :loading="loading">
                                        <el-option
                                                v-for="(item, index) in warehouseList"
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
                                <el-form-item label="分仓策略类型:" prop="rankType">
                                    <el-select v-model="editForm.rankType" filterable placeholder="请选择">
                                        <el-option label="指定仓库" value="DESIGNATEDWAREHOUSE">指定仓库</el-option>
                                        <el-option label="先进先出" value="FIRSTINFIRSTOUT">先进先出</el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="状态:" prop="status">
                                    <el-select v-model="editForm.status" filterable placeholder="请选择">
                                        <el-option label="有效" value="AVAILABILITY">有效</el-option>
                                        <el-option label="无效" value="INEFFECTIVENESS">无效</el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="物料名称:" prop="materialName">
                                    <el-select v-model="editForm.materialId" filterable placeholder="请选择">
                                        <el-option v-for="item in materialList"
                                                   :key="item.id"
                                                   :label="item.materialName"
                                                   :value="item.id">
                                        </el-option>
                                    </el-select>
                                    <el-input v-model="addForm.materialName" v-show="false"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="优先级别:" prop="rank">
                                    <el-input v-model="editForm.rank"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer def-but">
                <el-button @click.native="editSubmit">{{ $t('button.save') }}</el-button>
                <el-button @click.native="off">{{ $t('button.cancel') }}</el-button>
            </div>
        </el-dialog>

        <!-- 新增界面 -->
        <el-dialog :visible.sync="addFormVisible" :close-on-click-modal="false"
                   style="line-height: 0;overflow: hidden;font-size: 12px;" title="新增数据" class="default-dialog">
            <div class="form form-add" style="height: 80px;">
                <el-form :model="addForm" label-width="110px" :rules="addFormRules" ref="addForm" size="mini">
                    <el-row style="text-align: center">
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="分仓策略名称:" prop="name">
                                    <el-tooltip content="最多输入50个字符" placement="right" effect="light">
                                        <el-input v-model="addForm.name" :maxlength='50'></el-input>
                                    </el-tooltip>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="货主名称:" prop="shipperName">
                                    <el-select
                                            v-model="addForm.shipperId"
                                            @change="handleChange('materialList', addForm.shipperId)"
                                            filterable
                                            remote
                                            reserve-keyword
                                            placeholder="请输入关键词"
                                            :remote-method="remoteShipperMethod"
                                            :loading="loading">
                                        <el-option
                                                v-for="(item, index) in shipperList"
                                                :key="item.value + '-' + index"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <el-input v-model="addForm.shipperName" v-show="false"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="仓库名称:" prop="warehouseName">
                                    <el-select
                                            v-model="addForm.warehouseId"
                                            filterable
                                            remote
                                            reserve-keyword
                                            placeholder="请输入关键词"
                                            :remote-method="remoteWarehouseMethod"
                                            :loading="loading">
                                        <el-option
                                                v-for="(item, index) in warehouseList"
                                                :key="item.value + '-' + index"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <el-input v-model="addForm.warehouseName" v-show="false"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="分仓策略类型:" prop="rankType">
                                    <el-select v-model="addForm.rankType" filterable placeholder="请选择">
                                        <el-option label="指定仓库" value="DESIGNATEDWAREHOUSE">指定仓库</el-option>
                                        <el-option label="先进先出" value="FIRSTINFIRSTOUT">先进先出</el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="物料名称:" prop="materialName">
                                    <el-select v-model="addForm.materialId" filterable placeholder="请选择">
                                        <el-option v-for="item in materialList"
                                                   :key="item.id"
                                                   :label="item.materialName"
                                                   :value="item.id">
                                        </el-option>
                                    </el-select>
                                    <el-input v-model="addForm.materialName" v-show="false"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="优先级别:" prop="rank">
                                    <el-input v-model="addForm.rank"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer def-but">
                <el-button @click.native="addSubmit" :loading="addLoading">{{ $t('button.save') }}</el-button>
                <el-button @click.native="off">{{ $t('button.cancel') }}</el-button>
            </div>
        </el-dialog>

        <!-- 查看 -->
        <el-dialog :visible.sync="lookFormVisible" :close-on-click-modal="false"
                   style="line-height: 0;overflow: hidden;font-size: 12px;">
            <div class="form form-add" style="height: 350px;">
                <el-form :model="lookForm" label-width="100px" :rules="lookFormRules" ref="lookForm">
                    <el-row style="height: 30px;text-align: center">
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="分仓策略名称:" prop="name">
                                    <el-input v-model="lookForm.name" :disabled="true"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="货主名称:" prop="shipperName">
                                    <el-input v-model="lookForm.shipperName" :disabled="true"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="仓库名称:" prop="warehouseName">
                                    <el-input v-model="lookForm.warehouseName" :disabled="true"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row style="height: 30px">
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="分仓策略类型:" prop="rankType">
                                    <el-select v-model="lookForm.rankType" :disabled="true" clearable placeholder="请选择"
                                               class="select">
                                        <el-option v-for="item in dict.rankType" :key="item.name" :label="item.des"
                                                   :value="item.name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="状态:" prop="rankType">
                                    <el-select v-model="lookForm.status" :disabled="true" clearable placeholder="请选择"
                                               class="select">
                                        <el-option v-for="item in dict.status" :key="item.name" :label="item.des"
                                                   :value="item.name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="物料名称:" prop="materialName">
                                    <el-input v-model="lookForm.materialName" :disabled="true"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row style="height: 30px">
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="优先级别:" prop="rank">
                                    <el-input v-model="lookForm.rank" :disabled="true"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="创建人:" prop="creater">
                                    <el-input v-model="lookForm.creater" :disabled="true"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="创建时间:" prop="createTime">
                                    <el-date-picker
                                            v-model="lookForm.createTime"
                                            type="date"
                                            :disabled="true">
                                    </el-date-picker>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row style="height: 30px">
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="修改人:" prop="updater">
                                    <el-input v-model="lookForm.updater" :disabled="true"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="修改时间:" prop="updateTime">
                                    <el-date-picker
                                            v-model="lookForm.updateTime"
                                            type="date"
                                            :disabled="true">
                                    </el-date-picker>
                                </el-form-item>
                            </div>
                        </el-col>

                    </el-row>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer def-but">
                <el-button @click.native="off">{{ $t('button.cancel') }}</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import util from '../../common/js/util';

    export default {
        data() {
            return {
                activeName: 'first',
                loading: false,
                itemStatus: [{status: 'AVAILABILITY'}, {status: 'INEFFECTIVENESS'}],
                itemRankType: [
                    {rankType: 'DESIGNATEDWAREHOUSE'},
                    {rankType: 'FIRSTINFIRSTOUT'}
                ],
                formInline: {
                    name: '',
                    shipperName: '',
                    warehouseName: '',
                    materialName: '',
                    rankType: '',
                    status: ''
                },
                pager: {
                    page: 1,
                    rows: 10,
                    total: 0
                },
                dict: '',
                sels: [],
                shipperList: [],
                materialList: '',
                warehouseList: '',
                shipperWarehouseStrategyList: [],
                listLoading: false,
                lookFormVisible: false, // 查看界面是否显示
                lookFormRules: {},
                sel: [], // 列表选中列
                currentList: null,
                editFormVisible: false, // 编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        {required: true, message: '请输入分仓策略名称', trigger: 'blur'}
                    ],
                    shipperName: [
                        {required: true, message: '请选择货主名称', trigger: 'blur'}
                    ],
                    warehouseName: [
                        {required: true, message: '请选择仓库名称', trigger: 'blur'}
                    ],
                    rankType: [
                        {required: true, message: '请选择分仓策略类型', trigger: 'blur'}
                    ],
                    materialName: [
                        {required: true, message: '请选择物料名称', trigger: 'blur'}
                    ],
                    // status: [{ required: true, message: '请选择状态', trigger: 'blur' }],
                    rank: [{required: true, message: '请输入优先级别', trigger: 'blur'}]
                },
                // 编辑界面数据
                editForm: {
                    id: '',
                    name: '',
                    shipperId: '',
                    shipperName: '',
                    warehouseId: '',
                    warehouseName: '',
                    rankType: '',
                    status: '',
                    materialId: '',
                    materialName: '',
                    rank: '',
                    version: ''
                },
                // 查看界面数据
                lookForm: {
                    id: '',
                    name: '',
                    shipperName: '',
                    warehouseName: '',
                    rankType: '',
                    status: '',
                    materialName: '',
                    rank: '',
                    creater: '',
                    createTime: '',
                    updater: '',
                    updateTime: ''
                },
                addFormVisible: false, // 新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [
                        {required: true, message: '请输入分仓策略名称', trigger: 'blur'}
                    ],
                    shipperName: [
                        {required: true, message: '请选择货主名称', trigger: 'blur'}
                    ],
                    warehouseName: [
                        {required: true, message: '请选择仓库名称', trigger: 'blur'}
                    ],
                    rankType: [
                        {required: true, message: '请选择分仓策略类型', trigger: 'blur'}
                    ],
                    materialName: [
                        {required: true, message: '请选择物料名称', trigger: 'blur'}
                    ],
                    rank: [{required: true, message: '请输入优先级别', trigger: 'blur'}]
                },
                // 新增界面数据
                addForm: {
                    name: '',
                    shipperId: '',
                    shipperName: '',
                    warehouseId: '',
                    warehouseName: '',
                    rankType: '',
                    materialId: '',
                    materialName: '',
                    rank: ''
                },
                // 查询框折叠展开
                showSearch: true
            };
        },
        filters: {
            statusFilter: function (status) {
                if (status === 'AVAILABILITY') {
                    return '有效';
                } else if (status === 'INEFFECTIVENESS') {
                    return '无效';
                }
            },
            rankTypeFilter: function (rankType) {
                if (rankType === 'DESIGNATEDWAREHOUSE') {
                    return '指定仓库';
                } else if (rankType === 'FIRSTINFIRSTOUT') {
                    return '先进先出';
                }
            }
        },
        methods: {
            // 选择行数
            sizeChange(rows) {
                this.pager.rows = rows;
                this.selectList();
            },
            // 分页
            pageChange(currentPage) {
                this.pager.page = currentPage;
                this.selectList();
            },
            // 勾选
            selChange: function (sel) {
                this.sel = sel;
            },
            // 重置
            resetForm() {
                this.formInline.name = '';
                this.formInline.shipperName = '';
                this.formInline.warehouseName = '';
                this.formInline.materialName = '';
                this.formInline.rankType = '';
                this.formInline.status = '';
            },
            resetAddData() {
                this.addForm.name = '';
                this.addForm.shipperId = '';
                this.addForm.shipperName = '';
                this.addForm.warehouseId = '';
                this.addForm.warehouseName = '';
                this.addForm.rankType = '';
                this.addForm.materialId = '';
                this.addForm.materialName = '';
                this.addForm.rank = '';
            },
            // 分仓策略列表
            selectList() {
                let _this = this;
                _this.listLoading = true;
                util.publicpost(
                    '/shipperWarehouseStrategy/selectShipperWarehouseStrategyList',
                    {
                        name: this.formInline.name,
                        shipperName: this.formInline.shipperName,
                        warehouseName: this.formInline.warehouseName,
                        materialName: this.formInline.materialName,
                        rankType: this.formInline.rankType,
                        status: this.formInline.status,
                        page: this.pager.page,
                        rows: this.pager.rows
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
                                console.log(item.showCreateTime, item.showUpdateTime);
                            });
                            _this.shipperWarehouseStrategyList = res.result;
                        } else {
                            _this.listLoading = false;
                            _this.errorMsg('服务器繁忙！');
                        }
                        _this.dict = res.enumVal;
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
            formatterLook(time) {
                return util.formatDate.format(new Date(time), 'yyyy-MM-dd hh:mm:ss');
            },
            // 修改时间转换
            formatterUpdate(row, column) {
            },
            // 创建时间转换
            formatCreateDate(row, column) {
                return row.createTime
                    ? util.formatDate.format(
                        new Date(row.createTime),
                        'yyyy-MM-dd hh:mm:ss'
                    )
                    : '';
            },
            // 状态转换
            formatStatus(row, column) {
                var key = row.status;
                var json = this.dict.status;
                return util.formatDict(json, key);
            },
            // 是否进口转换
            formatImportationStatus(row, column) {
                var key = row.importationStatus;
                var json = this.dict.importationStatus;
                return util.formatDict(json, key);
            },
            // 物料类型转换
            formatMaterialType(row, column) {
                var key = row.type;
                var json = this.dict.materialType;
                return util.formatDict(json, key);
            },
            message: function (text) {
                this.$message({
                    showClose: true,
                    message: text,
                    type: 'warning'
                });
            },
            // 取消
            off: function () {
                this.addFormVisible = false;
                this.editFormVisible = false;
                this.lookFormVisible = false;
                this.resetAddData();
            },
            success: function (text) {
                this.$message({
                    showClose: true,
                    message: text,
                    type: 'success'
                });
            },
            error: function (text) {
                this.$message({
                    showClose: true,
                    message: text,
                    type: 'error'
                });
            },
            // 禁用
            handleForbidden: function (row) {
                let _this = this;
                let ids = row.id;
                let versions = row.version;
                this.listLoading = true;
                // if (util.isEmpty(ids)) {
                //   _this.message('请先勾选数据');
                // } else {
                util.publicpost(
                    '/shipperWarehouseStrategy/updateIneffectivenessStatus',
                    {
                        ids: ids,
                        versions: versions
                    },
                    function (res) {
                        _this.listLoading = false;
                        if (res.success) {
                            if (res.code === 0) {
                                _this.success(_this.$t('msg.success'));
                                _this.selectList();
                            } else {
                                _this.errorMsg('服务器繁忙！');
                            }
                        } else {
                            _this.errorMsg(_this.$t(res.msg));
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
                this.listLoading = true;
                // if (util.isEmpty(ids)) {
                //   _this.message('请先勾选数据');
                // } else {
                util.publicpost(
                    '/shipperWarehouseStrategy/updateAvailabilityStatus',
                    {
                        ids: ids,
                        versions: versions
                    },
                    function (res) {
                        _this.listLoading = false;
                        if (res.success) {
                            if (res.code === 0) {
                                _this.success(_this.$t('msg.success'));
                                _this.selectList();
                            } else {
                                _this.errorMsg('服务器繁忙！');
                            }
                        } else {
                            _this.errorMsg(_this.$t(res.msg));
                        }
                    }
                );
                // }
            },
            // 批量删除
            batchRemove: function (row) {
                let _this = this;
                let ids = row.id;
                let versions = row.version;
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        this.listLoading = true;
                        let para = {ids: ids, versions: versions};
                        util.publicpost(
                            '/shipperWarehouseStrategy/deleteShipperWarehouseStrategy',
                            para,
                            function (res) {
                                _this.listLoading = false;
                                if (res.success) {
                                    if (res.code === 0) {
                                        _this.success(_this.$t('msg.success'));
                                        _this.selectList();
                                    } else {
                                        _this.errorMsg('服务器繁忙！');
                                    }
                                } else {
                                    _this.errorMsg(_this.$t(res.msg));
                                }
                            }
                        );
                    })
                    .catch(error => console.log(error));
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            // 显示编辑界面
            handleEdit: function (row) {
                let _this = this;
                // let ids = this.sel.map(item => item.id).toString();
                let id = row.id.toString();
                _this.listLoading = true;
                util.publicpost(
                    '/shipperWarehouseStrategy/getShipperWarehouseStrategyById',
                    {shipperWarehouseStrategyId: id},
                    function (res) {
                        if (res.success) {
                            _this.listLoading = false;
                            _this.remoteUpdateShipperMethod(
                                res.data.shipperName,
                                res.data.shipperId
                            );
                            _this.remoteUpdateWarehouseMethod(
                                res.data.warehouseName,
                                res.data.warehouseId
                            );
                            _this.materialList = res.data.materialList;
                            _this.editForm.id = res.data.id;
                            _this.editForm.name = res.data.name;
                            _this.editForm.shipperName = res.data.shipperName;
                            _this.editForm.warehouseName = res.data.warehouseName;
                            _this.editForm.rankType = res.data.rankType;
                            _this.editForm.materialId = res.data.materialId;
                            _this.editForm.materialName = res.data.materialName;
                            _this.editForm.rank = res.data.rank;
                            _this.editForm.status = res.data.status;
                            _this.editForm.version = res.data.version;
                            _this.editFormVisible = true;
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
                    }
                );
            },
            // 显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
                this.addForm = {
                    name: '',
                    shipperId: '',
                    shipperName: '',
                    warehouseId: '',
                    warehouseName: '',
                    rankType: '',
                    materialId: '',
                    materialName: '',
                    rank: ''
                };
            },
            // 编辑
            editSubmit: function () {
                this.$refs.editForm.validate(valid => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            let shipperId = this.editForm.shipperId;
                            this.editForm.shipperName = this.getShipperName(
                                shipperId,
                                this.shipperList
                            );
                            let warehouseId = this.editForm.warehouseId;
                            this.editForm.warehouseName = this.getWarehouseName(
                                warehouseId,
                                this.warehouseList
                            );
                            let materialId = this.editForm.materialId;
                            this.editForm.materialName = this.getMaterialName(
                                materialId,
                                this.materialList
                            );
                            let para = Object.assign({}, this.editForm);
                            let _this = this;
                            util.publicpost(
                                '/shipperWarehouseStrategy/updateShipperWarehouseStrategy',
                                para,
                                function (res) {
                                    _this.editLoading = false;
                                    _this.$message({
                                        message: _this.$t('msg.success'),
                                        type: 'success'
                                    });
                                    _this.$refs['editForm'].resetFields();
                                    _this.editFormVisible = false;
                                    _this.selectList();
                                }
                            );
                        });
                    }
                });
            },
            getShipperName(id, data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].id === id) {
                        return data[i].label;
                    }
                }
            },
            getWarehouseName(id, data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].id === id) {
                        return data[i].label;
                    }
                }
            },
            getMaterialName(id, data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].id === id) {
                        return data[i].materialName;
                    }
                }
            },
            // 根据货主名称模糊查询
            remoteShipperMethod(query) {
                let _this = this;
                if (query !== '') {
                    _this.loading = true;
                    util.publicpost(
                        '/shipper/selectShipperByName',
                        {name: query},
                        function (res) {
                            if (res.success) {
                                _this.loading = false;
                                _this.shipperList = res.data.map(item => {
                                    return {
                                        id: item.id,
                                        label: item.shipperName,
                                        value: item.id
                                    };
                                });
                            } else {
                            }
                        }
                    );
                }
            },
            // 修改时根据货主名称模糊查询
            remoteUpdateShipperMethod(query, shipperId) {
                let _this = this;
                if (query !== '') {
                    _this.loading = true;
                    util.publicpost(
                        '/shipper/selectShipperByName',
                        {name: query},
                        function (res) {
                            if (res.success) {
                                _this.loading = false;
                                _this.shipperList = res.data.map(item => {
                                    return {
                                        id: item.id,
                                        label: item.shipperName,
                                        value: item.id
                                    };
                                });
                                _this.editForm.shipperId = shipperId;
                            } else {
                            }
                        }
                    );
                }
            },
            // 根据仓库名称模糊查询
            remoteWarehouseMethod(query) {
                let _this = this;
                if (query !== '') {
                    _this.loading = true;
                    util.publicpost(
                        '/warehouse/selectVagueByName',
                        {warehouseName: query},
                        function (res) {
                            if (res.success) {
                                _this.loading = false;
                                _this.warehouseList = res.data.map(item => {
                                    return {
                                        id: item.id,
                                        label: item.warehouseName,
                                        value: item.id
                                    };
                                });
                            } else {
                            }
                        }
                    );
                }
            },
            // 修改时根据仓库名称模糊查询
            remoteUpdateWarehouseMethod(query, warehouseId) {
                let _this = this;
                if (query !== '') {
                    _this.loading = true;
                    util.publicpost(
                        '/warehouse/selectVagueByName',
                        {warehouseName: query},
                        function (res) {
                            if (res.success) {
                                _this.loading = false;
                                _this.warehouseList = res.data.map(item => {
                                    return {
                                        id: item.id,
                                        label: item.warehouseName,
                                        value: item.id
                                    };
                                });
                                _this.editForm.warehouseId = warehouseId;
                            } else {
                            }
                        }
                    );
                }
            },
            handleChange: function (name, key) {
                let _this = this;
                util.publicpost('/material/listByShipperId', {shipperId: key}, function (
                    res
                ) {
                    if (res.success) {
                        _this.editForm.materialId = '';
                        _this[name] = res.data;
                    } else {
                    }
                    _this.editLoading = false;
                });
            },
            handleLook: function (row) {
                let _this = this;
                let ids = row.id;
                _this.listLoading = true;
                // if (this.sel.length > 1) {
                //   this.lookFormVisible = false;
                //   this.$message({
                //     showClose: true,
                //     message: '请勾选一条数据',
                //     type: 'warning'
                //   });
                // }
                // if (ids === '') {
                //   this.lookFormVisible = false;
                //   this.$message({
                //     showClose: true,
                //     message: '请先勾选数据',
                //     type: 'warning'
                //   });
                // } else {
                util.publicpost(
                    '/shipperWarehouseStrategy/getShipperWarehouseStrategyById',
                    {shipperWarehouseStrategyId: ids},
                    function (res) {
                        _this.listLoading = false;
                        _this.lookFormVisible = true;
                        _this.lookForm = res.data;
                    }
                );
                // }
            },
            // 新增的保存
            addSubmit: function () {
                let shipperId = this.addForm.shipperId;
                this.addForm.shipperName = this.getShipperName(
                    shipperId,
                    this.shipperList
                );
                let warehouseId = this.addForm.warehouseId;
                this.addForm.warehouseName = this.getWarehouseName(
                    warehouseId,
                    this.warehouseList
                );
                let materialId = this.addForm.materialId;
                this.addForm.materialName = this.getMaterialName(
                    materialId,
                    this.materialList
                );
                let _this = this;
                this.$refs.addForm.validate(valid => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            _this.addLoading = true;

                            let para = Object.assign({}, _this.addForm);

                            util.publicpost(
                                '/shipperWarehouseStrategy/insertShipperWarehouseStrategy',
                                para,
                                function (res) {
                                    _this.addLoading = false;
                                    if (res.success) {
                                        _this.successMsg(_this.$t('msg.success'));
                                        _this.$refs['addForm'].resetFields();
                                        _this.addFormVisible = false;
                                        _this.resetAddData();
                                        _this.selectList();
                                    } else {
                                        let msg = '';
                                        if (!util.isEmpty(res.msg)) {
                                            msg = ',' + _this.$t(res.msg);
                                        }
                                        _this.errorMsg(_this.$t('msg.error') + msg);
                                        _this.$refs['addForm'].resetFields();
                                        _this.addFormVisible = false;
                                        _this.resetAddData();
                                        _this.selectList();
                                    }
                                    _this.dict = res.enumVal;
                                }
                            );
                        });
                    }
                });
            }
        },
        loadShipperAdd: function (item, data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].id === item) {
                    return data[i].shipperName;
                }
            }
        },
        loadWarehouseAdd: function (item, data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].id === item) {
                    return data[i].warehouseName;
                }
            }
        },
        loadMaterialAdd: function (item, data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].id === item) {
                    return data[i].materialName;
                }
            }
        },
        computed: {
            toggleDrop() {
                return this.showSearch ? 'el-icon-arrow-up' : 'el-icon-arrow-down';
            }
        },
        mounted() {
            this.selectList();
            this.getButtonList();
        }
    };
</script>
<style>

</style>
