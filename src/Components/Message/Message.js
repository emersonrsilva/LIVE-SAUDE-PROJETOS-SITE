import Swal from 'sweetalert2';
import './Message.scss';

export default {

	success: function(message)
	{
		const Toast = Swal.mixin({
			toast: true,
			position: 'top',
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
			onOpen: (toast) => {
				toast.addEventListener('mouseenter', Swal.stopTimer)
				toast.addEventListener('mouseleave', Swal.resumeTimer)
			}
		});

		Toast.fire({
			icon: 'success',
			title: message,
			customClass: {
				container: 'messageContainer',
				popup: 'messagePopup messageSuccess',
				title: 'messageTitle',
			}
		});
	},

	error: function(message)
	{
		const Toast = Swal.mixin({
			toast: true,
			position: 'top',
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
			onOpen: (toast) => {
				toast.addEventListener('mouseenter', Swal.stopTimer)
				toast.addEventListener('mouseleave', Swal.resumeTimer)
			}
		});

		Toast.fire({
			icon: 'error',
			title: message,
			customClass: {
				container: 'messageContainer',
				popup: 'messagePopup messageError',
				title: 'messageTitle',
			}
		});
	},

	warning: function(message)
	{
		const Toast = Swal.mixin({
			toast: true,
			position: 'top',
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
			onOpen: (toast) => {
				toast.addEventListener('mouseenter', Swal.stopTimer)
				toast.addEventListener('mouseleave', Swal.resumeTimer)
			}
		});

		Toast.fire({
			icon: 'warning',
			title: message,
			customClass: {
				container: 'messageContainer',
				popup: 'messagePopup messageWarning',
				title: 'messageTitle',
			}
		});
	},

	confirm: async function(message)
	{
		const Toast = Swal.mixin({
			toast: true,
			position: 'top',
			onOpen: (toast) => {
				toast.addEventListener('mouseenter', Swal.stopTimer)
				toast.addEventListener('mouseleave', Swal.resumeTimer)
			}
		});

		let response = await Toast.fire({
			icon: 'warning', 
			title: message, 
			showCancelButton: true, 
			confirmButtonText: 'SIM', 
			cancelButtonText: 'NÃO',
			customClass: {
				container: 'messageContainer',
				popup: 'messagePopup',
				title: 'messageTitle',
			}
        });

		return response.value;
	},

	delete: async function(title="Deseja realmente deletar?", text="Esse processo não poderá ser revertido")
	{
		let dialog = await Swal.fire({
			title: title, 
			text: text,
			icon: 'warning', 
			showCancelButton: true, 
			confirmButtonText: 'Deletar', 
			cancelButtonText: 'Cancelar'
		});
		
		return dialog.value;
	},

	popup: function(title, text="", button="")
	{
		Swal.fire({
			title: title,
			text: text,
			confirmButtonText: button ? button : 'Finalizar',
			customClass: {
				container: 'messageContainer messageOverlay',
				popup: 'messagePopup messageLogo',
				title: 'messageTitle',
				confirmButton: 'btn',
			}
		});
	},

}