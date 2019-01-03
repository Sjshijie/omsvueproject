// import Vue from 'vue';
import Router from 'vue-router';
import homePage from '@/components/homePage';

/**
 * 主数据相关页面
 */
import shipper from '@/components/base/shipper';
import delivery from '@/components/base/delivery';
import sold from '@/components/base/sold';
import unit from '@/components/base/unit';
import warehouse from '@/components/base/warehouse';
import business from '@/components/base/business';
import region from '@/components/base/region';
import material from '@/components/base/material';
import factoryDc from '@/components/base/factoryDc';
import materialGroup from '@/components/base/materialGroup';
import shipperWarehouseStrategy from '@/components/base/shipperWarehouseStrategy';
import thresholdStrategy from '@/components/base/thresholdStrategy';
import orgStrategy from '@/components/base/orgStrategy';
import orgRelationship from '@/components/base/orgRelationship';
import nodeGroup from '@/components/base/nodeGroup'; // 订单节点
import interfaceTest from '@/components/base/interfaceTest'; // 接口测试
// LOMS-MD页面
import soldMd from '@/components/base/sold-md';
import deliveryMd from '@/components/base/delivery-md';
import shipperMd from '@/components/base/shipper-md';
import materialMd from '@/components/base/material-md';
import materialBind from '@/components/base/materialBind';
// import deliveryextbound from '@/components/base/deliveryextbound';
// table表格拖动
import table from '@/components/base/table';

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/base/homePage/:lang/:token',
            name: 'homePage',
            component: homePage
        },
        {
            path: '/base/shipper/:lang/:token',
            name: 'shipper',
            component: shipper
        },
        {
            path: '/base/factoryDc/:lang/:token',
            name: 'factoryDc',
            component: factoryDc
        },
        {
            path: '/base/material/:lang/:token',
            name: 'material',
            component: material
        },
        {
            path: '/base/materialGroup/:lang/:token',
            name: 'materialGroup',
            component: materialGroup
        },
        {
            path: '/base/delivery/:lang/:token',
            name: 'delivery',
            component: delivery
        }, {
            path: '/base/sold/:lang/:token',
            name: 'sold',
            component: sold
        }, {
            path: '/base/unit/:lang/:token',
            name: 'unit',
            component: unit
        }, {
            path: '/base/warehouse/:lang/:token',
            name: 'warehouse',
            component: warehouse
        }, {
            path: '/base/business/:lang/:token',
            name: 'business',
            component: business
        }, {
            path: '/base/region/:lang/:token',
            name: 'region',
            component: region
        }, {
            path: '/base/shipperWarehouseStrategy/:lang/:token',
            name: 'shipperWarehouseStrategy',
            component: shipperWarehouseStrategy
        }, {
            path: '/base/thresholdStrategy/:lang/:token',
            name: 'thresholdStrategy',
            component: thresholdStrategy
        }, {
            path: '/base/orgStrategy/:lang/:token',
            name: 'orgStrategy',
            component: orgStrategy
        }, {
            path: '/base/orgRelationship/:lang/:token',
            name: 'orgRelationship',
            component: orgRelationship
        }, {
            path: '/base/nodeGroup/:lang/:token',
            name: 'nodeGroup',
            component: nodeGroup
        }, {
            path: '/base/interfaceTest/:lang/:token',
            name: 'interfaceTest',
            component: interfaceTest
        },
        {
            path: '/base/shipperMd/:lang/:token',
            name: 'shipperMd',
            component: shipperMd
        },
        {
            path: '/base/materialMd/:lang/:token',
            name: 'materialMd',
            component: materialMd
        },
        {
            path: '/base/soldMd/:lang/:token',
            name: 'soldMd',
            component: soldMd
        },
        {
            path: '/base/table/:lang/:token',
            name: 'table',
            component: table
        },
        {
            path: '/base/deliveryMd/:lang/:token',
            name: 'deliveryMd',
            component: deliveryMd
        },
        {
          path: '/base/materialBind/:lang/:token',
          name: 'materialBind',
          component: materialBind
        },
        // {
        //     path: '/base/deliveryextbound/:lang/:token',
        //     name: 'deliveryextbound',
        //     component: deliveryextbound
        // },
        {
            path: '*',
            redirect: {path: '/404'}
        }
    ]
});
