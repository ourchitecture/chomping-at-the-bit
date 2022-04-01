import { mount } from '@vue/test-utils'
import HomePage from '@/views/HomePage.vue'

describe('HomePage.vue', () => {
  it('renders home vue', () => {
    const wrapper = mount(HomePage).find("#container")
    expect(wrapper.text()).toMatch('UI Components')
  })
})
