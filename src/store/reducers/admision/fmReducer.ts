import { ActionType } from '../../types/types';

export interface StateFMInt {
	id_client: number;
	clientMash: any;
	mashClient: boolean;
	imagesClient: boolean;
	validMashClient: boolean;
	id_commerce: number;
	commerceMash: any;
	mashCommerce: boolean;
	validMashCommerce: boolean;
	imagesCommerce: boolean;
	id_images: any;
	loadedClient: boolean;
	loadedCommerce: boolean;
	loadedImages: boolean;
	loadedFM: boolean;
	errorClient: boolean;
	errorCommerce: boolean;
	errorNumBank: boolean;
	nameBank: string;
	code: string;
}

const initialState: StateFMInt = {
	id_client: 0,
	clientMash: {},
	mashClient: false,
	validMashClient: false,
	imagesClient: false,

	id_commerce: 0,
	commerceMash: {},
	mashCommerce: false,
	validMashCommerce: false,
	imagesCommerce: false,

	id_images: null,
	loadedClient: false,
	loadedCommerce: false,
	loadedImages: false,
	loadedFM: false,

	errorClient: false,
	errorCommerce: false,
	errorNumBank: false,
	nameBank: '',
	code: '',
};

export const fmReducer = (state = initialState, action: any) => {
	switch (action.type) {
		//Client
		case ActionType.validClient:
			return {
				...state,
				errorClient: false,
				id_client: action.payload.matsh ? action.payload.client.id : 0,
				mashClient: action.payload.matsh,
				imagesClient: action.payload.matshImg,
				clientMash: action.payload.client,
				validMashClient: true,
			};
		case ActionType.validClientError:
			return {
				...state,
				id_client: 0,
				clientMash: {},
				mashClient: false,
				imagesClient: false,
				errorClient: true,
				validMashClient: false,
			};
		case ActionType.validResetClient:
			return {
				...state,
				id_client: 0,
				clientMash: {},
				mashClient: false,
				validMashClient: false,
				errorClient: false,
				imagesClient: false,
			};
		case ActionType.validCommerce:
			return {
				...state,
				id_commerce: action.payload.id,
				commerceMash: action.payload,
				mashCommerce: true,
				imagesCommerce: action.payload.matchImg,
				errorCommerce: false,
				validMashCommerce: true,
			};
		case ActionType.validCommerceOk: //reset commerce
			return {
				...state,
				commerceMash: {},
				mashCommerce: false,
				imagesCommerce: false,
				errorCommerce: false,
				validMashCommerce: true,
			};
		case ActionType.validCommerceError:
			return {
				...state,
				commerceMash: {},
				mashCommerce: false,
				imagesCommerce: false,
				errorCommerce: true,
				validMashCommerce: false,
			};
		//Number Bank
		case ActionType.validNumBank:
			return {
				...state,
				errorNumBank: false,
				nameBank: action.payload,
			};
		case ActionType.validNumBankError:
			return {
				...state,
				errorNumBank: true,
			};
		case ActionType.sendClient:
			return {
				...state,
				id_client: action.payload,
				loadedClient: true,
			};
		case ActionType.sendClientError:
			return {
				...state,
				id_client: 0,
				loadedClient: false,
			};
		//Commerce
		case ActionType.sendCommerce:
			return {
				...state,
				id_commerce: action.payload,
				loadedCommerce: true,
			};
		case ActionType.sendCommerceError:
			return {
				...state,
				id_commerce: 0,
				loadedCommerce: false,
			};
		//Images
		case ActionType.sendImages:
			return {
				...state,
				loadedImages: true,
				id_images: action.payload,
			};
		case ActionType.sendImagesError:
			return {
				...state,
				loadedImages: false,
			};
		//FM
		case ActionType.sendFM:
			return {
				...state,
				loadedFM: true,
				code: action.payload,
			};
		case ActionType.sendFMError:
			return {
				...state,
				loadedFM: false,
			};
		//Clean
		case ActionType.cleanFm:
			return initialState;
		default:
			return state;
	}
};
