import fs from "fs";
import path from "path";

export function capitalize(s: string): string {
    /** Capitalize the first letter of a string. */
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export function lowercaseFirst(s: string): string {
    /** Lowercase the first letter of a string. */
    return s.charAt(0).toLowerCase() + s.slice(1);
}

export function writeFile(filepath: string, content: string){
    /** Write content to a file, creating directories if necessary. */
    const dir = path.dirname(filepath);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filepath, content);
    console.log(`Wrote file: ${filepath}`);    
}
