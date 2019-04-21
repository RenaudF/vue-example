<template>
  <div class="gists-page">
    <div v-if="$apollo.loading">Loading...</div>
    <div class="with-data" v-if="viewer">
      <h1>Gists</h1>
      <span>Total: {{ viewer.gists.totalCount }}</span>
      <div class="gist" v-for="(gist, index) in viewer.gists.nodes" :key="index">
        <pre>{{ gist }}</pre>
      </div>
    </div>
 </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import viewer from "../queries/gists";

@Component({
  apollo: { viewer }
})
export default class GistsPage extends Vue {}
</script>

<style>
.with-data {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.gist {
  max-width: 1024px;
  text-align: left;
}
.gist > pre {
  white-space: pre-wrap;
  overflow-x: scroll;
  background-color: seashell;
}
</style>