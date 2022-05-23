import { Alert, Button, IconButton, Stack } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import ListImages from 'components/utilis/images/ListImages';
import FMDiferidoContext from 'context/Admision/Diferido/FmDiferidoContext';
import React, { useContext } from 'react';
import { useStyles } from './styles/styles';
import { recaudo } from 'utils/recaudos';

const DifStepPlanilla: React.FC = () => {
	const classes = useStyles();

	const { solic, listValidated, disabled, imagePlanilla, handleChangePlanilla, deleteItemPlanilla } =
		useContext(FMDiferidoContext);

	const imagenes: any = solic.rc_planilla;

	return (
		<>
			<form className={classes.containerStep} noValidate autoComplete='off'>
				<div className={classes.btn_stepM}>
					<Stack sx={{ width: '40%', mr: '1rem' }} spacing={2}>
						<Alert severity={disabled ? 'success' : 'error'}>
							{listValidated.id_typedif_planilla === 2 ? listValidated.valid_planilla : 'Error Interno'}
						</Alert>
					</Stack>
					<Button
						disabled={disabled}
						className={classes.imgIdent}
						variant='contained'
						style={{
							background: imagePlanilla.length && !disabled ? '#5c62c5' : '#D3D3D3',
						}}
						component='label'>
						<IconButton aria-label='upload picture' component='span'>
							<PhotoCamera />
						</IconButton>
						<input
							type='file'
							multiple
							hidden
							name='rc_planilla'
							accept={recaudo.acc}
							onChange={handleChangePlanilla}
						/>
					</Button>
				</div>
				<ListImages
					listImagen={imagePlanilla}
					imagenes={imagenes}
					deleteItemImagenes={deleteItemPlanilla}
					disabled={disabled}
				/>
			</form>
		</>
	);
};

export default DifStepPlanilla;
