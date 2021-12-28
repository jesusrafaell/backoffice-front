import {
	fm_Interface,
	fmError_Interface,
	Days,
} 
from './interfaces';

export const fmFormat:fm_Interface = {
	//step1 Cliente
	email: '',
	name: '',
	last_name: '',
	id_ident_type: 1,
	ident_num: '',
	phone1: '',
	phone2: '',
	id_estado_client: 0,
	id_ciudad_client: 0,
	id_municipio_client: 0,
	id_parroquia_client: 0,
	codigo_postal_client: '',
	sector_client: '',
	calle_client: '',
	local_client: '',
	//Step2 Referencias Personales
	name_ref1: '',
	doc_ident_type_ref1: 'V',
	doc_ident_ref1: '',
	phone_ref1: '',
	name_ref2: '',
	doc_ident_type_ref2: 'V',
	doc_ident_ref2: '',
	phone_ref2: '',
	//step3 Comercio
	id_ident_type_commerce: 3,
	ident_num_commerce: '',
	name_commerce: '',
	id_activity: 0,
	special_contributor: 0,
	//Step4 Location
	//Commerce
	id_estado: 0,
	id_ciudad: 0,
	id_municipio: 0,
	id_parroquia: 0,
	codigo_postal: '',
	sector: '',
	calle: '',
	local: '',
	//Pos
	id_estado_pos: 0,
	id_ciudad_pos: 0,
	id_municipio_pos: 0,
	id_parroquia_pos: 0,
	codigo_postal_pos: '',
	sector_pos: '',
	calle_pos: '',
	local_pos: '',
	//Step5 Post
	number_post: 1,
	id_model_post: 0,
	text_account_number: '',
	id_payment_method: 0,
	id_type_pay: 0,
	id_request_origin: 1,
	reqSource_docnum: '',
	initial: 100,
	cuotas: 0, //Si es inical coutas cambia
	nro_comp_dep: '',
	discount: 0,
	pagadero: 0,
}

export const fmErrorFormat:fmError_Interface = {
	//step1 Cliente
	email: false,
	name: false,
	last_name: false,
	id_ident_type: false,
	ident_num: false,
	phone1: false,
	phone2: false,
	id_estado_client: false,
	id_ciudad_client: false,
	id_municipio_client: false,
	id_parroquia_client: false,
	codigo_postal_client: false,
	sector_client: false,
	calle_client: false,
	local_client: false,
	//Step2 Referencias Personales
	name_ref1: false,
	doc_ident_type_ref1: false,
	doc_ident_ref1: false,
	phone_ref1: false,
	name_ref2: false,
	doc_ident_type_ref2: false,
	doc_ident_ref2: false,
	phone_ref2: false,
	//step3 Comercio
	id_ident_type_commerce: false,
	ident_num_commerce: false,
	name_commerce: false,
	id_activity: false,
	special_contributor: false,
	//Step4 Location
	//Commerce
	id_estado: false,
	id_ciudad: false,
	id_municipio: false,
	id_parroquia: false,
	codigo_postal: false,
	sector: false,
	calle: false,
	local: false,
	//Pos
	id_estado_pos: false,
	id_ciudad_pos: false,
	id_municipio_pos: false,
	id_parroquia_pos: false,
	codigo_postal_pos: false,
	sector_pos: false,
	calle_pos: false,
	local_pos: false,
	//Step5 Post
	number_post: false,
	id_model_post: false,
	text_account_number: false,
	id_payment_method: false,
	id_type_pay: false,
	id_request_origin: false,
	reqSource_docnum: false,
	initial: false,
	cuotas: false, //Si es inical coutas cambia
	nro_comp_dep: false,
	discount: false,
	pagadero: false,
};

export const daysWork:Days = {
	Lunes: true,
	Martes: true,
	Miercoles: true,
	Jueves: true,
	Viernes: true,
	Sabado: true,
	Domingo: true,
};

export const location: any = {
	estado: null,
	ciudad: null,
	municipio: null,
	parroquia: null,
}
