import { Injectable } from '@angular/core';
import { BaseService } from '../../../core/base/base.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseService {
    url = 'api/roles';
}
