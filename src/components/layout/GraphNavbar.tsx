'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

const pages = [
  // { name: 'Dashboard', href: '/' },
  // { name: 'Grafs', href: '/graph' },
];

const actionButtons = [
  { name: 'Grafs', href: '/graph', variant: 'contained' as const },
  { name: 'Dashboard', href: '/', variant: 'outlined' as const },
];

export default function EducationNavbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: '#C3E956',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: '64px' }}>
          {/* Logo - Desktop */}
          <Box
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <Image
              src="/Darwin.svg"
              alt="Darwin Logo"
              width={40}
              height={40}
              style={{ objectFit: 'contain' }}
            />
          </Box>

          {/* Mobile Menu Button */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ color: 'white' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {/* {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography
                    component={Link}
                    href={page.href}
                    sx={{
                      textAlign: 'center',
                      textDecoration: 'none',
                      color: 'inherit',
                      width: '100%'
                    }}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))} */}
              {/* Mobile Action Buttons */}
              {actionButtons.map((button) => (
                <MenuItem key={`mobile-${button.name}`} onClick={handleCloseNavMenu}>
                  <Button
                    component={Link}
                    href={button.href}
                    variant={button.variant}
                    fullWidth
                    sx={{
                      backgroundColor: button.variant === 'contained' ? 'black' : 'transparent',
                      color: button.variant === 'contained' ? 'white' : 'black',
                      border: button.variant === 'outlined' ? '1px solid #d1d5db' : 'none',
                      '&:hover': {
                        backgroundColor: button.variant === 'contained' ? '#374151' : '#f9fafb',
                      },
                    }}
                  >
                    {button.name}
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo - Mobile */}
          <Box
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <Image
              src="/Darwin.svg"
              alt="Darwin Logo"
              width={32}
              height={32}
              style={{ objectFit: 'contain' }}
            />
          </Box>

          {/* Desktop Navigation Links */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 4 }}>
            {/* {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                href={page.href}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                {page.name}
              </Button>
            ))} */}
          </Box>

          {/* Desktop Action Buttons */}
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {actionButtons.map((button) => (
              <Button
                key={button.name}
                component={Link}
                href={button.href}
                variant={button.variant}
                size="small"
                sx={{
                  backgroundColor: button.variant === 'contained' ? 'black' : 'transparent',
                  color: button.variant === 'contained' ? 'white' : 'black',
                  border: button.variant === 'outlined' ? '1px solid #d1d5db' : 'none',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: button.variant === 'contained' ? '#374151' : '#f9fafb',
                  },
                }}
              >
                {button.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}