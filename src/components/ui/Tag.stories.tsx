import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'UI/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'glass', 'outline'],
      description: 'タグのバリアント',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'タグのサイズ',
    },
    children: {
      control: 'text',
      description: 'タグのテキスト',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Tag',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Tag',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Tag',
  },
};

export const Glass: Story = {
  args: {
    variant: 'glass',
    children: 'Glass Tag',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Tag',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-center">
      <Tag size="sm">Small Tag</Tag>
      <Tag size="md">Medium Tag</Tag>
      <Tag size="lg">Large Tag</Tag>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Tag variant="default">Default</Tag>
      <Tag variant="primary">Primary</Tag>
      <Tag variant="secondary">Secondary</Tag>
      <Tag variant="glass">Glass</Tag>
      <Tag variant="outline">Outline</Tag>
    </div>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const TechnologyTags: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag variant="primary">React</Tag>
      <Tag variant="primary">Next.js</Tag>
      <Tag variant="secondary">TypeScript</Tag>
      <Tag variant="secondary">Tailwind CSS</Tag>
      <Tag variant="glass">Storybook</Tag>
      <Tag variant="outline">Node.js</Tag>
    </div>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

