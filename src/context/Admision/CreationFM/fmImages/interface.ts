export interface ImagesInt {
	rc_ident_card: object | null;
	rc_rif: object | null;
	rc_special_contributor: object | null;
	rc_ref_bank: object | null;
	rc_comp_dep: object | null;
}

export interface NamesImagesInt {
	rc_ident_card: string;
	rc_rif: string;
	rc_special_contributor: string;
	rc_ref_bank: string;
	rc_comp_dep: string;
}

export interface PathImagesInt {
	rc_ident_card: {
		path: string;
		type: string;
	};
	rc_rif: {
		path: string;
		type: string;
	};
	rc_special_contributor: {
		path: string;
		type: string;
	};
	rc_ref_bank: {
		path: string;
		type: string;
	};
	rc_comp_dep: {
		path: string;
		type: string;
	};
}

export interface PathImage {
	path: string;
	type: string;
}
