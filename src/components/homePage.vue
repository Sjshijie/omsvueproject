<template>
    <!-- 首页 -->
    <div class="home">
        <el-row :gutter="20" class="home_top">
            <el-col :span="14" class="home_lf">
                <el-row :gutter="20">
                    <el-col>
                        <div class="grid-content bg-purple bg-padding">
                            <div class="list_li">
                                <div class="list_text lf">
                                    <div class="text_title">移库订单</div>
                                    <div class="text_number">{{orderNumData.shiftingParkingOrderNum}}</div>
                                </div>
                                <div class="list_icon home_icon rf">
                                    <div class="icon"></div>
                                </div>
                            </div>
                            <div class="list_li">
                                <div class="list_text lf">
                                    <div class="text_title">采购订单</div>
                                    <div class="text_number">{{orderNumData.procurementOrderNum}}</div>
                                </div>
                                <div class="list_icon home_icon rf">
                                    <div class="icon"></div>
                                </div>
                            </div>
                            <div class="list_li" :span="8">
                                <div class="list_text lf">
                                    <div class="text_title">销售订单</div>
                                    <div class="text_number">{{orderNumData.sellOrderNum}}</div>
                                </div>
                                <div class="list_icon home_icon rf">
                                    <div class="icon"></div>
                                </div>
                            </div>
                            <div class="list_li">
                                <div class="list_text lf">
                                    <div class="text_title">计划入库单</div>
                                    <div class="text_number">{{orderNumData.planInboundNum}}</div>
                                </div>
                                <div class="list_icon home_icon rf">
                                    <div class="icon"></div>
                                </div>
                            </div>
                            <div class="list_li">
                                <div class="list_text lf">
                                    <div class="text_title">计划出库单</div>
                                    <div class="text_number">{{orderNumData.planOutboundNum1}}</div>
                                </div>
                                <div class="list_icon home_icon rf">
                                    <div class="icon"></div>
                                </div>
                            </div>
                            <div class="list_li">
                                <div class="list_text lf">
                                    <div class="text_title">计划运输单</div>
                                    <div class="text_number">{{orderNumData.planDistributionNum}}</div>
                                </div>
                                <div class="list_icon home_icon rf">
                                    <div class="icon"></div>
                                </div>
                            </div>
                            <div class="list_li" :span="8">
                                <div class="list_text lf">
                                    <div class="text_title">生产订单</div>
                                    <div class="text_number">{{orderNumData.productionOrderNum}}</div>
                                </div>
                                <div class="list_icon home_icon rf">
                                    <div class="icon"></div>
                                </div>
                            </div>
                            <div class="list_li">
                                <div class="list_text lf">
                                    <div class="text_title">领料单</div>
                                    <div class="text_number">{{orderNumData.pickingOrderNum}}</div>
                                </div>
                                <div class="list_icon home_icon rf">
                                    <div class="icon"></div>
                                </div>
                            </div>
                            <div class="list_li">
                                <div class="list_text lf">
                                    <div class="text_title">二次加工单</div>
                                    <div class="text_number">{{orderNumData.processOrderNum}}</div>
                                </div>
                                <div class="list_icon home_icon rf">
                                    <div class="icon"></div>
                                </div>
                            </div>
                        </div>
                    </el-col>

                </el-row>
            </el-col>
            <el-col :span="10" class="el-col-grid">
                <el-row>
                    <el-col :span="24">
                        <div class="grid-content bg-purple">
                            <div class="warning_info_header">
                                <div class="header_text lf">预警信息</div>
                                <!--<div class="header_icon rf"></div>-->
                            </div>
                            <div class="warning_main">
                                <div class="warning_list"
                                     @click="openWarningOrderDialog('urgent')">
                                    <p class="warning_title">紧急预警</p>
                                    <p class="warning_text" v-if="orderEarlyWarningInfoData">
                                        {{orderEarlyWarningInfoData.transportationEarlyWarning}}<span>个</span></p>
                                    <p class="warning_text" v-else>0<span>个</span></p>
                                </div>

                                <div class="warning_list"
                                     @click="openWarningOrderDialog('order')">
                                    <p class="warning_title">订单预警</p>
                                    <p class="warning_text" v-if="orderEarlyWarningInfoData">
                                        {{orderEarlyWarningInfoData.pickingEarlyWarning}}<span>个</span></p>
                                    <p class="warning_text" v-else>0<span>个</span></p>
                                </div>

                                <div class="warning_list"
                                     @click="openWarningOrderDialog('plan')">
                                    <p class="warning_title">计划预警</p>
                                    <p class="warning_text" v-if="orderEarlyWarningInfoData">
                                        {{orderEarlyWarningInfoData.shipmentsEarlyWarning}}<span>个</span></p>
                                    <p class="warning_text" v-else>0<span>个</span></p>
                                </div>

                                <div class="warning_list">
                                    <p class="warning_title">交互异常</p>
                                    <p class="warning_text" v-if="orderEarlyWarningInfoData">
                                        {{orderEarlyWarningInfoData.orderException}}<span>个</span></p>
                                    <p class="warning_text" v-else>0<span>个</span></p>
                                </div>

                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="home_bom">
            <el-col :span="14">
                <div class="grid-content bg-purple">
                    <div class="warning_info_header">
                        <div class="header_text lf">待办事项</div>
                        <!--<div class="header_icon rf"></div>-->
                    </div>
                    <ul class="momentum_list">
                        <li class="momentum_list_li" v-for="item in prepareIssuedOrderDataList">
                            <span class="urgency"></span>
                            <div class="momentum_text lf">
                                <em class="fl">{{ item.orderNumber }}</em>
                                <em class="fl mar_lr">订单状态：{{ item.orderStatusTxt }}</em>
                                <em class="fl">分仓状态：{{ item.storehouseStatusTxt }}</em>
                            </div>
                            <div class="momentum_time rf">{{ item.viewTime }}</div>
                        </li>
                    </ul>
                    <!-- 工具条 -->
                    <div class="block fr">
                        <el-pagination @size-change="sizeChange" @current-change="pageChange"
                                       :current-page="this.pager.page"
                                       :page-sizes="[1, 2, 10]" :page-size="this.pager.rows"
                                       layout="total, prev, pager, next"
                                       :total="this.pager.total"></el-pagination>
                    </div>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="grid-content bg-purple">
                    <div class="warning_info_header">
                        <div class="header_text lf" v-if="pieFlag">销售订单满单率(周)</div>
                        <div class="header_text lf" v-else>近12个月订单的满单率</div>
                        <!--<div class="header_icon rf"></div>-->
                    </div>
                    <!--v-if="outUserType"-->
                    <div class="pad_lbrt" style="position: relative;">
                        <el-form :model="shipperForm" label-width="60px" class="shipper-select">
                            <el-form-item label="货主：" prop="shipperCode">
                                <el-select v-model="shipperForm.shipperCode" size="mini" @change="shipperChange">
                                    <el-option v-for="item in shipperList"
                                               :key="item.shipperCode"
                                               :label="item.shipperName"
                                               :value="item.shipperCode">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <div id="chartCol" style="width:400px; height:220px;top:-5px;"></div>
                        <!--<div id="orderPie" v-show="!outUserType" style="width:100%; height:237px;"></div>-->
                    </div>
                    <!--<div class="pad_lbrt" v-else>-->
                    <!--<div id="orderPie" style="width:100%; height:237px;"></div>-->
                    <!--</div>-->
                </div>
            </el-col>
        </el-row>

        <!-- 预警提示弹出层 -->
        <el-dialog :visible.sync="visible.warningPromptVisible" :close-on-click-modal="false" class="warning-info"
                   title="预警提示" top="30vh">
            <div style="height: 80px;">
                <h1 class="tac mar_b">注意！</h1>
                <span>还有<em class="warning-Digital">{{warningInfo.orderDigital}}</em>条单据/计划未完成，剩余日期<em
                        class="warning-Digital">{{warningInfo.remainDate}}</em>天。请尽快处理！</span>
            </div>
        </el-dialog>
        <!-- 预警提示弹出层 -->

        <!-- 预警订单弹出层 -->
        <el-dialog :visible.sync="visible.warningOrderVisible" :close-on-click-modal="false" class="warning-info"
                   @close="closeWarningDialog" top="21vh">
            <div slot="title">
                <h1 class="dialog-title">
                    <i class="el-icon-refresh fr mar_r2" @click="refreshWarningList(warningTitle)"></i>
                    <span>{{warningTitle}}</span>
                </h1>
            </div>
            <div style="height: 400px;">
                <!--紧急预警-->
                <el-table height="390" v-loading="visible.warningListLoading" v-if="visible.urgentWarningVisible"
                          :data="urgentWarningList" stripe style="width: 100%;overflow-x: hidden" fit
                          border align="center">
                    <el-table-column label="序号" align="center" type="index" width="50"></el-table-column>
                    <el-table-column label="单号" align="center" prop="orderOrPlanNo" width="150" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <div class="hand">
                                <a :href="scope.row.orderUrl" target="_blank">{{scope.row.orderOrPlanNo}}</a>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" align="center" prop="baseOrderStatusStr"
                                     show-overflow-tooltip></el-table-column>
                </el-table>
                <!--订单预警-->
                <el-table height="390" v-loading="visible.warningListLoading" v-else-if="visible.orderWarningVisible"
                          :data="orderWarningList" stripe style="width: 100%;"
                          fit border align="center">
                    <el-table-column label="序号" align="center" type="index" width="50"></el-table-column>
                    <el-table-column label="订单号" align="center" prop="orderNo" width="150" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <div class="hand">
                                <a :href="scope.row.orderUrl" target="_blank">{{scope.row.orderNo}}</a>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="订单类型" align="center" prop="orderType"
                                     :formatter="formatterOrderType" show-overflow-tooltip></el-table-column>
                    <el-table-column label="订单状态" align="center" prop="baseOrderStatusStr"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column label="剩余天数" align="center" prop="surplusDay"
                                     show-overflow-tooltip></el-table-column>
                </el-table>
                <!--计划预警-->
                <el-table height="390" v-loading="visible.warningListLoading" v-else-if="visible.planWarningVisible"
                          :data="planWarningList" stripe style="width: 100%;" fit
                          border align="center">
                    <el-table-column label="序号" align="center" type="index" width="50"></el-table-column>
                    <el-table-column label="计划单号" align="center" prop="planNo" width="150" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <div class="hand">
                                <a :href="scope.row.orderUrl" target="_blank">{{scope.row.planNo}}</a>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="计划类型" align="center" prop="orderPlanType"
                                     :formatter="formatterOrderPlanType" show-overflow-tooltip></el-table-column>
                    <el-table-column label="计划状态" align="center" prop="baseOrderStatusStr"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column label="剩余天数" align="center" prop="surplusDay"
                                     show-overflow-tooltip></el-table-column>
                </el-table>
            </div>
        </el-dialog>
        <!-- 预警订单弹出层 -->

    </div>
</template>
<script>
    import echarts from 'echarts';
    import util from '../common/js/util';
    import config from '../common/js/config';
    import cookieOperation from '../common/js/cookieOperation';

    export default {
        data() {
            return {
                chartColumn: null,
                chartPie: null,
                orderNumData: [],
                orderEarlyWarningInfoData: [],
                prepareIssuedOrderDataList: [],
                orderCompletionRateData: [
                    {
                        completionNum: 0,
                        allnum: 1
                    }
                ],
                listLoading: false,
                // 用户信息
                userInfo: {},
                outUserType: false,
                pieFlag: true,
                // 分页
                pager: {
                    page: 1,
                    rows: 6,
                    total: 0
                },
                // 显示隐藏标识
                visible: {
                    warningPromptVisible: false, // 预警提示弹出层显示标识
                    warningOrderVisible: false, // 预警订单弹出层显示标识
                    urgentWarningVisible: false, // 紧急预警列表显示标识
                    orderWarningVisible: false, // 订单预警列表显示标识
                    planWarningVisible: false, // 计划预警列表显示标识
                    warningListLoading: false
                },
                // 预警提示信息
                warningInfo: {
                    orderDigital: 0,
                    remainDate: 1
                },
                warningTitle: '', // 预警订单弹出层标题
                urgentWarningList: [], // 紧急预警列表
                orderWarningList: [], // 订单预警列表
                planWarningList: [], // 计划预警列表
                dict: '', // 枚举
                shipperForm: {
                    shipperCode: '' // 货主编码
                },
                shipperList: '' // 货主列表
            };
        },
        watch: {
            '$route.params'() {
                this.$route.params.lang === 'zh' ? this.$i18n.locale = 'zh' : this.$i18n.locale = 'en';
            }
        },
        methods: {
            // 分页
            pageChange(currentPage) {
                this.pager.page = currentPage;
                this.prepareIssuedOrder();
            },
            // 选择行数
            sizeChange(rows) {
                this.pager.rows = rows;
                this.prepareIssuedOrder();
            },
            // 折线图
            drawColumnChart() {
                // console.log(document.getElementById('chartCol'));
                // if (document.getElementById('chartCol')) {
                console.log('折线');
                this.chartColumn = echarts.init(document.getElementById('chartCol'));
                this.chartColumn.setOption({
                    tooltip: {
                        trigger: 'axis',
                        formatter: '{b}<br />{a}:{c}%'

                    },
                    legend: {
                        data: ['订单的满单率']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {show: true},
                            // dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            // restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,

                            data: this.orderCompletionRateData.map(item => item.timeArea)
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLabel: {
                                show: true,
                                interval: 'auto',
                                formatter: '{value} %'
                            },
                            show: true,
                            dataMax: '100%'
                        }
                    ],
                    series: [
                        {
                            name: '订单的满单率',
                            type: 'line',
                            stack: '总量',

                            data: this.orderCompletionRateData.map(item => parseInt(item.completionRate))
                        }

                    ]
                });
                // }
            },
            // 饼图
            drawPie() {
                // console.log(document.getElementById('orderPie'));
                // if (document.getElementById('orderPie')) {
                console.log('饼图');
                this.chartPie = echarts.init(document.getElementById('chartCol'));
                this.chartPie.setOption({
                    title: {
                        text: '',
                        subtext: '',
                        x: 'center',
                        textStyle: {
                            fontSize: 14
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'

                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['满单率', '未满单率']
                    },
                    series: [
                        {
                            name: '订单的满单率',
                            type: 'pie',
                            radius: '50%',
                            center: ['50%', '50%'],
                            data: [
                                {
                                    value: this.orderCompletionRateData[0].completionNum,
                                    name: '满单率'
                                },
                                {
                                    value: (Number(this.orderCompletionRateData[0].allnum) - Number(this.orderCompletionRateData[0].completionNum)).toFixed(3),
                                    name: '未满单率'
                                }
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
                // }
            },
            // 统计订单数量
            statisticalOrderQuantity() {
                let _this = this;
                util.publicpost('/frontpage/statisticalOrderQuantity', {},
                    function (res) {
                        _this.orderNumData = res.data;
                    },
                    config.order_service_ip);
            },
            // 待办事项(待处理订单)
            prepareIssuedOrder() {
                let _this = this;
                _this.listLoading = true;
                _this.prepareIssuedOrderData = [];
                util.publicpost('/frontpage/prepareIssuedOrder', {
                        page: _this.pager.page,
                        rows: _this.pager.rows
                    },
                    function (res) {
                        if (res.code === 0) {
                            _this.listLoading = false;
                            _this.pager.total = res.pager.totalCount || 0;
                            res.result.map(item => {
                                if (item.viewTime) {
                                    item.viewTime = util.formatDate.format(new Date(Number(item.viewTime)), 'yyyy-MM-dd');
                                }
                            });
                            _this.prepareIssuedOrderDataList = res.result;
                            _this.dict = res.enumVal;
                            // console.log(res.result);
                        } else {
                            _this.listLoading = false;
                            _this.errorMsg('服务器繁忙！');
                        }
                    },
                    config.order_service_ip);
            },
            // 订单预警信息
            orderEarlyWarningInfo() {
                let _this = this;
                util.publicpost('/frontpage/orderEarlyWarningInfo', {},
                    function (res) {
                        _this.orderEarlyWarningInfoData = res.data;
                    },
                    config.order_service_ip);
            },
            // 近12个月订单的满单率
            orderCompletionRateNearly12months(code) {
                let _this = this;
                util.publicpost('/frontpage/orderCompletionRateNearly12months', {
                    shipperCode: code
                    },
                    function (res) {
                        if (res.code === 0) {
                            if (res.data) {
                                _this.orderCompletionRateData = res.data;
                            }
                            if (res.data.length > 1) {
                                _this.drawColumnChart();
                                _this.pieFlag = false;
                            } else {
                                _this.drawPie();
                                _this.pieFlag = true;
                            }
                        }
                    }, config.order_service_ip);
            },
            // 如果url里面带着正确token则直接跳转
            getToken() {
                if (this.$route.params.token) {
                    cookieOperation.cookie.set('access_token', this.$route.params.token, 1);
                    this.statisticalOrderQuantity();
                    this.orderEarlyWarningInfo();
                    this.prepareIssuedOrder();
                } else {
                    this.errorMsg('访问权限获取失败');
                }
            },
            // 获取预警信息
            getWarningInfo() {
                let _this = this;
                util.publicpost('/frontpage/surplusDayOne', {},
                    function (res) {
                        if (res.code === 0) {
                            _this.warningInfo.orderDigital = res.data;
                            res.data === 0 ? _this.visible.warningPromptVisible = false : _this.visible.warningPromptVisible = true;
                        } else {
                            _this.errorMsg(res.msg);
                        }
                    },
                    config.order_service_ip);
            },
            // 获取货主枚举值
            getShipperDict() {
                let _this = this;
                util.publicpost('/frontpage/getUserOfShipper', {},
                    function (res) {
                        if (res.code === 0) {
                            _this.shipperList = res.data;
                            if (res.data && res.data.length > 0) {
                                _this.shipperForm.shipperCode = _this.shipperList[0].shipperCode;
                                _this.orderCompletionRateNearly12months(_this.shipperForm.shipperCode);
                            } else {
                                _this.shipperForm.shipperCode = '';
                                _this.orderCompletionRateNearly12months(_this.shipperForm.shipperCode);
                            }
                        } else {
                            _this.errorMsg(res.msg);
                        }
                    }, config.order_service_ip);
            },
            // 货主切换
            shipperChange() {
                this.orderCompletionRateNearly12months(this.shipperForm.shipperCode);
            },
            // 预警订单弹出层
            openWarningOrderDialog(type) {
                let _this = this;
                // let linkUrl = 'http://localhost:8092/#/order/'; // 本地开发url
                let linkUrl = config.order_service_ip2 + '/#/order/'; // 发版url
                _this.visible.warningOrderVisible = true;
                _this.visible.warningListLoading = true;
                if (type === 'urgent') {
                    _this.warningTitle = '紧急预警';
                    _this.visible.urgentWarningVisible = true;
                    util.publicpost('/frontpage/urgentWarning', {},
                        function (res) {
                            if (res.code === 0) {
                                if (res.data && res.data.length > 0) {
                                    res.data.map(item => {
                                        if (item.planNo && item.planNo.indexOf('T') == 0) {
                                            item.orderUrl = linkUrl + item.orderTypeName + '/zh/' + cookieOperation.cookie.get('access_token') + '?orderNo=' + item.orderOrPlanNo;
                                        } else {
                                            item.orderUrl = linkUrl + item.orderTypeName + '/zh/' + cookieOperation.cookie.get('access_token') + '?orderNo=' + item.orderNo;
                                        }
                                    });
                                }
                                _this.urgentWarningList = res.data;
                                _this.dict = res.enumVal;
                            } else {
                                _this.errorMsg(res.msg);
                            }
                            _this.visible.warningListLoading = false;
                        }, config.order_service_ip);
                } else if (type === 'order') {
                    _this.warningTitle = '订单预警';
                    _this.visible.orderWarningVisible = true;
                    util.publicpost('/frontpage/orderWarning', {},
                        function (res) {
                            if (res.code === 0) {
                                if (res.data && res.data.length > 0) {
                                    res.data.map(item => {
                                        item.orderUrl = linkUrl + item.orderTypeName + '/zh/' + cookieOperation.cookie.get('access_token') + '?orderNo=' + item.orderNo;
                                    });
                                }
                                _this.orderWarningList = res.data;
                                _this.dict = res.enumVal;
                            } else {
                                _this.errorMsg(res.msg);
                            }
                            _this.visible.warningListLoading = false;
                        }, config.order_service_ip);
                } else {
                    _this.warningTitle = '计划预警';
                    _this.visible.planWarningVisible = true;
                    util.publicpost('/frontpage/planWarning', {},
                        function (res) {
                            if (res.code === 0) {
                                if (res.data && res.data.length > 0) {
                                    res.data.map(item => {
                                        if (item.planNo && item.planNo.indexOf('T') == 0) {
                                            item.orderUrl = linkUrl + item.orderTypeName + '/zh/' + cookieOperation.cookie.get('access_token') + '?orderNo=' + item.planNo;
                                        } else {
                                            item.orderUrl = linkUrl + item.orderTypeName + '/zh/' + cookieOperation.cookie.get('access_token') + '?orderNo=' + item.orderNo;
                                        }
                                    });
                                }
                                _this.planWarningList = res.data;
                                _this.dict = res.enumVal;
                            } else {
                                _this.errorMsg(res.msg);
                            }
                            _this.visible.warningListLoading = false;
                        }, config.order_service_ip);
                }
            },
            // 刷新列表页
            refreshWarningList(title) {
                if (title === '紧急预警') {
                    this.openWarningOrderDialog('urgent');
                } else if (title === '订单预警') {
                    this.openWarningOrderDialog('order');
                } else {
                    this.openWarningOrderDialog('plan');
                }
            },
            // 订单预警弹出层关闭
            closeWarningDialog() {
                this.visible.urgentWarningVisible = false;
                this.visible.orderWarningVisible = false;
                this.visible.planWarningVisible = false;
            },
            // 订单状态格式化
            formatterBaseOrderStatus(row, column) {
                let status = row.baseOrderStatus;
                let json = this.dict.baseOrderStatus;
                return util.formatDict(json, status);
            },
            // 订单类型格式化
            formatterOrderType(row, column) {
                let status = row.orderType;
                let json = this.dict.orderType;
                return util.formatDict(json, status);
            },
            // 计划类型格式化
            formatterOrderPlanType(row, column) {
                let status = row.orderPlanType;
                let json = this.dict.orderPlanType;
                return util.formatDict(json, status);
            }
        },
        computed: {
            toggleDrop() {
                return this.showSearch ? 'el-icon-arrow-up' : 'el-icon-arrow-down';
            }
        },
        mounted() {
            this.getToken();
            this.drawPie();
            this.getWarningInfo();
            this.getShipperDict();
            // this.getWarningInfo();
        }
    };
</script>

<style scoped>
    .home_bom {
        /*padding-bottom: 30px !important;*/
        height: 281px;
        overflow: hidden;

    }

    :last-child {
        margin-bottom: 0;
    }

    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .home_top {
        padding: 10px 0;
        /* height: 321px; */
        overflow: hidden;
    }

    .bg-purple {
        background: #fff;
        line-height: 85px;
        overflow: hidden;
    }

    .bg-purple-light {
        /*background: #e5e9f2;*/
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .row-bg {
        padding: 10px 0;
        /*background-color: #f9fafc;*/
    }

    .el-col-grid {
        overflow: auto;
        height: 236px;
        background-color: #fff;
    }

    /*滚动条样式*/
    .el-col-grid::-webkit-scrollbar { /*滚动条整体样式*/
        width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 4px;
    }

    .el-col-grid::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: rgba(0, 0, 0, 0.2);
    }

    .el-col-grid::-webkit-scrollbar-track { /*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 0;
        background: rgba(0, 0, 0, 0.1);
    }

    .home {
        background-color: #e8ebf0;
        height: 100%;
        overflow-x: hidden;
    }

    .bg-padding {
        padding: 18px 20px 5px;
        box-sizing: border-box;
        overflow: hidden;
    }

    .list_li:nth-child(1) {
        background-color: #25a5c0;
    }

    .list_li:nth-child(2) {
        background-color: #cf84df;
    }

    .list_li:nth-child(3) {
        background-color: #56da8e;
    }

    .list_li:nth-child(4) {
        background-color: #60b8f8;
    }

    .list_li:nth-child(5) {
        background-color: #9a6ff2;
    }

    .list_li:nth-child(6) {
        background-color: #fe9b74;
    }

    .list_li:nth-child(7) {
        background-color: #fd94b5;
    }

    .list_li:nth-child(8) {
        background-color: #78dfb0;
    }

    .list_li:nth-child(9) {
        background-color: #ffd978;
    }

    .header_icon {
        background-image: url('../assets/images/icon.png');
        background-repeat: no-repeat;
        width: 25px;
        height: 25px;
        background-position: -12px -64px;
        cursor: pointer;
        transform: scale(0.7);
    }

    .list_li .list_icon .icon {
        background-image: url('../assets/images/icon.png');
        background-repeat: no-repeat
    }

    .list_li .icon {
        transform: scale(0.5);
        margin: 10px auto 0;
    }

    .list_li:nth-child(1) .icon {
        overflow: hidden;

        width: 33px;
        height: 35px;
        background-position: -12px -101px;
    }

    .list_li:nth-child(2) .icon {
        overflow: hidden;

        width: 32px;
        height: 33px;
        background-position: -66px -103px;
    }

    .list_li:nth-child(3) .icon {
        overflow: hidden;

        width: 34px;
        height: 34px;
        background-position: -117px -100px;
    }

    .list_li:nth-child(4) .icon {
        overflow: hidden;

        width: 45px;
        height: 37px;
        background-position: -171px -100px;
    }

    .list_li:nth-child(5) .icon {
        overflow: hidden;

        width: 43px;
        height: 41px;
        background-position: -236px -93px;
    }

    .list_li:nth-child(6) .icon {
        overflow: hidden;
        margin: 14px auto 0;
        width: 36px;
        height: 27px;
        background-position: -114px -157px;
    }

    .list_li:nth-child(7) .icon {
        overflow: hidden;

        width: 36px;
        height: 36px;
        background-position: -12px -147px;
    }

    .list_li:nth-child(8) .icon {
        overflow: hidden;
        width: 36px;
        height: 36px;
        background-position: -65px -147px;
    }

    .list_li:nth-child(9) .icon {
        overflow: hidden;
        margin: 7px auto 0;
        width: 33px;
        height: 43px;
        background-position: -299px -93px;
    }

    .list_li {
        width: 30%;
        height: 54px;
        color: #ffffff;
        cursor: pointer;
        float: left;
        margin: 0 0 17px 4%;
    }

    .list_li:nth-child(3n-2) {
        margin-left: 1%;
    }

    .list_icon {
        width: 33%;
        height: 54px;
        background: rgba(0, 0, 0, 0.1)
    }

    .list_text {
        width: 60%;
        padding: 5px 0 0 10%;
        box-sizing: border-box;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .text_title {
        font-size: 12px;
        line-height: 20px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .text_number {
        font-size: 18px;
        line-height: 20px;
        margin-top: 3px;
    }

    /*  */
    .warning_info_header {
        font-size: 14px;
        color: #08687b;
        height: 51px;
        line-height: 51px;
        border-bottom: 1px solid #dee2e7;
        padding: 18px 30px 0 20px;
        box-sizing: border-box;
    }

    .header_text {
        height: 18px;
        line-height: 18px;
        padding-left: 18px;
        border-left: 2px solid #298395;

    }

    .warning_main {
        /* height: 268px; */
        padding: 16px 19px 0;
        box-sizing: border-box;
        overflow: hidden;
    }

    .warning_list {
        width: 22%;
        height: 162px;
        background: url("../assets/images/home-bj3.png") no-repeat center;
        float: left;
        margin-right: 1%;
        margin-left: 2%;
        background-size: 152px 205px;
        cursor: pointer;
    }

    .warning_list:nth-child(2) {
        background: url("../assets/images/home-bj2.png") no-repeat center;
        background-size: 152px 205px;
    }

    .warning_list:nth-child(3) {
        background: url("../assets/images/home-bj1.png") no-repeat center;
        /* margin: 0; */
        background-size: 152px 205px;
        margin-left: 2%;
    }

    .warning_list:nth-child(4) {
        background: url("../assets/images/home-bj4.png") no-repeat center;
        /* margin: 0; */
        background-size: 152px 205px;
        margin-left: 2%;
    }

    .warning_title {
        font-size: 12px;
        color: #ffffff;
        overflow: hidden;
        line-height: 20px;
        padding: 11% 0 0 30%;
    }

    .warning_text {
        font-size: 18px;
        color: #ffffff;
        overflow: hidden;
        line-height: 20px;
        padding: 10% 0 0 34%;
    }

    .warning_text span {
        font-size: 14px;
    }

    .momentum_list {
        width: 100%;
        overflow: hidden;
        background-color: #fff;
    }

    .momentum_list span {
        width: 8px;
        height: 8px;
        background-color: #ee4e65;
        border-radius: 8px;
        display: block;
        float: left;
        margin: 11px 10px 0 0;
    }

    .momentum_list_li {
        overflow: hidden;
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #dee2e7;
        font-size: 12px;
        padding: 0 30px 0 39px;
    }

    .momentum_text {
        width: 70%;
        font-size: 12px;
        color: #666;
        overflow: hidden;
        /*height: 39px;*/
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    /* 分页样式 */
    .bg-purple .is-background {
        line-height: 40px;
        text-align: right;
        float: right;
        margin-top: 10px;
    }

    .home_lf {
        height: 240px;
    }

    .home_lf .el-row {
        margin-right: 0 !important;
    }

    .home_bom .el-col-14 {
        padding-right: 20px !important;
    }

    .home_bom .el-col-10 {
        padding-left: 0 !important;
    }

    /*!* 媒体查询首页 *!*/
    @media screen and (max-width: 1401px) {
        .warning_list {
            width: 22%;
            height: 162px;
            background: url("../assets/images/home-bj3.png") no-repeat center;
            float: left;
            margin-right: 1%;
            margin-left: 2%;
            background-size: 120px 162px;
        }

        .warning_list:nth-child(2) {
            background: url("../assets/images/home-bj2.png") no-repeat center;
            background-size: 120px 162px;
        }

        .warning_list:nth-child(3) {
            background: url("../assets/images/home-bj1.png") no-repeat center;
            /* margin: 0; */
            background-size: 120px 162px;
            margin-left: 2%;
        }

        .warning_list:nth-child(4) {
            background: url("../assets/images/home-bj4.png") no-repeat center;
            /* margin: 0; */
            background-size: 120px 162px;
            margin-left: 2%;
        }

        .warning_title {
            padding: 11% 0 0 25%;
        }

        .warning_text {
            padding: 10% 0 0 33%;
        }
    }

    .hand a {
        color: #3a8ee6;
    }

</style>
