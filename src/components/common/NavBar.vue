<template>
  <div class="cms-s-header">
        <h1 @click="goback">&nbsp<</h1>
        <h1 class="page-title"><h6>{{title}}</h6></h1>
      </div>
</template>

<script>
export default {
  name:'nav-bar',
  props:['title'],
  methods:{
    goback(){
      this.$router.go(-1)
    }
  },
    data(){
      return {

      }
    }
  
}
</script>

<style scoped>
.cms-s-header{
        height: 40px;
        background-color: #f7f7f7;
}
 h1{
   display: inline-block;
   height: 40px;
   line-height: 40px;
   margin-top:0px;
   margin-bottom:0px;

}
.page-title{
    margin-left: 25%;
}
</style>
