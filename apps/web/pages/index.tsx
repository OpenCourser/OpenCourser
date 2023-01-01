import { SettingsIcon } from '@chakra-ui/icons';
import { Box, IconButton, Image, Spacer } from '@chakra-ui/react';
import { Menu, MenuButton, MenuItem, MenuList } from '@saas-ui/menu';
import { AppShell } from '@saas-ui/react';
import { NavItem, Sidebar, SidebarSection, SidebarToggleButton } from '@saas-ui/sidebar';
import React from 'react';

export default function Web() {
  return (
    <AppShell
      navbar={
        <Box as="header" borderBottomWidth="1px" py="2" px="4">
          {/* <SaasUILogo width="100px" /> */}
        </Box>
      }
      sidebar={
        <Sidebar minH="100vh">
          <SidebarToggleButton />
          <SidebarSection direction="row">
            <Image src="https://saas-ui.dev/favicons/favicon-96x96.png" boxSize="7" />
            <Spacer />
            <Menu>
              <MenuButton as={IconButton} variant="ghost" />
              <MenuList>
                <MenuItem>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </SidebarSection>
          <SidebarSection aria-label="Main">
            <NavItem icon={<SettingsIcon />} isActive>
              Home
            </NavItem>
            <NavItem icon={<SettingsIcon />}>Users</NavItem>
            <NavItem icon={<SettingsIcon />}>Settings</NavItem>
          </SidebarSection>
        </Sidebar>
      }
    >
      <Box as="main" minH="100vh" flex="1" py="2" px="4" overflowY="auto">
        Your application content
      </Box>
    </AppShell>
  );
}
