export default defineComponent({
    name: "",
    setup() {
        return () => (
            <div>
                <nav>
                    <nuxt-link to={'/resume/1'}>to 1</nuxt-link>
                    <nuxt-link to={'/resume/2'}>to 2</nuxt-link>
                    <nuxt-link to={'/resume/3'}>to 3</nuxt-link>
                    <nuxt-link to={'/resume/4'}>to 4</nuxt-link>
                </nav>
            </div>
        )
    }
})