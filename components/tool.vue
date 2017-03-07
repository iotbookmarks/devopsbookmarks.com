<template>
    <div class="tool-container">
        <div class="tool">
            <h2><a :href="tool.url" rel="nofollow">{{ tool.name }}</a></h2>
            <p>{{ tool.description }}</p>
            <p class="tags">
                <i v-for="license in dimensions.licenses"
                   :class="[license.icon, { disabled: !containsTagOf(license) }]"
                   :title="license.name">
                </i>
            </p>
            <p class="topics">
                <small v-for="tag in tool.tags">{{ tag}}</small>
            </p>
        </div>
    </div>
</template>

<script>
  const _ = require('lodash');

  export default {
    props:   ['tool', 'dimensions'],
    methods: {
      containsTagOf(dimensionItem) {
        return _.includes(this.tool.tags, dimensionItem.slug);
      }
    }
  }
</script>
