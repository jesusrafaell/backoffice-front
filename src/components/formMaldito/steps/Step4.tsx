import React from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { useStylesFM } from '../styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';


//Pedido
export const Step4: React.FC<any> = ({
	imagesForm,
	namesImages,
	listLocationPos,
	listModelPos,
	locationPos,
	setLocationPos,
	listPayment, 
	error,
	payment,
	modelPos,
	setPayment,
	setModelPost,
	cursedForm,
	setCursedForm,
	handleChange,
	handleChangeImages,
}) => {
	const classes = useStylesFM();

	const handleSelectPayment = (event: any, value: any, item: string) => {
		if(value){
			setCursedForm({
				...cursedForm,
				[`id_${item}`]: value.id
			});
			setPayment(value);
		} else{
			setCursedForm({
				...cursedForm,
				[`id_${item}`]: 0
			});
			setPayment(null);
		}
	};

	const handleSelectPos= (event: any, value: any, item: string) => {
		if(value){
			setCursedForm({
				...cursedForm,
				[`id_${item}`]: value.id
			});
			setModelPost(value);
		} else{
			setCursedForm({
				...cursedForm,
				[`id_${item}`]: 0
			});
			setModelPost(null);
		}
	};

  return (
    <>
			<div className={classes.input}>
				<TextField 
					className={classes.inputA}
					variant="outlined"
					required
					id="standard-required"
					label="Numero de Cuenta" 
					name='text_account_number'
					onChange={handleChange}
					value={cursedForm.text_account_number}
				/>
				<Button
					className={classes.imgNroAccount}
					variant="contained"
					//color="secondary"
					component="label"
				>
				{imagesForm.rc_account_number !== null ? (
					<p className="nameImg" >{namesImages.rc_account_number.slice(0, 7)}...</p>
				):(
					<>
						<b className="textSubir">Subir</b>
						<IconButton aria-label="upload picture" component="span">
							<PhotoCamera />
						</IconButton>
					</>
					)
				}
				<input
					type="file"
					hidden
					name="rc_account_number"
					accept="image/png, image/jpeg, image/jpg"
					onChange={handleChangeImages}
				/>
				</Button>
			</div>
			<Autocomplete
					className={classes.input}
					onChange={(event,value) => handleSelectPayment(event,value, 'payment_method')}
					options={listPayment}
					value={payment || null}
					getOptionLabel={(option:any) => option.name ? option.name : ''}
					renderInput={(params:any) => <TextField {...params}  name="payment_method" label="Forma de Pago" variant="outlined" />}
			/>
			<div className={classes.input}>
				<TextField
					className={classes.inputMP} 
					variant="outlined" 
					required 
					id="standard-required" 
					label="Numero de Puntos" 
					type="number"
					name='number_post'
					onChange={handleChange} 
					error={error.number_post}
					value={cursedForm.number_post}/>
					<Autocomplete
							className={classes.inputNP}
							onChange={(event,value) => handleSelectPos(event,value, 'model_post')}
							value={modelPos || null}
							options={listModelPos}
							getOptionLabel={(option:any) => option.name ? option.name: ''}
							renderInput={(params:any) => <TextField {...params}  name="model_post" label="Modelo de los POS" variant="outlined" />}
					/>
			</div>
		</>
  )
}
