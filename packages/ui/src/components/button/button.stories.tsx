import type { Meta, StoryObj } from "@storybook/react";
import { ChevronRight } from "lucide-react";

import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "outline",
        "ghost",
        "destructive",
        "link",
      ],
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg", "icon"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => alert("Button clicked!"),
    children: "Button",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};

export const WithIcon: Story = {
  render: () => (
    <Button>
      Next
      <ChevronRight />
    </Button>
  ),
};

export const AsChild: Story = {
  render: () => (
    <Button asChild>
      <a href="https://example.com">Link as Button</a>
    </Button>
  ),
};
