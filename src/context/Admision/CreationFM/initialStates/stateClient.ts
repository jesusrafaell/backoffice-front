import { fmClient, fmError_ClientINT } from 'interfaces/fm';

/*
export const initFmClient: fmClient = {
	//step1 Cliente
	email: 'test@corre.com',
	name: 'jesus',
	last_name: 'hernan',
	id_ident_type: 1,
	ident_num: '222222222',
	phone1: '4242456154',
	phone2: '4242457631',
	calle: 'pera',
	local: 'manzna',
	//Step2 Referencias Personales
	name_ref1: 'Amigo Uno',
	doc_ident_type_ref1: 'V',
	doc_ident_ref1: '1234567',
	phone_ref1: '4241234334',
	name_ref2: 'amigo hola',
	doc_ident_type_ref2: 'V',
	doc_ident_ref2: 'queos',
	phone_ref2: '4241234346',
};
*/

export const initFmClient: fmClient = {
	//step1 Cliente
	email: '',
	name: '',
	last_name: '',
	id_ident_type: 1,
	ident_num: '',
	phone1: '',
	phone2: '',
	calle: '',
	local: '',
	//Step2 Referencias Personales
	name_ref1: '',
	doc_ident_type_ref1: 'V',
	doc_ident_ref1: '',
	phone_ref1: '',
	name_ref2: '',
	doc_ident_type_ref2: 'V',
	doc_ident_ref2: '',
	phone_ref2: '',
};

export const fmErrorClient: fmError_ClientINT = {
	email: false,
	name: false,
	last_name: false,
	id_ident_type: false,
	ident_num: false,
	phone1: false,
	phone2: false,
	calle: false,
	local: false,
	name_ref1: false,
	doc_ident_type_ref1: false,
	doc_ident_ref1: false,
	phone_ref1: false,
	name_ref2: false,
	doc_ident_type_ref2: false,
	doc_ident_ref2: false,
	phone_ref2: false,
};
