import { PatientsInfo } from 'src/entities/PatientsInfo';
import { EntityRepository, Repository } from 'typeorm';

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
}
