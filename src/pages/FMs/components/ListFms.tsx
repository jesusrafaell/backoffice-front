import {
	DataGrid,
	GridCellParams,
	GridColDef,
	GridSortModel,
	GridToolbarContainer,
	GridToolbarFilterButton,
	GridValueGetterParams,
} from '@mui/x-data-grid';
import { DateTime } from 'luxon';
import { FC, useState } from 'react';
import Swal from 'sweetalert2';
import { useStyles } from 'pages/Terminales/styles';
import FM from './FM';
import { getFM } from 'utils/getFm';
import { handleLoadingSearch } from 'utils/handleSwal';
import FullModal from 'components/modals/FullModal';
import { FMContextDataProvider } from 'context/FM/FMContextData';

interface Props {
	listFms: any;
}

const ListSolicitudes: FC<Props> = ({ listFms }) => {
	const classes = useStyles();

	const customToolbar: () => JSX.Element = () => {
		return (
			<GridToolbarContainer className='m-main-justify m-px-2'>
				<GridToolbarFilterButton className='m-px-1' />
			</GridToolbarContainer>
		);
	};
	const [idFM, setIdFM] = useState<number>(0);
	const [solic, setSolic] = useState<any>(null);

	const [sortModel, setSortModel] = useState<GridSortModel>([
		{
			field: 'id',
			sort: 'asc',
		},
	]);

	console.log('list', listFms);

	const columns: GridColDef[] = [
		{
			field: 'id',
			headerName: 'N',
			hide: true,
			disableColumnMenu: true,
		},
		{ field: 'code', headerName: 'Code', type: 'string', width: 150, editable: false },
		{
			field: `id_commerce['name']`,
			headerName: 'Nombre Comercio',
			type: 'string',
			width: 200,
			editable: false,
			valueGetter: (params: GridValueGetterParams) => params.row.id_commerce.name,
		},
		{
			field: `id_commerce['ident_num']`,
			headerName: 'Rif',
			type: 'string',
			width: 200,
			editable: false,
			valueGetter: (params: GridValueGetterParams) =>
				params.row.id_commerce.id_ident_type.name + params.row.id_commerce.ident_num,
		},
		{
			field: `id_client['name']`,
			headerName: 'Cliente',
			type: 'string',
			width: 200,
			editable: false,
			valueGetter: (params: GridValueGetterParams) => params.row.id_client.name,
		},
		{
			field: `id_client['ident_num']`,
			headerName: 'Doc. Ident',
			type: 'string',
			width: 180,
			editable: false,
			valueGetter: (params: GridValueGetterParams) =>
				params.row.id_client.id_ident_type.name + params.row.id_client.ident_num,
		},
		{
			field: 'createdAt',
			headerName: 'Fecha de Actualizacion',
			width: 170,
			sortable: false,
			valueGetter: (params: GridValueGetterParams) => {
				if (params.row.createdAt) {
					return DateTime.fromISO(params.row?.createdAt.toString()).toFormat('dd/LL/yyyy').toLocaleString().trim();
				} else {
					return 'No tiene fecha';
				}
			},
		},
	];

	console.log('d', listFms);

	const DoubleClickTable = async (params: GridCellParams) => {
		//swal validar open
		setIdFM(params.row.id);
		handleLoadingSearch();
		const data: any = await getFM(params.row.id);
		if (data.ok) {
			setSolic(data.fm);
			setModelOpen(true);
		} else {
			Swal.close();
			setIdFM(0);
			setSolic(null);
			handleClose();
		}
	};

	console.log('solic', solic);

	const [modalOpen, setModelOpen] = useState(true);

	const handleClose = () => {
		//setId(0);
		//setFm(null);
		setModelOpen(false);
	};

	return (
		<div className={classes.terminales}>
			<div style={{ height: 500 }}>
				<DataGrid
					components={{
						Toolbar: customToolbar,
					}}
					columns={columns}
					//getRowId={getRowId}
					sortingOrder={['desc', 'asc']}
					sortModel={sortModel}
					onSortModelChange={(model) => setSortModel(model)}
					rows={listFms}
					rowsPerPageOptions={[25, 50, 100]}
					onCellDoubleClick={DoubleClickTable}
				/>
			</div>
			{idFM ? (
				<FullModal modalOpen={modalOpen} handleClose={handleClose}>
					<FMContextDataProvider fm={solic}>
						<FM />
					</FMContextDataProvider>
				</FullModal>
			) : null}
		</div>
	);
};

export default ListSolicitudes;
