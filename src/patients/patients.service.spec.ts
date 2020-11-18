import { Test, TestingModule } from '@nestjs/testing';

describe('PatientsService', () => {
  let service: PatientsServiceMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientsServiceMock],
    }).compile();

    service = module.get<PatientsServiceMock>(PatientsServiceMock);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getById', () => {
    it('should get correct patient info by id', async () => {
      const expectedName = 'Shubham';
      const expectedId = 5;
      const patientInfo = await service.getById(5);
      expect(patientInfo.id).toEqual(expectedId);
      expect(patientInfo.name).toEqual(expectedName);
    });
  });
});

class PatientsServiceMock {
  patientsData = [
    {
      id: 1,
      name: 'Shubham',
      age: 24,
      gender: 'M',
      contact: null,
      address: null,
      city: null,
      bloodtype: 'A+',
    },
    {
      id: 5,
      name: 'Shubham',
      age: 24,
      gender: 'M',
      contact: null,
      address: null,
      city: null,
      bloodtype: 'A+',
    },
    {
      id: 2,
      name: 'Jyoti',
      age: 29,
      gender: 'F',
      contact: null,
      address: null,
      city: null,
      bloodtype: 'A+',
    },
    {
      id: 6,
      name: 'Jyoti',
      age: 29,
      gender: 'F',
      contact: null,
      address: null,
      city: null,
      bloodtype: 'A+',
    },
    {
      id: 4,
      name: 'Kaushallya',
      age: 42,
      gender: 'F',
      contact: null,
      address: null,
      city: null,
      bloodtype: 'O+',
    },
    {
      id: 8,
      name: 'Kaushallya',
      age: 42,
      gender: 'F',
      contact: null,
      address: null,
      city: null,
      bloodtype: 'O+',
    },
    {
      id: 3,
      name: 'Sanjay',
      age: 45,
      gender: 'M',
      contact: null,
      address: null,
      city: null,
      bloodtype: 'A+',
    },
    {
      id: 7,
      name: 'Sanjay',
      age: 45,
      gender: 'M',
      contact: null,
      address: null,
      city: null,
      bloodtype: 'A+',
    },
  ];
  getAll() {
    return [this.patientsData, this.patientsData.length];
  }

  getById(id: number) {
    return this.patientsData.find((cur) => cur.id === id);
  }
}
