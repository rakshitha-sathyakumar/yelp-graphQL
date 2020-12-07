import React from 'react';
import { shallow, mount, render } from './enzyme';
import { Provider } from 'react-redux';
import Login from '../src/components/Login'
import store from './store';


describe('login test', () => {
  const wrapper = mount(<Provider store={store}><Login/></Provider>);

  //Email and password input field should be present
  it('should have email input component', ()=> {

    wrapper.find('input[type="email"]').simulate('change', {target: {name: 'email_id', value: 'pooji@gmail.com'}});
});
it('should have password input component', ()=> {
  wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: 'password'}});
});
it('should have a button component', ()=> {

  expect(wrapper.find('button')).toHaveLength(1);
});
})
