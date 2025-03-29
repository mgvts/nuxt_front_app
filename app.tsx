import { NuxtLayout, NuxtPage } from "#components"

export default defineComponent({
    name: 'app',
    setup() {
        return () => (
            <div>
            <NuxtLayout>
              <NuxtPage/>
            </NuxtLayout>
          </div>
        )
    }
})