<template>
  <div class="b-tree" @scroll="handleScroll">
    <div class="b-tree-phantom" :style="{height:contentHeight}"></div>
    <div class="b-tree-content" :style="{transform:`translateY(${offset}px)`}">
      <div v-for="(item,index) in visibleData" :key="item.id" class="b-tree-list-view" :style="{paddingLeft: 18 * (item.level - 1) + 'px'}">
        <i :class="item.expand ? 'b-tree-expand':'b-tree-close'" v-if="item.children && item.children.length"></i>
        <slot :item="item" :index="index"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'bigTree',
  props: {
    tree: {
      type: Array,
      required: true,
      default: []
    },
    defaultExpand: {
      type: Boolean,
      required: false,
      default: false
    },
    option: {
      type: Object,
      required: true,
      default: {}
    }
  },
  data() {
    return {
      offset: 0,
      visibleData: []
    }
  },
  computed: {
    contentHeight() {
      return (
        (this.flattenTree || []).filter(item => item.visible).length *
        this.option.itemHeight + 'px'
      )
    },
    flattenTree() {
      const flatten = function (
        list,
        childKey = "children",
        level = 1,
        parent = null,
        defaultExpand = true
      ) {
        let arr = [];
        list.forEach(item => {
          item.level = level;
          if (item.expand === undefined) {
            item.expand = defaultExpand
          }
          if (item.visible === undefined) {
            item.visible = true;
          }
          if (!parent.visible || !parent.expand) {
            item.visible = false;
          }
          item.parent = parent;
          arr.push(item);
          if (item[childKey]) {
            arr.push(
              ...flatten(
                item[childKey],
                childKey,
                level + 1,
                item,
                defaultExpand
              )
            );
          }
        });
        return arr;
      };
      return flatten(this.tree, 'children', 1,{
        level: 0,
        visible: true,
        expand: true,
        children: this.tree
      });
    }
  },
  mounted(){
    this.updateVisibleData();
  },
  methods:{
    handleScroll(e){
      const scrollTop = e.target.scrollTop
      this.updateVisibleData(scrollTop)
    },
    updateVisibleData(scrollTop = 0){
      const start = Math.floor(scrollTop / this.option.itemHeight);
      const end = start + this.option.visibleCount;
      const allVisibleData = (this.flattenTree || []).filter(
        item => item.visible
      );
      this.visibleData = allVisibleData.slice(start, end);
      this.offset = start * this.option.itemHeight;
    }
  }
}

</script>
<style>
.b-tree {
  position: relative;
  height: 500px;
  overflow-y: scroll;
}
.b-tree-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}
.b-tree-content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  min-height: 100px;
}
.b-tree-list-view {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.b-tree-content-item {
  padding: 5px;
  box-sizing: border-box;

  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  cursor: pointer;
}
.b-tree-content-item:hover,
.b-tree-content-item-selected {
  background-color: #d7d7d7;
}
.b-tree-content-item-icon {
  position: absolute;
  left: 0;
  color: #c0c4cc;
  z-index: 10;
}
.b-tree-close {
  display: inline-block;
  width: 0;
  height: 0;
  overflow: hidden;
  font-size: 0;
  margin-right: 5px;
  border-width: 5px;
  border-color: transparent transparent transparent #c0c4cc;
  border-style: dashed dashed dashed solid;
}
.b-tree-expand {
  display: inline-block;
  width: 0;
  height: 0;
  overflow: hidden;
  font-size: 0;
  margin-right: 5px;
  border-width: 5px;
  border-color: #c0c4cc transparent transparent transparent;
  border-style: solid dashed dashed dashed;
}
</style>

