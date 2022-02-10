/* eslint-disable react-hooks/exhaustive-deps */
import CloseIcon from '@mui/icons-material/Close';
import Autocomplete from '@mui/lab/Autocomplete';
import {
	Avatar,
	Button,
	Checkbox,
	FormControlLabel,
	FormGroup,
	Grid,
	Paper,
	TextField,
	Theme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
	DataGrid,
	GridColDef,
	GridToolbarContainer,
	GridToolbarFilterButton,
	GridValueGetterParams,
} from '@mui/x-data-grid';
import classnames from 'classnames';
import { useLayoutEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from '../../config';
import './scss/index.scss';

interface GestionUsuariosProps {}

const columns: GridColDef[] = [
	{
		field: 'id',
		headerName: 'ID',
		width: 60,
		disableColumnMenu: true,
		sortable: false,
	},
	{
		field: 'email',
		headerName: 'Correo',
		width: 180,
		sortable: false,
		disableColumnMenu: true,
	},
	// {
	// 	field: 'name',
	// 	width: 120,
	// 	headerName: 'Nombre',
	// 	sortable: false,
	// 	disableColumnMenu: true,
	// },
	// {
	// 	field: 'last_name',
	// 	width: 120,
	// 	headerName: 'Apellido',
	// 	sortable: false,
	// 	disableColumnMenu: true,
	// },
	{
		field: 'fullName',
		headerName: 'Nombre Completo',
		// description: 'This column has a value getter and is not sortable.',
		sortable: false,
		width: 160,
		valueGetter: (params: GridValueGetterParams) => {
			return `${params.row.name || ''} ${params.row.last_name || ''}`;
		},
	},
];

const useStyles = makeStyles((styles: Theme) => ({
	layout: {
		padding: '0 1rem',
	},
	grid: {
		display: 'grid',
		gridTemplateColumns: '1fr 4fr',
		gridColumnGap: '1rem',
		marginBottom: '1rem',
	},
	tableTitle: {
		fontSize: 32,
		fontWeight: 'bold',
		padding: '0 8px',
	},
	text: {
		fontSize: 28,
		padding: '0 8px',
	},
	closeBtn: {
		width: 40,
		height: 40,
		position: 'absolute',
		top: 0,
		right: 0,
		padding: 0,
		minWidth: 'unset',
		borderRadius: '50%',
	},
	img: {
		width: 170,
		height: 170,
		alignSelf: 'center',
		'& div': {
			width: '100%',
			height: '100%',
			borderRadius: '50%',
			objectFit: 'cover',
		},
	},
	buttonSave: {
		background: styles.palette.primary.main,
		color: styles.palette.primary.contrastText,
		position: 'absolute',
		bottom: 8,
		right: 16,
		'&:hover': {
			background: styles.palette.primary.light,
		},
	},
	form: {
		padding: 0,
		display: 'flex',
		flexDirection: 'column',
		marginBottom: 0,
	},
	row: {
		display: 'flex',
		justifyContent: 'space-between',
		margin: '16px 0',
	},
	column: {
		flexDirection: 'column',
	},
	cardTitles: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	avatarLetter: {
		textTransform: 'uppercase',
		backgroundColor: styles.palette.primary.light,
		fontSize: 56,
	},
	card: {
		alignItems: 'center',
		padding: '2rem',
		position: 'relative',
	},
	inputText: {
		width: '100%',
	},
	textFields: {
		width: '100%',
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		gridRowGap: 8,
		gridColumnGap: 8,
	},
	blockedButton: {
		fontWeight: 'bold',
	},
	blockedButtonOn: {
		backgroundColor: styles.palette.success.main,
		color: styles.palette.secondary.contrastText,
		'&:hover': {
			backgroundColor: `${styles.palette.success.light} !important`,
		},
	},
	blockedButtonOff: {
		backgroundColor: styles.palette.error.main,
		color: styles.palette.secondary.contrastText,
		'&:hover': {
			backgroundColor: `${styles.palette.error.light} !important`,
		},
	},
}));

const GestionUsuarios: React.FC<GestionUsuariosProps> = () => {
	const classes = useStyles();

	const [allUserRoles, setAllUserRoles] = useState<any[]>([]);
	const [userBlocked, setUserBlocked] = useState<boolean>(false);
	const [openUserView, setUserView] = useState<boolean>();
	const [department, setDepartment] = useState<any[]>([
		{ id: 0, name: 'Admision' },
		{ id: 1, name: 'Administracion' },
	]);
	// const [loading, setLoading] = useState<boolean>(true);
	const [userRol, setUserRol] = useState<any[]>([]);
	const [userDep, setUserDep] = useState<any>(null);
	const [allUser, setUsers] = useState<any[]>([]);
	const [userID, setUserID] = useState<number>(0);
	const [email, setEmail] = useState<string>('');
	const [lname, setLName] = useState<string>('');
	const [name, setName] = useState<string>('');

	const customToolbar: () => JSX.Element = () => {
		return (
			<GridToolbarContainer className='m-main-justify m-px-2'>
				<div className={classes.tableTitle}>Usuarios</div>
				<GridToolbarFilterButton className='m-px-1' />
			</GridToolbarContainer>
		);
	};

	useLayoutEffect(() => {
		const getData = async () => {
			try {
				await axios.get('/roles/all').then((data: any) => {
					setAllUserRoles(data.data.info);
				});
				await axios.get('/department/all').then((data: any) => {
					setDepartment(data.data.info);
				});
				await axios.get('worker/all').then((data: any) => {
					setUsers(data.data.info);
				});
			} catch (error) {}
		};

		getData();
	}, []);

	const handleCloseRow = (event: any) => {
		setUserView(false);
	};

	const handleRow = (event: any) => {
		getuserRol(event.row.id);
		setUserView(true);
	};

	// const handleInputChanges: React.ChangeEventHandler<HTMLInputElement> = (e) => {
	// 	e.preventDefault();
	// 	switch (e.target.id) {
	// 		case 'email':
	// 			setEmail(e.target.value);
	// 			break;
	// 		case 'name':
	// 			setName(e.target.value);
	// 			break;
	// 		default:
	// 			break;
	// 	}
	// };

	const isInUserRol = (id: number) => {
		let ret = false;
		userRol.map((val) => {
			if (val.id === id) {
				ret = true;
			}
			return val;
		});
		return ret;
	};

	const updateCB = (array: any[], item: any, value: boolean) => {
		const index: number = array.findIndex((i: any) => i.name === item);
		if (index !== -1) {
			array[index].valid = value;
			return array;
		} else {
			return array;
		}
	};

	const getuserRol = async (id: number) => {
		try {
			const resp = await axios.get(`/worker/${id}`);
			const data = resp.data.info;
			setUserBlocked(data.block === 0 ? false : true);
			setLName(data.last_name);
			setUserRol(data.roles);
			setEmail(data.email);
			setUserDep(data.id_department);
			setUserID(data.id);
			setName(data.name);
		} catch (error) {
			console.log('error getuserRol', error);
		}
	};

	const handleSelect = (event: any, value: any, item: string) => {
		switch (item) {
			case 'department':
				setUserDep(value);
				break;
			default:
				break;
		}
	};

	const handleCheckbox = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const id = parseInt(event.target.id, 10);
		setAllUserRoles((prev) => {
			return updateCB(prev, event.target.name, event.target.checked);
		});
		switch (event.target.checked) {
			case true:
				setUserRol((prev) => {
					const index: number = prev.findIndex((i: any) => i.id === id);
					if (index === -1) {
						return [...prev, { id: id, name: event.target.name }];
					}
					return prev;
				});
				break;
			default:
				setUserRol((prev) => {
					return prev.filter((rol) => id !== rol.id);
				});
				break;
		}
	};

	const handleSaveData = () => {
		Swal.fire({
			title: '¿Estas seguro de realizar estos cambios?',
			showDenyButton: true,
			confirmButtonText: 'Si',
			denyButtonText: 'No',
			customClass: {
				actions: 'my-actions',
				confirmButton: 'order-2',
				denyButton: 'order-3',
			},
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					await axios.put(`/worker/${userID}`, {
						roles: userRol,
						id_department: userDep?.id,
						block: userBlocked ? 1 : 0,
					});
					Swal.fire('Cambios Guardados', '', 'success');
				} catch (error) {
					Swal.fire('Hubo un error guardando sus cambios', '', 'info');
				}
			} else if (result.isDenied) {
				// Swal.fire('Changes are not saved', '', 'info');
			}
		});
	};
	return (
		<>
			<Grid container spacing={4} className={classes.layout}>
				<Grid item xs={5}>
					<div style={{ height: '80vh', width: '100%' }}>
						{
							// loading &&
							<DataGrid
								components={{
									Toolbar: customToolbar,
								}}
								rows={allUser}
								columns={columns}
								rowsPerPageOptions={[25, 100]}
								onCellClick={handleRow}
							/>
						}
					</div>
				</Grid>
				<Grid item xs={7}>
					{openUserView && (
						<Paper variant='outlined' elevation={3}>
							<div className={classes.card}>
								<Button className={classes.closeBtn} onClick={handleCloseRow}>
									<CloseIcon />
								</Button>
								<form className={classes.form}>
									<div className={classes.grid}>
										<div className={classes.img}>
											<Avatar className={classes.avatarLetter}>{`${name.slice(0, 1)}${lname.slice(0, 1)}`}</Avatar>
										</div>
										<div>
											<div className={classes.textFields}>
												<TextField
													disabled
													id='email'
													name='email'
													label='Correo'
													variant='outlined'
													type='email'
													value={email}
													// onChange={handleInputChanges}
													key={0}
												/>
												<TextField
													disabled
													key={1}
													id='name'
													name='name'
													label='Nombre Completo'
													variant='outlined'
													type='text'
													value={name + ' ' + lname}
													// onChange={handleInputChanges}
												/>
												<Autocomplete
													className={classes.inputText}
													onChange={(event, value) => handleSelect(event, value, 'department')}
													value={userDep}
													options={department}
													getOptionLabel={(option: any) => (option.name ? option.name : '')}
													// getOptionSelected={(option, value) => value.id === option.id}}
													renderInput={(params: any) => (
														<TextField {...params} name='department' label='Departamento' variant='outlined' />
													)}
												/>
												<Button
													onClick={() => setUserBlocked(!userBlocked)}
													className={classnames(classes.blockedButton, {
														[classes.blockedButtonOff]: !userBlocked,
														[classes.blockedButtonOn]: userBlocked,
													})}>
													{userBlocked ? `Desbloquear` : `Bloquear`}
												</Button>
											</div>
											<div className={classnames(classes.row, classes.column)}>
												<div className={classes.cardTitles}>Permisos</div>
												<FormGroup>
													<Grid container>
														{allUserRoles.map((rol, i) => {
															return (
																<Grid item xs={3} key={`${i}`}>
																	<FormControlLabel
																		label={rol.name}
																		control={
																			<Checkbox
																				id={`${rol.id}`}
																				checked={isInUserRol(rol.id)}
																				onChange={handleCheckbox}
																				name={rol.name}
																				color={'primary'}
																				inputProps={{ 'aria-label': 'primary checkbox' }}
																			/>
																		}
																	/>
																</Grid>
															);
														})}
													</Grid>
												</FormGroup>
											</div>
										</div>
									</div>
									<Button className={classes.buttonSave} onClick={handleSaveData}>
										Guardar
									</Button>
								</form>
							</div>
						</Paper>
					)}
				</Grid>
			</Grid>
		</>
	);
};

export default GestionUsuarios;
