import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/reducers/auth';
import { useNavigate } from 'react-router-dom';

function ResponsiveAppBar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleLogout = () => {
		dispatch(logout());
		localStorage.removeItem('token');
		navigate('/');
	};

	const [logged, setLogged] = React.useState(false);
	const [user, setUser] = React.useState({});
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const userLog = useSelector((state) => state.auth.user);

	React.useEffect(() => {
		setLogged(isLoggedIn);
		setUser(userLog);
	}, [isLoggedIn, userLog]);

	const links = [
		{ name: 'Créer un groupe', path: '/createGroupe' },
		{ name: 'Mes groupes', path: '/compte' },
	];

	const linksisnotlogged = [
		{ name: 'Connexion', path: '/connexion' },
		{ name: 'Inscription', path: '/inscription' },
	];

	const settings = [
		{ name: 'Mon Compte', path: '/compte' },
		{ name: 'Deconnexion', onClick: () => handleLogout() },
	];

	return (
		<AppBar
			position='static'
			sx={{ marginBottom: 5, background: '#171E1E' }}>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<Typography
						variant='h5'
						noWrap
						component='a'
						href='/'
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'white',
							textDecoration: 'none',
						}}>
						Ynov Workplace
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='white'>
							<MenuIcon background='white' />
						</IconButton>
						<Menu
							id='menu-appbar'
							key='nav-menu'
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
							sx={{
								display: { xs: 'block', md: 'none' },
							}}>
							{logged
								? links.map((link) => (
										<Link
											to={link.path}
											style={{ textDecoration: 'none' }}
											key={link.name}>
											<Button
												onClick={handleCloseNavMenu}
												sx={{ my: 2, color: 'black', display: 'block' }}>
												{link.name}
											</Button>
										</Link>
								  ))
								: linksisnotlogged.map((linkisnotlogged) => (
										<Link
											to={linkisnotlogged.path}
											style={{ textDecoration: 'none' }}
											key={linkisnotlogged.name}>
											<Button
												onClick={handleCloseNavMenu}
												sx={{ my: 2, color: 'white', display: 'block' }}>
												{linkisnotlogged.name}
											</Button>
										</Link>
								  ))}
						</Menu>
					</Box>
					<Link
						to='/'
						style={{ textDecoration: 'none' }}>
						<Typography
							variant='h5'
							noWrap
							component='h5'
							href='/'
							sx={{
								mr: 2,
								display: { xs: 'flex', md: 'none' },
								flexGrow: 1,
								fontWeight: 700,
								letterSpacing: '.3rem',
								color: 'white',
								textDecoration: 'none',
							}}>
							Ynov Workplace
						</Typography>
					</Link>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'none', md: 'flex' },
							justifyContent: 'end',
						}}>
						{logged
							? links.map((link) => (
									<Link
										to={link.path}
										style={{ textDecoration: 'none' }}
										key={link.name}>
										<Button
											onClick={handleCloseNavMenu}
											sx={{ my: 2, color: 'black', display: 'block' }}>
											{link.name}
										</Button>
									</Link>
							  ))
							: linksisnotlogged.map((linkisnotlogged) => (
									<Link
										to={linkisnotlogged.path}
										style={{ textDecoration: 'none' }}
										key={linkisnotlogged.name}>
										<Button
											onClick={handleCloseNavMenu}
											sx={{ my: 2, color: 'white', display: 'block' }}>
											{linkisnotlogged.name}
										</Button>
									</Link>
							  ))}
					</Box>
					{logged ? (
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title='Open settings'>
								<IconButton
									onClick={handleOpenUserMenu}
									sx={{ p: 0 }}>
									<Avatar
										sx={{ backgroundColor: '#048b9a' }}
										alt={user.nickname}
										src='/static/images/avatar/2.jpg'
									/>
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: '45px' }}
								id='menu-appbar'
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}>
								{settings.map((setting) => (
									<MenuItem
										key={setting.name}
										onClick={handleCloseUserMenu}>
										{setting.path ? (
											<Link to={setting.path}>
												<Button sx={{ color: 'black' }}>{setting.name}</Button>
											</Link>
										) : (
											<Button
												sx={{ color: 'black' }}
												onClick={setting.onClick}>
												{setting.name}
											</Button>
										)}
									</MenuItem>
								))}
							</Menu>
						</Box>
					) : null}
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default ResponsiveAppBar;
