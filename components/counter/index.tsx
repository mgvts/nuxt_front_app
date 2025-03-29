export default defineComponent({
    name: "Counter",
    setup() {
        const counter = ref(0)

        const reset = () => {
            counter.value = 0
        }
        const inc = () => {
            counter.value += 1
        }

        return () => (
            <>
                <button onClick={reset}>reset</button>
                <button onClick={inc}>inc</button>
                <div>{counter.value}</div>
            </>
        )
    }
})
