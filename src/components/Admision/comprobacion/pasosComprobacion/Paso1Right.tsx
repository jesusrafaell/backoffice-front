import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Swal from 'sweetalert2';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import React, { useEffect } from 'react';
// @ts-expect-error
import ReactImageZoom from 'react-image-zoom';
import { useDispatch, useSelector } from 'react-redux';
//Url
import { PortFiles, URL } from '../../../../config';
import { Valid } from '../../../../store/actions/accept';
import { RootState } from '../../../../store/store';
import './styles/pasos.scss';
import { useStyles } from './styles/styles';

export default function Paso1Right() {
	const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);
	const rc_rif: any = useSelector((state: RootState) => state.acceptance.validado.rc_rif);

	const dispatch = useDispatch();

	const classes = useStyles();
	const [state, setState] = React.useState(rc_rif);

	//const [text,setText] = React.useState('')
	useEffect(() => {
		dispatch(Valid({ rc_rif: state }));
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({ 
			...state, 
			[event.target.name]: event.target.checked,
		});
	};

	const props = {
		zoomPosition: 'original',
		height: 350,
		width: 450,
		img: `${URL}:${PortFiles}/${fm.path_rc_rif}`,
	};

	return (
		<>
			<form className="container-step" noValidate autoComplete='off'>
				<div className={classes.btn_stepM}>
					<TextField
						id='outlined-basic'
						label='Nombre Comercio'
						variant='outlined'
						value={fm.name_commerce}
					/>
					<TextField
						id='outlined-basic'
						label='Numero ID'
						variant='outlined'
						value={`${fm.ident_type_commerce} ${fm.ident_num_commerce}`}
					/>
						<FormControlLabel
							control={<Switch checked={state.status} onChange={handleChange} name='status' color='primary' />}
							label='Correcto'
						/>
				</div>
			</form>
			<div className='img_container_2'>
				<ReactImageZoom {...props} />
			</div>
		</>
	);
}
