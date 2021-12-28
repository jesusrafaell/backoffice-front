/* eslint-disable no-unused-vars */
import { 
  CHANGE_FM,
	SET_FM,
  CHANGE_ErrorFM,
  SET_ErrorFM,
  CHANGE_DAYS,
  SET_DAYS,
	SET_ESTADO_S,
	SET_MUNICIPIO_S,
	SET_CIUDAD_S,
	SET_PARROQUIA_S,
	SET_ACTIVITY,
	COPY_LOCATION,
	COPY_LOCATION_C_TO_CC,
	COPY_LOCATION_C_TO_P,
	COPY_LOCATION_CC_TO_P,
	SET_LOCATION,
} from './type';
import {createContext, useReducer, useContext } from 'react';

import FMReducer from './FMReducer';
import FMLocationReducer from './FMLocationReducer';
import FMErrorReducer from './FMErrorReducer';

import {
	fm_Interface,
	fmError_Interface,
	Days,
} 
from './interfaces';

import {
	fmFormat,
	fmErrorFormat,
	daysWork,
	location,
} from './states';

export const FMContext = createContext({});

const FMProvider = (props:any) => {

	const initialState = {
		fmData: fmFormat,
		days: daysWork,
		codePhone: '58',
		activity: null,
	}

	const initialStateError = {
		fmDataError: fmErrorFormat,
	}

	const [fmState, dispatch] = useReducer(FMReducer,initialState);

	const { fmData } = fmState;

	const [locationClient, dispatchC] = useReducer(FMLocationReducer, location);
	const [locationCommerce, dispatchCC] = useReducer(FMLocationReducer, location);
	const [locationPos, dispatchP] = useReducer(FMLocationReducer, location);

	const [fmErrorState, dispatchError] = useReducer(FMErrorReducer, initialStateError);

	const changeFmData = (event: React.ChangeEvent<HTMLInputElement>) => {
		const data:any = {
			name: event.target.name,
			value: event.target.value,
		}
		dispatch({
			type: CHANGE_FM,
			payload: data,
		});
	}

	const changeFmParms = (name: string, value: string | number) => {
		dispatch({
			type: CHANGE_FM,
			payload: {name: name, value: value},
		});
	}

	const setFmData = (fm: fm_Interface) => {
		dispatch({
			type: SET_FM,
			payload: fm,
		});
	}

	const setFmError = (fmError: fmError_Interface) => {
		dispatchError({
			type: SET_ErrorFM,
			payload: fmError,
		});
	}

	const changeDays = (event: React.ChangeEvent<HTMLInputElement>) => {
		const data:any = {
			name: event.target.name,
			value: event.target.checked,
	}
		dispatch({
			type: CHANGE_DAYS,
			payload: data,
		});
	}

	const setDays = (days: Days) => {
		dispatch({
			type: SET_DAYS,
			payload: days,
		});
	}

	//Client location
	const setEstadoClient = (data: any) => {
		dispatchC({
			type: SET_ESTADO_S,
			payload: data,
		});
		changeFmParms('id_estado_client', data ? data.id : 0);
		changeFmParms('id_municipio_client', 0);
		changeFmParms('id_ciudad_client', 0);
		changeFmParms('id_parroquia_client', 0);
	};

	const setMunicipioClient = (data: any) => {
		dispatchC({
			type: SET_MUNICIPIO_S,
			payload: data,
		});
		changeFmParms('id_municipio_client', data ? data.id : 0);
		changeFmParms('id_ciudad_client', 0);
		changeFmParms('id_parroquia_client', 0);
	};

	const setCiudadClient = (data: any) => {
		dispatchC({
			type: SET_CIUDAD_S,
			payload: data,
		});
		changeFmParms('id_ciudad_client', data ? data.id : 0);
		changeFmParms('id_parroquia_client', 0);
		changeFmParms('codigo_postal_client', data ? data.postal_code : '');
	};

	const setParroquiaClient = (data: any) => {
		dispatchC({
			type: SET_PARROQUIA_S,
			payload: data,
		});
		changeFmParms('id_parroquia_client', data ? data.id : 0);
	};

	//Comercio location
	const setEstadoCommerce = (data: any) => {
		dispatchCC({
			type: SET_ESTADO_S,
			payload: data,
		});
		changeFmParms('id_estado', data ? data.id : 0);
		changeFmParms('id_municipio', 0);
		changeFmParms('id_ciudad', 0);
		changeFmParms('id_parroquia', 0);
	};

	const setMunicipioCommerce = (data: any) => {
		dispatchCC({
			type: SET_MUNICIPIO_S,
			payload: data,
		});
		changeFmParms('id_municipio', data ? data.id : 0);
		changeFmParms('id_ciudad', 0);
		changeFmParms('id_parroquia', 0);
	};

	const setCiudadCommerce = (data: any) => {
		dispatchCC({
			type: SET_CIUDAD_S,
			payload: data,
		});
		changeFmParms('id_ciudad', data ? data.id : 0);
		changeFmParms('id_parroquia', 0);
		changeFmParms('codigo_postal', data ? data.postal_code : '');
	};

	const setParroquiaCommerce = (data: any) => {
		dispatchCC({
			type: SET_PARROQUIA_S,
			payload: data,
		});
		changeFmParms('id_parroquia', data ? data.id : 0);
	};

	//Pos location
	const setEstadoPos = (data: any) => {
		dispatchP({
			type: SET_ESTADO_S,
			payload: data,
		});
		changeFmParms('id_estado_pos', data ? data.id : 0);
		changeFmParms('id_municipio_pos', 0);
		changeFmParms('id_ciudad_pos', 0);
		changeFmParms('id_parroquia_pos', 0);
	};

	const setMunicipioPos = (data: any) => {
		dispatchP({
			type: SET_MUNICIPIO_S,
			payload: data,
		});
		changeFmParms('id_municipio_pos', data ? data.id : 0);
		changeFmParms('id_ciudad_pos', 0);
		changeFmParms('id_parroquia_pos', 0);
	};

	const setCiudadPos = (data: any) => {
		dispatchP({
			type: SET_CIUDAD_S,
			payload: data,
		});
		changeFmParms('id_ciudad_pos', data ? data.id : 0);
		changeFmParms('id_parroquia_pos', 0);
		changeFmParms('codigo_postal_pos', data ? data.postal_code : '');
	};

	const setParroquiaPos = (data: any) => {
		dispatchP({
			type: SET_PARROQUIA_S,
			payload: data,
		});
		changeFmParms('id_parroquia_pos', data ? data.id : 0);
	};

	const setActivity = (data: any) => {
		dispatch({
			type: SET_ACTIVITY,
			payload: data,
		});
	}

	const copyLocationCToCC = () => {
		dispatchCC({
			type: COPY_LOCATION,
			payload: locationClient,
		});
		dispatch({
			type: SET_FM,
			payload: {
				...fmData,
				id_estado: fmData.id_estado_client,
				id_ciudad: fmData.id_ciudad_client,
				id_municipio: fmData.id_municipio_client,
				id_parroquia: fmData.id_parroquia_client,
				sector: fmData.sector_client,
				calle: fmData.calle_client,
				local: fmData.local_client,
				codigo_postal: fmData.codigo_postal_client,
			}
		});
	}

	const copyLocationCToP = () => {
		dispatchP({
			type: COPY_LOCATION,
			payload: locationClient,
		});
		dispatch({
			type: SET_FM,
			payload: {
				...fmData,
				id_estado_pos: fmData.id_estado_client,
				id_ciudad_pos: fmData.id_ciudad_client,
				id_municipio_pos: fmData.id_municipio_client,
				id_parroquia_pos: fmData.id_parroquia_client,
				sector_pos: fmData.sector_client,
				calle_pos: fmData.calle_client,
				local_pos: fmData.local_client,
				codigo_postal_pos: fmData.codigo_postal_client,
			}
		});
	}

	const copyLocationCCToP = () => {
		dispatchP({
			type: COPY_LOCATION,
			payload: locationCommerce,
		});
		
		dispatch({
			type: SET_FM,
			payload: {
				...fmData,
				id_estado_pos: fmData.id_estado,
				id_ciudad_pos: fmData.id_ciudad,
				id_municipio_pos: fmData.id_municipio,
				id_parroquia_pos: fmData.id_parroquia,
				sector_pos: fmData.sector,
				calle_pos: fmData.calle,
				local_pos: fmData.local,
				codigo_postal_pos: fmData.codigo_postal,
			}
		});
	}

	const setLocationClient = (location: any) => {
		dispatchC({
			type: SET_LOCATION,
			payload: location,
		})
	}

	const setLocationCommerce = (location: any) => {
		dispatchCC({
			type: SET_LOCATION,
			payload: location,
		})
	}

	return (
		<FMContext.Provider
			value={{
				//FM
				...fmState,
				changeFmData,
				changeFmParms,
				setFmData,
				changeDays,
				setDays,
				setActivity,
				//Location Fm
				locationClient,
				locationCommerce,
				locationPos,
				setLocationClient,
				setLocationCommerce,

				setEstadoClient,
				setMunicipioClient,
				setCiudadClient,
				setParroquiaClient,

				setEstadoCommerce,
				setMunicipioCommerce,
				setCiudadCommerce,
				setParroquiaCommerce,

				setEstadoPos,
				setMunicipioPos,
				setCiudadPos,
				setParroquiaPos,

				copyLocationCToCC,
				copyLocationCToP,
				copyLocationCCToP,
				//FMError
				...fmErrorState,
				setFmError,
			}}
		>
			{props.children}
		</FMContext.Provider>
	)
}

export default FMProvider;
