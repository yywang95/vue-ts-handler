# vue-ts-handler

vue project handler use typescript

- vue
- router
- axios
- typescript

## vue-property-decorator syntax

### 1. data

### props

- @Prop

```js
// @Prop(options: (PropOptions | Constructor[] | Constructor) = {}) decorator
import { Vue, Component, Prop } from 'vue-property-decorator'
 
@Component
export default class YourComponent extends Vue {
    @Prop(Number) readonly propA: number | undefined
    @Prop({ default: 'default value' }) readonly propB!: string
    @Prop([String, Boolean]) readonly propC: string | boolean | undefined
}
```

等同于

```js
export default {
    props: {
        propA: {
            type: Number
        },
        propB: {
            default: 'default value'
        },
        propC: {
            type: [String, Boolean]
        }
    }
}
```

- @PropSync

```js
import { Vue, Component, PropSync } from 'vue-property-decorator'
 
@Component
export default class YourComponent extends Vue {
  @PropSync('name', { type: String }) syncedName!: string
}
```

等同于，相当于使用时添加.sync修饰符

```js
export default {
    props: {
        name: {
        type: String
        }
    },
    computed: {
        syncedName: {
            get() {
                return this.name
            },
            set(value) {
                this.$emit('update:name', value)
            }
        }
    }
}
```

#### watch

```js
// @Watch(path: string, options: WatchOptions = {}) decorator
import { Vue, Component, Watch } from 'vue-property-decorator'
 
@Component
export default class YourComponent extends Vue {
  @Watch('child')
  onChildChanged(val: string, oldVal: string) {}
 
  @Watch('person', { immediate: true, deep: true })
  onPersonChanged1(val: Person, oldVal: Person) {}
 
  @Watch('person')
  onPersonChanged2(val: Person, oldVal: Person) {}
}
```

等同于

```js
export default {
    watch: {
        child: [
            {
                handler: 'onChildChanged',
                immediate: false,
                deep: false
            }
        ],
        person: [
            {
                handler: 'onPersonChanged1',
                immediate: true,
                deep: true
            },
            {
                handler: 'onPersonChanged2',
                immediate: false,
                deep: false
            }
        ]
    },
    methods: {
        onChildChanged(val, oldVal) {},
        onPersonChanged1(val, oldVal) {},
        onPersonChanged2(val, oldVal) {}
    }
}
```

#### computed

#### methods

#### components

- 定义组件

```js
import { Vue, Component } from 'vue-property-decorator'
 
// 使用@Component不传参数定义组件
@Component
export default class YourComponent extends Vue {}
```

- 使用组件

```js

```

#### mixins

#### model

一般v-model会将value和input作为prop和event，model可以修改此设置

```js
// @Model(event?: string, options: (PropOptions | Constructor[] | Constructor) = {}) decorator
import { Vue, Component, Model } from 'vue-property-decorator'
 
@Component
export default class YourComponent extends Vue {
  @Model('change', { type: Boolean }) readonly checked!: boolean
}
```

等同于

```js
export default {
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        checked: {
            type: Boolean
        }
    }
}
```

#### provide和inject

- 静态@Provide和@Inject

```js
// @Provide(key?: string | symbol)
// @Inject(options?: { from?: InjectKey, default?: any } | InjectKey)
import { Component, Inject, Provide, Vue } from 'vue-property-decorator'
 
const symbol = Symbol('baz')
 
@Component
export class MyComponent extends Vue {
  @Inject() readonly foo!: string
  @Inject('bar') readonly bar!: string
  @Inject({ from: 'optional', default: 'default' }) readonly optional!: string
  @Inject(symbol) readonly baz!: string
 
  @Provide() foo = 'foo'
  @Provide('bar') baz = 'bar'
}
```

等同于

```js
const symbol = Symbol('baz')
 
export const MyComponent = Vue.extend({
    inject: {
        foo: 'foo',
        bar: 'bar',
        optional: { from: 'optional', default: 'default' },
        [symbol]: symbol
    },
    data() {
        return {
            foo: 'foo',
            baz: 'bar'
        }
    },
    provide() {
        return {
            foo: this.foo,
            bar: this.baz
        }
    }
})
```

- 动态更新@ProvideReactive和@InjectReactive

```js
// @ProvideReactive(key?: string | symbol)
// @InjectReactive(options?: { from?: InjectKey, default?: any } | InjectKey)
const key = Symbol()
@Component
class ParentComponent extends Vue {
  @ProvideReactive() one = 'value'
  @ProvideReactive(key) two = 'value'
}
 
@Component
class ChildComponent extends Vue {
  @InjectReactive() one!: string
  @InjectReactive(key) two!: string
}
```

#### emit

```js
import { Vue, Component, Emit } from 'vue-property-decorator'
 
@Component
export default class YourComponent extends Vue {
  count = 0
 
  @Emit()
  addToCount(n: number) {
    this.count += n
  }
 
  @Emit('reset')
  resetCount() {
    this.count = 0
  }
 
  @Emit()
  returnValue() {
    return 10
  }
 
  @Emit()
  onInputChange(e) {
    return e.target.value
  }
 
  @Emit()
  promise() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(20)
      }, 0)
    })
  }
}
```

等同于

```js
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    addToCount(n) {
      this.count += n
      this.$emit('add-to-count', n)
    },
    resetCount() {
      this.count = 0
      this.$emit('reset')
    },
    returnValue() {
      this.$emit('return-value', 10)
    },
    onInputChange(e) {
      this.$emit('on-input-change', e.target.value, e)
    },
    promise() {
      const promise = new Promise(resolve => {
        setTimeout(() => {
          resolve(20)
        }, 0)
      })
 
      promise.then(value => {
        this.$emit('promise', value)
      })
    }
  }
}
```

#### ref

```js
// @Ref(refKey?: string)
import { Vue, Component, Ref } from 'vue-property-decorator'
 
import AnotherComponent from '@/path/to/another-component.vue'
 
@Component
export default class YourComponent extends Vue {
  @Ref() readonly anotherComponent!: AnotherComponent
  @Ref('aButton') readonly button!: HTMLButtonElement
}
```

等同于

```js
export default {
  computed() {
    anotherComponent: {
      cache: false,
      get() {
        return this.$refs.anotherComponent as AnotherComponent
      }
    },
    button: {
      cache: false,
      get() {
        return this.$refs.aButton as HTMLButtonElement
      }
    }
  }
}
```
