// 订单节点分类管理
<template>
    <div class="vendor admin">
        <!-- 查询模块 -->
        <div class="query-top">
            <em name="" class="fl el-icon-search"></em>
            <h6 class="fl titleInfo">{{ $t('common.searchInfo') }}</h6>
            <el-button plain class="fr" :icon="toggleDrop" @click="showSearch = !showSearch"></el-button>
        </div>
        <el-collapse-transition>
            <div v-show="showSearch">
                <div class="query-content transDrop">
            <el-form size="mini" :inline="true" :model="formInline" label-width="80px" class="demo-form-inline">
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                        <el-form-item label="分类名称：">
                        <el-input v-model="formInline.groupName" :placeholder="$t('common.pleaseEnter')"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                        <el-form-item label="出入库类型：">
                        <el-select v-model="formInline.inOutType" clearable :placeholder="$t('common.pleaseChoose')" class="select">
                            <el-option v-for="item in dict.inOutTypeEnum" :key="item.name" :label="item.des" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                        <el-form-item label="是否配车：">
                        <el-select v-model="formInline.transportStatus" clearable :placeholder="$t('common.pleaseChoose')" class="select">
                            <el-option v-for="item in dict.transportStatusEnum" :key="item.name" :label="item.des" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                        <el-form-item label="订单类型：">
                        <el-select v-model="formInline.orderBusinessType" clearable :placeholder="$t('common.pleaseChoose')" class="select">
                            <el-option v-for="item in dict.orderBusinessTypeEnum" :key="item.name" :label="item.des" :value="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                        <el-form-item label="节点名称：">
                        <el-input v-model="formInline.nodeName"  :placeholder="$t('common.pleaseEnter')"></el-input>
                    </el-form-item>
                    </el-col>
                </el-row>
                <div class="footer-but tar pad_r pad_t">
                    <el-button type="primary" @click="getNodeGroup">查询</el-button>
                    <el-button @click="resetForm">重置</el-button>
                </div>
            </el-form>
        </div>
            </div>
        </el-collapse-transition>

        <!--新增、删除-->
        <div class="add_move def-but">
            <el-button @click="handleAdd" class="nodeGroup_add hide" >{{ $t('button.add') }}</el-button>
            <!--<el-button @click="handleEdit" :disabled="this.sel.length===0">修改</el-button>-->
           <!-- <el-button @click="handleLook" :disabled="this.sel.length===0">查看</el-button>-->
            <!--<el-button @click="handleStart" :disabled="this.sel.length===0">启用</el-button>-->
            <!--<el-button @click="handleForbidden" :disabled="this.sel.length===0">禁用</el-button>-->
            <!--<el-button @click="batchRemove" :disabled="this.sel.length===0">删除</el-button>-->
        </div>

        <!-- 列表 -->
        <div class="list list_operation">
            <el-table highlight-current-row stripe :data="nodeGroupList" @selection-change="selChange"
                      style="width: 100%;" border :fit="true"  border align="center" :height="tableListHeight">
                <!--<el-table-column type="selection" align="center" isEditing="false" width="55" @click="selChange(1)"></el-table-column>-->
                <el-table-column label="序号" align="center" type="index" width="50"></el-table-column>
                <el-table-column label="分类名称" width="180" prop="groupName" align="center" text-overflow="ellipsis" show-overflow-tooltip>
                    <template slot-scope="scope" >
                        <div class="hand"  @click="handleLook(scope.row.id)">{{scope.row.groupName}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="出入库类型" width="140" prop="inOutType" align="center" text-overflow="ellipsis" show-overflow-tooltip :formatter="formatInOutType"></el-table-column>
                <el-table-column label="是否配车"  prop="transportStatus" align="center" text-overflow="ellipsis" show-overflow-tooltip :formatter="formatTransportStatus"></el-table-column>
                <el-table-column label="订单类型"  prop="orderBusinessType" align="center" text-overflow="ellipsis" show-overflow-tooltip :formatter="formatOrderBusinessType"></el-table-column>
                <el-table-column label="节点名称" width="180" prop="nodeName" align="center" text-overflow="ellipsis" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-input @blur="handleBlur(scope.row)" v-if="scope.row.isEditing" v-model="scope.row.nodeName"></el-input>
                        <div slot="reference" class="name-wrapper" v-if="!scope.row.isEditing" >
                            {{ scope.row.nodeName }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="状态" prop="status" align="center">
                    <template slot-scope="scope">
                        <el-select v-if="scope.row.isEditing" v-model="scope.row.status">
                            <el-option label="有效" value="AVAILABILITY">有效</el-option>
                            <el-option label="无效" value="INEFFECTIVENESS">无效</el-option>
                        </el-select>
                        <div v-if="!scope.row.isEditing">
                            {{
                            scope.row.status === 'INEFFECTIVENESS' ? '无效'  : '有效'
                            }}
                        </div>
                    </template>
                </el-table-column>
                <!--<el-table-column label="创建人" prop="creater" align="center">-->
                    <!--<template slot-scope="scope">-->
                        <!--<el-input @blur="handleBlur(scope.row)" v-if="scope.row.isEditing" v-model="scope.row.creater"></el-input>-->
                        <!--<div slot="reference" class="name-wrapper" v-if="!scope.row.isEditing">-->
                            <!--{{ scope.row.creater }}-->
                        <!--</div>-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column label="创建时间" prop="createTime" align="center" text-overflow="ellipsis" :formatter="formatter" show-overflow-tooltip></el-table-column>-->
                <el-table-column label="修改人" prop="updater" align="center">
                    <template slot-scope="scope">
                        <el-input @blur="handleBlur(scope.row)" v-if="scope.row.isEditing" v-model="scope.row.updater"></el-input>
                        <div slot="reference" class="name-wrapper" v-if="!scope.row.isEditing">
                            {{ scope.row.updater }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="修改时间" prop="updateTime" align="center" text-overflow="ellipsis" :formatter="formatterUpdate" show-overflow-tooltip></el-table-column>
                <el-table-column fixed="right" :label="$t('commonThead.operation')" align="center" width="170">
                    <template slot-scope="scope">
                        <div @click="handleEdit(scope.row)" v-if="permissions('nodeGroup_update')">
                            <el-tooltip content="修改" placement="top" effect="light">
                                <div class="operation_icon icon1"></div>
                            </el-tooltip>
                        </div>
                        <div @click="handleStart(scope.row)" v-if="scope.row.status === 'INEFFECTIVENESS'" >
                            <el-tooltip content="启用" placement="top" effect="light" class="nodeGroup_enable hide">
                                <div class="operation_icon icon2"></div>
                            </el-tooltip>
                        </div>
                        <div @click="handleForbidden(scope.row)" v-if="scope.row.status === 'AVAILABILITY'" >
                            <el-tooltip content="禁用" placement="top" effect="light" class="nodeGroup_disable hide" >
                                <div class="operation_icon icon3"></div>
                            </el-tooltip>
                        </div>
                        <div @click="batchRemove(scope.row)" v-if="permissions('nodeGroup_delete')">
                            <el-tooltip content="删除" placement="top" effect="light">
                                <div class="operation_icon icon4"></div>
                            </el-tooltip>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 工具条 -->
            <el-col :span="24" class="toolbar">
                <em class="el-icon-refresh fr mar_lr table-refresh"></em>
                <div class="block fr">
                    <el-pagination
                            @current-change="pageChange"
                            @size-change="sizeChange"
                            :page-sizes="[5, 10, 20, 50]"
                            layout="total,sizes, prev, pager, next, jumper"
                            :current-page="this.pager.page"
                            :page-size="this.pager.rows"
                            :total="this.pager.total">
                    </el-pagination>
                </div>
            </el-col>
        </div>


        <!-- 添加、修改、查看界面 -->
        <el-dialog :visible.sync="addFormVisible" :title="this.titles" :close-on-click-modal="false" class="default-dialog" style="line-height: 0;overflow: hidden;font-size: 12px;">
            <div class="form form-add" >
                <el-form :model="addForm" label-width="86px" :rules="addFormRules" ref="addForm" size="mini">
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="分类名称:" prop="groupName">
                                    <el-input v-model="addForm.groupName" :disabled="onlyRead" :maxlength='15'></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="出入库类型：" prop="inOutType" >
                                    <el-select v-model="addForm.inOutType" clearable placeholder="请选择" class="select" :disabled="onlyRead">
                                        <el-option v-for="item in dict.inOutTypeEnum" :key="item.name" :label="item.des" :value="item.name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="是否配车：" prop="transportStatus">
                                    <el-select v-model="addForm.transportStatus" clearable placeholder="请选择" class="select" :disabled="onlyRead">
                                        <el-option v-for="item in dict.transportStatusEnum" :key="item.name" :label="item.des" :value="item.name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>


                        <el-input v-model="addForm.nodeName" v-show="false"></el-input>


                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="订单类型：" prop="orderBusinessType">
                                    <el-select v-model="addForm.orderBusinessType" clearable placeholder="请选择" class="select" :disabled="onlyRead">
                                        <el-option v-for="item in dict.orderBusinessTypeEnum" :key="item.name" :label="item.des" :value="item.name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>

                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="节点名称:" prop="nodeName">
                                    <el-select
                                            v-model="addForm.nodeId"
                                            filterable
                                            remote
                                            reserve-keyword
                                            placeholder="请输入关键词"
                                            :remote-method="nodeNameMethod"
                                            :disabled="onlyRead">
                                        <el-option
                                                v-for="item in nodeList"
                                                :key="item.id"
                                                :label="item.nodeName"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>

                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="配送方式：" prop="deliveryMode">
                                    <el-select v-model="addForm.deliveryMode" clearable placeholder="请选择" class="select" :disabled="onlyRead">
                                        <el-option v-for="item in dict.deliveryModeEnum" :key="item.name" :label="item.des" :value="item.name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>

                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="序号:" prop="numSort">
                                    <el-input v-model.number="addForm.numSort" :disabled="onlyRead" :maxlength='5'></el-input>
                                </el-form-item>
                            </div>
                        </el-col>

                </el-form>
            </div>
            <div slot="footer" class="dialog-footer def-but">
                <el-button @click.native="addSubmit" v-show="this.addSubmitVisible">{{ $t('button.save') }}</el-button>
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
                // 分页
                pager: {
                    page: 1,
                    rows: 20,
                    total: 0
                },
                loading: false,
                dict: '',
                visible2: false,
                onlyRead: false,
                activeName: 'first',
                formInline: {
                    groupName: '',
                    inOutType: '',
                    transportStatus: '',
                    nodeName: '',
                    orderBusinessType: ''
                },
                nodeGroupList: [],
                nodeList: [],
                total: 0,
                type: '',
                page: 1,
                listLoading: false,
                sel: [], // 列表选中列
                addSubmitVisible: true,
                addFormVisible: false, // 新增界面是否显示
                addLoading: false,
                addFormRules: {
                    nodeName: [
                        {required: true, message: '请输入节点名称', trigger: 'change'}
                    ],
                    inOutType: [
                        {required: true, message: '请选择出入库类型', trigger: 'change'}
                    ],
                    transportStatus: [
                        {required: true, message: '请选择是否配车', trigger: 'change'}
                    ],
                    groupName: [
                    	{required: true, message: '请输入分类名称', trigger: 'blur'},
                        {required: true, message: '', trigger: 'blur', validator: this.validGroupName}
                    ],
                    orderBusinessType: [
                    	{required: true, message: '请选择订单类型', trigger: 'change'}
                    ],
                    deliveryMode: [
                    	{required: true, message: '请选择配送方式', trigger: 'change'}
                    ],
                    numSort: [
                    	{required: true, message: '请输入序号', trigger: 'blur'},
                    	{type: 'number', message: '请输入数字', trigger: 'blur'}
                    ]
                },
                addForm: {
                    id: '',
                    groupName: '',
                    inOutType: '',
                    transportStatus: '',
                    numSort: '',
                    nodeId: '',
                    nodeName: '',
                    orderBusinessType: '',
                    deliveryMode: ''
                },
                multipleSelection: [],
                currentPage1: 1,
                currentData: null,
                // 查询框折叠展开
                showSearch: true,
                titles: ''
            };
        },
        methods: {
            // 选择行数
            sizeChange(rows) {
                this.pager.rows = rows;
                this.getNodeGroup();
            },
            // 分页
            pageChange(page) {
                this.pager.page = page;
                this.getNodeGroup();
            },
            // 根据节点名称模糊查询
            nodeNameMethod(query) {
                if (query !== '') {
                    let _this = this;
                    _this.loading = true;
                    util.publicpost('/node/selectNodeByNodeName', {nodeName: query}, function (res) {
                        if (res.code === 0) {
                            _this.loading = false;
                            _this.nodeList = res.data;
                        } else {
                            _this.$message({
                                showClose: true,
                                message: '$(msg)',
                                type: 'error'
                            });
                        }
                    });
                }
            },
            selChange (val) {
                this.sel = val;
            },
            // 获取地址信息列表
            getNodeGroup() {
                let _this = this;
                util.publicpost('/nodeGroup/selectNodeGroupListPage', {
                    groupName: _this.formInline.groupName,
                    inOutType: _this.formInline.inOutType,
                    transportStatus: _this.formInline.transportStatus,
                    nodeName: _this.formInline.nodeName,
                    orderBusinessType: _this.formInline.orderBusinessType,
                    sort: 'num_sort',
                    page: _this.pager.page,
                    rows: _this.pager.rows
                }, function (res) {
                    if (res.code === 0) {
                        _this.pager.total = res.pager.totalCount || 0;
                        _this.nodeGroupList = res.result;
                        console.log(_this.nodeGroupList);
                    }
                    _this.dict = res.enumVal;
                });
            },

            // 创建时间转换
            formatter(row, column) {
                return util.formatDate.format(new Date(row.createTime), 'yyyy-MM-dd hh:mm:ss');
            },
            // 修改时间转换
            formatterUpdate(row, column) {
                return row.updateTime
                    ? util.formatDate.format(new Date(row.updateTime), 'yyyy-MM-dd hh:mm:ss')
                    : '';
            },
            /**
             * 出入库类型转换
             * @param row
             * @param column
             * @returns {*}
             */
            formatInOutType(row, column) {
                let key = row.inOutType;
                let json = this.dict.inOutTypeEnum;
                return util.formatDict(json, key);
            },
            /**
             * 订单类型转换
             * @param row
             * @param column
             * @returns {*}
             */
            formatOrderBusinessType(row, column) {
                let key = row.orderBusinessType;
                let json = this.dict.orderBusinessTypeEnum;
                return util.formatDict(json, key);
            },
            /**
             * 是否配车类型转换
             * @returns {*}
             */
            formatTransportStatus(row, column) {
                let key = row.transportStatus;
                let json = this.dict.transportStatusEnum;
                return util.formatDict(json, key);
            },
            // 重置
            resetForm() {
                this.formInline.groupName = '';
                this.formInline.inOutType = '';
                this.formInline.transportStatus = '';
                this.formInline.nodeName = '';
                this.formInline.orderBusinessType = '';
            },
            // 取消
            off: function () {
                this.addFormVisible = false;
                this.editFormVisible = false;
                this.lookFormVisible = false;
            },
            // 添加
            handleAdd: function () {
                this.titles = '添加数据';
                this.nodeList = [];
                this.addFormVisible = true;
                this.addSubmitVisible = true;
                this.onlyRead = false;
                this.addForm = {
                    groupName: '',
                    inOutType: '',
                    transportStatus: '',
                    numSort: '',
                    nodeId: '',
                    nodeName: '',
                    orderBusinessType: '',
                    deliveryMode: ''
                };
            },

            /**
             * 获取节点名称
             * @param id
             * @param data
             */
            getNodeName(id, data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].id === id) {
                        return data[i].nodeName;
                    }
                }
            },

            // 修改
            handleEdit: function (row) {
                    let id = row.id;
                    let _this = this;
                    _this.nodeList = [];
                    _this.titles = '修改数据';
                    util.publicpost('/nodeGroup/selectNodeGroupById', {id: id}, function (res) {
                        if (res.code === 0) {
                            _this.addForm = res.data;
                            _this.addFormVisible = true;
                            _this.addSubmitVisible = true;
                            _this.onlyRead = false;
                            if (res.data !== null) {
                                let map = {'id': res.data.nodeId, 'nodeName': res.data.nodeName};
                                _this.nodeList.push(map);
                            }
                        } else {
                            _this.$message({
                                showClose: true,
                                message: '获取失败',
                                type: 'error'
                            });
                        }
                    });
                // }
            },

            addSubmit: function () {
                let nodeId = this.addForm.nodeId;
                this.addForm.nodeName = this.getNodeName(nodeId, this.nodeList);
                let _this = this;
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        // 节点编码
                        _this.addForm.nodeCode = _this.nodeList.find(item => item.id.toString() === _this.addForm.nodeId.toString()).nodeCode;
                        _this.addForm.nodeName = _this.nodeList.find(item => item.id.toString() === _this.addForm.nodeId.toString()).nodeName;
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        _this.addLoading = true;
                        let id = this.addForm.id;
                        let para = Object.assign({}, _this.addForm);
                        console.log(para);
                        if (id) {
                            _this.addForm.nodeName = this.getNodeName(_this.addForm.nodeId, _this.nodeList);
                            let para = Object.assign({}, _this.addForm);
                            util.publicpost('/nodeGroup/updateNodeGroup', para, function (res) {
                                if (res.code === 0) {
                                    _this.addLoading = false;
                                    _this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    _this.$refs['addForm'].resetFields();
                                    _this.addFormVisible = false;
                                    _this.getNodeGroup();
                                } else {
                                    _this.$message({
                                        showClose: true,
                                        message: '提交失败！',
                                        type: 'error'
                                    });
                                }
                            });
                        } else {
                            util.publicpost('/nodeGroup/saveNodeGroup', para, function (res) {
                                _this.addLoading = false;
                                if (res.success) {
                                    _this.successMsg('添加成功');
                                    _this.$refs['addForm'].resetFields();
                                    _this.addFormVisible = false;
                                    _this.getNodeGroup();
                                } else {
                                    _this.errorMsg(res.msg);
                                    // _this.$refs['addForm'].resetFields();
                                }
                                // _this.dict = res.enumVal;
                            });
                        }
                        });
                    }
                });
            },
            // 修改的保存
            editSubmit: function () {
                let _this = this;
                _this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        _this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            _this.editLoading = true;
                            _this.editForm.id = this.sel.map(item => item.id).toString();
                            _this.editForm.nodeName = this.getNodeName(_this.editForm.nodeId, _this.nodeList);
                            let para = Object.assign({}, _this.editForm);
                            console.log(para);
                            util.publicpost('/nodeGroup/updateNodeGroup', para, function (res) {
                                if (res.code === 0) {
                                    _this.editLoading = false;
                                    _this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    _this.$refs['editForm'].resetFields();
                                    _this.editFormVisible = false;
                                    _this.getNodeGroup();
                                } else {
                                    _this.editFormVisible = false;
                                    _this.$message({
                                        showClose: true,
                                        message: '提交失败！',
                                        type: 'error'
                                    });
                                }
                            });
                        });
                    }
                });
            },

            // 批量删除
            batchRemove: function (row) {
                console.log(row)
                let _this = this;
                let ids = row.id;
                _this.listLoading = true;
                _this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    util.publicpost('/nodeGroup/removeNodeGroupBatch', {ids: ids}, function (res) {
                        if (res.code === 0) {
                            _this.$message({
                                showClose: true,
                                message: '删除成功',
                                type: 'success'
                            });
                            _this.getNodeGroup();
                        } else {
                            _this.$message({
                                showClose: true,
                                message: '删除失败',
                                type: 'error'
                            });
                        }
                    });
                });
            },

            // 启用
            handleStart: function(row) {
                let _this = this;
                let ids = row.id;
                _this.listLoading = true;
                util.publicpost('/nodeGroup/enableNodeGroup', {ids: ids}, function (res) {
                    if (res.code === 0) {
                        _this.$message({
                            showClose: true,
                            message: '启用成功',
                            type: 'success'
                        });
                        _this.getNodeGroup();
                    } else {
                        _this.$message({
                            showClose: true,
                            message: '启用失败',
                            type: 'error'
                        });
                    }
                });
            },

            // 禁用
            handleForbidden: function(row) {
                let _this = this;
                let ids = row.id;
                _this.listLoading = true;
                util.publicpost('/nodeGroup/disableNodeGroup', {ids: ids}, function (res) {
                    if (res.code === 0) {
                        _this.$message({
                            showClose: true,
                            message: '禁用成功',
                            type: 'success'
                        });
                        _this.getNodeGroup();
                    } else {
                        _this.$message({
                            showClose: true,
                            message: '禁用失败',
                            type: 'error'
                        });
                    }
                });
            },
            // 显示查看界面
            handleLook: function (id) {
                let _this = this;
                if (id === '') {
                    this.lookFormVisible = false;
                    this.$message({
                        showClose: true,
                        message: '请择选数据',
                        type: 'warning'
                    });
                } else {
                    _this.titles = '查看数据';
                    util.publicpost('/nodeGroup/selectNodeGroupById', {id: id}, function (res) {
                        if (res.code === 0) {
                            _this.addForm = res.data;
                            _this.addFormVisible = true;
                            if (res.data !== null) {
                                let map = {'id': res.data.nodeId, 'nodeName': res.data.nodeName};
                                _this.nodeList.push(map);
                            }
                            _this.addSubmitVisible = false;
                            _this.onlyRead = true;
                        } else {
                            _this.$message({
                                showClose: true,
                                message: '获取失败',
                                type: 'error'
                            });
                        }
                    });
                }
            },
            // 分类名称
            validGroupName(rule, value, callback) {
                util.stripscriptName(rule, value, callback);
            }
        },
        computed: {
            toggleDrop() {
                return this.showSearch ? 'el-icon-arrow-up' : 'el-icon-arrow-down';
            },
            tableListHeight() {
                let computedHeight = $(window).height() - $('.transDrop').height() - $('.add_move').height() - 85;
                return (this.nodeGroupList && this.nodeGroupList.length > 0) ? computedHeight : '120';
            }
        },
        mounted() {
            this.getNodeGroup();
            this.getButtonList();
        }
    };
</script>

<style>
    .name-wrapper{
        width: 100%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    ul li{
        list-style: none;
    }
    .el-form-item {
        line-height: 0;
    }

    .block {
        float: right;
    }

    .el-table--border:after, .el-table--group:after {
        height: 100%;
    }
    .el-form-item__label{
        line-height: 30px;
    }
    .el-main {
        line-height: 0;
    }
    .form-add .el-row{
        padding: 0 0 60px 0;
    }

    .el-table-column {
        height: 30px;
    }

    .el-table-column {
        text-align: center;
    }


    .list {
        width: 100%;
        bottom: 0;
    }

    .toolbar {
        height: 30px;
        z-index: 3;
        bottom: 0;
    }

    .select {
        width: 100%;
    }

    .time {
        width: 100%;
    }
    .material{
        width: 100%;
    }
    .search{
        width: 200px;
    }
    .all_material,.sel_material{
        color: #333333;
        font-family: PingFangSC-Semibold;
    }
    .list_all{
        width: 240px;
        height: 165px;
        overflow: auto;
    }
    /*滚动条样式*/
    .list_all::-webkit-scrollbar {/*滚动条整体样式*/
        width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 4px;
    }
    .list_all::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: rgba(0,0,0,0.2);
    }
    .list_all::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 0;
        background: rgba(0,0,0,0.1);
    }
    .sel_mate{
        margin-top: 20px;
    }
    .sel_mate .el-tag{

        height: 30px;
        background: #FFFFFF;
        border: 1px solid #E7E7E7;
        border-radius: 50px;
    }
    /*.el-dialog{*/
        /*width: 900px;*/
        /*height: 480px;*/
    /*}*/
    .el-form--inline .el-form-item__content{
        width: 200px;
        vertical-align: middle;
    }
    /*.el-dialog__footer{*/
        /*padding: 0 70px 30px 0 !important;*/
    /*}*/
    /*滚动条样式*/
    .form::-webkit-scrollbar {/*滚动条整体样式*/
        width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 4px;
    }
    .form::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: rgba(0,0,0,0.2);
    }
    .form::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 0;
        background: rgba(0,0,0,0.1);
    }
</style>
