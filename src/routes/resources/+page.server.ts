import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { error, fail } from '@sveltejs/kit';

const prisma = new PrismaClient();

export async function load() {
	const providers = prisma.provider.findMany();

	return {
		providers
	};
}

const schema = zfd.formData({
	name: z
		.string()
		.min(2, {message: 'Two or more characters required'})
		.max(25, {message: 'Name should have less than 25 characters'})
		.trim(),

	description: z
				.string()
				.min(10, {message: 'Description should be 10 or more characters' })
				.max(50, {message: '50 or less charaters required'}),
	url: z.string().url({ message: 'Enter a valid URL'}),
	type: zfd.text(),
	isActive: zfd.checkbox(),
	providers: zfd.repeatable(z.array(zfd.numeric()))
});

export const actions = {
	async create({ request }) {
		type FormattedErrors = z.inferFlattenedErrors<typeof schema>;
		const form = await request.formData();

		const parsedForm = schema.safeParse(form);

		if (!parsedForm.success) {
			const flattenErrors = parsedForm.error.flatten();

			const errors: FormattedErrors = flattenErrors;
			
			return fail(400, { error: errors.fieldErrors });
		}

		const { name, description, url, type, isActive, providers } = parsedForm.data;

		const provider = providers.map((item) => ({ id: item }));

		try {
			await prisma.resource.create({
				data: {
					name,
					description,
					url,
					type,
					isActive,
					providers: {
						connect: provider
					}
				}
			});
		} catch (e) {
			console.log(e);
		}
	}
};
