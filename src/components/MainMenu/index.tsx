import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
// import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { default as AccountCircle } from '@material-ui/icons/AccountCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import FolderIcon from '@material-ui/icons/Folder';
import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PeopleIcon from '@material-ui/icons/PeopleAlt';
import PersonAdd from '@material-ui/icons/PersonAdd';
// import WorkIcon from '@material-ui/icons/Work';
import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Milpago from '../../img/1000pagos_LogoBlue.png';
//Redux
import { baseUrl, urlAdministracion, urlAdmision, urlCobr, urlFM, urlLogin, userAdmin } from '../../routers/url';
import { refreshLogin } from '../../store/actions/auth';
import { FinishLoading } from '../../store/actions/ui';
import { RootState } from '../../store/store';
import './index.scss';

const drawerWidth = 220;

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	hide: {
		display: 'none',
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	grow: {
		flexGrow: 1,
	},
	userName: {
		display: 'none',
		padding: '1rem',
		paddingRight: '0',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			// width: theme.spacing(9) + 1,
		},
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	link: {
		textDecoration: 'none',
		// color: theme.palette.primary.contrastText,
	},
	img: {
		'& img': {
			maxWidth: 176,
		},
	},
	icon: {
		minWidth: 40,
	},
	avatarLetter: {
		textTransform: 'uppercase',
		backgroundColor: theme.palette.primary.light,
	},
}));

const MainMenu: FC = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const classes = useStyles();
	const theme = useTheme();

	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>();
	const [section, setSection] = useState<string>('');
	const [open, setOpen] = useState(false); //Nav Left

	const [user, setUser] = useState({
		name: '',
		last_name: '',
	});

	const userDB: any = useSelector((state: RootState) => state.auth.user);

	useEffect(() => {
		if (userDB) {
			setUser(userDB);
		}
	}, [userDB]);

	const menuId = 'primary-search-account-menu';
	const mobileMenuId = 'primary-search-account-menu-mobile';
	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	const handleMenuLogout = () => {
		localStorage.removeItem('token');
		dispatch(FinishLoading());
		history.push(urlLogin);
	};

	const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
		dispatch(refreshLogin());
		switch (index) {
			case 1:
				history.push(urlAdministracion);
				setSection('Administracion');
				break;
			case 3:
				history.push(urlAdmision);
				setSection('Admision');
				// socket.emit('prueba');
				break;
			case 4:
				history.push(userAdmin);
				setSection('Gestion de Usuarios');
				break;
			case 5:
				history.push(urlFM);
				setSection('Formulario de Activación');
				break;
			case 6:
				history.push(urlCobr);
				setSection('Cobranza');
				break;

			default:
				history.push(baseUrl);
				setSection('1000Pagos C.A.');
				break;
		}
		handleDrawerClose();
	};

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		console.log('close');
		setAnchorEl(null);
		handleMobileMenuClose();
	};
	const handleLogoClick = () => {
		handleDrawerClose();
	};

	const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={menuId}
			keepMounted
			style={{ marginTop: '3rem' }}
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}>
			<MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
			<MenuItem onClick={handleMenuClose}>Mi Cuenta</MenuItem>
			<MenuItem onClick={handleMenuLogout}>Cerrar sesión</MenuItem>
		</Menu>
	);

	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}>
			<MenuItem>
				<IconButton aria-label='show 4 new mails' color='inherit'>
					<Badge badgeContent={4} color='secondary'>
						<MailIcon />
					</Badge>
				</IconButton>
				<p>Messages</p>
			</MenuItem>
			<MenuItem>
				<IconButton aria-label='show 11 new notifications' color='inherit'>
					<Badge badgeContent={11} color='secondary'>
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem>
				<IconButton
					aria-label='account of current user'
					aria-controls='primary-search-account-menu'
					aria-haspopup='true'
					color='inherit'>
					{user.name && <Avatar className={classes.avatarLetter}>{user.name.slice(0, 1)}</Avatar>}
				</IconButton>
				<p>Perfil</p>
			</MenuItem>
			<MenuItem onClick={handleMenuLogout}>
				<IconButton
					style={{ paddingTop: 0 }}
					aria-label='account of current user'
					aria-controls='primary-search-account-menu'
					aria-haspopup='true'
					color='inherit'>
					<AccountCircle />
				</IconButton>
				<p>Cerrar sesión</p>
			</MenuItem>
		</Menu>
	);

	return (
		<div className={classes.root}>
			<AppBar
				position='fixed'
				//onClick={handleMenuClose}
				className={classNames(classes.appBar, {
					[classes.appBarShift]: open,
				})}>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerOpen}
						edge='start'
						className={classNames(classes.menuButton, {
							[classes.hide]: open,
						})}>
						<MenuIcon />
					</IconButton>
					<Typography className={classes.title} variant='h6' noWrap>
						{section ? section : '1000Pagos C.A.'}
					</Typography>

					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						{/*
							<IconButton aria-label='show 4 new mails' color='inherit'>
								<Badge badgeContent={4} color='secondary'>
									<MailIcon />
								</Badge>
							</IconButton>
							<IconButton aria-label='show 17 new notifications' color='inherit'>
								<Badge badgeContent={17} color='secondary'>
									<NotificationsIcon />
								</Badge>
							</IconButton>
						*/}
						<div className='menu-user' onClick={handleProfileMenuOpen}>
							<Typography className={classes.userName} variant='h6' noWrap>
								{user.name} {user.last_name}
							</Typography>
							<IconButton
								edge='end'
								aria-label='account of current user'
								aria-controls={menuId}
								aria-haspopup='true'
								color='inherit'>
								{user.name && <Avatar className={classes.avatarLetter}>{user.name.slice(0, 1)}</Avatar>}
							</IconButton>
						</div>
					</div>
					<div className={classes.sectionMobile}>
						<IconButton
							aria-label='show more'
							aria-controls={mobileMenuId}
							aria-haspopup='true'
							onClick={handleMobileMenuOpen}
							color='inherit'>
							<MoreIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
			<Drawer
				variant='permanent'
				className={classNames(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: classNames({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}>
				<div className={classes.toolbar}>
					<div className={classes.img}>
						<Link to={baseUrl} onClick={handleLogoClick}>
							<img className='logo-nav-milpagos' src={Milpago} alt='logo tranred' />
						</Link>
					</div>
					<IconButton onClick={handleDrawerClose} style={{ padding: 0 }}>
						{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</div>
				<Divider />
				<List>
					<ListItem button onClick={(event) => handleListItemClick(event, 0)}>
						<ListItemIcon classes={{ root: classes.icon }}>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary='Inicio' />
					</ListItem>
					{/*
					{open2 && (
						<ListItem button onClick={(event) => handleListItemClick(event, 2)}>
							<ListItemIcon>
								<InboxIcon />
							</ListItemIcon>
							<ListItemText primary='Prueba' />
						</ListItem>
					)}
					*/}

					<ListItem button onClick={(event) => handleListItemClick(event, 5)}>
						<ListItemIcon classes={{ root: classes.icon }}>
							<AssignmentIcon />
						</ListItemIcon>
						<ListItemText primary='Formulario de Act.' />
					</ListItem>
					<ListItem button onClick={(event) => handleListItemClick(event, 3)}>
						<Link to={urlAdmision}>
							<ListItemIcon classes={{ root: classes.icon }}>
								<PersonAdd />
							</ListItemIcon>
						</Link>
						<ListItemText primary='Admision' />
					</ListItem>
					<ListItem button onClick={(event) => handleListItemClick(event, 1)}>
						<Link to={urlAdministracion}>
							<ListItemIcon classes={{ root: classes.icon }}>
								<FolderIcon />
							</ListItemIcon>
						</Link>
						<ListItemText primary='Administracion' />
					</ListItem>
					<ListItem button onClick={(event) => handleListItemClick(event, 6)}>
						<Link to={urlCobr}>
							<ListItemIcon classes={{ root: classes.icon }}>
								<CreditCardIcon />
							</ListItemIcon>
						</Link>
						<ListItemText primary='Cobranza' />
					</ListItem>
				</List>
				<Divider />

				<List>
					<ListItem button key={'Gestion de Usuarios'} onClick={(event) => handleListItemClick(event, 4)}>
						<Link to={urlAdmision}>
							<ListItemIcon classes={{ root: classes.icon }}>
								<PeopleIcon />
							</ListItemIcon>
						</Link>
						<ListItemText primary={'Gestion de Usuarios'} />
					</ListItem>
				</List>
			</Drawer>
		</div>
	);
};

export default MainMenu;
