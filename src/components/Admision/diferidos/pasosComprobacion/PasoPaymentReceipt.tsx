/* eslint-disable react-hooks/exhaustive-deps */
import { Button, IconButton, TextareaAutosize, TextField } from '@mui/material';
import FMDiferidoContext from 'context/Admision/Diferido/FmDiferidoContext';
import { ModalAlert } from 'components/modals/ModalAlert';
import { useContext, useEffect, useState } from 'react';
//import ReactImageZoom from 'react-image-zoom';
import { useDispatch, useSelector } from 'react-redux';
//Url
import { Valid } from 'store/actions/accept';
import { RootState } from 'store/store';
import './styles/pasos.scss';
import { useStyles } from './styles/styles';
import RecDifPdf from 'components/utilis/images/RecDifPdf';
import { PhotoCamera } from '@mui/icons-material';
import { recaudo } from 'utils/recaudos';

export default function PasoPaymentReceipt() {
	//falta
	const valid_comp_dep: any = useSelector((state: RootState) => state.acceptance.validado.valid_comp_dep);

	const dispatch = useDispatch();
	const classes = useStyles();
	const [state, setState] = useState(valid_comp_dep); //falta
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [load, setLoad] = useState(false);

	const { fm, disabled, handleChange, imagesForm, handleChangeImages, pathImages } = useContext(FMDiferidoContext);

	const handleCloseModal = (cancel: boolean) => {
		if (cancel) {
			setState({
				...state,
				status: !state.status,
			});
		}
		setOpenModal(false);
	};

	useEffect(() => {
		dispatch(Valid({ valid_comp_dep: state }));
	}, [state.status]);

	/*const imagen = imagesForm.rc_comp_dep
		? pathImages.rc_comp_dep.path
		: `${process.env.REACT_APP_API_IMAGES}/${fm.rc_comp_dep.path}`;
		*/

	const imagen = imagesForm.rc_comp_dep
		? pathImages.rc_comp_dep.path
		: `${process.env.REACT_APP_API_IMAGES}/${fm.rc_comp_dep.path}/${fm.rc_comp_dep.path}`;

	const typeImagen = imagesForm.rc_comp_dep ? pathImages.rc_comp_dep.type : null;

	console.log(imagesForm);

	return (
		<>
			<form className={classes.containerStep} noValidate autoComplete='off'>
				<div className={classes.btn_stepM}>
					{fm.id_valid_request.id_typedif_special_contributor === 2 ? (
						<TextareaAutosize
							className={classes.btn_stepText}
							maxRows={4}
							disabled
							defaultValue={fm.id_valid_request.valid_special_contributor}
							placeholder=''
						/>
					) : (
						<h2 className={classes.btn_stepTextInterno}> Error Interno </h2>
					)}
				</div>
				<div className={classes.btn_stepM}>
					<TextField
						className={classes.btn_stepNro}
						id='outlined-basic '
						label='Nro comprobante'
						value={fm.nro_comp_dep}
						variant='outlined'
						name='nro_comp_dep'
						onChange={handleChange}
					/>
					<Button
						className={classes.imgIdent}
						variant='contained'
						disabled={disabled}
						style={{
							background: imagesForm.rc_comp_dep && !disabled ? '#5c62c5' : '#D3D3D3',
						}}
						component='label'>
						<IconButton aria-label='upload picture' component='span'>
							<PhotoCamera />
						</IconButton>
						<input type='file' hidden name='rc_comp_dep' accept={recaudo.acc} onChange={handleChangeImages} />
					</Button>
				</div>
			</form>
			<RecDifPdf load={load} setLoad={setLoad} imagen={imagen} type={typeImagen} />
			<ModalAlert
				from='valid_comp_dep'
				openModal={openModal}
				handleCloseModal={handleCloseModal}
				state={state}
				setState={setState}
			/>
		</>
	);
}