import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { error } from "@sveltejs/kit";

const prisma = new PrismaClient();

export async function load() {
	const resource = prisma.resource.findMany();
	const providers = prisma.provider.findMany();

	return {
		resource,
		providers
	};
}
	

const schema = zfd.formData({
	name: zfd.text(),
	description: zfd.text(),
	url: zfd.text(z.string().url()),
	type: zfd.text(),
	isActive: zfd.checkbox(),
	providers: zfd.repeatable(z.array(zfd.numeric()))
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
						connect:  provider
					}
				}
			});
		} catch (e) {
			console.log(e);
		}
	},
}
