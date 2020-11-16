import { PatientsInfo } from '../entities/PatientsInfo';
import { EntityRepository, FindManyOptions, Repository } from 'typeorm';
import { GetAllPatientsDTO } from './patients.dto';

@EntityRepository(PatientsInfo)
export class PatientsInfoRepo extends Repository<PatientsInfo> {
  async addPatientsInfo(patientsData) {
    const newPatients: PatientsInfo[] = [];
    patientsData.forEach((curPatient) => {
      const newPatient = new PatientsInfo();
      newPatient.address = curPatient.address;
      newPatient.name = curPatient.name;
      newPatient.age = curPatient.age;
      newPatient.gender = curPatient.gender;
      newPatient.bloodtype = curPatient.bloodtype;
      newPatient.contact = curPatient.contact;
      newPatient.city = curPatient.city;
      newPatients.push(newPatient);
    });
    await this.save(newPatients, {
      reload: false,
    });
  }

  async getAll(options: GetAllPatientsDTO) {
    const { pageNo = 1, pageSize = 20, sortBy = {} } = options;
    const skip = (pageNo - 1) * pageSize;
    const findOptions: FindManyOptions = {
      skip,
      take: pageSize,
    };
    Object.keys(sortBy).forEach((curSort) => {
      const sortValue = sortBy[curSort];
      if (['ASC', 'DESC', 1, -1].includes(sortValue)) {
        findOptions.order = findOptions.order || {};
        findOptions.order[curSort] = sortValue;
      }
    });
    return this.findAndCount(findOptions);
  }
}
