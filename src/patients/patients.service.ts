import { Injectable } from '@nestjs/common';

@Injectable()
export class PatientsService {

	async test(){
		return 'Hello World'
	}

}
