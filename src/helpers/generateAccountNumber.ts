const generateAccountNumber = () : number => {

  let str = '';
  const characters = '123456789';
  for (let i = 0; i < 8; i += 1) {
    str += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return Number(str);
}


export default generateAccountNumber;