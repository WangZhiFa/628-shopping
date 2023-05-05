<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="item in floorList" :key="item.id" :list="item"></Floor>
    <Brank></Brank>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brank from '@/pages/Home/Brank'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brank
  },
  mounted() {
    this.$store.dispatch('home/getFloorList')
  },
  computed: {
    ...mapState('home', ['floorList'])
  }
}
</script>

<style></style>
