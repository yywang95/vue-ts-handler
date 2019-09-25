<template>
    <div>
        <h3 @click="handleClick">这是首页</h3>
        <Footer :msg="msg" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Footer from '@/components/Footer.vue';

@Component({
    components: {
        Footer,
    },
})
export default class Home extends Vue {
    msg: string = 'abc'

    async handleClick() {
        try {
            const data = await this.$request.get('http://doclever.cn:8090/mock/5bf6ca4e999a3220765f7468/user/userInfo');

            console.log(data);
        } catch (e) {
            console.error(e);
        }
    }
}
</script>
