module.exports = {
    // 公共按钮
    button: {
        add: 'add',
        delete: 'delete',
        update: 'update',
        view: 'view',
        enable: 'enable',
        disable: 'disable',
        cancel: 'cancel',
        confirm: 'confirm',
        save: 'save',
        close: 'close',
        query: 'search',
        reset: 'reset',
        importExcel: 'importExcel',
        exportExcel: 'exportExcel',
        upload: 'upload',
        download: 'download',
        resetPassword: 'reset password',
        bind: 'bind',
        bindMateriel: 'bind materiel',
        bindFactory: 'bind factory',
        bindSold: 'bind sold',
        bindDelivery: 'bind delivery',
        moreimport: 'moreimport'
    },
    // 公共信息
    common: {
        searchInfo: '查询信息',
        pleaseEnter: '请输入',
        pleaseChoose: '请选择'
    },
    // table表头
    commonThead: {
        index: '序号',
        name: '全称',
        shortName: '简称',
        type: '类型',
        operation: '操作',
        status: '状态',
        address: '地址',
        contactPerson: '联系人',
        telephone: '联系电话',
        creater: '创建人',
        createTime: '创建时间',
        updater: '修改人',
        updateTime: '修改时间',
        countryName: '国家名称',
        provinceName: '省名称',
        cityName: '市民称',
        districtName: '区县名称',
        streetName: '街道名称',
        postcode: '邮编',
        description: '描述',
        note: '备注',
        barCode: '69码',
        length: '长度',
        width: '宽度',
        height: '高度',
        volume: '体积',
        area: '面积',
        disableStatus: '启禁用状态',
        busStatus: '业务使用状态'
    },
    // 货主表头
    shipperThead: {
        shipperName: '货主名称',
        shipperCode: '货主编码',
        shortName: '货主简称',
        shipperType: '货主类型',
        services: '服务类型',
        businessType: '业务类型',
        onlineTime: '上线时间',
        operatingPeriod: '经营期限',
        parentName: '上级货主名称'
    },
    // 物料表头
    materialThead: {
        materialName: '物料名称',
        materialCode: '物料编码',
        materialGroupName: '物料组',
        importationStatus: '是否进口',
        type: '物料类型',
        onlineTime: '上线时间',
        parentName: '上级货主名称'
    },
    // 物料组表头
    materialGroupThead: {
        name: '物料组名称',
        code: '物料组编码',
        hierarchy: '物料组层级',
        systemType: '系统类型'
    },
    // 地址信息管理表头
    regionThead: {
        name: '区划名称',
        code: '区划编码',
        type: '区划类型'
    },
    // 送达方表头
    deliveryThead: {
        deliveryCode: '送达方编码',
        deliveryName: '送达方全称',
        shortName: '送达方简称',
        salesChannel: '销售渠道',
        sapCode: 'SAP编码'
    },
    // 售达方表头
    soldThead: {
        soldCode: '售达方代码',
        soldName: '售达方全称',
        shortName: '售达方别称'
    },
    // 仓库管理表头
    warehouseThead: {
        warehouseCode: '仓库编码',
        warehouseName: '仓库名称',
        warehouseAddres: '仓库地址'
    },
    // 工厂物流中心表头
    factoryDcThead: {
        factoryLogisticsCode: '工厂Dc编码',
        factoryLogisticsName: '工厂Dc名称',
        orgName: '组织'
    },
    // 单位管理表头
    unitThead: {
        code: '单位编码',
        name: '单位名称',
        type: '单位类型',
        defaults: '是否默认'
    },
    // 单位管理表头
    businessThead: {
        code: '事业部编码',
        name: '事业部名称'
    },
    // 货主Md表头
    materialMdThead: {
        shipper: '货主',
        inorout: '是否进口',
        expirationDate: '保质期',
        specification: '规格',
        mpgz: '码盘规则'
    },
    // 操作成功/失败提示信息
    msg: {
        success: '操作成功',
        error: '操作失败'
    },
    success: '操作成功',
    error: '操作失败',
    parametersIllegal: '参数非法',
    storageIntoFailException: '仓储转入异常',
    issuedDataIsNullMessage: '系统未获取到下发数据',
    updateMsgError: '更新失败',
    updateMsgSuccess: '更新成功',
    deleteMsgSuccess: '删除成功',
    deleteMsgError: '删除失败',
    insertMsgSuccess: '新增成功',
    insertMsgError: '新增失败',
    getMsgError: '查询失败',
    paramMsgError: '参数有误',
    PlanOutboundExportServiceAdapter: {
        cancelPlanOutbound: {
            error: '取消计划单出错'
        },
        update: {
            error: 'ID与计划单号不能全部为空',
            failMessage: '更新失败'
        },
        selectPlanOutboundAndDetailByPlanNo: {
            planOutboundIsExist: '计划出库单号不存在'
        },
        planOutboundIssued: {
            useDataMessage: '您所选数据正在被其他用户正在进行操作'
        },
        selectPlanBySpiltNo: {
            resultMessage: '查询失败',
            splitNoMessage: '请输入拆单号'
        },
        planOutboundPoste: {
            posteExceptionMessage: '出库单SAP过账异常'
        }
    },
    ProcurementExportServiceAdapter: {
        deleteBatch: {
            orderNosMessage: '订单号数组不能为空',
            updaterMessage: '修改人不能为空'
        }
    },
    ProcurementServiceImpl: {
        check: {
            shipperIdMessage: '请选择货主',
            factoryLogisticsIdMessage: '请选择工厂/物流中心',
            warehouseIdMessage: '请选择工厂/物流中心',
            transportWayMessage: '请选择运输方式',
            distributionWayMessage: '请选择配送方式',
            inoroutMessage: '请选择出/入库类型',
            withCarFlagMessage: '请选择是否需要配车'
        },
        update: {
            procurementNoMessage: '订单号不能为空',
            versionMessage: '订单版本号不能为空'
        }
    },
    SalesOrderExportServiceAdapter: {
        update: {
            updaterMessage: '修改人为空',
            resultMessage: '修改失败'
        },
        queryByOrderNo: {
            orderNoMessage: '订单号不能为空',
            errorMessage: '查询失败'
        },
        updateSalesOrderDelStatus: {
            orderNoNullMessage: '订单号不能为空',
            delStatusNullMessage: '删除状态不能为空',
            faliMessage: '更新失败'
        },
        insertSalesOrdeAndDetailBaseOrder: {
            allDtoNullMessage: '订单数据为空',
            cteateByMessge: '创建人为空',
            addSalesMessage: '新增销售订单失败'
        },
        validateDto: {
            businessTypeMessage: '业务类型只能是集团外',
            storehouseStatusMessage: '分仓状况只能是未分仓'
        },
        updateSalesOrdeAndDetailBaseOrder: {
            allDtoNullMessage: '订单数据为空',
            updateByMessge: '修改人为空',
            updateSalesMessage: '修改销售订单失败'
        },
        deleteSalesOrdeAndDetailBaseOrder: {
            orderNosMessage: '订单号不能为空',
            delSelMessage: '删除销售订单失败',
            delMessage: '删除失败',
            statusMessage: '分仓状态只能是未分仓、分仓失败'
        },
        selectSalesBaseOrderList: {
            queryMessage: '查询销售订单失败'
        }
    },
    TransfersServiceImpl: {
        check: {
            shipperIdMessage: '请选择货主',
            transportWayMessage: '请选择运输方式',
            distributionWayMessage: '请选择配送方式',
            withCarFlagMessage: '请选择是否需要配车',
            receiveFactoryDcMessage: '请选择收货工厂/物流中心',
            branchNameMessage: '请输入公司名称'
        },
        update: {
            moveNoMessage: '订单号不能为空',
            versionMessage: '订单版本号不能为空',
            controlMessage: '该订单已被锁住'
        }
    },
    TransfersExportServiceAdapter: {
        updateTransfersDelStatus: {
            moveNoNullMessage: '订单号不能为空',
            delStatusNullMessage: '删除状态不能为空'
        },
        deleteBatchByOrders: {
            orderNosMessage: '订单号数组不能为空',
            updaterMessage: '修改人不能为空'
        },
        lockOrder: {
            orderNoNullMessage: '订单号不能为空',
            lockFlagMessage: '锁定状态错误',
            failMessage: '操作失败'
        }
    },
    BusinessDepartmentExportServiceImpl: {
        queryListPager: {
            error: '查询列表出错'
        },
        insertBusinessDepartment: {
            saveSuccess: '事业部保存成功',
            saveFail: '事业部保存失败',
            repeatFail: '事业部编码已经存在',
            errorMsg: '事业部信息读取错误'
        },
        insertBusinessDepartmentBatch: {
            saveSuccess: '事业部保存成功',
            saveFail: '事业部保存失败',
            repeatFail: '该记录数据库中已存在',
            errorMsg: '事业部列表获取失败'
        },
        selectBusinessDepartmentById: {
            failMessage: '根据ID查询事业部失败',
            errorMsg: '事业部ID获取失败'
        },
        deleteBusinessDepartment: {
            successMessage: '事业部删除成功',
            failMessage: '事业部删除失败',
            errorMsg: '事业部ID获取失败',
            errorUser: '当前用户获取失败'
        },
        deleteBusinessDepartmentBatch: {
            success: '删除成功',
            failed: '删除失败',
            errorUser: '当前用户获取失败',
            errorID: '事业部列表获取失败',
            errorVersion: '版本号不能为空'
        },
        updateBusinessDepartmentStatus: {
            success: '仓库启用/禁用成功',
            fail: '仓库启用/禁用失败',
            errorList: '事业部列表获取失败',
            errorStatus: '停启用状态获取失败',
            errorUser: '当前用户获取失败',
            errorVersion: '版本号不能为空'
        },
        updateBusinessDepartment: {
            success: '修改成功',
            failed: '修改失败',
            errorBean: '事业部信息获取失败',
            errorID: '事业部ID获取失败'
        },
        updateBusinessDepartmentPatch: {
            idNullError: 'ID不能为空',
            success: '修改成功',
            failed: '修改失败',
            errorList: '事业部列表获取失败'
        },
        validate: {
            nameNullMessage: '名称不能为空',
            nameLengthError: '名称长度超过限制',
            codeNullMessage: '编码不能为空',
            codeLengthError: '编码长度超过限制',
            notoOutMessage: '备注内容超过100字符'
        },
        selectBusinessDepartmentVague: {
            error: '名称、备注、创建人、修改人不能全为空！'
        }
    },
    DeliveryExportServiceAdapter: {
        queryListPager: {
            queryExceptionMessage: '分页查询异常'
        },
        insertDeliveryPatch: {
            saveSuccess: '送达方保存成功',
            saveFail: '送达方保存失败',
            saveFailRepeat: '参数中存在重复的编码',
            saveFailDBRepeat: '送达方编码已存在'
        },
        getDeliveryById: {
            idNullMessage: 'ID不能为空',
            failMessage: '根据ID查询送达方失败'
        },
        updateDeliveryPatch: {
            updateSuccess: '送达方更新成功',
            updateFail: '送达方更新失败',
            updateFailRepeat: '参数中存在重复的编码',
            updateFailDBRepeat: '送达方编码已存在'
        },
        deleteDelivery: {
            paramNullMessage: '参数不能为空',
            successDeleteMessage: '送达方删除成功',
            failDeleteMessage: '送达方删除失败'
        },
        deleteDeliveryBatch: {
            paramExceptionMessage: '参数异常',
            successPatchDeleteMessage: '送达方批量删除成功',
            failPatchDeleteMessage: '送达方批量删除失败'
        },
        updateStatus: {
            updateStatusSuccess: '送达方启用/禁用成功',
            updateStatusFail: '送达方启用/禁用失败',
            idNullMessage: 'id不能为空',
            statusNullMessage: '状态不能为空'
        },
        validateInsert: {
            deliveryCodeNullMessage: '送达方编码不能为空',
            deliveryCodeOutMessage: '送达方编码不能超过60个字符',
            nameNullMessage: '送达方全称不能为空',
            nameOutMessage: '送达方全称不能超过100个字符',
            shortNameNullMessage: '送达方简称不能为空',
            shortNameOutMessage: '送达方简称不能超过100个字符',
            soldNullMessage: '售达方不能为空',
            salesChannelNullMessage: '销售渠道不能为空',
            lineNullMessage: '所属线路不能为空',
            lineOutMessage: '所属线路不能超过100个字符',
            countryIdNullMessage: '国家id不能为空',
            countryNameNullMessage: '国家名称不能为空',
            countryNameOutMessage: '国家名称不能超过50个字符',
            provinceIdNullMessage: '省id不能为空',
            provinceNameNullMessage: '省名称不能为空',
            provinceNameOutMessage: '省名称不能超过50个字符',
            cityIdNullMessage: '市id不能为空',
            cityNameNullMessage: '市名称不能为空',
            cityNameOutMessage: '市名称不能超过50个字符',
            districtIdNullMessage: '区县id不能为空',
            districtNameNullMessage: '区县名字不能为空',
            districtNameOutMessage: '区县名字不能超过50个字符',
            streetIdNullMessage: '街道id不能为空',
            streetNameNullMessage: '街道名字不能为空',
            streetNameOutMessage: '街道名字不能超过100个字符',
            addressOutMessage: '地址不能超过500个字符',
            postcodeNullMessage: '邮编不能为空',
            postcodeOutMessage: '邮编不能超过20个字符',
            contactPersonNullMessage: '联系人不能为空',
            contactPersonOutMessage: '联系人不能超过50个字符',
            telephoneNullMessage: '联系电话不能为空',
            telephoneOutMessage: '联系电话不能超过20个字符',
            sapCodeOutMessage: 'SAP送达方编码不能超过100个字符',
            lngLatOutMessage: '经纬度不能超过20个字符',
            createrNullMessage: '创建人不能为空',
            createrOutMessage: '创建人不能超过100个字符'
        },
        validateUpdate: {
            idNullMessage: 'ID不能为空',
            deliveryCodeNullMessage: '送达方编码不能为空',
            deliveryCodeOutMessage: '送达方编码不能超过60个字符',
            nameNullMessage: '送达方全称不能为空',
            nameOutMessage: '送达方全称不能超过100个字符',
            shortNameNullMessage: '送达方简称不能为空',
            shortNameOutMessage: '送达方简称不能超过100个字符',
            soldNullMessage: '售达方不能为空',
            salesChannelNullMessage: '销售渠道不能为空',
            lineNullMessage: '所属线路不能为空',
            lineOutMessage: '所属线路不能超过100个字符',
            countryIdNullMessage: '国家id不能为空',
            countryNameNullMessage: '国家名称不能为空',
            countryNameOutMessage: '国家名称不能超过50个字符',
            provinceIdNullMessage: '省id不能为空',
            provinceNameNullMessage: '省名称不能为空',
            provinceNameOutMessage: '省名称不能超过50个字符',
            cityIdNullMessage: '市id不能为空',
            cityNameNullMessage: '市名称不能为空',
            cityNameOutMessage: '市名称不能超过50个字符',
            districtIdNullMessage: '区县id不能为空',
            districtNameNullMessage: '区县名字不能为空',
            districtNameOutMessage: '区县名字不能超过50个字符',
            streetIdNullMessage: '街道id不能为空',
            streetNameNullMessage: '街道名字不能为空',
            streetNameOutMessage: '街道名字不能超过100个字符',
            addressOutMessage: '地址不能超过500个字符',
            postcodeNullMessage: '邮编不能为空',
            postcodeOutMessage: '邮编不能超过20个字符',
            contactPersonNullMessage: '联系人不能为空',
            contactPersonOutMessage: '联系人不能超过50个字符',
            telephoneNullMessage: '联系电话不能为空',
            telephoneOutMessage: '联系电话不能超过20个字符',
            sapCodeOutMessage: 'SAP送达方编码不能超过100个字符',
            updaterNullMessage: '修改人不能为空',
            updaterOutMessage: '修改人不能超过100个字符',
            lngLatOutMessage: '经纬度不能超过20个字符',
            versionNullMessage: '版本号不能为空'
        },
        selectByIdCodeName: {
            nullMessage: '查询条件不能同时为空',
            successMessage: '查询成功',
            failMessage: '查询失败'
        },
        selectDeliveryByDeliveryIds: {
            idNullMessage: '送达方id不能为空',
            successMessage: '查询成功',
            failMessage: '查询失败'
        },
        selectDeliveryByName: {
            deliveryNameNullMessage: '送达方名称不能为空',
            success: '查询成功',
            fail: '查询失败'
        },
        selectDeliveryByNamePager: {
            deliveryNameNullMessage: '送达方名称不能为空',
            shipperIdNullMessage: '货主id不能为空',
            fail: '查询失败'
        },
        selectDeliveryByDeliveryIdsPage: {
            idNullMessage: '送达方id不能为空',
            failMessage: '查询失败'
        }
    },
    FactoryShipperRelationExportServiceAdapter: {
        selectList: {
            failMessage: '查询异常'
        },
        insertFactoryShipperRelationPatch: {
            saveSuccess: '工厂货主关系保存成功',
            saveFail: '工厂货主关系保存失败',
            shipperIdNullMessage: '货主id不能为空',
            factoryLogisticsIdNullMessage: '工厂物流中心id不能为空',
            inventoryCodeOutMessage: '库存地编码不能超过20个字符'
        },
        selectListPager: {
            shipperIdNullMessage: '货主ID不能为空',
            failMessage: '查询失败'
        },
        deleteFactoryShipperRelationBatch: {
            paramExceptionMessage: '参数异常',
            successPatchDeleteMessage: '工厂货主关系批量删除成功',
            failPatchDeleteMessage: '工厂货主关系批量删除失败'
        },
        selectFactoryShipperRelationList: {
            queryError: '查询失败'
        }
    },
    MaterialExportServiceAdapter: {
        selectListByKey: {
            resultMessage: '查询失败'
        },
        queryList: {
            resultMessage: '查询失败'
        },
        queryMaterialByShipper: {
            resultMessage: '查询失败',
            shipperIdMessage: '货主ID不能为空'
        },
        queryById: {
            idMessage: 'id不能为空',
            resultMessage: '查询失败'
        },
        queryByCode: {
            resultMessage: '查询失败',
            codeMessage: '编码不能为空'
        },
        queryByCodes: {
            resultMessage: '查询失败',
            codeMessage: '编码数组不能为空'
        },
        addBatch: {
            createrMessage: '创建人不能为空',
            resultMessage: '操作失败'
        },
        updateBatch: {
            updaterMessage: '修改人不能为空',
            resultMessage: '操作失败'
        },
        disable: {
            idsMessage: 'id不能为空',
            versionsMessage: '版本号不能为空',
            updaterMessage: '修改人不能为空',
            resultMessage: '操作失败'
        },
        enable: {
            idsMessage: 'id不能为空',
            versionsMessage: '版本号不能为空',
            updaterMessage: '修改人不能为空',
            resultMessage: '操作失败'
        },
        delete: {
            idsMessage: 'id不能为空',
            versionsMessage: '版本号不能为空',
            updaterMessage: '修改人不能为空',
            resultMessage: '操作失败'
        },
        getMaterialByIdsPager: {
            idNullMessage: 'id不能为空',
            failMessage: '查询失败'
        },
        selectMaterialByNamePager: {
            materialNameNullMessage: '物料名称不能为空',
            shipperIdNullMessage: '货主id不能为空'
        }
    },
    MaterialGroupExportServiceAdapter: {
        queryList: {
            resultMessage: '查询失败'
        },
        queryList_one: {
            resultMessage: '查询失败',
            idsMessage: '参数异常'
        },
        queryById: {
            idMessage: 'id不能为空',
            resultMessage: '查询失败'
        },
        add: {
            codeMessage: '编码不能为空',
            nameMessage: '名称不能为空',
            sourceSystemMessage: '来源系统不能为空',
            createrMessage: '创建人不能为空',
            resultMessage: '操作失败',
            codeCheckMessage: '已存在重复编码'
        },
        update: {
            idMessage: 'id不能为空',
            updaterMessage: '修改人不能为空',
            resultMessage: '操作失败',
            codeCheckMessage: '已存在重复编码'
        },
        disable: {
            idMessage: 'id不能为空',
            updaterMessage: '修改人不能为空',
            resultMessage: '操作失败'
        },
        enable: {
            idMessage: 'id不能为空',
            updaterMessage: '修改人不能为空',
            resultMessage: '操作失败'
        },
        delete: {
            idMessage: 'id不能为空',
            updaterMessage: '修改人不能为空',
            resultMessage: '操作失败'
        }
    },
    MaterialGroupRelationServiceAdapter: {
        queryList: {
            materialIDMessage: '物料ID与物料组ID不能全部为空',
            resultMessage: '查询失败'
        },
        add: {
            materialIDMessage: '物料ID不能为空',
            materialGroupMessage: '物料组ID不能为空',
            resultMessage: '操作失败'
        },
        deleteById: {
            idsMessage: 'id不能为空',
            resultMessage: '操作失败'
        },
        deleteByMaterial: {
            idsMessage: '物料ID不能为空',
            resultMessage:
                '操作失败'
        },
        deleteByGroup: {
            idsMessage: '物料组ID不能为空',
            resultMessage: '操作失败'
        },
        delete: {
            idsMessage: '物料ID与物料组ID不能为空',
            resultMessage: '操作失败'
        }
    },
    ShipperMaterialExportServiceAdapter: {
        queryList: {
            resultMessage: '查询失败'
        },
        queryById: {
            resultMessage: '查询失败'
        },
        add: {
            materialCodeMessage: '物料ID不能为空',
            shipperCodeMessage: '货主与工厂/物流中心不能都为空',
            createrMessage: '创建人不能为空',
            resultMessage: '操作失败'
        },
        update: {
            idMessage: 'id不能为空',
            versionMessage: '版本号不能为空',
            materialCodeMessage: '物料ID不能为空',
            shipperCodeMessage: '货主ID与工厂/物流中心ID不能全部为空',
            updaterMessage: '修改人不能为空',
            resultMessage: '操作失败'
        },
        delete: {
            ShipperidMessage: '主键ID不能为空',
            ShipperupdaterMessage: '修改人不能为空',
            ShipperresultMessage: '操作失败'
        },
        deleteByShipper: {
            idMessage: '货主ID数组不能为空',
            updaterMessage: '修改人不能为空',
            resultMessage: '操作失败'
        },
        deleteByMaterial: {
            idMessage: '物料ID数组不能为空',
            updaterMessage: '修改人不能为空',
            resultMessage: '操作失败'
        },
        deleteByFctoryLogistics: {
            idMessage: '工厂/物流中心ID数组不能为空',
            updaterMessage: '修改人不能为空',
            resultMessage: '操作失败'
        }
    },
    MeasureUnitExportServiceAdapter: {
        saveMeasureUnit: {
            saveMeasureUnitFail: '单位信息保存失败',
            codeIsExistMessage: '单位编号已存在',
            nameAndTypeIsExistMessage: '同一种单位类型,单位名称存在重复'
        },
        updateMeasureUnitById: {
            updateMeasureUnitFail: '单位信息更新失败'
        },
        removeMeasureUnitBatch: {
            removeMeasureUnitFail: '单位信息删除失败',
            parametersIllegal: '参数非法'
        },
        selectMeasureUnitById: {
            parametersIllegal: '参数非法'
        },
        selectMeasureUnitById_one: {
            parametersIllegal: '参数非法'
        },
        selectCodeIsExist: {
            parametersIllegal: '参数非法',
            codeIsExistMessage: '单位编号已存在'
        },
        updateMeasureUnitStatusBatch: {
            parametersIllegal: '参数非法',
            updateMeasureUnitStatusFail: '修改单位信息启用状态失败'
        },
        updateValidateParameter: {
            parametersIllegal: '参数非法',
            nameNullMessage: '单位名称不能为空',
            nameOutMessage: '单位名称不能超过25个字符',
            typeNullMessage: '单位类型不能为空',
            typeNotExistMessage: '单位类型不存在',
            descriptionNameOutMessage: '单位描述不能超过100个字符',
            defaultNullMessage: '默认状态不能为空',
            defaultNotExistMessage: '默认不存在',
            defaultIsExistMessage: '该单位类型已经存在默认单位'
        },
        saveValidateParameter: {
            parametersIllegal: '参数非法',
            codeNullMessage: '单位编号不能为空',
            codeOutMessage: '单位编号不能超过10个字符',
            nameNullMessage: '单位名称不能为空',
            nameOutMessage: '单位名称不能超过25个字符',
            typeNullMessage: '单位类型不能为空',
            typeNotExistMessage: '单位类型不存在',
            descriptionNameOutMessage: '单位描述不能超过100个字符',
            defaultNullMessage: '默认状态不能为空',
            defaultNotExistMessage: '默认不存在',
            defaultIsExistMessage: '该单位类型已经存在默认单位'
        }
    },
    NodeGroupExportServiceAdapter: {
        selectNodeGroupListPage: {
            parametersIllegal: '参数非法'
        },
        selectNodeGroupById: {
            parametersIllegal: '参数非法'
        },
        saveNodeGroupBatch: {
            saveNodeGroupFail: '订单节点分类信息保存失败',
            parametersIllegal: '参数非法'
        },
        updateNodeGroupBatch: {
            updateNodeGroupFail: '订单节点分类信息修改失败',
            parametersIllegal: '参数非法'
        },
        saveNodeGroup: {
            saveNodeGroupFail: '订单节点分类信息保存失败',
            parametersIllegal: '参数非法'
        },
        updateNodeGroup: {
            updateNodeGroupFail: '订单节点分类信息修改失败',
            parametersIllegal: '参数非法'
        },
        removeNodeGroupBatch: {
            removeNodeGroupFail: '订单节点分类删除失败',
            parametersIllegal: '参数非法'
        },
        updateNodeGroupStatusBatch: {
            parametersIllegal: '参数非法',
            updateNodeGroupStatusFail: '修改订单节点信息启用状态失败'
        },
        selectNodeGroupIsExist: {
            parametersIllegal: '参数非法',
            nodeIdNullMessage: '节点ID不能为空',
            nodeNameNullMessage: '节点名称不能为空',
            nodeGroupIsExistMessage: '订单节点分类已存在',
            inOutTypeNullMessage: '出入库方式不能为空',
            inOutTypeNotExistMessage: '出入库方式不存在',
            transportStatusNullMessage: '是否配车不能为空',
            transportStatusNotExistMessage: '是否配车不存在'
        },
        saveValidateParameter: {
            parametersIllegal: '参数非法',
            groupNameOutMesssage: '分类名称不能超过50个字符',
            nodeIdNullMessage: '节点ID不能为空',
            nodeNameOutMessage: '节点名称不能超过50个字符',
            inOutTypeNullMessage: '出入库方式不能为空',
            inOutTypeNotExistMessage: '出入库方式不存在',
            transportStatusNullMessage: '是否配车不能为空',
            transportStatusNotExistMessage: '是否配车不存在',
            nodeGroupIsExistMessage: '节点分类信息已存在'
        },
        updateValidateParameter: {
            parametersIllegal: '参数非法',
            idNullMessage: '节点分类主键ID不能为空',
            nodeNameOutMessage: '节点名称不能超过50个字符',
            groupNameOutMesssage: '分类名称不能超过50个字符',
            nodeIdNullMessage: '节点名称不能为空',
            inOutTypeNullMessage: '出入库方式不能为空',
            inOutTypeNotExistMessage: '出入库方式不存在',
            transportStatusNullMessage: '是否配车不能为空',
            transportStatusNotExistMessage: '是否配车不存在',
            nodeGroupIsExistMessage: '节点分类信息已存在'
        }
    },
    NodesExportServiceAdapter: {
        saveNodesBatch: {
            saveNodesFail: '节点信息保存失败',
            parametersIllegal: '参数非法'
        },
        removeNodesBatch:
            {
                removeNodesFail: '节点信息删除失败',
                parametersIllegal: '参数非法'
            },
        updateNodesBatch:
            {
                updateNodesFail: '订单节点信息更新失败',
                parametersIllegal: '参数非法'
            },
        selectNodesListPage:
            {
                parametersIllegal: '参数非法'
            },
        selectNodesById:
            {
                parametersIllegal: '参数非法'
            },
        selectNodeCodeIsExist:
            {
                parametersIllegal: '参数非法',
                nodeCodeIsExistMessage: '节点编号已存在'
            },
        updateNodesStatusBatch:
            {
                parametersIllegal: '参数非法',
                updateNodesStatusFail: '修改订单节点信息启用状态失败'
            },
        saveNode:
            {
                saveNodesFail: '节点信息保存失败'
            },
        updateNode:
            {
                updateNodesFail: '货主信息更新失败'
            },
        selectNodeByNodeName:
            {
                parametersIllegal: '参数非法'
            },
        saveValidateParameter:
            {
                parametersIllegal: '参数非法',
                nodeCodeNullMessage: '节点编码不能为空',
                nodeCodeIsExistMessage: '节点编码已存在',
                nodeCodeOutMessage: '节点编码不能超过10个字符',
                nodeNameNullMessage: '节点名称不能为空',
                nodeNameOutMessage: '节点名称不能超过50个字符'
            },
        updateValidateParameter:
            {
                parametersIllegal: '参数非法',
                idNullMessage: '节点主键ID不能为空',
                nodeNameNullMessage: '节点名称不能为空',
                nodeNameOutMessage: '节点名称不能超过50个字符'
            }
    },
    OrgStrategyExportServiceAdapter: {
        queryListPager: {
            queryExceptionMessage: '分页查询异常'
        },
        insertOrgStrategy:
            {
                saveSuccess: '分仓策略保存成功',
                saveFail: '分仓策略保存失败',
                saveFailRepeat: '参数中存在重复的组织编码',
                saveFailDBRepeat: '存在与数据库重复的组织编码'
            },
        getOrgStrategyById:
            {
                idNullMessage: 'ID不能为空',
                failMessage: '根据ID查询组织分仓策略失败'
            },
        updateOrgStrategyPatch:
            {
                updateSuccess: '分仓策略更新成功',
                updateFail: '分仓策略更新失败',
                updateFailRepeat: '参数中存在重复的分仓策略名称',
                updateFailDBRepeat: '存在与数据库重复的分仓策略名称'
            },
        deleteOrgStrategyBatch:
            {
                paramExceptionMessage: '参数异常',
                successPatchDeleteMessage: '分仓策略批量删除成功',
                failPatchDeleteMessage: '分仓策略批量删除失败'
            },
        updateStatus:
            {
                updateStatusSuccess: '分仓策略启用/禁用成功',
                updateStatusFail: '分仓策略启用/禁用失败',
                idNullMessage: 'id不能为空',
                versionNullMessage: '版本号不能为空',
                statusNullMessage: '状态不能为空'
            },
        validateInsert:
            {
                orgNameNullMessage: '组织架构名称不能为空',
                orgNameOutMessage: '组织架构名称不能超过100个字符',
                orgCodeNullMessage: '组织架构编码不能为空',
                orgCodeOutMessage: '组织架构编码不能超过20个字符',
                typeNullMessage: '分仓策略类型不能为空',
                rankNullMessage: '优先级别不能为空',
                createrNullMessage: '创建人不能为空',
                createrOutMessage: '创建人不能超过50个字符'
            },
        validateUpdate:
            {
                idNullMessage: 'ID不能为空',
                orgNameNullMessage: '组织架构名称不能为空',
                orgNameOutMessage: '组织架构名称不能超过100个字符',
                orgCodeNullMessage: '组织架构编码不能为空',
                orgCodeOutMessage: '组织架构编码不能超过20个字符',
                typeNullMessage: '分仓策略类型不能为空',
                rankNullMessage: '优先级别不能为空',
                updaterNullMessage: '修改人不能为空',
                updaterOutMessage: '修改人不能超过100个字符',
                versionNullMessage: '版本号不能为空'
            }
    },
    ShipperExportServiceAdapter: {
        saveShipperBatch: {
            saveShipperFail: '货主信息保存失败',
            parametersIllegal: '参数非法'
        },
        removeShipperBatch:
            {
                removeShipperFail: '货主信息删除失败',
                parametersIllegal: '参数非法'
            },
        updateShipperBatch:
            {
                updateShipperFail: '货主信息更新失败',
                parametersIllegal: '参数非法'
            },
        updateShipperById:
            {
                updateShipperFail: '货主信息更新失败',
                parametersIllegal: '参数非法'
            },
        selectShipperById:
            {
                parametersIllegal: '参数非法'
            },
        selectShipperByName:
            {
                parametersIllegal: '参数非法'
            },
        selectShipperCodeIsExist:
            {
                parametersIllegal: '参数非法',
                shipperCodeIsExistMessage: '货主编号已存在'
            },
        updateShipperStatusBatch:
            {
                parametersIllegal: '参数非法',
                updateShipperStatusFail: '修改主货启用状态失败'
            },
        selectShipperByShipperIds:
            {
                parametersIllegal: '参数非法'
            },
        selectAvailableShipperByShipperIds:
            {
                parametersIllegal: '参数非法'
            },
        exportShipper:
            {
                parametersIllegal: '参数非法'
            },
        importShipperValidateParameter:
            {
                parametersIllegal: '参数非法',
                shipperCodeNullMessage: '货主编号不能为空',
                shipperCodeIsExistMessage: '货主编号已存在',
                shipperCodeInExcelIsExistMessage: '货主编号在EXCEL表格中存在多次',
                shipperCodeOutMessage: '货主编号不能超过25个字符',
                shipperNameNullMessage: '货主名称不能为空',
                shipperNameOutMessage: '货主名称不能超过50个字符',
                shortNameNullMessage: '货主简称不能为空',
                shortNameOutMessage: '货主简称不能超过10个字符',
                shipperTypeNullMessage: '货主类型不能为空',
                shipperTypeNotExistMessage: '货主类型不存在',
                countryNameOutMessage: '国家名称不能超过25个字符',
                provinceNameOutMessage: '省份名称不能超过25个字符',
                cityNameOutMessage: '城市名称不能超过25个字符',
                districtNameOutMessage: '区县名称不能超过25个字符',
                streetNameOutMessage: '街道名称不能超过25个字符',
                addressOutMessage: '详细地址不能超过100个字符',
                postcodeOutMessage: '邮编不能超过10个字符',
                contactPersonOutMessage: '联系人不能超过25个字符',
                telephoneOutMessage: '联系电话不能超过20个字符',
                servicesNotExistMessage: '服务不存在',
                servicesUrlOutMessage: '服务地址不能超过100个字符'
            },
        selectByIdCodeName:
            {
                nullMessage: '查询条件不能同时为空',
                failMessage: '查询失败',
                successMessage: '查询成功'
            },
        selectShipperByShipperCode:
            {
                parametersIllegal: '参数非法'
            },
        selectByShipperCodes:
            {
                failMessage: '查询失败'
            }
    },
    ShipperFactoryRelationExportServiceAdapter: {
        queryList: {
            errorParam: '参数不能为空',
            getSuccess: '查询成功',
            getError: '查询失败'
        },
        getByShipperId:
            {
                errorParam: '参数不能为空',
                getSuccess: '查询成功',
                getError: '查询失败'
            },
        getByFactoryId:
            {
                errorParam: '参数不能为空',
                getSuccess: '查询成功',
                getError: '查询失败'
            }
    },
    ShipperDeliveryRelationExportServiceAdapter: {
        selectDeliveryByShipper: {
            nullMessage: '查询条件不能同时为空',
            failMessage: '查询失败'
        },
        selectShipperByDelivery:
            {
                nullMessage: '查询条件不能同时为空',
                failMessage: '查询失败'
            },
        insertShipperDeliveryRelationPatch:
            {
                saveSuccess: '货主送达方关系保存成功',
                saveFail: '货主送达方关系保存失败',
                shipperIdNullMessage: '货主id不能为空',
                deliveryIdNullMessage: '送达方id不能为空'
            },
        deleteShipperDeliveryRelationBatch:
            {
                paramExceptionMessage: '参数异常',
                successPatchDeleteMessage: '货主送达方关系批量删除成功',
                failPatchDeleteMessage: '货主送达方关系批量删除失败'
            },
        selectShipperDeliveryRelationByShipperId:
            {
                shipperIdNullMessage: '货主ID不能为空',
                failMessage: '查询失败'
            }
    },
    ShipperMaterialRelationExportServiceAdapter: {
        selectShipperMaterialRelationByMaterialId: {
            materialIdNullMessage: '物料id不能为空',
            failMessage: '查询失败'
        },
        selectShipperMaterialRelationByShipperId:
            {
                shipperIdNullMessage: '货主id不能为空',
                failMessage: '查询失败'
            },
        insertShipperMaterialRelationPatch:
            {
                saveSuccess: '货主物料关系保存成功',
                saveFail: '货主物料关系保存失败',
                shipperIdNullMessage: '货主id不能为空',
                materialIdNullMessage: '物料id不能为空'
            },
        deleteShipperMaterialRelationBatch:
            {
                paramExceptionMessage: '参数异常',
                successPatchDeleteMessage: '货主物料关系批量删除成功',
                failPatchDeleteMessage: '货主物料关系批量删除失败'
            }
    },
    ShipperSoldRelationExportServiceAdapter: {
        selectShipperSoldRelationBySoldId: {
            soldIdNullMessage: '售达方id不能为空',
            failMessage: '查询失败'
        },
        selectShipperSoldRelationByShipperId:
            {
                shipperIdNullMessage: '货主id不能为空',
                failMessage: '查询失败'
            },
        insertShipperSoldRelationPatch:
            {
                saveSuccess: '货主售达方关系保存成功',
                saveFail: '货主售达方关系保存失败',
                shipperIdNullMessage: '货主id不能为空',
                soldIdNullMessage: '售达方id不能为空'
            },
        deleteShipperSoldRelationBatch:
            {
                paramExceptionMessage: '参数异常',
                successPatchDeleteMessage: '货主售达方关系批量删除成功',
                failPatchDeleteMessage: '货主售达方关系批量删除失败'
            }
    },
    ShipperWarehouseStrategyExportServiceAdapter: {
        queryListPager: {
            queryExceptionMessage: '分页查询异常'
        },
        insertShipperWarehouseStrategyPatch:
            {
                saveSuccess: '分仓策略保存成功',
                saveFail: '分仓策略保存失败',
                saveFailRepeat: '参数中存在重复的分仓策略名称',
                saveFailDBRepeat: '存在与数据库重复的分仓策略名称'
            },
        getShipperWarehouseStrategyById:
            {
                idNullMessage: 'ID不能为空',
                failMessage: '根据ID查询分仓策略失败'
            },
        updateShipperWarehouseStrategyPatch:
            {
                updateSuccess: '分仓策略更新成功',
                updateFail: '分仓策略更新失败',
                updateFailRepeat: '参数中存在重复的分仓策略名称',
                updateFailDBRepeat: '存在与数据库重复的分仓策略名称'
            },
        deleteShipperWarehouseStrategyBatch:
            {
                paramExceptionMessage: '参数异常',
                successPatchDeleteMessage: '分仓策略批量删除成功',
                failPatchDeleteMessage: '分仓策略批量删除失败'
            },
        updateStatus:
            {
                updateStatusSuccess: '分仓策略启用/禁用成功',
                updateStatusFail: '分仓策略启用/禁用失败',
                idNullMessage: 'id不能为空',
                versionNullMessage: '版本号不能为空',
                statusNullMessage: '状态不能为空'
            },
        selectShipperWarehouseStrategyByName:
            {
                nameNullMessage: '分仓策略名称不能为空',
                success: '查询成功',
                fail: '查询失败'
            },
        validateInser:
            {
                orgNameNullMessage: '组织架构名称不能为空',
                orgNameOutMessage: '组织架构名称不能超过50个字符',
                orgCodeNullMessage: '组织架构编码不能为空',
                orgCodeOutMessage: '组织架构编码不能超过20个字符',
                shipperCodeNullMessage: '货主编码不能为空',
                shipperCodeOutMessage: '货主编码不能超过20个字符',
                shipperNameNullMessage: '货主名称不能为空',
                shipperNameOutMessage: '货主名称不能超过100个字符',
                warehouseCodeNullMessage: '仓库编码不能为空',
                warehouseCodeOutMessage: '仓库编码不能超过20个字符',
                warehouseNameNullMessage: '仓库名称不能为空',
                warehouseNameOutMessage: '仓库名称不能超过100个字符',
                materialNameNullMessage: '物料名称不能为空',
                materialNameOutMessage: '物料名称不能超过100个字符',
                materialCodeNullMessage: '物料编码不能为空',
                materialCodeOutMessage: '物料编码不能超过20个字符',
                defaultsNullMessage: '默认不能为空',
                rankNullMessage: '优先级别不能为空',
                createrNullMessage: '创建人不能为空',
                createrOutMessage: '创建人不能超过100个字符'
            },
        validateUpdate:
            {
                idNullMessage: 'ID不能为空',
                orgNameNullMessage: '组织架构名称不能为空',
                orgNameOutMessage: '组织架构名称不能超过50个字符',
                orgCodeNullMessage: '组织架构编码不能为空',
                orgCodeOutMessage: '组织架构编码不能超过20个字符',
                shipperCodeNullMessage: '货主编码不能为空',
                shipperCodeOutMessage: '货主编码不能超过20个字符',
                shipperNameNullMessage: '货主名称不能为空',
                shipperNameOutMessage: '货主名称不能超过100个字符',
                warehouseCodeNullMessage: '仓库编码不能为空',
                warehouseCodeOutMessage: '仓库编码不能超过20个字符',
                warehouseNameNullMessage: '仓库名称不能为空',
                warehouseNameOutMessage: '仓库名称不能超过100个字符',
                materialNameNullMessage: '物料名称不能为空',
                materialNameOutMessage: '物料名称不能超过100个字符',
                materialCodeNullMessage: '物料编码不能为空',
                materialCodeOutMessage: '物料编码不能超过20个字符',
                defaultsNullMessage: '默认不能为空',
                rankNullMessage: '优先级别不能为空',
                updaterNullMessage: '修改人不能为空',
                updaterOutMessage: '修改人不能超过100个字符',
                versionNullMessage: '版本号不能为空'
            }
    },
    SoldExportServiceAdapter: {
        queryListPager: {
            queryExceptionMessage: '分页查询异常'
        },
        insertSoldPatch:
            {
                saveSuccess: '售达方保存成功',
                saveFail: '售达方保存失败',
                saveFailRepeat: '参数中存在重复的编码',
                saveFailDBRepeat: '存在与数据库重复的编码'
            },
        getSoldById:
            {
                idNullMessage: 'ID不能为空',
                failMessage: '根据ID查询售达方失败'
            },
        updateSoldPatch:
            {
                updateSuccess: '售达方更新成功',
                updateFail: '售达方更新失败',
                updateFailRepeat: '参数中存在重复的编码',
                updateFailDBRepeat: '存在与数据库重复的编码'
            },
        deleteSold:
            {
                paramNullMessage: '参数不能为空',
                successDeleteMessage: '售达方删除成功',
                failDeleteMessage: '售达方删除失败'
            },
        deleteSoldBatch:
            {
                paramExceptionMessage: '参数异常',
                successPatchDeleteMessage: '售达方批量删除成功',
                failPatchDeleteMessage: '售达方批量删除失败'
            },
        updateStatus:
            {
                updateStatusSuccess: '售达方启用/禁用成功',
                updateStatusFail: '售达方启用/禁用失败',
                idNullMessage: 'id不能为空',
                statusNullMessage: '状态不能为空'
            },
        validateInsert:
            {
                soldCodeNullMessage: '售达方编码不能为空',
                soldCodeOutMessage: '售达方编码不能超过30个字符',
                nameNullMessage: '售达方全称不能为空',
                nameOutMessage: '售达方全称不能超过100个字符',
                shortNameNullMessage: '售达方简称不能为空',
                shortNameOutMessage: '售达方简称不能超过100个字符',
                countryIdNullMessage: '国家id不能为空',
                countryNameNullMessage: '国家名称不能为空',
                countryNameOutMessage: '国家名称不能超过50个字符',
                provinceIdNullMessage: '省id不能为空',
                provinceNameNullMessage: '省名称不能为空',
                provinceNameOutMessage: '省名称不能超过50个字符',
                cityIdNullMessage: '市id不能为空',
                cityNameNullMessage: '市名称不能为空',
                cityNameOutMessage: '市名称不能超过50个字符',
                districtIdNullMessage: '区县id不能为空',
                districtNameNullMessage: '区县名字不能为空',
                districtNameOutMessage: '区县名字不能超过50个字符',
                streetIdNullMessage: '街道id不能为空',
                streetNameNullMessage: '街道名字不能为空',
                streetNameOutMessage: '街道名字不能超过100个字符',
                addressOutMessage: '地址不能超过500个字符',
                postcodeNullMessage: '邮编不能为空',
                postcodeOutMessage: '邮编不能超过20个字符',
                contactPersonNullMessage: '联系人不能为空',
                contactPersonOutMessage: '联系人不能超过100个字符',
                telephoneNullMessage: '联系电话不能为空',
                telephoneOutMessage: '联系电话不能超过20个字符',
                createrNullMessage: '创建人不能为空',
                createrOutMessage: '创建人不能超过100个字符'
            },
        validateUpdate:
            {
                idNullMessage: 'ID不能为空',
                soldCodeNullMessage: '售达方编码不能为空',
                soldCodeOutMessage: '售达方编码不能超过30个字符',
                nameNullMessage: '售达方全称不能为空',
                nameOutMessage: '售达方全称不能超过100个字符',
                shortNameNullMessage: '售达方简称不能为空',
                shortNameOutMessage: '售达方简称不能超过100个字符',
                countryIdNullMessage: '国家id不能为空',
                countryNameNullMessage: '国家名称不能为空',
                countryNameOutMessage: '国家名称不能超过50个字符',
                provinceIdNullMessage: '省id不能为空',
                provinceNameNullMessage: '省名称不能为空',
                provinceNameOutMessage: '省名称不能超过50个字符',
                cityIdNullMessage: '市id不能为空',
                cityNameNullMessage: '市名称不能为空',
                cityNameOutMessage: '市名称不能超过50个字符',
                districtIdNullMessage: '区县id不能为空',
                districtNameNullMessage: '区县名字不能为空',
                districtNameOutMessage: '区县名字不能超过50个字符',
                streetIdNullMessage: '街道id不能为空',
                streetNameNullMessage: '街道名字不能为空',
                streetNameOutMessage: '街道名字不能超过100个字符',
                addressOutMessage: '地址不能超过500个字符',
                postcodeNullMessage: '邮编不能为空',
                postcodeOutMessage: '邮编不能超过20个字符',
                contactPersonNullMessage: '联系人不能为空',
                contactPersonOutMessage: '联系人不能超过100个字符',
                telephoneNullMessage: '联系电话不能为空',
                telephoneOutMessage: '联系电话不能超过20个字符',
                updaterNullMessage: '修改人不能为空',
                updaterOutMessage: '修改人不能超过100个字符',
                versionNullMessage: '版本号不能为空'
            },
        selectByName:
            {
                soldNameNullMessage: '售达方名称不能为空',
                success: '查询成功',
                fail: '查询失败'
            },
        selectSoldByName:
            {
                soldNameNullMessage: '售达方名称不能为空',
                success: '查询成功',
                fail: '查询失败'
            },
        getSoldByIds:
            {
                idNullMessage: 'id不能为空',
                failMessage: '查询失败'
            },
        selectSoldByNamePager:
            {
                soldNameNullMessage: '售达方名称不能为空',
                shipperIdNullMessage: '货主id不能为空',
                fail: '查询失败'
            },
        getSoldByIdsPager:
            {
                idNullMessage: 'id不能为空',
                failMessage: '查询失败'
            }
    },
    ThresholdStrategyExportServiceAdapter: {
        queryListPager: {
            queryExceptionMessage: '分页查询异常'
        },
        selectBySwsId:
            {
                idMessage: '分仓策略主键为空',
                queryExceptionMessage: '分页查询异常'
            },
        insertThresholdStrategy:
            {
                saveSuccess: '阈值策略保存成功',
                saveFail: '阈值策略保存失败',
                saveFailRepeat: '参数中存在重复的组织编码'
            },
        getThresholdStrategyById:
            {
                idNullMessage: 'ID不能为空',
                failMessage: '根据ID查询组织阈值策略失败'
            },
        updateThresholdStrategyPatch:
            {
                updateSuccess: '阈值策略更新成功',
                updateFail: '阈值策略更新失败',
                updateFailRepeat: '参数中存在重复的阈值策略名称'
            },
        deleteThresholdStrategyBatch:
            {
                paramExceptionMessage: '参数异常',
                successPatchDeleteMessage: '策略批量删除成功',
                failPatchDeleteMessage: '阈值策略批量删除失败'
            },
        updateStatus:
            {
                updateStatusSuccess: '阈值策略启用/禁用成功',
                updateStatusFail: '阈值策略启用/禁用失败',
                idNullMessage: 'id不能为空',
                versionNullMessage: '版本号不能为空',
                statusNullMessage: '状态不能为空'
            },
        validateInsert:
            {
                shipperWarehouseStrategyIdNullMessage: '阈值策略id不能为空',
                thresholdStartNullMessage: '阈值开始值不能为空',
                thresholdEndNullMessage: '阈值结束值不能为空',
                rankNullMessage: '优先级不能为空',
                rankMessage: '优先级不能超过10',
                createrNullMessage: '创建人不能为空',
                createrOutMessage: '创建人不能超过50个字符'
            },
        validateUpdate:
            {
                idNullMessage: 'ID不能为空',
                shipperWarehouseStrategyIdNullMessage: '阈值策略id不能为空',
                thresholdStartNullMessage: '阈值开始值不能为空',
                thresholdEndNullMessage: '阈值结束值不能为空',
                updaterNullMessage: '修改人不能为空',
                updaterOutMessage: '修改人不能超过100个字符',
                versionNullMessage: '版本号不能为空',
                rankNullMessage: '优先级不能为空',
                rankMessage: '优先级不能超过10'
            },
        deleteBySwsId:
            {
                dtoMessage: '参数异常',
                swsIdMessage: '分仓策略主键为空',
                updatebyMessage: '修改人为空',
                errorMessage: '删除失败'
            },
        updateStatusBySwsId:
            {
                dtoMessage: '参数异常',
                swsIdMessage: '分仓策略主键为空',
                statusMessage: '状态标识为空',
                updatebyMessage: '修改人为空',
                errorMessage: '启用禁用失败'
            }
    },
    MaterialUnitConverterExportServiceAdapter: {
        selectMaterialUnitConversion: {
            materialUnitConverterIsNotExist: '单位换算基础信息不存在',
            materialUnitConversionFail: '转换单位数量失败'
        },
        selectMaterialUnitConversionBatch:
            {
                paramNullMessage: '参数不能为空',
                materialUnitConverterIsNotExist: '单位换算基础信息不存在',
                materialUnitConversionFail: '转换单位数量失败'
            },
        saveMaterialUnitConversion:
            {
                saveMaterialUnitConversionFail: '单位换算基础信息保存失败',
                parametersIllegal: '参数非法',
                materialUnitConverterIsExist: '批量单位换算基础信息中存在重复'
            },
        updateMaterialUnitConversion:
            {
                parametersIllegal: '参数非法',
                updateMaterialUnitConversionFail: '单位换算基础信息更新失败'
            },
        removeMaterialUnitConversion:
            {
                parametersIllegal: '参数非法',
                deleteMaterialUnitConversionFail: '单位换算基础信息删除失败'
            },
        saveValidateParameter:
            {
                parametersIllegal: '参数非法',
                materialCodeNullMessage: '物料编码不能为空',
                baseUnitNullMessage: '单位编码不能为空',
                umrezNullMessage: '分子不能为空',
                umrenNullMessage: '分母不能为空',
                umrenEqualsZeroMessage: '分母不能为零',
                baseUnitIsNotExist: '单位编码不存在',
                materialCodeIsNotExist: '物料编码不存在',
                materialUnitConverterIsExist: '单位换算基础信息已存在'
            },
        updateValidateParameter:
            {
                parametersIllegal: '参数非法',
                materialCodeNullMessage: '物料编码不能为空',
                baseUnitNullMessage: '单位编码不能为空',
                umrezNullMessage: '分子不能为空',
                umrenNullMessage: '分母不能为空',
                umrenEqualsZeroMessage: '分母不能为零',
                materialCodeIsNotExist: '物料编码不存在',
                materialUnitConverterIsNotExist: '单位换算基础信息不存在'
            },
        deleteValidateParameter:
            {
                parametersIllegal: '参数非法',
                materialCodeNullMessage: '物料编码不能为空',
                baseUnitNullMessage: '单位编码不能为空',
                materialCodeIsNotExist: '物料编码不存在',
                materialUnitConverterIsNotExist: '单位换算基础信息不存在'
            },
        unitConverterValidateParameter:
            {
                parametersIllegal: '参数非法',
                materialCodeNullMessage: '物料编码不能为空',
                oldUnitNullMessage: '原单位编码不能为空',
                newUnitNullMessage: '转换后单位编码不能为空',
                oldNumNullMessage: '原单位数量不能为空',
                oldNumIllegal: '原单位数量非法',
                materialCodeIsNotExist: '物料编码不存在'
            }
    },
    WarehouseExportServiceAdapter: {
        queryListPager: {
            error: '查询列表出错',
            parametersIllegal: '参数非法'
        },
        queryList:
            {
                resultMessage: '查询失败'
            },
        insertWarehouse:
            {
                saveFail: '仓库保存失败',
                repeatFail: '编码不能重复',
                errorMsg: '仓库信息读取错误',
                countryIdNullMessage: '国家名称不能为空',
                countryNameNullMessage: '国家名称不能为空',
                countryNameOutMessage: '国家名称不能超过25个字符',
                provinceIdNullMessage: '省名称不能为空',
                provinceNameNullMessage: '省名称不能为空',
                provinceNameOutMessage: '省名称不能超过25个字符',
                cityIdNullMessage: '市名称不能为空',
                cityNameNullMessage: '市名称不能为空',
                cityNameOutMessage: '市名称不能超过25个字符',
                districtIdNullMessage: '区县名称不能为空',
                districtNameNullMessage: '区县名称不能为空',
                districtNameOutMessage: '区县名称不能超过25个字符',
                streetIdNullMessage: '街道名称不能为空',
                streetNameNullMessage: '街道名称不能为空',
                streetNameOutMessage: '街道名称不能超过25个字符',
                warehouseAddresNullMessage: '地址不能为空',
                warehouseAddresOutMessage: '地址不能超过250个字符'
            },
        insertWarehouseBatch:
            {
                saveSuccess: '仓库保存成功',
                saveFail: '仓库保存失败',
                repeatFail: '该记录数据库中已存在',
                errorMsg: '仓库列表获取失败',
                countryIdNullMessage: '国家名称不能为空',
                countryNameNullMessage: '国家名称不能为空',
                countryNameOutMessage: '国家名称不能超过25个字符',
                provinceIdNullMessage: '省名称不能为空',
                provinceNameNullMessage: '省名称不能为空',
                provinceNameOutMessage: '省名称不能超过25个字符',
                cityIdNullMessage: '市名称不能为空',
                cityNameNullMessage: '市名称不能为空',
                cityNameOutMessage: '市名称不能超过25个字符',
                districtIdNullMessage: '区县名称不能为空',
                districtNameNullMessage: '区县名称不能为空',
                districtNameOutMessage: '区县名称不能超过25个字符',
                streetIdNullMessage: '街道名称不能为空',
                streetNameNullMessage: '街道名称不能为空',
                streetNameOutMessage: '街道名称不能超过25个字符',
                warehouseAddresNullMessage: '地址不能为空',
                warehouseAddresOutMessage: '地址不能超过250个字符'
            },
        queryById:
            {
                failMessage: '根据ID查询仓库失败',
                idNullMessage: 'ID不能为空'
            },
        deleteWarehouse:
            {
                nullMessage: '参数不能为空',
                successMessage: '仓库删除成功',
                failMessage: '仓库删除失败',
                errorMsg: '仓库ID获取失败',
                errorUser: '当前用户获取失败'
            },
        deleteWarehouseBatch:
            {
                parametersIllegal: '参数非法'
            },
        updateStatus:
            {
                parametersIllegal: '参数非法',
                updateWarehouseStatusFail: '修改仓库信息启用状态失败'
            },
        updateWarehouse:
            {
                success: '修改成功',
                failed: '修改失败',
                parametersIllegal: '参数非法'
            },
        validate:
            {
                parametersIllegal: '参数非法',
                nameNullMessage: '仓库名称不能为空',
                nameLengthError: '仓库名称不能超过50个字符',
                codeNullMessage: '仓库编码不能为空',
                codeLengthError: '仓库编码不能超过20个字符',
                addressLengthError: '地址内容不能超过250个字符',
                noteLengthError: '备注内容不能超过100个字符',
                contactPersonLengthError: '联系人不能为空',
                contactPersonNullError: '联系人不能为空',
                telephoneLengthError: '联系电话不能超过20个字符',
                telephoneNullError: '联系电话不能为空',
                factoryLogisticsIdNullMessage: '工厂物流中心不能为空',
                lengthNullMessage: '长度不能为空',
                lengthOutNumMessage: '长度超过允许范围最大值:0至99999999.99',
                breadthNullMessage: '宽度不能为空',
                breadthOutNumMessage: '宽度超过允许范围最大值:0至99999999.99',
                heightNullMessage: '高度不能为空',
                heightOutNumMessage: '高度超过允许范围最大值:0至99999999.99',
                areaOutNumMessage: '面积超过允许范围最大值:0至99999999.99',
                volumeOutNumMessage: '体积超过允许范围最大值:0至99999999.99'
            },
        updateWarehousePatch:
            {
                errorList: '仓库列表获取失败'
            },
        queryListByName:
            {
                nameNullError: '名称不能为空',
                failed: '查询失败'
            },
        selectWarehouseByCode:
            {
                successMessage: '查询成功',
                failMessage: '查询失败'
            },
        selectListByFactoryLogisticsArray:
            {
                factoryLogisticsIdsNull: '参数非法',
                failMessage: '查询失败'
            }
    },
    // 地址信息管理
    RegionalAddressExportServiceAdapter: {
        saveValidateParameter: {
            codeIsExistMessage: '区划编码已存在'
        }
    }
};
