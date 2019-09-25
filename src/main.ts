import Vue from 'vue';
import router from '@/router';
import VueExt from '@/plugins';
import supportProject from '@/utils/supportUtil';
import Index from '@/pages/index/index.vue';

const support = supportProject();

if (!support.support) {
    alert('您的浏览器版本过低，请先升级浏览器，推荐使用谷歌浏览器访问');
} else {
    // 阻止启用生产消息
    Vue.config.productionTip = false;

    // 错误捕获
    Vue.config.errorHandler = (err, vm, info) => {
        console.error('通过errorHandler捕获错误：', err, vm, info);
    };

    // 挂载插件
    Vue.use(<any>VueExt);

    // 创建实例
    new Vue({
        router,
        render: h => h(Index),
    }).$mount('#app');
}
