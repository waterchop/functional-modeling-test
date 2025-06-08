declare module "@prisma/client" {
  export class PrismaClient {
    constructor(options?: any);
    $disconnect(): Promise<void>;
    user: {
      create(args: any): Promise<any>;
      findUnique(args: any): Promise<any | null>;
      update(args: any): Promise<any>;
      delete(args: any): Promise<any>;
      findMany(args?: any): Promise<any[]>;
    };
  }
}
