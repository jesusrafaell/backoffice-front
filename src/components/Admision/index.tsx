import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SocketContext } from '../../context/SocketContext';
import { getDataFM } from '../../store/actions/admisionFm';
import { OpenModal } from '../../store/actions/ui';
import Barra from '../diagramas/Barra';
import { ChartTorta } from '../diagramas/ChartConfig';
import Comprobacion from './comprobacion';
import Diferidos from './diferidos';
import './scss/index.scss';
import { useStyles } from './styles/styles';

const Admision: React.FC = () => {
	const dispatch = useDispatch();
	const classes = useStyles();

	const { modalOpen } = useSelector((state: any) => state.ui);
	const { user } = useSelector((state: any) => state.auth);
	const { socket } = useContext(SocketContext);

	const [valuesChart, setvaluesChart] = useState<number[]>([]);
	const [keyChart, setkeyChart] = useState<string[]>([]);
	const [chartData, setChartData] = useState({});
	const [todos, setTodo] = useState<any>([]);
	const [todostodos, setTodoTodos] = useState<any>([]);
	const { solictudesTrabajando, diferidosTranbajando } = todos;
	const { allSolic, allTerm, diferidos } = todostodos;

	useEffect(() => {
		socket.emit('cliente:Todos', user, (todo: any) => {
			setTodoTodos(todo);
		});

		socket.emit('cliente:dashdata', user, (data: any) => {
			if (Object.keys(data).length) {
				// console.log('save 1', data);
				setChartData(data);
				setTodo(data);
			}
		});

		socket.on('server:dashdata', (data: any) => {
			if (Object.keys(data).length) {
				// console.log('save 2', data);
				setChartData(data);
				setTodo(data);
			}
		});
	}, [socket, user]);

	const handleClick = () => {
		socket.emit('cliente:Todos', user, (todo: any) => {
			setTodoTodos(todo);
		});

		dispatch(OpenModal());

		socket.emit('Trabanjando_Solic', user, (solic: any) => {
			dispatch(getDataFM(solic));
		});

		socket.emit('cliente:dashdatasiempre');
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
							<div className={classes.statusDesc}>{solictudesTrabajando + diferidosTranbajando || 0}</div>
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

					<div style={{ width: '40%' }}>
						<ChartTorta />
						{/* <Dona chartData={valuesChart} colsData={keyChart} /> */}
					</div>
				</div>
				<div className={classes.row}>
					<Barra chartData={valuesChart} colsData={keyChart} />
				</div>
			</div>
			<div className='cmn-divfloat'>
				<Fab color='primary' aria-label='add' size='medium' variant='extended' onClick={handleClick}>
					Validar Planilla
					<AddIcon />
				</Fab>
				{modalOpen && <Comprobacion />}
			</div>
		</div>
	);
};

export default Admision;
