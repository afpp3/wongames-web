import { Story, Meta } from '@storybook/react'
import { AddShoppingCart } from '@styled-icons/material-rounded/AddShoppingCart'
import Button from '.'

export default {
  title: 'Button',
  argTypes: {
    children: {
      type: 'string'
    },
    icon: {
      type: ''
    }
  },
  component: Button
} as Meta

export const Default: Story = (args) => <Button {...args} />

Default.args = {
  children: 'Buy now'
}

export const withIcon: Story = (args) => <Button {...args} />

withIcon.args = {
  size: 'small',
  children: 'Buy now',
  icon: <AddShoppingCart />
}
