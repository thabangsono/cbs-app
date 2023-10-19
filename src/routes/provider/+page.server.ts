import { prisma } from '$lib';
import { error, fail } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

export async function load() {
	const providers = prisma.provider.findMany();

	return {
		providers
	};
}

const schema = zfd.formData({
	name: z
		.string()
		.min(2, { message: 'Two or more characters are required' })
		.max(25, { message: 'Name should have 25 or less characters' })
		.trim(),
	description: z
		.string()
		.min(10, { message: 'Description should have 10 or more characters' })
		.max(50, { message: '50 or less characters are required' }),
	logo_uri: z.string().url({ message: 'Enter a valid logo URL' }),
	isActive: zfd.checkbox()
});

export const actions = {
	async create({ request }) {
		const form = await request.formData();

		const parsedForm = schema.safeParse(form);

		if (!parsedForm.success) {
			return fail(400, { error: parsedForm.error.flatten().fieldErrors });
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
			provider_id: zfd.numeric()
		});

		const parsedForm = schema.safeParse(form);

		if (!parsedForm.success) {
			throw error(404, {
				message: parsedForm.error.message
			});
		}

		const { provider_id } = parsedForm.data;

		await prisma.provider.delete({
			where: { id: provider_id }
		});
	}
};
