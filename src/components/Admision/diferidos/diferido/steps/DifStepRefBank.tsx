import { PhotoCamera } from '@mui/icons-material';
import { Alert, Button, FormControlLabel, IconButton, Stack, Switch, TextField } from '@mui/material';
import { ModalAlert } from 'components/modals/ModalAlert';
import RecDifPdf from 'components/utilis/images/RecDifPdf';
import FMDiferidoContext from 'context/Admision/Diferido/FmDiferidoContext';
import React, { useContext, useEffect, useState } from 'react';
import { useStyles } from './styles/styles';
import { recaudo } from 'utils/recaudos';

const DifStepRefBank: React.FC = () => {
	const classes = useStyles();
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [load, setLoad] = useState(false);

	const { solic, listValidated, disabled, handleChange, imagesForm, handleChangeImages, pathImages } =
		useContext(FMDiferidoContext);

	const imagen = imagesForm.rc_ref_bank
		? pathImages.rc_ref_bank.path
		: `${process.env.REACT_APP_API_IMAGES}/${solic.rc_ref_bank.path}`;

	const typeImagen = imagesForm.rc_ref_bank ? pathImages.rc_ref_bank.type : null;

	return (
		<>
			<form className={classes.containerStep} noValidate autoComplete='off'>
				<div className={classes.btn_stepM}>
					<Stack sx={{ width: '40%', mr: '1rem' }} spacing={2}>
						<Alert severity={disabled ? 'success' : 'error'}>
							{listValidated.id_typedif_ref_bank === 2 ? listValidated.valid_ref_bank : 'Error Interno'}
						</Alert>
					</Stack>
					<TextField
						disabled={disabled}
						className={classes.btn_stepNro}
						label='Numero de Cuenta'
						variant='outlined'
						name='bank_account_num'
						inputProps={{ maxLength: 20 }}
						onChange={handleChange}
						value={solic.bank_account_num}
					/>
					<Button
						className={classes.imgIdent}
						variant='contained'
						disabled={disabled}
						style={{
							background: imagesForm.rc_ref_bank && !disabled ? '#5c62c5' : '#D3D3D3',
						}}
						component='label'>
						<IconButton aria-label='upload picture' component='span'>
							<PhotoCamera />
						</IconButton>
						<input type='file' hidden name='rc_ref_bank' accept={recaudo.acc} onChange={handleChangeImages} />
					</Button>
				</div>
				<RecDifPdf load={load} setLoad={setLoad} imagen={imagen} type={typeImagen} />
			</form>
		</>
	);
};

export default DifStepRefBank;