<!--接口测试 yzp-->
<template>
    <div class="admin interfaceTest">
        <el-form ref="form" :model="form" label-width="80px" v-loading.fullscreen.lock="fullscreenLoading">
            <el-form-item label="接口URL地址:">
                <el-input v-model="form.url" :readonly="hideFour"></el-input>
            </el-form-item>
            <el-form-item label="接口类型:" class="interfaceTestLf">
                <el-select v-model="form.region" placeholder="接口类型" @change="region">
                    <el-option label="HTTP" value="HTTP"></el-option>
                    <el-option label="MQ" value="MQ"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="请求方式:" class="interfaceTestLf" v-if="hideTo">
                <el-select v-model="form.resource" placeholder="请选择请求方式">
                    <el-option label="POST" value="POST"></el-option>
                    <el-option label="GET" value="GET"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="HTTP接口实例:" class="interfaceTestLf" v-if="hideTo">
                <el-select v-model="form.httpServiceName" placeholder="请选择HTTP接口实例" @change="httpon">
                    <el-option label="出库过账接口" value="fwmsOutBoundReceive"></el-option>
                    <el-option label="入库过账接口" value="fwmsInBoundReceive"></el-option>
                    <el-option label="SAP过账结果" value="receivePostResReceive"></el-option>
                    <el-option label="采购订单" value="purchaseOrderReceive"></el-option>
                    <el-option label="销售提单" value="ladingOrderReceive"></el-option>
                    <el-option label="SAP拆单结果" value="splitReceive"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="MQ接口实例:" class="interfaceTestLf" v-if="hideThree">
                <el-select v-model="form.mqServiceName" placeholder="请选择MQ接口实例" filterable>
                    <el-option label="与TWMS入库单下发" value="TINBOUNDISSUED "></el-option>
                    <el-option label="与TWMS出库单下发" value="TOUTBOUNDISSUED"></el-option>
                    <el-option label="无单入库返回结果接口TWMS" value="TNOORDERSTORAGERESULT"></el-option>
                    <el-option label="无单入库返回结果接口FWMS" value="FNOORDERSTORAGERESULT"></el-option>
                    <el-option label="TWMS过账结果" value="TPOSTINGRESULT"></el-option>
                    <el-option label="与FWMS入库单下发" value="FINBOUNDISSUED"></el-option>
                    <el-option label="与FWMS出库单下发" value="FOUTBOUNDISSUED"></el-option>
                    <el-option label="FWMS执行下发" value="FEXECUTE"></el-option>
                    <el-option label="ITM下发计划运输单" value="IEXECUTE"></el-option>
                    <el-option label="根据计划出库单号下发给itm出库量" value="ITMOUTBOUND"></el-option>
                    <el-option label="与itm拆单结果返回接口" value="ITMSPLITORDER"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="请求状态:" class="interfaceTestLf" v-if="hideTo">
                <el-input v-model="form.status" style="width: 80px" :disabled = true ></el-input>
            </el-form-item>
            <el-form-item label="请求参数:" class="interfaceTestText">
                <el-input type="textarea" v-model="form.parameters"></el-input>
            </el-form-item>
            <el-form-item label="响应值:"  class="interfaceTestText" >
                <el-input type="textarea" v-model="form.response" :readonly = true ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">测试</el-button>
                <el-button @click="onReset">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
	import util from '../../common/js/util';
    export default {
        data() {
            return {
                form: {
                    url: '',
                    region: 'HTTP',
                    resource: 'POST',
                    parameters: '', // 请求参数
	                status: '',
                    response: '', // 返回响应值
	                mqServiceName: '',
	                httpServiceName: ''
                },
                hideTo: true,
                hideThree: false,
	            hideFour: false,
	            fullscreenLoading : false,
	            fwmsOutBoundReceive : '{"source_sys":"FWMS","target_sys":"LOMS","service_name":"PGI","biz_event":"OUTBOUND","submit_time":"2018/4/1117:03:28","trans_no":"b454d8db91c246f48e440383148f313c","list_info":[{"plan_no":"6415025944","account_time":"2018/4/90:00:00","delivery_time":"2018-04-13","is_plate":"1","tray_num":"12","zsplit":"X","list":[{"plan_item":"000010","batch_no":"YHFC","production_date":"20170322","material_status":"2","appearance":"0","base_quantity_all":"250.000","base_unit":"BOX"}]}]}',
	            fwmsOutBoundReceiveUrl : 'http://10.227.114.54:8083/fwms/outBound/receive',
	            fwmsInBoundReceive : '{"source_sys":"FWMS","target_sys":"LOMS","service_name":"PGI","biz_event":"INBOUND","submit_time":"2018/4/1116:29:22","trans_no":"a0bec68d23994fe681d0c3a6d7ad50da","list_info":[{"plan_no":"3740007527","posting_time":null,"account_time":"2018/4/80:00:00","instorage_time":null,"uuid":"CG01_186","list":[{"plan_item":"000001","batch_no":"2018040814","production_date":"20161008","material_status":2,"appearance":0,"base_quantity_all":"100.000","base_unit":"BOX"}]},{"plan_no":"3740007528","posting_time":null,"account_time":"2018/4/80:00:00","instorage_time":null,"uuid":"CG01_187","list":[{"plan_item":"000001","batch_no":"AG01","production_date":"20170522","material_status":2,"appearance":0,"base_quantity_all":"10.000","base_unit":"BOX"}]},{"plan_no":"6494008334","posting_time":null,"account_time":"2017/12/60:00:00","instorage_time":null,"uuid":"CG01_189","list":[{"plan_item":"000001","batch_no":"PJ01","production_date":"20171206","material_status":2,"appearance":0,"base_quantity_all":"96.000","base_unit":"BOX"}]},{"plan_no":"6494008334","posting_time":null,"account_time":"2017/12/60:00:00","instorage_time":null,"uuid":"CG01_190","list":[{"plan_item":"000001","batch_no":"PJ01","production_date":"20171206","material_status":2,"appearance":0,"base_quantity_all":"50.000","base_unit":"BOX"}]},{"plan_no":"4440039477","posting_time":null,"account_time":"2017/10/210:00:00","instorage_time":null,"uuid":"CG01_191","list":[{"plan_item":"00002","batch_no":"SZ01","production_date":"20180212","material_status":2,"appearance":0,"base_quantity_all":"52.000","base_unit":"BOX"}]},{"plan_no":"4440039477","posting_time":null,"account_time":"2017/10/210:00:00","instorage_time":null,"uuid":"CG01_192","list":[{"plan_item":"00004","batch_no":"20160812","production_date":"20160812","material_status":2,"appearance":0,"base_quantity_all":"1.000","base_unit":"BOX"}]},{"plan_no":"4440039477","posting_time":null,"account_time":"2017/10/210:00:00","instorage_time":null,"uuid":"CG01_193","list":[{"plan_item":"00004","batch_no":"20160812","production_date":"20160812","material_status":2,"appearance":0,"base_quantity_all":"1.000","base_unit":"BOX"}]},{"plan_no":"4440039477","posting_time":null,"account_time":"2017/10/210:00:00","instorage_time":null,"uuid":"CG01_194","list":[{"plan_item":"00004","batch_no":"20160812","production_date":"20160812","material_status":2,"appearance":0,"base_quantity_all":"2.000","base_unit":"BOX"}]},{"plan_no":"4440039477","posting_time":null,"account_time":"2017/10/210:00:00","instorage_time":null,"uuid":"CG01_195","list":[{"plan_item":"00004","batch_no":"20160812","production_date":"20160812","material_status":2,"appearance":0,"base_quantity_all":"1.000","base_unit":"BOX"}]},{"plan_no":"4440039477","posting_time":null,"account_time":"2017/10/210:00:00","instorage_time":null,"uuid":"CG01_196","list":[{"plan_item":"00004","batch_no":"20160812","production_date":"20160812","material_status":2,"appearance":0,"base_quantity_all":"3.000","base_unit":"BOX"}]},{"plan_no":"4440039477","posting_time":null,"account_time":"2017/10/210:00:00","instorage_time":null,"uuid":"CG01_197","list":[{"plan_item":"00004","batch_no":"20160812","production_date":"20160812","material_status":2,"appearance":0,"base_quantity_all":"20.000","base_unit":"BOX"}]},{"plan_no":"4440039477","posting_time":null,"account_time":"2017/10/210:00:00","instorage_time":null,"uuid":"CG01_198","list":[{"plan_item":"00004","batch_no":"20160812","production_date":"20160812","material_status":2,"appearance":0,"base_quantity_all":"10.000","base_unit":"BOX"}]},{"plan_no":"4440039477","posting_time":null,"account_time":"2017/10/210:00:00","instorage_time":null,"uuid":"CG01_199","list":[{"plan_item":"00004","batch_no":"20160812","production_date":"20160812","material_status":2,"appearance":0,"base_quantity_all":"11.000","base_unit":"BOX"}]}]}',
	            fwmsInBoundReceiveUrl : 'http://10.227.114.54:8083/fwms/inBound/receive',
	            receivePostResReceive : '[{"INTID":"Tt20171109","DOC_YEAR":"0000","STATUS":"E","MESSAGE":"提单记账行项目在SAP不存在","ZNOTE_EXT":"PGI_OUT","ZNOTE_EXT1":"03"}]',
	            receivePostResReceiveUrl : 'http://10.227.114.54:8083/api/receivePostRes/receive',
	            purchaseOrderReceive : '[{"includeFlag":"include","idocInfo":{"docnum":"0000000006950241","idoctyp":"ZITMM002","rcvprn":"ZMULEPO","mandt":"888","docrel":"731","tabnam":"EDI_DC40","status":"30","direct":"1","outmod":"2","exprss":null,"cimtyp":null,"mestyp":"ZMM002","mescod":null,"mesfct":null,"std":null,"stdvrs":null,"stdmes":null,"sndpor":"SAPCNQ","sndprt":"LS","sndpfc":null,"sndprn":"CNQCLNT888","sndsad":null,"sndlad":null,"rcvpor":"A000000012","rcvprt":"LS","rcvpfc":"LS","rcvsad":null,"rcvlad":null,"credat":"20180124","cretim":"103456","refint":null,"refgrp":null,"refmes":null,"arckey":null,"serial":"20180124103456","test":null},"poheader":[{"includeFlag":"include","poItemLst":[{"includeFlag":"include","poSchedulelineLst":[{"includeFlag":"include","eindt":"20180124","ameng":"0.000","ebeln":"6914000663","ebelp":"00001","etenr":"0001","order":"0","minoccur":"0","type":"include"}],"poItemTextHeaderLst":null,"txz01":"金龙鱼1:1:1花生浓香调和油(5L+400ML)*4","idnlf":null,"peinh":"1","bprme":"BOX","bpumz":"1","bpumn":"1","retpo":null,"bednr":null,"infnr":"5300918081","mwskz":"P5","pstyp":"0","knttp":null,"repos":"X","bstae":null,"kolif":null,"lgobe":"成品库","evers":null,"cgkp":"0.000","eloek":null,"loekz":null,"aedat":"20180124","matkl":"508","werks":"ZH01","menge":"10000.000","ebeln":"6914000663","ebelp":"00001","elikz":null,"netwr":"1000000.00","netpr":"100.00","uebto":"0.0","untto":"0.0","xchpf":"X","parvw":null,"name1":"浙江益海嘉里食品工业有限公司","matnr":"7.49950206119303","lgort":"N010","maktx":"金龙鱼1:1:1花生浓香调和油(5L+400ML)*4","dalei":"10","xilei":"10008","xxlei":"100080013","insmk":null,"meins":"BOX","order":"0","minoccur":"1","type":"include"}],"poHeadertextHeaderLst":null,"eknam":"贸易采购","bukrs":"ZH","bstyp":"F","bsart":"ZH40","loekz":null,"statu":"9","aedat":"20180124","ekorg":"ZH08","ekgrp":"ZHB","wkurs":"1.00000","kdatb":"20180124","kdate":"00000000","ihrez":null,"unsez":null,"frggr":"ZH","frgsx":"ZZ","frgke":"F","frgrl":null,"bedat":"20180124","submi":null,"batxt":"采购订单(贸易)","wtype_N":"采购收货","cys":null,"zhfwz":"A","zytype":"A","zposting":null,"bwkey":null,"zysfs":"B","spras":"1","ernam":"MM-ZHAOZ","lifnr":"9040026581","waers":"CNY","ebeln":"6914000663","zterm":null,"wtype":"Z01","name1":"广西渤海农业发展有限公司","name2":null,"inco1":null,"order":"0","minoccur":"1","type":"include"}],"order":"0","minoccur":"0","type":"include"}]',
	            purchaseOrderReceiveUrl : 'http://10.227.114.54:8083/api/purchaseOrder/receive',
	            ladingOrderReceive : '[{"includeFlag":"include","idocInfo":{"docnum":"0000000006950323","idoctyp":"ZITSD001","rcvprn":"ZMULEDO","mandt":"888","docrel":"731","tabnam":"EDI_DC40","status":"30","direct":"1","outmod":"2","exprss":null,"cimtyp":null,"mestyp":"ZSD001","mescod":null,"mesfct":null,"std":null,"stdvrs":null,"stdmes":"ZSD001","sndpor":"SAPCNQ","sndprt":"LS","sndpfc":null,"sndprn":"CNQCLNT888","sndsad":null,"sndlad":null,"rcvpor":"ZMULEDO","rcvprt":"LS","rcvpfc":"LS","rcvsad":null,"rcvlad":null,"credat":"20180124","cretim":"144000","refint":null,"refgrp":null,"refmes":null,"arckey":null,"serial":"20180124142657662000","test":null},"delvoHead":[{"includeFlag":"include","ernam":"SD-LIUJ","zzsys":null,"delvoItemLst":[{"includeFlag":"include","mtart":"MAIN","matkl":"509","groes":"散装","brgew":"10.000","ntgew":"10.000","gewei":"KG","tragr":"3000","spart":"81","auart":"ZA10","werks":"ZA01","bwart":"601","sobkz":null,"vrkme":"KG","umvkn":"1","uebto":"0.0","untto":"0.0","uecha":"000000","ladgr":"1000","xchpf":"X","vkbur":null,"spart_TXT":"油－小包装","vtweg":"01","vtweg_TXT":"内销","kvgr3":null,"vgbel":"6960044156","vgpos":"000010","zpiece":"是","ztaref":null,"ztare":"0.000","bstkd":null,"lgort_STO":null,"lfstk":null,"lgort_SORT2":null,"lgort_STO_ADR":null,"hsdat":"00000000","gbstk":"B","delvoItemTextLst":null,"lfimg":"10.000","lgort_TXT":"小包装成品库","werks_TXT":"益海嘉里食品营销有限公司浙江分公司","pstyv":"Z070","vgtyp":"C","kdmat":null,"arktx":"蓝匙小麦粉65粉(散装)","umvkz":"1","posnr":"000010","matnr":"6.52299U5T6","lgort":"N010","charg":null,"dalei":"15","xilei":"15002","xxlei":"150020003","meins":"KG","order":"0","minoccur":"1","type":"include"}],"delvoHeadTextLst":null,"delvoPartLst":[{"includeFlag":"include","parvw":"AG","parid":"0121008360","name1":"扬州益康商贸有限公司","name2":null,"street":"江苏省扬州市运河西路185号东城国际7D","city1":"扬州市","country":null,"region":"100","post_CODE1":"225003","fax_NUMBER":"0514-85555593","tel_NUMBER":"0514-87245778","city2":"广陵区","region_TXT":"江苏","str_SUPPL1":null,"str_SUPPL2":null,"order":"0","minoccur":"0","type":"include"},{"includeFlag":"include","parvw":"WE","parid":"0121008360","name1":"扬州益康商贸有限公司","name2":null,"street":"江苏省扬州市运河西路185号东城国际7D","city1":"扬州市","country":null,"region":"100","post_CODE1":"225003","fax_NUMBER":"0514-85555593","tel_NUMBER":"0514-87245778","city2":"广陵区","region_TXT":"江苏","str_SUPPL1":null,"str_SUPPL2":null,"order":"0","minoccur":"0","type":"include"},{"includeFlag":"include","parvw":"ZW","parid":"0000000000","name1":null,"name2":null,"street":null,"city1":null,"country":null,"region":null,"post_CODE1":null,"fax_NUMBER":null,"tel_NUMBER":null,"city2":null,"region_TXT":null,"str_SUPPL1":null,"str_SUPPL2":null,"order":"0","minoccur":"0","type":"include"}],"vbeln":"6961074552","erdat":"20180124","lifex":null,"faksk":null,"cmgst":null,"wbstk":"A","vkorg_M":"X","wtype":"Z03","wtype_TXT":"销售-我方为准","zdate2":null,"ztime2":null,"gbstk":"B","zvbeln_VY":null,"print_FLAG":null,"zzcdid":null,"delflg":null,"vstel":"ZA01","vstel_TXT":"浙江营销分发运点","traid":null,"lfart":"ZA01","lfart_TXT":"浙江分工厂交货单","erzet":"142630","vkorg":"ZASO","print":null,"inco1":null,"inco2":null,"wadat":"20180124","wadat_IST":"00000000","vsbed":"10","vsbed_TXT":"公路-送到","traty":null,"traty_TXT":null,"vsart":"01","vsart_TXT":"汽车","anzpk":"00000","order":"0","minoccur":"1","type":"include"}],"order":"0","minoccur":"0","type":"include"}]',
	            ladingOrderReceiveUrl : 'http://10.227.114.54:8083/api/ladingOrder/receive',
	            splitReceive : '[{"INTID":"CHXF0120180112000005","DOC_NUMBER":"6235397856","STATUS":"S","MESSAGE":"提单拆单成功","ZNOTE_EXT":"F96206CE868046AC8BC1700ED825F0BF"}]',
	            splitReceiveUrl : 'http://10.227.114.54:8083/api/split/receive'
            };
        },
        methods: {
            onSubmit() {
                let that = this;
	            that.fullscreenLoading = true;
	            that.form.response = '';
	            that.form.status = '';
                if (that.form.region === 'HTTP') {
	                if (that.form.url === '') {
                        that.errorMsg('请填写接口URL地址或者选择HTTP接口实例');
                        that.fullscreenLoading = false;
                        return;
	                }
                    let data = {
                        requestUrl : that.form.url,
                        requestType : that.form.resource,
                        requestParameters : that.form.parameters
                    };
	                $.post('http://10.118.150.10:8083/interfaceTest/sendOutHTTP', data, function (res) {
                        that.fullscreenLoading = false;
                        if (res.data) {
                            that.form.response = res.data.responseParameters;
                            that.form.status = res.data.statusCode;
                        }
                        if (res.code !== 0) {
                            that.errorMsg(res.msg);
                        }
	                }, 'json');
                } else if (that.form.region === 'MQ') {
                    if (that.form.mqServiceName === '') {
                        that.errorMsg('请选择MQ接口实例');
	                    that.fullscreenLoading = false;
                        return;
                    }
                    if (that.form.parameters === '') {
                        that.errorMsg('请填写请求参数');
	                    that.fullscreenLoading = false;
                        return;
                    }
                    let data = {
                        mqServiceName : that.form.mqServiceName,
                        requestParameters : that.form.parameters
                    };
                    $.post('http://10.118.150.10:8083/interfaceTest/sendOutMQ', data, function (res) {
                        that.fullscreenLoading = false;
                        if (res.data) {
                            that.form.response = res.data.responseParameters;
                        }
                        if (res.code !== 0) {
                            that.errorMsg(res.msg);
                        }
                    }, 'json');
                }
            },
            region() {
                let that = this;
                if (that.form.region === 'MQ') {
                    that.hideTo = false;
                    that.hideThree = true;
                    that.hideFour = true;
                } else {
                    that.hideTo = true;
                    that.hideThree = false;
                    that.hideFour = false;
                }
	            that.form.url = '';
	            that.form.mqServiceName = '';
	            that.form.status = '';
	            that.form.httpServiceName = '';
	            that.form.response = '';
            },
	        httpon() {
                let that = this;
                if (that.form.httpServiceName !== '') {
                    that.hideFour = true;
                }
                if (that.form.httpServiceName === 'fwmsOutBoundReceive') {
	                that.form.parameters = that.fwmsOutBoundReceive;
	                that.form.url = that.fwmsOutBoundReceiveUrl;
                }
                if (that.form.httpServiceName === 'fwmsInBoundReceive') {
	                that.form.parameters = that.fwmsInBoundReceive;
	                that.form.url = that.fwmsInBoundReceiveUrl;
                }
                if (that.form.httpServiceName === 'receivePostResReceive') {
	                that.form.parameters = that.receivePostResReceive;
	                that.form.url = that.receivePostResReceiveUrl;
                }
                if (that.form.httpServiceName === 'purchaseOrderReceive') {
	                that.form.parameters = that.purchaseOrderReceive;
	                that.form.url = that.purchaseOrderReceiveUrl;
                }
                if (that.form.httpServiceName === 'ladingOrderReceive') {
	                that.form.parameters = that.ladingOrderReceive;
	                that.form.url = that.ladingOrderReceiveUrl;
                }
                if (that.form.httpServiceName === 'splitReceive') {
	                that.form.parameters = that.splitReceive;
	                that.form.url = that.splitReceiveUrl;
                }
            },
            // 重置
            onReset() {
                let that = this;
                that.form.url = '';
                that.form.region = 'HTTP';
                that.form.resource = 'POST';
                that.form.parameters = '';
                that.form.response = '';
                that.form.status = '';
	            that.form.response = '';
                that.hideTo = true;
	            that.hideThree = false;
            }
        }
    };
</script>

<style>
    .interfaceTest{
        width: 100%;
        padding: 4% 10% 0;
        box-sizing: border-box;
    }
    .interfaceTest .el-input__inner,.interfaceTest .el-form-item{
        height: 30px;
        /*float: left;*/
    }
    .interfaceTest .el-form-item__label{
        width: 160px !important;
        /*float: left;*/
    }
    .interfaceTest .el-form-item__content{
        margin-left: 160px !important;
        line-height: 30px !important;
        /*float: left;*/
        /*width: 60%;*/
    }
    .interfaceTest .interfaceTestLf{
        float: left;
    }
    .interfaceTestText{

        height: auto !important;
        clear: both;
        margin-bottom: 25px;
    }
    .interfaceTestText  textarea{
        min-height: 300px !important;
    }
</style>