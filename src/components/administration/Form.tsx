import { Button, TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useState, useEffect } from 'react';
//Redux
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { updateStatusFMAdministration } from '../../store/actions/administration';
import { recaudo } from '../utilis/recaudos';
//Url
import './styles/index.scss';

import Rec from '../utilis/images/Rec';

import { useStyles } from './styles/styles';


export const Form: React.FC<any> = ({
	fm,
	setFm,
	uploadImg,
	nameImg,
	setUploadImg,
	setNameImage,
	payment,
	setPayment,
	listPayment,
	typePay,
	setTypePay,
	listTypePay,
	path,
	setPath,
}) => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [load, setLoad] = useState<boolean>(false)
	const [cuotasTexto, setCuotasTexto] = useState('');
	const [fraccion, setFraccion] = useState<any>({
		state: false,
		coutas: 0,
		initial: 100,
	});

	useEffect(() => {
		if (typePay) {
			//console.log('type', typePay.id)
			if (typePay.id === 2) {
				setFraccion({
					...fraccion,
					state: true,
				});
			} else {
				setFraccion({
					...fraccion,
					state: false,
				});
			}
		} else {
			setFraccion({
				...fraccion,
				state: false,
			});
		}
	/*
		if (initial && modelPos) {
			let valor = cursedForm.number_post * (modelPos.price - cursedForm.initial);
			let cuotas = valor / (cursedForm.number_post * 50);

			setCursedForm({
				...cursedForm,
				cuotas: valor / (cursedForm.number_post * 50),
			});

			if (valor < 0) {
				setCursedForm({
					...cursedForm,
					initial: 100,
				});
			}
			if (cuotas % 1 === 0 && cuotas > 0 && cuotas) {
				setCuotasTexto(`${cuotas} cuota/s de 50$`);
			} else {
				setCursedForm({
					...cursedForm,
					initial: 100,
				});
			}
		}
	*/
		/* eslint-disable react-hooks/exhaustive-deps */
	}, [fraccion.initial, typePay]);


	const handleChangeImages = (event: any) => {
		if (event.target.files[0]) {
			let file = event.target.files[0];
			let newFile = new File([file], `${event.target.name}.${file.type.split('/')[1]}`, { type: 'image/jpeg' });
			const path = URL.createObjectURL(newFile);
			//Save img
			setUploadImg(newFile);
			setNameImage(event.target.files[0].name);
			setPath(path);
		}
	};

	const	imagen:string= path;

	const handleVerificated = () => {
		Swal.fire({
			title: 'Confirmar verificación',
			icon: 'warning',
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Verificado',
			showCancelButton: true,
			cancelButtonText: 'Cancelar',
			showCloseButton: true,
			customClass: { container: 'swal2-validated' },
		}).then((result) => {
			if (result.isConfirmed) {
				console.log(payment, typePay);
				const data: any = !fm.pagadero
					? {}
					: {
							id_payment_method: payment.id,
							id_type_payment: typePay.id,
					  };
				console.log(data);
				//dispatch() //images
				dispatch(updateStatusFMAdministration(fm.id, 3, null));
			}
		});
	};

	const handleSelectPayment = (event: any, value: any) => {
		if (value) {
			setPayment(value);
		} else {
			setPayment(null);
		}
	};

	const handleSelectTypePay = (event: any, value: any) => {
		if (value) {
			setTypePay(value);
		} else {
			setTypePay(null);
		}
	};

	const disButton = () => {
		if (path || (payment && payment.id === 2)) {
			return false;
		} else {
			return true;
		}
	};

	useEffect(() => {
		if (payment && payment.id === 2) {
			setUploadImg(null);
			setNameImage('');
			setFm({
				...fm,
				urlImgCompDep: '',
			});
		}
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [payment]);

	return (
		<>
			<h2 className={classes.tableTitle}>
				Formulario: <span className={classes.codeFm}>{fm.code}</span>
			</h2>
			<div className={classes.wrapper}>
				<div className={classes.content}>
					<div className={classes.row}>
						{fm.pagadero ? (
							<Autocomplete
								className={classes.textAutoCompleteLeft}
								onChange={(event, value) => handleSelectPayment(event, value, 'payment_method')}
								options={listPayment}
								value={payment}
								getOptionLabel={(option: any) => (option.name ? option.name : '')}
								getOptionSelected={(option: any, value: any) => option.id === value.id}
								renderInput={(params: any) => (
									<TextField
										{...params}
										name='payment_method'
										label='Modalidad de Pago'
										variant='outlined'
										className={classes.textfieldLeft}
									/>
								)}
							/>
						) : (
							<TextField
								className={classes.textfieldLeft}
								id='outlined-basic'
								label='Metodo de Pago'
								variant='outlined'
								value={fm?.id_payment_method.name}
							/>
						)}
						{fm?.pagadero ? (
							<Autocomplete
								className={classes.textAutoCompleteLeft}
								onChange={(event, value) => handleSelectTypePay(event, value, 'payment_method')}
								options={listTypePay}
								value={typePay || null}
								getOptionLabel={(option: any) => (option.name ? option.name : '')}
								getOptionSelected={(option: any, value: any) => option.id === value.id}
								renderInput={(params: any) => (
									<TextField
										{...params}
										name='typePay'
										label='Tipo de Pago'
										variant='outlined'
										className={classes.textfieldLeft}
									/>
								)}
							/>
						) : (
							<TextField
								className={classes.textfieldLeft}
								id='outlined-basic'
								label='Tipo de Pago'
								variant='outlined'
								value={fm?.id_type_payment.name}
							/>
						)}
						{fm?.ci_referred && !fm.pagadero && (
							<TextField
								id='outlined-basic'
								label='Referencia'
								variant='outlined'
								value={fm?.ci_referred}
							/>
						)}
					</div>
					<div className={classes.row}>
						{fraccion.state && (
							<>
								<TextField
									id='initial'
									label='Inicial'
									//className={classes.inputTextLeft}
									type='number'
									name='initial'
									variant='outlined'
									value={fraccion.initial}
									onKeyDown={(e) => {
										e.preventDefault();
									}}
									inputProps={{
										maxLength: 5,
										step: '50',
										min: '100',
									}}
									//onChange={handleChange}
								/>
								<TextField
									disabled
									id='initial'
									label='Cantidad de cuotas'
									//className={classes.inputText}
									type='text'
									variant='outlined'
									value={cuotasTexto}
								/>
							</>
						)}
					</div>
					{path && !fm.pagadero ? (
						<div className={classes.containerImg}>
							<Rec 
								load={load}
								setLoad={setLoad}
								imagen={imagen}
							/>
						</div>
					) : (
						<>
							{uploadImg && (
								<div className={classes.containerImg}>
									<Rec 
										load={load}
										setLoad={setLoad}
										imagen={imagen}
									/>
								</div>
							)}
							{payment && payment.id !== 2 && (
								<Button className={classes.uploadImg} variant='contained' component='label'>
									{uploadImg !== null ? (
										<IconButton aria-label='upload picture' component='span'>
											<p className={classes.nameImg}>{nameImg.slice(0, 10)} ...</p>
										</IconButton>
									) : (
										<IconButton aria-label='upload picture' component='span'>
											<CloudUploadIcon className={classes.iconUpload} />
										</IconButton>
									)}
									<input
										type='file'
										hidden
										name='rc_comp_dep'
										accept={recaudo.acc}
										onChange={handleChangeImages}
									/>
								</Button>
							)}
						</>
					)}
					<Button
						className={classes.buttonV}
						onClick={handleVerificated}
						variant='contained'
						disabled={disButton()}
						color='primary'>
						Verificar
					</Button>
				</div>
			</div>
		</>
	);
};
