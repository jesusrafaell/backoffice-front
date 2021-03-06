import axios from 'config';

/*
export const getIdentTypes = async () => {
	try{
		const resp: string [] = await axios.get('/ident_type').then((res:any) => {
		return res.data.info 
		});
		return resp;
	}catch(e){
		console.log(e);
		return [];
	}
}

export const getActivity = async () => {
	try{
		const resp: string [] = await axios.get('/activity').then((res:any) => {
		localStorage.setItem('token', res.data.token);
		return res.data.info 
		});
		return resp;
	}catch(e){
		console.log(e);
		return [];
	}
}

export const getProducts = async () => {
	try{
		const resp: string [] = await axios.get('/products').then((res:any) => {
		localStorage.setItem('token', res.data.token);
			return res.data.info 
		});
		return resp;
	}catch(e){
		console.log(e);
		return [];
	}
}

export const getEstados = async () => {
	try{
		const resp: string [] = await axios.get('/Location/estado').then((res:any) => {
		localStorage.setItem('token', res.data.token);
			return res.data.info 
		});
		return resp;
	}catch(e){
		console.log(e);
		return [];
	}
}
*/

export const getPayMent = async () => {
	try {
		const resp: string[] = await axios.get('/payment/all').then((res: any) => {
			localStorage.setItem('token', res.data.token);
			return res.data.info;
		});
		return resp;
	} catch (e) {
		console.log(e);
		return [];
	}
};

export const getCiudad = async (id: any) => {
	try {
		const resp: string[] = await axios.get(`/Location/${id}/ciudad`).then((res: any) => {
			localStorage.setItem('token', res.data.token);
			return res.data.info;
		});
		return resp;
	} catch (e) {
		console.log(e);
		return [];
	}
};

export const getMunicipio = async (id: any) => {
	try {
		const resp: string[] = await axios.get(`/Location/${id}/municipio`).then((res: any) => {
			localStorage.setItem('token', res.data.token);
			return res.data.info;
		});
		return resp;
	} catch (e) {
		console.log(e);
		return [];
	}
};

export const getParroquia = async (id: any) => {
	try {
		const resp: string[] = await axios.get(`/Location/${id}/parroquia`).then((res: any) => {
			localStorage.setItem('token', res.data.token);
			return res.data.info;
		});
		return resp;
	} catch (e) {
		console.log(e);
		return [];
	}
};

export const getCompany = async () => {
	try {
		const resp: string[] = await axios.get('/company').then((res: any) => {
			return res.data.info;
		});
		return resp;
	} catch (e) {
		console.log(e);
		return [];
	}
};

export const getAci = async () => {
	try {
		const resp: string[] = await axios.get('/aci').then((res: any) => {
			return res.data.info;
		});
		return resp;
	} catch (e) {
		console.log(e);
		return [];
	}
};
