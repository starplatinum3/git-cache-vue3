<template>
    {{msg}}
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
    setup () {
        const state = reactive({
            msg: 'Hello Vue World!'
        })
    
        return {
            ...toRefs(state)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>