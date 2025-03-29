export default defineComponent({
  name: "landing",
  setup() {
    return () => (
        <>
            <nav>
                <nuxt-link to={'/resume'}>resume</nuxt-link>
            </nav>
            <div>
                here landing
            </div>
        </>
    )
  },
});
