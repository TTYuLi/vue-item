<template>
    <div class="tmpl">
        <div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div>
                        <span>提交评论</span>
                        <span><a @click="$router.go(-1)">返回</a></span>
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea cols=50 rows=5 v-model="content"></textarea>
                </li>
                <li>
                    <mt-button type="primary" size="large" @click="send">发表评论</mt-button>
                </li>
                <li class="photo-comment">
                    <div>
                        <span>评论列表</span>
                        <span>44条评论</span>
                    </div>
                </li>
            </ul>
            <ul class="comment-list">
                <li v-for="(comment,index) in comments" :key="index">
                    {{comment.user_name}}:{{comment.content}} {{comment.add_time|convertTime}}
                </li>
            </ul>
            <mt-button type="danger" size="large" plain @click="loadMore">加载更多</mt-button>
        </div>
    </div>
</template>
<script>
export default {
    name:'comment',
    props:['cId']
    ,
    data(){
        return {
            page:1,
            comments:[],
            hasData:true,
            content:'',
            id:37
        }
    },
    methods:{
        send(){
            this.$axios.post(`postcomment/${this.cId}`,`content=${this.content}`)
            .then( res => {
                console.log(res)
                //发表成功后刷新页面

                this.loadByPage(1)
                this.page = 1
                //清空
                this.content = ''
            })
            .catch( err =>{
                console.log(err)
            })
        },
        loadMore(){
            if (!this.hasData) return
            this.$axios.get(`getcomments/${this.cId}?pageindex=${this.page}`)
            .then( res => {
                 this.comments = this.comments.concat(res.data.message)
                 
                 if (res.data.message.length == 0) {
                     this.hasData = false
                     this.$toast('没有更多数据了')
                     return
                 }

                 this.page++
            })
        },
        loadByPage(page){
            this.$axios.get(`getcomments/${this.cId}?pageindex=${page}`)
            .then(res=>{
                this.comments = res.data.message
                page++
            }).catch( err => {
                console.log(err)
            })
        }
    },
    created(){
        this.id = this.cId
        this.page = this.$route.query.pageindex||1
        this.loadByPage(this.page)   
    }
}
</script>
<style scoped>
.photo-comment > div span:nth-child(1) {
    float: left;
    font-weight: bold;
    margin-left: 5px;
}

.photo-comment > div span:nth-child(2) {
    float: right;
}

.photo-comment {
    height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    line-height: 30px;
    margin-bottom: 5px;
}

.txt-comment {
    padding: 5 5;
}

.txt-comment textarea {
    margin-bottom: 5px;
}

.comment-list li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}
</style>
