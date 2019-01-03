// 货主管理 yzp测试
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
                    <el-form size="mini" :inline="true" label-width="100px" :model="formInline" class="demo-form-inline"
                             status-icon ref="formInline">
                        <el-row :gutter="10">
                            <el-col :xs="24" :sm="12" :lg="8" :xl="6">
                                <el-form-item label="货主名称：">
                                    <el-input v-model="formInline.shipperName"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="12" :lg="8" :xl="6">
                                <el-form-item label="货主代码：">
                                    <el-input v-model="formInline.shipperCode"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="12" :lg="8" :xl="6">
                                <el-form-item label="货主类型：">
                                    <el-select v-model="formInline.shipperType" placeholder="请选择">
                                        <el-option
                                                v-for="item in this.dict.shipperTypeEnum"
                                                :key="item.name"
                                                :label="item.des"
                                                :value="item.name">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="12" :lg="8" :xl="6">
                                <el-form-item label="联系人：">
                                    <el-input v-model="formInline.contactPerson"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="12" :lg="8" :xl="6">
                                <el-form-item label="联系电话：">
                                    <el-input v-model="formInline.telephone"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="12" :lg="8" :xl="6">
                                <el-form-item label="服务类型：">
                                    <el-select v-model="formInline.services" placeholder="请选择">
                                        <el-option
                                                v-for="item in this.dict.servicesEnum"
                                                :key="item.name"
                                                :label="item.des"
                                                :value="item.name">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="footer-but tar pad_r pad_t">
                            <el-button type="primary" @click="getShipper()">{{ $t('button.query') }}</el-button>
                            <el-button @click="resetForm()">{{ $t('button.reset') }}</el-button>
                        </div>
                    </el-form>
                </div>
            </div>
        </el-collapse-transition>

        <!--新增、删除-->
        <div class="add_move def-but">
            <el-button @click="handleAdd">{{ $t('button.add') }}</el-button>
            <el-button @click="handleEdit" :disabled="this.sels.length===0">{{ $t('button.update') }}</el-button>
            <el-button @click="handleStart" :disabled="this.sels.length===0">{{ $t('button.enable') }}</el-button>
            <el-button @click="handleForbidden" :disabled="this.sels.length===0">{{ $t('button.disable') }}</el-button>
            <el-button @click="batchRemove" :disabled="this.sels.length===0">{{ $t('button.delete') }}</el-button>
            <el-button @click="centerDialogVisible = true">{{ $t('button.importExcel') }}</el-button>
            <el-button @click="download">{{ $t('button.exportExcel') }}</el-button>
        </div>

        <!-- 列表 -->
        <div class="list">
            <el-table :data="users" stripe v-loading="listLoading" @selection-change="selsChange"
                      style="width: 100%;" :fit="true" border align="center" @sort-change="sortChange">
                <el-table-column type="selection" align="center" isEditing="true" width="55"
                                 @click="selsChange(1)"></el-table-column>
                <el-table-column label="序号" align="center" type="index" width="50"></el-table-column>
                <el-table-column label="货主名称" prop="shipperName" align="center" isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column label="货主编码" prop="shipperCode" width="120" align="center" sortable="custom"
                                 isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column label="货主简称" prop="shortName" align="center" isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column label="货主类型" prop="shipperType" align="center" isEditing="true"
                                 :formatter="formatterShipperType"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column label="服务类型" prop="services" align="center" isEditing="true"
                                 :formatter="formatterServiceType"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column label="上线时间" prop="onlineTime" align="center" isEditing="true"
                                 :formatter="formatterOnline"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column label="国家名称" prop="countryName" align="center" isEditing="true"></el-table-column>
                <el-table-column label="省名称" prop="provinceName" align="center" isEditing="true"></el-table-column>
                <el-table-column label="市名称" prop="cityName" align="center" isEditing="true"></el-table-column>
                <el-table-column label="区县名称" prop="districtName" align="center" isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column label="街道名称" prop="streetName" align="center" isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column label="地址" prop="address" align="center" isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column label="邮编" prop="postcode" align="center" isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column label="联系人" prop="contactPerson" align="center" isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column label="联系电话" prop="telephone" align="center" isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column label="上级货主名称" prop="parentName" width="130" align="center" isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column label="创建人" prop="creater" align="center" isEditing="true"></el-table-column>
                <el-table-column label="创建时间" prop="createTime" align="center" isEditing="true" :formatter="formatter"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column label="最后修改人" prop="updater" width="130" align="center" isEditing="true"
                                 show-overflow-tooltip></el-table-column>
                <el-table-column label="最后修改时间" prop="updateTime" width="130" align="center" isEditing="true"
                                 :formatter="formatterUpdate" show-overflow-tooltip></el-table-column>
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
        <el-dialog :visible.sync="editFormVisible" :close-on-click-modal="false" title="修改数据" class="default-dialog">
            <el-form :model="editForm" label-width="110px" :rules="editFormRules" ref="editForm" size="mini">
                <el-form-item label="id" style="display:none;">
                    <el-input v-model="editForm.id"></el-input>
                </el-form-item>
                <el-row style="text-align: center">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <el-form-item label="货主名称：" prop="shipperName">
                                <el-input v-model="editForm.shipperName"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <el-form-item label="货主编码：" prop="shipperCode">
                                <el-input v-model="editForm.shipperCode"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <el-form-item label="货主简称：" prop="shortName">
                                <el-input v-model="editForm.shortName"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row style="text-align: center">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <el-form-item label="上线时间：" prop="onlineTime">
                                <el-date-picker style="width: 190px;"
                                                v-model="editForm.onlineTime"
                                                type="date"
                                                placeholder="选择日期时间">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <el-form-item label="FWMS的url：" prop="parentId">
                                <el-input v-model="editForm.servicesUrl"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <el-form-item label="地址信息：" prop="address">
                                <el-input v-model="editForm.address"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row style="text-align: center">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <el-form-item label="邮政编码：" prop="postcode">
                                <el-input v-model="editForm.postcode"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <el-form-item label="联系人：" prop="contactPerson">
                                <el-input v-model="editForm.contactPerson"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <el-form-item label="联系电话：" prop="telephone">
                                <el-input v-model="editForm.telephone"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <el-form-item label="服务：" prop="services">
                                <el-select v-model="editForm.services" filterable placeholder="请选择">
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
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <el-form-item label="上级编码：" prop="partentId">
                                <!--<el-input v-model="addForm.partentId"></el-input>-->
                                <el-select
                                        v-model="editForm.partentId"
                                        filterable
                                        remote
                                        reserve-keyword
                                        placeholder="请输入关键词"
                                        :remote-method="remoteMethod">
                                    <el-option
                                            v-for="(item, index) in parentList"
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
                            <el-form-item label="货主类型：" prop="shipperType">
                                <el-select v-model="editForm.shipperType" filterable placeholder="请选择">
                                    <el-option
                                            v-for="item in this.dict.shipperTypeEnum"
                                            :key="item.name"
                                            :label="item.des"
                                            :value="item.name">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>


                <el-row style="height: 30px">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <el-form-item label="国家名称：" prop="countryName">
                                <el-select v-model="editForm.countryId"
                                           @change="addressChange('addressed', editForm.countryId)"
                                           filterable placeholder="请选择">
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
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <el-form-item label="省名称：" prop="provinceName">
                                <el-select v-model="editForm.provinceId"
                                           @change="addressChange('city', editForm.provinceId)" filterable
                                           placeholder="请选择">
                                    <el-option v-for="item in addressed"
                                               :key="item.id"
                                               :label="item.fullName"
                                               :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <el-form-item label="市名称：" prop="cityName">
                                <el-select v-model="editForm.cityId" @change="addressChange('county',editForm.cityId)"
                                           filterable
                                           placeholder="请选择">
                                    <el-option v-for="item in city"
                                               :key="item.id"
                                               :label="item.fullName"
                                               :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row style="height: 30px">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <el-form-item label="区县名称：" prop="districtName">
                                <el-select v-model="editForm.districtId"
                                           @change="addressChange('street',editForm.districtId)" filterable
                                           placeholder="请选择">
                                    <el-option v-for="item in county"
                                               :key="item.id"
                                               :label="item.fullName"
                                               :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <el-form-item label="街道名称：" prop="streetName">
                                <el-select v-model="editForm.streetId" filterable placeholder="请选择">
                                    <el-option v-for="item in street"
                                               :key="item.id"
                                               :label="item.fullName"
                                               :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editSubmit">{{ $t('button.update') }}</el-button>
                <el-button @click.native="editFormVisible = false">{{ $t('button.cancel') }}</el-button>
            </div>
        </el-dialog>

        <!-- 新增界面 -->
        <el-dialog :visible.sync="addFormVisible" :close-on-click-modal="false"
                   style="line-height: 0;overflow: hidden;font-size: 12px;" title="添加数据" class="default-dialog">
            <div class="form" style="height: 180px;">
                <el-form :model="addForm" label-width="110px" :rules="addFormRules" ref="addForm" size="mini">
                    <el-row style="text-align: center">
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="货主名称：" prop="shipperName">
                                    <el-input v-model="addForm.shipperName"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="货主编码：" prop="shipperCode">
                                    <el-input v-model="addForm.shipperCode"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="货主简称：" prop="shortName">
                                    <el-input v-model="addForm.shortName"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row style="text-align: center">
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="上线时间：" prop="onlineTime">
                                    <el-date-picker style="width: 200px;"
                                                    v-model="addForm.onlineTime"
                                                    type="date"
                                                    placeholder="选择日期时间">
                                    </el-date-picker>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="FWMS的url：" prop="parentId">
                                    <el-input v-model="addForm.servicesUrl"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="地址信息：" prop="address">
                                    <el-input v-model="addForm.address"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row style="text-align: center">
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="邮政编码：" prop="postcode">
                                    <el-input v-model="addForm.postcode"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="联系人：" prop="contactPerson">
                                    <el-input v-model="addForm.contactPerson"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="联系电话：" prop="telephone">
                                    <el-input v-model="addForm.telephone"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="服务：" prop="services">
                                    <el-select v-model="addForm.services" filterable placeholder="请选择">
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
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="上级编码：" prop="partentId">
                                    <!--<el-input v-model="addForm.partentId"></el-input>-->
                                    <el-select
                                            v-model="addForm.partentId"
                                            filterable
                                            remote
                                            reserve-keyword
                                            placeholder="请输入关键词"
                                            :remote-method="remoteMethod">
                                        <el-option
                                                v-for="(item, index) in parentList"
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
                                <el-form-item label="货主类型：" prop="shipperType">
                                    <el-select v-model="addForm.shipperType" filterable placeholder="请选择">
                                        <el-option
                                                v-for="item in this.dict.shipperTypeEnum"
                                                :key="item.name"
                                                :label="item.des"
                                                :value="item.name">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>


                    <el-row style="height: 30px">
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="国家名称：" prop="countryName">
                                    <el-select v-model="addForm.countryId"
                                               @change="addressChange('addressed', addForm.countryId)"
                                               filterable placeholder="请选择">
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
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="省名称：" prop="provinceName">
                                    <el-select v-model="addForm.provinceId"
                                               @change="addressChange('city', addForm.provinceId)" filterable
                                               placeholder="请选择">
                                        <el-option v-for="item in addressed"
                                                   :key="item.id"
                                                   :label="item.fullName"
                                                   :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="市名称：" prop="cityName">
                                    <el-select v-model="addForm.cityId" @change="addressChange('county',addForm.cityId)"
                                               filterable
                                               placeholder="请选择">
                                        <el-option v-for="item in city"
                                                   :key="item.id"
                                                   :label="item.fullName"
                                                   :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row style="height: 30px">
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="区县名称：" prop="districtName">
                                    <el-select v-model="addForm.districtId"
                                               @change="addressChange('street',addForm.districtId)" filterable
                                               placeholder="请选择">
                                        <el-option v-for="item in county"
                                                   :key="item.id"
                                                   :label="item.fullName"
                                                   :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="街道名称：" prop="streetName">
                                    <el-select v-model="addForm.streetId" filterable placeholder="请选择">
                                        <el-option v-for="item in street"
                                                   :key="item.id"
                                                   :label="item.fullName"
                                                   :value="item.id">
                                        </el-option>
                                    </el-select>
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

    </div>
</template>
<script>
    import util from '../../common/js/util';

    export default {
        // components: {ElOption},
        data() {
            return {
                parentList: [],
                formInline: {
                    shipperCode: '',
                    shipperName: '',
                    shipperType: '',
                    contactPerson: '',
                    telephone: '',
                    services: ''
                },
                users: [],
                address: [],
                addressed: [],
                city: [],
                county: [],
                street: [],
                pager: {
                    page: 1,
                    rows: 5,
                    total: 0,
                    order: 'desc',
                    sort: 'id'
                },
                type: '',
                listLoading: false,
                sels: [], // 列表选中列
                dict: '',
                editFormVisible: false, // 编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ],
                    createTime: [{type: 'date', required: true, message: '选择时间范围', trigger: 'change'}]
                },
                // 编辑界面数据
                editForm: {
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
                    shipperType: ''
                },
                addFormVisible: false, // 新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ]
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
                    shipperType: ''
                },
                centerDialogVisible: false,
                fileList: [{name: 'oms数据库', url: 'https://zhx198600.github.io/myvue/oms%E6%95%B0%E6%8D%AE%E5%BA%93'}],
                // 查询框折叠展开
                showSearch: true
            };
        },
        methods: {
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
            },
            off: function () {
                this.addFormVisible = false;
                this.editFormVisible = false;
                this.lookFormVisible = false;
            },
            // 货主列表获取
            getShipper() {
                let _this = this;
                util.publicpost('/shipper/selectShipperListPage', {
                    // util.publicpost('/shipper/selectShipperListPage', {
                    shipperCode: this.formInline.shipperCode,
                    shipperName: this.formInline.shipperName,
                    shipperType: this.formInline.shipperType,
                    contactPerson: this.formInline.contactPerson,
                    telephone: this.formInline.telephone,
                    services: this.formInline.services,
                    page: this.pager.page,
                    rows: this.pager.rows,
                    order: this.pager.order,
                    sort: this.pager.sort
                }, function (res) {
                    if (res.code === 0) {
                        _this.pager.total = res.pager.totalCount || 0;
                        res.result.forEach(item => {
                            const createTime = item.createTime ? new Date(item.createTime) : '';
                            const updateTime = item.updateTime ? new Date(item.updateTime) : '';
                            item.showCreateTime = createTime ? createTime.getFullYear() + '-' + (createTime.getMonth() + 1) + '-' +
                                createTime.getDate() : '';
                            item.showUpdateTime = updateTime ? updateTime.getFullYear() + '-' + (updateTime.getMonth() + 1) + '-' +
                                updateTime.getDate() : '';
                            item.isEditing = false;
                        });
                        _this.users = res.result;
                    }
                    _this.users.forEach(item => {
                        item.isEditing = false;
                    });
                    // 将多有的枚举值放到 dict变量里面
                    _this.dict = res.enumVal;
                });
            },

            // 禁用
            handleForbidden: function () {
                let ids = this.sels.map(item => item.id).toString();
                let _this = this;
                _this.listLoading = true;
                util.publicpost('/shipper/disableShipper', {
                    ids: ids
                }, function (res) {
                    if (res.code === 0) {
                        _this.$message({
                            showClose: true,
                            message: '禁用成功',
                            type: 'success'
                        });
                    } else {
                        _this.$message({
                            showClose: true,
                            message: '禁用失败',
                            type: 'error'
                        });
                    }
                    _this.listLoading = false;
                    _this.getShipper();
                });
            },
            // 启用
            handleStart: function () {
                let ids = this.sels.map(item => item.id).toString();
                let _this = this;
                _this.listLoading = true;
                util.publicpost('/shipper/enableShipper', {
                    ids: ids
                }, function (res) {
                    if (res.code === 1) {
                        _this.$message({
                            showClose: true,
                            message: '启用成功',
                            type: 'success'
                        });
                    } else {
                        _this.$message({
                            showClose: true,
                            message: '启用失败',
                            type: 'error'
                        });
                    }
                    _this.listLoading = false;
                    _this.getShipper();
                });
            },
            addressChange(name, key) {
                if (name === 'addressed') {
                    this.addForm.provinceId = '';
                    this.addForm.cityId = '';
                    this.addForm.districtId = '';
                    this.addForm.streetId = '';
                    this.editForm.provinceName = '';
                    this.editForm.cityName = '';
                    this.editForm.districtName = '';
                    this.editForm.streetName = '';
                }
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
                fileObj = window.open('https://zhx198600.github.io/myvue/oms数据库.xlsx', '_blank');
                fileObj.document.execCommand('saveas');
            },

            // 显示编辑界面
            handleEdit: function (index, row) {
                let _this = this;
                let ids = this.sels.map(item => item.id);
                if (ids.length === 0) {
                    _this.editFormVisible = false;
                    _this.$message({
                        showClose: true,
                        message: '请先勾选数据',
                        type: 'warning'
                    });
                } else if (ids.length > 1) {
                    _this.editFormVisible = false;
                    _this.$message({
                        showClose: true,
                        message: '只能勾选一条数据',
                        type: 'warning'
                    });
                } else {
                    _this.editFormVisible = true;
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
                    util.publicpost('/regionalAddress/selectCountryRegionalAddress', '', function (res) {
                        if (res.code === 0) {
                            _this.address = res.data;
                        } else {
                            this.$message({
                                showClose: true,
                                message: '获取失败',
                                type: 'error'
                            });
                        }
                        _this.editLoading = false;
                    });

                    util.publicpost('/shipper/selectShipperById', {id: ids[0]}, function (res) {
                        if (res.code === 0) {
                            _this.editFormVisible = true;
                            _this.editForm = res.data;
                            // 赋值给省
                            util.addressChange('addressed', _this.editForm.countryId, _this);
                            util.addressChange('city', _this.editForm.provinceId, _this);
                            util.addressChange('county', _this.editForm.cityId, _this);
                            util.addressChange('street', _this.editForm.districtId, _this);
                        } else {
                            _this.$message({
                                message: '获取信息失败',
                                type: 'error'
                            });
                        }
                    });
                }
            },
            // 根据名称模糊查询
            remoteMethod(query) {
                if (query !== '') {
                    let _this = this;
                    _this.loading = true;
                    util.publicpost('/sold/selectSoldByName', {partentName: query}, function (res) {
                        if (res.code === 0) {
                            _this.loading = false;
                            _this.soldList = res.data.map(item => {
                                return {
                                    id: item.id,
                                    label: item.partentName,
                                    value: item.id
                                };
                            });
                        } else {

                        }
                    });
                }
            },
            // 显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
                this.addForm = {
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
                if (this.addFormVisible === true) {
                    let _this = this;
                    util.publicpost('/regionalAddress/selectCountryRegionalAddress', '', function (res) {
                        if (res.code === 0) {
                            _this.address = res.data;
                        } else {
                            _this.$message({
                                showClose: true,
                                message: '获取失败',
                                type: 'error'
                            });
                        }
                        _this.editLoading = false;
                    });
                }
            },
            // 新增
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            let _this = this;
                            _this.addLoading = true;
                            let districtid = this.addForm.districtId;
                            this.addForm.districtName = util.loadadds(districtid, this.county);
                            let countryid = this.addForm.countryId;
                            this.addForm.countryName = util.loadadds(countryid, this.address);
                            let provinceid = this.addForm.provinceId;
                            this.addForm.provinceName = util.loadadds(provinceid, this.addressed);
                            let cityid = this.addForm.cityId;
                            this.addForm.cityName = util.loadadds(cityid, this.city);
                            let streeid = this.addForm.streetId;
                            this.addForm.streetName = util.loadadds(streeid, this.street);
                            let para = Object.assign({}, this.addForm);
                            util.publicpost('/shipper/saveShipper', para, function (res) {
                                    if (res.code === 0) {
                                        _this.$message({
                                            message: '添加成功',
                                            type: 'success'
                                        });
                                    } else {
                                        _this.$message({
                                            message: '添加失败',
                                            type: 'error'
                                        });
                                    }
                                    _this.addLoading = false;
                                }
                            );
                        });
                    }
                });
            },
            // 修改
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            let _this = this;
                            _this.addLoading = true;
                            let districtid = this.editForm.districtId;
                            this.editForm.districtName = util.loadadds(districtid, this.county);
                            let countryid = this.editForm.countryId;
                            this.editForm.countryName = util.loadadds(countryid, this.address);
                            let provinceid = this.editForm.provinceId;
                            this.editForm.provinceName = util.loadadds(provinceid, this.addressed);
                            let cityid = this.editForm.cityId;
                            this.editForm.cityName = util.loadadds(cityid, this.city);
                            let streeid = this.editForm.streetId;
                            this.editForm.streetName = util.loadadds(streeid, this.street);
                            let para = Object.assign({}, this.editForm);
                            util.publicpost('/shipper/updateShipperById', para, function (res) {
                                    if (res.code === 0) {
                                        _this.$message({
                                            message: '修改成功',
                                            type: 'success'
                                        });
                                        _this.off();
                                        _this.getShipper();
                                    } else {
                                        _this.$message({
                                            message: '修改失败',
                                            type: 'error'
                                        });
                                    }
                                    _this.addLoading = false;
                                }
                            );
                        });
                    }
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            // 批量删除
            batchRemove: function () {
                let ids = this.sels.map(item => item.id).toString();
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    let _this = this;
                    _this.listLoading = true;
                    util.publicpost('/shipper/removeShipperBatch', {
                        ids: ids
                    }, function (res) {
                        if (res.code === 0) {
                            _this.$message({
                                showClose: true,
                                message: '删除成功',
                                type: 'success'
                            });
                        } else {
                            _this.$message({
                                showClose: true,
                                message: '删除失败',
                                type: 'error'
                            });
                        }
                        _this.listLoading = false;
                        _this.getShipper();
                    });
                }).catch(error => console.log(error));
            },
            // 创建时间转换
            formatter(row, column) {
                return util.formatDate.format(new Date(row.createTime), 'yyyy-MM-dd hh:mm:ss');
            },
            formatterOnline(row, column) {
                return util.formatDate.format(new Date(row.onlineTime), 'yyyy-MM-dd hh:mm:ss');
            },
            // 修改时间转换
            formatterUpdate(row, column) {
                return row.updateTime
                    ? util.formatDate.format(new Date(row.updateTime), 'yyyy-MM-dd hh:mm:ss')
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
            }
        },
        computed: {
            toggleDrop() {
                return this.showSearch ? 'el-icon-arrow-up' : 'el-icon-arrow-down';
            }
        },
        mounted() {
            this.getShipper();
        }
    };
</script>
<style>
</style>
