import { prisma } from '$lib';
import { error } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

export async function load() {
	const providers = prisma.provider.findMany();

	return {
		providers
	};
}

const schema = zfd.formData({
	name: zfd.text(),
	description: zfd.text(),
	logo_uri: zfd.text(z.string().url()),
	isActive: zfd.checkbox()
});

export const actions = {
	async create({ request }) {
		const form = await request.formData();

		const parsedForm = schema.safeParse(form);

		if (!parsedForm.success) {
			throw error(404, {
				message: parsedForm.error.message
			});
		}

		const { name, description, logo_uri, isActive } = parsedForm.data;

		try {
			await prisma.provider.create({
				data: {
					name,
					description,
					logo_uri,
					isActive
				}
			});
		} catch (e) {
			console.log(e);
		}
	},


	async delete({ request }) {
		const form = await request.formData();

		const schema = zfd.formData({
			provider_id: zfd.numeric(),
		})

		const parsedForm = schema.safeParse(form);
		


		if (!parsedForm.success){
			throw error(404, {
				message: parsedForm.error.message
			});
		}

		const { provider_id } = parsedForm.data;
		 
		await prisma.provider.delete({
			where: { id: provider_id }
		});
		
	}
}