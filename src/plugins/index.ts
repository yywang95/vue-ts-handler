import Vue from 'vue';
import Request from '@/http';

export default {
    install(vue: Vue) {
        /* 后端请求 */
        Reflect.defineProperty(vue.prototype, '$request', { value: Request });
    },
};
