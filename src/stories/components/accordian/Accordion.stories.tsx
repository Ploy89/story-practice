import { Story } from '@storybook/react/types-6-0'
import React,{FC} from 'react'
import { Accordion,AccordionProps } from './Accordion'

export default {
  title: 'UI/Accordion',
  component: Accordion,
  args: {
    headerLabel: 'Header Label',
  },
  argTypes: {
    headerLabel: {
      control: {
        type: 'text',
      },
    },
  },
}

const AccordionStory: FC{AccordianProps} = ({ ...args }) => <Accordion {...args} />

export const BasicAccordion: Story = AccordionStory.bind({})
BasicAccordion.args = {
  headerLabel: 'Resumes and Applications (0)',
  children: <h1>children</h1>,
}
