var i18n={    
    monthNames :["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    dayNames : ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
    loadingText: '读取中',

    applicationUpdate:'应用程序更新',
    applicationUpdateMsg: '应用程序已经更新，重新加载？',
    appTitle: '示例',
    logout: '退出',
    loginTitle: '登录',
    loginLabel: '使用帐号登录',
    loginSubmitWaitMsg: '正在登录，请等待......',
    loginSubmitWaitTitle: '正在登录',
    passwordResetTitle: '修改密码',
    passwordResetLabel: '输入以下字段以修改密码',
    passwordResetSuccess: '密码已修改，请重新登录',
    oldPasswordEqualNew: '新密码不能与旧密码相同',
    userId: '用户名',
    password: '密码',
    newPassword: '新密码',
    passwordRegexText: '密码必须由字母和数字组成,且长度至少为6位',
    confirmPassword: '确认密码',
    rememberMe: '记住我',

    save: '保存',
    saveWaitMsg: '正在保存，请等待......',
    savedAndClose: '数据已成功保存，窗口将关闭',
    savedAndNothing: '数据已成功保存',
    savedAndNew: '数据已成功保存，可继续添加新的数据',
    reset: '重置',
    return: '返回',
    required: '该输入项为必输项',

    model:{

    }
};

var L=function(key){
    var s = key.split('.'), 
        i =0,
        obj=i18n,
        ln=s.length;
    for(i=0;i<ln;i++){
        obj = obj[s[i]];
        if(typeof obj !== 'object') return obj;
    }
}