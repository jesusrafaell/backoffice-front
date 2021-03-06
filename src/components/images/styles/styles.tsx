import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

export const useStyles = makeStyles(() => ({
	img_zoom: {
		width: 'auto',
		height: '300px',
	},
	container_zoom: {
		border: 'solid 1.5px rgba(0, 0, 0, 0.3)',
		padding: '.5rem',
		boxSizing: 'border-box',
		boxShadow: '0px 4px 10px -8px #000000',
		borderRadius: '20px',
	},
	container_img: {
		marginTop: '1rem',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
	},
}));

export const sxStyledList = {
	btn_stepM: {
		m: '8px 0',
		//margin: '8px 0',
	},
	container_ListActa: {
		margin: '0 auto',
		display: 'grid',
		gridColumnGap: '1%',
		gridTemplateColumns: '1fr 1fr 1fr',
	},
};

export const useStylesImg = makeStyles((styles: Theme) => ({
	deleteButton: {
		width: '20',
	},
	newImage: {
		background: styles.palette.primary.main,
		color: 'red',
	},
	imgIdent: {
		padding: '0',
		fontSize: '.7rem',
		textTransform: 'none',
		width: '100%',
		maxWidth: 100,
		maxHeight: 56,
		height: '100%',
	},
	btn_stepM: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		margin: '8px 0',
	},
	btn_step: {
		width: '49%',
	},
	btn_stepNum: {
		width: '50%',
	},
	btn_stepT: {
		marginLeft: `${styles.spacing(1)} !important`,
		marginRight: `${styles.spacing(1)} !important`,
	},
	btn_stepText: {
		width: 500,
	},
	btn_stepTextInterno: {
		fontSize: '1rem',
		color: styles.palette.secondary.main,
	},
	img_zoom: {
		width: '40vw',
	},
	container_zoom: {
		border: 'solid 1.5px rgba(0, 0, 0, 0.3)',
		padding: '.5rem',
		boxSizing: 'border-box',
		boxShadow: '0px 4px 10px -8px #000000',
		borderRadius: '20px',
	},
	container_img: {
		marginTop: '-1rem',
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
	},
	check: {
		marginBottom: '2%',
		marginTop: '2%',
		marginLeft: '40%',
	},
	btn_stepNro: {
		marginRight: '5% !important',
	},
	checkText: {
		marginLeft: '1rem',
		width: '100px',
	},
	container_ListActa: {
		margin: '0 auto',
		display: 'grid',
		gridColumnGap: '1%',
		gridTemplateColumns: '1fr 1fr',
	},
	container_imgpdf: {
		marginTop: '1rem',
	},
	link: {
		textDecoration: 'none',
		textTransform: 'none',
	},
	itemLink: {
		textDecoration: 'none',
		textTransform: 'none',
		paddingLeft: '.5rem',
	},
	containerStep: {
		width: '100%',
		flexDirection: 'column',
		display: 'flex',
	},
	btn_medio: {
		width: '70%',
	},
	wrapper: {
		display: 'flex',
		flexDirection: 'column',
	},
	wrapperGrid: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		gridColumnGap: '1%',
	},
}));

export const sxStyled = {
	btn_stepM: {
		m: '8px 0',
		//margin: '8px 0',
	},
	container_ListActa: {
		margin: '0 auto',
		display: 'grid',
		gridColumnGap: '1%',
		gridTemplateColumns: '1fr 1fr',
	},
};
