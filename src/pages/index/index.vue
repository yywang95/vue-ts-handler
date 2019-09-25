<template>
    <div class="home">
        <h1>home template</h1>
        <img alt="Vue logo" src="../../assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
        <router-view />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';

@Component({
    components: {
        HelloWorld,
    },
})
export default class Index extends Vue {
    mounted() {
        console.log(1234);
    }
}
</script>
