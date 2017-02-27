<template>
    <div>
        <sidebar :tags="tags" :dimensions="dimensions"></sidebar>
        <div class="content">
            <div class="content-grid">
                <tool v-for="tool in tools" :dimensions="dimensions" :tool="tool"></tool>
            </div>
        </div>

    </div>
</template>

<script>
  const Q = require('q');
  const axios = require('axios');
  const apiUrl = require('~/helpers/apihelper').apiUrl;
  const cache = require('~/helpers/cache');

  function parseTags(params) {
    return params.tags.split('+');
  }

  export default {
    data ({ req, route }) {
      const dimensionsPromise = cache.get('dimensions', () => axios.get(apiUrl(req, '/data/dimensions')), this);
      const toolsPromise = axios.get(apiUrl(req, '/data/tools'), { params: { tags: parseTags(route.params) } });

      return Q.all([dimensionsPromise, toolsPromise])
        .then(values => {
          return { dimensions: values[0].data, tools: values[1].data };
        });
    },
    components: { sidebar: require('~components/sidebar.vue'), tool: require('~components/tool.vue') },
    computed:   {
      tags() {
        return parseTags(this.$route.params);
      }
    }
  }


</script>
