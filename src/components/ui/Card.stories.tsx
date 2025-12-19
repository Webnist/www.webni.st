import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './Card';
import { Button } from './Button';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass', 'outline'],
      description: 'カードのバリアント',
    },
    hover: {
      control: 'boolean',
      description: 'ホバー効果',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description goes here</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the card content. You can put any content here.</p>
        </CardContent>
      </>
    ),
  },
};

export const Glass: Story = {
  args: {
    variant: 'glass',
    children: (
      <>
        <CardHeader>
          <CardTitle>Glass Card</CardTitle>
          <CardDescription>Liquid Glass style card</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has a glass morphism effect with backdrop blur.</p>
        </CardContent>
      </>
    ),
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
    children: (
      <>
        <CardHeader>
          <CardTitle>Outline Card</CardTitle>
          <CardDescription>Card with outline border</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has an outline border style.</p>
        </CardContent>
      </>
    ),
  },
};

export const WithFooter: Story = {
  args: {
    variant: 'glass',
    children: (
      <>
        <CardHeader>
          <CardTitle>Card with Footer</CardTitle>
          <CardDescription>Card description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content goes here.</p>
        </CardContent>
        <CardFooter>
          <Button variant="primary" size="sm">
            Action
          </Button>
        </CardFooter>
      </>
    ),
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const Hoverable: Story = {
  args: {
    variant: 'glass',
    hover: true,
    children: (
      <>
        <CardHeader>
          <CardTitle>Hoverable Card</CardTitle>
          <CardDescription>Hover over this card</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has a hover effect. Try hovering over it!</p>
        </CardContent>
      </>
    ),
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <Card variant="default">
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
        </CardHeader>
        <CardContent>Default variant card</CardContent>
      </Card>
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Glass Card</CardTitle>
        </CardHeader>
        <CardContent>Glass variant card</CardContent>
      </Card>
      <Card variant="outline">
        <CardHeader>
          <CardTitle>Outline Card</CardTitle>
        </CardHeader>
        <CardContent>Outline variant card</CardContent>
      </Card>
    </div>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

