I18N = {

    ApplicationUpdate: '应用程序更新',
    ApplicationUpdateMsg: '应用程序已经更新，重新加载？',

    DaterangeText: '开始日期必须小于结束日期',
    PasswordText: '密码不符合要求',
    CompareText: '两次输入的结果不同',
    PasswordVTypeText: '密码必须由字母和数字组成',

    FailedTitle: '错误信息',
    Failed404: '错误的请求地址',
    Failed500: '服务器内部错误',
    FailedOtherCode: '错误代码：{0}<br\>响应：{1}',

    AppTitle: 'LyApp',
    DefaultMessageTitle: '信息',
    GetUserInfo: '正在加载用户信息......',
    StateRestoreWait: '正在恢复状态信息...',
    EmptyText: '没有任何数据',

    ComingSoon: '即将推出！',
    StayTunedForUpdates: '敬请期待。',
    Error404HTML: '<div>页面不存在</div><div>尝试返回<a href="/">首页</a></div>',
    Error500HTML: '<div>服务器内部错误</div><div>尝试返回<a href="/">首页</a></div>',

    DefaultDatetimeFormat: 'Y-m-d H:i:s',
    DefaultDateFormat: 'Y-m-d',
    DatetimeIsoFormat: 'C',

    Logout: '退出',
    LoginTitle: '登录',
    LoginLabel: '使用帐号登录',
    LoginSubmitWaitMsg: '正在登录，请等待......',
    LoginSubmitWaitTitle: '正在登录',
    PasswordResetTitle: '修改密码',
    PasswordResetLabel: '输入以下字段以修改密码',
    PasswordResetSuccess: '密码已修改，请重新登录',
    OldPasswordEqualNew: '新密码不能与旧密码相同',
    UserId: '用户名',
    Password: '密码',
    NewPassword: '新密码',
    PasswordRegexText: '密码必须由字母和数字组成,且长度至少为6位',
    ConfirmPassword: '确认密码',
    RememberMe: '记住我',
    ForgotPassword: '忘记密码',

    Save: '保存',
    SaveWaitMsg: '正在保存，请等待......',
    SavedAndClose: '数据已成功保存，窗口将关闭',
    SavedAndNothing: '数据已成功保存',
    SavedAndNew: '数据已成功保存，可继续添加新的数据',
    Reset: '重置',
    Return: '返回',
    Required: '该输入项为必输项',
    RequiredTips: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>号为必填',
    RequiredTpl: [
        '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
    ],
    PasswordNoEqual: '两次输入的密码不同',
    Count: '共{count}条',

    DeleteNoSelection: '请选择要删除的{0}',
    DeleteWaitMsg: '正在删除，请等待……',
    DeleteConfirmMessageTitle: '删除',
    DeleteConfirmMessage: '<p>确定要删除以下{0}？</p>{1}',

    Add: '新建',
    Edit: '编辑',
    Delete: '删除',
    Details: '详细信息',
    ShowDetails: '查看详细信息',
    Refresh: '刷新',
    Search: '查询',
    Cancel: '取消',
    Selected: '确定',
    SelectedTitleImage: '选择题图',
    SelectedMedia: '选择媒体',
    InsertMedia: '从媒体库插入媒体',
    NoModel: '没有定义模型',
    NoSelection: '请选择{0}，再{1}',
    Loading: '正在加载数据，请等待......',
    SaveAndNewButtonText: '保存和新建',
    SaveButtonText: '保存',
    PasswordNoChange: '注意：如果不修改密码，可留空',
    Sorter: '排序',
    SorterASC: '正序',
    SorterDESC: '倒序',
    EmptyValue: '无',
    HasChild: '节点下还有子节点，不允许删除',
    NoDrop: '拖放操作失败，当前节点不是有效的类别',
    Help: '帮助',
    PhoneRegex: '只允许输入数字、横线(-)和空格',
    Keyword: '关键字',

    SearchDate: '日期：',
    SearchText: '文本：',
    SearchStart: '开始/取消搜索',
    NoSearchValue: '请输入正确的搜索值再进行搜索',
    SearchCompareErrorMessage: '开始{0}不能大于或等于结束{0}',

    User: '用户',
    Model: {
        User: {
            userName: '用户名',
            surname: '姓',
            name: '名字',
            roleNames: '角色',
            emailAddress: '电子邮件',
            creationTime: '创建日期',
            lastLoginTime: '最后登录时间',
            fullName: '全名',
            isActive: '已激活',
            password: '密码'
        }
    },
    ValueList: {
        roles: [{
            id: 'Admin',
            text: '管理员'
        }, {
            id: 'User',
            text: '用户'
        }],
        roleDescription: {
            Admin: '管理员',
            User: '用户'
        },
        deleteMessage: ['## <i style="color:red">{0}</i> 已删除', '## <i style="color:#ffc037">{0}</i> 未能删除']
    },


    init: function () {
        var parseCodes;

        if (Ext.Date) {
            Ext.Date.monthNames = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];

            Ext.Date.dayNames = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];

            Ext.Date.formatCodes.a = "(this.getHours() < 12 ? '上午' : '下午')";
            Ext.Date.formatCodes.A = "(this.getHours() < 12 ? '上午' : '下午')";

            parseCodes = {
                g: 1,
                c: "if (/(上午)/i.test(results[{0}])) {\n" +
                    "if (!h || h == 12) { h = 0; }\n" +
                    "} else { if (!h || h < 12) { h = (h || 0) + 12; }}",
                s: "(上午|下午)",
                calcAtEnd: true
            };

            Ext.Date.parseCodes.a = Ext.Date.parseCodes.A = parseCodes;
        }

        if (Ext.util && Ext.util.Format) {
            Ext.apply(Ext.util.Format, {
                thousandSeparator: ',',
                decimalSeparator: '.',
                currencySign: '\u00a5',
                // Chinese Yuan
                dateFormat: 'y年m月d日'
            });
        }

        if (Ext.form.field.ComboBox) {
            Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
                loadingText: "读取中..."
            });
        }


        if (Ext.form.field.HtmlEditor) {
            Ext.apply(Ext.form.field.HtmlEditor.prototype, {
                buttonTips: {
                    bold: {
                        title: '粗体 (Ctrl+B)',
                        text: '将选中的文字设置为粗体',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    italic: {
                        title: '斜体 (Ctrl+I)',
                        text: '将选中的文字设置为斜体',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    underline: {
                        title: '下划线 (Ctrl+U)',
                        text: '给所选文字加下划线',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    increasefontsize: {
                        title: '增大字体',
                        text: '增大字号',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    decreasefontsize: {
                        title: '缩小字体',
                        text: '减小字号',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    backcolor: {
                        title: '以不同颜色突出显示文本',
                        text: '使文字看上去像是用荧光笔做了标记一样',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    forecolor: {
                        title: '字体颜色',
                        text: '更改字体颜色',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    justifyleft: {
                        title: '左对齐',
                        text: '将文字左对齐',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    justifycenter: {
                        title: '居中',
                        text: '将文字居中对齐',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    justifyright: {
                        title: '右对齐',
                        text: '将文字右对齐',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    insertunorderedlist: {
                        title: '项目符号',
                        text: '开始创建项目符号列表',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    insertorderedlist: {
                        title: '编号',
                        text: '开始创建编号列表',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    createlink: {
                        title: '转成超级链接',
                        text: '将所选文本转换成超级链接',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    sourceedit: {
                        title: '代码视图',
                        text: '以代码的形式展现文本',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    }
                }
            });
        };

        Ext.Object.each(I18N.overrides, function(key, value, myself) {
            var cls = Ext.ClassManager.get(key);
            if(cls){
                Ext.override(cls,value);
            }
        });

    } ,//init

    overrides:{
        "Ext.data.validator.Bound":{
            emptyMessage: "必须存在"
        },
        "Ext.data.validator.Email":{
            message: "不是有效的电子邮件地址"
        },
        "Ext.data.validator.Exclusion":{
            message: "值不符合要求"
        },
        "Ext.data.validator.Format":{
            message: "格式错误"
        },
        "Ext.data.validator.Inclusion":{
            message: "值不符合要求"
        },
        "Ext.data.validator.Length":{
            minOnlyMessage: "长度最小是 {0}",
            maxOnlyMessage: "长度必须大于 {0}",
            bothMessage: "长度必须在 {0} 与 {1}直接"    
        },
        "Ext.data.validator.Presence":{
            message: "必须有值"
        },
        "Ext.data.validator.Range":{
            minOnlyMessage: "值必须小于 {0}",
            maxOnlyMessage: "值必须大于 {0}",
            bothMessage: "必须在 {0} 与 {1} 之间",
            nanMessage: "必须是数组"    
        },
        "Ext.grid.plugin.DragDrop":{
            dragText: "{0} 选择了 {1} 行"
        },
        "Ext.view.AbstractView":{
            loadingText: "读取中..."
        },
        "Ext.picker.Date":{
            todayText: "今天",
            minText: "日期必须大于最小允许日期",
            //update
            maxText: "日期必须小于最大允许日期",
            //update
            disabledDaysText: "",
            disabledDatesText: "",
            nextText: '下个月 (Ctrl+Right)',
            prevText: '上个月 (Ctrl+Left)',
            monthYearText: '选择一个月 (Control+Up/Down 来改变年份)',
            //update
            todayTip: "{0} (空格键选择)",
            format: "y年m月d日",
            ariaTitle: '{0}',
            ariaTitleDateFormat: 'Y\u5e74m\u6708d\u65e5',
            longDayFormat: 'Y\u5e74m\u6708d\u65e5',
            monthYearFormat: 'Y\u5e74m\u6708'
        },
        "Ext.picker.Month":{
            okText: "确定",
            cancelText: "取消"    
        },
        "Ext.PagingToolbar":{
            beforePageText: "第",
            //update
            afterPageText: "页,共 {0} 页",
            //update
            firstText: "第一页",
            prevText: "上一页",
            //update
            nextText: "下一页",
            lastText: "最后页",
            refreshText: "刷新",
            displayMsg: "显示 {0} - {1}条，共 {2} 条",
            //update
            emptyMsg: '没有数据'    
        },
        "Ext.form.Basic":{
            waitTitle: "请等待..."
        },
        "Ext.form.field.Base":{
            invalidText: "输入值非法"
        },
        "Ext.form.field.Text":{
            minLengthText: "该输入项的最小长度是 {0} 个字符",
            maxLengthText: "该输入项的最大长度是 {0} 个字符",
            blankText: "该输入项为必输项",
            regexText: "",
            emptyText: null            
        },
        "Ext.form.field.Number":{
            minText: "该输入项的最小值是 {0}",
            maxText: "该输入项的最大值是 {0}",
            nanText: "{0} 不是有效数值"           
        },
        "Ext.form.field.Date":{
            disabledDaysText: "禁用",
            disabledDatesText: "禁用",
            minText: "该输入项的日期必须在 {0} 之后",
            maxText: "该输入项的日期必须在 {0} 之前",
            invalidText: "{0} 是无效的日期 - 必须符合格式： {1}",
            format: "y年m月d日"            
        },
        "Ext.form.field.VTypes":{
            emailText: '该输入项必须是电子邮件地址，格式如： "user@example.com"',
            urlText: '该输入项必须是URL地址，格式如： "http:/' + '/www.example.com"',
            alphaText: '该输入项只能包含半角字母和_',
            alphanumText: '该输入项只能包含半角字母,数字和_'    
        },
        "Ext.form.field.HtmlEditor":{
            createLinkText: '添加超级链接:'
        },
        "Ext.grid.header.Container":{
            sortAscText: "正序",
            sortDescText: "倒序",
            columnsText: "列"    
        },
        "Ext.grid.feature.Grouping":{
            emptyGroupText: '(空)',
            groupByText: '按此字段分组',
            showGroupsText: '以组显示'    
        },
        "Ext.grid.PropertyColumnModel":{
            nameText: "名称",
            valueText: "值",
            dateFormat: "y年m月d日",
            trueText: "true",
            falseText: "false"
        },
        "Ext.grid.BooleanColumn":{
            trueText: "true",
            falseText: "false",
            undefinedText: '&#160;'    
         },
         "Ext.form.field.Time":{
            minText: "时间必须在 {0} 或之后",
            maxText: "时间必须在 {0} 或之前",
            invalidText: "{0} 不是有效的时间",
            format: "g:i A",
            altFormats: "g:ia|g:iA|g:i a|g:i A|h:i|g:i|H:i|ga|ha|gA|h a|g a|g A|gi|hi|gia|hia|g|H"    
         },
         "Ext.form.field.File":{
            buttonText: "浏览..."
         },
         "Ext.form.CheckboxGroup":{
            blankText: "必须选择至少一项"
         },
         "Ext.form.RadioGroup":{
            blankText: "必须选择一项"
         },
         "Ext.window.MessageBox":{
            buttonText: {
                ok: "确定",
                cancel: "取消",
                yes: "是",
                no: "否"
            }        
        },
        "Ext.grid.filters.Filters":{
            menuFilterText: "筛选"
        },
        "Ext.grid.filters.filter.Boolean":{
            yesText: "是",
            noText: "否"    
        },
        "Ext.grid.filters.filter.Date":{
            fields: {
                lt: {text: '之前'},
                gt: {text: '之后'},
                eq: {text: '在'}
            },
        },
        "Ext.grid.filters.filter.List":{
            loadingText: "读取中..."
        },
        "Ext.grid.filters.filter.Number":{
            emptyText: "输入数字..."
        },
        "Ext.grid.filters.filter.String":{
            emptyText: "输入关键字..."
        },
        'Ext.view.MultiSelectorSearch':{
            searchText: '搜索...'
        },
        '(Ext.view.MultiSelector':{
            emptyText: '没有选择任何条目',
            removeRowTip: '移除条目',
            addToolText: '搜索要添加的条目'
        },
        "(Ext.tab.Tab":{
            closeText: "关闭此标签"
        }    
    }
}