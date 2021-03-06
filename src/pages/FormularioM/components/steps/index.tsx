import BackUpIcon from '@mui/icons-material/Backup';
import CheckCircleIcon from '@mui/icons-material/CheckCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, Tooltip } from '@mui/material';
import classNames from 'classnames';
import DataListContext from 'context/DataList/DataListContext';
import FMDataContext from 'context/Admision/CreationFM/fmAdmision/FmContext';
import ImagesFmContext from 'context/Admision/CreationFM/fmImages/ImagesFmContext';
import LocationsContext from 'context/Admision/CreationFM/Location/LocationsContext';
import { FC, useContext, useEffect } from 'react';
import { recaudo } from 'utils/recaudos';
import { useStylesFM } from '../styles';

const StepBase: FC = () => {
	const classes = useStylesFM();

	const { listTypesSolicts } = useContext(DataListContext);
	const { typeSolict, handleTypeSolict, resetFm } = useContext(FMDataContext);
	const { resetListLocaitons } = useContext(LocationsContext);
	const { imagePlanilla, handleChangePlanilla, removePlanilla, resetImages } = useContext(ImagesFmContext);

	useEffect(() => {
		resetFm();
		resetListLocaitons();
		resetImages();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [typeSolict]);

	return (
		<div className='ed-container container-formMaldito'>
			<div className='container-form'>
				<div
					style={{
						marginTop: '5rem',
					}}
					className={classNames(classes.input, classes.daysCB)}>
					<FormControl className={classes.inputSelectSolict}>
						<InputLabel>Solicitudes</InputLabel>
						<Select
							value={typeSolict}
							onChange={(e) => handleTypeSolict(e.target.value as number)}
							name='typeSolict'
							label='TipoSolict'>
							{listTypesSolicts.map((item: any) => (
								<MenuItem key={item.id} value={item.id}>
									{item.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<div className={classes.containerBtn} style={{ marginTop: '2rem' }}>
						<b>Cargar la planilla digitalizada</b>
						<Button
							className={classes.imgIdent}
							variant='contained'
							style={{
								background: imagePlanilla ? '#5c62c5' : '#f44336',
							}}
							component='label'>
							<IconButton aria-label='upload picture' component='span'>
								{imagePlanilla.length ? <CheckCircleIcon /> : <BackUpIcon />}
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
						{imagePlanilla.length ? (
							<Button
								className={classes.imgIdent}
								variant='contained'
								onClick={removePlanilla}
								color='secondary'
								style={{
									marginLeft: '10px',
									width: '20px',
								}}
								component='label'>
								<Tooltip title='Borrar Planilla'>
									<IconButton aria-label='upload picture' component='span'>
										<ClearIcon />
									</IconButton>
								</Tooltip>
							</Button>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
};

export default StepBase;
