import { Button, makeStyles, Paper, Theme } from '@material-ui/core';
import {
	DataGrid,
	GridColDef,
	GridRowParams,
	GridToolbarContainer,
	GridToolbarFilterButton,
	GridValueGetterParams,
} from '@material-ui/data-grid';
import CloseIcon from '@material-ui/icons/Close';
import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { getDataFMAdministration } from '../store/actions/administration';

interface AdministracionProp {}

const useStyles = makeStyles((theme: Theme) => ({
	administracion: {
		flexGrow: 1,
		display: 'grid',
		gridColumnGap: '2rem',
		gridTemplateColumns: '1fr 1fr',
	},
	button: {
		width: 200,
		height: 70,
		background: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
	},
	dataGrid: {
		width: '100%',
		height: '75vh',
	},
	tableTitle: {
		fontSize: 32,
		fontWeight: 'bold',
		padding: '0 8px',
	},
	view: {
		width: '100%',
		padding: '1rem',
		// height: '75vh',
		position: 'relative',
	},
	closeBtn: {
		width: 40,
		height: 40,
		position: 'absolute',
		top: 16,
		right: 16,
		padding: 0,
		minWidth: 'unset',
		borderRadius: 20,
	},
	red: {
		backgroundColor: theme.palette.error.main,
		color: theme.palette.secondary.contrastText,
		'&:hover': {
			backgroundColor: `${theme.palette.error.light} !important`,
		},
	},
	yellow: {
		backgroundColor: theme.palette.warning.main,
		color: theme.palette.secondary.contrastText,
		'&:hover': {
			backgroundColor: `${theme.palette.warning.light} !important`,
		},
	},
	green: {
		backgroundColor: theme.palette.success.main,
		color: theme.palette.secondary.contrastText,
		'&:hover': {
			backgroundColor: `${theme.palette.success.light} !important`,
		},
	},
}));

const Administracion: FC<AdministracionProp> = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const administration: any = useSelector((state: RootState) => state.administration);

	const [selected, setSelected] = useState(false);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [rowSelected, setRowSelect] = useState({ id: null, name: '' });
	const d = new Date();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	//
	const [rowsAd, setRowsAd] = useState([]);

	const [rows, setRows] = useState([
		{
			id: 1,
			name: 'Armando',
			lastname: 'Rivas',
			fecha: d.getDay() + '/' + d.getMonth() + '/' + d.getFullYear(),
		},
		{
			id: 2,
			name: 'Jesus',
			lastname: 'Creador',
			fecha: d.getDay() - 1 + '/' + d.getMonth() + '/' + d.getFullYear(),
		},
	]);


	useEffect(() => {
		dispatch(getDataFMAdministration());
		// console.log('rowSelected', rowSelected);
	}, []);

	useEffect(() => {
		setRowsAd(administration.fmAd)
	}, [administration])

	const customToolbar: () => JSX.Element = () => {
		return (
			<GridToolbarContainer className='m-main-justify m-px-2'>
				<div className={classes.tableTitle}>Formularios</div>
				<GridToolbarFilterButton className='m-px-1' />
			</GridToolbarContainer>
		);
	};

	const columns: GridColDef[] = [
		{
			field: 'id_request',
			headerName: 'ID',
			width: 120,
			editable: false,
			sortable: false,
			valueFormatter: (value) => {
				return value.row?.id_request.id;
			},
		},
		{
			field: 'id_payment_method',
			headerName: 'Metodo de Pago',
			width: 200,
			valueFormatter: (value) => {
				return value.row?.id_request.id_payment_method.name;
			},
			sortable: false,
		},
		/*
		{
			field: 'fullname',
			headerName: 'Nombre',
			width: 120,
			valueGetter: (params: GridValueGetterParams) =>
				`${params.getValue(params.id, 'name') || ''} ${params.getValue(params.id, 'lastname') || ''}`,
			disableColumnMenu: true,
			sortable: false,
		},
		{
			field: 'fecha',
			headerName: 'Fecha',
			width: 120,
			disableColumnMenu: true,
			sortable: false,
		},
		 */
	];

	const handleRow = (event: any) => {
		setRowSelect((prev): any => rows.find((value) => value.id === event.row.id));
		setSelected(true);
	};

	const handleCloseRow = (event: any) => {
		setSelected(false);
	};

	return (
		<>
			<div className={classes.administracion}>
				{!rowsAd.length ?
					<h1>loading...</h1>
				:
					<DataGrid
						onCellClick={handleRow}
						components={{
							Toolbar: customToolbar,
						}}
						rows={rowsAd}
						columns={columns}
						rowsPerPageOptions={[25, 100]}
						className={classes.dataGrid}
						getRowClassName={(params: GridRowParams) =>
							classNames({
								[classes.red]: false,
								[classes.yellow]: false,
								[classes.green]: false,
							})
						}
					/>
				}
				{selected && (
					<>
						<Paper variant='outlined' elevation={3} className={classes.view}>
							<div className={classes.tableTitle}>Formularios</div>
							<Button className={classes.closeBtn} onClick={handleCloseRow}>
								<CloseIcon />
							</Button>
						</Paper>
					</>
				)}
			</div>
		</>
	);
};

export default Administracion;