/* eslint-disable react-hooks/exhaustive-deps */
import AddIcon from '@mui/icons-material/Add';
import LowPriority from '@mui/icons-material/LowPrioritySharp';
import { Fab, Button } from '@mui/material';
import classNames from 'classnames';
//Context
import { DataListAdmisionProvider } from 'context/DataList/DatalistAdmisionContext';
import { SocketContext } from 'context/SocketContext';
import { FC, useContext, useEffect, useLayoutEffect, useState } from 'react';
//
import { useDispatch, useSelector } from 'react-redux';
//import { getDataFM } from 'store/actions/admisionFm';
import { OpenModal } from 'store/actions/ui';
import Swal from 'sweetalert2';
import { handleLoadingSearch } from 'utils/handleSwal';
import Barra from '../../components/diagramas/Barra';
import Dona from '../../components/diagramas/Dona';
import Comprobacion from './components/validation';
import Diferidos from './components/diferido';
import moverSolic from './components/moverSolic';
import { useStyles } from './styles/styles';
import './scss/index.scss';

interface AdmisionInt {
	isWorker: boolean;
}

const Admision: FC<AdmisionInt> = ({ isWorker = false }) => {
	const { user } = useSelector((state: any) => state.auth);
	const { permiss }: any = user;
	const dispatch = useDispatch();
	const classes = useStyles();

	const { modalOpen } = useSelector((state: any) => state.ui);

	const [fm, setFm] = useState(null);
	const [idFM, setIdFm] = useState(0);

	const { socket } = useContext(SocketContext);

	const [valuesChart, setvaluesChart] = useState<number[]>([]);
	const [keyChart, setkeyChart] = useState<string[]>([]);
	const [chartData, setChartData] = useState({});
	const [todos, setTodo] = useState<any>([]);
	const [todostodos, setTodoTodos] = useState<any>({});
	const { solicitudesTrabajando, diferidosTranbajando, diferidos } = todos;
	const { allSolic, allTerm } = todostodos;

	const [selectModal, setSelectModal] = useState<boolean>(false);

	useLayoutEffect(() => {
		//Este solo se debe ejecutar para obtener la data tras ver el fm
		socket.emit('cliente:dashdata', (data: any) => {
			setChartData(data);
			setTodo(data);
		});
		socket.emit('cliente:todo', (todo: any) => {
			setTodoTodos(todo);
		});
	}, []);

	useEffect(() => {
		socket.on('server:dashdata', (data: any) => {
			//console.log(data);
			setChartData(data);
			setTodo(data);
		});

		socket.on('server:todos', (todo: any) => {
			setTodoTodos(todo);
		});
	}, [socket, user]);

	const handleClick = () => {
		setFm(null);
		if (!selectModal && !fm) {
			handleLoadingSearch();
			setSelectModal(true);
			socket.emit('client:atrabajar', user.data);
			//
			socket.on('server:atrabajar', (data: any) => {
				if (data.code === 400) {
					setSelectModal(false);
					Swal.fire({
						icon: 'warning',
						title: 'No hay Formularios en espera',
						customClass: { container: 'swal2-validated' },
						showConfirmButton: false,
						timer: 2500,
					});
					return;
				}
				//console.log(typeof data === 'number');
				//if (typeof data === 'number') {
				if (data.id) {
					//console.log('idFM', data);
					setIdFm(data.id);
					return;
				}
				if (data?.status === true) {
					Swal.fire({
						icon: 'warning',
						title: 'Ya tienes una Solicitud',
						customClass: { container: 'swal2-validated' },
						showConfirmButton: false,
						timer: 3500,
					});
					setSelectModal(false);
				} else {
					if (data.length === 0) {
						setSelectModal(false);
						Swal.fire({
							icon: 'warning',
							title: 'No hay Formularios en espera',
							customClass: { container: 'swal2-validated' },
							showConfirmButton: false,
							timer: 2500,
						});
					}
				}
			});
		}
	};

	useEffect(() => {
		if (fm && !modalOpen) {
			dispatch(OpenModal());
		}
		if (!fm) {
			setSelectModal(false);
			/*
			setTimeout(() => {
			}, 2500);
			*/
		}
	}, [fm, modalOpen]);

	const handleClickList = async () => {
		//dispatch(OpenModalListSolic());
		await moverSolic(socket, user.data, setIdFm);
	};

	const handleUpdateChart = (chartData: any) => {
		const col = Object.keys(chartData!);
		let valores: any = [];
		Object.values(chartData).forEach((val, i) => {
			valores[i] = val;
		});
		setvaluesChart(valores);
		setkeyChart(col);
	};

	useEffect(() => {
		if (Object.keys(chartData).length) {
			handleUpdateChart(chartData);
		}
	}, [chartData]);

	return (
		<DataListAdmisionProvider>
			<div className={classes.admision}>
				<div className={classes.dataGrid}>
					<Diferidos />
				</div>
				<div className={classes.rightContainer}>
					<div className={classes.row}>
						<div className={classes.counters}>
							<div className={classes.status}>
								<div className={classes.statusTitle}>En Espera:</div>
								<div className={classes.statusDesc}> {allSolic || 0} </div>
							</div>
							<div className={classNames(classes.status, classes.borderLeft)}>
								<div className={classes.statusTitle}>En Proceso:</div>
								<div className={classes.statusDesc}>{solicitudesTrabajando + diferidosTranbajando || 0}</div>
							</div>
							<div className={classNames(classes.status, classes.borderTop)}>
								<div className={classes.statusTitle}>Diferidos:</div>
								<div className={classes.statusDesc}>{diferidos || 0}</div>
							</div>
							<div className={classNames(classes.status, classes.borderTop, classes.borderLeft)}>
								<div className={classes.statusTitle}>Terminadas:</div>
								<div className={classes.statusDesc}>{allTerm || 0}</div>
							</div>
						</div>
						<div style={{ width: '45%' }}>
							{/* <ChartTorta /> */}
							<Dona chartData={valuesChart} colsData={keyChart} />
						</div>
					</div>
					<div className={classes.row}>
						<Barra chartData={valuesChart} colsData={keyChart} />
					</div>
				</div>
				{allSolic && permiss['Validacion FM'] ? (
					<Button
						variant='contained'
						sx={{
							position: 'absolute',
							borderRadius: '1rem',
							padding: '10px',
							right: '2rem',
							bottom: '1rem',
						}}
						disabled={selectModal}
						onClick={handleClick}>
						<span style={{ textTransform: 'none', fontSize: 15 }}>Validar Solicitud</span>
						<AddIcon />
					</Button>
				) : null}
				{permiss['Mover FM'] ? (
					<div className='cmn2-divfloat'>
						<Fab color='secondary' aria-label='add' size='large' variant='extended' onClick={handleClickList}>
							<LowPriority />
						</Fab>
					</div>
				) : null}
				{idFM ? <Comprobacion fm={fm} setFm={setFm} id={idFM} setId={setIdFm} /> : null}
			</div>
		</DataListAdmisionProvider>
	);
};

export default Admision;
