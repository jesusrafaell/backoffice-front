import FormControlLabel from '@material-ui/core/FormControlLabel';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import React from 'react';
// @ts-expect-error
import ReactImageZoom from 'react-image-zoom';
//Redux
import { useSelector } from 'react-redux';
//Url
import { PortFiles, URL } from '../../config';
import { RootState } from '../../store/store';
//import luffy from '../../img/itachi2.png';
// import luffy from '../../img/obama.jpg';
import './pasos.scss';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& > *': {
				margin: theme.spacing(1),
				width: '25ch',
				// height: '10px',
			},
		},
	})
);

export default function PasoTres() {
	const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);

	const classes = useStyles();
	const [state, setState] = React.useState({
		checkedA: false,
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};

	const props = {
		zoomPosition: 'original',
		height: 350,
		width: 450,
		img: `${URL}:${PortFiles}/${fm.rc_account_number.path}`,
	};

	return (
		<>
			<form className={classes.root} noValidate autoComplete='off'>
				<TextField
					className='btn_step btn_medio'
					id='outlined-basic '
					label='Numero de Cuenta'
					variant='outlined'
				/>
				<FormControlLabel
					control={<Switch checked={state.checkedA} onChange={handleChange} name='checkedA' color='primary' />}
					label='Correcto'
				/>
			</form>
			<div className='img_container'>
				<ReactImageZoom {...props} />
			</div>
		</>
	);
}
