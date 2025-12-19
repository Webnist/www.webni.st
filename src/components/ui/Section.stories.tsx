import type { Meta, StoryObj } from '@storybook/react';
import { Section, Container } from './Section';
import { Card, CardHeader, CardTitle, CardContent } from './Card';

const meta: Meta<typeof Section> = {
  title: 'UI/Section',
  component: Section,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'glass', 'dark'],
      description: 'セクションのバリアント',
    },
    fullWidth: {
      control: 'boolean',
      description: 'フル幅表示',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: (
      <Container size="lg">
        <h2 className="text-2xl font-bold mb-4">Default Section</h2>
        <p className="text-slate-300">
          This is a default section with standard styling.
        </p>
      </Container>
    ),
  },
};

export const Glass: Story = {
  args: {
    variant: 'glass',
    children: (
      <Container size="lg">
        <h2 className="text-2xl font-bold mb-4 text-slate-100">Glass Section</h2>
        <p className="text-slate-300">
          This section has a glass morphism effect with backdrop blur.
        </p>
      </Container>
    ),
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const Dark: Story = {
  args: {
    variant: 'dark',
    children: (
      <Container size="lg">
        <h2 className="text-2xl font-bold mb-4">Dark Section</h2>
        <p className="text-slate-300">
          This section has a dark background.
        </p>
      </Container>
    ),
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const ContainerSizes: Story = {
  render: () => (
    <Section variant="glass">
      <div className="space-y-8">
        <Container size="sm">
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Small Container</CardTitle>
            </CardHeader>
            <CardContent>max-w-2xl</CardContent>
          </Card>
        </Container>
        <Container size="md">
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Medium Container</CardTitle>
            </CardHeader>
            <CardContent>max-w-4xl</CardContent>
          </Card>
        </Container>
        <Container size="lg">
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Large Container</CardTitle>
            </CardHeader>
            <CardContent>max-w-5xl</CardContent>
          </Card>
        </Container>
        <Container size="xl">
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Extra Large Container</CardTitle>
            </CardHeader>
            <CardContent>max-w-7xl</CardContent>
          </Card>
        </Container>
      </div>
    </Section>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const WithCards: Story = {
  render: () => (
    <Section variant="glass">
      <Container size="lg">
        <h2 className="text-3xl font-bold mb-8 text-slate-100">Featured Content</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="glass" hover>
            <CardHeader>
              <CardTitle>Card 1</CardTitle>
            </CardHeader>
            <CardContent>
              <p>This is the first card in the section.</p>
            </CardContent>
          </Card>
          <Card variant="glass" hover>
            <CardHeader>
              <CardTitle>Card 2</CardTitle>
            </CardHeader>
            <CardContent>
              <p>This is the second card in the section.</p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </Section>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

export const FullWidth: Story = {
  args: {
    variant: 'glass',
    fullWidth: true,
    children: (
      <div className="px-6">
        <h2 className="text-2xl font-bold mb-4 text-slate-100">Full Width Section</h2>
        <p className="text-slate-300">
          This section spans the full width of the viewport.
        </p>
      </div>
    ),
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

