<template>
    <div>
        <nav-bar title="商品评论"></nav-bar>
        <CommentVue :cId="aid"></CommentVue>
    </div>
</template>
<script>
import CommentVue from '../common/comment.vue';
    export default {
        data(){
            return {
                aid:'',
                title:'商品评论'
            }
        },
        created(){
            this.aid = this.$route.query.commentId;
            console.log(this.aid)
        },
        components:{
            CommentVue
        }
    }
</script>
<style>
    
</style>