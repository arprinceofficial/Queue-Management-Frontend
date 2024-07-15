import { $fetch, FetchError, type FetchOptions } from 'ofetch';

export const $X_TOKEN = 'X-TOKEN';
const AUTH_HEADER = 'Authorization';

interface ResponseMap {
	blob: Blob;
	text: string;
	arrayBuffer: ArrayBuffer;
}
type ResponseType = keyof ResponseMap | 'json';

export type HttpOptions<R extends ResponseType> = FetchOptions<R> & {
	redirectIfNotAuthenticated?: boolean;
	redirectIfNotVerified?: boolean;
};

export async function $http<T, R extends ResponseType = 'json'>(
	path: RequestInfo,
	{ redirectIfNotAuthenticated = true, redirectIfNotVerified = true, ...options }: HttpOptions<R> = {}
) {
	const { apiURL } = useRuntimeConfig().public;
	const router = useRouter();

	let token = useCookie($X_TOKEN).value;

	if (process.client && ['get', 'post', 'delete', 'put', 'patch'].includes(options?.method?.toLowerCase() ?? '')) {
		token = getCookie($X_TOKEN);
	}

	const url = useRequestURL();
	const hostName = url.hostname;

	let headers: any = {
		accept: 'application/json',
		...options?.headers,
		...(token && { [AUTH_HEADER]: `Bearer ${token}` })
	};

	if (process.server) {
		headers = {
			...headers,
			...useRequestHeaders(['cookie']),
			referer: hostName,
		};
	}

	try {
		return await $fetch<T, R>(path, {
			baseURL: apiURL,
			...options,
			headers
		});
	} catch (error) {
		if (!(error instanceof FetchError)) throw error;

		const status = error.response?.status ?? -1;

		if (redirectIfNotAuthenticated && [401, 419].includes(status)) {
			await router.push('/');
		}

		if (redirectIfNotVerified && [409].includes(status)) {
			await router.push('/verify-email');
		}

		if ([500].includes(status)) {
			console.error('[Http Error]', error.data?.message, error.data);
		}

		throw error;
	}
}

function getCookie(name: string) {
	const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	return match ? decodeURIComponent(match[3]) : null;
}
