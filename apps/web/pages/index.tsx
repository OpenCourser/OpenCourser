import { SettingsIcon } from '@chakra-ui/icons';
import { Box, IconButton, Image, Spacer } from '@chakra-ui/react';
import { Menu, MenuButton, MenuItem, MenuList } from '@saas-ui/menu';
import { AppShell } from '@saas-ui/react';
import { NavItem, Sidebar, SidebarSection, SidebarToggleButton } from '@saas-ui/sidebar';
import React from 'react';
import VideoJS from 'components/Video';

export default function Web() {
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8',
        type: 'application/x-mpegURL',
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      console.log('player is waiting');
    });

    player.on('dispose', () => {
      console.log('player will dispose');
    });
  };

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
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      </Box>
    </AppShell>
  );
}
