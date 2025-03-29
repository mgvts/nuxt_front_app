export default defineComponent({
    name: "Resume",
    setup() {
        const route = useRoute()
        console.log(route)

        return () => (
            <div>here user: {route.params.id}</div>
        )
    }
})