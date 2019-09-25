/**
 * @desc 判断是否能运行此vue项目判断
 * IE10+或者IE Edge，同时支持Object.defineProperty(Vue必备方法)、FormData(请求必备方法)
 */
type TSupportReturn = {
    support: boolean
    isIE: boolean
}

export default (): TSupportReturn => {
    // 是否支持Object.defineproperty
    // 是否支持formData
    // IE10以上
    const { userAgent } = navigator;
    const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1;
    const isEdge = userAgent.indexOf('Edge') > -1 && !isIE;
    const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
    let IELevel = 11;

    if (isIE) {
        const reg = new RegExp('MSIE (\\d+\\.\\d+);');

        reg.test(userAgent);
        IELevel = ~~(RegExp.$1);
    }

    return {
        support: (IELevel > 9 || isEdge || isIE11) && !!Object.defineProperty && !!FormData,
        isIE: isIE || isEdge || isIE11,
    };
};
