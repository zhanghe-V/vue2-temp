import Vue from 'vue'
import SearchForm from './search'

const components = {
    SearchForm
}

Object.keys(components).forEach(name => {
  Vue.component(name, components[name])
})
