import { Bar, Doughnut } from 'react-chartjs-2';
import './diagramas.scss';

const state = {
	labels: ['Espera', 'Proceso', 'Terminadas'],
	datasets: [
		{
			label: 'Barra',
			axis: 'x',

			backgroundColor: [
				'rgba(20, 17, 152, 0.4)',
				'rgba(238, 99, 82, 0.4)',
				'rgba(63, 167, 214, 0.4)',
				'rgba(248, 249, 72, 0.4)',
				'rgba(95, 72, 66, 0.4)',
				'rgba(240, 162, 2, 0.4)',
				'rgba(247, 157, 132, 0.4)',
			],
			borderColor: [
				'rgb(20, 17, 152)',
				'rgb(238, 99, 82)',
				'rgb(63, 167, 214)',
				'rgb(248, 249, 72)',
				'rgb(95, 72, 66)',
				'rgb(153, 102, 255)',
				'rgb(247, 157, 132)',
			],
			borderWidth: 1,
			data: [10, 3, 32],
		},
	],
};

export const ChartBarra = (data) => {
	return (
		<Bar
			data={data ? data : state}
			className='canvas_prueba'
			options={{
				indexAxis: 'y',
				title: {
					display: true,
					text: 'Average Solic',
					fontSize: 2,
				},
				legend: {
					display: true,
					position: 'right',
				},
			}}
			width={'100%'}
			height={'35vh'}
		/>
	);
};

export const ChartTorta = (data) => {
	return (
		<Doughnut
			data={data ? data : state}
			className='canvas_prueba'
			options={{
				title: {
					display: true,
					text: 'Average Rainfall per month',
					fontSize: 2,
				},
			}}
			height={230}
			width={230}
		/>
	);
};
