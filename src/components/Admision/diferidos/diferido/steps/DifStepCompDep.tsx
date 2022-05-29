import { PhotoCamera } from '@mui/icons-material';
import { Alert, Button, IconButton, Stack, TextField } from '@mui/material';
import RecDifPdf from 'components/utilis/images/RecDifPdf';
import FMDiferidoContext from 'context/Admision/Diferido/FmDiferidoContext';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useStyles } from './styles/styles';
import { recaudo } from 'utils/recaudos';

const DifStepCompDep: React.FC = () => {
	const classes = useStyles();
	const [load, setLoad] = useState(false);

	const { solic, listValidated, disabled, handleChange, imagesForm, handleChangeImages, pathImages } =
		useContext(FMDiferidoContext);

	const [imagen, setImagen] = useState('');

	useLayoutEffect(() => {
		if (solic) {
			setImagen(
				imagesForm.rc_comp_dep
					? pathImages.rc_comp_dep.path
					: `${process.env.REACT_APP_API_IMAGES}/${solic?.rc_comp_dep?.path}`
			);
		}
	}, [solic?.rc_comp_dep, pathImages.rc_comp_dep]);

	const typeImagen = imagesForm.rc_comp_dep ? pathImages.rc_comp_dep.type : null;

	return (
		<>
			<form className={classes.containerStep} noValidate autoComplete='off'>
				<div className={classes.btn_stepM}>
					<Stack sx={{ width: '40%', mr: '1rem' }} spacing={2}>
						<Alert severity={disabled ? 'success' : 'error'}>
							{listValidated.id_typedif_comp_num === 2 ? listValidated.valid_comp_dep : 'Error Interno'}
						</Alert>
					</Stack>
					<TextField
						disabled={disabled}
						className={classes.btn_stepNro}
						label='Numero de Comprobate'
						variant='outlined'
						name='nro_comp_dep'
						inputProps={{ maxLength: 15 }}
						onChange={handleChange}
						value={solic?.nro_comp_dep || 'No tiene numero'}
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
				<RecDifPdf load={load} setLoad={setLoad} imagen={imagen} type={typeImagen} />
			</form>
		</>
	);
};

export default DifStepCompDep;
