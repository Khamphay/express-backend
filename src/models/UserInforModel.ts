import { client } from "../config/db";
import { user_gender } from "@prisma/client";
import { CRUDModel } from "../interface/CRUD";
import { Roles } from "./RoleModel";
import { calculPage } from "../config/func";
import { Provinces } from "./ProvinceModel";
import { Villages } from "./VillageModel";
import { Districts } from "./DistrictModel";

export interface Users {
  uid?: string | null;
  roleId: number | null;
  userName: string | null;
  password: string | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  expired?: string | null;
  isDelete?: Boolean | null;
  createdBy: string | null;
  updatedBy?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  roles?: Roles | null;
}

export interface UserInfor {
  uid: string | null;
  proId: number | null;
  distId: number | null;
  villId: number | null;
  firstName: string | null;
  lastName: string | null;
  gender: user_gender | null;
  birtday: Date | null;
  tel: string | null;
  isDelete?: Boolean | null;
  createdBy: string | null;
  updatedBy: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  users?: Users | null;
  provinces?: Provinces | null;
  districts?: Districts | null;
  villages?: Villages | null;
}

export class UserInforModel implements UserInfor, CRUDModel {
  uid: string | null;
  proId: number | null;
  distId: number | null;
  villId: number | null;
  firstName: string | null;
  lastName: string | null;
  gender: user_gender | null;
  birtday: Date | null;
  tel: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  users: Users | null;

  constructor(data?: UserInfor | null) {
    this.uid = data?.uid != (null || undefined) ? data.uid : null;
    this.proId = data?.proId != (null || undefined) ? data.proId : null;
    this.distId = data?.distId != (null || undefined) ? data.distId : null;
    this.villId = data?.villId != (null || undefined) ? data.villId : null;
    this.firstName = data?.firstName != undefined ? data.firstName : null;
    this.lastName = data?.lastName != undefined ? data.lastName : null;
    this.gender = data?.gender != undefined ? data.gender : user_gender.male;
    this.birtday =
      data?.birtday != undefined
        ? new Date(data?.birtday)
        : new Date(new Date(Date.now()).getFullYear() - 10);
    this.tel = data?.tel != undefined ? data.tel : null;
    this.createdBy = data?.createdBy != undefined ? data.createdBy : null;
    this.updatedBy = data?.updatedBy != undefined ? data.updatedBy : null;
    this.users = data?.users != undefined ? data?.users : null;
  }

  public async getAllData(
    page?: number,
    perPage?: number,
    totalPages?: number
  ): Promise<UserInfor[] | any | Error> {
    try {
      await client.$connect();
      if (totalPages === undefined) {
        let total = await client.userinformations.count({
          where: { isDelete: false }
        });
        totalPages = calculPage(total, perPage ?? 0);
      }
      let userifor: UserInfor[] | any = await client.userinformations.findMany({
        include: {
          users: {
            select: { uid: true, userName: true, roleId: true }
          },
          provinces: { select: { name: true, region: true } },
          districts: { select: { name: true } },
          villages: { select: { name: true } }
        },
        where: { isDelete: false }
      });
      return {
        page: page,
        perPage: perPage,
        totalPages: totalPages,
        userifor: userifor
      };
    } catch (error) {
      throw error as Error;
    } finally {
      await client.$disconnect();
    }
  }

  public async getOneDataByID(uid: string): Promise<UserInfor | any | Error> {
    try {
      await client.$connect();
      let userifor: UserInfor | any = await client.userinformations.findUnique({
        include: {
          users: {
            select: {
              uid: true,
              userName: true,
              roleId: true,
              accessToken: true,
              refreshToken: true,
              expired: true
            }
          },
          provinces: { select: { name: true, region: true } },
          districts: { select: { name: true } },
          villages: { select: { name: true } }
        },
        where: { uid: uid }
      });
      return userifor;
    } catch (error) {
      console.log(error);
      throw error as Error;
    } finally {
      await client.$disconnect();
    }
  }

  public async createData(): Promise<UserInfor | any | Error> {
    try {
      await client.$connect();
      let role = await client.roles.findUnique({
        where: { id: this.users?.roleId ?? 1 }
      });
      if (role == null) return null;
      let userifor: UserInfor | any = await client.userinformations.create({
        data: {
          proId: this.proId,
          distId: this.distId,
          villId: this.villId,
          firstName: this.firstName!,
          lastName: this.lastName ?? "",
          tel: this.tel ?? "",
          gender: this.gender!,
          birtday: this.birtday!,
          createdBy: this.createdBy ?? "",
          users: {
            create: {
              userName: this.users?.userName ?? "",
              password: this.users?.password ?? "",
              createdBy: this.createdBy ?? "",
              roleId: this.users?.roleId ?? 2
            }
          }
        },
        include: {
          users: true
        }
      });

      return userifor;
    } catch (error) {
      throw error as Error;
    } finally {
      await client.$disconnect();
    }
  }

  public async updateData(uid: string): Promise<UserInfor | null | Error> {
    try {
      await client.$connect();
      let rs = await client.userinformations.findUnique({
        where: { uid: uid }
      });
      if (rs == null) return null;

      let userifor: UserInfor = await client.userinformations.update({
        data: {
          firstName: this.firstName!,
          lastName: this.lastName ?? "",
          tel: this.tel ?? "",
          gender: this.gender!,
          birtday: this.birtday!,
          updatedBy: this.updatedBy ?? ""
        },
        where: { uid: uid }
      });
      return userifor;
    } catch (error) {
      throw error as Error;
    } finally {
      await client.$disconnect();
    }
  }

  public async deleteData(uid: string): Promise<UserInfor | null | Error> {
    try {
      await client.$connect();
      let rs = await client.userinformations.findUnique({
        where: { uid: uid }
      });
      if (rs == null) return null;
      let userifor: UserInfor = await client.userinformations.delete({
        where: { uid: uid }
      });
      return userifor;
    } catch (error) {
      throw error as Error;
    } finally {
      await client.$disconnect();
    }
  }
}
