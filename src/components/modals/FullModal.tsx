/* eslint-disable react-hooks/exhaustive-deps */
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';
import React from 'react';
import './scss/fullmodal.scss';

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & { children?: React.ReactElement },
	ref: React.Ref<unknown>
) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		modalFull: {
			width: '100%',
			margin: '1.5rem',
			padding: '1rem',
			display: 'flex',
			flexDirection: 'column',
		},
	})
);

const FullModal: React.FC<any> = ({ modalOpen, handleClose, children }) => {
	const classes = useStyles();

	return (
		<Dialog fullScreen open={modalOpen} onClose={handleClose} TransitionComponent={Transition}>
			<div className='button-close'>
				<div className='close-container' onClick={handleClose}>
					<div className='leftright'></div>
					<div className='rightleft'></div>
					<label className='closee'>Cerrar</label>
				</div>
			</div>
			<div className={classes.modalFull}>{children}</div>
		</Dialog>
	);
};

export default FullModal;
