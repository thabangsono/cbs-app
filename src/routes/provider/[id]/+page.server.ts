import { prisma } from '$lib';

export async function load({ params }) {
	const id = Number(params.id);

	const provider = prisma.provider.findUnique({
		where: { id }
	});

	return {
		provider
	};
}
