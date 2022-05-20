import { Aci } from 'context/DataList/interface';
import { stat } from 'fs';
import React, { createContext, Dispatch, ReactChild, SetStateAction, useEffect, useState } from 'react';
import { ClientValid, ContextFMValidation, ValidatedFace } from './interface';
import { initValidado } from './state';

interface Props {
	children: ReactChild;
	fm: any;
}

const baseSteps = [
	'Información Personal del Cliente',
	'Información del Comercio',
	'Dirección del Comercio/POS',
	'Solicitud de POS',
];

function getSteps(fm: any) {
	const list: string[] = [];
	if (fm) {
		if (true && !list.includes('Cliente')) list.push('Cliente');
		if (true && !list.includes('Comercio')) list.push('Comercio');
		if (fm.rc_ref_bank !== null && !list.includes('Referencia Bancaria')) list.push('Referencia Bancaria');
		if (fm.rc_planilla.length && !list.includes('Planilla de Solicitud')) list.push('Planilla de Solicitud');
		if (fm.id_commerce.rc_constitutive_act.length && !list.includes('Acta Const.')) list.push('Acta Const.');
		if (fm.id_commercespecial_contributor && !list.includes('Cont. Especial')) list.push('Cont. Especial');
		if (fm.rc_comp_num !== null && !list.includes('Comprobante de Pago')) list.push('Comprobante de Pago');
	}
	//
	return list;
}

const FMValidDataContext = createContext<ContextFMValidation>({
	typeSolict: 1,
	client: null,
	commerce: null,
	pos: null,
	locationClient: null,
	locationCommerce: null,
	locationPos: null,
	aci: null,
	setAci: () => {},
	resetFmValidation: () => {},
	handleChangeValid: () => {},
	listValidated: initValidado,
	codeFM: '',
	stepsFM: baseSteps,
});

export const FMValidContextProvider = ({ children, fm }: Props) => {
	const [stepsFM, setStepsFM] = useState(baseSteps);
	const [codeFM, setCodeFM] = useState<string>('');
	const [listValidated, setListValidated] = useState<ValidatedFace>(initValidado);
	const [typeSolict, setTypeSolict] = useState<number>(1);
	const [client, setClient] = useState<ClientValid | null>(null);
	const [commerce, setCommerce] = useState<any>(null);
	const [pos, setPos] = useState<any>(null);
	const [locationClient, setLocationClient] = useState<any>(null);

	const [locationCommerce, setLocationCommerce] = useState<any>(null);
	const [locationPos, setLocationPos] = useState<any>(null);

	const [aci, setAci] = useState<Aci | null>(null);

	const resetFmValidation = (): void => {
		setListValidated(initValidado);
		setClient(null);
		setCommerce(null);
		setPos(null);
		setAci(null);
	};

	const handleChangeValid = (op: string, status: any) => {
		setListValidated({
			...listValidated,
			[op]: status,
		});
	};

	useEffect(() => {
		console.log(fm);
		if (fm) {
			if (!client || !commerce || !pos || locationClient || !locationCommerce || !locationPos || !stepsFM.length) {
				const { id_client, id_commerce } = fm;
				console.log('cargar data');
				console.log('fm context', fm);
				const { id_location, ref_person_1, ref_person_2, ...clientData } = id_client;
				setClient({
					...clientData,
					ref_person_1: JSON.parse(ref_person_1),
					ref_person_2: JSON.parse(ref_person_2),
				});
				setLocationClient(id_location);
				setCommerce(id_commerce);
				setPos(fm);
				setCodeFM(fm.code);
				setStepsFM(getSteps(fm));
			}
		}
	}, [fm]);

	return (
		<FMValidDataContext.Provider
			value={{
				typeSolict,
				client,
				commerce,
				pos,
				locationClient,
				locationCommerce,
				locationPos,
				aci,
				setAci,
				resetFmValidation,
				handleChangeValid,
				listValidated,
				codeFM,
				stepsFM,
			}}>
			{children}
		</FMValidDataContext.Provider>
	);
};

export default FMValidDataContext;