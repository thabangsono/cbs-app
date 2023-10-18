import { prisma } from '$lib';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
	const id = Number(params.id);

	const provider = prisma.provider.findUnique({
		where: { id }
	});

	return {
		provider
	};
}

const schema = zfd.formData({
	name: zfd.text(),
	description: zfd.text(),
	logo_uri: zfd.text(z.string().url()),
	isActive: zfd.checkbox()
});

export const actions = {
	async update({request, params}){
		const form = await request.formData();
		const parsedForm = schema.safeParse(form);

		if (!parsedForm.success){
			throw redirect (307, '/details');
		}

		const { name, description, logo_uri, isActive } = parsedForm.data;
		const id = Number(params.id);
		await prisma.provider.update({
			where: {id},
			data: {
				name,
				description,
				logo_uri,
				isActive
			}
		});

	}
}

