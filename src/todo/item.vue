<template>
    <div :class="['todo-item',todo.completed ? 'completed' : '']">
        <input
                type="checkbox"
                class="toggle"
                v-model="todo.completed"
        />
        <label>{{todo.content}}</label>
        <button class="destory" @click="deleteTodo"></button>
    </div>
</template>

<script>
    export default {
        name: "item",
        props: {
            todo: {
                type: Object,
                required: true,
            }
        },
        methods: {
            deleteTodo() {
                this.$emit('del',this.todo.id)
            }
        }
    }
</script>

<style scoped lang="stylus">
    .todo-item {
        position relative
        background-color azure
        font-size 24px
        border-bottom 1px solid rgba(0, 0, 0, 0.06)
        &:hover {
            .destory:after {
                content: 'x'
            }
        }
        label {
            white-space pre-line
            word-break break-all
            padding 15px 60px 15px 15px
            margin-left 45px
            display block
            line-height 1.2
            transition color 0.4s
        }
        &.completed {
            label {
                color blueviolet
                text-decoration line-through
            }
        }
    }

    .toggle {
        text-align center
        background-color blueviolet
        width 40px
        height 40px
        position absolute
        top 0
        bottom 0
        margin auto 0
        border none
        appearance none
        outline none
        &:after {
            content url("../assets/image/2.png")
        }
        &:checked:after {
            content url("../assets/image/3.png")
        }
    }

    .destory {
        position absolute
        top 0
        right 10px
        bottom 0
        width 40px
        margin auto 0
        font-size 30px
        color aquamarine
        margin-bottom 11px
        transition color 0.2s ease-out
        background-color chartreuse
        appearance none
        border-width 0
        cursor pointer
        outline none
    }

</style>