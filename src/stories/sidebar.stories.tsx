import { Meta, StoryObj } from '@storybook/react'
import {
  LucideIcon,
  HomeIcon,
  UsersIcon,
  CogIcon,
  UserCircleIcon,
  LucideShieldQuestion,
  ChevronRight,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { useState } from 'react'

type SubmenuItem = {
  href: string
  label: string
}

type Menuitem = {
  href: string
  label: string
  icon: LucideIcon
  submenus?: SubmenuItem[]
}

type Group = {
  groupLabel: string
  menus: Menuitem[]
}

const sampleMenus: Menuitem[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: HomeIcon,
    submenus: [
      { href: '/1', label: 'Profile' },
      { href: '/2', label: 'Security' },
      { href: '/3', label: 'Notifications' },
    ],
  },
  {
    href: '/users',
    label: 'Users',
    icon: UsersIcon,
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: CogIcon,
  },
  {
    href: '/account',
    label: 'Account',
    icon: UserCircleIcon,
    submenus: [
      { href: '/4', label: 'Profile' },
      { href: '/5', label: 'Security' },
      { href: '/6', label: 'Notifications' },
    ],
  },
  {
    href: '/help',
    label: 'Help',
    icon: LucideShieldQuestion,
  },
]

const sampleGroups: Group[] = [
  {
    groupLabel: 'Main Navigation',
    menus: sampleMenus.slice(0, 3),
  },
  {
    groupLabel: 'Account Options',
    menus: sampleMenus.slice(3),
  },
]

type SidebarContentProps = {
  groups: Group[]
  activeItem: string | null
  onItemClick: (href: string) => void
}

const SidebarContentComponent: React.FC<SidebarContentProps> = ({
  groups,
  activeItem,
  onItemClick,
}) => {
  return (
    <SidebarContent>
      {groups.map((group, index) => (
        <SidebarGroup key={index}>
          <SidebarGroupLabel>{group.groupLabel}</SidebarGroupLabel>
          {group.menus.map((menu, idx) => (
            <SidebarMenu key={idx}>
              {menu.submenus ? (
                <Collapsible
                  key={idx}
                  open={menu.href === activeItem}
                  className='group/collapsible'>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        isActive={menu.href === activeItem}
                        onClick={() => onItemClick(menu.href)}>
                        <menu.icon />
                        {menu.label}
                        <ChevronRight className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90' />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {menu.submenus?.map(item => (
                          <SidebarMenuSubItem key={item.label}>
                            <SidebarMenuSubButton asChild>
                              <a
                                href={item.href}
                                className={
                                  item.href === activeItem
                                    ? 'bg-slate-100 text-indigo-600'
                                    : ''
                                }
                                onClick={e => {
                                  e.preventDefault()
                                }}>
                                <span>{item.label}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={menu.href === activeItem}
                    asChild>
                    <a
                      href={menu.href}
                      onClick={e => {
                        e.preventDefault()
                        onItemClick(menu.href)
                      }}>
                      <menu.icon /> {menu.label}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          ))}
        </SidebarGroup>
      ))}
    </SidebarContent>
  )
}

const SidebarComponent: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string | null>('/dashboard')

  const handleItemClick = (href: string) => {
    if (href === activeItem) {
      setActiveItem(null)
    } else {
      setActiveItem(href)
    }
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContentComponent
          groups={sampleGroups}
          activeItem={activeItem}
          onItemClick={handleItemClick}
        />
      </Sidebar>
    </SidebarProvider>
  )
}

const meta: Meta = {
  title: 'Components/Sidebar',
  component: SidebarContentComponent,
  tags: ['autodocs'],
  argTypes: {
    groups: {
      control: 'object',
      description:
        'An array of menu groups, each containing a label and an array of menu items.',
    },
    activeItem: {
      control: 'text',
      description: 'The currently active menu item, used to control the state',
    },
    onItemClick: {
      control: 'object',
      description:
        'Callback function that is called when a menu item is clicked. It is responsible for updating the active state.',
    },
  },
}
export default meta

type Story = StoryObj<typeof SidebarContentComponent>

export const Default: Story = {
  render: () => <SidebarComponent />,
}
