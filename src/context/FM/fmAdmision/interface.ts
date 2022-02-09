import { Dispatch, SetStateAction } from 'react';
import {
	fmClient,
	fmCommerce,
	fmError_ClientINT,
	fmError_CommerceINT,
	fmError_Interface,
	fmPos,
	IdClient_CommerceINT,
} from '../../../interfaces/fm';
import { Ciudad, Estado, LocationInt, Municipio, Parroquia } from '../Location/interfaces';
import { Aci, Activity, base } from '../../DataList/interface';

export interface ContextFM {
	typeSolict: number;
	errorsFm: fmError_Interface;
	errorsClient: fmError_ClientINT;
	errorsCommerce: fmError_CommerceINT;
	client: fmClient;
	commerce: fmCommerce;
	activity: Activity | null;
	setActivity: Dispatch<SetStateAction<Activity | null>>;
	pos: fmPos;
	locationClient: LocationInt;
	locationCommerce: LocationInt;
	locationPos: LocationInt;
	setClient: Dispatch<SetStateAction<fmClient>>;
	setCommerce: Dispatch<SetStateAction<fmCommerce>>;
	setPos: Dispatch<SetStateAction<fmPos>>;
	setLocationClient: Dispatch<SetStateAction<LocationInt>>;
	setLocationCommerce: Dispatch<SetStateAction<LocationInt>>;
	setLocationPos: Dispatch<SetStateAction<LocationInt>>;
	setEstado(data: Estado | null, setLocation: Dispatch<SetStateAction<LocationInt>>): void;
	setMunicipio(data: Municipio | null, setLocation: Dispatch<SetStateAction<LocationInt>>): void;
	setCiudad(data: Ciudad | null, setLocation: Dispatch<SetStateAction<LocationInt>>): void;
	setParroquia(data: Parroquia | null, setLocation: Dispatch<SetStateAction<LocationInt>>): void;
	copyLocationToCommerce(stateLocation: LocationInt, state: fmClient | fmCommerce | fmPos): void;
	copyLocationToPos(stateLocation: LocationInt, state: fmClient | fmCommerce | fmPos): void;
	handleTypeSolict(id: number): void;
	handleChangeClient(event: React.ChangeEvent<HTMLInputElement>): void;
	handleSelectIdentClient(event: React.ChangeEvent<{ name?: string; value: unknown }>): void;
	handleChangeCommerce(event: React.ChangeEvent<HTMLInputElement>): void;
	handleSelectIdentCommerce(event: React.ChangeEvent<{ name?: string; value: unknown }>): void;
	handleChangeCheckedCommerce(event: React.ChangeEvent<HTMLInputElement>): void;
	handleChangeDay(event: React.ChangeEvent<HTMLInputElement>): void;
	handleChangePos(event: React.ChangeEvent<HTMLInputElement>): void;
	handleParamsPos(name: string, value: base | null | string): void;
	handleCheckedPos(event: React.ChangeEvent<HTMLInputElement>): void;
	handleSourceAci(event: any, value: Aci | null, name: string): void;
	resetFm(): void;
	validClientAndCommerce(): void | Promise<boolean>;
	idsCAndCc: IdClient_CommerceINT | null;
}