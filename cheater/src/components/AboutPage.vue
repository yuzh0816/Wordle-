<script setup>
import AboutItem from './AboutItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
</script>

<template>
  <AboutItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Documentation</template>

    Wordle Cheater’s
    <a href="https://github.com/yuzh0816/wordle/" target="_blank" rel="noopener">official documentation</a>
    provides you with all information you need to get started.
  </AboutItem>

  <AboutItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Technology</template>

    This project is bundled with
    <a href="https://vitejs.dev/guide/features.html" target="_blank" rel="noopener">Vite</a>.

    <br />

    More instructions are available in <code>README.md</code>.
  </AboutItem>

  <AboutItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Ecosystem</template>

    Get official tools and libraries for your project:
    <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>,
    <a href="https://router.vuejs.org/" target="_blank" rel="noopener">Vue Router</a>,
    <a href="https://test-utils.vuejs.org/" target="_blank" rel="noopener">Vue Test Utils</a>, and
    <a href="https://github.com/vuejs/devtools" target="_blank" rel="noopener">Vue Dev Tools</a>. If
    you need more resources, we suggest paying
    <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">Awesome Vue</a>
    a visit.
  </AboutItem>

  <AboutItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Issues</template>

    Got stuck? Ask your question on
    <a href="https://github.com/yuzh0816/wordle/issues" target="_blank" rel="noopener">Github Issues</a>, the official
    bug report service.
  </AboutItem>
</template>
