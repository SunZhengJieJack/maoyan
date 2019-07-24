<template>
    <div class="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.loading{
    width: 2rem;
    height: 0.3rem;
    margin: 0 auto;
    margin-top: 4rem;
}
.loading span{
    display: inline-block;
    width: 0.3rem;
    height: 100%;
    margin-right: 0.1rem;
    border-radius: 50%;
    background: gray;
    -webkit-animation: load 1.04s ease infinite;
}
.loading span:last-child{
    margin-right: 0px; 
}
@-webkit-keyframes load{
    0%{
        opacity: 1;
    }
    100%{
        opacity: 0;
    }
}
.loading span:nth-child(1){
    -webkit-animation-delay:0.13s;
}
.loading span:nth-child(2){
    -webkit-animation-delay:0.26s;
}
.loading span:nth-child(3){
    -webkit-animation-delay:0.39s;
}
.loading span:nth-child(4){
    -webkit-animation-delay:0.52s;
}
.loading span:nth-child(5){
    -webkit-animation-delay:0.65s;
}
</style>

