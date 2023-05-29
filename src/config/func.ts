import bcrypt from "bcryptjs";

function calculPage(totalRecord: number, perPage: number): number {
  let pages = totalRecord / perPage;
  let pageInt = parseInt(pages.toFixed(0));
  return pageInt < pages ? pageInt + 1 : pageInt;
}

function hasPass(pass: string) {
  return bcrypt.hashSync(pass, 12);
}

export { calculPage, hasPass };
