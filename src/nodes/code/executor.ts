import { CodeNode } from "./ui.schema";

export const executeCodeNode = async (inputs: any, filePath: string) => {

    const fileContent = await import(filePath)

    console.log(fileContent)

 
    const result = fileContent.default(inputs);
    return result;
}