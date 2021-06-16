import axios, {AxiosResponse} from 'axios';
import * as webix from 'webix';

export class Auth {
	public login: string;
	public password: string;

	public auth(): Promise<any> {
		return axios.post('auth').then(() => {
			let rights: Map<string, boolean> = new Map();
			rights.set('main', true);
			rights.set('aboutMethod', true);
			rights.set('aboutCompany', true);
			rights.set('analyse', true);
			rights.set('contract', true);
			rights.set('support', true);
			rights.set('requirements', true);
			rights.set('chat', true);
			rights.set('contacts', true);
			rights.set('account', true);
			let parsedRights = JSON.stringify(rights, replacer);
			setCookie('rights', parsedRights, {secure: true, 'max-age': 3600});
		});
	}

	public deauth(): Promise<any> {
		return axios.post('deauth').then(() => {
			deleteCookie('rights');
		});
	}
}

export function getCookie(name) {
	let matches = document.cookie.match(new RegExp(
		'(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, options) {
	options = {
		path: '/',
		// при необходимости добавьте другие значения по умолчанию
		...options
	};

	if (options.expires instanceof Date) {
		options.expires = options.expires.toUTCString();
	}

	let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

	for (let optionKey in options) {
		updatedCookie += '; ' + optionKey;
		let optionValue = options[optionKey];
		if (optionValue !== true) {
			updatedCookie += '=' + optionValue;
		}
	}
	document.cookie = updatedCookie;
}

export function deleteCookie(name) {
	setCookie(name, '', {
		'max-age': -1
	});
}

export function replacer(key, value) {
	if (value instanceof Map) {
		return {
			dataType: 'Map',
			value: Array.from(value.entries()), // or with spread: value: [...value]
		};
	} else {
		return value;
	}
}

export function reviver(key, value) {
	if (typeof value === 'object' && value !== null) {
		if (value.dataType === 'Map') {
			return new Map(value.value);
		}
	}
	return value;
}