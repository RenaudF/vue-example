<template>
  <div class="gists-page">
    <div v-if="$apollo.loading">Loading...</div>
    <div class="with-data" v-if="viewer">
      <h1>Gists</h1>
      <span>Total: {{ viewer.gists.totalCount }}</span>
      <div class="control">
        <span>Sort by:</span>
        <select v-model="sort">
          <option></option>
          <option v-for="(sort, index) in sorts" :key="index" :value="sort">{{ sort }}</option>
        </select>
      </div>
      <div class="control">
        <span>Filter by:</span>
        <select v-model="filter">
          <option></option>
          <option v-for="(extension, index) in extentions" :key="index" :value="extension">{{ extension }}</option>
        </select>
      </div>
      <div class="gist" v-for="(gist, index) in gists" :key="index">
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
export default class GistsPage extends Vue {
  readonly sorts: string[] = ['createdAt', 'pushedAt', 'updatedAt'];
  get extentions(): string[] {
    const nested = (this.$data.viewer.gists.nodes as any[]).map((node) => (node.files as any[]).map((file) => file.extension));
    const flattened = Array.prototype.concat.apply([], nested);
    return Array.from(new Set<string>(flattened));
  }
  get gists(): any[] {
    return this.$data.viewer.gists.nodes.filter(this.filterFn).sort(this.sortFn);
  }
  private filterFn(gist: any): boolean {
    return (this.filter) ? gist.files.some((file: any) => file.extension === this.filter) : true;
  }
  private sortFn(gistA: any, gistB: any): number {
    const [a, b] = [gistA, gistB].map((gist) => gist[this.sort]);
    return (this.sort) ? (a > b) ? 1 : (a < b) ? -1 : 0 : 0;
  }
  sort = '';
  filter = '';
}
</script>

<style>
.with-data {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.control {
  display: flex;
  justify-content: center;
}
.control > * {
  margin: 0 5px;
  width: 160px;
  text-align: right;
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