<template>
    <div class="list_operation">
        <wTable :data="tableData" :header="tableHeader" :option="tableOption">
            <el-table-column slot="fixed" label="序号" type="index" width="50">
            </el-table-column>
            <el-table-column slot="fixed" fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                    <div @click="">
                        <el-tooltip content="修改" placement="top" effect="light">
                            <div class="operation_icon icon1"></div>
                        </el-tooltip>
                    </div>
                </template>
            </el-table-column>
        </wTable>
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
</template>

<script>
    import util from '../../common/js/util';
    import wTable from '@/components/base/w-table.vue';
    export default {
        components: {
            wTable
        },
        // name: 'Table',
        data () {
            return {
                tableOption: {
                    border: true,
                    maxHeight: 500
                },
                // 分页
                pager: {
                    page: 1,
                    rows: 10,
                    total: 0
                },
                tableHeader: [{
                    prop: 'soldCode',
                    label: '售达方代码',
                    minWidth: '120',
                    sortable: true,
                    sortMethod: this.handleNameSort,
                    showOverflowTooltip: true
                }, {
                    prop: 'soldName',
                    label: '售达方全称',
                    minWidth: '120',
                    showOverflowTooltip: true
                }, {
                    prop: 'contactPerson',
                    label: '联系人',
                    minWidth: '120',
                    showOverflowTooltip: true
                }, {
                    prop: 'address',
                    label: '地区',
                    minWidth: '120',
                    showOverflowTooltip: true
                }, {
                    prop: 'updater',
                    label: '修改人',
                    minWidth: '120',
                    showOverflowTooltip: true
                }],
                tableData: []
            };
        },
        methods: {
            handleNameSort () {
                console.log('handleNameSort');
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
            getList() {
                let _this = this;
                // _this.listLoading = true;
                util.publicpost(
                    '/sold/selectSoldList',
                    {
                        soldCode: '',
                        soldName: '',
                        sapCode: '',
                        socialCreditCode: '',
                        page: 1,
                        rows: 10,
                        init: ''
                    },
                    function (res) {
                        if (res.code === 0) {
                            _this.pager.total = res.pager.totalCount || 0;
                            _this.tableData = res.data;
                            _this.dict = res.enumVal;
                        } else {
                            // _this.listLoading = false;
                            _this.errorMsg('服务器繁忙！');
                        }
                    }
                );
            }
        },
        mounted() {
            this.getList();
        }
    };
</script>
