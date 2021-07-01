import Mustache from 'mustache';
import { readAllBytes } from "./fileAsync";


const loadTemplate = (templatePath: any) => {
    return readAllBytes(templatePath, 'utf8');
}
export const createHtml = (data: any, templatePath: string) => {

    return loadTemplate(templatePath).then((template) => {
        return Mustache.render(template as string, data);
    })

};

