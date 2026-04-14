import fs from 'fs/promises';
import path from 'path';
import Handlebars from 'handlebars';
import { InternalServerError } from '../utils/errors/app.error';



export async function renderMailTemplate(templateId: string, params: Record<string, any>): Promise<string> {

    console.log("Rendering template:", templateId, "with params:", params);

    const templatePath = path.join(__dirname, 'mailer', `${templateId}.hbs`);

    try {
        const content = await fs.readFile(templatePath, 'utf-8');
        //Hsndlebars compile the template with the provided parameters
        const finalTemplate = Handlebars.compile(content);
        return finalTemplate(params);
    } catch (error) {
        console.error(`Error rendering template ${templateId}:`, error);
        throw new InternalServerError(`Template not found: ${templateId}`);
    }
}