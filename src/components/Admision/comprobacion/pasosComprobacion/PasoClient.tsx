import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from 'react';
// @ts-expect-error
import ReactImageZoom from 'react-image-zoom';
import { useDispatch, useSelector } from 'react-redux';
//Url
import { PortFiles, URL } from '../../../../config';
import { Valid } from '../../../../store/actions/accept';
import { RootState } from '../../../../store/store';
import './styles/pasos.scss';
import { useStyles } from './styles/styles';

import { ModalAlert }from '../ModalAlert';

export default function PasoClient() {
	const rc_ident_card: any = useSelector((state: RootState) => state.acceptance.validado.rc_ident_card);
	const dispatch = useDispatch();
	const classes = useStyles();
	const fm: any = useSelector((state: RootState) => state.fmAdmision.fm);
	const [ flag, setFlag ] = useState<boolean>(false); //Flag for loading
	const [state, setState] = React.useState(rc_ident_card);
	const [openModal, setOpenModal] = React.useState<boolean>(false);

	const handleOpenModal = () => {
		handleCancel()
		setOpenModal(true);
	};
	const handleCloseModal = (cancel: boolean) => {
		if(cancel){
			setState({ 
				...state, 
				status: !state.status,
			});
		}
		setOpenModal(false);
	};

	setTimeout(() => {
		setFlag(true);
	}, 150)

	useEffect(() => {
		dispatch(Valid({ rc_ident_card: state }));
	}, [state.status]);

	const handleIncorret = () => {
		dispatch(Valid({ rc_ident_card: state }));
		handleCloseModal(false);
	};

	const handleCancel = () => {
		handleCloseModal(true);
	};

	const handleChangeI = (event:any) => {
		setState({ 
			...state, 
			[event.target.name]: event.target.value,
		});
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState({ 
			...state, 
			[event.target.name]: event.target.checked,
		});
		if(!event.target.checked)
			handleOpenModal();
	};

	const props = {
		zoomPosition: 'original',
		height: 350,
		width: 450,
		img: `${URL}:${PortFiles}/${fm.path_rc_ident_card}`,
	};

	return (
		<>
			<form className="container-step" noValidate autoComplete='off'>
				<div className={classes.btn_stepM}>
					<TextField
						className={classes.btn_stepT}
						id='outlined-basic'
						label='Nombre'
						variant='outlined'
						value={fm.name_client}
					/>
					<TextField
						className={classes.btn_stepT}
						id='outlined-basic'
						label='Apellido'
						variant='outlined'
						value={fm.last_name_client}
					/>
					<TextField
						className={classes.btn_stepT}
						id='outlined-basic'
						label='Numero ID'
						variant='outlined'
						value={`${fm.ident_type_client} ${fm.ident_num_client}`}
					/>
				<FormControlLabel
					control={<Switch
						checked={state.status}
						onChange={handleChange}
						name='status'
						color='primary'
						/>}
					className={classes.checkText}
					label={state.status ? 'Correcto' : 'Incorrecto'}
				/>
				</div>
			</form>
			{flag &&
				<div className='img_container'>
					<ReactImageZoom className={classes.img_zoom} {...props} />
				</div>
			}
			<ModalAlert 
				openModal={openModal}
				handleCloseModal={handleCloseModal}
				state={state}
				handleChangeI={handleChangeI}
				handleIncorret={handleIncorret}
				handleCancel={handleCancel}
			/>
		</>
	);
}

