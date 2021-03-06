import { Aci, Activity, base, TeleMarket, TypeWallet } from 'context/DataList/interface';
import {
	fmClient,
	fmCommerce,
	fmError_ClientINT,
	fmError_CommerceINT,
	fmError_Interface,
	fmPos,
	IdClient_CommerceINT,
} from 'interfaces/fm';
import { Dispatch, SetStateAction } from 'react';
import { Ciudad, Estado, LocationInt, Municipio, Parroquia, Sector } from '../Location/interfaces';

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
	setSector(data: Sector | null, setLocation: Dispatch<SetStateAction<LocationInt>>): void;
	copyLocationToCommerce(
		stateLocation: LocationInt,
		state: fmClient | fmCommerce | fmPos,
		idLocation: number | null
	): void;
	copyLocationToPos(
		stateLocation: LocationInt,
		state: fmClient | fmCommerce | fmPos,
		idLocation: number | null
	): void;
	handleTypeSolict(id: number): void;
	handleChangeClient(event: React.ChangeEvent<HTMLInputElement>): void;
	handleSelectIdentClient(name: string, value: number | string): void;
	handleChangeCommerce(event: React.ChangeEvent<HTMLInputElement>): void;
	handleSelectIdentCommerce(name: string, value: number | string): void;
	handleChangeCheckedCommerce(event: React.ChangeEvent<HTMLInputElement>): void;
	handleChangeDay(event: React.ChangeEvent<HTMLInputElement>): void;
	handleChangePos(event: React.ChangeEvent<HTMLInputElement>): void;
	handleParamsPos(name: string, value: base | null | string | number): void;
	handleCheckedPos(event: React.ChangeEvent<HTMLInputElement>): void;
	resetFm(): void;
	validClientAndCommerce(): void | Promise<boolean>;
	idsCAndCc: IdClient_CommerceINT | null;
	setIdsCAndCc: Dispatch<SetStateAction<IdClient_CommerceINT | null>>;
	aci: Aci | null;
	handleSourceAci(event: any, value: Aci | null, name: string): void;
	telemarket: TeleMarket | null;
	handleSourceTelemarket(event: any, value: TeleMarket | null): void;
	typeWallet: TypeWallet | null;
	handleTypeWallet(event: any, value: TypeWallet | null, name: string): void;
	idLocationClient: number | null;
	idLocationCommerce: number | null;
	idLocationPos: number | null;
	setIdLocationClient: Dispatch<SetStateAction<number | null>>;
	setIdLocationCommerce: Dispatch<SetStateAction<number | null>>;
	setIdLocationPos: Dispatch<SetStateAction<number | null>>;
}
