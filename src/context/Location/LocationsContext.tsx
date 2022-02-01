/* eslint-disable no-unused-vars */
import {
	createContext,
	useReducer,
	useLayoutEffect,
	ReactChild,
	ReactChildren,
	useState,
	Dispatch,
	SetStateAction,
} from 'react';

import axios from '../../config';

import { Estado, Municipio, ListLocation } from './interfaces';

interface Props {
	children: ReactChild | ReactChildren;
}

const listClient: ListLocation = {
	estado: [],
	municipio: [],
	ciudad: [],
	parroquia: [],
};

const listCommerce: ListLocation = {
	estado: [],
	municipio: [],
	ciudad: [],
	parroquia: [],
};

const listPos: ListLocation = {
	estado: [],
	municipio: [],
	ciudad: [],
	parroquia: [],
};

interface ContextLocations {
	listLocationClient: ListLocation;
	listLocationCommerce: ListLocation;
	listLocationPos: ListLocation;
	setListLocationClient: Dispatch<SetStateAction<ListLocation>>;
	setListLocationCommerce: Dispatch<SetStateAction<ListLocation>>;
	setListLocationPos: Dispatch<SetStateAction<ListLocation>>;
	handleListMunicipio(id: number, setListLocation: Dispatch<SetStateAction<ListLocation>>): void;
	handleListCiudad(id: number, setListLocation: Dispatch<SetStateAction<ListLocation>>): void;
	handleListParroquia(id: number, setListLocation: Dispatch<SetStateAction<ListLocation>>): void;
}

const LocationsContext = createContext<ContextLocations>({
	listLocationClient: listClient,
	listLocationCommerce: listCommerce,
	listLocationPos: listPos,
	setListLocationClient: () => {},
	setListLocationCommerce: () => {},
	setListLocationPos: () => {},
	handleListMunicipio: () => {},
	handleListCiudad: () => {},
	handleListParroquia: () => {},
});

export const LocationsProvider = ({ children }: Props) => {
	const [listLocationClient, setListLocationClient] = useState<ListLocation>(listClient);
	const [listLocationCommerce, setListLocationCommerce] = useState<ListLocation>(listCommerce);
	const [listLocationPos, setListLocationPos] = useState<ListLocation>(listPos);

	//Estado
	const setListEstado = (estados: Estado[], setListLocation: Dispatch<SetStateAction<ListLocation>>) => {
		setListLocation((prevState) => ({
			...prevState,
			estado: estados,
		}));
	};

	//Municipio
	const handleListMunicipio = async (id: number, setListLocation: Dispatch<SetStateAction<ListLocation>>) => {
		if (id) {
			try {
				await axios.get(`/Location/${id}/municipio`).then((res: any) => {
					setListLocation((prevState) => ({
						...prevState,
						municipio: res.data.info,
						ciudad: [],
						parroquia: [],
					}));
				});
			} catch (e) {
				console.log(e);
				return [];
			}
		} else {
			setListLocation((prevState) => ({
				...prevState,
				municipio: [],
				ciudad: [],
				parroquia: [],
			}));
		}
	};

	//Ciudad
	const handleListCiudad = async (id: number, setListLocation: Dispatch<SetStateAction<ListLocation>>) => {
		if (id) {
			try {
				await axios.get(`/Location/${id}/ciudad`).then((res: any) => {
					setListLocation((prevState) => ({
						...prevState,
						ciudad: res.data.info,
						parroquia: [],
					}));
				});
			} catch (e) {
				return [];
			}
		} else {
			setListLocation((prevState) => ({
				...prevState,
				ciudad: [],
				parroquia: [],
			}));
		}
	};

	//Parroquia
	const handleListParroquia = async (id: number, setListLocation: Dispatch<SetStateAction<ListLocation>>) => {
		try {
			await axios.get(`/Location/${id}/parroquia`).then((res: any) => {
				setListLocation((prevState) => ({
					...prevState,
					parroquia: res.data.info,
				}));
			});
		} catch (e) {
			setListLocation((prevState) => ({
				...prevState,
				parroquia: [],
			}));
		}
	};

	const saveEstados = (estados: Estado[]): void => {
		setListEstado(estados, setListLocationClient);
		setListEstado(estados, setListLocationCommerce);
		setListEstado(estados, setListLocationPos);
	};

	useLayoutEffect(() => {
		const getEstados = async () => {
			try {
				await axios.get('/Location/estado').then((res: any) => {
					saveEstados(res.data.info);
					return res.data.info;
				});
			} catch (e) {
				console.log(e);
				return [];
			}
		};
		getEstados();
	}, []);

	/*
	const copyListLocationCToCC = () => {
		dispatchCC({
			type: COPY_LOCATION,
			payload: listLocationClient,
		});
	};

	const copyListLocationCToP = () => {
		dispatchP({
			type: COPY_LOCATION,
			payload: listLocationClient,
		});
	};

	const copyListLocationCCToP = () => {
		dispatchP({
			type: COPY_LOCATION,
			payload: listLocationCommerce,
		});
	};
	*/
	return (
		<LocationsContext.Provider
			value={{
				listLocationClient,
				listLocationCommerce,
				listLocationPos,

				setListLocationClient,
				setListLocationCommerce,
				setListLocationPos,

				//handles
				handleListMunicipio,
				handleListCiudad,
				handleListParroquia,

				//copyListLocationCToCC,
				//copyListLocationCToP,
				//copyListLocationCCToP,
			}}>
			{children}
		</LocationsContext.Provider>
	);
};

export default LocationsContext;
