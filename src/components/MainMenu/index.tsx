import { default as AccountCircle } from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import FolderIcon from '@mui/icons-material/Folder';
import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
//import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
//import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/PeopleAlt';
import PersonAdd from '@mui/icons-material/PersonAdd';
import {
	AppBar,
	Avatar,
	//Badge,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
	useTheme,
} from '@mui/material';
// import WorkIcon from '@mui/icons-material/Work';
import classNames from 'classnames';
import Milpago from 'img/1000pagos_LogoBlue.png';
import { FC, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { ApprouterContext } from 'routers/AppRouter';
//Redux
import {
	urlPrivate,
	baseUrl,
	urlAdministracion,
	urlAdmision,
	urlCobr,
	urlFM,
	urlLogin,
	urlSeguridad,
	urlUpdateCommerce,
	urlTerminales,
	urlSolicitudes,
} from 'routers/url';
import { startLogout } from 'store/actions/auth/auth';
import { FinishLoading } from 'store/actions/ui';
import { RootState } from 'store/store';
import './index.scss';
import useStyles from './styles';

const MainMenu: FC = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const classes = useStyles();
	const theme = useTheme();

	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>();
	/*
	const [fm, setFm] = useState(false);
	const [administracion, setAdministracion] = useState(false);
	const [seguridad, setSeguridad] = useState(false);
	const [admision, setAdmision] = useState(false);
	const [cobranza, setCobranza] = useState(false);
	const [updateCommerce, setUpdateCommerce] = useState(false);
	const [terminales, setTerminales] = useState(false);
	*/
	const { menu } = useContext(ApprouterContext);
	const [open, setOpen] = useState(false); //Nav Left
	const [user, setUser] = useState({
		name: '',
		last_name: '',
	});

	const userDB: any = useSelector((state: RootState) => state.auth.user);

	useEffect(() => {
		if (userDB) {
			setUser(userDB.data);
		}
		//setSection('1000Pagos C.A.');
		const ruta: any = urlPrivate.find((root: any) => history.location.pathname === root);
		if (!ruta) history.push(baseUrl);
	}, [userDB, menu, history]);

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
		dispatch(startLogout());
		dispatch(FinishLoading());
		history.push(urlLogin);
	};

	const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, url: string) => {
		//dispatch(refreshLogin());
		//console.log('aquiero ir a ', url);
		history.push(url);
		handleDrawerClose();
	};

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		//console.log('close');
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
			{/*
			<MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
			<MenuItem onClick={handleMenuClose}>Mi Cuenta</MenuItem>
				*/}
			<MenuItem onClick={handleMenuLogout}>Cerrar sesi??n</MenuItem>
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
			{/*
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
			 */}
			<MenuItem onClick={handleMenuLogout}>
				<IconButton
					style={{ paddingTop: 0 }}
					aria-label='account of current user'
					aria-controls='primary-search-account-menu'
					aria-haspopup='true'
					color='inherit'>
					<AccountCircle />
				</IconButton>
				<p>Cerrar sesi??n</p>
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
						1000Pagos C.A.
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
					<ListItem button onClick={(event) => handleListItemClick(event, baseUrl)}>
						<ListItemIcon classes={{ root: classes.icon }}>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary='Inicio' />
					</ListItem>
					{menu['solicitudes'] && (
						<ListItem button onClick={(event) => handleListItemClick(event, urlSolicitudes)}>
							<ListItemIcon classes={{ root: classes.icon }}>
								<FormatListBulletedIcon />
							</ListItemIcon>
							<ListItemText primary='Lista de Solicitudes' />
						</ListItem>
					)}
					{menu['solicitud'] && (
						<ListItem button onClick={(event) => handleListItemClick(event, urlFM)}>
							<ListItemIcon classes={{ root: classes.icon }}>
								<AssignmentIcon />
							</ListItemIcon>
							<ListItemText primary='Formulario de Act.' />
						</ListItem>
					)}
					{menu['admision'] && (
						<ListItem button onClick={(event) => handleListItemClick(event, urlAdmision)}>
							<ListItemIcon classes={{ root: classes.icon }}>
								<PersonAdd />
							</ListItemIcon>
							<ListItemText primary='Admision' />
						</ListItem>
					)}
					{menu['administracion'] && (
						<ListItem button onClick={(event) => handleListItemClick(event, urlAdministracion)}>
							<ListItemIcon classes={{ root: classes.icon }}>
								<FolderIcon />
							</ListItemIcon>
							<ListItemText primary='Administracion' />
						</ListItem>
					)}
					{menu['cobranza'] && (
						<ListItem button onClick={(event) => handleListItemClick(event, urlCobr)}>
							<ListItemIcon classes={{ root: classes.icon }}>
								<CreditCardIcon />
							</ListItemIcon>
							<ListItemText primary='Cobranza' />
						</ListItem>
					)}
					{menu['editar_commerce'] && (
						<ListItem button onClick={(event) => handleListItemClick(event, urlUpdateCommerce)}>
							<ListItemIcon classes={{ root: classes.icon }}>
								<SettingsSuggestIcon />
							</ListItemIcon>
							<ListItemText primary='Actualizar Informacion' />
						</ListItem>
					)}
					{menu['terminales'] && (
						<ListItem button onClick={(event) => handleListItemClick(event, urlTerminales)}>
							<ListItemIcon classes={{ root: classes.icon }}>
								<EditIcon />
							</ListItemIcon>
							<ListItemText primary='Actualizar Informacion' />
						</ListItem>
					)}
				</List>
				<Divider />
				<List>
					{menu['seguridad'] && (
						<ListItem
							button
							key={'Gestion de Usuarios'}
							onClick={(event) => handleListItemClick(event, urlSeguridad)}>
							<ListItemIcon classes={{ root: classes.icon }}>
								<PeopleIcon />
							</ListItemIcon>
							<ListItemText primary={'Gestion de Seguridad'} />
						</ListItem>
					)}
				</List>
			</Drawer>
		</div>
	);
};

export default MainMenu;
