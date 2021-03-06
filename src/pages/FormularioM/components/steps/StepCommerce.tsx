import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
	Autocomplete,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Tooltip,
} from '@mui/material';
import DataListContext from 'context/DataList/DataListContext';
import { Activity } from 'context/DataList/interface';
import FMDataContext from 'context/Admision/CreationFM/fmAdmision/FmContext';
import ImagesFmContext from 'context/Admision/CreationFM/fmImages/ImagesFmContext';
import { Days } from 'interfaces/fm';
import { FC, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetCommerceValid, validationCommerce } from 'store/actions/admision/fm';
import { RootState } from 'store/store';
import { recaudo } from 'utils/recaudos';
import { sxStyled, useStylesFM } from '../styles';

const StepCommerce: FC = () => {
	const classes = useStylesFM();
	const [actaFlag, setActaFlag] = useState(false);
	const dispatch = useDispatch();

	const fm: any = useSelector((state: RootState) => state.fm);

	//Context
	const {
		typeSolict,
		errorsFm,
		commerce,
		errorsCommerce,
		activity,
		setActivity,
		handleChangeDay,
		handleSelectIdentCommerce,
		handleChangeCheckedCommerce,
		handleChangeCommerce,
	} = useContext(FMDataContext);

	const { listIdentType, listActivity } = useContext(DataListContext);

	const {
		imagesActa,
		namesImages,
		imagesForm,
		handleChangeImages,
		handleChangeImagesMulti,
		deleteImgContributor,
		deleteImgActa,
	} = useContext(ImagesFmContext);

	useLayoutEffect(() => {
		if (
			//typeSolict === 1
			commerce.id_ident_type !== 0 &&
			commerce.ident_num !== '' &&
			!errorsCommerce.ident_num
		) {
			dispatch(
				validationCommerce(fm.id_client, {
					id_ident_type: commerce.id_ident_type,
					ident_num: commerce.ident_num,
				})
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleBlurCommerce = (): void => {
		if (commerce.id_ident_type !== 0 && commerce.ident_num !== '' && !errorsCommerce.ident_num) {
			dispatch(
				validationCommerce(fm.id_client, {
					id_ident_type: commerce.id_ident_type,
					ident_num: commerce.ident_num,
				})
			);
		}
	};

	const handleChangeIdenType = (value: number): void => {
		dispatch(resetCommerceValid());
		if (commerce.id_ident_type !== 0 && commerce.ident_num !== '' && !errorsCommerce.ident_num) {
			dispatch(
				validationCommerce(fm.id_client, {
					id_ident_type: commerce.id_ident_type,
					ident_num: commerce.ident_num,
				})
			);
		}
	};

	const handleChangeNameCommerce = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (/^[a-z0-9 ]+$/i.test(event.target.value) || event.target.value === '') {
			handleChangeCommerce(event);
		}
	};

	const handleSelectActivity = (event: any, value: any, item: string) => {
		if (value) setActivity(value);
		else setActivity(null);
	};

	const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.checked && imagesForm.rc_special_contributor) {
			deleteImgContributor(event.target.name);
		}
		handleChangeCheckedCommerce(event);
	};

	const handleIdentNum = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (/^[0-9]+$/.test(event.target.value) || event.target.value === '') {
			handleChangeCommerce(event);
		}
	};

	useEffect(() => {
		setActaFlag(false);
		if (commerce.id_ident_type === 3) {
			setActaFlag(true);
		} else {
			if (imagesActa.length) {
				//console.log('delete');
				deleteImgActa();
			}
		}
		/* eslint-disable react-hooks/exhaustive-deps */
	}, [commerce.id_ident_type]);

	return (
		<>
			<div className={classes.grid}>
				<div className={classes.input}>
					<FormControl sx={sxStyled.inputSelect} className={classes.inputSelect}>
						<InputLabel id='demo-simple-select-outlined-label'>Doc.</InputLabel>
						<Select
							disabled={typeSolict === 1 || typeSolict === 2}
							variant='outlined'
							value={commerce.id_ident_type}
							onChange={(event: any) => {
								handleChangeIdenType(event.target.value);
								handleSelectIdentCommerce('id_ident_type', event.target.value);
							}}
							name='id_ident_type'
							label='Tipo'
							onBlur={handleBlurCommerce}
							error={fm.errorCommerce}>
							{listIdentType.map((item: any) => {
								if (typeSolict === 1 && item.name === 'J') return null;
								if (typeSolict === 2 && item.name !== 'J') return null;
								return (
									<MenuItem key={item.id} value={item.id}>
										{item.name}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
					<TextField
						disabled={typeSolict === 1 ? true : false}
						className={classes.inputTextLeft}
						sx={sxStyled.inputLeft}
						variant='outlined'
						required
						id='standard-required'
						label={commerce.id_ident_type === 3 ? 'Numero de Rif' : 'C.I.'}
						name='ident_num'
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							dispatch(resetCommerceValid());
							handleIdentNum(event);
						}}
						onBlur={handleBlurCommerce}
						value={commerce.ident_num}
						error={fm.errorCommerce || errorsCommerce.ident_num}
						inputProps={{
							maxLength: commerce.id_ident_type === 5 ? 20 : 9,
						}}
					/>
					<Tooltip title='Cargar imagen del Rif del comercio'>
						<Button
							className={classes.imgIdent}
							disabled={fm.imagesCommerce}
							variant='contained'
							style={{
								opacity: fm.imagesCommerce ? 0 : 1,
								background: imagesForm.rc_rif ? '#5c62c5' : '#f44336',
							}}
							component='label'>
							{imagesForm.rc_rif !== null ? (
								<p className='nameImg'>{namesImages.rc_rif.slice(0, 7)}...</p>
							) : (
								<>
									{/*<b>Subir</b>*/}
									<IconButton aria-label='upload picture' component='span'>
										<PhotoCamera />
									</IconButton>
								</>
							)}
							<input type='file' hidden name='rc_rif' accept={recaudo.acc} onChange={handleChangeImages} />
						</Button>
					</Tooltip>
				</div>
				<div className={classes.input}>
					<TextField
						className={classes.inputText}
						variant='outlined'
						required
						id='standard-required'
						label='Nombre del Comercio'
						name='name'
						onChange={handleChangeNameCommerce}
						value={commerce.name}
						error={errorsFm.name}
						disabled={fm.mashCommerce}
					/>
				</div>
				<Autocomplete
					className={classes.input}
					disabled={fm.mashCommerce}
					onChange={(event, value: Activity | null) => handleSelectActivity(event, value, 'activity')}
					options={listActivity}
					value={activity || null}
					getOptionLabel={(option: Activity) => (option.name ? option.name : '')}
					renderInput={(params: any) => (
						<TextField {...params} name='activity' label='Actividad Comercial' variant='outlined' />
					)}
				/>
				<div className={classes.input}>
					{actaFlag && (
						<>
							<b className={classes.inputText}>{!fm.imagesCommerce && 'Acta Constitutiva'}</b>
							<Tooltip title='Cargar archivos del Acta Constitutiva'>
								<Button
									className={classes.imgIdent}
									variant='contained'
									disabled={fm.imagesCommerce}
									style={{
										opacity: fm.imagesCommerce ? 0 : 1,
										background: imagesActa.length ? '#5c62c5' : '#f44336',
									}}
									component='label'>
									{imagesActa.length !== 0 ? (
										<>
											<p className='nameImg'>{imagesActa.length} Archivos</p>
										</>
									) : (
										<>
											<IconButton aria-label='upload picture' component='span'>
												<PhotoCamera />
											</IconButton>
										</>
									)}
									<input
										type='file'
										hidden
										multiple
										name='rc_constitutive_act'
										accept={recaudo.acc}
										onChange={handleChangeImagesMulti}
									/>
								</Button>
							</Tooltip>
						</>
					)}
				</div>
				<div className={classes.input}>
					{typeSolict === 2 ? (
						<div className={classes.inputText}>
							<FormControlLabel
								style={{ margin: 0 }}
								label=''
								control={
									<>
										<Checkbox
											name='special_contributor'
											checked={commerce.special_contributor}
											onChange={handleChecked}
											disabled={fm.imagesCommerce}
											color='primary'
											inputProps={{ 'aria-label': 'secondary checkbox' }}
										/>
										<b
											style={{
												fontSize: '1rem',
											}}>
											Contribuye Especial
										</b>
									</>
								}
							/>
						</div>
					) : null}
					<Tooltip title='Cargar documento de Contribuyente Especial'>
						<Button
							className={classes.imgIdent}
							disabled={fm.imagesCommerce}
							variant='contained'
							style={{
								opacity: fm.imagesCommerce ? 0 : 1,
								background: imagesForm.rc_special_contributor ? '#5c62c5' : '#f44336',
								visibility: commerce.special_contributor ? 'visible' : 'hidden',
							}}
							component='label'>
							{imagesForm.rc_special_contributor ? (
								<p className='nameImg'>{namesImages.rc_special_contributor.slice(0, 7)}...</p>
							) : (
								<IconButton aria-label='upload picture' component='span'>
									<PhotoCamera />
								</IconButton>
							)}
							<input
								type='file'
								hidden
								name='rc_special_contributor'
								accept={recaudo.acc}
								onChange={handleChangeImages}
							/>
						</Button>
					</Tooltip>
				</div>
			</div>
			<div className={classes.daysCB}>
				D??as laborales
				<FormGroup row style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr ' }}>
					{Object.keys(commerce.days).map((key: string) => {
						return (
							<FormControlLabel
								control={
									<Checkbox
										checked={commerce.days[key as keyof Days]}
										onChange={handleChangeDay}
										name={key}
										color='primary'
									/>
								}
								label={key.replaceAll('_', ' ')}
								key={key}
							/>
						);
					})}
				</FormGroup>
			</div>
		</>
	);
};

export default StepCommerce;
