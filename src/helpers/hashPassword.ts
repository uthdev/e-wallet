import bcrypt from "bcrypt";

const saltRound = bcrypt.genSaltSync(10);

const hashPassword = ( password: string): string => {
  const passwordHash = bcrypt.hashSync(password, saltRound);
  return passwordHash;
}
 
export default hashPassword;