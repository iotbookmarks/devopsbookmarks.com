<template>
    <div>
        <div class="content">
            <div class="content-article">
                <h2>Discover tools and frameworks in the DevOps landscape.</h2>
                <h3>There are new awesome tools and frameworks being released everyday. This is an open and transparent
                    attempt at aggregating all those. The entire source code and list of tools can be found at <a
                            href="http://github.com/iotbookmarks">github.com/iotbookmarks</a>, and you are encouraged
                    to <a href="https://github.com/iotbookmarks/iotbookmarks.xyz/blob/master/CONTRIBUTING.md">contribute
                        anything</a> you come across.</h3>
                <h3>Pick tags to start exploring!</h3>
            </div>

            <div class="random-tool" v-if="randomPick">
                <h3>Random Pick</h3>
                <tool :dimensions="dimensions" :tool="randomPick"></tool>
            </div>
        </div>
        <sidebar :tags="[]" :dimensions="dimensions"></sidebar>
    </div>
</template>

<script>
  const Q = require('q');
  const axios = require('axios');
  const apiUrl = require('~/helpers/apihelper').apiUrl;
  const cache = require('~/helpers/cache');

  export default {
    data ({ req }) {
      const dimensionsPromise = cache.get('dimensions', () => axios.get(apiUrl(req, '/data/dimensions')), this);
      const randomPick = axios.get(apiUrl(req, '/data/tools/sample'));

      return Q.all([dimensionsPromise, randomPick])
        .then(values => {
          return { dimensions: values[0].data, randomPick: values[1].data };
        });
    },
    components: { sidebar: require('~components/sidebar.vue'), tool: require('~components/tool.vue') }
  }


</script>
