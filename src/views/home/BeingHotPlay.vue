<template>
  <div class="content_container">
    <essay :movieList="movieList" :total="movieLen.total" :showBtn="true" :num="1"/>
    <essay :movieList="movieList" :total="movieLen.total" :showBtn="true" :num="4"/>
    <essay :movieList="comingList" :total="movieLen.totalCounts" :showBtn="false" :title="'即将上映'" :num="2"/>
    <essay :movieList="comingList" :total="movieLen.totalCounts" :showBtn="false" :title="'即将上映'" :num="3"/>
  </div>
</template>
<<script>
import { Component, Vue, Watch } from 'vue-property-decorator';
import essay from '../ui/essay.vue';
import { State, Mutation} from 'vuex-class';

    @Component({
      components: {
        essay
      },
    })
export default class BeingHotPlay extends Vue {
    @State('movieList') movieList;
    @State('comingList') comingList;
    @Mutation('switchData') switchData;
    @State('movieLen') movieLen;
    @Mutation('obtainLength') obtainLength;
}
</script>
<style lang="scss" scoped>
.content_container{
      width: 100vw;
      background: #f5f5f5;
      padding-bottom: 0.75rem;
}
</style>
