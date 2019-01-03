// 售达方管理
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
                                <el-form-item :label="$t('soldThead.soldCode') + '：'">
                                    <el-input v-model="formInline.soldCode" :placeholder="$t('common.pleaseEnter') + $t('soldThead.soldCode')"
                                              :maxlength='30'></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item :label="$t('soldThead.soldName') + '：'">
                                    <el-input v-model="formInline.soldName" :placeholder="$t('common.pleaseEnter') + $t('soldThead.soldName')"
                                              :maxlength='100'></el-input>
                                </el-form-item>
                            </el-col>
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
                            <el-col :xs="24" :sm="8" :lg="6" :xl="6">
                                <el-form-item :label="$t('commonThead.status') + '：'">
                                    <el-select v-model="formInline.status" clearable :placeholder="$t('common.pleaseChoose')" class="select">
                                        <el-option v-for="item in dict.status" :key="item.name" :label="item.des"
                                                   :value="item.name"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <div class="footer-but tar pad_r pad_t">
                            <el-button type="primary" @click="getUser">{{ $t('button.query') }}</el-button>
                            <el-button @click="resetForm('formInline')">{{ $t('button.reset') }}</el-button>
                        </div>
                    </el-form>
                </div>
            </div>
        </el-collapse-transition>

        <!--新增、删除-->
        <div class="add_move def-but">
            <el-button @click="handleAdd" v-if="permissions('base_sold_add')">{{ $t('button.add') }}</el-button>

        </div>

        <!-- 列表 -->
        <div class="list_vendor list_operation">
            <el-table highlight-current-row stripe :data="users" v-loading="listLoading" @selection-change="selsChange"
                      style="width: 100%;" border :fit="true" align="center">
                <!-- <el-table-column type="selection" align="center" isEditing="false" width="55" @click="selsChange(1)"></el-table-column> -->
                <el-table-column :label="$t('commonThead.index')" align="center" type="index" width="50"></el-table-column>
                <el-table-column :label="$t('soldThead.soldCode')" width="120" prop="soldCode" align="center" sortable
                                 text-overflow="ellipsis" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-input @blur="handleBlur(scope.row)" v-if="scope.row.isEditing"
                                  v-model="scope.row.soldCode"></el-input>
                        <div slot="reference" v-else-if="permissions('base_shipper_detail')" @click="handleLook(scope.row)" class="name-wrapper hand">
                            {{ scope.row.soldCode }}
                        </div>
                        <div slot="reference" v-else class="name-wrapper hand">
                            {{ scope.row.soldCode }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('soldThead.soldName')" width="100" prop="soldName" align="center" text-overflow="ellipsis"
                                 show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-input @blur="handleBlur(scope.row)" v-if="scope.row.isEditing"
                                  v-model="scope.row.soldName"></el-input>
                        <div slot="reference" class="name-wrapper" v-if="!scope.row.isEditing">
                            {{ scope.row.soldName }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('soldThead.shortName')" width="100" prop="shortName" align="center" text-overflow="ellipsis"
                                 show-overflow-tooltip>
                    <template slot-scope="scope">

                        <el-input @blur="handleBlur(scope.row)" v-if="scope.row.isEditing"
                                  v-model="scope.row.shortName"></el-input>
                        <div slot="reference" class="name-wrapper" v-if="!scope.row.isEditing">
                            {{ scope.row.shortName }}
                        </div>
                    </template>
                </el-table-column>
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
                <el-table-column :label="$t('commonThead.address')" prop="address" align="center" text-overflow="ellipsis"
                                 show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-input @blur="handleBlur(scope.row)" v-if="scope.row.isEditing"
                                  v-model="scope.row.address"></el-input>
                        <div slot="reference" class="name-wrapper" v-if="!scope.row.isEditing">
                            {{ scope.row.address }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('commonThead.status')" prop="status" align="center" :formatter="formatStatus">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.status" clearable placeholder="请选择" class="select"
                                   v-if="scope.row.isEditing">
                            <el-option v-for="item in dict.status" :key="item.name" :label="item.des"
                                       :value="item.name"></el-option>
                        </el-select>
                        <div v-if="!scope.row.isEditing">
                            {{formatStatus(scope.row)}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('commonThead.contactPerson')" prop="contactPerson" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-input @blur="handleBlur(scope.row)" v-if="scope.row.isEditing"
                                  v-model="scope.row.contactPerson"></el-input>
                        <div slot="reference" class="name-wrapper" v-if="!scope.row.isEditing">
                            {{ scope.row.contactPerson }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('commonThead.telephone')" prop="telephone" align="center" text-overflow="ellipsis"
                                 show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-input @blur="handleBlur(scope.row)" v-if="scope.row.isEditing"
                                  v-model="scope.row.telephone"></el-input>
                        <div slot="reference" class="name-wrapper" v-if="!scope.row.isEditing">
                            {{ scope.row.telephone }}
                        </div>
                    </template>
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
                <el-table-column :label="$t('commonThead.updater')" prop="updater" align="center">
                    <template slot-scope="scope">
                        <el-input @blur="handleBlur(scope.row)" v-if="scope.row.isEditing"
                                  v-model="scope.row.updater"></el-input>
                        <div slot="reference" class="name-wrapper" v-if="!scope.row.isEditing">
                            {{ scope.row.updater }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column width="160" :label="$t('commonThead.updateTime')" prop="updateTime" :formatter="formatterUpdate" align="center"
                                 text-overflow="ellipsis" show-overflow-tooltip>
                </el-table-column>
                <el-table-column fixed="right" :label="$t('commonThead.operation')" align="center" width="170">
                    <template slot-scope="scope">
                        <div @click="handleEdit(scope.row)" >
                            <el-tooltip content="修改" placement="top" effect="light" v-if="permissions('base_sold_update')">
                                <div class="operation_icon icon1"></div>
                            </el-tooltip>
                        </div>
                        <div @click="handleStart(scope.row)" v-if="scope.row.status === 'INEFFECTIVENESS'">
                            <el-tooltip content="启用" placement="top" effect="light" v-if="permissions('base_sold_enable')">
                                <div class="operation_icon icon2"></div>
                            </el-tooltip>
                        </div>
                        <div @click="handleForbidden(scope.row)" v-if="scope.row.status === 'AVAILABILITY'">
                            <el-tooltip content="禁用" placement="top" effect="light" v-if="permissions('base_sold_disable')">
                                <div class="operation_icon icon3"></div>
                            </el-tooltip>
                        </div>
                        <el-tooltip content="删除" placement="top" effect="light" v-if="permissions('base_sold_delete')">
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


        <!-- 新增界面 -->

        <el-dialog :visible.sync="addFormVisible" :close-on-click-modal="false"
                   style="line-height: 0;overflow: hidden;font-size: 12px;" title="新增数据" class="default-dialog">
            <div class="form form-add" style="height: 130px;">
                <el-form :model="addForm" label-width="90px" :rules="addFormRules" ref="addForm" size="mini">
                    <el-row style="text-align: center">
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="售达方代码:" prop="soldCode">
                                    <el-tooltip content="最多输入30个字符" placement="right" effect="light">
                                        <el-input v-model="addForm.soldCode" :maxlength='30'></el-input>
                                    </el-tooltip>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="售达方全称:" prop="soldName">
                                    <el-tooltip content="最多输入100个字符" placement="right" effect="light">
                                        <el-input v-model="addForm.soldName" :maxlength='100'></el-input>
                                    </el-tooltip>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="售达方简称:" prop="shortName">
                                    <el-tooltip content="最多输入100个字符" placement="right" effect="light">
                                        <el-input v-model="addForm.shortName" :maxlength='100'></el-input>
                                    </el-tooltip>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="国家名称:" prop="countryId">
                                    <el-select v-model="addForm.countryId"
                                               @change="addressChange('addressed', addForm.countryId)" filterable
                                               placeholder="请选择">
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
                                <el-form-item label="省名称:" prop="provinceId">
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
                                <el-form-item label="市名称:" prop="cityId">
                                    <el-select v-model="addForm.cityId" @change="addressChange('county',addForm.cityId)"
                                               filterable placeholder="请选择">
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
                    <el-row>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="区县名称:" prop="districtId">
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
                                <el-form-item label="街道名称:" prop="streetId">
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
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="邮政编码:" prop="postcode">
                                    <el-tooltip content="最多输入6个字符" placement="right" effect="light">
                                        <el-input v-model="addForm.postcode" :maxlength='6'></el-input>
                                    </el-tooltip>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="联系人:" prop="contactPerson">
                                    <el-tooltip content="最多输入100个字符" placement="right" effect="light">
                                        <el-input v-model="addForm.contactPerson" :maxlength='100'></el-input>
                                    </el-tooltip>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="联系电话:" prop="telephone">
                                    <el-tooltip content="最多输入11个字符" placement="right" effect="light">
                                        <el-input v-model="addForm.telephone" :maxlength='11'></el-input>
                                    </el-tooltip>
                                </el-form-item>
                            </div>
                        </el-col>
                        <!--<el-col :span="8">-->
                            <!--<div class="grid-content bg-purple">-->
                                <!--<el-form-item label="状态:" prop="status">-->
                                    <!--<el-select v-model="addForm.status" clearable placeholder="请选择" class="select">-->
                                        <!--<el-option v-for="item in dict.status" :key="item.name" :label="item.des"-->
                                                   <!--:value="item.name"></el-option>-->
                                    <!--</el-select>-->
                                <!--</el-form-item>-->
                            <!--</div>-->
                        <!--</el-col>-->

                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="地址:" prop="address">
                                    <el-input v-model="addForm.address"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer def-but">
                <el-button @click.native="addSubmit">{{ $t('button.save') }}</el-button>
                <el-button @click.native="off">{{ $t('button.cancel') }}</el-button>
            </div>
        </el-dialog>

        <!-- 修改界面 -->
        <el-dialog :visible.sync="editFormVisible" :close-on-click-modal="false"
                   style="line-height: 0;overflow: hidden;font-size: 12px;" title="修改数据" class="default-dialog">
            <div class="form form-add">
                <el-form :model="editForm" label-width="90px" :rules="editFormRules" ref="editForm" size="mini">

                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="售达方代码:" prop="soldCode">
                                    <el-tooltip content="最多输入30个字符" placement="right" effect="light">
                                        <el-input v-model="editForm.soldCode" :maxlength='30' :disabled="true"></el-input>
                                    </el-tooltip>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="售达方全称:" prop="soldName">
                                    <el-tooltip content="最多输入100个字符" placement="right" effect="light">
                                        <el-input v-model="editForm.soldName" :maxlength='100'></el-input>
                                    </el-tooltip>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="售达方简称:" prop="shortName">
                                    <el-tooltip content="最多输入100个字符" placement="right" effect="light">
                                        <el-input v-model="editForm.shortName" :maxlength='100'></el-input>
                                    </el-tooltip>
                                </el-form-item>
                            </div>
                        </el-col>

                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="国家名称:" prop="countryId">
                                    <el-select v-model="editForm.countryName"
                                               @change="addressChange('addressed', editForm.countryId)" filterable
                                               placeholder="请选择">
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
                                <el-form-item label="省名称:" prop="provinceId">
                                    <el-select v-model="editForm.provinceName"
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
                                <el-form-item label="市名称:" prop="cityId">
                                    <el-select v-model="editForm.cityName"
                                               @change="addressChange('county',editForm.cityId)" filterable
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

                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="区县名称:" prop="districtId">
                                    <el-select v-model="editForm.districtName"
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
                                <el-form-item label="街道名称:" prop="streetId">
                                    <el-select v-model="editForm.streetName" filterable placeholder="请选择">
                                        <el-option v-for="item in street"
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
                                <el-form-item label="邮政编码:" prop="postcode">
                                    <el-tooltip content="最多输入6个字符" placement="right" effect="light">
                                        <el-input v-model="editForm.postcode" :maxlength='6'></el-input>
                                    </el-tooltip>
                                </el-form-item>
                            </div>
                        </el-col>

                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="联系人:" prop="contactPerson">
                                    <el-tooltip content="最多输入100个字符" placement="right" effect="light">
                                        <el-input v-model="editForm.contactPerson" :maxlength="100"></el-input>
                                    </el-tooltip>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="联系电话:" prop="telephone">
                                    <el-tooltip content="最多输入11个字符" placement="right" effect="light">
                                        <el-input v-model="editForm.telephone" :maxlength='11'></el-input>
                                    </el-tooltip>
                                </el-form-item>
                            </div>
                        </el-col>
                        <!--<el-col :span="8">-->
                            <!--<div class="grid-content bg-purple">-->
                                <!--<el-form-item label="状态:" prop="status">-->
                                    <!--<el-select v-model="editForm.status" clearable placeholder="请选择" class="select">-->
                                        <!--<el-option v-for="item in dict.status" :key="item.name" :label="item.des"-->
                                                   <!--:value="item.name"></el-option>-->
                                    <!--</el-select>-->
                                <!--</el-form-item>-->
                            <!--</div>-->
                        <!--</el-col>-->
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="地址:" prop="address" >
                                    <el-input v-model="editForm.address"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer def-but">
                <el-button @click.native="editSubmit">{{ $t('button.save') }}</el-button>
                <el-button @click.native="off">{{ $t('button.cancel') }}</el-button>
            </div>
        </el-dialog>

        <!-- 查看 -->
        <el-dialog :visible.sync="lookFormVisible" :close-on-click-modal="false"
                   style="line-height: 0;overflow: hidden;font-size: 12px;" title="查看信息" class="default-dialog">
            <div class="form form-add" style="height: 130px;">
                <el-form :model="lookForm" label-width="80px" :rules="lookFormRules" ref="lookForm" size="mini">

                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="售达方代码:" prop="soldCode">
                                    <el-input v-model="lookForm.soldCode" :disabled="true"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="售达方全称:" prop="soldName">
                                    <el-input v-model="lookForm.soldName" :disabled="true"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="售达方简称:" prop="shortName">
                                    <el-input v-model="lookForm.shortName" :disabled="true"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>

                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="国家名称:" prop="countryName">
                                    <el-input v-model="lookForm.countryName" :disabled="true"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="省名称:" prop="provinceName">
                                    <el-input v-model="lookForm.provinceName" :disabled="true"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="市名称:" prop="cityName">
                                    <el-input v-model="lookForm.cityName" :disabled="true"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>

                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="区县名称:" prop="districtName">
                                    <el-input v-model="lookForm.districtName" :disabled="true"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="街道名称:" prop="streetName">
                                    <el-input v-model="lookForm.streetName" :disabled="true"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="邮政编码:" prop="postcode">
                                    <el-input v-model="lookForm.postcode" :disabled="true"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>

                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="联系人:" prop="contactPerson">
                                    <el-input v-model="lookForm.contactPerson" :disabled="true"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="联系电话:" prop="telephone">
                                    <el-input v-model="lookForm.telephone" :disabled="true"></el-input>
                                </el-form-item>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="grid-content bg-purple">
                                <el-form-item label="状态:" prop="status">
                                    <template slot-scope="scope">
                                        <el-select v-model="lookForm.status" clearable placeholder="请选择" class="select"
                                                   :disabled="true">
                                            <el-option v-for="item in dict.status" :key="item.name" :label="item.des"
                                                       :value="item.name"></el-option>
                                        </el-select>
                                    </template>

                                </el-form-item>
                            </div>
                        </el-col>


                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <el-form-item label="地址:" prop="address" >
                                <el-input v-model="lookForm.address" :disabled="true"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
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
    // let base = 'http://139.219.228.112:8082';
    export default {
        data() {
            return {
                // 分页
                pager: {
                    page: 1,
                    rows: 10,
                    total: 0
                },
                dict: '',
                visible2: false,
                activeName: 'first',
                address: [],
                addressed: [],
                city: [],
                county: [],
                street: [],
                formInline: {
                    soldCode: '',
                    soldName: '',
                    contactPerson: '',
                    address: '',
                    status: '',
                    telephone: ''
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
                        {required: true, message: '请输入售达方全称', trigger: this.trigger, validator: this.stripscriptName}
                    ],
                    shortName: [
                        {required: true, message: '请输入售达方简称', trigger: this.trigger, validator: this.stripscriptName}
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
                    legalPerson: [{required: false, trigger: this.trigger, validator: this.stripscriptName}],
                    businessScope: [{required: false, trigger: this.trigger, validator: this.stripscriptName}],
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
                    status: ''
                },
                addFormVisible: false, // 新增界面是否显示
                addLoading: false,
                trigger: 'blur',
                addFormRules: {
                    soldCode: [
                        {required: true, message: '请输入售达方代码', trigger: this.trigger},
                        {required: true, message: '', trigger: this.trigger, validator: this.validCode}
                    ],
                    soldName: [
                        {required: true, message: '请输入售达方全称', trigger: this.trigger, validator: this.stripscriptName}
                    ],
                    shortName: [
                        {required: true, message: '请输入售达方简称', trigger: this.trigger, validator: this.stripscriptName}
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
                    telephone: [
                        {
                            required: true,
                            message: '请输入联系电话',
                            validator: this.validPhone
                        }
                    ]
                    // status: [
                    //   { required: true, message: '请选择状态', trigger: this.trigger }
                    // ],
                    // address: [
                    //   { required: true, message: '请输入地址', trigger: this.trigger }
                    // ]
                },
                addForm: {
                    // 新增界面数据
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
                    status: 'AVAILABILITY'
                },
                multipleSelection: [],
                currentPage1: 1,
                currentData: null,
                // 查询框折叠展开
                showSearch: true
            //    修改禁止修改售达方代码
            //     disabledTo: false
            };
        },
        methods: {
            // 验证手机号
            validPhone(rule, value, callback) {
                util.isvalidPhone(rule, value, callback, 'required');
            },
            // 验证邮编
            isPostalCodeTo(rule, value, callback) {
                util.isPostalCode(rule, value, callback, 'required');
            },
            validCode(rule, value, callback) {
                util.validCode(rule, value, callback);
            },
            // 验证只能输入中文，英文，数字及._-@()
          stripscriptName(rule, value, callback) {
              util.stripscriptName(rule, value, callback);
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
                    if (data[i].id === item) {
                        return data[i].fullName;
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

            // 获取售达方列表
            getUser() {
                let _this = this;
                _this.users = [];
                _this.listLoading = true;
                util.publicpost(
                    '/sold/selectSoldList',
                    {
                        soldCode: _this.formInline.soldCode,
                        soldName: _this.formInline.soldName,
                        contactPerson: _this.formInline.contactPerson,
                        address: _this.formInline.address,
                        status: _this.formInline.status,
                        telephone: _this.formInline.telephone,
                        page: _this.pager.page,
                        rows: _this.pager.rows
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
                            });
                            _this.users = res.result;
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
            // 修改时间转换
            //      formatterUpdate(row, column) {
            //        let updateTime = row.updateTime
            //          ? util.formatDate.format(new Date(row.updateTime), 'yyyy-MM-dd hh:mm:ss')
            //          : '';
            //        return row.updateTime
            //          ? util.formatDate.format(new Date(row.updateTime), 'yyyy-MM-dd hh:mm:ss')
            //          : '';
            //      },

            // 添加
            handleAdd: function () {
                let _this = this;
                _this.addFormVisible = true;
                _this.addForm = {
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
                    postcode: '',
                    contactPerson: '',
                    telephone: '',
                    address: ''
                };
                if (_this.addFormVisible === true) {
                    util.publicpost(
                        '/regionalAddress/selectCountryRegionalAddress',
                        '',
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
                let ids = row.id;
                util.publicpost('/sold/getSoldById', {soldId: ids}, function (res) {
                    _this.lookFormVisible = true;
                    _this.lookForm = res.data;
                });
            },

            // 显示修改界面
            handleEdit: function (row) {
                let _this = this;
                let id = row.id;
                _this.editForm = {};
                _this.listLoading = true;
                // _this.disabledTo = true;
                util.publicpost('/sold/getSoldById', {soldId: id}, function (res) {
                    if (res.code === 0) {
                        _this.listLoading = false;
                        _this.editForm = res.data;
                        console.log(res.data);
                        _this.editFormVisible = true;
                        // 赋值给省
                        util.addressChange('addressed', _this.editForm.countryId, _this);
                        util.addressChange('city', _this.editForm.provinceId, _this);
                        util.addressChange('county', _this.editForm.cityId, _this);
                        util.addressChange('street', _this.editForm.districtId, _this);
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
                });
                util.publicpost(
                    '/regionalAddress/selectCountryRegionalAddress',
                    {id: _this.id, code: _this.code, fullName: _this.fullName},
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

            // 取消
            off: function () {
                this.addFormVisible = false;
                this.editFormVisible = false;
                this.lookFormVisible = false;
            },
            // 新增的保存
            addSubmit: function () {
                this.$refs.addForm.validate(valid => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            let _this = this;
                            _this.addLoading = true;
                            let districtid = _this.addForm.districtId;
                            _this.addForm.districtName = _this.loadadds(
                                districtid,
                                _this.county
                            );
                            let countryid = _this.addForm.countryId;
                            _this.addForm.countryName = _this.loadadds(
                                countryid,
                                _this.address
                            );
                            let provinceid = _this.addForm.provinceId;
                            _this.addForm.provinceName = _this.loadadds(
                                provinceid,
                                _this.addressed
                            );
                            let cityid = _this.addForm.cityId;
                            _this.addForm.cityName = _this.loadadds(cityid, _this.city);
                            let streeid = _this.addForm.streetId;
                            _this.addForm.streetName = _this.loadadds(streeid, _this.street);
                            let para = Object.assign({}, _this.addForm);
                            util.publicpost('/sold/insertSold', para, function (res) {
                                if (res.code === 0) {
                                    _this.$message({
                                        showClose: true,
                                        message: _this.$t('msg.success'),
                                        type: 'success'
                                    });
                                    _this.$refs['addForm'].resetFields();
                                    _this.addFormVisible = false;
                                    // this.addForm = null;
                                    _this.addLoading = false;
                                    _this.getUser();
                                } else {
                                    _this.addLoading = false;
                                    // _this.addFormVisible = false;
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
                //   _this.$message({
                //     showClose: true,
                //     message: '请先勾选数据',
                //     type: 'warning'
                //   });
                // } else {
                if (status === 'INEFFECTIVENESS') {
                    return '无效';
                }
                util.publicpost(
                    '/sold/updateIneffectivenessStatus',
                    {
                        ids: ids,
                        status: 'INEFFECTIVENESS',
                        versions: versions
                    },
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
                // }
            },
            // 启用
            handleStart: function (row) {
                console.log(row);
                let _this = this;
                let ids = row.id;
                let versions = row.version;
                _this.listLoading = true;
                // if (ids === '') {
                //   _this.$message({
                //     showClose: true,
                //     message: '请先勾选数据',
                //     type: 'warning'
                //   });
                // } else {
                if (status === 'AVAILABILITY') {
                    return '有效';
                }
                util.publicpost(
                    '/sold/updateAvailabilityStatus',
                    {
                        ids: ids,
                        status: 'AVAILABILITY',
                        versions: versions
                    },
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
                // }
            },

            // 重置
            resetForm() {
                this.formInline.soldCode = '';
                this.formInline.soldName = '';
                this.formInline.contactPerson = '';
                this.formInline.status = '';
                this.formInline.address = '';
                this.formInline.telephone = '';
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
        computed: {
            toggleDrop() {
                return this.showSearch ? 'el-icon-arrow-up' : 'el-icon-arrow-down';
            }
        },
        mounted() {
            this.getUser();
            this.getButtonList();

        }
    };
</script>
<style>

</style>
