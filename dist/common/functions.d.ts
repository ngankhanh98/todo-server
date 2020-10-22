export declare function hash(text: string): string;
export declare function compare(password: string, hash: string): Promise<any>;
export declare function verify(token: string): any;
