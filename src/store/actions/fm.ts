import { AxiosResponse } from 'axios';
import Swal from 'sweetalert2';
import { ActionType } from '../types/types';
import useAxios, { axiosFiles } from '../../config/index';

export const updateToken = (token: any) => {
	localStorage.setItem('token', token.data.token);
};

export const sendClient = (client :any) => {
	console.log(client)
	return async (dispatch: any) => {
		try {
			const res: AxiosResponse<any> = await useAxios.post(`/FM/client`, client);
			localStorage.setItem('token', res.data.token);
			dispatch(requestSuccess(res.data.info.id));
		} catch (error) {
			console.log(error.reponse)
			dispatch(requestError());
			Swal.fire('Error', error.response.data.message, 'error');
		}
	};
	function requestSuccess(state: any) {
		return {
			type: ActionType.sendClient,
			payload: state
		};
	}
	function requestError() {
		return {
			type: ActionType.sendClientError,
		};
	}
};

export const sendImages = (email: any, formData: any ) => {
	return async (dispatch: any) => {
		try {
			const res: AxiosResponse<any> = await axiosFiles.post(`/1000pagosRC/RC`, { email },formData);
			localStorage.setItem('token', res.data.token);
			Swal.fire('Success', res.data.message, 'success');
			console.log(res.data)
			dispatch(requestSuccess(res.data.info.data));
		} catch (error) {
			console.log(error.reponse)
			dispatch(requestError());
			Swal.fire('Error', error.response.data.message, 'error');
		}
	};
	function requestSuccess(state: any) {
		return {
			type: ActionType.sendImages,
		};
	}
	function requestError() {
		return {
			type: ActionType.sendImagesError,
		};
	}
};

export const cleanFM = () => {
	return async (dispatch: any) => {
			dispatch(request());
	};
	function request() {
		return {
			type: ActionType.cleanFm,
		};
	}
}