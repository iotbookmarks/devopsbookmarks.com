<template>
    <div class="nav">
        <div class="logo">
            <nuxt-link to="/"><h1>IoT Bookmarks</h1></nuxt-link>
        </div>

        <div class="menu">
            <div v-for="name in ['topics', 'licenses', 'languages']">
                <h3>{{ name }}</h3>
                <div class="tag" v-for="item in dimensions[name]">
                    <nuxt-link class="toggle" :to="extraUrlFor(item)">
                        <i class="fa fa-fw"
                           :class="{'fa-check-circle': containsTagOf(item), 'fa-circle-o': !containsTagOf(item)}"></i>
                    </nuxt-link>
                    <nuxt-link :class="{'active': containsTagOf(item)}" :to="extraUrlFor(item)">
                        {{ item.name }}
                    </nuxt-link>
                </div>
            </div>
        </div>
        <div class="meta menu">
            <h3>Meta</h3>
            <a href="https://github.com/iotbookmarks/iotbookmarks.xyz/blob/master/CONTRIBUTING.md">Submit a tool</a>
            <a href="https://github.com/iotbookmarks/iotbookmarks.xyz/blob/master/README.md">About</a>
        </div>

    </div>
</template>

<script>
  const _ = require('lodash');

  export default {
    props:   ['tags', 'dimensions'],
    methods: {
      extraUrlFor(dimensionItem) {
        const tag = dimensionItem.slug;
        const newTags = _.includes(this.tags, tag) ? _.without(this.tags, tag) : _.union(this.tags, [tag]);
        return "/" + newTags.sort().join('+');
      },
      containsTagOf(dimensionItem) {
        return _.includes(this.tags, dimensionItem.slug);
      }
    }
  }
</script>
