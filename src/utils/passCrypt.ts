import bcrypt from "bcrypt";

const passCrypt = async (pass: string): Promise<string> => {
   return await bcrypt.hash(pass, 10).then((result) => result);
};

export default passCrypt