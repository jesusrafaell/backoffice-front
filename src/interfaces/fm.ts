import { Aci, Activity, base, Products } from '../context/DataList/interface';

export interface fmClient {
	email: string;
	name: string;
	last_name: string;
	id_ident_type: number;
	ident_num: string;
	phone1: string;
	phone2: string;
	calle: string;
	local: string;
	name_ref1: string;
	doc_ident_type_ref1: string;
	doc_ident_ref1: string;
	phone_ref1: string;
	name_ref2: string;
	doc_ident_type_ref2: string;
	doc_ident_ref2: string;
	phone_ref2: string;
}

export interface fmCommerce {
	id_ident_type: number;
	ident_num: string;
	name: string;
	special_contributor: boolean;
	days: Days;
	calle: string;
	local: string;
}

export interface fmPos {
	calle: string;
	local: string;
	number_post: number;
	text_account_number: string;
	model_post: Products | null;
	payment_method: base | null;
	type_pay: base | null;
	request_origin: base | null;
	reqSource_docnum: string;
	initial: number;
	//cuotas: number;
	nro_comp_dep: string;
	discount: boolean;
	pagadero: boolean;
}

export interface Days {
	Lunes: boolean;
	Martes: boolean;
	Miercoles: boolean;
	Jueves: boolean;
	Viernes: boolean;
	Sabado: boolean;
	Domingo: boolean;
}

export interface fmError_ClientINT {
	email: boolean;
	name: boolean;
	last_name: boolean;
	id_ident_type: boolean;
	ident_num: boolean;
	phone1: boolean;
	phone2: boolean;
	calle: boolean;
	local: boolean;
	//Step2 Referencias Personales
	name_ref1: boolean;
	doc_ident_type_ref1: boolean;
	doc_ident_ref1: boolean;
	phone_ref1: boolean;
	name_ref2: boolean;
	doc_ident_type_ref2: boolean;
	doc_ident_ref2: boolean;
	phone_ref2: boolean;
}

export interface fmError_CommerceINT {
	//step3 Comercio
	id_ident_type: boolean;
	ident_num: boolean;
	name: boolean;
	id_activity: boolean;
	special_contributor: boolean;
	//Step4 Location
	//Commerce
	calle: boolean;
	local: boolean;
}

export interface fmError_Interface {
	//step1 Cliente
	email: boolean;
	name: boolean;
	last_name: boolean;
	id_ident_type: boolean;
	ident_num: boolean;
	phone1: boolean;
	phone2: boolean;
	calle_client: boolean;
	local_client: boolean;
	//Step2 Referencias Personales
	name_ref1: boolean;
	doc_ident_type_ref1: boolean;
	doc_ident_ref1: boolean;
	phone_ref1: boolean;
	name_ref2: boolean;
	doc_ident_type_ref2: boolean;
	doc_ident_ref2: boolean;
	phone_ref2: boolean;
	//step3 Comercio
	id_ident_type_commerce: boolean;
	ident_num_commerce: boolean;
	name_commerce: boolean;
	id_activity: boolean;
	special_contributor: boolean;
	//Step4 Location
	//Commerce
	calle: boolean;
	local: boolean;
	//Pos
	calle_pos: boolean;
	local_pos: boolean;
	//Step5 Post
	number_post: boolean;
	id_model_post: boolean;
	text_account_number: boolean;
	id_payment_method: boolean;
	id_type_pay: boolean;
	id_request_origin: boolean;
	reqSource_docnum: boolean;
	initial: boolean;
	cuotas: boolean; //Si es inical coutas cambia
	nro_comp_dep: boolean;
	discount: boolean;
	pagadero: boolean;
}

export interface IdClient_CommerceINT {
	idClient: number;
	idCommerce: number;
}
