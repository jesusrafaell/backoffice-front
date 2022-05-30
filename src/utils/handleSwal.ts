import Swal from 'sweetalert2';
import './swal.scss';

export const handleLoading = () => {
	Swal.fire({
		icon: 'info',
		title: 'Verificando',
		showConfirmButton: false,
		customClass: { container: 'swal2-validated' },
		allowOutsideClick: false,
		allowEscapeKey: false,
		didOpen: () => {
			Swal.showLoading();
		},
	});
};

export const handleLoadingSearch = () => {
	Swal.fire({
		title: 'Cargando...',
		showConfirmButton: false,
		allowOutsideClick: false,
		allowEscapeKey: false,
		customClass: { container: 'swal2-validated' },
		didOpen: () => {
			Swal.showLoading();
		},
	});
};

export const handleError = (error: any) => {
	Swal.fire({
		icon: 'error',
		title: 'Error',
		text: error.response?.data?.message || 'Error Access',
		customClass: { container: 'swal2-validated' },
		showConfirmButton: true,
		//timer: 2500,
	});
};

export const handleComercioUpdated = () => {
	Swal.fire({
		position: 'center',
		icon: 'success',
		title: 'Comercio Actulizado',
		showConfirmButton: true,
		customClass: { container: 'swal2-validated' },
	});
};

export const handleSucessTime = (text: string) => {
	Swal.fire({
		position: 'center',
		icon: 'success',
		title: `Verifica la solicitud`,
		html: `<p>Codigo Solic: <b>${text}</b><p/>`,
		showConfirmButton: true,
		customClass: { container: 'swal2-validated' },
		timer: 1500,
	});
};

export const handleInfoText = (title: string, text: string) => {
	Swal.fire({
		icon: 'info',
		title: title,
		text: text || 'Error Access',
		customClass: { container: 'swal2-validated' },
		showConfirmButton: true,
		//timer: 2500,
	});
};

export const handleErrorProvider = (error: any) => {
	const text = error.response?.data?.message.text || 'Error Access';
	const provider = error.response?.data?.message.provider || 'Error Acess';
	const html = `<p><b>${text}</b> </br><small>${provider}</small></p>`;
	Swal.fire({
		icon: 'error',
		title: 'Error',
		text: text,
		html: html,
		customClass: { container: 'swal2-validated' },
		showConfirmButton: true,
	});
};
